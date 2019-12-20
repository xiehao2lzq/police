<template>
  <div class="tadayData">
    <div class="title">
      <img src="@static/image/pointLeft.png" alt />
      <span>今日数据统计</span>
      <img src="@static/image/pointRight.png" alt />
    </div>
    <div class="info">
      <li>
        <p>人员出入</p>
        <p class="green-text">{{info.todayPersonSenseNum || 0}}</p>
      </li>
      <li>
        <p>车辆出入</p>
        <p class="purple-text">{{info.todayCarSenseNum || 0}}</p>
      </li>
      <li>
        <p>异常报警</p>
        <p class="green-text">{{info.abnormalTotalNum || 0}}</p>
      </li>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      url: state => state.commonData.url
    }),
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    })
  },
  data() {
    return {
      info:{}
    };
  },
  created () {
       this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/subdistrict/statistics/today",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          subdistrictId: "",
          xqCode: this.selectedValue
        }
      }).then(res=>{
        if(res.data.code==1000){
          this.info = res.data.data
        }
      })
  }
};
</script>

<style lang="scss" scoped>
.tadayData {
  width: 100%;
  height: 130px;
  overflow: hidden;
  margin-top: 7px;
}
.title {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  font-size: 16px;
  img {
    display: inline-block;
  }
  text-align: center;
}
.info {
  width: 100%;
  li {
    margin-top: 10px;
    width: 33.3%;
    float: left;
    text-align: center;
  }
  p:first-child {
    margin-top: 10px;
  }
  p:last-child {
    font-size: 18px;
    margin-top: 10px;
  }
}
</style>