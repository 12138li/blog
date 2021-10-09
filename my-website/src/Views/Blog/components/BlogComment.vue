<template>
  <div class="BLogComment-container" id="data-form-container">
    <MessageArea
      :list="data.rows"
      title="评论列表"
      :subTitle="`(${data.total})`"
      @submit="handleSubmit"
      :isListLoading="isLoading"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getComment, submitComment } from "@/api/blog";
import fetchData from "@/mixins/common";
export default {
  components: {
    MessageArea,
  },
  mixins: [fetchData([])],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("scrollTop", this.dataMore);
  },
  destroyed() {
    this.$bus.$off("scrollTop", this.dataMore);
  },
  methods: {
    dataMore(dom) {
      if(this.isLoading){
        return;
      }
      let top = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if ((top <= 100) && (this.data.rows.length<this.data.total)) {
        this.fetchMore();
      }
    },
    async fetchMore() {
      this.isLoading = true;
      this.page++;
      const result = await this.fetchData();
      this.data.rows = this.data.rows.concat(result.rows);
      this.isLoading = false;
    },
    async fetchData() {
      return await getComment(this.page, this.limit, this.$route.params.id);
    },
    async handleSubmit(formData, callback) {
      let result = await submitComment({
        typeId: this.$route.params.id,
        ...formData,
      });
      // console.log(result,789654);
      this.data.rows.unshift(result);
      this.data.total++;
      callback("评论成功");
    },
  },
};
</script>

<style >
</style>