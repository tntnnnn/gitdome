<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>

<el-row type="flex" justify="center">
  <el-card class="box-card">
  <div slot="header" class="clearfix">
  <h2 >邦达物流后台管理系统</h2>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
       
        <el-form-item label="用户名:" prop="username">
            <el-input v-model.trim="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
            <el-input v-model.trim="ruleForm.password" type="password"></el-input>
        </el-form-item>
 <el-form-item>
  <el-button type="primary" style="width:100%" @click="login" :loading="loading">登录</el-button>
 </el-form-item>
       
      </el-form>
     
    </div>
  </div>

</el-card>
</el-row>
  </div>
</template>

<script>
import { post } from "@/utils/http"
import { setToken } from "@/utils/auth"
import { mapMutations } from "vuex"
  export default {
  data() {
      return {
        loading:false,
        ruleForm: {
        username: "",
        password:""
    },
        rules: {
          username: [
          {
              required: true,
              message: "用户名不能为空",
              trigger:"blur"
             
          },{
            pattern: /^\w{4,8}$/,
            message: "用户面要求4-8位数字字母组合",
            trigger:"blur"
          }
          
          ],
          password: [
            {
              required: true,
              message: "密码不能为空",
              trigger: "blur"
            }, {
              pattern: /^\d{6}$/,
              message: "密码要求是6位纯数字",
              trigger:"blur"
            }

          ]
    }
  }
  },
  methods: {
    ...mapMutations(["setRole"]),
    login() {     
      this.$refs.ruleForm.validate((vaild) => {
        if (vaild) {
          this.loading=true
         // console.log(vaild);
         /*  axios({
            url: "http://localhost:8080/login",
            method: "post",
            data:this.ruleForm
         
          }).then(res => {
          console.log("then",res);
        }) */
          post("/login", this.ruleForm).then(res => {
            //动态添加路由表，动态添加的路由刷新就丢失        
            this.loading=false
            setToken(res.token)
            this.setRole(res.role);
            
            //console.log(1, res.data);
            sessionStorage.setItem("nickname",res.nickname)
            this.$router.push("/")
          }).catch((error) => {
            this.loading=false
          console.log(error);
        })
      }
    })
  }
}
  }
</script>

<style lang="less" scoped>


.box-card{
width: (1000px/2);
margin-top: 100*2px;
h2{
  text-align: center;
  margin-bottom: 50px;
}

}

</style>