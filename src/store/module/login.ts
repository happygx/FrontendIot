/*
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:05:33
 */
import { GetterTree, MutationTree, ActionTree } from "vuex";

export interface LoginState {
  status?: any
}

const state: LoginState = {
  status: false
};

// 强制使用getter获取state
const getters: GetterTree<LoginState, any> = {
  status: (state: LoginState) => state.status
};

// 更改state
const mutations: MutationTree<LoginState> = {
  // 更新state都用该方法
  UPDATE_STATE(state: LoginState, data: LoginState) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        return;
      }
      state[key] = data[key];
    }
  }
};

const actions: ActionTree<LoginState, any> = {
  UPDATE_STATE_ASYN({ commit, state: LoginState }, data: LoginState) {
    commit("UPDATE_STATE", data);
  },
  GET_DATA_ASYN({ commit, state: LoginState }) {
    //
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
