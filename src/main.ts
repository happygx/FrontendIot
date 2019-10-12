/*
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:20:09
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ElementUI from "element-ui"
import "@/utils/initElementUi.ts";
import "element-ui/lib/theme-chalk/index.css";
import "@a/scss/variables.scss";
import "@/permission";

// Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
