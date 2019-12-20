<template>
  <div class="basicInformation">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>基础信息</span>
    </div>
    <div class="infoBox">
      <img :src="info.image" alt />
      <div class="leftText">
        <p>姓名：{{info.name}}</p>
        <p>手机号：{{info.phone}}</p>
        <p>证件类型：{{info.paperType}}</p>
        <p>出生日期：{{info.birthday}}</p>
        <p>婚姻状况：{{info.marriageStatus}}</p>
        <p>政治面貌：{{info.politicalStatus}}</p>
        <p>籍贯：{{info.orgionPlace}}</p>
        <p>职业：{{info.title}}</p>
      </div>
      <div class="rightText">
        <p>人员类型：{{info.personIdentityName}}</p>
        <p>邮件：{{info.email}}</p>
        <p>证件号码：{{info.paperNumber}}</p>
        <p>性别：{{info.sex}}</p>
        <p>教育程度：{{info.education}}</p>
        <p>民族：{{info.nation}}</p>
        <p>家庭住址：{{info.address}}</p>
      </div>
    </div>
    <div class="bankName">
      <div class="title clear">
        <p></p>
        <span>布控库标签</span>
      </div>
      <li>{{faceType}}</li>
    </div>
    <div class="houseInfo">
      <div class="title clear">
        <p></p>
        <span>房产信息</span>
      </div>
      <ul>
        <li class="clear">
          <p>房产地址：凤凰城8号楼2单元1001户</p>
          <p>人员类型：租户</p>
          <p>与房产关系：租住</p>
        </li>
        <li class="clear">
          <p>房产地址：凤凰城10号楼2单元1001户的王八蛋打死你个龟孙</p>
          <p>人员类型：业主</p>
          <p>与房产关系：自住</p>
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
          <li>
            <p>12-7</p>
            <p>抓拍7次</p>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{
      info:{},
      faceType:""
    }
  },
  computed: {
    ...mapState({
      personId: state => state.attentionPeople.personId
    }),
    ...mapState({
      selectedValue: state => state.homePage.selectedValue
    }),
    ...mapState({
      url: state => state.homePage.url
    })
  },
  created() {
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
      if(res.data.code==1000){
        this.info = res.data.data
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
      if(res.data.code==1000){
        this.faceType = res.data.data[0].type_name
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
      if(res.data.code==1000){
        //console.log(res)
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
        "/car",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      }
    }).then(res => {
      if(res.data.code==1000){
        //console.log(res)
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
      if(res.data.code==1000){
        //console.log(res)
        //this.faceType = res.data.data[0].type_name
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.basicInformation {
  width: 620px;
  height: 975px;
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
  background: url(../../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}
.basicInformation {
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
.infoBox {
  width: 586px;
  height: 258px;
  background: rgba(40, 42, 63, 1);
  margin: 10px auto 0;
  overflow: hidden;
  border-radius: 4px;
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
      margin-top: 10px;
    }
  }
  .rightText {
    float: left;
    width: 250px;
    margin-left: 20px;
    p {
      margin-top: 10px;
    }
  }
}
.bankName {
  li {
    width: 586px;
    padding-left: 26px;
    height: 40px;
    background: rgba(40, 42, 63, 1);
    margin: 10px auto 0;
    font-size: 16px;
    font-weight: 900;
    line-height: 40px;
    border-radius: 4px;
  }
}
.houseInfo {
  ul {
    width: 586px;
    padding-left: 26px;
    height: 78px;
    background: rgba(40, 42, 63, 1);
    margin: 10px auto 0;
    font-size: 14px;
    border-radius: 4px;
    overflow: hidden;
    li {
      width: 100%;
      margin-top: 12px;
      p {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-child(1) {
        width: 280px;
      }
      p:nth-child(2) {
        width: 130px;
      }
      p:nth-child(3) {
        width: 150px;
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
    }
  }
  .tbody {
    width: 100%;

    li {
      float: left;
      width: 14.28%;
      height: 65px;
      //background: chocolate;
    }
  }
}
.calendar {
  width: 95%;
  border-top: 2px solid #373a58;
  border-left: 2px solid #373a58;
  margin: 10px auto 0;
  //margin: 0 auto;
  li {
    background: rgba(40, 42, 63, 1);
    border-right: 2px solid #373a58;
    border-bottom: 2px solid #373a58;
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
      height: 23px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      line-height: 23px;
      background: #1f2133;
    }
  }
}
</style>