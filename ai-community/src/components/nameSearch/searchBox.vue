<template>
  <div class="searchBox">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>查询条件</span>
    </div>
    <div class="searchCase clear">
      <span>姓名：</span>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div class="searchCase2 clear">
      <span>时间：</span>
     <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    </div>
    <!-- <download-excel
    class = "export-excel-wrapper"
    :data = "json_data"
    :fields = "json_fields"
    name = "filename.xls">
    上面可以自定义自己的样式，还可以引用其他组件button
    <el-button type="primary" size="small">导出EXCEL</el-button>
</download-excel> -->
  <div class="btnBox">
    <button class="search">查询</button>
    <button class="line">路线规划</button>
    <button class="move">行动轨迹</button>
  </div>
  <div class="picBox">
    <span>结果：</span>
    <div class="img">
      <img src="../../../static/bgImage/11.png" alt="">
      <div class="title2">人脸库照片</div>
    </div>
    <div class="img">
      <img src="../../../static/bgImage/11.png" alt="">
      <div class="title2">抓拍照片</div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {json_fields: {
        "Complete name": "name",    //常规字段
        Telephone: "phone.mobile", //支持嵌套属性
        "Telephone 2": {
          field: "phone.landline",
                    //自定义回调函数
          callback: value => {
            return `Landline Phone - ${value}`;
          }
        }
      },
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ],
      input: "",
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        //value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
    };
  }
};
</script>

<style lang="scss" scoped>
.searchBox {
  width: 620px;
  height: 382px;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  //float: left;
}
.rightLogo {
  width: 123px;
  height: 14px;
  background: url(../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}
.searchBox {
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
.searchCase {
    margin-top: 20px;
    margin-left: 15px;
  span {
    float: left;
    line-height: 36px;
  }
}
.searchCase2 {
    margin-top: 20px;
    margin-left: 15px;
  span {
    float: left;
    line-height: 36px;
  }
}
.btnBox{
  margin-top: 20px;
    margin-left: 15px;
    button{
      outline: 0;
      padding:8px 25px;
      border-radius: 4px;
      border: 0;
      background: #4B57B6;
      color: #fff;
      margin-left: 42px;
    }
}
.picBox {
    margin-top: 20px;
    margin-left: 15px;
  span {
    float: left;
    line-height: 36px;
  }
  .img{
    float: left;
    width: 100px;
    height: 140px;
    margin-right: 50px;
    img{
      width: 100px;
      height: 110px;
    }
    .title2{
      width: 100px;
      height: 30px;
      background: #4B57B6;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>