<template>
  <div class="carList boxColor">
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
        <li v-for="item in list" :key="item.index">
          <span>{{item.senseNum}}</span>
          <img :src="item.lastCaptureImage || src2" alt />
          <div class="infoBox">
            <p>车主：{{item.ownerName}}</p>
            <p>所在小区：{{item.xqName}}</p>
            <p>车牌号：{{item.carNum}}</p>
            <p>最后抓拍时间：{{item.lastCaptureTime}}</p>
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
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
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
          /* var data = res.data.data;
          this.ownerCar = data.ownerCar;
          this.strangCar = data.strangCar;
          this.tenementCar = data.tenementCar;
          var _this = this;
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
          } */
        }
      });
    }
  },
  created() {
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/car/highSense",
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
      // console.log(res);
      if (res.data.code == 1000) {
        this.list = res.data.data.list.slice(0, 3);
        /*  var data = res.data.data;
        this.ownerCar = data.ownerCar;
        this.strangCar = data.strangCar;
        this.tenementCar = data.tenementCar;
        this.show = this.ownerCar;
        this.all = [...this.ownerCar, ...this.strangCar, ...this.tenementCar];
        this.all.sort(function(a, b) {
          return b.senseNum-a.senseNum;
        });
        this.all = this.all.slice(0,3) */
      }
    });
  },
  data() {
    return {
      src:require("@static/image/person.png"),
      src2:require("@static/image/carNoImage.png"),
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
      value: "",
      list: []
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
.carList {
  width: 516px;
  height: 482px;
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
.carList {
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
      color: #333333;
    }
  }
}
.selected2 {
  /* 隐藏此节点 */
  margin: 0px auto;
  width: 500px;
  display: none;
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
  width: 100%;
  height: 450px;
  margin: 5px auto;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.showBox {
  width: 100%;
  height: 435px;
  overflow: hidden;
  margin-top: 15px;
}
.showBox li {
  width: 456px;
  height: 122px;
  background: rgba(224, 237, 249, 1);
  background-image: url(../../../../../static/image/triangle.png);
  background-position: top right;
  background-repeat: no-repeat;
  margin: 10px auto;
  position: relative;
  color: #333333;
  border-radius: 5px;
  span {
    position: absolute;
    right: 5px;
    top: 5px;
     color: #ffffff;
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
      margin-top: 8px;
    }
  }
}
</style>