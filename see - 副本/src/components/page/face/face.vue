<template>
  <div class="face">
    <div class="faceBox">
      <div class="video" @click.self="hide" v-if="isshow">
        <Video/>
      </div>
      <div class="dealInfo" @click="hide2" v-if="isshow2">
        <DealInfo/>
      </div>
      <div class="oneInfo" @click="hide3" v-if="isshow3">
        <OneInfo/>
      </div>
      <FaceHeader/>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
//引入仓库
import { mapState } from "vuex";
import FaceHeader from "../../common/faceHeader";
import Video from "../../common/Video2";
import DealInfo from "./dealInfo";
import OneInfo from "./oneInfo";
export default {
  components: {
    FaceHeader,
    Video,
    DealInfo,
    OneInfo
  },
  methods: {
    hide() {
      this.$store.state.faceCountrl.isshow = false;
    },
    hide2(e) {
      if (e.target.className === "dealInfo" || e.target.tagName === "BUTTON") {
        this.$store.state.countrlHistory.isshow2 = false;
      }
    },
    hide3() {
      this.$store.state.dealHistory.isshow2 = false;
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isshow: state => state.faceCountrl.isshow
    }),
    ...mapState({
      isshow2: state => state.countrlHistory.isshow2
    }),
    ...mapState({
      isshow3: state => state.dealHistory.isshow2
    }),
  },
};
</script>
<style lang="scss" scoped>
.face {
  width: 100%;
  height: 100%;
  /* overflow: hidden;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: relative; */
}
.faceBox{
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 9.2rem;
}
.video,
.dealInfo,
.oneInfo {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  background: rgba($color: #fff, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>