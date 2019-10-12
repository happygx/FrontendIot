/*
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:23:19
 */
import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: any) {
  // tslint:disable-next-line:no-invalid-this
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};

// name:'router-name'            使用<keep-alive>时，name字段是必填字段，它也应与其组件的name属性匹配
// redirect:                     如果设置为“ noredirect”，则在单击面包屑时将不会触发任何重定向操作
// meta: {
//   roles: ['admin', 'editor']  将控制页面角色（允许设置多个角色）
//   title: 'title'              subMenu和面包屑中显示的名称（推荐设置）
//   icon: 'svg-name'            侧栏中显示的图标
//   hidden: true                如果为true，则此路由不会显示在边栏中（默认为false）
//   alwaysShow: true            如果为true，将始终显示根菜单（默认为false）
//                               如果为false，则当子路由小于或等于一个时，隐藏根菜单
//   breadcrumb: false           如果为false，则该项目将隐藏在面包屑中（默认为true）
//   noCache: true               如果为true，则不会缓存页面（默认为false）
//   affix: true                 如果为true，则标签将粘贴在标签视图中
//   activeMenu: '/example/list' 如果设置了路径，则侧边栏将突出显示您设置的路径
//   keepAlive: true             如果为true，需要被缓存
// }

export const constantRoutes: RouteConfig[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path*",
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ "@/views/redirect/redirect.vue"
          )
      }
    ]
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/login.vue"),
    meta: { hidden: true }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/index/index.vue"),
        name: "index",
        meta: {
          title: "首页",
          icon: "",
          affix: true,
          // keepAlive: true
        }
      }
    ]
  },
  {
    path: "/monitor",
    component: Layout,
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "monitor" */ "@/views/monitor/monitor.vue"),
        name: "monitor",
        meta: {
          title: "监控平面图",
        }
      }
    ]
  },
  {
    path: "/plugin",
    component: Layout,
    redirect: "noredirect",
    meta: {
      title: "插件",
      icon: ""
    },
    children: [
      {
        path: "table",
        component: () =>
          import(/* webpackChunkName: "table" */ "@/views/table/table.vue"),
        name: "table",
        meta: {
          title: "表格插件",
          roles: ["运维"]
        }
      },
      {
        path: "tree",
        component: () =>
          import(/* webpackChunkName: "tree" */ "@/views/tree/tree.vue"),
        name: "tree",
        meta: {
          title: "树形插件",
          roles: ["运维"]
        }
      },
      {
        path: "chart",
        component: () =>
          import(/* webpackChunkName: "chart" */ "@/views/chart/chart.vue"),
        name: "chart",
        meta: {
          title: "图表插件",
          roles: ["售后经理"]
        }
      }
    ]
  }
];

export const asyncRoutes: RouteConfig[] = [
];

const createRouter = () =>
  new Router({
    mode: "history",
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
