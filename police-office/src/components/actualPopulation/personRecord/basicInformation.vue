<template>
  <div class="basicInformation boxColor">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>基础信息</span>
    </div>
    <!-- cavans提前渲染 -->
    <img v-show="false" v-for="item in children" :key="item.index"  :src="item.img" alt />
    <img v-show="false" :src="src2" alt="">
    <div class="infoBox">
      <img :src="info.image || src" alt />
      <div class="leftText">
        <p>姓名：{{info.name ||"未知"}}</p>
        <p>联系电话：{{info.phone ||"未知"}}</p>
        <p>证件类型：{{info.paperType ||"未知"}}</p>
        <p>性别：{{info.sex ||"未知"}}</p>
        <p>婚姻状况：{{info.marriageStatus ||"未知"}}</p>
        <p>政治面貌：{{info.politicalStatus ||"未知"}}</p>
        <p :title="info.orgionPlace">户口所在地：{{info.orgionPlace ||"未知"}}</p>
        <p>现居住地：{{info.address ||"未知"}}</p>
      </div>
      <div class="rightText">
        <p>是否办理居住证：{{info.residence ||"未知"}}</p>
        <p>工作单位：{{info.company ||"未知"}}</p>
        <p>证件号码：{{info.paperNumber ||"未知"}}</p>
        <p>民族：{{info.nation ||"未知"}}</p>
        <p>教育程度：{{info.education ||"未知"}}</p>
      </div>
    </div>
    <div class="bankName">
      <div class="title clear">
        <p></p>
        <span>异常行为标签</span>
      </div>
      <li>{{abnormalTypeName || "暂无"}}</li>
    </div>
    <div class="houseInfo">
      <div class="title clear">
        <p></p>
        <span>房产信息</span>
      </div>
      <ul>
        <li class="clear" v-for="item in houses" :key="item.index">
          <p>房产地址：{{item.houseName}}</p>
          <p>人员类型：{{item.personType}}</p>
        </li>
      </ul>
    </div>
    <div class="calendarBox">
      <div class="title clear">
        <p></p>
        <span>抓拍记录</span>
      </div>
      <div class="calendar">
        <ul class="theader clear">
          <li>周日</li>
          <li>周一</li>
          <li>周二</li>
          <li>周三</li>
          <li>周四</li>
          <li>周五</li>
          <li>周六</li>
        </ul>
        <ul class="tbody clear">
          <li v-for="item in list" :key="item.index">
            <div v-if="item.capDay">
              <p>{{item.capDay}}</p>
              <p>抓拍{{item.num}}次</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      src:require("@static/image/person.png"),
      src2:require("@static/image/person.png"),
      info: {},
      faceType: "",
      personId: "",
      houses: [],
      abnormalTypeName: "",
      list: [],
      month: "",
      children:[],//cavans画图
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
    this.personId = this.$route.query.id;
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/" +
        this.personId +
        "/info",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      //console.log(res)
      if (res.data.code == 1000) {
        this.info = res.data.data;
        //console.log(this.info)
      }
    });
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/" +
        this.personId +
        "/faceType",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      //console.log(res)
      if (res.data.code == 1000) {
        this.faceType = res.data.data[0].faceTypeName;
      }
    });
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/" +
        this.personId +
        "/house",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      if (res.data.code == 1000) {
        //console.log(res)
        this.houses = res.data.data.houses;
        //this.faceType = res.data.data[0].type_name
      }
    });
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/" +
        this.personId +
        "/abnormalType",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      if (res.data.code == 1000) {
        //console.log(res)
        this.abnormalTypeName = res.data.data[0].abnormalTypeName;
        //this.faceType = res.data.data[0].type_name
      }
    });
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/" +
        this.personId +
        "/capture",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      if (res.data.code == 1000) {
        console.log(res.data.data)
        this.menology(res.data.data.record);
        //this.faceType = res.data.data[0].type_name
      }
    });
    /* 为了canvas图片跨域尝试 */
    this.$axios({
      method: "get",
      url:
        "http://" +
        this.url +
        ":9000/sjwl/webapi/person/" +
        this.personId +
        "/relation",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      if (res.data.code == 1000) {
        this.src2 = res.data.data.faceImage?res.data.data.faceImage:require("@static/image/person.png")
        res.data.data.friend.forEach((item, index) => {
          this.children.push({
            img: item.faceImage
              ? item.faceImage
              : require("@static/image/person.png"),
          })
        });
      }
    });
  },
  methods: {
    menology(record) {
     /*  var d = new Date();
      var month = d.getMonth();
      this.month = month + 1;
      var year = d.getFullYear();
      var week = new Date(year, month, 1).getDay(); //当前月一号是周几
      var dayNum = new Date(year, month, 0).getDate(); //获取当前月有几天
      var record = record.reverse();
      var status = true; */
      var records = []
      for(var i=0;i<record.monthDay.length;i++){
        records.push({
          capDay:record.monthDay[i],
          num:record.num[i]
        })
      }
       var d = new Date();
      var month = d.getMonth();
      this.month = month + 1;
      var year = d.getFullYear();
      var week = new Date(year, month, 1).getDay(); //当前月一号是周几
      for(var i=0;i<42;i++){
        if(i<week){
          this.list.push({
            capDay:null, 
            num: 0
          })
        }else if(i>(week-1)&&i<(records.length+week)){
          this.list.push(...records)
          i = i+records.length-1
        }else{
          this.list.push({
            capDay:null, 
            num: 0
          })
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.basicInformation {
  width: 620px;
  height: 944px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
/* .rightLogo {
  width: 123px;
  height: 14px;
  background: url(../../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
} */
.basicInformation {
  margin-top: 24px;
  .title {
    margin-top: 13px;
    margin-left: 10px;
    color: #333333;
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
.infoBox {
  width: 586px;
  height: 248px;
  background: #e0edf9;
  margin: 10px auto 0;
  overflow: hidden;
  border-radius: 4px;
  color: #333333;
  img {
    width: 90px;
    height: 110px;
    margin: 10px;
    float: left;
  }
  .leftText {
    float: left;
    width: 160px;
    margin-left: 20px;

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 10px;
    }
  }
  .rightText {
    float: left;
    width: 250px;
    margin-left: 20px;
    p {
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.bankName {
  li {
    width: 586px;
    padding-left: 26px;
    height: 40px;
    background: #e0edf9;
    margin: 10px auto 0;
    font-size: 16px;
    font-weight: 900;
    line-height: 40px;
    border-radius: 4px;
    color: #333333;
  }
}
.houseInfo {
  ul {
    width: 586px;
    padding-left: 26px;
    height: 78px;
    background: #e0edf9;
    margin: 10px auto 0;
    font-size: 14px;
    border-radius: 4px;
    overflow: hidden;
    li {
      width: 100%;
      margin-top: 12px;
      color: #333333;
      p {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-child(1) {
        width: 350px;
        margin-right: 20px;
      }
      p:nth-child(2) {
        width: 130px;
      }
    }
  }
}
.calendarBox {
  height: 475px;
  .theader {
    width: 100%;

    li {
      float: left;
      width: 14.28%;
      //background: blueviolet;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 900;
      color: #333333;
    }
  }
  .tbody {
    width: 100%;

    li {
      float: left;
      width: 14.28%;
      height: 60px;
      //background: chocolate;
      color: #333333;
    }
  }
}
.calendar {
  width: 95%;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  margin: 10px auto 0;
  //margin: 0 auto;
  li {
    background: #e0edf9;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    cursor: pointer;
    p:first-child {
      height: 40px;
      width: 100%;
      text-align: center;
      font-size: 16px;
      line-height: 40px;

      font-weight: 900;
    }
    p:last-child {
      height: 20px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      background: #3ba9e6;
    }
  }
}
</style>