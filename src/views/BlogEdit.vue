<template>
  <div>
    <Header></Header>

    <div class="mconent">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="起止时间" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="ruleForm.startTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="stime">
              <el-time-picker
                placeholder="选择时间"
                value-format="HH:mm:ss"
                v-model="ruleForm.stime"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "BlogEdit",
  components: { Header },
  data() {
    return {
      ruleForm: {
        id: "",
        startTime: "",
        stime:"",
        title: "",
        description: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 150,
            message: "长度在 3 到 150 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" },
          {
            min: 3,
            max: 150,
            message: "长度在 3 到 150 个字符",
            trigger: "blur",
          },
        ],
          startTime: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          stime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 3,
            max: 150,
            message: "长度在 3 到 150 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          debugger
          const res = this.ruleForm;
          const _this = this;
          _this.$axios
            .post("blog/edit", this.ruleForm, {
              headers: { 'Authorization': localStorage.getItem("token") },
            })
            .then((res) => {
              _this.$alert("操作成功", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  _this.$router.push("/blog");
                },
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    const blogId = this.$route.params.blogId;
    const _this = this;
    if (blogId) {
      this.$axios.get("/blog/" + blogId).then((res) => {
        const blog = res.data.data;
        _this.ruleForm.id = blog.id;
        _this.ruleForm.title = blog.title;
        _this.ruleForm.description = blog.description;
        _this.ruleForm.startTime = blog.startTime;
        _this.ruleForm.stime = blog.stime;
        debugger
        _this.ruleForm.content = blog.content;
      });
    }
  },
};
</script>

<style scoped>
.mconent {
  max-width: 900px;
  text-align: center;
  margin: auto;
}
</style>