<template>
  <div class="personInOrout">
    <div class="title">
      <img src="../../../static/bgImage/pointLeft.png" alt />
      <span>人员出入统计</span>
      <img src="../../../static/bgImage/pointRight.png" alt />
    </div>
    <div id="personInOrout"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { View } from "@antv/data-set";
export default {
  mounted() {
    var data = [
      {
        year: "1986",
        ACME: 162,
        Compitor: 42
      },
      {
        year: "1987",
        ACME: 134,
        Compitor: 54
      },
      {
        year: "1988",
        ACME: 116,
        Compitor: 26
      },
      {
        year: "1989",
        ACME: 122,
        Compitor: 32
      },
      {
        year: "1990",
        ACME: 178,
        Compitor: 68
      },
      {
        year: "1991",
        ACME: 144,
        Compitor: 54
      },
      {
        year: "1992",
        ACME: 125,
        Compitor: 35
      },
      {
        year: "1993",
        ACME: 176,
        Compitor: 66
      },
      {
        year: "1994",
        ACME: 156
      },
      {
        year: "1995",
        ACME: 195
      },
      {
        year: "1996",
        ACME: 215
      },
      {
        year: "1997",
        ACME: 176,
        Compitor: 36
      },
      {
        year: "1998",
        ACME: 167,
        Compitor: 47
      },
      {
        year: "1999",
        ACME: 142
      },
      {
        year: "2000",
        ACME: 117
      },
      {
        year: "2001",
        ACME: 113,
        Compitor: 23
      },
      {
        year: "2002",
        ACME: 132
      },
      {
        year: "2003",
        ACME: 146,
        Compitor: 46
      },
      {
        year: "2004",
        ACME: 169,
        Compitor: 59
      },
      {
        year: "2005",
        ACME: 184,
        Compitor: 44
      }
    ];
    var dv = new View().source(data);
    dv.transform({
      type: "fold",
      fields: ["ACME", "Compitor"],
      key: "type",
      value: "value"
    });
    var chart = new G2.Chart({
      container: "personInOrout",
      forceFit: true,
      height: 190,
      padding: [20, 20, 40, 50],
      plotBackground: {
        fill: "#2B2F43" // 图表背景色
      }
    });
    chart.source(dv, {
      value: {
        alias: "The Share Price in Dollars",
        formatter: function formatter(val) {
          return "$" + val;
        }
      },
      year: {
        range: [0, 1]
        /* tickCount: 12, */
      }
    });
    chart.tooltip({
      crosshairs: true
    });
    chart.axis("year", {
      label: {
        textStyle: {
          fill: "#939FBD",
          fontSize: 12
        },
        formatter: (text, info, index) => {
          if (index % 2 === 0) {
            return text;
          }
        }
      }
    });
    chart.axis("value", {
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
    chart.legend({
      position: "top-right",
      marker: "circle",
      textStyle: {
        fill: "#939FBD"
      }
    });
    chart
      .area()
      .position("year*value")
      .color("type", ["l(90) 0:#22dcbe 1:#2B2F43", "l(90) 0:#ff6166 1:#2B2F43"])
      .shape("smooth");
    chart
      .line()
      .position("year*value")
      .color("type", ["l(0) 0:#37e4fe 1:#20dbb6", "l(0) 0:#ff977f 1:#ff515e"])
      .size(2)
      .shape("smooth")
      .tooltip(false);
    chart.render();
  }
};
</script>

<style lang="scss" scoped>
.personInOrout {
  width: 532px;
  height: 232px;
  background: url(../../../static/bgImage/right2.png);
  overflow: hidden;
  margin-top: 2px;
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
</style>