<template>
  <div class="nowHaveCar boxColor">
    <div class="rightLogo" @click="router">更多>></div>
    <div class="title clear">
      <p></p>
      <span>现有车辆</span>
    </div>
    <div class="title2 clear">
      <p class="clear">
        <span :class="{selectedType:isSlected}" @click="slc1">业主车辆</span>
        <span :class="{selectedType:!isSlected}" @click="slc2">租户车辆</span>
      </p>
    </div>
    <div class="table2">
      <el-table :data="tableData" height="420" style="width: 100%" v-if="isSlected">
        <el-table-column prop="carNum" label="车牌号"></el-table-column>
        <el-table-column prop="carNumColorName" label="车牌颜色" width="180"></el-table-column>
        <el-table-column prop="carBrandName" label="车辆品牌"></el-table-column>
        <el-table-column prop="xqName" label="所在小区"></el-table-column>
        <el-table-column prop="personName" label="车主姓名"></el-table-column>
        <el-table-column prop="liveTypeName" label="居住身份"></el-table-column>
        <el-table-column prop="checkinDate" label="录入时间"></el-table-column>
      </el-table>
      <el-table :data="tableData" height="420" style="width: 100%" v-else>
        <el-table-column prop="carNum" label="车牌号"></el-table-column>
        <el-table-column prop="carNumColorName" label="车牌颜色" width="180"></el-table-column>
        <el-table-column prop="carBrandName" label="车辆品牌"></el-table-column>
        <el-table-column prop="xqName" label="所在小区"></el-table-column>
        <el-table-column prop="personName" label="车主姓名"></el-table-column>
        <el-table-column prop="liveTypeName" label="居住身份"></el-table-column>
        <el-table-column prop="checkinDate" label="录入时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isSlected: true,
      tableData: [],
      currentPage: 1,
      liveType: 0
    };
  },
  computed: {
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {
    this.listInfo();
  },
  watch: {
    isSlected() {
      this.tableData = []
      if (this.isSlected) {
        this.liveType = 0;
      } else {
        this.liveType = 3;
      }
      this.listInfo();
    }
  },
  methods: {
    router() {
      console.log(111);
      this.$router.push("/actualPopulation/CarParticularList");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    slc1() {
      this.isSlected = true;
    },
    slc2() {
      this.isSlected = false;
    },
    listInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/car/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.selectedValue,
          subdistrictId: "",
          limit: 10,
          page: 1,
          liveType: this.liveType
        }
      }).then(res => {
        if(res.data.code==1000){
          this.tableData = res.data.data.list
        }
       // console.log(res)
        /* var data = res.data.data;
        this.tableData = data.list; */
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.nowHaveCar {
  width: 1369px;
  height: 482px;
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
  color: #4896f7;
  position: absolute;
  top: 14px;
  right: 20px;
  font-size: 16px;
  text-align: center;
  line-height: 32px;
  z-index: 100;
  cursor: pointer;
}
.nowHaveCar {
  position: relative;
  .title2 {
    margin: 13px auto 10px;
    width: 232px;
    p {
      background: #3ba9e6;
      overflow: hidden;
      border-radius: 4px;
      width: 232px;
    }
    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
      width: 116px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
    }
  }
  .title {
    position: absolute;
    top: 13px;
    left: 10px;
    color: #333333;
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
  width: 1339px;
  height: 420px;
  margin: 5px auto;
  overflow: hidden;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.selectedType {
  background: #5fc9fb;
}
</style>