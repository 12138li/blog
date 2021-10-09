<template>
  <div class="detail-container">
    <h2>{{ blog.title }}</h2>
    <div class="message">
      <span>日期: {{ formatDate(blog.createDate) }}</span>
      <span>浏览: {{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论: {{ blog.commentNumber }}</a>
      <router-link
        :to="{ name: 'BlogType', params: { typeId: blog.type.id } }"
        >{{ blog.type.name }}</router-link
      >
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate.js";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped>
@import "~@/styles/markdown.css";
.message span,
a {
  color: #b4b8bc;
  margin-right: 15px;
  font-size: 13px;
  line-height: 2rem;
}
.markdown-body {
  margin: 2em 0;
}
</style>