/*
 * @Author: happygx
 * @Date: 2019-10-10 11:09:42
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-11 15:05:33
 */
import Api from "@/utils/request";

export const login = (params = {}) => {
  return Api.login(params);
};

export const logout = () => {
  return Api.logout();
};

export const getAllUserPermission = () => {
  return Api.getAllUserPermission();
};
