<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div>
    <el-breadcrumb separator="/" class="mb">
  <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
 
</el-breadcrumb>
<el-card class="card">
<el-row>
  <el-col :span="12" class="info" style="text-align:left">
  <span>运单编号: YGC20170110000001</span>
  <span>创建时间:2022-08-24</span>
  <span>审核员:张三丰</span>
  </el-col>
 <el-col :span="12" style="text-align:right">
<el-button type="primary" @click="back">返回</el-button>
</el-col>

</el-row>
</el-card >
<el-steps  :active="2" align-center class="mt">
<el-step title="未发货"></el-step>
<el-step title="运输中"></el-step>
<el-step title="已收货"></el-step>
<el-step title="已完成"></el-step>
</el-steps>
  </div>
</template>

<script>
/*
include 包含 只缓存这个   跟的是组件的名字  组件name的名字不是路由的名字 还可以接受数值include=[] 多个组件
exclude 不包含 除了这个不缓存别的都缓存

<keep-alive include="组件名">
  可以放<router-view></router-view>
  还可以放<component></component>  项目发车数据单看一下
  </keep-alive> */
import breadCrumd from "@/mixins/breadCrumb";
import { mapMutations } from "vuex";
export default {

  mixins: [breadCrumd],

  beforeRouteLeave(to, from, next) {
    //做一个 标记
    if (to.path == "/waybill/list") {
      this.changeIsFromDetail(true)
    } else {
     
      this.changeIsFromDetail(false)
    }
    next();
  },
  
  methods: {
    ...mapMutations(["changeIsFromDetail"]),
    back() {
        this.$router.push("/waybill/list")
      }
    }
}
</script>

<style lang="less" scoped>

</style>