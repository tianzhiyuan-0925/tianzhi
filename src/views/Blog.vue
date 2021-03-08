<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>

        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs" :key="blog.id">
          <el-card>
            <h4>
                标题：<router-link :to="{name: 'BlogDetail', params:{blogId: blog.id}}">
                {{blog.title}}
                </router-link>
            </h4>
            <p>摘要：{{blog.description}}</p>
            <p>启动时间：{{blog.startTime}}</p>
            <p>结束时间：{{blog.stime}}</p>
          </el-card>
        </el-timeline-item>

      </el-timeline>
      <el-pagination
        class="mpage"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change=page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "Blog",
  components: { Header },
  data() {
      return{
        blogs: {},
        currentPage: 1,
        total: 0,
        pageSize: 3,
        timer: '',
        value: 0
    }
  },
  methods:{
    page(currentPage) {
        const _this = this;
        _this.$axios.get("/blogs?currentPage=" + currentPage +"&"+ "pageSize=" + 2).then((res) => {
        _this.blogs = res.data.data.records;
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
        });
  },
  get(){
    this.value++ 
    console.log(this.value)

        this.$axios.get("/blog/" + 20).then((res) => {
        const blog = res.data.data;
        if(blog.id){
        this.$notify({
          title: '消息提示',
          message: '你有一条未读消息',
          position: 'bottom-right'
        });
        }
        console.log(blog)
      });
  }
  },
  //循环定时器
  // mounted() {
  //     this.timer = setInterval(this.get, 1000);
  // },
     beforeDestroy() {
      clearInterval(this.timer);
    },
  created(){
    this.page(1)
  }
};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
</style>