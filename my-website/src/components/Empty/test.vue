<template>
  <div class="test-container">
    <Empty />
  </div>
</template>

<script>
import Empty from "@/components/Empty";
export default {
  components: {
    Empty,
  },
};
</script>

<style scoped >
.test-container {
  width: 500px;
  height: 400px;
  border: 2px solid;
  margin: 0 auto;
  /* 为了让组件居中，使用定位 ，父元素必须要是定位元素*/
  position: relative;
}
</style>