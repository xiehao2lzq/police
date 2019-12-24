<template>
  <div class="car">
    <!-- 搜索框 -->
    <div class="searchBox boxColor">
      <div class="title clear">
        <p></p>
        <span>车辆布控</span>
      </div>
      <div class="inputBox">
        <div class="selectBox1">
          <span>车辆库：</span>
          <el-select v-model="carTypeCode" placeholder="请选择">
            <el-option
              v-for="item in carTypes"
              :key="item.type"
              :label="item.libraryName"
              :value="item.type"
            ></el-option>
          </el-select>
        </div>
        <div class="selectBox1">
          <span>布控等级：</span>
          <el-select v-model="alarmLevel" placeholder="请选择">
            <el-option
              v-for="item in alarmLevels"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="selectBox1">
          <li>
            <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
          </li>
        </div>
        <div class="selectBox1">
          <button @click="search">查询</button>
          <button @click="reset">重置</button>
          <!--  <button>
            <i class="el-icon-document"></i>导出
          </button>-->
        </div>
      </div>
    </div>

    <!-- table列表 -->
    <div class="tableBox boxColor">
      <div class="rightbox">
        <div class="export">
          <i class="el-icon-document-checked"></i> 批量导出
        </div>
        <div class="import">
          <i class="el-icon-document-checked"></i> 批量导入
        </div>
        <div class="add" @click="add">
          <i class="el-icon-document-add"></i> 新增布控
        </div>
      </div>
      <div class="table2">
        <el-table :data="tableData" height="675" style="width: 100%" @cell-click="persondelete">
          <!--  <el-table-column label="头像" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.head_pic" width="100" height="100" class="head_pic" />
            </template>
          </el-table-column>-->
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="carNum" label="车牌号码"></el-table-column>
          <el-table-column prop="alarmLevel" label="报警等级" width="180"></el-table-column>
          <el-table-column prop="controlReason" label="布控原因"></el-table-column>
          <el-table-column prop="createUserName" label="操作人员"></el-table-column>
          <el-table-column prop="carGroupName" label="所属车辆库"></el-table-column>
          <el-table-column label="操作">
            <i class="el-icon-delete-solid" style="font-size:30px;color:#E63B3B"></i>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- 新增弹出框 -->
    <div class="carAdd">
      <el-dialog title="新增布控" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="车牌号:" :label-width="formLabelWidth" prop="carNum">
            <el-input
              v-model="form.carNum"
              autocomplete="off"
              style="width:216px"
              placeholder="车牌号"
              prop="carNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属车辆库:" :label-width="formLabelWidth" prop="carTypeCode">
            <el-select v-model="form.carTypeCode" placeholder="请选择活动区域">
              <el-option
                v-for="item in form.carTypes"
                :key="item.id"
                :label="item.libraryName"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择布控等级:" :label-width="formLabelWidth" prop="alarmLevel">
            <el-select v-model="form.alarmLevel" placeholder="请选择活动区域">
              <el-option
                v-for="item in form.alarmLevels"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="布控原因:" :label-width="formLabelWidth" prop="textarea">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('form')">取 消</el-button>
          <el-button type="primary" @click="addCar('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 删除弹框 -->
    <div class="carDelete">
      <el-dialog title="删除布控" :visible.sync="dialogDeleteVisible">
        <span>确定删除对该车辆的布控吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteVisible = false">下次再说</el-button>
          <el-button type="primary" @click="ensureDelete">确定删除</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      rules: {
        carNum: [{ required: true, message: "请输入车牌", trigger: "blur" }],
        carTypeCode: [
          { required: true, message: "请选择车辆库类型", trigger: "change" }
        ],
        alarmLevel: [
          { required: true, message: "请选择布控等级", trigger: "change" }
        ],
        textarea: [
          { required: false, message: "请输入布控原因", trigger: "blur" }
        ]
      },
      carTypes: [],
      carTypeCode: "",
      alarmLevels: [
        //布控库等级
        {
          name: "高",
          value: 1
        },
        {
          name: "中",
          value: 2
        },
        {
          name: "低",
          value: 3
        }
      ],
      alarmLevel: "",
      value1: "",
      textarea: "",
      input: "",
      currentPage: 1,
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      form: {
        carTypes: [],
        carTypeCode: "",
        alarmLevels: [
          //布控库等级
          {
            name: "高",
            value: 1
          },
          {
            name: "中",
            value: 2
          },
          {
            name: "低",
            value: 3
          }
        ],
        alarmLevel: "",
        carNum: "",
        textarea: ""
      },
      formLabelWidth: "120px",
      selectIndex: 0,
      value: "",
      tableData: [],
      total: 1,
      row: []
    };
  },
  computed: {
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {
    this.$nextTick(() => {
      this.getCarTableList();
    });
  },
  methods: {
    reset() {
      this.carTypeCode = "";
      this.alarmLevel = "";
      this.input = "";
      this.listInfo();
    },
    search() {
      this.listInfo();
    },
    // 获取车辆库表格数据
    getCarTableList() {
      this.currentPage = 1;
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/library/selectCarTypeList",
        params: {
          page: this.currentPage,
          limit: 18
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.carData = res.data.data.list;
          /* 缓存上 */
          sessionStorage.setItem("carData", JSON.stringify(this.carData));
          this.carTypes = JSON.parse(sessionStorage.getItem("carData"));
          this.form.carTypes = JSON.parse(sessionStorage.getItem("carData"));
          //console.log(res)
          this.listInfo();
        }
      });
    },
    /* 打开新增 */
    add() {
      this.dialogFormVisible = true;
      this.form.carTypes = JSON.parse(sessionStorage.getItem("carData"));
    },
    /* 取消新增页面 */
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    /* 确认新增 */
    addCar(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //符合条件走这个
          // alert('submit!');
          var data = {
            carType: this.form.carTypeCode,
            alarmLevel: this.form.alarmLevel,
            controlReason: this.form.textarea,
            carNum: this.form.carNum
          };
          this.$axios({
            method: "post",
            url: "http://" + this.url + ":9000/sjwl/webapi/car/groupCar",
            data: JSON.stringify(data)
          }).then(res => {
            console.log(res);
            if (res.data.code == 1000) {
              this.$store.state.commonData.successMsg.unshift(res.data.msg);
              this.$refs[formName].resetFields();
              (this.form.carTypeCode = ""),
                (this.form.alarmLevel = ""),
                (this.form.carNum = ""),
                (this.form.textarea = ""),
                this.listInfo(); //刷新列表
            } else {
              this.$store.state.commonData.errorMsg.unshift(res.data.msg);
            }
          });
          this.dialogFormVisible = false; //请求发送之后隐藏
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      /* var data = {
        carType: this.form.carTypeCode,
        alarmLevel: this.form.alarmLevel,
        controlReason: this.form.textarea,
        carNum: this.form.carNum
      };
      this.$axios({
        method: "post",
        url: "http://" + this.url + ":9000/sjwl/webapi/car/groupCar",
        data: JSON.stringify(data)
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.$store.state.commonData.successMsg.unshift(res.data.msg);
          this.dialogFormVisible = false; //成功之后
          (this.form.carTypeCode = ""),
            (this.form.alarmLevel = ""),
            (this.form.carNum = ""),
            (this.form.textarea = ""),
            this.listInfo(); //刷新列表
        } else {
          this.$store.state.commonData.errorMsg.unshift(res.data.msg);
        }
      }); */
    },
    persondelete(row, column, cell, event) {
      /* 打开删除提示 */
      if (column.label == "操作") {
        this.dialogDeleteVisible = true;
        this.row = row;
      }
    },
    ensureDelete() {
      /* 确认删除 */
      this.tableData.splice(this.row.id, 1);
      this.$axios({
        method: "delete",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/car/groupCar/" + this.row.id
      }).then(res => {
        if (res.data.code == 1000) {
          console.log(res);
          this.listInfo();
        }
      });
      this.dialogDeleteVisible = false;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    upLoad() {
      var that = this;
      var file = document.getElementById("upload_file").files[0];
      if (file.size >= 1024 * 1024) {
        this.open4("图片的大小应小于1M");
        return false;
      }
      console.log(file.type);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.open4("只接收jpg和png格式图片");
        return false;
      }
      var r = new FileReader(); //本地预览
      r.onload = function() {
        //图片的base64
        //console.log(r)
        //that.$store.state.faceCountrl.base64 = r.result;
        that.imageUrl = r.result;
      };
      r.readAsDataURL(file); //Base64
    },
    listInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/car/groupCar/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          carType: this.carTypeCode,
          limit: 20,
          page: this.currentPage,
          likeStr: this.input,
          alarmLevel: this.alarmLevel
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.totalRows;
        }
        console.log(res);
        //var data = res.data.data;
        //this.tableData = data.list;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/* 公用部分 */
.title {
  margin-top: 13px;
  margin-left: 10px;
  font-size: 16px;
  p {
    width: 6px;
    height: 16px;
    float: left;
    background: linear-gradient(
      0deg,
      rgba(59, 169, 230, 1),
      rgba(95, 201, 251, 1)
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

.searchBox {
  width: 1532px;
  height: 100px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  float: left;
  .title {
    color: #333333;
  }
  span {
    float: left;
    color: #333333;
  }
  .inputBox {
    margin-left: 5px;
  }
  .selectBox1 {
    float: left;
    overflow: hidden;
    margin-top: 20px;
    span {
      margin: 6px 0 0 20px;
    }
    button {
      width: 90px;
      height: 34px;
      background: rgba(61, 183, 237, 1);
      border-radius: 3px;
      border: 0;
      outline: 0;
      margin-left: 15px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
.tableBox {
  width: 1532px;
  height: 815px;
  float: left;
  margin: 19px 0 0 11px;
  overflow: hidden;
}
.rightbox {
  float: right;
  color: #333333;
  height: 80px;
  width: 390px;
  margin-right: 50px;
  div {
    float: left;
    width: 110px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin: 22px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .export {
    border: 1px solid rgba(59, 169, 230, 1);
    color: rgba(59, 169, 230, 1);
  }
  .import {
    border: 1px solid rgba(59, 169, 230, 1);
    color: rgba(59, 169, 230, 1);
  }
  .add {
    background: rgba(59, 169, 230, 1);
    color: #ffffff;
  }
}
.table2 {
  float: left;
  height: 735px;
  width: 1502px;
  margin: 0px auto 0;
}
.page {
  width: 100%;
  margin-top: 10px;
  text-align: right;
}
</style>