!<!--
  @Description:布控库
  @author Wangshu
  @date 2019/12/11
-->
<template>
  <div class="right-box bank">
    <div class="headerBlock">
      <div class="title clear">
        <p></p>
        <span>布控库</span>
      </div>
      <div class="titleHeader">
        <div class="block selectBox1">
          <el-input class="left-text" v-model="searchText" placeholder="请输入" style="width:280px"></el-input>
          <div class="search-btn">
            <el-button class="left-text" type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="table2 table3">
      <div class="table-btn">
        <div>
          <img src="@static/image/refresh_icon.png" alt />
          刷新
        </div>
        <div @click="addPopover()">+ 新增</div>
      </div>
      <!--      人脸库-->
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="人脸库" name="first">
          <el-table :data="faceData" stripe height="690" align="center" style="width: 100%">
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column prop="typeName" label="类型" width="180"></el-table-column>
            <el-table-column prop="libraryName" label="名称" width="180"></el-table-column>
            <el-table-column prop="remarks" label="备注" width></el-table-column>
            <el-table-column prop="peopleNum" label="人员数量" width="150"></el-table-column>
            <el-table-column prop label="操作" width="150">
              <template slot-scope="scope">
                <i class="el-icon-edit i-btn" @click="faceClick(scope.row)"></i>
                <i
                  class="el-icon-delete"
                  @click="delFaceItem(scope.row)"
                  style="font-size: 20px;color: red"
                ></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="table2 page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="18"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <!--        车辆库-->
        <el-tab-pane label="车辆库" name="second">
          <el-table :data="carData" stripe height="690" align="center" style="width: 100%">
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column prop="typeName" label="类型" width="180"></el-table-column>
            <el-table-column prop="libraryName" label="名称" width="180"></el-table-column>
            <el-table-column prop="remarks" label="备注" width></el-table-column>
            <el-table-column prop="carsNum" label="车辆数量" width="150"></el-table-column>
            <el-table-column prop label="操作" width="150">
              <template slot-scope="scope">
                <i
                  class="el-icon-edit i-btn"
                  @click="carClick(scope.row)"
                  style="font-size: 20px;margin-right: 20px"
                ></i>
                <i
                  class="el-icon-delete"
                  @click="delCarItem(scope.row)"
                  style="font-size: 20px; color: red"
                ></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="table2 page">
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
        </el-tab-pane>
      </el-tabs>
      <!-- 新增人员提示框-->
      <div class="pop-view">
        <el-dialog title="新增人脸库" width="626px" top="25vh" :visible.sync="dialogFaceVisible">
          <el-form :model="faceForm">
            <el-form-item label="类型：" :label-width="formLabelWidth">
              <el-select v-model="faceForm.typeName" placeholder="请选择">
                <el-option
                  v-for="item in faceForm.type"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称：" :label-width="formLabelWidth">
              <el-input v-model="faceForm.libraryName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth">
              <el-input v-model="faceForm.remarks" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFaceVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFaceBank">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 新增车型库提示框-->

        <el-dialog title="新增车型库" width="626px" top="25vh" :visible.sync="dialogCarVisible">
          <el-form :model="carForm">
            <el-form-item label="类型：" :label-width="formLabelWidth">
              <el-select v-model="carForm.typeName" placeholder="请选择">
                <el-option
                  v-for="item in carForm.type"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称：" :label-width="formLabelWidth">
              <el-input v-model="carForm.libraryName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth">
              <el-input v-model="carForm.remarks" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCarVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCarBank">确 定</el-button>
          </div>
        </el-dialog>
        <!--删除车辆提示框-->
        <el-dialog title="删除" :visible.sync="delCarVisible" width="625px">
          <p style="text-align: center">确定要删除该布控库么？</p>
          <p style="text-align: center;margin-bottom:20px;">删除布控库，会同时删除掉布控库内的所有车辆信息</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delCarVisible = false">取 消</el-button>
            <el-button type="primary" @click="delCarBank">确 定</el-button>
          </span>
        </el-dialog>

        <!--删除人员信息提示框-->
        <el-dialog title="删除" :visible.sync="delFaceVisible" width="625px">
          <p style="text-align: center">确定要删除该布控库么？</p>
          <p style="text-align: center;margin-bottom:20px;">删除布控库，会同时删除掉布控库内的所有人员信息</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delFaceVisible = false">取 消</el-button>
            <el-button type="primary" @click="delFaceBank">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "faceStore",
  computed: {
    ...mapState({
      url: state => state.commonData.url
    })
  },
  data() {
    return {
      id: "", //库标识
      faceData: [],
      carData: [],
      faceForm: {
        typeName: "",
        libraryName: "",
        remarks: "",
        type: [
          {
            name: "黑",
            value: "0"
          },
          {
            name: "白",
            value: "1"
          },
          {
            name: "灰",
            value: "2"
          }
        ]
      },
      carForm: {
        typeName: "",
        libraryName: "",
        remarks: "",
        type: [
          {
            name: "黑",
            value: "0"
          },
          {
            name: "白",
            value: "1"
          },
          {
            name: "灰",
            value: "2"
          }
        ]
      },
      currentPage: 1,
      total: 1,
      formLabelWidth: "120px",
      dialogFaceVisible: false, //编辑人员窗口状态
      dialogCarVisible: false, //编辑车辆窗口状态

      delFaceVisible: false, //删除人脸弹窗状态
      delCarVisible: false, //删除车辆弹窗状态
      activeName: "first",
      searchText: "",
      revamp: true //是新增还是修改
    };
  },
  methods: {
    /* 提交新建的人脸库或者修改 */
    addFaceBank() {
      if (!this.revamp) {
        this.$axios({
          method: "post",
          url: "http://" + this.url + ":9000/sjwl/webapi/library/addFaceType",
          data: JSON.stringify(this.faceForm)
        }).then(res => {
          if (res.data.code == 1000) {
            this.$store.state.commonData.successMsg.unshift(res.data.msg);
            this.dialogFaceVisible = false;
            this.getFaceTableList();
          } else {
            this.$store.state.commonData.errorMsg.unshift(res.data.msg);
          }
        });
      } else {
        this.$axios({
          method: "put",
          url:
            "http://" + this.url + ":9000/sjwl/webapi/library/updateFaceType",
          data: JSON.stringify({ ...this.faceForm, id: this.id }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.data.code == 1000) {
            this.$store.state.commonData.successMsg.unshift(res.data.msg);
            this.dialogFaceVisible = false;
            this.getFaceTableList();
          } else {
            this.$store.state.commonData.errorMsg.unshift(res.data.msg);
          }
        });
      }
    },
    /*车辆库新建提交或者修改  */
    addCarBank() {
      if (!this.revamp) {
        this.$axios({
          method: "post",
          url: "http://" + this.url + ":9000/sjwl/webapi/library/addCarType",
          data: JSON.stringify(this.carForm)
        }).then(res => {
          if (res.data.code == 1000) {
            this.$store.state.commonData.successMsg.unshift(res.data.msg);
            this.dialogCarVisible = false;
            this.getCarTableList();
          } else {
            this.$store.state.commonData.errorMsg.unshift(res.data.msg);
          }
        });
      } else {
        this.$axios({
          method: "put",
          url: "http://" + this.url + ":9000/sjwl/webapi/library/updateCarType",
          data: JSON.stringify({ ...this.carForm, id: this.id }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.data.code == 1000) {
            this.$store.state.commonData.successMsg.unshift(res.data.msg);
            this.dialogCarVisible = false;
            this.getCarTableList();
          } else {
            this.$store.state.commonData.errorMsg.unshift(res.data.msg);
          }
        });
      }
    },
    // 获取人脸库表格数据
    getFaceTableList() {
      this.currentPage = 1;
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/library/selectFaceTypeList",
        params: {
          page: this.currentPage,
          limit: 18
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.faceData = res.data.data.list;
          sessionStorage.setItem("faceDate", JSON.stringify(this.faceData));
        }
        console.log(res);
        //this.faceData = res.data.data.list
      });
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
          sessionStorage.setItem("carData", JSON.stringify(this.carData));
        }
        console.log(res);
        //this.carData = res.data.data.list
      });
    },
    tabClick(tab, event) {
      console.log(tab.name, event);
      if (tab.name == "first") {
        this.getFaceTableList();
      } else if (tab.name == "second") {
        this.getCarTableList();
      }
    },
    //右上角新增按钮
    addPopover() {
      this.revamp = false; //修改还是新增
      if (this.activeName == "first") {
        this.addFaceTabLine();
      } else if (this.activeName == "second") {
        this.addCarTabLine();
      }
    },
    // 修改人脸弹窗
    faceClick(row) {
      this.id = row.id;
      this.faceForm.libraryName = row.libraryName;
      this.faceForm.typeName = row.typeName;
      this.faceForm.remarks = row.remarks;
      this.dialogFaceVisible = true;
      this.revamp = true; //修改还是新增
    },
    //新增人脸库
    addFaceTabLine() {
      this.faceForm.libraryName = "";
      this.faceForm.typeName = "";
      this.faceForm.remark = "";
      this.dialogFaceVisible = true;
      this.revamp = false; //修改还是新增
    },
    //新增车辆库
    addCarTabLine() {
      this.carForm.libraryName = "";
      this.carForm.typeName = "";
      this.carForm.remark = "";
      this.dialogCarVisible = true;
      this.revamp = false; //修改还是新增
    },
    // 修改车辆弹窗
    carClick(row) {
      //console.log(row)
      this.id = row.id;
      this.carForm.libraryName = row.libraryName;
      this.carForm.typeName = row.typeName;
      this.carForm.remark = row.remark;
      this.dialogCarVisible = true;
      this.revamp = true; //修改还是新增
    },
    search() {
      if (tab.name == "first") {
        this.getFaceTableList();
      } else if (tab.name == "second") {
        this.getCarTableList();
      }
    },
    reset() {
      this.searchText = "";
      if (tab.name == "first") {
        this.getFaceTableList();
      } else if (tab.name == "second") {
        this.getCarTableList();
      }
    },
    /* 触发删除提示 */
    /* 人 */
    delFaceItem(row) {
      console.log(row)
      this.id = row.faceTypeCode;
      this.delFaceVisible = true;
    },
    delFaceBank() {
      this.$axios({
        method: "delete",
        url: "http://" + this.url + ":9000/sjwl/webapi/library/deleteFaceType/"+this.id,
      }).then(res => {
        if (res.data.code == 1000) {
          this.delFaceVisible = false;
          this.getFaceTableList();
        }
        //console.log(res)
      });
    },
    /* 车 */
    delCarItem(row) {
      //console.log(row)
      this.id = row.type;
      this.delCarVisible = true;
    },
    delCarBank() {
      this.$axios({
        method: "delete",
        url: "http://" + this.url + ":9000/sjwl/webapi/library/deleteCarType/"+this.id,
      }).then(res => {
        if (res.data.code == 1000) {
          this.delCarVisible = false;
          this.getCarTableList();
        }
        console.log(res);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.$nextTick(() => {
      this.getFaceTableList();
    });
  }
};
</script>

<style lang="scss" scoped>
.right-box {
  height: 100%;
  width: 1542px;
  float: right;
  padding: 0 10px 0 0px;
  background: #bcd6ed;
  margin-top: 25px;

  .title {
    margin-top: 13px;
    margin-left: 10px;

    p {
      width: 6px;
      height: 16px;
      float: left;
      background: linear-gradient(
        0deg,
        rgba(59, 169, 230, 1),
        rgba(95, 201, 251, 1)
      );
      box-shadow: 0px 3px 7px 0px rgba(225, 238, 249, 0.12);
      border-radius: 2px;
      margin-right: 10px;
    }

    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
      color: rgba(51, 51, 51, 1);
    }
  }
}

.table3 {
  height: 815px;
  background: #f5f9fc;
  padding: 10px 27px 0 19px;
  border-radius: 5px;
  position: relative;

  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .table-btn {
    position: absolute;
    right: 23px;
    top: 16px;
    display: flex;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.1s;
      z-index: 999;
      cursor: pointer;
    }

    > div:nth-of-type(1) {
      margin-right: 13px;
      color: #3ba9e6;
      width: 110px;
      height: 36px;
      border: #3ba9e6;
      border: 1px solid rgba(59, 169, 230, 1);
      border-radius: 4px;
    }

    > div:nth-of-type(2) {
      width: 110px;
      height: 36px;
      background: #3ba9e6;
      border: 1px solid rgba(59, 169, 230, 1);
      border-radius: 4px;
    }

    > div:nth-of-type(1):hover {
      background: #b6e0ed;
      border: 1px solid #b6e0ed;

      color: #fff;
    }

    > div:nth-of-type(2):hover {
      background: #31ace6;
      color: #fff;
    }
  }
}

.headerBlock {
  height: 100px;
  background: #f5f9fc;
  margin-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 5px;

  .titleHeader {
    margin-top: 15px;
    text-align: left;
    color: rgba(51, 51, 51, 1);

    .left-text {
      margin-left: 15px;
    }
  }
}

.i-btn {
  color: #3db7ed;
  font-size: 20px;
  margin-right: 20px;
  transition: all 0.1s;
}

.i-btn:hover {
  color: #fff;
}
</style>
