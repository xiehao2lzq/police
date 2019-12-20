<template>
  <div class="abnormalInformation">
    <div class="title">
      <img src="../../../static/bgImage/pointLeft.png" alt />
      <span>异常报警统计</span>
      <img src="../../../static/bgImage/pointRight.png" alt />
    </div>
    <div class="table">
      <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
        height=150
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
     data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
        tableRowClassName(){
            return "colorRow"
        }
    }
};
</script>

<style lang="scss" scoped>
.abnormalInformation {
  width: 531px;
  height: 194px;
  background: url(../../../static/bgImage/right4.png);
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
    width: 500px;
    height: 180px;
    margin:5px auto;
    overflow: auto;
}
.el-table--enable-row-transition .el-table__body td{
    transition:none;
}
</style>