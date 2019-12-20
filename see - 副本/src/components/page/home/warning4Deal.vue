<template>
  <div class="dealInfos">
    <div :class="['infoBox',this.type==='4'?'warning':'primary']">
      <p class="title">请输入处理情况:</p>
      <span></span>
      <textarea
        :class="[this.type==='4'?'warning2':'primary2']"
        name
        id
        cols="30"
        rows="10"
        v-model="value"
        placeholder="请录入..."
      ></textarea>
      <div class="bottom">
        <button class="back" :class="[this.type==='4'?'warning1':'primary1']">返回</button>
        <button class="save" :class="[this.type==='4'?'warning1':'primary1']" @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      type: state => state.home.type//数据库取出类型
    }),
    ...mapState({
      warning4: state => state.home.warning4//当前要处理的信息
    }),
    ...mapState({
      warning3: state => state.home.warning3
    }),
     ...mapState({
      warning2: state => state.home.warning2
    }),
    ...mapState({
      clRen: state => state.home.clRen//处理人
    }),
    ...mapState({
      warnings4: state => state.home.warnings4//所有的要处理的信息
    }),
    ...mapState({
      warnings3: state => state.home.warnings3
    }),
    ...mapState({
      warnings2: state => state.home.warnings2
    })
  },
  data() {
    return {
      value: ""//录入信息
    };
  },
  methods: {
    submit() {
      if (this.type === "4") {
        var param = {
          alarmId: this.warning4.id,
          xqCode: this.warning4.xqCode, //暂时传空
          clContent: this.value,
          clUser: this.clRen,
          faceTypeCode: this.warning4.alarmLevel
        };
        if (this.value) {
          this.$store.dispatch("homeDealInfo", param);
          //将弹窗数组中的已处理的删除
          this.warnings4.forEach((item,index) => {
              if(item.id===this.warning4.id){
                  this.$store.state.home.warnings4.splice(index,1)
              }
          });
        } else {
          alert("请输入处理内容");
        }
      }else if (this.type === "3"){
           var param = {
          alarmId: this.warning3.id,
          xqCode: this.warning3.xqCode, //暂时传空
          clContent: this.value,
          clUser: this.clRen,
          faceTypeCode: this.warning3.alarmLevel
        };
        if (this.value) {
          this.$store.dispatch("homeDealInfo", param);
          //将弹窗数组中的已处理的删除
           this.warnings3.forEach((item,index) => {
              if(item.id===this.warning3.id){
                  this.$store.state.home.warnings3.splice(index,1)
              }
          });
        } else {
          alert("请输入处理内容");
        }
      }else{//陌生人和车辆一起处理
        var param = {
          alarmId: this.warning2.id,
          xqCode: this.warning2.xqCode, //暂时传空
          clContent: this.value,
          clUser: this.clRen,
          faceTypeCode: this.warning2.alarmLevel
        };
        //console.log(param)
        if (this.value) {
          this.$store.dispatch("homeDealInfo", param);
          //将弹窗数组中的已处理的删除
           this.warnings2.forEach((item,index) => {
              if(item.id===this.warning2.id){
                  this.$store.state.home.warnings2.splice(index,1)
              }
          });
        } else {
          alert("请输入处理内容");
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.infoBox {
  width: 30%;
  height: 33%;
  background: rgba($color: #000000, $alpha: 0.5);
  text-align: center;
   position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #00b7ee;
}
.warning {
  color: #fc6536;
}
.primary {
  color: #00b7ee;
}
p {
  float: left;
  margin: 0.1rem 0 0.1rem 0.2rem;
  font-size: 0.2rem;
  font-weight: 900;
}
textarea {
  width: 95%;
  height: 70%;
  background: rgba($color: #000000, $alpha: 0.1);
  margin-left: 2.5%;
  border-radius: 0.1rem;
}
.bottom {
  margin-bottom: 0.2rem;
}
.warning2 {
  color: #fc6536;
  border: 1px solid #97482f;
}
.primary2 {
  color: #00b7ee;
  border: 1px solid #00b7ee;
}

.back {
  border: 0;
  color: #fff;
  width: 0.8rem;
  height: 0.3rem;
  margin-top: 0.05rem;
}
.save {
  border: 0;
  color: #fff;
  width: 0.8rem;
  height: 0.3rem;
  //margin-top:0.1rem;
}
.warning1 {
  background: #fc6536;
}
.primary1 {
  background: #00b7ee;
}
.warning2::-webkit-input-placeholder {
  color: #fc6536;
}
.warning2::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fc6536;
}
.warning2:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fc6536;
}
.warning2:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fc6536;
}
.primary2::-webkit-input-placeholder {
  color: #00b7ee;
}
.primary2::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #00b7ee;
}
.primary2:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #00b7ee;
}
.primary2:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #00b7ee;
}
</style>
