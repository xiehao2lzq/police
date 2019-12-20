<template>
  <div class="dealInfos">
    <div class="infoBox" >
      <p class="title" @click="gainXqInfo">请输入处理情况:</p>
      <div class="select">
        <el-select v-model="xqValue" placeholder="请选择小区">
          <el-option
            v-for="item in xqName"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="lgValue" placeholder="请选择楼号">
          <el-option
            v-for="item in lgList"
            :key="item.id"
            :label="item.name+'号楼'"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="dyValue" placeholder="请选择单元号">
          <el-option
            v-for="item in dyList"
            :key="item.id"
            :label="item.name+'单元'"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="fjValue" placeholder="请选择户号">
          <el-option
            v-for="item in fjList"
            :key="item.fjId"
            :label="item.fjName+'户'"
            :value="item.fjName"
          ></el-option>
        </el-select>
      </div>
      <div class="personInfo">
        <p class="yzInfo">
          <span>业主信息</span><br>
          <span style="margin-right:0.05rem">{{personName||"姓名"}}</span>
          <span>{{personTel||"联系方式"}}</span>
        </p>
        <el-input v-model="visitName" placeholder="来访人姓名"></el-input>
        <el-input v-model="visitPhone" placeholder="电话"></el-input>
      </div>
      <textarea name id cols="30" rows="10" v-model="value" placeholder="请录入..."></textarea>

      <div class="bottom">
        <button class="back">返回</button>
        <button class="save" @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import{mapActions,mapState} from "vuex"

export default {
  computed: {
    ...mapState({
      warning2: state => state.home.warning2
    }),
    ...mapState({
      clRen: state => state.home.clRen
    }),
    ...mapState({
      warnings2: state => state.home.warnings2
    }),
    ...mapState({
      xqName: state => state.home.xqName//小区名
    }),
    ...mapState({
      lgList:state=>state.home.lgList//楼号
    }),
    ...mapState({
      dyList:state=>state.home.dyList//单元号
    }),
    ...mapState({
      fjList:state=>state.home.fjList//具体房间信息
    })
  },
  watch: {
    //监听选中的小区
    xqValue(){
      this.gainLgList({xqID:this.xqValue})
      //循环找出选中的小区名
      this.xqName.forEach(item=>{
        if(item.id===this.xqValue){
          this.slxqName = item.name
        }
      })
      //将后面步骤设成空
      this.lgValue = "";
      this.dyValue = "";
      this.fjValue = "";
      this.personName = "";
      this.personTel = "";
    },
    //监听选中的楼号
    lgValue(){
      this.lgValue && this.gainDyList({lgID:this.lgValue})
      this.dyValue = "";
      this.fjValue = "";
      this.personName = "";
      this.personTel = "";
      //循环找出选中的楼号名
      this.lgValue && this.lgList.forEach(item=>{
        if(item.id===this.lgValue){
          this.lgName = item.name
          console.log(item.name)
        }
      })
    },
    //监听选中的单元
    dyValue(){
      this.dyValue && this.gainFjList({dyID:this.dyValue})
      this.fjValue = "";
      this.personName = "";
      this.personTel = "";
       //循环找出选中的单元名
      this.lgValue && this.dyList.forEach(item=>{
        if(item.id===this.dyValue){
          this.dyName = item.name
          console.log(item.name)
        }
      })
    },
    //监听选中的户
    fjValue(){
      //遍历找出来对应的电话，户主
     this.fjValue && this.fjList.forEach(item=>{
        if(item.fjName===this.fjValue){
          this.personName = item.personName
          this.personTel = item.personTel
          this.fjId = item.fjId
        }
      })
    }

  },
  data() {
    return {
      value:"",//录入信息
      visitName:"",//来访姓名
      visitPhone:"",//来访人电话
      xqValue: "",//选中的小区id
      slxqName:"",//选中的小区名
      lgValue:"",//选中的楼号id
      lgName:"",//选中的楼号
      dyValue:"",//单元号id
      dyName:"",//单元号
      fjValue:"",//具体房间号
      personName:"",//户主
      personTel:"",//电话
      fjId:"",//户主主键id
      input: ""
    };
  },
  methods: {
    submit() {
      
        var param = {
          keyID: this.warning2.id,
          xqID: "", //暂时传空
          clConn: this.value,
          clRen: this.clRen,
          fkName:this.visitName,
          fkTel:this.visitPhone,
          fjName:`${this.slxqName}${this.lgName}号楼${this.dyName}单元${this.fjValue}户`,
          fjId:this.fjId
        };
        if (this.value) {
          this.$store.dispatch("homeDealInfo", param);
          //将弹窗数组中的已处理的删除
          this.warnings2.forEach((item, index) => {
            if (item.id === this.warning2.id) {
              this.$store.state.home.warnings2.splice(index, 1);
            }
          });
        } else {
          alert("请输入处理内容");
        }
      
    },
     ...mapActions(
    ["gainXqInfo","gainLgList","gainDyList","gainFjList"]//解构出来action请求
  )
  },
  mounted () {
      this.gainXqInfo()
  }
};
</script>
<style lang="scss" scoped>
.infoBox {
  width: 30%;
  height: 33%;
  background: rgba($color: #000000, $alpha: 0.7);
  text-align: center;
  color: #00b7ee;
   position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #00b7ee;
}
.select {
  margin: 0.1rem 0;
  width: 95%;
  margin-left: 2.5%;
  height: 0.3rem;
  float: left;
  display: flex;
  justify-content: space-between;
}
p {
  float: left;
  margin: 0.1rem 0 0.1rem 0.2rem;
  font-size: 0.2rem;
  font-weight: 900;
}
.personInfo {
  float: left;
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-left: 2.5%;
  align-items: center;
  .yzInfo{
      width: 30%;
      span{
         float: left;
         font-size: 0.14rem;
         font-weight: normal;
      }
  }
}
textarea {
  float: left;
  width: 95%;
  height: 20%;
  background: rgba($color: #000000, $alpha: 0);
  outline: 0;
  margin-left: 2.5%;
  color: #00b7ee;
  border: 1px solid #00b7ee;
  border-radius: 0.1rem;
}
.bottom {
  margin: 0.1rem 0;
  width: 100%;
  justify-content: center;
  float: left;
}

.back {
  border: 0;
  color: #fff;
  width: 0.8rem;
  height: 0.3rem;
  margin-top: 0.05rem;
  background: #00b7ee;
}
.save {
  border: 0;
  color: #fff;
  width: 0.8rem;
  height: 0.3rem;
  //margin-top:0.1rem;
  background: #00b7ee;
}
.warning1 {
  background: #fc6536;
}
.primary1 {
  background: #00b7ee;
}

textarea::-webkit-input-placeholder {
  color: #00b7ee;
}
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #00b7ee;
}
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #00b7ee;
}
textarea:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #00b7ee;
}
</style>
