<template>
  <div>
<break-components></break-components>
<el-card  class="mt">

  <el-row :gutter="20">
   <el-form label-width="80px" >
    <el-col  :span="12">
      <el-form-item label="运单号" >
        <el-input ></el-input>
      </el-form-item>
      
      <el-form-item label="起始城市" >
        <el-input ></el-input>
      </el-form-item>
      <el-form-item label="目的城市" >
        <el-input ></el-input>
      </el-form-item>
      <el-form-item label="货物名称" >
        <el-input ></el-input>
      </el-form-item>
      <el-form-item label="件数" >
        <el-input ></el-input>
      </el-form-item>
    </el-col>
    <el-col  :span="12">
      <el-form-item label="单位">
        <el-input ></el-input>
      </el-form-item>
      <el-form-item label="运费" >
        <el-input ></el-input>
      </el-form-item>
     
     </el-col>
   </el-form>
  </el-row>


  <span >
    <el-button >取消</el-button>
    <el-button type="primary" >保存</el-button>
  </span>
</el-card>
  </div>
</template>

<script>
import breakComponents from "@/mixins/breadComponents.vue"
export default {
  data() {
    return {
      rules: {
        name: [{  required: true, message: "不能为空", trigger: "blur" }],
        start: [{ required: true, message: "不能为空", trigger: "blur" }],
        end:   [{ required: true, message: "不能为空", trigger: "blur" }],
        cargo: [{ required: true, message: "不能为空", trigger: "blur" }],
        count: [{ required: true, message: "不能为空", trigger: "blur" },
               {  pattern:/^\d+$/,message:"只能为数字",trigger: "blur"}],
        unit:  [{ required: true, message: "不能为空", trigger: "blur" }],
        price: [{ required: true, message: "不能为空", trigger: "blur" }],
        pay:   [{ required: true, message: "不能为空", trigger: "change" }],
        from:  [{ required: true, message: "不能为空", trigger: "change" }]
      }
    }
    
    },
  components: {
    breakComponents
    }
  }
</script>

<style lang="less" scoped>

</style>