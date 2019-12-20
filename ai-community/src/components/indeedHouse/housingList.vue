<template>
  <div class="housingList">
    <div class="rightLogo">搜索</div>
    <div class="title clear">
      <p></p>
      <span>住房人员信息</span>
    </div>
    <div class="table2">
      <el-table :data="tableData" height="400" style="width: 100%">
        <el-table-column prop="xqName" label="小区"></el-table-column>
        <el-table-column prop="buildingName" label="楼号" width="180"></el-table-column>
        <el-table-column prop="cellName" label="单元号"></el-table-column>
        <el-table-column prop="roomName" label="房间号"></el-table-column>
        <el-table-column prop="isRented" label="房屋状态"></el-table-column>
        <el-table-column prop="roomOwner" label="业主"></el-table-column>
        <el-table-column prop="liveNum" label="入住数量"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      selectedValue: state => state.homePage.selectedValue
    }),
    ...mapState({
      url: state => state.homePage.url
    })
  },
  created() {
    this.listInfo()
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 100,
    };
  },
  watch: {
    currentPage(){
      this.listInfo()
    }
  },
  methods: {
    handleCurrentChange(val) {
     this.currentPage = val*1
    },
    listInfo(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/house/room/list",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId: "",
        limit: 9,
        page: this.currentPage
      }
    }).then(res => {
      if (res.data.code == "1000") {
        var data = res.data.data;
        this.tableData = data.list;
        this.currentPage = data.currentPage*1;
        this.total = data.totalRows;
        console.log(data);
        // this.info = res.data.data
        //this.$forceUpdata()
      } else {
        this.$store.state.homePage.errorMsg.unshift(res.data.msg);
      }
    });
    }
  }
};
</script>

<style lang="scss" scoped>
.housingList {
  width: 1370px;
  height: 482px;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
.rightLogo {
  width: 80px;
  height: 32px;
  border-radius: 4px;
  background: #4896f7;
  position: absolute;
  top: 14px;
  right: 20px;
  font-size: 16px;
  text-align: center;
  line-height: 32px;
  z-index: 100;
  cursor: pointer;
}
.housingList {
  .title {
    margin-top: 13px;
    margin-left: 10px;
    p {
      width: 6px;
      height: 16px;
      float: left;
      background: linear-gradient(
        0deg,
        rgba(35, 197, 235, 1),
        rgba(35, 230, 189, 1)
      );
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.12);
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
    }
  }
}
.table2 {
  width: 1340px;
  height: 450px;
  margin: 15px auto 0;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.page {
  width: 100%;
  margin-top: 0px;
  text-align: right;
}
</style>