<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div v-for="item in data" :key="item.id" class="project-item">
      <a
        :href="
          item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
        "
        :target="item.url ? '_blank' : '_self'"
      >
        <img class="thumb" v-lazy="item.thumb" />
      </a>
      <div class="info">
        <h2>
          <a
            :href="
              item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
            "
            :target="item.url ? '_blank' : '_self'"
          >
            {{ item.name }}
          </a>
        </h2>
        <a
          class="github"
          target="_blank"
          :href="item.github"
          v-if="item.github"
        >
          github
        </a>
        <p v-for="(desc, i) in item.description" :key="i">
          {{ desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "@/directives/loading";
import lazy from "@/directives/lazy";
export default {
  directives: {
    Loading,
    lazy,
  },
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
  mounted() {
    this.$bus.$on("toTop", this.handleSetMainScroll);
    this.$refs.projectContainer.addEventListener("scroll", this.handleMainScroll);
  },
  beforeDestroy() {
    this.$bus.$emit("scrollTop");
    this.$bus.$off("toTop", this.handleSetMainScroll);
    this.$refs.projectContainer.removeEventListener("scroll", this.handleMainScroll);
  },
  methods: {
    handleSetMainScroll(scrollTop) {
      this.$refs.projectContainer.scrollTop = scrollTop;
    },
    handleMainScroll() {
      this.$bus.$emit("scrollTop", this.$refs.projectContainer);
    },
  },
};
</script>

<style  scoped>
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
}
.project-item:hover {
  box-shadow: -1px 1px 5px #000;
  transform: scale(1.01) translate(3px, -3px);
  color: inherit;
}
.project-item .thumb {
  width: 250px;
  min-height: 150px;
  flex: 0 0 auto;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}
.project-item .info {
  line-height: 1.7;
  flex: 1 1 auto;
}
.project-item .info h2 {
  margin: 0;
}
.project-item .github {
  font-size: 14px;
  color: #6b9eee;
}
</style>
