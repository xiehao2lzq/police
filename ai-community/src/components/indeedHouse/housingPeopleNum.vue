<template>
  <div class="housingPeopleNum">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>房产拥有统计 (TOP10)</span>
    </div>
    <div class="table2">
      <el-table :data="tableData" height="430" style="width: 100%">
        <el-table-column prop="xqName" label="小区"></el-table-column>
        <el-table-column prop="roomInfo" label="住所"></el-table-column>
        <el-table-column prop="liveNum" label="住户人数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    data () {
        return {
            tableData: [],
      }
    },
     computed: {
     ...mapState({
      selectedValue:state=>state.homePage.selectedValue
    }),
     ...mapState({
      url:state=>state.homePage.url
    })  
  },
    created () {
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/house/statistics/live",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId:"",
      }
    }).then(res=>{
       if(res.data.code=="1000"){
        this.tableData = res.data.data
        this.tableData
     }else{
       this.$store.state.homePage.errorMsg.unshift(res.data.msg)
     } 
    })
    },
    mounted () {
      //console.log(this.tableData)
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
}
</script>

<style lang="scss" scoped>
.housingPeopleNum {
  width: 731px;
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
.housingPeopleNum {
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
  width: 700px;
  height: 430px;
  margin: 5px auto;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
</style>