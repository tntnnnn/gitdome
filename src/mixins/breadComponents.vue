<template>
  <div>
    <el-breadcrumb separator="/">
  <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
 
</el-breadcrumb>
  </div>
</template>


<script>
export default {
    data() {
        return {
            breadList: []
        }
    },
    created() {
        this.getBreadCrumb()
    },
    watch: {
        //params query
        //监听data 计算属性 props $route
        $route() {
            this.getBreadCrumb()
        }
    },
    methods: {
        getBreadCrumb() {
            this.breadList = this.$route.meta.bread || []
        }
    }
}
</script>