/*
 * @Author: happygx
 * @Date: 2019-08-09 10:10:20
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-09 11:27:50
 */
const path = require('path');
const terserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['html', 'js', 'css'];

const resolve = dir => {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production' ? true : false
// 线上打包路径，请根据项目实际线上情况
const BASE_URL = isProduction ? './' : '/';

// 本地环境是否需要使用cdn
const devNeedCdn = false
// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    // 'axios': 'axios',
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter'
  },
  // cdn的css链接
  css: [],
  // cdn的js链接
  js: [
    // 'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
    'https://cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js'
  ]
}

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  // assetsDir: 'static', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  lintOnSave: false, // 是否在开发环境下通过eslint-loader在每次保存时lint代码
  productionSourceMap: false, // 开启生产环境的 source map?
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,
  css: {
    modules: false, // 启用 CSS modules
    extract: true, // 是否使用css分离插件,生产环境下是 true，开发环境下是 false
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项将传递给css-loader
      },
      postcss: {
        // 这里的选项将传递给postcss-loader
      }
    }
  },
  devServer: {
    open: false, // 是否立刻打开
    host: '127.0.0.1', // 本地域名
    port: 8888, // 端口
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true, //是否跨域
      }
    }

  },
  // 内部配置
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/assets'));

    // 压缩图片
    const imagesRule = config.module.rule("images");
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 6144
      }));

    imagesRule
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end();

    if (isProduction) {
      // 注入cdn
      config.plugin('html').tap(args => {
        // 生产环境或本地需要cdn时，才注入cdn
        if (devNeedCdn || isProduction) args[0].cdn = cdn;
        return args;
      })

      // 移除 prefetch 插件
      config.plugins.delete("prefetch");
      // 移除 preload 插件
      config.plugins.delete('preload');
      // 打包分析
      if (process.env.npm_config_report) {
        config.
        plugin('webpack-bundle-analyzer').
        use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).
        end();
        config.
        plugins.
        delete('prefetch')
      }
    }
  },
  // 调整 webpack 配置
  configureWebpack: config => {
    // 拷贝指定的文件到指定的目录下面
    config.plugins.push(
      new CopyWebpackPlugin([{
        from: "./static",
        to: this.outputDir,
        ignore: ['.*']
      }])
    )

    if (isProduction) {
      // 为生产环境修改配置...
      config.mode = 'production';

      // 用cdn方式引入，则构建时要忽略相关资源
      if (devNeedCdn || isProduction) config.externals = cdn.externals;

      // 打包生产.gz包
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理10240=10kb
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }),

        // 去除console.log与警告
        new terserWebpackPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      )

      // 将每个依赖包打包成单独的js文件
      let optimization = {
        splitChunks: {
          chunks: 'all', //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
          minSize: 300000, // 依赖包超过30000bit将被单独打包
          maxAsyncRequests: 5, // 所有异步请求不得超过5个
          maxInitialRequests: 3, // 一个入口最大的并行请求数，默认为3
          minChunks: 1, // 最少被引用次数
          // 自定义配置决定生成的文件,缓存策略
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // 获取插件名称
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `${packageName.replace('@', '')}`
              },
              priority: 100, // 权重
            },
            common: {
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              priority: 60,
            },
            styles: {
              chunks: 'all',
              test: /\.(sa|sc|c)ss$/,
              name: 'styles',
            },
            // 是将包含chunks映射关系的list单独从app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。
            runtimeChunk: {
              name: 'manifest'
            }
          }
        }
      }
      Object.assign(config, {
        optimization
      })

    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
      config.devtool = 'source-map'
      // mutate config for production...
    }
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/scss/_variables.scss'),
        path.resolve(__dirname, 'src/assets/scss/_mixins.scss')
      ]
    }
  },
}
