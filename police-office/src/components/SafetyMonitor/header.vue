<template>
  <div class="header">
    <img class="logo" src="@static/image/logo.png" @click="back" alt />
    <ul class="rightButton clear">
      <!-- <li>
        <div :class="{person:true,nowShow:nowShow}" @click="switchPage">人员感知</div>
        <div :class="{car:true,nowShow:!nowShow}" @click="switchPage2">车辆感知</div>
      </li> -->
      <div class="back" @click="backGo">返回</div>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      isShow: true
    };
  },
  computed: {
   /*  ...mapState({
      nowShow: state => state.dataTreating.nowShow
    }) */
  },
  created() {
  
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    backGo() {
      this.$router.push("/"); //返回上一层
    },
    /* switchPage() {
      this.$store.state.dataTreating.nowShow = true;
    },
    switchPage2() {
      this.$store.state.dataTreating.nowShow = false;
    } */
  }
};
</script>

<style  lang="scss" scoped>
.header {
  background: url(../../../static/image/headerBg.png);
  height: 100px;
  width: 1920px;
  position: relative;
  overflow: hidden;
}
.logo {
  margin-top: 25px;
  margin-left: 30px;
  float: left;
  cursor: pointer;
}
.rightButton {
  float: right;
  overflow: hidden;
  li {
    float: left;
  }
  div {
    float: left;
    font-size: 16px;
    margin-top: 25px;
    margin-right: 30px;
    cursor: pointer;
  }
}
.person {
  width: 201px;
  height: 52px;
  background: url(../../../static/image/border.png);
  line-height: 52px;
  text-align: center;
}
.car {
  width: 201px;
  height: 52px;
  background: url(../../../static/image/border.png);
  line-height: 52px;
  text-align: center;
}
.back {
  width: 131px;
  height: 52px;
  background: url(../../../static/image/back.png);
  line-height: 52px;
  text-align: center;
}
.nowShow {
  background: url(../../../static/image/active-border.png);
}
</style>