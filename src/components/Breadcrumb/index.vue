<!--
 * @Author: happygx
 * @Date: 2019-10-08 10:34:06
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 14:53:44
 -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import pathToRegexp from "path-to-regexp";
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteRecord, Route } from "vue-router";

@Component({})
export default class Breadcrumb extends Vue {
  private breadcrumbs: RouteRecord[] = [];

  @Watch("$route")
  private onRouteChange(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith("/redirect/")) {
      return;
    }
    this.getBreadcrumb();
  }

  created() {
    this.getBreadcrumb();
  }

  private getBreadcrumb() {
    let matched = this.$route.matched.filter(
      item => item.meta && item.meta.title
    );
    const first = matched[0];
    if (!this.isDashboard(first)) {
      matched = [
        { path: "/dashboard", meta: { title: "首页" } } as RouteRecord
      ].concat(matched);
    }
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
  }

  private isDashboard(route: RouteRecord) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
  }

  private pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route;
    console.log(params);
    const toPath = pathToRegexp.compile(path);
    console.log(toPath(params));
    return toPath(params);
  }

  private handleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    console.log(path);
    this.$router.push(this.pathCompile(path));
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
