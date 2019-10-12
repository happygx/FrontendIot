/*
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:25:34
 */
import { getAllUserPermission } from "@/api/index";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
// import {  } from "@/components"; // 组件

export interface IndexData {
  IndexData: any,
}

@Component({
  components: {

  }
})
export default class Index extends Vue {
  // Getter
  // @Getter author

  // Action
  // @Action GET_DATA_ASYN;
  // @Action UPDATE_STATE_ASYN

  // data
  data: IndexData = {
    IndexData: {}
  };

  created() {
    // this.GET_DATA_ASYN()
    // this.UPDATE_STATE_ASYN()
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
}
