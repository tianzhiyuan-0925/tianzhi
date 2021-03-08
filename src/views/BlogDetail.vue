<template>
  <div>
    <Header></Header>
    <div class="mcontent">
      <h2>{{ blog.title }}</h2>
      <router-link :to="{name:'BlogEdit',params:{blogId:blog.id}}" v-if="showBlog">
          <el-button type="text">编辑</el-button>
      </router-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import 'github-markdown-css'
export default {
  name: "BlogDetail",
  components: { Header },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: "",
      },
      showBlog:false
    };
  },
  created() {
    const blogId = this.$route.params.blogId;
    const _this = this;
    if (blogId) {
      this.$axios.get("/blog/" + blogId).then((res) => {
        const blog = res.data.data;
        _this.blog.id = blog.id;
        _this.blog.title = blog.title;
        var MardownIt = require("markdown-it")
        var md = new MardownIt()
        var result = md.render(blog.content)
        _this.blog.content = result;
        _this.showBlog = (blog.userId === _this.$store.getters.getUser.id)
      });
    }
  },
};
</script>

<style scoped>
.mcontent {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
}
</style>