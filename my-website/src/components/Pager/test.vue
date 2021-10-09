<template>
  <div>
    <Pager :total="total" :current="current" @pageChange="handlePageChange" />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      total:302,
      current:1
    };
  },
  methods: {
    handlePageChange(newPage) {
      // console.log("注册事件",newPage);
      this.current = newPage;
    },
  },
};
</script>

<style>
</style>