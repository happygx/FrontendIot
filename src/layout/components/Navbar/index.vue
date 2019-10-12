<!--
 * @Author: happygx
 * @Date: 2019-10-08 10:34:51
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 14:54:36
 -->
<template>
  <div class="navbar">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <a href="javascript:;" @click="logout">退出</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/module/app";
import { Breadcrumb } from "@/components";
import { removeCookie } from "@/utils/common";
import { UserModule } from "@/store/module/user";

@Component({
  name: "Navbar",
  components: {
    Breadcrumb
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  private async logout() {
    await UserModule.LogOut();
    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0px;
  left: 210px;
  height: 50px;
  width: calc(100% - 210px);
  padding: 0 30px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1000;

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
  }
}
</style>
