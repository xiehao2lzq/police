<template>
  <div>
    <Header />
    <div class="content">
      <div class="left-box">
        <div class="title clear">
          <p></p>
          <span>物业管理</span>
        </div>
        <div class="menu-list">
          <li
            :class="{'active-item':tabNum==index}"
            class="menu-item"
            @click="tabShow(index)"
            v-for="(item,index) in menuList"
          >
            <img :src="item.href" alt />
            <span>{{item.title}}</span>
          </li>
        </div>
      </div>
      <div class="right-box">
        <div class="headerBlock">
          <div class="rightLogo"></div>
          <div class="title clear">
            <p></p>
            <span v-if="tabNum==0">社区房屋列表</span>
            <span v-if="tabNum==1">欠费房屋列表</span>
          </div>
          <div class="titleHeader">
            <div class="block selectBox1">
              <span class="left-text">小区：</span>
              <el-select v-model="community" placeholder="请选择">
                <el-option
                  v-for="(item,index) in communityList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="left-text">房屋状态：</span>
              <el-select v-model="houseStatus" placeholder="请选择">
                <el-option
                  v-for="(item,index) in houseStatusList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                class="left-text"
                v-model="searchText"
                placeholder="请输入"
                style="width:280px"
              ></el-input>
              <div class="search-btn">
                <el-button class="left-text" type="primary" @click="getSearch(tabNum)">查询</el-button>
                <el-button type="primary" @click="reset()">重置</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="table2">
          <el-table
            v-if="tabNum===0"
            :data="tribeData"
            height="750"
            style="width: 100%"
            @row-click="openDetails"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="xqName" label="所在小区"></el-table-column>
            <el-table-column prop="roomOwner" label="房屋产权人"></el-table-column>
            <el-table-column prop="homeaddress" label="房号"></el-table-column>
            <el-table-column prop="buildingArea" label="房屋面积"></el-table-column>
            <el-table-column prop="purposeName" label="房屋用途"></el-table-column>
            <el-table-column prop="funcName" label="房屋类型"></el-table-column>
            <el-table-column prop="bindingCarNum" label="绑定车辆"></el-table-column>
            <el-table-column prop="liveNum" label="绑定人员"></el-table-column>
          </el-table>
          <el-table
            v-if="tabNum===1"
            :data="tribeData"
            height="750"
            style="width: 100%"
            @row-click="openDetails"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="xqName" label="所在小区"></el-table-column>
            <el-table-column prop="homeaddress" label="房号"></el-table-column>
            <el-table-column prop="roomOwner" label="房屋产权人"></el-table-column>
            <el-table-column prop="ownerPhone" label="产权人电话"></el-table-column>
            <el-table-column prop="purposeName" label="房屋用途"></el-table-column>
            <el-table-column prop="arrearageNum" label="欠费金额"></el-table-column>
            <el-table-column prop="arrearageTime" label="欠费时长（月）"></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="20"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--    <pop-window :openStatus="showWindow"></pop-window>-->
    <div class="tab-box">
      <el-dialog title :visible.sync="dialogTableVisible" width="910px" top="3vh" border="true">
        <div class="title clear">
          <p></p>
          <span>房屋信息</span>
        </div>
        <p class="tit-text">基础信息</p>
        <div class="info-box">
          <li class="info-item">
            <span>所在小区：</span>
            <span>{{roomData.xqName}}</span>
          </li>
          <li class="info-item">
            <span>楼号：</span>
            <span>{{roomData.buildingName}}</span>
          </li>
          <li class="info-item">
            <span>单元号：</span>
            <span>{{roomData.cellName}}</span>
          </li>
          <li class="info-item">
            <span>房屋类型：</span>
            <span>{{roomData.funcName}}</span>
          </li>
          <li class="info-item">
            <span>用途：</span>
            <span>{{roomData.purposeName}}</span>
          </li>
          <li class="info-item">
            <span>装修时间：</span>
            <span>{{roomData.decorationTime}}</span>
          </li>
          <li class="info-item">
            <span>房屋号：</span>
            <span>{{roomData.roomName}}</span>
          </li>
          <li class="info-item">
            <span>建筑面积：</span>
            <span>{{roomData.buildingArea}}m²</span>
          </li>
          <li class="info-item">
            <span>房产证号：</span>
            <span>{{roomData.housePropertyCardNo}}</span>
          </li>
          <li class="info-item">
            <span>认购证号：</span>
            <span>{{roomData.subscribeNo}}</span>
          </li>
        </div>
        <p class="tit-text">人员信息（{{peopleData.totalRows}}）</p>
        <div class="info-box people-box">
          <li class="people-item" v-for="(item,index) in peopleData.list" :key="index">
            <img class="people-img" :src="item.image ||src" alt />
            <div class="right-box">
              <div class="text-line">
                <span>名称:</span>
                <span>{{item.ownerName}}</span>
              </div>
              <div class="text-line">
                <span>性别:</span>
                <span>{{item.sex}}</span>
              </div>
              <div class="text-line">
                <span>居住身份:</span>
                <span>{{item.liveTypeName}}</span>
              </div>
              <div class="text-line">
                <span>身份证:</span>
                <span>{{item.paperNumber}}</span>
              </div>
              <div class="text-line">
                <span>手机号:</span>
                <span>{{item.phone}}</span>
              </div>
            </div>
          </li>
        </div>
        <p class="tit-text">车辆信息（{{carData.length}}）</p>
        <div class="info-box people-box">
          <li class="people-item" v-for="(item,index) in carData">
            <img class="car-img" :src="item.carImg || src2" alt />
            <div class="right-box">
              <div class="text-line">
                <span>车牌：</span>
                <span>{{item.carNum}}</span>
              </div>
              <div class="text-line">
                <span>车辆颜色：</span>
                <span>{{item.carNumColorName}}</span>
              </div>
              <div class="text-line">
                <span>汽车品牌：</span>
                <span>{{item.carBrandName}}</span>
              </div>
            </div>
          </li>
        </div>
        <p class="tit-text">缴费信息（近一年）</p>
        <el-table :data="gridData">
          <el-table-column property="year" label="年度" width="150"></el-table-column>
          <el-table-column property="month" label="月份" width="150"></el-table-column>
          <el-table-column property="propertyFee" label="物业费"></el-table-column>
          <el-table-column property="propertyFeeStatus" label="缴纳状态"></el-table-column>
          <el-table-column property="waterUse" label="用水量"></el-table-column>
          <el-table-column property="waterFee" label="水费"></el-table-column>
          <el-table-column property="waterFeeStatus" label="缴纳状态"></el-table-column>
        </el-table>
        <div class="bottom-btn">
          <el-button type="primary" @click="dialogTableVisible=false">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Header from "../header";
import popWindow from "./PopWindow";

export default {
  components: {
    Header,
    popWindow
  },
  computed: {
    ...mapState({
      url: state => state.commonData.url
    }),
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
  },
  created() {
    /* 获取小区code表 */
     this.communityList = JSON.parse(sessionStorage.getItem('selectedArr'));//为了防止刷新丢失从缓存中取
    this.getTableList();
  },
  data() {
    return {
      src:require("@static/image/person.png"),
      src2:require("@static/image/carNoImage.png"),
      menuList: [
        {
          title: "社区房屋列表",
          href: require("@static/image/community_menu1.png")
        },
        {
          title: "欠费房屋列表",
          href: require("@static/image/community_menu2.png")
        }
      ],
      tabNum: 0, //0:社区房屋列表 1:欠费房屋列表
      tribeData: [], //切换菜单时 数据共用这一个对象
      communityList: [], //小区筛选框
      houseStatusList: [
        { name: "自用", value: 1 },
        { name: "出租", value: 2 },
       /*  { name: "转租", value: 3 }, */
        { name: "空置", value: 4 }
      ], //房屋状态筛选框
      searchText: "", //搜索框文本
      community: "", //小区选中值
      houseStatus: "", //房屋状态选中值
      roomData: "", //弹窗基本信息
      peopleData: "", //弹窗人员信息
      carData: "", //弹窗车辆数据
      gridData: [], //弹窗内表格数据
      dialogFormVisible: false,
      dialogTableVisible: false,
      currentPage: 1,
      total:1
    };
  },
  methods: {
    getSearch() {
      // 筛选条件存在时进行搜索
      this.getTableList();
    },
    // 左侧菜单切换
    tabShow(index) {
      //每次切换菜单将搜索框的值清空
      this.community = "";
      this.houseStatus = "";
      this.searchText = "";
      this.tabNum = index;
      this.currentPage = 1;
      this.getTableList();
    },
    // 重置菜单
    reset() {
      this.community = "";
      this.houseStatus = "";
      this.searchText = "";
      this.getTableList();
    },

    //打开详情页弹窗
    openDetails(row) {
      this.dialogTableVisible = true;
      this.getPopoverInfo(row);
      this.getPopoverPeople(row);
      this.getPopoverCar(row);
      this.getPopoverPayment(row);
    },
    // 获取弹窗中的基本信息
    getPopoverInfo(row) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/info`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        //console.log(res)
        if (res.data.code == 1000) {
          this.roomData = res.data.data;
        }
      });
    },
    // 获取弹窗中的人员信息
    getPopoverPeople(row) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/persons`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 1000) {
          //console.log(res.data.data);
          this.peopleData = res.data.data;
        }
      });
    },
    // 获取弹窗中的车辆列表
    getPopoverCar(row) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/cars`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 1000) {
           //console.log(res.data.data)
          this.carData = res.data.data.list
        }
      });
      /* this.$axios({
        method: "get",
        // url: 'http://' + this.url + ':9000/house/room/list',
        url: "static/mock/houseingInfo/carList.json",
        params: {
          Authorization: row.id
        }
      }).then(res => {
        this.carData = res.data.data.list;
      }); */
    },
    // 获取弹窗中的缴费信息列表
    getPopoverPayment(row) {
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/payment`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 1000) {
          //console.log(res.data.data)
          this.gridData = res.data.data.list
        }
      });
      /* this.$axios({
        method: "get",
        // url: 'http://' + this.url + ':9000/house/room/list',
        url: "static/mock/houseingInfo/paymentInfo.json",
        params: {
          Authorization: row.id
        }
      }).then(res => {
        this.gridData = res.data.data.list;
      }); */
    },
    //获取列表数据
    getTableList() {
      let portUrl = "";
      if (this.tabNum == 0) {
        portUrl = "house/room/list";
        this.$axios({
          method: "get",
          url: "http://" + this.url + ":9000/sjwl/webapi/" + portUrl,
          headers: {
            Authorization: sessionStorage.getItem("Authorization")
          },
          params: {
            areaId: "0",
            xqCode: this.community,
            purpose: this.houseStatus,
            limit: 20,
            page: this.currentPage
          }
        }).then(res => {
          this.tribeData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.tribeData.forEach((item, index) => {
            item.homeaddress =
              item.buildingName + item.cellName + item.roomName;
          });
        });
      } else {
        portUrl = "house/room/arrearage/list";
        this.$axios({
          method: "get",
          url: "http://" + this.url + ":9000/sjwl/webapi/" + portUrl,
          headers: {
            Authorization: sessionStorage.getItem("Authorization")
          },
          params: {
            areaId: "0",
            xqCode: this.community,
            purpose: this.houseStatus,
            limit: 20,
            page: this.currentPage
          }
        }).then(res => {
          this.tribeData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.tribeData.forEach((item, index) => {
            item.homeaddress =
              item.buildingName + item.cellName + item.roomName;
          });
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList()
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  height: 100vh !important;
}

.content {
  display: flex;
  /*height: 934px;*/
  box-sizing: border-box;
  background: #bcd6ed;

  .left-box {
    width: 353px;
    height: 936px;
    margin: 20px 7px 0px 10px;
    padding: 10px 14px 0px;
    background: #404751;
    border-radius: 4px;
    box-sizing: border-box;

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
        color: #fff;
      }
    }

    .menu-list {
      margin-top: 25px;

      .menu-item {
        width: 100%;
        height: 68px;
        background: #3288ea;
        border-radius: 5px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        font-size: 18px;
        padding-left: 50px;
        cursor: pointer;

        img {
          width: 26px;
          height: 26px;
          margin-right: 33px;
        }
      }

      .active-item {
        background: #5fc9fb;
      }
    }
  }

  .right-box {
    height: 100%;
    width: 1532px;
    flex: 1;
    padding: 0 10px 0 7px;
    background: #bcd6ed;
    margin-top: 20px;
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
}

.titleHeader {
  margin-top: 15px;
  text-align: left;
  color: rgba(51, 51, 51, 1);

  .left-text {
    margin-left: 15px;
  }
}

.rightLogo {
  width: 123px;
  height: 14px;
  // background: url(../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}

.headerBlock {
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

.table2 {
  /*width: 1868px;*/
  min-height: 816px;
  margin: 5px auto;
  overflow: auto;
  background: #f5f9fa;
  padding: 0 10px;
  border-radius: 5px;

  .el-table {
    min-height: 316px !important;
  }
}

.el-table--enable-row-transition .el-table__body td {
  transition: none;
}

.tab-box {
  .tit-text {
    font-size: 16px;
    padding-left: 8px;
    margin-bottom: 10px;
  }

  .info-box {
    display: flex;
    flex-wrap: wrap;
    padding: 14px 8px ;
    margin-bottom: 10px;
    background: rgba(224, 237, 249, 1);
    border-radius: 10px;

    .info-item {
      width: 33%;
      margin: 7px 0;
    }

    .people-item {
      display: flex;
      align-items: flex-start;
      /*flex-wrap: wrap;*/
      margin-bottom: 10px;
      font-size: 12px;
      width: 33.333%;

      .right-box {
        .text-line {
          margin: 6px 0;
        }
      }

      .people-img {
        width: 88px;
        height: 100px;
        object-fit: cover;
        margin: 10px 8px;
      }

      .car-img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-right: 10px;
      }
    }
  }

  .people-box {
    justify-content: flex-start;
  }

  .bottom-btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .title {
    margin-top: 13px;
    margin-bottom: 32px;
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
      color: #333333;
    }
  }
}

.page {
  width: 100%;
  margin-top: 8px;
  text-align: right;
}
</style>
