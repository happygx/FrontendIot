/*
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-08-09 10:13:07
 */
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
// import {  } from "@/components" // 组件

export interface TableData {
  tableData: any;
}

@Component({})
export default class Table extends Vue {
  // Getter
  // @Getter author

  // Action
  // @Action GET_DATA_ASYN

  // data
  data: TableData = {
    tableData: [
      {
        date: "2016-05-07",
        name: "王小虎",
        address: "上海市普陀区金沙江路 15182 弄"
      },
      {
        date: "2016-05-06",
        name: "王小虎",
        address: "上海市普陀区金沙江路 15183 弄"
      },
      {
        date: "2016-05-05",
        name: "王小虎",
        address: "上海市普陀区金沙江路 15181 弄"
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄66666666666666666666666666666666"
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      },
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      },

      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      }
    ]
  };

  private currentPage: number = 1;
  private pagesize: number = 5;
  private totalItems: number = this.data.tableData.length;
  private flag: boolean = false;
  private searchValue: string = "";
  private tableDataEnd: any = [];
  private filterTableDataEnd: any = [];

  created() {
    this.currentChangePage(this.data.tableData, this.currentPage);
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

  clickSelect(row: any, column: any, event: any) {
    console.log(row);
    console.log(column);
    console.log(event);
  }

  // 每页条数切换
  handleSizeChange(pagesize: number) {
    console.log(`pagesize:${pagesize}`);
    this.pagesize = pagesize;
    this.handleCurrentChange(this.currentPage);
  }

  // 页码切换
  handleCurrentChange(currentPage: number) {
    console.log(`currentPage:${currentPage}`);
    this.currentPage = currentPage;
    this.currentChangePage(this.data.tableData, currentPage);
  }

  currentChangePage(list: any, currentPage: number) {
    let from = (currentPage - 1) * this.pagesize;
    let to = currentPage * this.pagesize;
    this.tableDataEnd = [];
    for (; from < to; from++) {
      if (list[from]) {
        this.tableDataEnd.push(list[from]);
      }
    }
  }

  onSearch() {
    if (this.searchValue === "") {
      if (this.flag) {
        this.flag = false; // 恢复到查询前的状态
        this.currentChangePage(this.data.tableData, this.currentPage);
      } else {
        this.$message.warning("查询条件不能为空！");
      }
      return;
    }
    this.tableDataEnd = [];
    // 每次手动将数据置空,因为会出现多次点击搜索情况
    this.filterTableDataEnd = [];
    this.data.tableData.forEach((value: any, index: number) => {
      if (value.address) {
        if (value.address.indexOf(this.searchValue) >= 0) {
          this.filterTableDataEnd.push(value);
        }
      }
    });
    // 页面数据改变重新统计数据数量和当前页
    this.currentPage = 1;
    this.totalItems = this.filterTableDataEnd.length;
    // 渲染表格,根据值
    this.currentChangePage(this.filterTableDataEnd, this.currentPage);
    // 页面初始化数据需要判断是否检索过
    this.flag = true;
  }

  sortChange(column: any) {
    this.data.tableData = this.data.tableData.sort(
      this.sortData(column.prop, column.order)
    );
    this.currentChangePage(this.data.tableData, this.currentPage);
  }

  sortData(prop: string, sort: string) {
    return (a: string, b: string) => {
      let proA: any = new Date(a[prop]);
      let proB: any = new Date(b[prop]);
      if (sort === "ascending") {
        return proA - proB;
      } else if (sort === "descending") {
        return proB - proA;
      }
    };
  }
}
