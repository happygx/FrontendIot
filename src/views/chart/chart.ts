/*
 * @Author: happygx
 * @Date: 2019-09-05 10:11:05
 * @LastEditors: happygx
 * @LastEditTime: 2019-09-05 10:11:05
 */
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
// import {  } from "@/components" // 组件
import echarts from "@/utils/initEcharts";

export interface ChartData {
  ChartData: any
}

@Component({})
export default class Chart extends Vue {
  // Getter
  // @Getter author

  // Action
  // @Action GET_DATA_ASYN

  // data
  data: ChartData = {
    ChartData: {}
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.init();
  }

  // 初始化函数
  init() {
    // 实例化echarts对象
    let myChart = echarts.init(this.$refs.myChart);

    // 绘制条形图
    myChart.setOption({
      title: {
        text: "Echarts 入门实例",
        top: 5,
        left: "center"
      },
      tooltip: {
        axisPointer: {
          type: "shadow"
        },
        textStyle: {
          fontSize: 12
        }
      },
      legend: {
        data: ["衣服", "帽子", "裤子", "鞋子"],
        top: 30
      },
      // X轴
      xAxis: {
        data: ["一月", "二月", "三月", "四月"]
      },
      // Y轴
      yAxis: {},
      // 数据
      series: [
        {
          name: "衣服",
          type: "bar",
          data: [120, 100, 440, 320]
        },
        {
          name: "帽子",
          type: "bar",
          data: [200, 120, 240, 330]
        },
        {
          name: "bar",
          type: "line",
          data: [120, 200, 240, 260, 300]
        },
        {
          name: "bar",
          type: "line",
          data: [120, 200, 300, 140, 260]
        }
      ]
    });
  }
}
