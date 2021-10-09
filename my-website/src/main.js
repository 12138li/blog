import "./mock";
import "./eventBus"
import Vue from 'vue';
import App from './App.vue';
import "./styles/global.less";
import router from "@/router";
import store from "@/store";
store.dispatch("setting/getData");
import showMessage from "@/utils/showMessage";
Vue.prototype.$showMessage = showMessage;


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

// import * as blog  from "./api/blog";
// import getBanners from "./api/banner"

// getBanners().then(r=>{
//   console.log("首页",r);
// })

// blog.getBlogType().then((r)=>{
//   console.log("博客分类", r);
// })
// blog.getBlogList(2, 10, 3).then((r)=>{
//   console.log("博客列表", r);
// })

// import getSetting from "@/api/setting";
// getSetting().then((r)=>{
//   console.log(r,123);
// })