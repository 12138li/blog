<template>
  <div class="home-container" @wheel="handleWheel" v-loading="isLoading">
    <ul
      ref="carousel"
      :style="{ marginTop }"
      @transitionend="isSwitching = false"
    >
      <li v-for="item in data" :key="item.id">
        <carousel-item :carousel="item"></carousel-item>
      </li>
    </ul>
    <div class="arrowUp" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div class="arrowDown" v-show="index < 2" @click="switchTo(index + 1)">
      <Icon type="arrowDown" />
    </div>
    <div class="indicator">
      <ul>
        <li
          v-for="(item, i) in data"
          :key="i"
          :class="{ active: index == i }"
          @click="switchTo(i)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import CarouselItem from "./Carouselitem.vue";
import Loading from "@/directives/loading.js";
import Icon from "@/components/Icon";
export default {
  components: {
    CarouselItem,
    Icon,
  },
  directives: {
    Loading,
  },
  data() {
    return {
      index: 0,
      ulHeight: 0,
      isSwitching: false,
    };
  },
  computed: {
    marginTop() {
      return -this.index * this.ulHeight + "px";
    },
    ...mapState("banner",['data',"isLoading"]),
  },
  created(){
    this.$store.dispatch("banner/getBanners")
  },
  mounted() {
    // console.log(this.$refs.carousel.clientHeight)
    this.ulHeight = this.$refs.carousel.clientHeight;
    // 通过监听浏览器屏幕的大小变化来改变ulHeight的值，从而改变marginTop的值
    window.addEventListener("resize", this.resizeUlHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeUlHeight);
  },
  methods: {
    switchTo(newIndex) {
      this.index = newIndex;
    },
    handleWheel(e) {
      if (this.isSwitching) {
        return;
      }
      // if (e.deltaY >= -5 && e.deltaY <= 5) {
      //   return;
      // } else if (e.deltaY > 5) {
      //   if (this.index >=this.data.length-1) {
      //     return;
      //   }
      //   this.index++;
      //   this.isSwitching=true;
      // } else {
      //   if (this.index <= 0) {
      //     return;
      //   }
      //   this.index--;
      //   this.isSwitching=true;
      // }

      // 实现滚轮滚动，且通过isSwitching来实现在滚动的时候不会再次滚动
      if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.index++;
        this.isSwitching = true;
      } else if (e.deltaY < -5 && this.index > 0) {
        this.index--;
        this.isSwitching = true;
      }
    },
    resizeUlHeight() {
      this.ulHeight = this.$refs.carousel.clientHeight;
    },
  },
};
</script>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* 解决外层的div与ul的外边距合并问题使div跑上面去了 */
  overflow: hidden;
  /* 测试 */
  /* width: 60%;
  height: 40%;
  overflow: visible;
  border: 2px solid #008c8c;
  margin: 100px auto; */
}
.home-container ul {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  transition: 0.4s;
}
.home-container li {
  list-style: none;
  width: 100%;
  height: 100%;
}
.arrowUp {
  position: absolute;
  left: 50%;
  top: 15px;
  transform: translate(-50%, -50%);
  /* 实现一上一下的动画效果 */
  animation: jump-up 1.3s infinite;
  cursor: pointer;
}
.arrowDown {
  position: absolute;
  left: 50%;
  bottom: 15px;
  transform: translate(-50%, 0);
  animation: jump-down 1.3s infinite;
  cursor: pointer;
}
.iconfont {
  font-size: 28px;
  color: #ccc;
}
@keyframes jump-up {
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
}
@keyframes jump-down {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
}
.indicator {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
.indicator li {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #fff;
  margin: 5px;
}
.active {
  background: #fff;
}
</style>