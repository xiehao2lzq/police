<template>
  <div class="emigrant boxColor">
    <div class="rightLogo" @click="router">更多>></div>
    <div class="title clear">
      <p></p>
      <span>疑似迁出人员统计（按小区）</span>
    </div>
    <!-- <div class="title2 clear">
      <p class="clear">
        <span :class="{selectedType:isSlected}" @click="slc1">业主车辆</span>
        <span :class="{selectedType:!isSlected}" @click="slc2">租户车辆</span>
      </p>
    </div>-->
    <div class="table2">
      <el-table :data="tableData" height="420" style="width: 100%" v-if="isSlected">
        <el-table-column prop="xqName" label="小区"></el-table-column>
        <el-table-column prop="houseName" label="房号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="liveTypyName" label="居住身份"></el-table-column>
        <el-table-column prop="lastCapTime" label="末次抓拍时间" width="250%"></el-table-column>
        <el-table-column prop="noSenceTime" label="未感知时长"></el-table-column>
      </el-table>
      <el-table :data="tableData" height="430" style="width: 100%" v-else>
        <el-table-column prop="xqName" label="小区"></el-table-column>
        <el-table-column prop="callTime" label="开始时间" width="180"></el-table-column>
        <el-table-column prop="roomNum" label="房间号"></el-table-column>
        <el-table-column prop="status" label="呼叫类型"></el-table-column>
        <el-table-column prop="deviceName" label="抓拍设备"></el-table-column>
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
      currentPage: 1
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
    /* if(this.isSlected){
      this.listInfo()
    }else{
      this.listInfo2()
    } */
  },
  watch: {
    /* isSlected(){
      if(this.isSlected){
      this.listInfo()
    }else{
      this.listInfo2()
    }
    } */
  },
  methods: {
    router() {
      this.$router.push({name:"personParticularList",params: { userId: 2 }})
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
        url: "http://" + this.url + ":9000/sjwl/webapi/person/quit/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: "",
          subdistrictId: "",
          limit: 10,
          page: 1,
          daySmall: 15
        }
      }).then(res => {
        if (res.data.code == 1000) {
         this.tableData = res.data.data.list
        //console.log(this.tableData)
          //this.tableData = data.list;
        }
      });
    }
    /* listInfo2() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/callRecord/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.selectedValue,
          subdistrictId: "",
          limit: 10,
          page: 1
        }
      }).then(res => {
        console.log(res)
        var data = res.data.data;
        this.tableData = data.list;
      });
    } */
  },
  mounted() {
    var _this = this;
    $(".title2 span").click(function() {
      $(".title2 span").removeClass("selectedType");
      $(this).addClass("selectedType");
      //console.log($(this).text())
    });
  }
};
</script>

<style lang="scss" scoped>
.emigrant {
  width: 932px;
  height: 452px;
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
  top: 8px;
  right: 20px;
  font-size: 16px;
  text-align: center;
  line-height: 32px;
  z-index: 100;
  cursor: pointer;
}
.emigrant {
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
  width: 902px;
  height: 420px;
  margin: 30px auto 0;
  overflow: hidden;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.selectedType {
  background: #5fc9fb;
}
</style>