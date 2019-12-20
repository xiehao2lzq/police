<template>
  <div class="personParticularList">
    <div class="leftTabBox">
      <div class="title clear">
        <p></p>
        <span>基础信息</span>
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
          <span>实有人员</span>
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
            <span>国别：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="nation" placeholder="国别"></el-input>
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
            <span>居住证：</span>
            <el-select v-model="cardValue" placeholder="请选择">
              <el-option
                v-for="item in card"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <li>
              <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
            </li>
          </div>
          <div class="selectBox1">
            <button @click="search(tabIndex)">查询</button>
            <button @click="reset(tabIndex)">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[1].isSelected">
        <div class="title clear">
          <p></p>
          <span>陌生人员列表</span>
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
            <span>出现次数：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="num" placeholder="输入次数"></el-input>
          </div>
          <div class="selectBox1">
            <span>年龄：</span>
            <el-select v-model="age" placeholder="请选择">
              <el-option
                v-for="item in ages"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <li>
              <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
            </li>
          </div>
          <div class="selectBox1">
            <button @click="search(tabIndex)">查询</button>
            <button @click="reset(tabIndex)">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[2].isSelected">
        <div class="title clear">
          <p></p>
          <span>疑似迁出人员列表</span>
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
            <span>未感知时长>=天：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="day" placeholder="输入天数"></el-input>
          </div>
          <div class="selectBox1">
            <li>
              <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
            </li>
          </div>
          <div class="selectBox1">
            <button @click="search(tabIndex)">查询</button>
            <button @click="reset(tabIndex)">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tableBox boxColor" v-if="tabArr[0].isSelected">
      <div class="table2">
        <el-table :data="tableData" height="755" style="width: 100%" @row-click="personRecord">
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
          <el-table-column prop="nationalityName" label="国别"></el-table-column>
        <el-table-column prop="phone" label="电话" ></el-table-column>
         <el-table-column prop="paperNumber" label="证件号码" ></el-table-column>
        <el-table-column prop="xqName" label="居住小区"></el-table-column>
        <el-table-column prop="houseName" label="房屋号"></el-table-column>
        <el-table-column prop="liveTypyName" label="居住身份"></el-table-column>
        <el-table-column  label="是否办理居住证">
           <template slot-scope="scope">
            <span v-if="scope.row.liveTypyName=='业主'||scope.row.liveTypyName=='家庭成员'">/</span>
            <span v-else>{{scope.row.residence=="0"?"未申请居住证":"已申请居住证"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkinDate" label="入住时间"></el-table-column>
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
    
    <div class="tableBox boxColor" v-if="tabArr[1].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.image || src" alt />
            <div class="rightInfo">
              <p>
                <span>性别：</span> {{item.sex}}
              </p>
              <p>
                <span>年龄段：</span>{{item.age}}
              </p>
              <p>
                <span>小区：</span>{{item.accessAddr}}<!-- 接口字段乱了 -->
              </p>
              <p>
                <span>出入次数：</span>{{item.num}}<!-- 接口字段乱了 -->
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
            <img :src="item.image || src" alt />
            <div class="rightInfo">
              <p>
                <span>姓名：</span> {{item.name}}
              </p>
              <p>
                <span>房号：</span>{{item.houseName}}
              </p>
              <p>
                <span>未感知时长：</span>{{item.noSenceTime}}
              </p>
             <!--  <p>
                <span>出入次数：</span>{{item.accessNum}}
              </p> -->
            </div>
          </li>
        </ul>
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
      src:require("@static/image/person.png"),
      communityList: [], //小区列表
      community: "", //选中的小区
      nation: "", //国别
      liveTypes: [
        {
          name: "业主",
          value: 1
        },
         {
          name: "家庭成员",
          value: 2
        },
        {
          name: "租户",
          value: 3
        }
      ],
      liveType: "",
      card: [
        //居住证
        {
          name: "有居住证",
          value: 1
        },
        {
          name: "无居住证",
          value: 2
        }
      ],
      cardValue: "",
      num: "", //出现次数
      ages:[
        {
          name:"未成年",
          value:0
        },
        {
          name:"青年",
          value:1
        },
        {
          name:"中年",
          value:2
        },
        {
          name:"老年",
          value:3
        }
      ],
      age: "", //年龄
      input: "", //模糊搜索
      day: "", //天数
      tableData: [],
      currentPage: 1,
      total: 1,
      tabArr: [
        {
          src:require("@static/image/personList1.png"),
          text: "实有人员列表",
          isSelected: false
        },
        {
          src: require("@static/image/personList2.png"),
          text: "陌生人员列表",
          isSelected: false
        },
        {
          src: require("@static/image/personList3.png"),
          text: "疑似迁出人员列表",
          isSelected: false
        }
      ]
    };
  },
  computed: {
    ...mapState({
      selectedArr: state => state.commonData.selectedArr
    }),
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {
    /* 实有人员数据请求 */
    var id = this.$route.params.userId;
    switch (id) {
      case 0:
        this.tabArr[0].isSelected = true;
        this.tabIndex = 0;
        this.listInfo1()
        break;
      case 1:
        this.tabArr[1].isSelected = true;
        this.tabIndex = 1;
        this.listInfo2()
        break;
      case 2:
        this.tabArr[2].isSelected = true;
        this.tabIndex = 2;
        this.listInfo3()
        break;
      default:
        this.tabArr[0].isSelected = true;
        this.tabIndex = 0;
        this.listInfo1()
        break;
    }
     this.communityList = JSON.parse(sessionStorage.getItem('selectedArr'));//为了防止刷新丢失从缓存中取
  },
  methods: {
    personRecord(row) {
      //console.log(row);
      this.$router.push({ name: "personRecord",query:{id:row.ownerId} });
    },
    reset(val){
      //console.log(val)
      this.select(val);
    },
    search(val){
      //console.log(val)
       switch (val) {
        case 0:
          this.listInfo1()
          break;
       case 1:
          this.listInfo2()
          break;
           case 2:
          this.listInfo3()
          break;
        default:
          break;
      }
    },
    select(val) {
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;
     
      /* 切换按钮清空数据 */
      this.community = "";
      this.nation = "";
      this.liveType = "";
      this.cardValue = "";
      this.num = "";
      this.age = "";
      this.input = "";
      this.day = "";
      this.input = "";
      this.currentPage = 1;
      this.total = 1;
      this.tabIndex = val;
      this.tableData = [];
       /* 请求切换模块的数据 */
      switch (val) {
        case 0:
          this.listInfo1()
          break;
       case 1:
          this.listInfo2()
          break;
           case 2:
          this.listInfo3()
          break;
        default:
          break;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      switch (this.tabIndex) {
        case 0:
          this.listInfo1()
          break;
       case 1:
          this.listInfo2()
          break;
           case 2:
          this.listInfo3()
          break;
        default:
          break;
      }
    },
    listInfo1() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/owner/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 20,
          page: this.currentPage,
          nationalityName:this.nation,
          liveType:this.liveType,
          cardvalue:this.cardValue
        }
      }).then(res => {
        if(res.data.code==1000){
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
        }
        console.log(res);
      });
    },
    listInfo2() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/stranger/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 12,
          page: this.currentPage,
          accessNumBegin:this.num,
          age:this.age
        }
      }).then(res => {
        //console.log(res);
        if(res.data.code==1000){
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
          this.tableData = res.data.data.stranger;
        }
      });
    },
    listInfo3() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/quit/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 12,
          page: 1,
          daySmall:this.day
        }
      }).then(res => {
        if(res.data.code==1000){
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
          this.tableData = res.data.data.list;
        }
        //console.log(res);
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