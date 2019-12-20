<template>
  <div class="relationPic">
    <div class="back" @click="back">返回</div>
    <div id="relationPic" :style="style"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import { mapState } from "vuex";
export default {
  data() {
    return {
      style: {
        transform: "scale(0) rotate(0deg)"
      },
      info: null,
      data: {},
      nodeArr:null
    };
  },
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
  methods: {
    back() {
      this.$store.state.attentionPeople.detailsIsshow = false;
    },
    canvas(){
      // 创建 G6 图实例
    const graph = new G6.TreeGraph({
      container: "relationPic", // 指定图画布的容器 id，与第 9 行的容器对应
      // 画布宽高
      width: 1264,
      height: 687,
      //fitView: true,
      fitViewPadding: [20, 50, 20, 50],
      defaultNode: {
        shape: "image",
        size: [90, 110]
        // 其他配置
      },
      layout: {
        type: "dendrogram",
        direction: "LR",
        nodeSep: 20,
        rankSep: 300,
        radial: true
      }
    });
    // 读取数据
    graph.data(this.nodeArr);
    let i = 0;
    var _this = this
    graph.edge(function() {
      i++;
      //console.log(_this.info.friend[i-1])
      return {
        shape: "cubic-horizontal",
        //color: "#ffffff",
        label:_this.info.friend[i-1].relation,
        style: {
          stroke: "steelblue",
          lineWidth: 3
        },
        labelCfg: {
          position: "center",
          refY: 10,
          autoRotate: true,
          style: {
            fill: "#fff",
            fontSize: 20
          }
        }
      };
    });
    // 渲染图
    graph.render();
    graph.fitView();
    }
  },
  created() {
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/" +
        this.personId +
        "/relation",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      if (res.data.code == 1000) {
        this.info = res.data.data;
        console.log(this.info);
        //将数据处理成数据源的格式
        var nodeArr = {
          id: "node1",
          img: "../../../../static/bgImage/11.png",
          shape: "image",
          size: [90, 110],
          label: "cao",
          labelCfg: {
            //position: "bottom",
            style: {
              fontSize: 18,
              fill: "#fff"
            }
          },
          // 裁剪图片配置
          clipCfg: {
            show: false,
            type: "circle",
            r: 15
          },
          children: []
        };
        nodeArr.img = this.info.faceImage;
        nodeArr.label = this.info.personName;
        this.info.friend.forEach((item,index)=>{
          nodeArr.children.push({
          id: "node"+index+2,
          img: item.faceImage,
          shape: "image",
          size: [90, 110],
          label: item.personName,
          labelCfg: {
            //position: "bottom",
            style: {
              fontSize: 18,
              fill: "#fff"
            }
          },
          // 裁剪图片配置
          clipCfg: {
            show: false,
            type: "circle",
            r: 15
          }
        });
        })
        this.nodeArr = nodeArr;
        this.$nextTick(()=>{
          this.canvas()
        })
      }
    });
  },
  mounted() {
    var _this = this;
    var scale1 = 0;
    var rotate1 = 0;
    var timer = setInterval(function() {
      scale1 += 1;
      rotate1 += 36;
      _this.style.transform =
        "scale(" + scale1 / 10 + ") rotate(" + rotate1 + "deg)";
      if (rotate1 == 360) {
        clearInterval(timer);
      }
    }, 100);
    // 定义数据源
    /* const data = {
      children: [
        {
          id: "node2",
          img: "../../../../static/bgImage/11.png",
          shape: "image",
          size: [90, 110],
          label: "cao",
          labelCfg: {
            //position: "bottom",
            style: {
              fontSize: 18,
              fill: "#fff"
            }
          },
          // 裁剪图片配置
          clipCfg: {
            show: false,
            type: "circle",
            r: 15
          }
        },
        {
          id: "node3",
          img: "../../../../static/bgImage/11.png",
          shape: "image",
          size: [90, 110],
          label: "cao",
          labelCfg: {
            //position: "bottom",
            style: {
              fontSize: 18,
              fill: "#fff"
            }
          },
          // 裁剪图片配置
          clipCfg: {
            show: false,
            type: "circle",
            r: 15
          }
        },
      ],
      id: "node1",
      img: "../../../../static/bgImage/11.png",
      shape: "image",
      size: [90, 110],
      labelCfg: {
        position: "bottom"
      },
      // 裁剪图片配置
      clipCfg: {
        show: false,
        type: "circle",
        r: 15
      }
    }; */
  }
};
</script>

<style lang="scss" scoped>
.relationPic {
  width: 1264px;
  height: 687px;
  //background: red;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
  position: relative;
}
.back {
  width: 110px;
  height: 36px;
  line-height: 36px;
  background: #4b57b6;
  border-radius: 3px;
  text-align: center;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 100000;
  color: #fff;
  font-size: 16px;
}
</style>