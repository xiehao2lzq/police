<template>
  <div>
    <div class="bgImage">
      <div class="case1">
        <router-link tag="li" to="/indeedHouse">
          <p class="white-text little">实有房产</p>
          <p class="green-text big">10</p>
        </router-link>
        <router-link tag="li" to="/indeedPeopleNum">
          <p class="white-text little">实有人口</p>
          <p class="purple-text big">3251132</p>
        </router-link>
        <router-link tag="li" to="/indeedCar">
          <p class="white-text little">实有车辆</p>
          <p class="green-text big">32132</p>
        </router-link>
        <router-link tag="li" to="/indeedDevice">
          <p class="white-text little">设备统计</p>
          <p class="purple-text big">6789</p>
        </router-link>
        <router-link tag="li" to="/attentionPeople">
          <p class="white-text little">关注人员</p>
          <p class="green-text big">3498</p>
        </router-link>
      </div>
      <img class="logo" @click="backHome" src="../../../static/bgImage/logo.png" alt />
      <div class="select case2">
        <p class="p1"></p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in selectedArr"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="time case3">
        <span>{{nowTime1}}</span>
        <span>{{nowTime2}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      nowTime1: "",
      nowTime2: ""
    };
  },
  computed: {
    ...mapState({
      selectedArr: state => state.homePage.selectedArr
    }),
    ...mapState({
      url: state => state.homePage.url
    })
  },
  watch: {
    value() {
      this.$store.state.homePage.selectedValue = this.value;
    }
  },
  created () {
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/subdistrict/statistics",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        subdistrictId: "",
        xqCode: this.selectedValue
      }
    }).then(res=>{
      console.log(res)
    })
  },
  methods: {
    ...mapActions(["gainXqList"]),
    nowTime() {
      var _this = this;
      setInterval(function() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth() + 1 + ""; //得到月份
        month = month.length == 1 ? "0" + month : month;
        var date = now.getDate() + ""; //得到日期
        date = date.length == 1 ? "0" + date : date;
        var hour = now.getHours() + ""; //得到小时
        hour = hour.length == 1 ? "0" + hour : hour;
        var minu = now.getMinutes() + ""; //得到分钟
        minu = minu.length == 1 ? "0" + minu : minu;
        var sec = now.getSeconds() + ""; //得到秒
        sec = sec.length == 1 ? "0" + sec : sec;
        _this.nowTime1 = year + "年" + month + "月" + date + "日";
        _this.nowTime2 = hour + ":" + minu + ":" + sec;
      }, 1000);
    },
    backHome() {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    //右上角时间
    this.nowTime();
    //console.log(sessionStorage.getItem("Authorization"));
    //获取小区街道列表
    this.gainXqList();
  }
};
</script>

<style lang="scss" scoped>
.bgImage {
  background: url(../../../static/bgImage/headerBg.png);
  height: 84px;
  width: 1920px;
  position: relative;
}
.case1 {
  background: url(../../../static/bgImage/case1.png);
  height: 56px;
  width: 565px;
  margin-left: 93px;
  margin-top: 6px;
}
.case1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  float: left;
  li {
    cursor: pointer;
  }
}
.little {
  font-size: 14px;
  padding: 2px 0;
}
.big {
  font-size: 18px;
}
.logo {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 15px auto 10px;
  cursor: pointer;
}
.case2 {
  background: url(../../../static/bgImage/case2.png);
  width: 315px;
  height: 56px;
  padding-left: 15px;
  padding-top: 11px;
  float: left;
  margin-left: 610px;
  margin-top: 6px;
  text-align: center;
  /* .p1 {
    margin: 10px 6px;
  } */
}
.case3 {
  background: url(../../../static/bgImage/case2.png);
  width: 315px;
  height: 56px;
  float: left;
  margin-left: 10px;
  margin-top: 6px;
  font-size: 18px;
  text-align: center;
  line-height: 56px;
  span:first-child {
    padding-left: 25px;
  }
  span:list-child {
    padding-left: 15px;
  }
}
</style>