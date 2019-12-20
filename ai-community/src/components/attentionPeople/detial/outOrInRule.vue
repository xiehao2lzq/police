<template>
  <div class="outOrInRule">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>出入规律</span>
    </div>
    <div class="title4 clear">
      <p class="clear">
        <span class="selectedType">近7日</span>
        <span>近30日</span>
      </p>
    </div>
    <div id="outOrInRule"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      personId: state => state.attentionPeople.personId
    }),
    ...mapState({
      selectedValue: state => state.homePage.selectedValue
    }),
    ...mapState({
      url: state => state.homePage.url
    })
  },
  created () {
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/stream/rule",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId:"",
        personId:this.personId
      }
    }).then(res=>{
      console.log(res)
    })
  },
  mounted() {
    var _G = G2,
    Global = _G.Global;

  var colorMap = {
    'Asia': Global.colors[0],
    'Americas': Global.colors[1],
    'Europe': Global.colors[2],
    'Oceania': Global.colors[3]
  };
  $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json', function(data) {
    var chart3 = new G2.Chart({
      container: 'outOrInRule',
      forceFit: true,
      height: 230,
      padding:[30,20,20,30],
      plotBackground: {
         fill: "#2B2F43" // 图表背景色
      }
    });
    chart3.source(data);
    // 为各个字段设置别名
    chart3.scale({
      LifeExpectancy: {
        alias: '人均寿命（年）'
      },
      Population: {
        type: 'pow',
        alias: '人口总数'
      },
      GDP: {
        alias: '人均国内生产总值($)'
      },
      Country: {
        alias: '国家/地区'
      }
    });
    
    chart3.axis('GDP', {
      label: {
        formatter: function formatter(value) {
          return (value / 1000).toFixed(0) + 'k';
        }, // 格式化坐标轴的显示
        textStyle: {
          fill: "#939FBD",
          fontSize: 12
        },
      }
    });
    chart3.axis('LifeExpectancy', {
      label: {
        textStyle: {
          fill: "#939FBD",
          fontSize: 12
        }
      },
       grid: {
        lineStyle: {
          stroke: "#37477f",
          lineWidth: 1,
          lineDash: [2, 2]
        }
      }
    });
    chart3.tooltip({
      showTitle: false // 不显示默认标题
    });
    chart3.legend('Population', false); // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
    chart3.legend({
      position: "top-right",
      marker: "circle",
      textStyle: {
        fill: "#939FBD"
      }
    });
    chart3.point().position('GDP*LifeExpectancy').size('Population', [5, 15]).color('continent', function(val) {
      return colorMap[val];
    }).shape('circle').tooltip('Country*Population*GDP*LifeExpectancy').style('continent', {
      lineWidth: 1,
      strokeOpacity: 1,
      fillOpacity: 0.3,
      opacity: 0.65,
      stroke: function stroke(val) {
        return colorMap[val];
      }
    });
    chart3.render();
  });
    var _this = this;
    $(".title4 span").click(function() {
      $(".title4 span").removeClass("selectedType");
      $(this).addClass("selectedType");
      //console.log($(this).text())
    });
  }
};
</script>

<style lang="scss" scoped>
.outOrInRule {
  width: 1264px;
  height: 288px;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  //margin-top: 10px;
  overflow: hidden;
  float: left;
}
.rightLogo {
  width: 123px;
  height: 14px;
  background: url(../../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}
.outOrInRule {
 position: relative;
   .title4 {
    margin:13px auto 0;
    width: 232px;
    p {
      background: #4b57b6;
      overflow: hidden;
      border-radius: 4px;
      width: 232px;
    }
    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
      width: 116px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
    }
  }
  .title {
    position: absolute;
    top: 13px;
    left: 10px;
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
ul {
  width: 100%;
  margin-top: 48px;
  li:nth-child(odd) {
    width: 444px;
    height: 68px;
    background: rgba(40, 42, 63, 1);
    margin: 27px auto 0;
    line-height: 68px;
    font-size: 24px;
    img {
      float: left;
      margin-top: 10px;
      margin-left: 12px;
    }
    p {
      float: left;
      margin-left: 20px;
      background: linear-gradient(
        0deg,
        rgba(35, 197, 235, 1) 0%,
        rgba(35, 230, 189, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
    span {
      float: right;
      margin-right: 20px;
      background: linear-gradient(
        0deg,
        rgba(35, 197, 235, 1) 0%,
        rgba(35, 230, 189, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  li:nth-child(even) {
    width: 444px;
    height: 68px;
    background: rgba(40, 42, 63, 1);
    margin: 27px auto 0;
    line-height: 68px;
    font-size: 24px;
    img {
      float: left;
      margin-top: 10px;
      margin-left: 12px;
    }
    p {
      float: left;
      margin-left: 20px;
      background: linear-gradient(
        180deg,
        rgba(62, 173, 250, 1) 0.4150390625%,
        rgba(6, 104, 225, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
    span {
      float: right;
      margin-right: 20px;
      background: linear-gradient(
        180deg,
        rgba(62, 173, 250, 1) 0.4150390625%,
        rgba(6, 104, 225, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
.selectedType {
  background: #4896f7;
}
</style>