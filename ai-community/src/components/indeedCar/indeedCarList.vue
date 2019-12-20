<template>
  <div class="peoplePerception">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>高频车辆出入统计</span>
    </div>
    <div class="selected2 clear">
      <div class="selectedBox">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <ul class="type1">
        <p class="selectedType">业主车辆</p>
        <p>租户车辆</p>
        <p>陌生车辆</p>
      </ul>
    </div>
    <div class="table2">
      <div class="showBox">
        <li v-for="item in show" :key="item.index">
          <span>{{item.senseNum}}</span>
          <img :src="item.lastCaptureImage" alt />
          <div class="infoBox">
            <p>车主：{{item.ownerName}}</p>
            <p>所在小区：{{item.xqName}}</p>
            <p>车牌号：{{item.carNum}}</p>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      selectedValue: state => state.homePage.selectedValue
    }),
    ...mapState({
      url: state => state.homePage.url
    })
  },
  watch: {
    value() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/car/sense",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.selectedValue,
          subdistrictId: "",
          timeType: this.value
        }
      }).then(res => {
        if (res.data.code == 1000) {
          var data = res.data.data;
          this.ownerCar = data.ownerCar;
          this.strangCar = data.strangCar;
          this.tenementCar = data.tenementCar;
          var _this = this
          switch ($(".type1 .selectedType").text()) {
            case "业主车辆":
              _this.show = _this.ownerCar;
              break;
            case "租户车辆":
              _this.show = _this.tenementCar;
              break;
            case "陌生车辆":
              _this.show = _this.strangCar;
              break;
          }
        }
      });
    }
  },
  created() {
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/car/sense",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId: "",
        timeType: this.value
      }
    }).then(res => {
      if (res.data.code == 1000) {
        //console.log(res);
        var data = res.data.data;
        this.ownerCar = data.ownerCar;
        this.strangCar = data.strangCar;
        this.tenementCar = data.tenementCar;
        this.show = this.ownerCar;
      }
    });
  },
  data() {
    return {
      options: [
        {
          value: "day",
          label: "本日"
        },
        {
          value: "month",
          label: "本月"
        }
      ],
      value: "day",
      ownerCar: [],
      strangCar: [],
      tenementCar: [],
      show: []
    };
  },
  mounted() {
    var _this = this;
    $(".type1 p").click(function() {
      $(".type1 p").removeClass("selectedType");
      $(this).addClass("selectedType");
      //console.log($(this).text())
      switch ($(this).text()) {
        case "业主车辆":
          _this.show = _this.ownerCar;
          break;
        case "租户车辆":
          _this.show = _this.tenementCar;
          break;
        case "陌生车辆":
          _this.show = _this.strangCar;
          break;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.peoplePerception {
  width: 1898px;
  height: 482px;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
.rightLogo {
  width: 123px;
  height: 14px;
  background: url(../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}
.peoplePerception {
  .title {
    margin-top: 13px;
    margin-left: 10px;
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
.selected2 {
  margin: 0px auto;
  width: 500px;
}
.selected2 ul {
  width: 348px;
  height: 32px;
  background: #4b57b6;
  border-radius: 4px;
  float: left;
  overflow: hidden;
  p {
    width: 116px;
    float: left;
    height: 100%;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }
}
.selectedBox {
  float: left;
  margin-right: 15px;
}
.selectedType {
  background: #4896f7;
}
.table2 {
  width: 1868px;
  height: 430px;
  margin: 5px auto;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.showBox {
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.showBox li {
  width: 456px;
  height: 122px;
  background: #282a3f;
  background-image: url(../../../static/bgImage/triangle.png);
  background-position: top right;
  background-repeat: no-repeat;
  margin: 10px 0 0 10px;
  float: left;
  position: relative;
  span{
    position: absolute;
    right: 5px;
    top: 5px;
  }
  img {
    width: 90px;
    height: 110px;
    float: left;
    margin: 5px 0 0 10px;
  }
  .infoBox {
    float: left;
    margin-left: 30px;
    p {
      margin-top: 18px;
    }
  }
}
</style>