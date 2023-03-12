<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-container>
  <el-aside width="200px" class="aside">
    <nav-left></nav-left>
  </el-aside>
  <el-container>
    <el-header  class="head"><top-header></top-header></el-header>
    <el-main class="maina">
      <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-main>
    <el-footer class="foot">京ICP备8888888888号 京公安网备112377777778号</el-footer>
  </el-container>
</el-container>
  </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from "@/components/TopHeader.vue"
  export default {
  components: {
      NavLeft,
      TopHeader
    }
  }
</script>

<style lang="less" scoped>
.head {
  background-color: #fff;
  line-height: 60px;
  box-shadow: 0 2px 2px rgba(0,21,41,0.3);
}
.aside {
  background: #001529 ;
  height: 100vh;//分成100等分 分100分
}
 .maina{
  height: 70vh;
  background-color: #e9eef3;
} 
.foot {
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 60px;
  background-color: #e9eef3;
}
</style>