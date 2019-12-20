<template>
  <div class="searchINfo">
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height="81%"
      border
      style="width: 95%;margin: 10px auto"
      :cell-style="tableRowStyle"
      :header-cell-style="{background:'#0f193d','text-align':'center', color:'#fff',height:'10px'}"
      :row-class-name="tableRowClassName"
      @row-click="propsUrl"
    >
      <el-table-column prop="NO" label="NO" width="50%"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100%"></el-table-column>
      <el-table-column prop="time" label="时间" width="200%"></el-table-column>
      <el-table-column prop="deviceAddr" label="地点" width="220%"></el-table-column>
      <el-table-column prop="handle" label="操作" >
        <img src="../../../../static/video.png" alt>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <!-- 分页部分 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total,  prev, pager, next, jumper"
        :total="tableData.length"
        background
        :small="true"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
//引入事件总线
import bus from "../../../assets/eventsbus.js";
//引入仓库
import { mapState } from "vuex";
export default {
  data() {
    return {
      start: 0,
      count: 10,
      //tableData: [],
      pageSize: 20, //每页显示20条数据
      currentPage: 1, //初始页
      param: null,
      searchInfo: null
      //totalRows: 1
    };
  },
  computed: {
    ...mapState({
      tableData: state => state.faceCountrl.tableData
    }),
    ...mapState({
      loading:state=>state.faceCountrl.loading
    })
  },
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return "text-align:center;background:#0f193d;height:10px";
    },
    tableRowClassName({ row, rowIndex }) {
      if(row.isSelect){
        return "selectRow"
      }
      return "";
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //console.log(this.currentPage); //点击第几页
    },

    propsUrl(row, column) {
       //点击之后标记选中的行true
      this.tableData.forEach(item => {
        if(item.NO===row.NO){
          item.isSelect = true
          //console.log(row)
          //console.log(item.id)
        }else{
          item.isSelect = false 
        }
      });
      var case1 = column.label; //列标签
      var capVideoUrl = row.capVideoUrl; //行内容
      var capImgUrl = row.capImgUrl; //行内容
      //验证点击的列
      switch (case1) {
        case "操作":
          console.log(row)
          //将视频路径传送给视频模块
          if (row.capVUrl) {
            this.$store.state.faceCountrl.capVUrl = row.capVUrl;//视频ip
            this.$store.state.faceCountrl.capVedioBeginTime = row.capVedioBeginTime;//开始时间
            this.$store.state.faceCountrl.capDevChannel = row.capDevChannel;//通道号
            this.$store.state.faceCountrl.xqCode = row.xqCode;//小区识别码
            //console.log(this.$store.state.faceCountrl.capVideoUrl);
            this.$store.state.faceCountrl.isshow = true;
          } else {
            alert("暂无视频资源");
          }
          break; 
        case "NO":
        case "姓名":
        case "时间":
        case "地点":
          //将图片路径传送给照片模块
          // bus.$emit("gainCapImgUrl",row.capImgUrl)
          this.$store.state.faceCountrl.capImgUrl = row.capImgUrl;
          //console.log(row.capImgUrl)
          break;
        default:
          console.log("xixixixi");
      }
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
.searchINfo {
  overflow: hidden;
  width: 100%;
  height: 4.4rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
}
img {
  display: inline;
  cursor: pointer;
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
