<template>
  <div class="imageLoader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="" />
    <img
      @load="handleLoad"
      :src="src"
      alt=""
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false,
      everythingDone: false,
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
      }, this.duration);
      console.log("原图加载完成");
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.imageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  // 让模糊区域隐藏（filter的影响)
  overflow: hidden;
  img {
    .self-fill();
    // 调节图片比例失调的
    object-fit: cover;
  }
  .origin {
    opacity: 0;
  }
  .placeholder {
    //让站位图片更加模糊
    filter: blur(2vw);
  }
}
</style>