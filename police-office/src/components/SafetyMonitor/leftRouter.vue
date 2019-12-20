<template>
  <div class="leftTabBox">
    <div class="title clear">
      <p></p>
      <span>安全布控</span>
    </div>
    <ul class="clear">
      <li
        v-for="(item,index) in tabArr"
        :key="index"
        @click="select(index,item.name)"
        :class="{selectedType:item.isSelected}"
      >
        <img :src="item.src" alt />
        <span>{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabArr: [
        {
          src:require("@static/image/SafetyMonitor1.png"),
          text: "人员布控",
          isSelected: false,
          name:"person"
        },
        {
          src: require("@static/image/SafetyMonitor2.png"),
          text: "车辆布控",
          isSelected: false,
          name:"car"
        },
        {
          src:require("@static/image/SafetyMonitor3.png"),
          text: "布控库",
          isSelected: false,
          name:"bank"
        },
        {
          src: require("@static/image/SafetyMonitor4.png"),
          text: "智慧预警",
          isSelected: false,
          name:"policeRoom"
        }
      ]
    };
  },
  created () {
    var name = this.$route.name;
    switch (name) {
      case "person":
        this.tabArr[0].isSelected = true
        break;
       case "car":
        this.tabArr[1].isSelected = true
        break;
        case "bank":
        this.tabArr[2].isSelected = true
        break;
         case "policeRoom":
        this.tabArr[3].isSelected = true
        break;
      default:
        break;
    }
  },
  methods: {
    select(val,name) {
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;
      this.$router.push({name:name})
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>