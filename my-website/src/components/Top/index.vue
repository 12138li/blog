<template>
  <div @click="handelClick" v-show="show" class="scrollTOTop">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("scrollTop", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("scrollTop", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 100;
    },
    handelClick(){
        this.$bus.$emit("toTop",0);
    }
  },
};
</script>

<style scoped>
.scrollTOTop {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgb(134, 134, 240);
  color: #fff;
  text-align: center;
  line-height: 40px;
  position: fixed;
  bottom: 30px;
  right: 50px;
  cursor: pointer;
}
</style>