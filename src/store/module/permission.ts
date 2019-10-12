/*
 * @Author: happygx
 * @Date: 2019-10-08 10:35:17
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 14:11:44
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { RouteConfig } from "vue-router";
import { constantRoutes, asyncRoutes } from "@/router";
import store from "@/store";

const hasPermission = (roles: string, route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles);
  } else {
    return true;
  }
};

const filterAsyncRoutes = (routes: RouteConfig[], roles: string) => {
  const res: RouteConfig[] = [];
  routes.forEach(route => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles);
      }
      res.push(r);
    }
  });
  return res;
};

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: "permission" })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];

  @Action
  public GenerateRoutes(roles: any) {
    let accessedRoutes: RouteConfig[] = filterAsyncRoutes(constantRoutes, roles);
    this.SET_ROUTES(accessedRoutes);
  }

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = routes;
  }
}

export const PermissionModule = getModule(Permission);
