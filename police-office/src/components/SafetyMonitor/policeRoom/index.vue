<template>
  <div class="right-box police-room">
    <div class="headerBlock">
      <div class="rightLogo"></div>
      <div class="title clear">
        <p></p>
        <span>报警事件</span>
      </div>
      <div class="titleHeader">
        <div class="block selectBox1">
          <span class="left-text">布控库：</span>
          <el-select v-model="storeSelect" placeholder="请选择">
            <el-option
              v-for="(item,index) in storeList"
              :key="index"
              :label="item.libraryName"
              :value="item.id"
            ></el-option>
          </el-select>
          <span class="left-text">报警等级：</span>
          <el-select v-model="levelSelect" placeholder="请选择">
            <el-option
              v-for="(item,index) in policeLevel"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input class="left-text" v-model="searchText" placeholder="请输入" style="width:280px"></el-input>
          <div class="search-btn">
            <el-button class="left-text" type="primary" @click="getSearch">查询</el-button>
            <el-button class="left-text" type="primary" @click="reset">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="table2 table3">
      <!--      人员报警-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="人员报警" name="first">
          <el-table :data="peopleTabData" stripe height="690" align="center" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="type" label="抓拍图" width="100">
              <template slot-scope="scope">
                <img :src="scope.row.captureImage" width="100" height="100" class="head_pic" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="布控库图片" width="100">
              <template slot-scope="scope">
                <img :src="scope.row.imagePath" width="100" height="100" class="head_pic" />
              </template>
            </el-table-column>
            <el-table-column prop="captureTime" label="抓拍时间" width="150"></el-table-column>
            <el-table-column prop="xqName" label="抓拍位置" width="150"></el-table-column>
            <el-table-column prop="alarmLevel" label="报警等级" width="100"></el-table-column>
            <el-table-column prop="controlReason" label="布控原因" width="150"></el-table-column>
            <el-table-column prop="personName" label="布控人员姓名" width="120"></el-table-column>
            <el-table-column prop="phone" label="电话号码" width="140"></el-table-column>
            <el-table-column prop="idNo" label="证件号码" width="170"></el-table-column>
            <el-table-column prop="groupName" label="所属人员库" width="100"></el-table-column>
            <el-table-column prop label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.handleStatus==1"
                  type="text"
                  size="small"
                  @click="clickPopDetai(1,scope.row)"
                >处理结果</el-button>
                <el-button v-else type="text" size="small" @click="clickPopDetai(0,scope.row)">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table2 page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="8"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <!--        车辆库-->
        <el-tab-pane label="车辆报警" name="second">
          <el-table :data="carTabData" stripe height="690" align="center" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="type" label="抓拍图">
              <template slot-scope="scope">
                <img :src="scope.row.captureImage" width="100" height="100" class="head_pic" />
              </template>
            </el-table-column>
            <el-table-column prop="captureTime" label="抓拍时间"></el-table-column>
            <el-table-column prop="xqName" label="抓拍位置"></el-table-column>
            <el-table-column prop="carNum" label="车牌号"></el-table-column>
            <el-table-column prop="alarmLevel" label="报警等级"></el-table-column>
            <el-table-column prop="controlReason" label="布控原因"></el-table-column>
            <el-table-column prop="groupName" label="所属车辆库"></el-table-column>
            <el-table-column prop label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.handleStatus==1"
                  type="text"
                  size="small"
                  @click="clickPopDetai(1,scope.row)"
                >处理结果</el-button>
                <el-button v-else type="text" size="small" @click="clickPopDetai(0,scope.row)">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table2 page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="8"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="事件报警" name="thirdly">
          <el-table :data="eventTabData" stripe height="690" align="center" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="type" label="抓拍图">
              <template slot-scope="scope">
                <img :src="scope.row.captureImage" width="100" height="100" class="head_pic" />
              </template>
            </el-table-column>
            <el-table-column prop="captureTime" label="抓拍时间"></el-table-column>
            <el-table-column prop="xqName" label="抓拍位置"></el-table-column>
            <el-table-column prop="eventName" label="事件类型"></el-table-column>
            <el-table-column prop="alarmLevel" label="报警等级"></el-table-column>
            <el-table-column prop label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.handleStatus==1"
                  type="text"
                  size="small"
                  @click="clickPopDetai(1,scope.row)"
                >处理结果</el-button>
                <el-button v-else type="text" size="small" @click="clickPopDetai(0,scope.row)">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table2 page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="8"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 新增人员提示框-->
      <div class="pop-view"></div>
    </div>

    <!--    弹出框-->
    <el-dialog title="处理内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.content"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="PopStatus" type="primary" @click="addForm">提 交</el-button>
        <p v-else>处理人：{{form.handle}} 处理时间：{{form.handleTime}}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      url: state => state.commonData.url
    })
  },
  data() {
    return {
      activeName: "first",
      storeSelect: "",
      levelSelect: "",
      searchText: "", //搜索框文本
      storeList: [], //布控库筛选框
      policeLevel: [
        { name: "低", id: "低" },
        { name: "中", id: "中" },
        { name: "高", id: "高" }
      ], //布控库筛选框
      peopleTabData: [],
      carTabData: [],
      eventTabData: [],
      currentPage: 1,
      total: 1,
      dialogFormVisible: false,
      form: {
        content: "",
        handleTime:"",
        handle:""
      },
      formLabelWidth: "120px",
      isCheck: false,
      PopStatus: true, //默认显示提交窗口
      id: "",
      alarmType: ""
    };
  },
  methods: {
    addForm() {
      var data = {
        id: this.id,
        alarmType: this.alarmType+"",
        content: this.form.content
      };
      //console.log(data)
      this.$axios({
        method: "put",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/alarm/saveHandle",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.$store.state.commonData.successMsg.unshift(res.data.msg);
          this.dialogFormVisible = false; //成功之后
          this.form.content = "";
          this.getSearch(); //刷新列表
        } else {
          this.$store.state.commonData.errorMsg.unshift(res.data.msg);
        }
      });
    },
    getSearch() {
      switch (this.activeName) {
        case "first":
          this.getPersonAlarmList();
          break;
        case "second":
          this.getCarAlarmList();
          break;
        case "thirdly":
          this.getEventAlarmList();
          break;
        default:
          break;
      }
    },
    reset() {
      this.handleClick();
    },
    handleClick() {
      //console.log(this.activeName);
      (this.currentPage = 1), (this.total = 1);
      switch (this.activeName) {
        case "first":
          this.storeList = JSON.parse(sessionStorage.getItem("faceStoreList"));
          (this.storeSelect = ""), (this.levelSelect = "");
          this.getPersonAlarmList();
          break;
        case "second":
          this.storeList = JSON.parse(sessionStorage.getItem("carStoreList"));
          this.storeSelect = "";
          this.levelSelect = "";
          this.getCarAlarmList();
          break;
        case "thirdly":
          this.storeList = [];
          this.storeSelect = "";
          this.levelSelect = "";
          this.getEventAlarmList();
          break;
        default:
          break;
      }
    },
    getPersonAlarmList() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/alarm/person",
        params: {
          page: this.currentPage,
          limit: 8,
          alarmLevel: this.levelSelect,
          type: this.storeSelect
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.peopleTabData = res.data.data.list;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.totalRows;
        }
      });
    },
    getCarAlarmList() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/alarm/car",
        params: {
          page: this.currentPage,
          limit: 8,
          alarmLevel: this.levelSelect,
          type: this.storeSelect
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.carTabData = res.data.data.list;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.totalRows;
        }
      });
    },
    getEventAlarmList() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/alarm/abnormal",
        params: {
          page: this.currentPage,
          limit: 8,
          alarmLevel: this.levelSelect,
          type: this.storeSelect
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.eventTabData = res.data.data.list;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.totalRows;
        }
      });
    },
    // 获取车辆库表格数据
    getCarTableList() {
      this.currentPage = 1;
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/library/selectCarTypeList",
        params: {
          page: this.currentPage,
          limit: 18
        }
      }).then(res => {
        if (res.data.code == 1000) {
          sessionStorage.setItem(
            "carStoreList",
            JSON.stringify(res.data.data.list)
          );
        }
      });
    },
    /*获取人员库信息  */
    getFaceTableList() {
      this.currentPage = 1;
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/library/selectFaceTypeList",
        params: {
          page: this.currentPage,
          limit: 18
        }
      }).then(res => {
        if (res.data.code == 1000) {
          sessionStorage.setItem(
            "faceStoreList",
            JSON.stringify(res.data.data.list)
          );
          this.storeList = JSON.parse(sessionStorage.getItem("faceStoreList"));
        }
        //console.log(res)
      });
    },
    handleSizeChange(val) {
      
    },
    handleCurrentChange(val) {
     this.currentPage = val;
      this.getSearch()
    },
    clickPopDetai(val, row) {
      this.dialogFormVisible = true;
      switch (this.activeName) {
        case "first":
          this.alarmType = 1;
          break;
        case "second":
          this.alarmType = 2;
          break;
        case "thirdly":
          this.alarmType = 3;
          break;
        default:
          break;
      }
      if (val == 0) {
        this.form.content = ""
        this.PopStatus = true;
      } else {
        this.PopStatus = false;
        this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/alarm/handleInfo",
        params: {
          id: row.id,
          alarmType: this.alarmType+""
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.form.handleTime = res.data.data.handleTime;
          this.form.handle = res.data.data.handle;
          this.form.content =res.data.data.content
        }
      });
      }
      //console.log(row)
      this.id = row.id;
    }
  },
  created() {
    /* 有问题得异步操作，按道理不用这样的 */
    this.$nextTick(() => {
      this.getFaceTableList();
      this.getCarTableList();
      this.handleClick();
    });
  }
};
</script>

<style lang="scss" scoped>
.right-box {
  height: 100%;
  width: 1542px;
  float: right;
  padding: 0 10px 0 0px;
  background: #bcd6ed;
  margin-top: 25px;

  .title {
    margin-top: 13px;
    margin-left: 10px;

    p {
      width: 6px;
      height: 16px;
      float: left;
      background: linear-gradient(
        0deg,
        rgba(59, 169, 230, 1),
        rgba(95, 201, 251, 1)
      );
      box-shadow: 0px 3px 7px 0px rgba(225, 238, 249, 0.12);
      border-radius: 2px;
      margin-right: 10px;
    }

    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
      color: rgba(51, 51, 51, 1);
    }
  }
}

.table3 {
  height: 815px;
  background: #f5f9fc;
  padding: 10px 27px 0 19px;
  border-radius: 5px;
  position: relative;

  img {
    width: 64px;
    height: 64px;
    /*margin-right: 5px;*/
  }

  .table-btn {
    position: absolute;
    right: 23px;
    top: 16px;
    display: flex;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.1s;
      z-index: 999;
      cursor: pointer;
    }

    > div:nth-of-type(1) {
      margin-right: 13px;
      color: #3ba9e6;
      width: 110px;
      height: 36px;
      border: #3ba9e6;
      border: 1px solid rgba(59, 169, 230, 1);
      border-radius: 4px;
    }

    > div:nth-of-type(2) {
      width: 110px;
      height: 36px;
      background: #3ba9e6;
      border: 1px solid rgba(59, 169, 230, 1);
      border-radius: 4px;
    }

    > div:nth-of-type(1):hover {
      background: #b6e0ed;
      border: 1px solid #b6e0ed;

      color: #fff;
    }

    > div:nth-of-type(2):hover {
      background: #31ace6;
      color: #fff;
    }
  }
}

.headerBlock {
  height: 100px;
  background: #f5f9fc;
  margin-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 5px;

  .titleHeader {
    margin-top: 15px;
    text-align: left;
    color: rgba(51, 51, 51, 1);

    .left-text {
      margin-left: 15px;

      input {
        text-align: left;
      }
    }
  }
}

.i-btn {
  color: #3db7ed;
  font-size: 20px;
  margin-right: 20px;
  transition: all 0.1s;
}

.i-btn:hover {
  color: #fff;
}
</style>

