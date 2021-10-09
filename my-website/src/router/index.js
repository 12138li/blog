import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes.js";
import titleController from "@/utils/setTitle";

Vue.use(VueRouter);

const router = new VueRouter({
  //配置
  routes,
  mode: "history"
});

router.afterEach((to,from) => {
  if (to.meta.title) {
    titleController.setRouterTitle(to.meta.title)
  }
})
export default router;