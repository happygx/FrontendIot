<!--
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 16:05:07
-->
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

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

export interface TreeData {
  componentName: string;
}

@Component({})
export default class Tree extends Vue {
  // prop
  @Prop({
    type: Array,
    required: true,
    default: () => {
      return [];
    }
  })
  private TreeData;

  @Prop({
    type: Object,
    required: true,
    default: () => {
      return {};
    }
  })
  private defaultProps;

  // data
  private data: TreeData = {
    componentName: "tree"
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
}
</script>

<style lang="scss">
// @import "@/assets/scss/variables.scss";

.tree-wrap {
  width: 100%;
}
</style>

