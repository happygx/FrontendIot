<!--
 * @Author: happygx
 * @Date: 2019-10-08 15:22:58
 * @LastEditors: happygx
 * @LastEditTime: 2019-10-09 13:50:30
-->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Redirect"
})
export default class extends Vue {
  created() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: "/" + path, query });
  }

  render() {
    // Avoid warning for missing template
  }
}
</script>
