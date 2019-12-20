<template>
  <div class="CarParticularList">
    <div class="leftTabBox">
      <div class="title clear">
        <p></p>
        <span>实有车辆列表</span>
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
      <div>
        <div class="title clear">
          <p></p>
          <span>实有车辆</span>
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
            <span>车辆品牌：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="carBrandName" placeholder="车辆品牌"></el-input>
          </div>
          <div class="selectBox1">
            <span>车辆颜色：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="carColor" placeholder="车辆颜色"></el-input>
          </div>
          <!-- <div class="selectBox1">
            <span>时间：</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div> -->
          <div class="selectBox1">
            <li>
              <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
            </li>
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

    <div class="tableBox boxColor">
      <div class="table2">
         <ul>
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.image || src2" alt="">
            <div class="rightInfo">
              <p><span>车牌号：</span> {{item.carNum}}</p>
              <p><span>车主姓名：</span>{{item.personName}}</p>
              <p><span>小区：</span>{{item.xqName}}</p>
              <p><span>录入时间：</span>{{item.checkinDate}}</p>
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
export default {
  data() {
    return {
      src:require("@static/image/person.png"),
      src2:require("@static/image/carNoImage.png"),
      communityList: [], //小区列表
      community: "", //选中的小区
      liveTypes: [
        {
          name: "业主车辆",
          value: 1
        },
        {
          name: "租户车辆",
          value: 3
        }
      ],
      liveType: "",
      carColor:"",
      carBrandName:"",
      input: "",
      tableData: [],
      currentPage: 1,
      total: 1,
      tabArr: [
        {
          src: require("@static/image/carlist1.png"),
          text: "实有车辆列表",
          isSelected: true
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
    }),
  },
  created() {
     this.communityList = JSON.parse(sessionStorage.getItem('selectedArr'));//为了防止刷新丢失从缓存中取
    this.listInfo2();
    
  },
  methods: {
    search(){
      this.listInfo2()
    },
    reset(){
      this.liveType =""
      this.carColor=""
      this.carBrandName=""
      this.input= ""
      this.community = ""
      this.currentPage = 1
      this.listInfo2()
    },
    select(val) {
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listInfo2()
    },
    listInfo2() {
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
          limit: 12,
          page: this.currentPage,
          carColor:this.carColor,
          liveType:this.liveType,
          carBrandName:this.carBrandName,
        }
      }).then(res => {
        console.log(res)
        if(res.data.code==1000){
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage =res.data.data.currentPage;
        }
        //console.log(res);
       /*  var data = res.data.data;
        this.tableData = data.list; */
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
  height: 150px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  float: left;
  .title {
    color: #333333!important;
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
  height: 765px;
  float: left;
  margin: 19px 0 0 11px;
}
.table2 {
  height: 765px;
  width: 1502px;
  margin: 10px auto 0;
}
.table2 ul{
    height: 705px;
    width:100%;
    li{
        width: 480px;
        height: 160px;
        background: #E0EDF9;
        margin: 10px 0 0 15px;
        float: left;
        border-radius: 5px;
        img{
            float: left;
            width: 140px;
            height: 140px;
            margin:10px 0 0 10px;
        }
        .rightInfo{
            float: left;
            margin-left: 40px;
            p{
                margin-top:15px;
            }
        }
        p{
            color:#333333;
        }
    }
}
.page {
  width: 100%;
  margin-top: 10px;
  text-align: right;
}
</style>