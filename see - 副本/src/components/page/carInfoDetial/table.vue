<template>
  <div class="table">
    <div class="title">
        <p>>>进，出场统计</p>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      height="70%"
      border
      style="width: 98%;margin: 12px auto"
      :cell-style="tableRowStyle"
      :header-cell-style="{background:'#0f193d','text-align':'center',height:'10px'}"
      :row-class-name="tableRowClassName"
      @row-click="showInfo"
    >
      <el-table-column prop="NO" label="NO" ></el-table-column>
      <el-table-column prop="xqName" label="小区"></el-table-column>
      <el-table-column prop="devChnName" label="抓拍位置" width="250%"></el-table-column>
      <el-table-column prop="capTime" label="时间" width="250%"></el-table-column>
      <el-table-column prop="carNum" label="车牌号" width="250%"></el-table-column>
      <el-table-column prop="personName" label="车主姓名"></el-table-column>
      <el-table-column prop="handle" label="抓拍照片">
        <img src="../../../../static/video.png" alt>
      </el-table-column>
      <el-table-column prop="carDirect" label="出入类型"></el-table-column>
    </el-table>
    <div class="bottom">
      <p>
        <span class="totalRows">
          共
          <span>{{totalRows}}</span>条记录
        </span>
        <span class="currentPage">
          第
          <span>{{currentPage||1}}/{{totalPage || 1}}</span>页
        </span>
        <span class="jump">
          跳转到
          <input type="text" v-model="msg">页
        </span>
        <span @click="jump(msg)" class="ensure">确定</span>
        <span class="export">导出人员记录</span>
      </p>
      <p>
        <span @click="jump(1)" class="start">首页</span>
        <span @click="jump(2)" class="pageUp">上页</span>
        <span @click="jump(3)" class="pageNext">下页</span>
        <span @click="jump(4)" class="end">末页</span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      url:state=>state.home.url
    }),
    ...mapState({
      xqCode:state=>state.home.xqCode
    })
  },
  
  data() {
    return {
      msg: "",
      //loading: false,
      select:true,
      tableData:[],
      totalPage:"",
      totalRows:"",
      currentPage:"",
      params:{},
      loading:false,
    };
  },
  mounted () {
     var params= {
           xqCode:this.xqCode,
           areaId:"0",
           limit:10,
           page:this.currentPage?this.currentPage:1
        };
      this.params = params
    this.getInfo()
  },
  methods: {
    //请求数据
    getInfo(){
      this.$axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/carAccess/list",{
       params:this.params
    }).then(res=>{
      if(res.data.code==="1000"){
        //console.log(res.data.data)
        this.tableData = []
        this.totalPage = Math.ceil(res.data.data.totalRows/10);
        this.totalRows = res.data.data.totalRows;
        this.currentPage = res.data.data.currentPage
        res.data.data.list.forEach((item,index)=>{
          this.tableData.push({
            NO:index+res.data.data.currentPage*10-10+1,
            xqName:item.xqName,
            devChnName:item.devChnName,
            capTime:item.capTime,
            carNum:item.carNum,
            personName:item.personName,
            originalPicPath:item.originalPicPath,
            carDirect:item.carDirect==8?"入场":"出场"
          })
        })
      }
    })
    },
    // 修改table tr行的背景色，
    tableRowStyle({ row, rowIndex }) {
      return "text-align:center;background:#0f193d;height:10px";
    },
    //修改字体颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.clStatus === "未处理" && !row.isSelect) {
        return "warning-row";
      } else if (row.clStatus === "已处理" && !row.isSelect) {
        return "success-row";
      }else if(row.isSelect){
        return "selectRow"
      }
      return "";
    },
    jump(page) {
      if (1) {
        switch (page) {
          case 1:
            this.params.page = 1
            this.getInfo()
            break;
          case 2:
            if (this.currentPage > 1) {
              this.params.page = this.currentPage - 1
              this.getInfo()
            }
            break;
          case 3:
            if (this.currentPage < this.totalPage) {
              this.params.page = this.currentPage + 1
              console.log(this.params)
              this.getInfo()
            }
            break;
          case 4:
            this.params.page = this.totalPage
            this.getInfo()
            break;
          default:
            if (page >= 1 && page <= this.totalPage) {
              this.params.page = page
              this.getInfo()
            }
        }
      }
    },
    //eleemnt-ui表格点击事件自带的参数
    showInfo(row, column) {
      //点击触发左侧的信息显示，视频显示，处理显示
      switch (column.label) {
        case "抓拍照片":
          if (row.originalPicPath) {
           //console.log(row.originalPicPath)
           this.$store.state.home.bigImgUrl=row.originalPicPath//这个模块没创建仓库暂存在home库里
           this.$store.state.home.bigPicIsshow = true;
          } else {
            this.$store.state.home.err.unshift("暂无抓拍信息");
          }
          break;
       
        default:
          
      }
    }
  }
};
</script>
<style lang="scss" scoped>

img {
  display: inline;
}
.bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 0.3rem;
  p {
    color: #fff;
    span {
      margin: 0 0.1rem;
      cursor: pointer;
      input {
        border: 0;
        background: #111531;
        width: 0.6rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}
.table{
        width: 98.5%;
        height: 3.8rem;
        margin: 0.1rem 0 0 0.1rem;
        box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
        float: left;
        //background: red;
    }
.title{
    margin: 0.1rem 0 0.1rem 0.2rem;
    height: 0.2rem;
    p{
        float: left;
        color: #8DB3DF;
        padding: 0.05rem 0.2rem;
        cursor: pointer;
    }
    .select{
        color: #fff;
        box-shadow: 0 0 0.1rem 0.1rem inset #2d3b7c91;
        
    }
}
</style>


