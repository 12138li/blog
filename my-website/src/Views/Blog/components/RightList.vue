<template>
  <div class="rightlist-container">
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <span :class="{ active: item.isSelect }" @click="handleClick(item)">{{
          item.name
        }}</span>
        <span
          v-if="item.aside"
          :class="{ active: item.isSelect }"
          @click="handleClick(item)"
          class="aside"
          >{{ item.aside }}
          </span>
        <RightList :list="item.children" @select="handleClick" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style scoped>
.rightlist-container{
  margin-left: 1rem;
  font-size: 14px;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  margin-top: 15px;
}

li span {
  cursor: pointer;
}
.aside {
  margin-left: 15px;
  text-align: center;
  font-size: 13px;
  color: #bbb;
}
ul li .active {
  color: #dc6a12;
}
</style>