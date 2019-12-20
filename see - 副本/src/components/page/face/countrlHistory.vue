<template>
  <div class="faces">
    <SearchBox :title="title" :effect="effect"/>
    <div class="info">
      <HistoryPicbox/>
      <HistoryInfo/>
    </div>
  </div>
</template>
<script>
import SearchBox from "./searchBox";
import HistoryPicbox from "./historyPicbox";
import HistoryInfo from "./historyInfo";
export default {
  components: {
    SearchBox,
    HistoryPicbox,
    HistoryInfo
  },
  data() {
    return {
      title: "姓名",
      effect:">>布控记录"
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.countrlHistory = {
      tableData: [], //searchInfo数据
      faceImgUrl: "", //picBox数据
      capImgUrl: "",
      capVideoUrl: "", //视频地址
      isshow: false,
      totalPage: "", //总页数
      currentPage: "", //当前页
      totalRows: "", //总条数
      param: null, //查询参数
      showInfo: {}, //左侧展示信息
      isshow2: false,
      id: "", //处理的数据的id
      faceGroupName: "", //要处理数据的人脸库类型
      clRen: "孙伟菊", //处理人
      xqID: "",
      alarmId: "",
      showInfo: {},
      loading:false,//遮罩层
    };
    next();
  }
};
</script>
<style lang="scss" scoped>
.info {
  width: 98%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
</style>