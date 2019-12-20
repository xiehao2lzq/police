<template>
  <div class="table">
    <div class="title">
        <p :class="select===true?'select':''" @click="isSelect">开门记录</p>
        <p :class="select===false?'select':''" @click="isSelect">通话记录</p>
    </div>
    <el-table
      v-if="select"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      height="80%"
      border
      style="width: 98%;margin: 12px auto"
      :cell-style="tableRowStyle"
      :header-cell-style="{background:'#0f193d','text-align':'center',height:'10px'}"
      :row-class-name="tableRowClassName"
    >
     
      <el-table-column prop="NO" label="NO" ></el-table-column>
      <el-table-column prop="xqName" label="小区"></el-table-column>
      <el-table-column prop="deviceName" label="摄像头" width="250%"></el-table-column>
      <el-table-column prop="openTypeStr" label="开锁方式" width="150%"></el-table-column>
      <el-table-column prop="roomNum" label="房间号"></el-table-column>
      <el-table-column prop="swipeName" label="用户名"></el-table-column>
      <el-table-column prop="cardNumber" label="卡号"></el-table-column>
      <el-table-column prop="openResult" label="开锁结果"></el-table-column>
      <el-table-column prop="swipeTime" label="开锁时间"></el-table-column>
    </el-table>
    <el-table
      v-if="!select"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData2"
      height="80%"
      border
      style="width: 98%;margin: 12px auto"
      :cell-style="tableRowStyle"
      :header-cell-style="{background:'#0f193d','text-align':'center',height:'10px'}"
      :row-class-name="tableRowClassName"
    >
       <el-table-column prop="NO" label="NO" ></el-table-column>
      <el-table-column prop="xqName" label="小区"></el-table-column>
      <el-table-column prop="status" label="呼叫类型" width="250%"></el-table-column>
      <el-table-column prop="roomNum" label="房间号" width="150%"></el-table-column>
      <el-table-column prop="callTime" label="呼叫开始时间"></el-table-column>
      <el-table-column prop="talkTime" label="通话时长"></el-table-column>
      <el-table-column prop="endState" label="是否接通"></el-table-column>
    </el-table>
    <div class="bottom" v-if="!select">
      <p>
        <span class="totalRows">
          共
          <span>{{totalRows2}}</span>条记录
        </span>
        <span class="currentPage">
          第
          <span>{{currentPage2||1}}/{{totalPage2 || 1}}</span>页
        </span>
        <span class="jump">
          跳转到
          <input type="text" v-model="msg2">页
        </span>
        <span @click="jump(msg2)" class="ensure">确定</span>
        <span class="export">导出人员记录</span>
      </p>
      <p>
        <span @click="jump(1)" class="start">首页</span>
        <span @click="jump(2)" class="pageUp">上页</span>
        <span @click="jump(3)" class="pageNext">下页</span>
        <span @click="jump(4)" class="end">末页</span>
      </p>
    </div>
    <div class="bottom"  v-if="select">
      <p>
        <span class="totalRows">
          共
          <span>{{totalRows}}</span>条记录
        </span>
        <span class="currentPage">
          第
          <span>{{currentPage||1}}/{{totalPage || 1}}</span>页
        </span>
        <span class="jump">
          跳转到
          <input type="text" v-model="msg">页
        </span>
        <span @click="jump(msg)" class="ensure">确定</span>
        <span class="export">导出人员记录</span>
      </p>
      <p>
        <span @click="jump(1)" class="start">首页</span>
        <span @click="jump(2)" class="pageUp">上页</span>
        <span @click="jump(3)" class="pageNext">下页</span>
        <span @click="jump(4)" class="end">末页</span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      url: state => state.home.url
    }),
    ...mapState({
      xqCode: state => state.home.xqCode //从vuex取总页数
    })
  },
  
  data() {
    return {
      msg: "",
      msg2: "",
      //loading: false,
      select:true,
      tableData:[],
      totalPage:"",
      totalRows:"",
      currentPage:"",
      param:{},
      loading:false,
      tableData2:[],
      totalPage2:"",
      totalRows2:"",
      currentPage2:"",
      param2:{}
    };
  },
  mounted () {
    //表一参数
    this.param = {
        limit:10,
        page:this.currentPage||1,
        areaId:"0",
        xqCode:this.xqCode
      };
    //表二参数
    this.param1= {
        limit:10,
        page:this.currentPage1||1,
        areaId:"0",
        xqCode:this.xqCode
      };
    this.getDoorInfo();
    this.getPhoneInfo()
  },
  methods: {
    getDoorInfo(){
      
      this.$axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/openRecord/list",{
       params:this.param
    }).then(res=>{
        console.log(res)
        this.tableData= []
        this.currentPage = res.data.data.currentPage;
        this.totalRows = res.data.data.totalRows;
        this.totalPage = Math.ceil(res.data.data.totalRows/10);
      res.data.data.list.forEach((item,index)=>{
        this.tableData.push({
          NO:res.data.data.currentPage*10-10+index+1,
          xqName:item.xqName,
          deviceName:item.deviceName,
          openTypeStr:item.openTypeStr,
          roomNum:item.roomNum,
          swipeName:item.swipeName,
          cardNumber:item.cardNumber,
          openResult:item.openResult==1?"成功":"失败",
          swipeTime:item.swipeTime,
      })
      })
    })
    },
    getPhoneInfo(){
      this.$axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/callRecord/list",{
       params:this.param1
    }).then(res=>{
      console.log(res)
        this.currentPage2 = res.data.data.currentPage
        this.totalRows2 = res.data.data.totalRows,
        this.totalPage2 = Math.ceil(res.data.data.totalRows/10)
        this.tableData2= []
      res.data.data.list.forEach((item,index)=>{
        this.tableData2.push({
          NO:res.data.data.currentPage*10-10+index+1,
          xqName:item.xqName,
          status:item.status==0?"被叫":"主叫",
          roomNum:item.roomNum,
          callTime:item.callTime,
          talkTime:item.talkTime,
          endState:item.endState==1?"已接通":"未接通",
      })
      })
    })
    },
      //选项卡切换
      isSelect(){
          this.select = !this.select
      },
    // 修改table tr行的背景色，
    tableRowStyle({ row, rowIndex }) {
      return "text-align:center;background:#0f193d;height:10px";
    },
    //修改字体颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.clStatus === "未处理" && !row.isSelect) {
        return "warning-row";
      } else if (row.clStatus === "已处理" && !row.isSelect) {
        return "success-row";
      }else if(row.isSelect){
        return "selectRow"
      }
      return "";
    },
    jump(page) {
      if (this.select) {
        switch (page) {
          case 1:
            this.param.page = 1
            this.getDoorInfo()
            break;
          case 2:
            if (this.currentPage > 1) {
              this.param.page = this.currentPage - 1
              this.getDoorInfo()
            }
            break;
          case 3:
            if (this.currentPage < this.totalPage) {
              this.param.page = this.currentPage + 1
              this.getDoorInfo()
            }
            break;
          case 4:
            this.param.page = this.totalPage
            this.getDoorInfo()
            break;
          default:
            if (page >= 1 && page <= this.totalPage) {
              this.param.page = page
              this.getDoorInfo()
            }
        }
      }else{
        switch (page) {
          case 1:
            this.param2.page = 1
            this.getPhoneInfo()
            break;
          case 2:
            if (this.currentPage2 > 1) {
              this.param2.page = this.currentPage2 - 1
              this.getPhoneInfo()
            }
            break;
          case 3:
            if (this.currentPage2 < this.totalPage2) {
              this.param2.page = this.currentPage2 + 1
              this.getPhoneInfo()
            }
            break;
          case 4:
            this.param2.page = this.totalPage2
            this.getPhoneInfo()
            break;
          default:
            if (page >= 1 && page <= this.totalPage2) {
              this.param2.page = page
              this.getPhoneInfo()
            }
        }
      }
    },
  }
};
</script>
<style lang="scss" scoped>
img {
  display: inline;
}
.bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 0.3rem;
  p {
    color: #fff;
    span {
      margin: 0 0.1rem;
      cursor: pointer;
      input {
        border: 0;
        background: #111531;
        width: 0.6rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}
.table{
        width: 98.5%;
        height: 5rem;
        margin: 0.1rem 0 0 0.1rem;
        box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
        float: left;
        //background: red;
    }
.title{
    margin: 0.1rem 0 0.1rem 0.2rem;
    height: 0.2rem;
    p{
        float: left;
        color: #8DB3DF;
        padding: 0.05rem 0.2rem;
        cursor: pointer;
    }
    .select{
        color: #fff;
        box-shadow: 0 0 0.1rem 0.1rem inset #2d3b7c91;
        
    }
}
</style>


