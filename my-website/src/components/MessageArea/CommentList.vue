<template>
  <div class="comment-list">
    <ul>
      <li v-for="item in list" :key="item.id">
        <div class="image">
          <Avatar :url="item.avatar" :width="44" :height="44" />
        </div>
        <div class="comment-list-item">
          <div class="nickname">{{item.nickname}}</div>
          <div class="comment-list-item-container">{{item.content}}</div>
          <div class="time">{{formatDate(item.createDate,true)}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import formatDate from "@/utils/formatDate";
export default {
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
    },
  },
  methods:{
      formatDate,
  }
};
</script>

<style scoped>
ul,li{
    margin: 0;
    padding: 0;
}
li{
    list-style: none;
    display: flex;
    margin-top:15px ;
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
}
.comment-list-item{
    margin-left: 15px;
    position: relative;
    width: 100%;
}
.nickname{
    color: #65a13b;
    margin-bottom: 10px;
}
.time{
    position: absolute;
    top: 0;
    right: 0;
    font-size: 13px;
    color: #bbb;
}
</style>