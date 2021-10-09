import eventBus from "@/eventBus";
import defaultGif from "@/assets/default.gif";

let imgs = [];

function setImage(img){
    console.log(img.dom)
    img.dom.src = defaultGif; // 先暂时使用着默认图片
    // 处理图片
    // 该图片是否在视口范围内
    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    const height = rect.height || 150;
    if (rect.top >= -height && rect.top <= clientHeight) {
      // 在视口范围内
      // const tempImg = new Image();
      // tempImg.onload = function() {
      //   // 当真实图片加载完成之后
      //   img.dom.src = img.src;
      // };
      // tempImg.src = img.src;
      img.dom.src = img.src;
      imgs = imgs.filter((i) => i !== img);
    }
}

function setImages() {
    for (const img of imgs) {
        setImage(img);
    }
}

function handleScroll() {
    setImages();
}
eventBus.$bus.$on("scrollTop", handleScroll)

export default {
    inserted(el, bindings) {
        const img = {
          dom: el,
          src: bindings.value,
        };
        imgs.push(img);
        // 立即处理它
        setImage(img);
      },
      unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el);
      },
}