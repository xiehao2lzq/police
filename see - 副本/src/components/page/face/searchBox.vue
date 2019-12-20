<template>
  <div class="searchbox">
    <div class="title">{{effect}}</div>
    <div class="searchInput">
      <span class="nature">{{title}}：</span>
      <div class="name">
        <!-- <el-input v-if="title==='姓名'" placeholder="请输入姓名" v-model="input" clearable></el-input> -->
        <el-input v-if="title==='相似度'"  v-model="input" placeholder=">=60且<=100的数字" clearable></el-input>
        <el-select
          v-if="title==='姓名' && this.$route.name ==='faceCountrl'"
          v-model="value4"
          filterable
          remote
          reserve-keyword
          placeholder="请输入姓名"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.personOrCarCode"
            :label="item.personOrCarName"
            :value="item.personOrCarCode"
          ></el-option>
        </el-select>
        <el-select
          v-if="title==='姓名' && this.$route.name !=='faceCountrl'"
          v-model="value4"
          filterable
          remote
          reserve-keyword
          placeholder="请输入姓名或车牌号"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.personOrCarCode"
            :label="item.personOrCarName"
            :value="item.personOrCarCode"
          ></el-option>
        </el-select>
      </div>
      <span class="nature">查询时间：</span>
      <!-- element ui组件 -->
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="截止时间"
        align="right"
      ></el-date-picker>
      <p v-if="this.$route.name==='countrlHistory'||this.$route.name==='dealHistory'">
        <span class="nature">人脸库类型:</span>
        <el-select v-model="value" placeholder="请选择" style="font-size:18px">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="nature ifDeal" v-if="this.$route.name==='countrlHistory'">是否处理:</span>
        <el-select v-model="value3" placeholder="请选择" v-if="this.$route.name==='countrlHistory'">
          <el-option
            v-for="item in options2"
            :key="item.value3"
            :label="item.label"
            :value="item.value3"
          ></el-option>
        </el-select>
      </p>
      <p>
        <el-popover
          placement="top"
          title="请耐心等待，不要连续点击"
          width="200"
          trigger="manual"
          content
          v-model="visible"
        >
          <el-button slot="reference" type="primary" @click="searchTime" icon="el-icon-search">查询</el-button>
        </el-popover>
        <!-- <el-button type="primary" @click="searchTime" icon="el-icon-search">查询</el-button> -->
        <el-button
          icon="el-icon-position"
          v-if="this.$route.name==='faceCountrl'||this.$route.name==='picFind'"
          type="warning1"
          @click="reset"
        >规划线路</el-button>
        <el-button
          v-if="this.$route.name==='faceCountrl'||this.$route.name==='picFind'"
          type="success"
          @click="startAction"
          icon="el-icon-truck"
        >行动轨迹</el-button>
        <el-button
          v-if="this.$route.name==='faceBank'"
          type="warning"
          @click="startAction"
          icon="el-icon-plus"
        >新增</el-button>
        <el-button
          v-if="this.$route.name==='faceBank'"
          type="success"
          @click="startAction"
          icon="el-icon-upload"
        >初始化人脸库</el-button>
      </p>
    </div>
  </div>
</template>
<script>
//引入事件总线
import bus from "../../../assets/eventsbus.js";
import { mapState } from "vuex";
export default {
  props: ["title", "effect"],
  data() {
    return {
      //下拉选择框
      options1: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "白名单"
        },
        {
          value: "2",
          label: "陌生人"
        },
        {
          value: "3",
          label: "特殊人群"
        },
        {
          value: "4",
          label: "黑名单"
        },
        {
          value: "5",
          label: "特殊预警"
        }
      ],
      value: "",
      options2: [
        {
          value3: "",
          label: "全部"
        },
        {
          value3: "0",
          label: "未处理"
        },
        {
          value3: "1",
          label: "已处理"
        }
      ],
      value3: "",
      //搜索事件配置
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      input: "",
      param: null,
      searchInfo: null,
      visible: false,
      options: [],
      value4: "",
      loading: false,
    };
  },
  computed: {
    ...mapState({
      url: state => state.home.url
    })
  },
  methods: {
    reset() {
      bus.$emit("reset");
    },
    startAction() {
      bus.$emit("startAction");
    },
    //弹窗
    open(a) {
      this.$alert(a, "提示信息：", {
        dangerouslyUseHTMLString: true
      });
    },
    //查询下拉列表的，ui组件方法,更改输入内容触发此方法
    remoteMethod(query) {
      if(this.$route.name==="faceCountrl"){
        var personOrCar = "1"
      }else{
        var personOrCar = "0"
      }
      this.options = [];
      if (query) {
        this.loading = true;//打开方法
        this.$axios
          .get("http://"+this.url + ":9000/sjwl/manageport/face/searchPersonOrCar/list", {
            params: {
              personOrCarName: query, //输入的内容
              personOrCar:personOrCar//查的是人是车
            },
            headers: {
              Authorization: sessionStorage.getItem("Authorization")
            }
          })
          .then(res => {
            console.log(res)
            this.loading = false;//关闭方法
            this.options = res.data.data;
          });
      }   
    },
    searchTime() {
      var beginTime = new Date(this.value2[0])
      beginTime=beginTime.getFullYear() + '-' + (beginTime.getMonth() + 1) + '-' + beginTime.getDate() + ' ' + beginTime.getHours() + ':' + beginTime.getMinutes() + ':' + beginTime.getSeconds();  
      var endTime = new Date(this.value2[1])
      endTime=endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + endTime.getHours() + ':' + endTime.getMinutes() + ':' + endTime.getSeconds();
      //console.log(beginTime,endTime)
      switch (this.$route.name) {
        case "picFind":
          if (this.value2.length && this.$store.state.faceCountrl.base64) {
            //传给后台的数据
            if (this.input) {
              if (this.input < 60 || this.input > 100) {
                this.$store.state.home.err.unshift("相似度为>=60且<=100的数字")
                //alert("请输入>=60且<=100的数字");
                return false;
              }
            }
            //console.log(this.input)
            this.param = {
              txImg: this.$store.state.faceCountrl.base64,
              beginTime: beginTime,
              endTime: endTime,
              limit: 10000,
              page: 1,
              contrastValue: this.input,//相似度
              areaId:0,
              userId:sessionStorage.getItem("userId")
            };
            console.log(this.param)
            //出发action发送axios请求,以图搜图搜索页
            if (this.$store.state.faceCountrl.nextRequest) {
              this.$store.state.faceCountrl.nextRequest = false; //数据返回之前拒绝再次请求
              this.$store.dispatch("picSearch", this.param);
            } else {
              this.visible = true; //数据还没回来之前再点击给提示
              var _this = this;
              setTimeout(() => {
                //请求结束后一秒后关闭提示
                _this.visible = false;
              }, 1000);
            }
            this.$store.state.faceCountrl.loading = true; //显示遮罩层
            this.$store.state.faceCountrl.loading2 = true;
          } else {
             this.$store.state.home.err.unshift("请上传照片和查找时间")
            //this.open("<strong>请上传照片和查找时间</strong>");
            //alert("请上传照片和查找时间");
          }
          break;
        case "faceCountrl":
          if (this.value2.length && this.value4.length) {
            this.param = {
              personCode: this.value4,//查询目标的唯一标识id
              beginTime: beginTime,
              endTime: endTime,
              limit: 10000,
              page: 1,
              areaId:0
            };
            console.log(this.param)
            //出发action发送axios请求,人名搜索页
            
            if (this.$store.state.faceCountrl.nextRequest) {
              this.$store.state.faceCountrl.nextRequest = false; //数据返回之前拒绝再次请求
              this.$store.dispatch("nameSearch", this.param);
            } else {
              this.visible = true; //数据还没回来之前再点击给提示
              var _this = this;
              setTimeout(() => {
                //请求结束后一秒后关闭提示
                _this.visible = false;
              }, 1000);
              console.log(this.$store.state.faceCountrl.nextRequest);
            }
            this.$store.state.faceCountrl.loading = true; //显示遮罩层
            this.$store.state.faceCountrl.loading2 = true;
          } else {
            this.$store.state.home.err.unshift("请填姓名和查找时间")
            //this.open("<strong>请填姓名和写查找时间</strong>");
            /* alert("请填姓名和写查找时间"); */
          }
          break;
        case "countrlHistory":
          if (this.value2.length) {
            this.param = {
              personOrCarCode: this.value4,
              beginTime: beginTime,
              endTime: endTime,
              limit: 20,
              page: 1,
              faceTypeCode: this.value,
              clStatus: this.value3
            };
          } else {
            this.$store.state.home.err.unshift("请填写查找时间")
            //alert("请填写查找时间");
          }
          //将查询参数传到数据库
          console.log(this.param)
          this.$store.state.countrlHistory.param = this.param;
          //出发action发送axios请求,人名搜索页
          this.$store.dispatch("historyInfo", this.param);
          //起始当前页码变为1
          bus.$emit("one");
          break;
        case "dealHistory":
          if (this.value2.length) {
            this.param = {
              personOrCarCode: this.value4,
              beginTime: beginTime,
              endTime: endTime,
              limit: 20,
              page: 1,
              faceTypeCode: this.value,
              clStatus: 1
            };
          } else {
            this.$store.state.home.err.unshift("请填写查找时间")
            //alert("请填写查找时间");
          }
          //将查询参数传到数据库
          this.$store.state.dealHistory.param = this.param;
          //出发action发送axios请求,人名搜索页
          this.$store.dispatch("dealhistoryInfo", this.param);  
          break;
        default:
          console.log("xixixixi");
      }
    }
  },
  mounted() {
    bus.$on("base64", this.pic);
  }
};
</script>
<style lang="scss" scoped>
.searchbox {
  width: 98%;
  margin: 0 1% 0.1rem 1%;
  height: 1.3rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  overflow: hidden;
}
.title {
  color: #93bce8;
  margin: 0.15rem 0 0 0.2rem;
  font-size: 0.2rem;
}
.searchInput {
  margin: 0.2rem 0 0 0.3rem;
  .nature {
    color: #fff;
    font-size: 0.18rem;
  }
  .name {
    display: inline-block;
    width: 1.8rem;
    height: 0.4rem;
    background: #151c40;
    margin-right: 0.2rem;
    color: #fff;
  }
}
p {
  display: inline-block;
  margin-left: 0.2rem;
  span {
    margin-right: 0.1rem;
  }
}
.ifDeal {
  margin-left: 0.1rem;
}
</style>
