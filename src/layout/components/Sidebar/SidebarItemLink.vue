<!--
 * @Author: happygx
 * @Date: 2019-10-08 10:34:51
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-08 15:09:50
 -->
<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { isExternal } from "@/utils/validate";

@Component({
  name: "SidebarItemLink"
})
export default class extends Vue {
  @Prop({ required: true }) private to!: string;

  private isExternal = isExternal;
}
</script>
