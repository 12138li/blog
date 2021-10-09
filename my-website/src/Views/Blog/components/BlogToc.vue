<template>
  <div class="toc">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import debounce from "@/utils/debounce";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      active: "",
    };
  },
  computed: {
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((item) => ({
          ...item,
          isSelect: item.anchor === this.active,
          children: getTOC(item.children),
        }));
      };
      return getTOC(this.toc);
    },
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const item of toc) {
          doms.push(document.getElementById(item.anchor));
          if (item.children) {
            addToDoms(item.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  created(){
    this.$bus.$on("scrollTop",this.debounce(this.setActive,50,true))
  },
  methods: {
    debounce,
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setActive() {
      const range = 200;
      for (const item of this.doms) {
        const top = item.getBoundingClientRect().top;
        if (top < 200 && top > 0) {
          this.active = item.id;
        } else if (top > range) {
          return;
        } else {
          this.active = item.id;
        }
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-left: 10px;
}
</style>