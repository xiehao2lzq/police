<template>
  <div class="dealhistoryInfo">
    <el-table
     v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      height="85%"
      border
      style="width: 98%;margin: 12px auto"
      :cell-style="tableRowStyle"
      :header-cell-style="{background:'#0f193d','text-align':'center',height:'10px'}"
      :row-class-name="tableRowClassName"
      @row-click="showInfo"
    >
      <el-table-column prop="NO" label="NO" width="100%"></el-table-column>
      <el-table-column prop="xqName" label="小区"></el-table-column>
      <el-table-column prop="deviceAddr" label="摄像头"></el-table-column>
      <el-table-column prop="alarmTime" label="时间" width="300%"></el-table-column>
      <el-table-column prop="personName" label="事件类型" width="150%"></el-table-column>
      <el-table-column prop="faceTypeName" label="库名称" width="150%"></el-table-column>
      <el-table-column prop="handle" label="视频信息" width="100%">
        <img  src="../../../../static/video.png" alt>
      </el-table-column>
       <el-table-column prop="" label="查看详情" width="100%">查看</el-table-column>
      <el-table-column prop="clTime" label="处理时间" width="300%"></el-table-column>
    </el-table>
    <div class="bottom">
      <p>
        <span class="totalRows">
          共
          <span>{{totalRows}}</span>条记录
        </span>
        <span class="currentPage">
          第
          <span>{{currentPage || 1}}/{{totalPage || 1}}</span>页
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
//引入事件总线
//import bus from "../../../assets/eventsbus.js";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      tableData: state => state.dealHistory.tableData
    }),
    ...mapState({
      totalPage: state => state.dealHistory.totalPage
    }),
    ...mapState({
      totalRows: state => state.dealHistory.totalRows
    }),
    ...mapState({
      param: state => state.dealHistory.param
    }),
    ...mapState({
      currentPage: state => state.dealHistory.currentPage
    }),
     ...mapState({
      loading: state => state.dealHistory.loading
    })
  },
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return "text-align:center;background:#0f193d;height:10px";
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.clStatusStr === "黑名单" && !row.isSelect) {
        return "warning-row";
      } else if (row.clStatusStr === "已处理" && !row.isSelect) {
        return "success-row";
      }else if(row.isSelect){
        return "selectRow"
      }
      return "";
    },
    jump(page) {
      if (this.param) {
        //console.log(this.currentPage)
        switch (page) {
          case 1:
            this.param.page = 1;
            this.$store.dispatch("dealhistoryInfo", this.param);
            break;
          case 2:
            if (this.currentPage > 1) {
              this.param.page = this.currentPage - 1;
              this.$store.dispatch("dealhistoryInfo", this.param);
            }
            break;
          case 3:
            if (this.currentPage < this.totalPage) {
             this.param.page = this.currentPage + 1;
              this.$store.dispatch("dealhistoryInfo", this.param);
            }
            break;
          case 4:
           this.param.page = this.totalPage;
            this.$store.dispatch("dealhistoryInfo", this.param);
            break;
          default:
            if (page >= 1 && page <= this.totalPage) {
              this.param.page = page;
              this.$store.dispatch("dealhistoryInfo", this.param);
            }
        }
      }
    },
    //eleemnt-ui表格点击事件自带的参数
    showInfo(row, column){
      //点击之后标记选中的行true
      //console.log(row)
      this.tableData.forEach(item => {
        if(item.alarmId===row.alarmId){
          item.isSelect = true
          //console.log(row)
          //console.log(item.id)
        }else{
          item.isSelect = false 
        }
      });
        switch(column.label){
            case "视频信息":
              console.log(row)
            if(row.capVUrl){
              this.$store.state.faceCountrl.capVUrl = row.capVUrl;//视频ip
              this.$store.state.faceCountrl.capVedioBeginTime = row.capVedioBeginTime;//开始时间
              this.$store.state.faceCountrl.capDevChannel = row.capDevChannel;//通道号
              this.$store.state.faceCountrl.xqCode = row.xqCode;//小区识别码
              //this.$store.state.faceCountrl.capVideoUrl =  row.videoUrl;
              this.$store.state.faceCountrl.isshow = true;
            }else{
              alert("暂无视频信息")
            }
            break;
            case"查看详情":
            //console.log(row.faceTypeCode)
            var param2={
                alarmId:row.alarmId,
                faceTypeCode:row.faceTypeCode 
            };
           this.$store.dispatch("gainOneInfo",param2)
            break;
            default:
            console.log("你好啊")
        }
    }
  },
};
</script>
<style lang="scss" scoped>
.dealhistoryInfo {
  width: 98%;
  height: 6.5rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  margin:0 auto;
  overflow: hidden;
}
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
</style>
