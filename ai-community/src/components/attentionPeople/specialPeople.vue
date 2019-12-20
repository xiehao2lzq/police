<template>
  <div class="specialPeople">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>特殊人员管理（{{total}}）</span>
    </div>
    <div class="table2">
      <div class="showBox">
        <li @click="show(item.personId)" v-for="(item) in list" :key="item.lastCaptureTime">
           <img :src="item.image" alt="">
           <div class="infoBox">
               <p>姓名：{{item.personName}}</p>
               <p>房产：{{item.houseName}}</p>
               <p>人脸库类型：{{item.faceTypeName}}</p>
               <p>所在小区：{{item.xqName}}</p>
           </div>
        </li>
    </div>
    </div>
    <div class="page">
        <el-pagination
        background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="9"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      selectedValue: state => state.homePage.selectedValue
    }),
    ...mapState({
      url: state => state.homePage.url
    })
  },
  created() {
    this.listInfo()
  },
  watch: {
    currentPage(){
      this.listInfo()
    }
  },
  data() {
    return {
       currentPage:1,
       list:[],
       total:0
    };
  },
 methods: {
      handleCurrentChange(val) {
        this.currentPage = val
      },
      show(val){//显示详情部分
        this.$store.state.attentionPeople.detailsIsshow = true
        this.$store.state.attentionPeople.personId = val
      },
      listInfo(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/person/special/list",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId: "",
         limit:9,
        page:this.currentPage
      }
    }).then(res => {
      console.log(res.data.data)
      if (res.data.code == "1000") {
        var data = res.data.data;
        this.currentPage = data.currentPage;
        this.list = data.list;
        this.total = data.totalRows
      }
    });
    }
    },
};
</script>

<style lang="scss" scoped>
.specialPeople {
  width: 1370px;
  height: 482px;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
.rightLogo {
  width: 123px;
  height: 14px;
  background: url(../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}
.specialPeople {
  .title {
    margin-top: 13px;
    margin-left: 10px;
    p {
      width: 6px;
      height: 16px;
      float: left;
      background: linear-gradient(
        0deg,
        rgba(35, 197, 235, 1),
        rgba(35, 230, 189, 1)
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
}

.selectedType{
    background: #4896F7;
}
.table2 {
  width: 1350px;
  height: 400px;
  margin: 5px auto;
  overflow: hidden;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.showBox{
    width: 100%;
    height: 400px;
    //overflow: hidden;
}
.showBox li{
    width: 435px;
    height: 122px;
    background: #282A3F;
    margin: 10px 0 0 10px;
    float: left;
    cursor: pointer;
    img{
        width: 90px;
        height: 110px;
        float: left;
        margin:5px 0 0 10px;
    }
    .infoBox{
        float: left;
        margin-left: 30px;
        p{
            margin-top: 10px;
        }
    }
}
.page{
    width: 100%;
    margin-top: 8px;
    text-align: right;
}
</style>