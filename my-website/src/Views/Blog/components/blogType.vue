<template>
  <div class="blogtype-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import fetchData from "@/mixins/common.js";
import Loading from "@/directives/loading.js";
import { getBlogType } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  components:{
    RightList,
  },
  directives: {
    Loading,
  },
  computed: {
    typeId() {
      return +this.$route.params.typeId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      let total = this.data.reduce((a, b) => {
        return a + b.articleCount;
      }, 0);

      let result = [
        {
          name: "全部",
          id: -1,
          articleCount: total,
        },
        ...this.data,
      ];
  // 注意返回是是一个数组，函数里没有使用其他代码，只使用了一个展开符，加了一个括号表示表达式
      return result.map((item) => ({
        ...item,
        isSelect: item.id === this.typeId,
        aside:`${item.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogType();
    },
    handleSelect(item) {
      if (item.id == -1) {
        this.$router.push({
          name: "Blog",
          query: {
            page: 1,
            limit: this.limit,
          },
        });
      } else {
        this.$router.push({
          name: "BlogType",
          query: {
            page: 1,
            limit: this.limit,
          },
          params: {
            typeId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.blogtype-container {
  padding: 15px;
  width: 150px;
}
h2 {
  margin: 0;
  font-weight: 600;
}

</style>