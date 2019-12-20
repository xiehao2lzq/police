<template>
  <div class="BigDataAnalysisList">
    <div class="leftTabBox">
      <div class="title clear">
        <p></p>
        <span>大数据分析</span>
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
          <span>频繁夜归人员</span>
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
            <span>夜归次数：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="backNum" placeholder="最少夜归次数"></el-input>
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
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[1].isSelected">
        <div class="title clear">
          <p></p>
          <span>频繁夜归车辆</span>
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
          <!-- <div class="selectBox1">
            <span>居住身份：</span>
            <el-select v-model="liveType" placeholder="请选择">
              <el-option
                v-for="item in liveTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div> -->
          <div class="selectBox1">
            <span>夜归次数：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="backNum" placeholder="最少夜归次数"></el-input>
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
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[2].isSelected">
        <div class="title clear">
          <p></p>
          <span>群租房研判分析</span>
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
            <span>房产关联人数：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="housepeople" placeholder="最少关联人数"></el-input>
          </div>
          <div class="selectBox1">
            <span>房屋性质：</span>
            <el-select v-model="purpose" placeholder="请选择">
              <el-option
                v-for="item in purposes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- <div class="selectBox1">
            <li>
              <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
            </li>
          </div>-->
          <div class="selectBox1">
            <button @click="search">查询</button>
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[3].isSelected">
        <div class="title clear">
          <p></p>
          <span>用水异常研判分析</span>
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
            <span>起止月份（近一年）：</span>
            <div class="mouthPick">
              <el-date-picker v-model="startMonth" type="month" placeholder="选择起始月"></el-date-picker>
              <i>至</i>
              <el-date-picker v-model="endMonth" type="month" placeholder="选择截止月"></el-date-picker>
            </div>
          </div>
          <!-- <div class="selectBox1">
            <li>
              <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
            </li>
          </div>-->
          <div class="selectBox1">
            <button @click="search">查询</button>
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[4].isSelected">
        <div class="title clear">
          <p></p>
          <span>日租、短租房研判分析</span>
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
            <span>操作次数>=：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="handleNum" placeholder="房产绑定/解绑次数"></el-input>
          </div>
          <div class="selectBox1">
            <span>房屋性质：</span>
            <el-select v-model="purpose" placeholder="请选择">
              <el-option
                v-for="item in purposes"
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
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[5].isSelected">
        <div class="title clear">
          <p></p>
          <span>疑似闲置房屋研判分析</span>
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
            <span>房屋状态：</span>
            <el-select v-model="purpose" placeholder="请选择">
              <el-option
                v-for="item in purposes"
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
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tableBox boxColor" v-if="tabArr[0].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.img" alt />
            <div class="rightInfo rightInfo2">
              <p>
                <span>姓名：</span>
                {{item.name}}
              </p>
              <p>
                <span>小区：</span>
                {{item.xqName}}
              </p>
              <p>
                <span>住户身份：</span>
                {{item.identityName}}
              </p>
              <p>
                <span>夜归时间：</span>
                {{item.captureTimeStr}}
              </p>
              <p>
                <span>夜归次数：</span>
                {{item.times}}
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

    <div class="tableBox boxColor" v-if="tabArr[1].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img src="@static/image/carBg.png" alt />
            <div class="roomNum">{{item.carNum}}</div>
            <div class="rightInfo">
              <p>
                <span>车牌：</span>
                {{item.carNum}}
              </p>
              <p>
                <span>小区：</span>
                {{item.xqName}}
              </p>
              <p>
                <span>夜归时间：</span>
                {{item.dateStr}}
              </p>
              <p>
                <span>夜归次数：</span>
                {{item.times}}
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

    <div class="tableBox boxColor" v-if="tabArr[2].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img src="@static/image/houseBg.png" alt />
            <div class="roomNum">{{item.roomName}}</div>
            <div class="rightInfo rightInfo3">
              <p>
                <span>小区名称：</span>
                {{item.xqName}}
              </p>
              <p>
                <span>房号：</span>
                {{item.houseInfo}}
              </p>
              <p>
                <span>房屋用途：</span>
                {{item.purposeName}}
              </p>
              <p>
                <span>户主：</span>
                {{item.ownerName}}
              </p>
              <p>
                <span>电话：</span>
                {{item.phone}}
              </p>
              <p>
                <span>关联人数：</span>
                {{item.personNum}}
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
    <div class="tableBox boxColor" v-if="tabArr[3].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img src="@static/image/houseBg.png" alt />
            <div class="roomNum">{{item.roomName}}</div>
            <div class="rightInfo rightInfo3">
              <p>
                <span>小区名称：</span>
                {{item.xqName}}
              </p>
              <p>
                <span>房号：</span>
                {{item.houseInfo}}
              </p>
              <p>
                <span>房屋用途：</span>
                {{item.purposeName}}
              </p>
              <p>
                <span>户主：</span>
                {{item.ownerName}}
              </p>
              <p>
                <span>电话：</span>
                {{item.phone}}
              </p>
              <p>
                <span>用水量：</span>
                {{item.waterYield}}
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

    <div class="tableBox boxColor" v-if="tabArr[4].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img src="@static/image/houseBg.png" alt />
            <div class="roomNum">{{item.roomName}}</div>
            <div class="rightInfo rightInfo3">
              <p>
                <span>小区：</span>
                {{item.xqName}}
              </p>
              <p>
                <span>房号：</span>
                {{item.houseInfo}}
              </p>
              <p>
                <span>房屋用途：</span>
                {{item.purposeName}}
              </p>
              <p>
                <span>户主：</span>
                {{item.ownerName}}
              </p>
              <p>
                <span>电话：</span>
                {{item.iphone}}
              </p>
              <p>
                <span>绑定/解绑次数：</span>
                {{item.bindNum}}
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

    <div class="tableBox boxColor" v-if="tabArr[5].isSelected">
      <div class="table2">
        <el-table :data="tableData" height="755" style="width: 100%" @row-click="personRecord">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="xqName" label="小区"></el-table-column>
          <el-table-column prop="homeaddress" label="房号" width="300%"></el-table-column>
          <el-table-column prop="roomOwner" label="房屋产权人"></el-table-column>
          <el-table-column prop="ownerPhone" label="产权人电话"></el-table-column>
          <el-table-column prop="waterMeterNum" label="用水量"></el-table-column>
          <el-table-column prop="unusedTime" label="疑似闲置时间(月)"></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
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
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      communityList: [], //小区列表
      community: "",
      liveTypes: [
        //居住类型
        {
          name: "业主",
          value: "业主"
        },
        {
          name: "租户",
          value:"租户"
        },
         {
          name: "不限",
          value:""
        }
      ],
      liveType: "",
      purposes: [
        //房屋用途
        {
          name: "自用",
          value: "自用"
        },
        {
          name: "出租",
          value: "出租"
        },
        {
          name: "空置",
          value: "空置"
        },
         {
          name: "不限",
          value: ""
        }
      ],
      purpose: "",
      backNum: "", //夜归次数
      value1: [], //查询时间段
      value2: "",
      startMonth: "",
      endMonth: "",
      housepeople: "", //房屋最少关联人数
      handleNum: "", //房屋操作次数
      input: "",
      tabIndex: "", //切换的当前tab栏
      tableData: [],
      currentPage: 1,
      total: 0,
      tailUrl: "", //请求接口
      params: {}, //请求参数
      methods:"post",//请求方式
      tabArr: [
        {
          src:require("@static/image/bigdata1.png"),
          text: "频繁夜归人员",
          isSelected: true
        },
        {
          src: require("@static/image/bigdata2.png"),
          text: "频繁夜归车辆",
          isSelected: false
        },
        {
          src: require("@static/image/bigdata3.png"),
          text: "群租房研判分析",
          isSelected: false
        },
        {
          src: require("@static/image/bigdata4.png"),
          text: "用水异常研判分析",
          isSelected: false
        },
        {
          src: require("@static/image/bigdata5.png"),
          text: "日租、短租房研判分析",
          isSelected: false
        },
        {
          src: require("@static/image/bigdata6.png"),
          text: "疑似闲置房屋列表",
          isSelected: false
        }
      ]
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
    this.timer();
    this.communityList = JSON.parse(sessionStorage.getItem("selectedArr")); //为了防止刷新丢失从缓存中取
    this.tabIndex = 0; //默认进第一个模块
    this.switchTabIndex(); //选择当前切换的tab栏请求
  },
  methods: {
    search() {
      this.switchTabIndex(); //选择当前切换的tab栏请求
    },
    reset() {
      this.community = "";
      this.liveType = "";
      this.purpose = "";
      this.backNum = "";
      this.startMonth = "";
      this.endMonth = "";
      this.currentPage = 1;
      this.handleNum = "";
      this.housepeople = "";
      this.total = 0;
      this.value1 = [];
      this.switchTabIndex();
    },
    personRecord(row) {
      console.log(row);
      //this.$router.push({ name: "personRecord" });
    },
    select(val) {
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;
      this.tabIndex = val;
      this.switchTabIndex();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.switchTabIndex();
    },
    switchTabIndex() {
      this.value1[0] = this.value1[0]
        ? new Date(this.value1[0]).format("yyyy-MM-dd hh:mm:ss")
        : "";
      this.value1[1] = this.value1[1]
        ? new Date(this.value1[1]).format("yyyy-MM-dd hh:mm:ss")
        : "";

      switch (this.tabIndex) {
        case 0:
          /* 人员夜归 */
          this.params = JSON.stringify({
            limit: 12,
            page: this.currentPage,
            identity: this.liveType,
            /* startDate: this.value1[0],
            endDate: this.value1[1], */
            xqCode: this.community,
            times: this.backNum
          });
          this.tailUrl = "/bigData/nightReturnPerson";
          this.method = "post";
          break;
        case 1:
          /* 车辆夜归 */
          this.params = {
            limit: 12,
            page: this.currentPage,
            identity: this.liveType,
            startDate: this.value1[0],
            endDate: this.value1[1],
            xqCode: this.community,
            times: this.backNum
          };
          this.tailUrl = "/bigData/nightReturnCar";
          this.method = "get";
          break;
        case 2:
          /* 群租房 */
          this.params = JSON.stringify({
            limit: 12,
            page: this.currentPage,
            xqCode: this.community,
            associateNum: this.housepeople,
            roomProperty:this.purpose
          });
          this.tailUrl = "/bigData/groupResearch";
          this.method = "post";
          break;
        case 3:
          /* 用水异常 */
          this.params = {
            limit: 12,
            page: this.currentPage,
            xqCode: this.community,
            startMonth: this.startMonth,
            endMonth: this.endMonth
          };
          this.tailUrl = "/bigData/waterRate";
          this.method = "get";
          break;
        case 4:
          /* 日租短租 */
          this.params = JSON.stringify({
            limit: 12,
            page: this.currentPage,
            xqCode:this.community,
            roomProperty:this.purpose,
          })
          this.tailUrl = "/bigData/dayRentalResearch";
          this.method = "post";
          break;
        case 5:
          /* 疑似闲置 */
          this.params = {
            limit: 20,
            page: this.currentPage,
            purpose: this.purpose,
            //startDate:this.value1[0],
            //endDate:this.value1[1],
            xqCode: this.community
          };
          this.tailUrl = "/house/room/unused/list";
          this.method = "get";
          break;
        default:
          break;
      }
      this.listInfo();
    },
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
    listInfo() {
     // console.log(this.params)
      if(this.method=="post"){
        this.$axios({
        method:this.method,
        url: "http://" + this.url + ":9000/sjwl/webapi" + this.tailUrl,
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
         // 'Content-Type':'application/json'
        },
        /* params: this.params, */
        data:this.params
      }).then(res => {
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.totalRows;
          if (this.tabIndex == 5) {
            this.tableData.forEach((item, index) => {
              item.homeaddress =
                item.buildingName + item.cellName + item.roomName;
            });
          }
        }
        console.log(res);
      });
      }else{
        this.$axios({
        method:this.method,
        url: "http://" + this.url + ":9000/sjwl/webapi" + this.tailUrl,
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
        },
        params: this.params,
      }).then(res => {
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.totalRows;
          if (this.tabIndex == 5) {
            this.tableData.forEach((item, index) => {
              item.homeaddress =
                item.buildingName + item.cellName + item.roomName;
            });
          }
        }
        console.log(res);
      });
      }
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
      position: relative;
      cursor: pointer;
      img {
        float: left;
        margin: 15px 20px 0 60px;
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

.tableBox {
  width: 1532px;
  height: 815px;
  float: left;
  margin: 19px 0 0 11px;
}
.table2 {
  height: 815px;
  width: 1502px;
  margin: 10px auto 0;
}
.table2 ul {
  height: 755px;
  width: 100%;
  li {
    width: 480px;
    height: 180px;
    background: #e0edf9;
    margin: 10px 0 0 15px;
    float: left;
    border-radius: 5px;
    position: relative;
    .roomNum {
      position: absolute;
      width: 160px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      background: rgba(245, 250, 255, 1);
      opacity: 0.82;
      color: #666666;
      font-weight: 900;
      font-size: 30px;
      left: 10px;
      top: 65px;
      z-index: 10;
    }
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
    .rightInfo2 {
      p {
        margin-top: 15px;
      }
    }
     .rightInfo3 {
      p {
        margin-top: 10px;
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