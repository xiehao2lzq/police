<template>
  <div class="historyInfo">
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
      <el-table-column prop="NO" label="NO" ></el-table-column>
      <el-table-column prop="xqName" label="小区"></el-table-column>
      <el-table-column prop="deviceAddr" label="摄像头" width="250%"></el-table-column>
      <el-table-column prop="alarmTime" label="时间" width="250%"></el-table-column>
      <el-table-column prop="personName" label="事件类型" width="150%"></el-table-column>
      <el-table-column prop="faceTypeName" label="库名称"></el-table-column>
      <el-table-column prop="handle" label="视频信息">
        <img src="../../../../static/video.png" alt>
      </el-table-column>
      <el-table-column prop="clStatus" label="是否处理"></el-table-column>
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
      tableData: state => state.countrlHistory.tableData
    }),
    ...mapState({
      totalPage: state => state.countrlHistory.totalPage //从vuex取总页数
    }),
    ...mapState({
      totalRows: state => state.countrlHistory.totalRows //从vuex取总条数
    }),
    ...mapState({
      param: state => state.countrlHistory.param //从vuex取参数
    }),
    ...mapState({
      currentPage: state => state.countrlHistory.currentPage //从vuex取参数
    }),
    ...mapState({
      loading: state => state.countrlHistory.loading //从vuex取参数
    })
  },
  
  data() {
    return {
      msg: "",
      //loading: false,
    };
  },
  methods: {
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
      if (this.param) {
        switch (page) {
          case 1:
            this.param.page = 1
            this.$store.dispatch("historyInfo", this.param);
            break;
          case 2:
            if (this.currentPage > 1) {
              this.param.page = this.currentPage - 1
              this.$store.dispatch("historyInfo", this.param);
            }
            break;
          case 3:
            if (this.currentPage < this.totalPage) {
              this.param.page = this.currentPage + 1
              this.$store.dispatch("historyInfo", this.param);
            }
            break;
          case 4:
            this.param.page = this.totalPage
            this.$store.dispatch("historyInfo", this.param);
            break;
          default:
            if (page >= 1 && page <= this.totalPage) {
              this.param.page = page
              this.$store.dispatch("historyInfo", this.param);
            }
        }
      }
    },
    //eleemnt-ui表格点击事件自带的参数
    showInfo(row, column) {
      //点击之后标记选中的行true
      this.tableData.forEach(item => {
        if(item.alarmId===row.alarmId){
          item.isSelect = true
          //console.log(item.id)
        }else{
          item.isSelect = false 
        }
      });
      //点击触发左侧的信息显示，视频显示，处理显示
      switch (column.label) {
        case "视频信息":
          //console.log(row)
          //   console.log(row)
          if (row.capVUrl) {
           this.$store.state.faceCountrl.capVUrl = row.capVUrl;//视频ip
           this.$store.state.faceCountrl.capVedioBeginTime = row.capVedioBeginTime;//开始时间
           this.$store.state.faceCountrl.capDevChannel = row.capDevChannel;//通道号
           this.$store.state.faceCountrl.xqCode = row.xqCode;//小区识别码
            //this.$store.state.faceCountrl.capVideoUrl = row.videoUrl;
           this.$store.state.faceCountrl.isshow = true;

           // console.log(this.$store.state.faceCountrl.videoUrl);
          } else {
            alert("暂无视频信息");
          }
          break;
        case "是否处理":
          if (row.clStatus === "未处理") {
            //如果未处理点击立即处理
            this.$store.state.countrlHistory.isshow2 = true; //显示提交信息的页面
            this.$store.state.countrlHistory.id = row.NO; //将处理的数据的id穿到vuex
            this.$store.state.countrlHistory.faceGroupName = row.faceGroupName; //要处理的数据的人脸库类型
            this.$store.state.countrlHistory.alarmId = row.alarmId; //要处理的数据的主键ID
            this.$store.state.countrlHistory.xqCode = row.xqCode; //要处理的数据的小区ID
            this.$store.state.countrlHistory.faceTypeCode = row.faceTypeCode;//记录事件类型
          }
          break;
        default:
          this.$store.state.countrlHistory.showInfo = {}; //左侧的信息配置
          var showInfo = {
            capImgUrl: row.capImgUrl,
            xqName: row.xqName,
            deviceAddr: row.deviceAddr,
            updTime: row.updTime,
            personName: row.personName,
            videoUrl: row.videoUrl,
            clStatus: row.clStatus
          };
          this.$store.state.countrlHistory.showInfo = Object.assign(
            showInfo,
            this.$store.state.countrlHistory.showInfo
          );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.historyInfo {
  width: 74%;
  height: 6.5rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
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
