/*
 * @Author: happygx
 * @Date: 2019-10-11 14:09:15
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:18:57
 */
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import { getCookie, setCookie, removeCookie } from "@/utils/common";
import { resetRouter } from "@/router";
import store from "@/store";
import { login, logout, getAllUserPermission } from "@/api/common";

export interface IUserState {
  roles: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public roles: string = "";

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    const res = await login({
      method: "POST",
      data: userInfo
    });
    if (res.code !== 200) {
      return;
    } else {
      setCookie("token", "test");
    }
  }

  @Action
  public async LogOut() {
    const res = await logout();
    if (res.code !== 200) {
      return;
    } else {
      resetRouter();
      this.ResetToken();
    }
  }

  @Action
  public async GetUserInfo() {
    const data = await getAllUserPermission();
    if (!data) {
      throw Error("Verification failed, please Login again.");
    }
    const { group_name: roles } = data;
    this.SET_ROLES(roles);
  }

  @Action
  public ResetToken() {
    removeCookie("token");
    removeCookie("roles");
    this.SET_ROLES("")
  }


  @Mutation
  private SET_ROLES(roles: string) {
    this.roles = roles;
    setCookie("roles", roles)
  }
}

export const UserModule = getModule(User);
