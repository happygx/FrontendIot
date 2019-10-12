<!--
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-09 14:18:06
-->
<template>
  <div class="login-wrap pa">
    <div class="container pa">
      <h1 class="f20 mt20 tac">Hi，欢迎登录</h1>
      <!-- <p>{{ status }}</p> -->
      <el-form class="login-form">
        <el-form-item class="login-label" label="用户名">
          <el-input
            type="text"
            autocomplete="off"
            v-model="data.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            autocomplete="off"
            v-model="data.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" src="./login.ts"></script>

<style lang="scss" scoped>
@import "./login.scss";
</style>

<style lang="scss">
.login-form .el-form-item__label {
  font-size: 16px !important;
  color: #fff !important;
}
</style>
