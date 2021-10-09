<template>
    <Layout>
    <Bloglist />
    <template #right>
      <Blogtype />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout"
import Bloglist from "./components/blogList";
import Blogtype from "./components/blogType";
export default {
components:{
  Layout,
  Bloglist,
  Blogtype
}
}
</script>

<style>

</style>