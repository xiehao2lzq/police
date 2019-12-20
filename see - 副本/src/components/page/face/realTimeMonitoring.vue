<template>
  <div class="realTimeMonitoring">
    <VideoList/>
    <div class="video">
      <Video3/>
      <SnapshotRecord/>
    </div>
    <FaceContrasts/>
  </div>
</template>
<script>
import VideoList from "./videoList"
import Video3 from "../../common/Video3"
import SnapshotRecord from "./snapshotRecord"
import FaceContrasts from "./faceContrasts"
import {mapState} from "vuex"
export default {
  components: {
    VideoList,
    Video3,
    SnapshotRecord,
    FaceContrasts
  },
  
  
};
</script>
<style lang="scss" scoped>
.realTimeMonitoring{
  overflow:hidden;
}
  .video{
    width:50%;
    height: 5.4rem;
    float: left;
    margin-top:0.1rem;
  }
</style>
