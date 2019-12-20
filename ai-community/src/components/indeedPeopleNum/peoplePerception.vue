<template>
  <div class="peoplePerception">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>人员感知</span>
    </div>
    <div class="selected2 clear">
      <div class="selectedBox">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <ul class="type">
        <p class="selectedType">常住</p>
        <p >流动人口</p>
        <p >陌生人</p>
      </ul>
    </div>
    <div class="showBox">
        <li v-for="item in show" :key="item.index">
           <img :src="item.image" alt="">
           <span>{{item.SenseNum}}</span>
           <div class="infoBox">
               <p>名称：{{item.personName}}</p>
               <p>房产：{{item.houseName}}</p>
               <p>人员类型：{{item.personType}}</p>
           </div>
        </li>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      options: [
        {
          value: "day",
          label: "本日"
        },
        {
          value: "month",
          label: "本月"
        }
      ],
      value: "day",
      Flow:[],
      Permanent:[],
      Stranger:[],
      show:[]
    };
  },
  watch:{
    value(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/person/sense",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId: "",
        timeType:this.value
      }
    }).then(res => {
      //console.log(res)
     if(res.data.code==1000){
       var data = res.data.data;
       this.Flow = data.Flow;
       this.Permanent = data.Permanent;
       this.Stranger = data.Stranger;
       var _this = this
       switch($(".peoplePerception .selectedType").text()){
              case "流动人口":
                _this.show = _this.Flow;
                console.log(_this.show)
                break;
                 case "陌生人":
                _this.show = _this.Stranger;
                console.log(_this.show)
                break;
                 case "常住":
                _this.show = _this.Permanent;
                console.log(_this.show)
                break;
            }
         this.$forceUpdate()   
     }
    });
    }
  },
  computed: {
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
      url: "http://" + this.url + ":9000/sjwl/webapi/person/sense",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId: "",
        timeType:this.value
      }
    }).then(res => {
     if(res.data.code==1000){
      // console.log(res)
        var data = res.data.data;
       this.Flow = data.Flow;
       this.Permanent = data.Permanent;
       this.Stranger = data.Stranger;
       this.show = this.Permanent
     }
    });
  },
mounted () {
    var _this = this
     $('.type p').click(function(){
            $('.type p').removeClass('selectedType');
            $(this).addClass('selectedType');
            //console.log($(this).text())
            switch($(this).text()){
              case "流动人口":
                _this.show = _this.Flow;
                break;
                 case "陌生人":
                _this.show = _this.Stranger;
                break;
                 case "常住":
                _this.show = _this.Permanent;
                break;
            }
        })
}
};
</script>

<style lang="scss" scoped>
.peoplePerception {
  width: 516px;
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
.peoplePerception {
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
.selected2{
    margin: 10px 0 10px 10px;
}
.selected2 ul {
  width: 348px;
  height: 32px;
  background: #4b57b6;
  border-radius: 4px;
  float: left;
  overflow: hidden;
  p {
    width: 116px;
    float: left;
    height: 100%;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }
}
.selectedBox{
    float: left;
    margin-right: 15px;
}
.selectedType{
    background: #4896F7;
}
.showBox{
    height: 400px;
    overflow: hidden;
}
.showBox li{
    width: 482px;
    height: 122px;
    background: #282A3F;
    background-image: url(../../../static/bgImage/triangle.png);
    background-position:top right;
    background-repeat: no-repeat;
    margin: 10px auto;
    position: relative;
    span{
      position: absolute;
      top: 3px;
      right: 5px;
    }
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
            margin-top: 18px;
        }
    }
}
</style>