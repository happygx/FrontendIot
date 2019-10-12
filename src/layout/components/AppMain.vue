<!--
 * @Author: happygx
 * @Date: 2019-10-08 10:34:51
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-08 10:34:51
 -->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TagsViewModule } from "@/store/module/tags-view";

@Component({
  name: "AppMain"
})
export default class extends Vue {
  get cachedViews() {
    return TagsViewModule.cachedViews;
  }

  get key() {
    return this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  padding: 122px 30px 30px;
  position: relative;
  overflow: hidden;
}

.hasTagsView {
  .app-main {
    /* 92 = navbar + tags-view = 50 + 42 */
    min-height: calc(100vh - 92px);
  }
}
</style>
