<template>
  <div
    class="carouselItem-container"
    ref="outercontainer"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="caroudelImage" ref="innerContainer" :style="positionSize">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="LoadEnd"
      />
      <div class="title" ref="title">{{ carousel.title }}</div>
      <div class="description" ref="des">{{ carousel.description }}</div>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: {
    ImageLoader,
  },
  props: ["carousel"],
  data() {
    return {
      titleWidth: 0,
      desWidth: 0,
      containerSize: null,
      innerSize: null,
      mouseSize:null,
    };
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.desWidth = this.$refs.des.clientWidth;
    this.setSize();
    // console.log(this.mouseSize)
    this.mouseSize = {
        mouseX: this.center.x,
        mouseY: this.center.y,
      };
      window.addEventListener("resize",this.getSize);
  },
  destroyed(){
    window.removeEventListener("resize",this.getSize);
  },
  computed: {
    extra() {
      return {
        width: this.innerSize.width - this.containerSize.width,
        height: this.innerSize.height - this.containerSize.height,
      };
    },
    positionSize() {
      if (!this.innerSize || !this.containerSize||!this.mouseSize) {
        return;
      }
      let size={
        left:(-this.extra.width/this.containerSize.width)*this.mouseSize.mouseX,
        top:(-this.extra.height/this.containerSize.height)*this.mouseSize.mouseY
      }
      return {
        top:size.top+'px',
        left:size.left+'px'
      };
      // return {
      //   transform: `translate(${size.top}px, ${size.left}px)`,
      // };
    },
    center(){
       return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    }
  },
  methods: {
    LoadEnd() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth; // reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.des.style.opacity = 1;
      this.$refs.des.style.width = 0;
      this.$refs.des.clientWidth; // reflow
      this.$refs.des.style.transition = "2s 1s";
      this.$refs.des.style.width = this.desWidth + "px";
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.outercontainer.clientWidth,
        height: this.$refs.outercontainer.clientHeight,
      };

      this.innerSize = {
        width: this.$refs.innerContainer.clientWidth,
        height: this.$refs.innerContainer.clientHeight,
      };
    },
    handleMouseMove(e) {
      // console.log(e);
      const rect = this.$refs.outercontainer.getBoundingClientRect();
      // console.log(rect);
      this.mouseSize = {
        mouseX: e.clientX - rect.left,
        mouseY: e.clientY - rect.top,
      };
      // console.log(this.mouseSize);
    },
    handleMouseLeave(e) {
      // console.log(e);
       this.mouseSize = {
        mouseX: this.center.x,
        mouseY: this.center.y,
      };
    },
  },
};
</script>

<style scoped>
.carouselItem-container {
  width: 100%;
  height: 100%;
  position: relative;
  /* z-index: -1; */
  overflow: hidden;
}
.caroudelImage {
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
}
.title,
.description {
  position: absolute;
  left: 10%;
  letter-spacing: 3px;
  color: #ccc;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  opacity: 0;
  /* 解决文字排不下的问题 */
  overflow: hidden;
  white-space: nowrap;
}
.title {
  font-size: 2rem;
  top: calc(50% - 40px);
}
.description {
  font-size: 1.2rem;
  top: calc(50% + 20px);
}
</style>