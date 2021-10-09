<template>
  <Layout>
    <div ref="detailMain" class="detail-main" v-Loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="toc" v-Loading="isLoading">
        <BlogToc :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogToc from "./components/BlogToc";
import BlogComment from "./components/BlogComment";
import { getBlogDetail } from "@/api/blog";
import fetchData from "@/mixins/common";
import Loading from "@/directives/loading";
import titleController from "@/utils/setTitle";

export default {
  components: {
    Layout,
    BlogDetail,
    BlogToc,
    BlogComment,
  },
  mixins: [fetchData(null)],
  directives: {
    Loading,
  },
  mounted() {
    this.$refs.detailMain.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("toTop", this.toTop);
  },
  beforeDestroyed() {
    this.$refs.detailMain.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("toTop", this.toTop);
  },
  methods: {
    async fetchData() {
      let resp = await getBlogDetail(this.$route.params.id);
      titleController.setRouterTitle(resp.title);
      return resp;
    },
    handleScroll() {
      this.$bus.$emit("scrollTop", this.$refs.detailMain);
    },
    toTop(scrollTop) {
      this.$refs.detailMain.scrollTop = scrollTop;
    },
  },
};
</script>

<style scoped>
.detail-main {
  height: 100%;
  width: 100%;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.toc {
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
}
</style>