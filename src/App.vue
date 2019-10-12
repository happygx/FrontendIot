<!--
 * @Author: happygx
 * @Date: 2019-08-09 10:13:07
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-12 15:19:24
-->
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="this.$route.path" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style lang="scss">
</style>
