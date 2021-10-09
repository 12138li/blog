import Vue from 'vue';
export default function getComponentRootDom(comp, props){
    const vm = new Vue({
      //渲染组件
      render: h => h(comp, {props})
    })
    vm.$mount();
    // console.log(vm.$el)//得到的就是渲染后的comp真实dom根元素
    return vm.$el;
  }