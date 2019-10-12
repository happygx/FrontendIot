/*
 * @Author: happygx
 * @Date: 2019-09-04 09:15:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-09-04 09:15:07
 */
import { Component, Vue, Watch } from "vue-property-decorator"
import { Getter, Action } from "vuex-class"
// import {  } from "@/components" // 组件

export interface TreeData {
  TreeData: any,
  defaultProps: object
}

@Component({})
export default class Tree extends Vue {
  // Getter
  // @Getter author

  // Action
  // @Action GET_DATA_ASYN

  // data
  data: TreeData = {
    TreeData: [
      {
        id: 3,
        level: 0,
        tag: 20,
        text: "华东医药股份有限公司1号库",
        type: 0,
        nodes: [
          {
            id: 320010417,
            level: 0,
            tag: 50,
            text: "华东医药一号库2层",
            type: 0,
            nodes: [
              {
                id: 579,
                text: "工作站3",
                level: 0,
                tag: 51,
                nodes: [],
                type: 0
              }
            ]
          }
        ]
      }
    ],
    defaultProps: {
      children: "nodes",
      label: "text"
    }
  }
  private filter: string = "";
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

  // 监听函数
  @Watch("filter")
  onFilterChange(newVal: string, oldVal: string) {
    // 在这里使用类型断言是为了指定组件的类型，不然会报错
    (this.$refs.tree as any).filter(newVal);
  }

  filterNode(value: string, data: any) {
    if (!value) {
      return true;
    }
    return data.text.indexOf(value) !== -1;
  }

  getSelect(data: any) {
    console.log(data);
  }
}
