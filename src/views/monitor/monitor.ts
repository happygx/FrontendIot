/*
 * @Author: happygx
 * @Date: 2019-10-12 15:14:18
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:27:01
 */
// import { getData } from "@/api/monitor"
import { Component, Vue } from "vue-property-decorator"
import { Getter, Action } from "vuex-class"
import { Tree } from "@/components" // 组件

export interface MonitorData {
  MonitorData: string
}

@Component({
  components: {
    Tree
  }
})
export default class Monitor extends Vue {
  // Getter
  // @Getter author

  // Action
  // @Action GET_DATA_ASYN

  // data
  private data: MonitorData = {
    MonitorData: 'monitor'
  }

  created() {
    //
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
