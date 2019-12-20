<template>
  <div class="historyPicbox">
    <div class="box">
      
      <div class="inf">
        <img class="capImgUrl" :src="showInfo.capImgUrl?showInfo.capImgUrl:src" alt>
        <p>小区：{{showInfo.xqName?showInfo.xqName:'未知'}}</p>
        <p>摄像头：{{showInfo.deviceAddr?showInfo.deviceAddr:'未知'}}</p>
        <p>时间：{{showInfo.updTime?showInfo.updTime:'未知'}}</p>
        <p>名称：{{showInfo.personName?showInfo.personName:'未知'}}</p>
        <p>属性：{{showInfo.clStatus?showInfo.clStatus:'未知'}}</p>
        <img @click="showVideo" src="../../../../static/video.png" alt>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      showInfo: state => state.countrlHistory.showInfo
    })
  },
  data(){
    return{
      src:'../../../../static/stranger2.png'
    }
  },
  methods: {
      showVideo(){
          this.$store.state.faceCountrl.isshow = true;
          this.$store.state.faceCountrl.capVideoUrl = this.showInfo.videoUrl;
      }
  }
};
</script>
<style lang="scss" scoped>
.historyPicbox {
  width: 25%;
  height: 6.5rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
}
.box {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .capImgUrl {
    width: 1.5rem;
    height: 2rem;
    /* background: red; */
  }
  p {
    color: #fff;
    margin: 0.1rem auto;
  }
  img{
      cursor: pointer;
  }
}
</style>
