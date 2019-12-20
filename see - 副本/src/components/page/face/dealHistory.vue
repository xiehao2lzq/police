<template>
  <div class="dealhistry">
    <SearchBox :title="title" :effect="effect"/>
    <DealHistoryInfo/>
  </div>
</template>
<script>
import SearchBox from "./searchBox";
import DealHistoryInfo from "./dealHistoryInfo";
export default {
  components: {
    SearchBox,
    DealHistoryInfo
  },
  data() {
    return {
      title: "姓名",
      effect:">>处理记录"
    };
  },
  beforeRouteLeave(to,from,next) {
    this.$store.state.dealHistory = {
      tableData: [], //searchInfo数据
      faceImgUrl: "", //picBox数据
      capImgUrl: "",
      capVideoUrl: "", //视频地址
      isshow: false, //视频是否显示
      totalPage: "", //总页数
      currentPage: "", //当前页
      totalRows: "", //总条数
      param: null, //查询参数
      showInfo: {}, //左侧展示信息
      isshow2: false, //详细记录的是否显示
      gainOneInfo: null,
      loading:false,//遮罩层
    };
    next();
  }
};
</script>
<style lang="scss" scoped>
</style>
