<template>
  <div class="tianqi">
    <div class="conbox conbox01">
      <div class="boxt01">>>天气预报</div>
      <div class="clear"></div>
      <div class="boxt03">青岛近期天气预报</div>
      <div class="clear"></div>
      <div class="tianqipic">
        <img src="../../../assets/images/tianqiIco.png" />
        <p>{{tqInfo.wendu}}℃</p>
      </div>
      <div class="datebox">
        <p>
          <span>{{tqInfo.dateY}}</span>
        </p>
        <p>
          <span>{{tqInfo.dateN}}</span>
        </p>
      </div>
      <div class="fylzbox">
        <p>
          PM
          <br />2.5
        </p>
      </div>
      <div class="fylznum">{{tqInfo.pm25}}</div>
      <div class="tianqimsg">
        <p>
          <i></i>湿度：
          <span>{{tqInfo.shidu}}RH</span>
        </p>
        <p>
          <i></i>风力：
          <span>{{tqInfo.fl}}</span> 风向：
          <span>{{tqInfo.fx}}</span>
        </p>
        <p>
          <i></i>空气质量：
          <span>{{tqInfo.quality}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tqInfo: {},
      weather:{},
      cityCode:""
    };
  },
  methods: {
    //获取农历日期
    getDateNL() {
      var CalendarData = new Array(100);
      var madd = new Array(12);
      var tgString = "甲乙丙丁戊己庚辛壬癸";
      var dzString = "子丑寅卯辰巳午未申酉戌亥";
      var numString = "一二三四五六七八九十";
      var monString = "正二三四五六七八九十冬腊";
      var weekString = "日一二三四五六";
      var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
      var cYear, cMonth, cDay, TheDate;
      CalendarData = new Array(
        0xa4b,
        0x5164b,
        0x6a5,
        0x6d4,
        0x415b5,
        0x2b6,
        0x957,
        0x2092f,
        0x497,
        0x60c96,
        0xd4a,
        0xea5,
        0x50da9,
        0x5ad,
        0x2b6,
        0x3126e,
        0x92e,
        0x7192d,
        0xc95,
        0xd4a,
        0x61b4a,
        0xb55,
        0x56a,
        0x4155b,
        0x25d,
        0x92d,
        0x2192b,
        0xa95,
        0x71695,
        0x6ca,
        0xb55,
        0x50ab5,
        0x4da,
        0xa5b,
        0x30a57,
        0x52b,
        0x8152a,
        0xe95,
        0x6aa,
        0x615aa,
        0xab5,
        0x4b6,
        0x414ae,
        0xa57,
        0x526,
        0x31d26,
        0xd95,
        0x70b55,
        0x56a,
        0x96d,
        0x5095d,
        0x4ad,
        0xa4d,
        0x41a4d,
        0xd25,
        0x81aa5,
        0xb54,
        0xb6a,
        0x612da,
        0x95b,
        0x49b,
        0x41497,
        0xa4b,
        0xa164b,
        0x6a5,
        0x6d4,
        0x615b4,
        0xab6,
        0x957,
        0x5092f,
        0x497,
        0x64b,
        0x30d4a,
        0xea5,
        0x80d65,
        0x5ac,
        0xab6,
        0x5126d,
        0x92e,
        0xc96,
        0x41a95,
        0xd4a,
        0xda5,
        0x20b55,
        0x56a,
        0x7155b,
        0x25d,
        0x92d,
        0x5192b,
        0xa95,
        0xb4a,
        0x416aa,
        0xad5,
        0x90ab5,
        0x4ba,
        0xa5b,
        0x60a57,
        0x52b,
        0xa93,
        0x40e95
      );
      madd[0] = 0;
      madd[1] = 31;
      madd[2] = 59;
      madd[3] = 90;
      madd[4] = 120;
      madd[5] = 151;
      madd[6] = 181;
      madd[7] = 212;
      madd[8] = 243;
      madd[9] = 273;
      madd[10] = 304;
      madd[11] = 334;

      function GetBit(m, n) {
        return (m >> n) & 1;
      }
      function e2c() {
        TheDate =
          arguments.length != 3
            ? new Date()
            : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getYear();
        if (tmp < 1900) {
          tmp += 1900;
        }
        total =
          (tmp - 1921) * 365 +
          Math.floor((tmp - 1921) / 4) +
          madd[TheDate.getMonth()] +
          TheDate.getDate() -
          38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
          total++;
        }
        for (m = 0; ; m++) {
          k = CalendarData[m] < 0xfff ? 11 : 12;
          for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
              isEnd = true;
              break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
          }
          if (isEnd) break;
        }
        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;
        if (k == 12) {
          if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
          }
          if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
          }
        }
      }
      function GetcDateString() {
        var tmp = "";
        tmp += tgString.charAt((cYear - 4) % 10);
        tmp += dzString.charAt((cYear - 4) % 12);
        tmp += "(";
        tmp += sx.charAt((cYear - 4) % 12);
        tmp += ")年 ";
        if (cMonth < 1) {
          tmp += "(闰)";
          tmp += monString.charAt(-cMonth - 1);
        } else {
          tmp += monString.charAt(cMonth - 1);
        }
        tmp += "月";
        tmp += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
        if (cDay % 10 != 0 || cDay == 10) {
          tmp += numString.charAt((cDay - 1) % 10);
        }
        return tmp;
      }

      function GetLunarDay(solarYear, solarMonth, solarDay) {
        //solarYear = solarYear<1900?(1900+solarYear):solarYear;
        if (solarYear < 1921 || solarYear > 2020) {
          return "";
        } else {
          solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
          e2c(solarYear, solarMonth, solarDay);
          return GetcDateString();
        }
      }
      var D = new Date();
      var yy = D.getFullYear();
      var mm = D.getMonth() + 1;
      var dd = D.getDate();
      var ww = D.getDay();
      var ss = parseInt(D.getTime() / 1000);
      if (yy < 100) yy = "19" + yy;
      return GetLunarDay(yy, mm, dd);
    },
    getTqInfo() {
      this.$axios
        .get("dl/api/weather/city/"+this.cityCode) //配置反向代理跨域
        .then(res => {
          this.tqInfo.wendu = res.data.data.wendu; //温度
          this.tqInfo.pm25 = res.data.data.pm25; //pm2.5
          this.tqInfo.dateY = res.data.data.forecast[0].ymd; //阳历日期
          this.tqInfo.dateN = this.getDateNL(); //农历日期
          this.tqInfo.fl = res.data.data.forecast[0].fl; //风力
          this.tqInfo.fx = res.data.data.forecast[0].fx; //风向
          this.tqInfo.shidu = res.data.data.shidu; //湿度
          this.tqInfo.quality = res.data.data.quality; //空气质量
          this.$forceUpdate();
          // console.log(res.data)
        });
    }
  },
  created() {
    //this.getTqInfo();
    this.$axios
      .get("../../../../static/weather.json") //配置反向代理跨域
      .then(res => {
        this.weather = res.data;
        console.log(this.weather)
      });
    var _this = this
      //jsonp跨域请求
    function showImg() {
      $.ajax({
        url:"https://restapi.amap.com/v3/ip?key=486e8b45856d977f4c58949ca6201618",
        type: "get",
        data: { f: "f" },
        dataType: "jsonp",
        //jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        //jsonpCallback: "showData", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以不写这个参数，jQuery会自动为你处理数据
        success: function(data) {
          
          var province = data.province.substr(0,2)
          var city = data.city.substr(0,2)
          console.log(province,city);
          for(var i =0;i<_this.weather.城市代码.length;i++){
              if(province==_this.weather.城市代码[i].省){
                  for(var j=0;j<_this.weather.城市代码[i].市.length;j++){
                      //console.log(province==_this.weather.城市代码[i].省)
                      if(city==_this.weather.城市代码[i].市[j].市名){
                          _this.cityCode = _this.weather.城市代码[i].市[j].编码
                          _this.getTqInfo()
                      }
                  }
              }
          }
        
        },
        /* error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("服务器异常");
          alert(XMLHttpRequest.status);
          alert(XMLHttpRequest.readyState);
          alert(XMLHttpRequest.responseText);
          alert(textStatus);
          alert(errorThrown);
          console.log(textStatus);
        } */
      });
    }
    showImg();
  }
};
</script>
<style lang="scss" scoped>
.tianqi {
  width: 4.75rem;
  height: 2rem;
  background-color: #101737;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  margin: 0.1rem 0 0 0.1rem;
  background: url(../../../assets/images/conboxLT.png) no-repeat left top,
    url(../../../assets/images/conboxRT.png) no-repeat right top,
    url(../../../assets/images/conboxLB.png) no-repeat left bottom,
    url(../../../assets/images/conboxRB.png) no-repeat right bottom;
  overflow: hidden;
  position: relative;
}
.boxt01 {
  font-size: 0.18rem;
  margin: 0.1rem 0 0 0.2rem;
  color: #68abef;
}
.boxt03 {
  font-size: 0.16rem;
  margin: 0.05rem 0 0 0.2rem;
  color: #93bce8;
}
.fylzbox {
  p {
    margin-left: 0.05rem;
  }
  position: absolute;
  width: 0.68rem;
  height: 0.68rem;
  background: #1da06c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.18rem;
  color: #fff;
  font-weight: 900;
  bottom: 0.3rem;
  left: 0.48rem;
}
.fylznum {
  position: absolute;
  width: 0.68rem;
  height: 0.68rem;
  border: 0.02rem solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.18rem;
  color: #fff;
  font-weight: 900;
  bottom: 0.3rem;
  left: 1.06rem;
}
.tianqipic {
  position: absolute;
  top: 0.15rem;
  left: 2.3rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #fff;
  text-align: center;
  img {
    margin-bottom: 0.1rem;
  }
}
.datebox {
  position: absolute;
  top: 0.2rem;
  right: 0.34rem;
  width: 1.15rem;
  p {
    width: 1.35rem;
    font-size: 0.14rem;
    font-weight: 900;
    color: #fff;
    line-height: 0.3rem;
    span {
      float: right;
    }
  }
}
.tianqimsg {
  position: absolute;
  bottom: 0.3rem;
  left: 2.33rem;
  i {
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 50%;
    background: #287cd2;
    display: block;
    float: left;
    margin: 0.05rem 0.1rem 0 0;
  }
  p {
    font-size: 0.16rem;
    font-weight: 900;
    color: #93bce8;
    span {
      color: #fff;
    }
  }
}
</style>
