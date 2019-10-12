<!--
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-10 10:59:48
 -->
<template>
  <div class="table-wrap">
    <el-input
      v-model="searchValue"
      placeholder="请输入"
      style="width: 300px;"
    ></el-input>
    <el-button type="primary" @click="onSearch">搜索</el-button>
    <el-table
      :default-sort="{ prop: 'date', order: 'descending' }"
      :data="tableDataEnd"
      tooltip-effect="dark"
      @row-dblclick="clickSelect"
      @sort-change="sortChange"
      stripe
      border
    >
      <el-table-column prop="date" label="日期" align="center" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :pager-count="7"
      :page-size="pagesize"
      :total="totalItems"
      layout="total, prev, pager, next, sizes"
      background
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" src="./table.ts"></script>

<style lang="scss" scoped>
@import "./table.scss";
</style>
<style lang="scss">
.table-wrap th {
  background-color: #eee;
}
</style>
