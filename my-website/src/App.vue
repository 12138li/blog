<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <RouterView />
      </template>
    </Layout>
    <Top />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/Aside";
import Top from "@/components/Top";
export default {
  components: {
    Layout,
    SiteAside,
    Top,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
}
.aside {
  width: 250px;
  height: 100%;
}
</style>
