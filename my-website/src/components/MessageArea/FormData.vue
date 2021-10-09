<template>
  <form class="data-form-container" ref="form" @submit.prevent="handleSubmit">
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          maxlength="10"
          v-model="formData.nickname"
          placeholder="用户昵称"
          @focus="showName=false"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error" v-show="showName">请输入用户昵称</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          type="text"
          maxlength="300"
          v-model="formData.content"
          placeholder="输入评论"
          @focus="showContent=false"
        />
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error" v-show="showContent">请输入评论</div>
    </div>
    <div class="form-item">
      <button :disabled="submiting">提交</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      showName: false,
      showContent: false,
      submiting: false,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.formData.nickname && !this.formData.content) {
        this.showName = true;
        this.showContent = true;
        return;
      } else if (!this.formData.nickname) {
        this.showName = true;
        return;
      } else if (!this.formData.content) {
        this.showContent = true;
        return;
      } else {
        this.submiting = true;
        this.showName = false;
        this.showContent = false;
        this.formData.nickname = "";
        this.formData.content = "";
        this.$emit("submit", this.formData, (message) => {
          this.$showMessage(message, "success", 2000, this.$refs.form);
           this.submiting = false;
        });
      }
    },
  },
};
</script>

<style scoped>
.data-form-container {
  margin-bottom: 15px;
}
.form-item {
  margin-bottom: 8px;
  position: relative;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  outline: none;
  color: #ccc;
  font-size: 14px;
  border-radius: 4px;
}
input:focus,
textarea:focus {
  border-color: rgb(125, 151, 236);
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: rgb(240, 48, 48);
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: rgb(125, 151, 236);
}
button:hover {
  background: rgb(105, 137, 240);
}
button:disabled {
  background: rgb(167, 186, 247);
  cursor: not-allowed;
}
</style>