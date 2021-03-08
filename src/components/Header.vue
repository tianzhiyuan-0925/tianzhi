<template>
  <div class="mcontent">
    <h3>欢迎来到Markerhub的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
    </div>
    <div>{{ user.username }}</div>
    <div class="scenter">
      <span><el-link href="/blog" type="primary">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link href="/blog/add" type="success">发表文章</el-link></span>
       <el-divider direction="vertical"></el-divider>
      <span><el-link v-show="!hasLogin" href="/login" type="primary">登录</el-link></span>
      <span><el-link v-show="hasLogin" @click="logout" type="danger">退出</el-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        username: "我是你爹",
        avatar:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
      hasLogin: false
    };
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios
        .get("/logout", {
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
        .then((res) => {
          _this.$store.commit("REMOVE_INFO");
          _this.$router.push("/login");
        });
    },
  },
  created(){
      if(this.$store.getters.getUser.username){
         this.user.username = this.$store.getters.getUser.username
         this.user.avatar = this.$store.getters.getUser.avatar
         this.hasLogin = true
      }
  }
};
</script>

<style scoped>
.mcontent {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
.scenter {
  margin: 10px 0;
}
</style>