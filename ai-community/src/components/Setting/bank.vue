<template>
  <div class="bank">
    <div class="btnBox">
      <div class="rightLogo">
        <el-button type="primary">刷新</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <div class="title clear">
        <p></p>
        <span>人脸库管理</span>
      </div>
    </div>
    <div class="table2">
      <div class="table3">
        <el-table :data="tableData" height="780" style="width: 100%" @cell-click="handle">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="address" label="操作">
            <i class="el-icon-delete"></i>
            <i class="el-icon-edit"></i>
            <i class="el-icon-search"></i>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 删除提示 -->
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center top="20%">
      <span style="margin-left:50px; color:#fff;font-size:16px ">是否刪除此条？</span>
      <span slot="footer" class="dialog-footer">
        <button class="btn1" @click="centerDialogVisible = false">确定</button>
        <button class="btn2" @click="centerDialogVisible = false">取消</button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center top="20%">
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="btn1" @click="dialogFormVisible = false">确定</button>
        <button class="btn2" @click="dialogFormVisible = false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled:true,
      title: "新增人脸库",
      centerDialogVisible: false,
      dialogFormVisible: false,
      textarea: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentPage: 4
    };
  },
  methods: {
    change(){
      this.disabled = false;
    },
    delete(){

    },
    search(){
      this.disabled = true;
    },
    add(){
      this.dialogFormVisible = true;//打开界面
      this.disabled = false;//允许操作
    },
    handle(row, column, cell, event) {
      if (event.target.className == "el-icon-delete") {
        this.centerDialogVisible = true;
      } else if (event.target.className == "el-icon-edit") {
        this.dialogFormVisible = true;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.bank {
  width: 1532px;
  height: 975px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
.btnBox {
  width: 1532px;
  height: 110px;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
  overflow: hidden;
}
.rightLogo {
  width: 180px;
  height: 50px;
  top: 50px;
  right: 10px;
  position: absolute;
}
.bank {
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
.table2 {
  width: 1532px;
  height: 865px;
  margin: 10px auto 0;
  overflow: auto;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
}
.table3{
  width: 1502px;
  margin:0 auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.page {
  width: 100%;
  margin-top: 8px;
  text-align: right;
}
</style>