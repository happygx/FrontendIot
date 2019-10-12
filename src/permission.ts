/*
 * @Author: happygx
 * @Date: 2019-10-08 10:32:01
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 14:29:33
 */
import router from "./router";
import { Route } from "vue-router";
import { PermissionModule } from "@/store/module/permission";
import { UserModule } from "@/store/module/user";
import { PROJECTNAME } from "@/config/index";
import { getCookie } from "@/utils/common";

const login = ["/login"];

router.beforeEach(async (to: Route, _: Route, next: any) => {
  const token = getCookie("token");
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      // 检查用户是否已获得权限角色
      const roles = getCookie("roles");
      if (!roles) {
        try {
          await UserModule.GetUserInfo();
          PermissionModule.GenerateRoutes(UserModule.roles);
          // 动态添加可访问路线
          // router.addRoutes(PermissionModule.dynamicRoutes);
          next();
        } catch (err) {
          console.log(err);
          // Remove token and redirect to login page
          next(`/login?redirect=${to.path}`);
        }
      } else {
        PermissionModule.GenerateRoutes(roles);
        next();
      }
    }
  } else {
    if (login.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach((to: Route) => {
  // set page title
  document.title =
    to.meta.title === undefined
      ? PROJECTNAME
      : to.meta.title + "-" + PROJECTNAME;
});
