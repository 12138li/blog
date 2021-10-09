<template>
  <img :src="url" :width="width+'px'" :height="height+'px'" class="Avator-img"/>
</template>

<script>
export default {
  props: {
    url: {
      type: String, //意思是传递的数据必须是字符串类型
      required: true, //属性必传
    },
    width:{
        type:Number,
        default:200//在没有传递值时候的默认值
    },
    height:{
        type:Number,
        default:200//在没有传递值时候的默认值
    },
  },
};
</script>

<style scoped>
.Avator-img{
    border-radius: 50%;
    object-fit: cover;
    /* 为了防止放在行内盒产生白边 */
    display: block;
    margin: 0 auto;
}
</style>