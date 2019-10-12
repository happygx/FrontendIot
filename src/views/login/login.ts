/*
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:08:08
 */
// import { login } from "@/api/login";
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { UserModule } from "@/store/module/user"

export interface LoginData {
  pageName: string,
  username: string,
  password: string
}

@Component({
  components: {}
})
export default class Table extends Vue {
  // Getter
  @Getter status: any; // 强制使用getter获取state

  // Action
  @Action GET_DATA_ASYN: any; // 获取异步数据
  @Action UPDATE_STATE_ASYN: any; // 更新异步数据

  // data
  data: LoginData = {
    pageName: "login",
    username: "",
    password: ""
  };

  created() {
    // this.init();
  }

  activated() {
    //
  }

  mounted() {
    //
  }

  // 初始化函数
  init() {
    //
  }

  async login() {
    // this.UPDATE_STATE_ASYN({ status: "登录成功" });
    await UserModule.Login({
      username: this.data.username,
      password: this.data.password
    });
    this.$router.push("index");
  }
}
