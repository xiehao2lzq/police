<template>
  <div class="deviceList">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>设备明细</span>
    </div>
    <div class="table2">
      <el-table :data="tableData" height="400" style="width: 100%">
        <el-table-column prop="disName" label="街道"></el-table-column>
        <el-table-column prop="name" label="小区"></el-table-column>
        <el-table-column prop="ip" label="ip地址"></el-table-column>
        <el-table-column prop="online" label="是否在线"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      currentPage:1,
      total:0,
    };
  },
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
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    listInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/device/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.selectedValue,
          subdistrictId: "",
          limit:9,
          page:this.currentPage
        }
      }).then(res => {
        if(res.data.code==1000){
          var data = res.data.data;
          this.total = data.totalRows;
          this.currentPage = data.currentPage*1
          this.tableData = data.list
          this.tableData.forEach(item=>{
           item.online =item.online == "1"?"在线":"离线"
          })
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.deviceList {
  width: 1898px;
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
  width: 123px;
  height: 14px;
  background: url(../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}
.deviceList {
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
  width: 1868px;
  height: 450px;
  margin: 5px auto;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.page {
  width: 100%;
  margin-top: 8px;
  text-align: right;
}
</style>