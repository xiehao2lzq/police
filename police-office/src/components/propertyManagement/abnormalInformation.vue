<template>
  <div class="abnormalInformation">
    <div class="title">
      <img src="@static/image/pointLeft.png" alt />
      <span>异常报警统计</span>
      <img src="@static/image/pointRight.png" alt />
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        height="290"
        style="width: 100%"
      >
        <el-table-column prop="captureTime" width="180%" label="时间"></el-table-column>
        <el-table-column label="地点">
           <template slot-scope="scope" >
              <span>{{scope.row.xqName+scope.row.deviceName}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="eventName" label="事件"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: []
    };
  },
  computed: {
     ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {
    this.listInfo();
  },
  methods: {
    tableRowClassName() {
      return "colorRow";
    },
    listInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/abnormalRecord/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          limit: 6,
          page: 1
        }
      }).then(res => {
        if(res.data.code==1000){
          this.tableData = res.data.data.list
        }
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.abnormalInformation {
  width: 100%;
  height: 290px;
  overflow: hidden;
  margin-top: 2px;
}
.title {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  font-size: 16px;
  img {
    display: inline-block;
  }
  text-align: center;
}
.table {
  width: 95%;
  height: 290px;
  margin: 5px auto;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
</style>