<template>
  <div class="CarPerceptionList">
    <div class="leftTabBox">
      <div class="title clear">
        <p></p>
        <span>数据感知</span>
      </div>
      <ul class="clear">
        <li
          v-for="(item,index) in tabArr"
          :key="index"
          @click="select(index)"
          :class="{selectedType:item.isSelected}"
        >
          <img :src="item.src" alt />
          <span>{{item.text}}</span>
        </li>
      </ul>
    </div>
    <div class="searchBox boxColor">
      <div v-if="tabArr[0].isSelected">
        <div class="title clear">
          <p></p>
          <span>出入记录</span>
        </div>
        <div class="inputBox">
          <div class="selectBox1">
            <span>小区：</span>
            <el-select v-model="community" placeholder="请选择">
              <el-option
                v-for="item in communityList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>居住身份：</span>
            <el-select v-model="liveType" placeholder="请选择">
              <el-option
                v-for="item in liveTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>出入类型：</span>
            <el-select v-model="access" placeholder="请选择">
              <el-option
                v-for="item in accessList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>时间：</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="selectBox1">
            <button @click="search">查询</button>
            <button @click="rest">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[1].isSelected">
        <div class="title clear">
          <p></p>
          <span>高频出入车辆</span>
        </div>
        <div class="inputBox">
          <div class="selectBox1">
            <span>小区：</span>
            <el-select v-model="community" placeholder="请选择">
              <el-option
                v-for="item in communityList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>居住身份：</span>
            <el-select v-model="liveType" placeholder="请选择">
              <el-option
                v-for="item in liveTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>出入次数>=：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="num" placeholder="请输入次数"></el-input>
          </div>
          <div class="selectBox1">
            <span>时间：</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="selectBox1">
            <button @click="search">查询</button>
            <button @click="rest">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 实时列表 -->
    <div class="realTimeList boxColor" v-if="tabArr[0].isSelected">
      <div class="title clear">
        <p></p>
        <span>实时数据</span>
      </div>
      <ul>
        <RealTimeList v-for="item in carList" :key="item.timeStamp" :item="item" />
      </ul>
    </div>

    <div class="tableBox boxColor" v-if="tabArr[0].isSelected">
      <div class="table2">
        <el-table :data="tableData" height="387" style="width: 100%" @row-click="personRecord">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="carNum" label="车牌" width="180"></el-table-column>
          <el-table-column prop="carColorName" label="车辆颜色"></el-table-column>
          <el-table-column prop="personName" label="车主姓名"></el-table-column>
          <el-table-column prop="xqName" label="小区"></el-table-column>
          <el-table-column prop="roomName" label="房号"></el-table-column>
          <el-table-column prop="liveTypeName" label="居住身份"></el-table-column>
          <el-table-column prop="carDirect" label="出入类型"></el-table-column>
          <el-table-column prop="devChnName" label="出入门禁"></el-table-column>
          <el-table-column prop="capTime" label="出入时间"></el-table-column>
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

    <div class="tableBox boxColor" v-if="tabArr[1].isSelected" style="height:815px">
      <div class="table2 clear" style="height:765px">
        <ul style="height:755px">
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.image || replaceSrc" alt />
            <div class="rightInfo">
               <p>
                <span>小区：</span>{{item.xqName}}
              </p>
              <p>
                <span>车牌号：</span> {{item.carNum}}
              </p>
              <p>
                <span>车主姓名：</span>{{item.ownerName}}
              </p>
              <p>
                <span>感知次数：</span>{{item.senseNum}}
              </p>
            </div>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="12"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RealTimeList from "./realTimeList";
export default {
  components: {
    RealTimeList
  },
  data() {
    return {
      replaceSrc:"../../../../static/image/carNoImage.png",
      communityList: [], //小区列表
      community: "", //选中的小区
      liveTypes: [
        {
          name: "业主",
          value: 1
        },
        {
          name: "租户",
          value: 3
        }
      ],
      liveType: "",
      accessList: [
        {
          name: "进场",
          value: "1"
        },
        {
          name: "出场",
          value: "0"
        }
      ],
      access: "",
      num: "", //出入次数
      tabIndex: 0, //切换tab栏
      input: "",
      tableData: [],
      currentPage: 1,
      total: 0,
      value1: [],
      value: "",
      tabArr: [
        {
          src:require("@static/image/datacar1.png"),
          text: "车辆出入记录",
          isSelected: true
        },
        {
          src:require("@static/image/datacar2.png"),
          text: "高频出入车辆",
          isSelected: false
        }
      ],
      list: []
    };
  },
  computed: {
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    }),
    ...mapState({
      carList: state => state.commonData.carList
    })
  },
   watch: {
    carList(){//监听
      this.listInfo1()
    }
  },
  created() {
    this.timer()
    this.communityList = JSON.parse(sessionStorage.getItem("selectedArr")); //为了防止刷新丢失从缓存中取
    this.listInfo1();
  },
  methods: {
     timer() {
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
    },
    rest() {
      this.community = "";
      this.liveType = "";
      this.access = "";
      this.num = "";
      this.currentPage = 1;
      this.value1 = [];
       this.total = 0;
      this.search();
    },
    search() {
      if (this.tabIndex == 0) {
        this.listInfo1();
      } else {
        this.listInfo2();
      }
    },
    select(val) {
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;
      /* 清空字段 */
      this.community = "";
      this.liveType = "";
      this.access = "";
      this.num = "";
      this.currentPage = 1;
      this.value1 = [];
       this.total = 0;
      this.tabIndex = val;
      this.tableData = [];
      switch (val) {
        case 0:
          this.listInfo1();
          break;
        case 1:
          this.listInfo2();
          break;
        default:
          break;
      }
    },
    personRecord(row) {
      /*  console.log(row);
      this.$router.push({ name: "personRecord" }); */
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search()
    },
    listInfo1() {
      var _this = this;
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/tj/carAccess/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.selectedValue,
          subdistrictId: "",
          limit: 10,
          page: this.currentPage,
          community: this.community,
          liveType: this.liveType,
          access: this.access,
          beginTime:_this.value1[0]?new Date(_this.value1[0]).format("yyyy-MM-dd hh:mm:ss"):"",
          endTime:_this.value1[1]?new Date(_this.value1[1]).format("yyyy-MM-dd hh:mm:ss"):""
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
        }
        console.log(res);
        //var data = res.data.data;
        //this.tableData = data.list;
      });
    },
    listInfo2() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/car/sense/highAccess",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.selectedValue,
          subdistrictId: "",
          limit: 12,
          page: this.currentPage,
          community: this.community,
          liveType: this.liveType,
          accessNumSmall: this.num,
          timeType: ""//先传空
        }
      }).then(res => {
        //console.log(res)
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.leftTabBox {
  width: 352px;
  height: 935px;
  background: rgba(54, 54, 54, 1);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  .title {
    color: #ffffff;
  }
  float: left;
  ul {
    width: 100%;
    .selectedType {
      background: rgba(61, 183, 237, 1);
    }
    li {
      width: 324px;
      height: 68px;
      background: rgba(50, 136, 234, 1);
      border-radius: 5px;
      margin: 30px auto;
      line-height: 68px;
      cursor: pointer;
      img {
        float: left;
        margin: 18px 20px 0 60px;
      }
      span {
        font-size: 20px;
      }
    }
  }
}
.searchBox {
  width: 1532px;
  height: 100px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  float: left;
  .title {
    color: #333333;
  }
  span {
    float: left;
    color: #333333;
  }
  .inputBox {
    margin-left: 5px;
  }
  .selectBox1 {
    float: left;
    overflow: hidden;
    margin-top: 20px;
    span {
      margin: 6px 0 0 20px;
    }
    button {
      width: 90px;
      height: 34px;
      background: rgba(61, 183, 237, 1);
      border-radius: 3px;
      border: 0;
      outline: 0;
      margin-left: 15px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
/* 公用部分 */
.title {
  margin-top: 13px;
  margin-left: 10px;
  font-size: 16px;
  p {
    width: 6px;
    height: 16px;
    float: left;
    background: linear-gradient(
      0deg,
      rgba(59, 169, 230, 1),
      rgba(95, 201, 251, 1)
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
/* 实时列表部分 */
.realTimeList {
  width: 1532px;
  height: 346px;
  float: left;
  margin: 20px 0 0 11px;
  .title {
    color: #333;
  }
  ul {
    width: 1500px;
    height: 300px;
    margin: 10px auto 0;
    overflow: hidden;
    position: relative;
  }
}

/* 表格部分 */
.tableBox {
  width: 1532px;
  height: 447px;
  float: left;
  margin: 20px 0 0 11px;
}
.table2 {
  height: 447px;
  width: 1502px;
  margin: 10px auto 0;
}
.table2 ul {
  height: 387px;
  width: 100%;
  overflow: hidden;
  li {
    width: 480px;
    height: 180px;
    background: #e0edf9;
    margin: 10px 0 0 15px;
    float: left;
    border-radius: 5px;
    img {
      float: left;
      width: 160px;
      height: 160px;
      margin: 10px 0 0 10px;
    }
    .rightInfo {
      float: left;
      margin-left: 40px;
      p {
        margin-top: 20px;
      }
    }
    p {
      color: #333333;
    }
  }
}
.page {
  width: 100%;
  margin-top: 10px;
  text-align: right;
}
</style>