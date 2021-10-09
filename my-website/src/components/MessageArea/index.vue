<template>
  <div class="comment-containr">
    <FormData v-on="$listeners" />
    <h3>
      {{ title }} <span>{{ subTitle }}</span>
    </h3>
    <CommentList :list="list" />
    <div class="loading" v-show="isListLoading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import CommentList from "./CommentList";
import FormData from "./FormData";
import Loading from "@/directives/loading";
export default {
  components: {
    CommentList,
    FormData,
  },
  directives:{
    Loading,
  },
  props: {
    list: {
      type: Array,
    },
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loading {
  position: relative;
  height: 100px;
}
</style>