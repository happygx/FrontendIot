/*
 * @Author: happygx
 * @Date: 2019-10-08 10:35:17
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-08 10:35:17
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

export enum DeviceType {
  Mobile,
  Desktop
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  size: string;
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: true,
    withoutAnimation: false
  };
  public device = DeviceType.Desktop;
  public size = "medium";

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device);
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }
}

export const AppModule = getModule(App);
