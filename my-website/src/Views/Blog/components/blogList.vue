<template>
  <div class="blogList-container" v-Loading="isLoading" ref="container">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link :to="{ name: 'BlogDetail', params: { id: item.id } }">
            <img v-lazy="item.thumb" :alt="item.title"  :title="item.title"/>
          </router-link>
        </div>
        <div class="message">
          <router-link :to="{ name: 'BlogDetail', params: { id: item.id } }">
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="message-comment">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览:{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <span>{{ item.category.name }}</span>
          </div>
          <div class="message-container">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Pager
      :total="data.total"
      :current="routerInfo.currentpage"
      :limit="routerInfo.limit"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate";
import Pager from "@/components/Pager";
import Loading from "@/directives/loading.js";
import fetchData from "@/mixins/common.js";
import { getBlogList } from "@/api/blog.js";
import lazy from "@/directives/lazy.js";
export default {
  components: {
    Pager,
  },
  mixins: [fetchData({})],
  directives: {
    Loading,
    lazy
  },
  computed: {
    routerInfo() {
      let currentpage = +this.$route.query.page || 1;
      let limit = +this.$route.query.limit || 10;
      let typeId = +this.$route.params.typeId || -1;
      return {
        currentpage,
        limit,
        typeId,
      };
    },
  },
  mounted() {
    this.$bus.$on("toTop", this.toTop);
    this.$refs.container.addEventListener("scroll", this.hansdelScroll);
  },
  brforeMounted() {
    this.$bus.$off("toTop", this.toTop);
    this.$refs.container.removeEventListener("scroll", this.hansdelScroll);
  },
  methods: {
    formatDate,
    hansdelScroll() {
      this.$bus.$emit("scrollTop", this.$refs.container);
    },
    toTop(top) {
      this.$refs.container.scrollTop = top;
    },
    async fetchData() {
      return await getBlogList(
        this.routerInfo.currentpage,
        this.routerInfo.limit,
        this.routerInfo.typeId
      );
    },
    handlePageChange(newPage) {
      this.routerInfo.currentpage = newPage;
      if (this.routerInfo.typeId == -1) {
        this.$router.push({
          name: "Blog",
          query: {
            page: this.routerInfo.currentpage,
            limit: this.routerInfo.limit,
          },
        });
      } else {
        this.$router.push({
          name: "BlogType",
          query: {
            page: this.routerInfo.currentpage,
            limit: this.routerInfo.limit,
          },
          params: {
            typeId: this.routerInfo.typeId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.blogList-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin: 10px 0 0 0;
  scroll-behavior: smooth;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 15px 15px 0 15px;
  padding-bottom: 15px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.thumb img {
  max-width: 200px;
  border-radius: 5px;
}
.message {
  padding: 0 15px;
  line-height: 1.5rem;
  padding-bottom: 25px;
}
.message h2 {
  margin: 0;
}
.message-comment span {
  color: #b4b8bc;
  margin-right: 15px;
  font-size: 13px;
  line-height: 2rem;
}
</style>