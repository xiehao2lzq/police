<template>
  <div class="picbox">
    <div class="left">
      <div class="upimg">
        <div class="boxsize">
          <div class="up" v-if="this.$route.name==='picFind'">
            <input accept="image/jpeg" name="img" id="upload_file" type="file" @input="upLoad">
            <img :style="style" src="@/assets/images/stranger.png" alt>
            <img v-if="this.$route.name==='picFind'" class="imgsize" :src="src">
            <button>点击上传图片</button>
          </div>
          <img v-if="this.$route.name==='faceCountrl'" class="imgsize" :src="faceImgUrl">
          <button v-if="faceImgUrl">人脸库照片</button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rightImg">
        <img class="imgsize" :src="capImgUrl">
        <button v-if="capImgUrl">抓拍照片</button>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../../../assets/eventsbus.js";
//引入仓库
import { mapState } from "vuex";
export default {
  data() {
    return {
      src: "",
      style: {
        opacity: 1,
        color: "skyblue",
        width: "1.28rem",
        height: "1.28rem"
      }
    };
  },
  computed: {
    ...mapState({
      faceImgUrl: state => state.faceCountrl.faceImgUrl
    }),
    ...mapState({
      capImgUrl: state => state.faceCountrl.capImgUrl
    })
  },
  watch: {
    src() {
      this.style.opacity = 0;
    }
  },
  methods: {
    upLoad() {
      var that = this;
      var file = document.getElementById("upload_file").files[0];
      console.log(document.getElementById("upload_file").files);
      if (file.size >= 1024 * 1024) {
        this.open("<span>图片的大小应小于1M<span/>");
        return false;
      }
      var r = new FileReader(); //本地预览
      r.onload = function() {
        //图片的base64
        that.$store.state.faceCountrl.base64 = r.result;
        that.src = r.result;
      };
      r.readAsDataURL(file); //Base64
    },
    open(a) {
      this.$alert(a, "提示信息", {
        dangerouslyUseHTMLString: true
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.picbox {
  width: 100%;
  height: 2rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  margin-bottom: 0.1rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
/* #showimg{
  width: 1.2rem;
} */
.right {
  position: relative;
}
#upload_file {
  opacity: 0;
  position: absolute;
  width: 1.28rem;
  height: 1.56rem;
  z-index: 20;
  cursor: pointer;
}
button {
  width: 1.28rem;
  height: 0.28rem;
  position: absolute;
  color: #fff;
  border: 0;
  bottom: 0;
  background: rgb(93, 107, 231);
  z-index: 10;
  border: 0;
  outline: 0;
}
.up {
  position: absolute;
  width: 100%;
  height: 100%;
  //z-index: 1000;
  background: #f0f2f5;
}
.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
}
.imgsize {
  width: 1.28rem;
  position: absolute;
  z-index: 2;
  top: 0;
}
.boxsize {
  width: 1.28rem;
  height: 1.56rem;
  overflow: hidden;
  position: relative;
}
.rightImg {
  width: 1.28rem;
  height: 1.56rem;
  position: relative;
}
</style>
