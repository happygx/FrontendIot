<template>
  <div class="tree-wrap">
    <el-input placeholder="输入关键字进行过滤" v-model="filter"> </el-input>
    <el-tree
      class="filter-tree"
      :data="data.TreeData"
      :props="data.defaultProps"
      :filter-node-method="filterNode"
      @node-click="getSelect"
      ref="tree"
      default-expand-all
    >
    </el-tree>
  </div>
</template>

<script lang="ts" src="./tree.ts"></script>

<style lang="scss" scoped>
@import "./tree.scss";
</style>

