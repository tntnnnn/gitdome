<template>
  <div>
    <h1 class="title">邦达国际物流平台</h1>
    <el-menu    
    :router="true"    
    background-color="#001529"
      text-color="#fff"
     >
      <menus-vue v-for="(item,index) in menuData" :key="index" :menu="item"></menus-vue>
    </el-menu>
  </div>
</template>

<script>
import { get } from "@/utils/http"
import MenusVue from  "./MenusVue.vue"
export default {
  data() {
    return {
        menuData:[]
      }
    },
  created() { 
    this.getMenu()
  },
  methods: {
      //获取菜单项
  async  getMenu() {
     let {data}= await get("/menu")
      this.menuData=data
      }
  },
  components: {
      MenusVue
    }
  }
</script>

<style lang="less" scoped>
.title{
  line-height: 50px;
  color: #fff;
  text-align: center;
}
</style>