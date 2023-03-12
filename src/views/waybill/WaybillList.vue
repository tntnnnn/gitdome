<template>
  <div>
    <el-breadcrumb separator="/">
  <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
 
</el-breadcrumb>
<el-card class="mt">
  <el-row :gutter="16">
    <el-col :span="6">
    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
    
    </el-col>
    <el-col :span="6">
      <el-input placeholder="请输入客户名称" v-model="params.name"></el-input></el-col>
    <el-col :span="6">
      <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期" style="width:100%">
    </el-date-picker></el-col>
    <el-col :span="6" class="tr">
    <el-button type="primary" @click="loadDate">查询</el-button>
    <el-button type="primary">重置</el-button>
    </el-col>
  </el-row>
</el-card>
<el-card>
  <el-radio-group v-model="params.status" @change="loadDate">
      <el-radio-button label="1">全部运单(300)</el-radio-button>
      <el-radio-button label="2">装货中(120)</el-radio-button>
      <el-radio-button label="3">运输中(70)</el-radio-button>
      <el-radio-button label="4">已完成(100)</el-radio-button>
      <el-radio-button label="5">运单异常(10)</el-radio-button>
    </el-radio-group>
</el-card>
<el-card  class="mt">
  <el-table :data="tableData" style="width: 100%"  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
    <el-table-column type="index"  label="序号" width="50"> </el-table-column>
      <el-table-column prop="no" label="运单号" width="180" fixed="left"> </el-table-column>
      <el-table-column prop="date" label="下单时间" width="180"> </el-table-column>
      <el-table-column prop="name"  label="客户名称" width="180"> </el-table-column>
      <el-table-column prop="cargo"  label="货物名称" width="180"> </el-table-column>
      <el-table-column prop="count" label="件数" width="100"> </el-table-column>
      <el-table-column prop="start" label="起始地" width="50"> </el-table-column>
      <el-table-column prop="end" label="目的地" width="50"> </el-table-column>
      <el-table-column prop="price" label="运费" width="180"> </el-table-column>
      <el-table-column prop="needRecive" label="需要接货" width="180"> </el-table-column>
      <el-table-column prop="plateNumber"  label="车牌号" width="180"> </el-table-column>
      <el-table-column prop="driver" label="司机" width="180"> </el-table-column>
      <el-table-column prop="tel" label="司机电话" width="180"> </el-table-column>
      <el-table-column prop="percent"  label="运输进度" width="180"> 
        <template slot-scope="scope">
         <el-progress :percentage="scope.row.percent"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">  <template slot-scope="scope">
        <el-button size="mini" @click="detall(scope.row.no)">详情</el-button>
        <el-button size="mini" type="danger">修改</el-button>
        </template></el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageDate.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageDate.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class="mt fr mb">
    </el-pagination>
</el-card>
  </div>
</template>

<!--
  <keep-alive>
    1.可以是component
    2.router-view
  </keep-alive>
  -->
<script>
import breadCrumd from "@/mixins/breadCrumb";
import moment from "moment";
import { post } from "@/utils/http"
import { mapState,mapMutations } from "vuex";

export default {
  mixins: [breadCrumd],

  data() {
    return {
      loading: false,
      status: 1,
      tableData: [],
      total: 0,
      params: {
        waybillNo: "",
        name: "",
        status: 1

      },

      pageDate: {
        page: 1,
        pageSize: 10
      },
      date: []
    }
  },
  computed: mapState(["isFromDetail"]),
  created() {
    this.loadDate()
  },

  beforeRouteLeave(to, from, next) {
    if (to.path == "/waybill/list/detail") {
      from.meta.keepAlive = true
    } else {
      //如果去的不是详情页就要清除缓存 {以后可以直接清缓存}   keep-alive缓存问题 重要 面试要会
      this.clearCache();

    }
    next();
  },
  activated() {
    if (!this.isFromDetail) {
    this.loadDate() 
  }   },

//如果你上次是从详情页直接去的其他页面，主动加载一次数据

                           //console.log("缓存的组件重新激活的时候使用");生命周期使用场景
  //如果不是从详情页过来的
  /* 
  deactivated() {
    console.log("缓存的组件失活的时候使用")生命周期使用场景
  }
  */
  methods: {
    ...mapMutations(["changeIsFromDatail"]),
    async loadDate() {
      this.loading=true
      let startDate =this.date[0]?moment(this.date[0]).format("YYYY-MM-DD"):""
      let endDate=this.date[0]?moment(this.date[1]).format("YYYY-MM-DD"):""
      const res = await post("/waybillList", { ...this.pageDate, ...this.params ,startDate,endDate});
      this.tableData = res.data.list;
      this.total = res.data.total
      this.loading = false
      //moment 时间格式化插件
    },
    handleSizeChange(pageSize) {
      //每页条数发生变化
      //console.log("每页条数发生变化", pageSize);
      this.pageDate.pageSize = pageSize;
      this.loadDate()
    },
    handleCurrentChange(page) {
        //页码发生变化

    //  console.log("页码发生变化", page);
      this.pageDate.page = page;
      this.loadDate()
        
    },
    detall(no) {
      this.$router.push("/waybill/list/detail?no="+no)
    },
    clearCache() {
      let vnode = this.$vnode;
      let parentVnode = vnode && vnode.parent;
      if (
        parentVnode &&
        parentVnode.componentInstance &&
        parentVnode.componentInstance.cache
      ) {
        var key =
          vnode.key == null
            ? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag
              ? `::${vnode.componentOptions.tag}`
              : "")
            : vnode.key;
        var cache = parentVnode.componentInstance.cache;
        var keys = parentVnode.componentInstance.keys;
        if (cache[key]) {
          this.$destroy();
          if (keys.length) {
            var index = keys.indexOf(key);
            if (index > -1) {
              keys.splice(index, 1);
            }
          }
cache[key]=null
        }    
      }
     
    }
    }
  }
</script>

<style lang="less" scoped>

</style>