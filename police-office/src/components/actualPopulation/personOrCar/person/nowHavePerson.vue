<template>
  <div class="nowHavePerson boxColor">
    <div class="rightLogo" @click="router">更多>></div>
    <div class="title clear">
      <p></p>
      <span>现有人员列表</span>
    </div>
    <div class="title2 clear">
      <p class="clear">
        <span :class="{selectedType:isSlected}" @click="slc1">常住人口</span>
        <span :class="{selectedType:!isSlected}" @click="slc2">流动人口</span>
      </p>
    </div>
    <div class="table2">
      <el-table :data="tableData" height="420" style="width: 100%" v-if="isSlected">
        <el-table-column label="人员姓名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="180"></el-table-column>
        <el-table-column prop="xqName" label="居住小区"></el-table-column>
        <el-table-column prop="houseName" label="房屋号" width="200%"></el-table-column>
        <el-table-column prop="liveTypyName" label="居住身份"></el-table-column>
        <el-table-column prop="checkinDate" label="入住时间" width="200%"></el-table-column>
      </el-table>
      <el-table :data="tableData" height="420" style="width: 100%" v-else>
        <el-table-column label="人员姓名" width="150%">
          <template slot-scope="scope">
            <span
              style="display:inline-block;padding:5px;background:#AEAEAE;color:#fff; font-weight: 900;
  padding: 5px 15px;
  margin-right: 20px;
  float:left"
              v-if="scope.row.residence== '0'"
            >灰</span>
            <span style="float:left;margin-top:5px;">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="180"></el-table-column>
        <el-table-column prop="xqName" label="居住小区"></el-table-column>
        <el-table-column prop="houseName" label="房屋号" width="200%"></el-table-column>
        <el-table-column prop="liveTypyName" label="居住身份"></el-table-column>
        <el-table-column prop="checkinDate" label="入住时间" width="200%"></el-table-column>
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
      liveType: "1"
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
    if (this.isSlected) {
      this.listInfo();
    } else {
      this.listInfo2();
    }
  },
  watch: {
    isSlected() {
      if (this.isSlected) {
        this.liveType = "1";
        this.listInfo();
      } else {
        this.liveType = "3";
        this.listInfo();
      }
    }
  },
  methods: {
    router() {
      this.$router.push({
        name: "personParticularList",
        params: { userId: 0 }
      });
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
        url: "http://" + this.url + ":9000/sjwl/webapi/person/owner/list",
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
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          console.log(this.tableData);
        }
      });
    }
  },
  mounted() {
    /*  var _this = this;
    $(".title2 span").click(function() {
      $(".title2 span").removeClass("selectedType");
      $(this).addClass("selectedType");
      //console.log($(this).text())
    }); */
  }
};
</script>

<style lang="scss" scoped>
.nowHavePerson {
  width: 932px;
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
.nowHavePerson {
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