<template>
    <div class="dealInfos" >
        <div :class="['infoBox',this.faceGroupName==='黑名单'?'warning':'primary']">
            <p class="title">请输入处理情况:</p>
            <span></span>
            <textarea :class="[this.faceGroupName==='黑名单'?'warning2':'primary2']" name="" id="" cols="30" rows="10" v-model="value" placeholder="请录入..."></textarea>
           <div class="bottom">
                <button class="back" :class="[this.faceGroupName==='黑名单'?'warning1':'primary1']">返回</button>
                <button class="save" :class="[this.faceGroupName==='黑名单'?'warning1':'primary1']" @click="submit">保存</button>
           </div>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            faceGroupName:state=>state.countrlHistory.faceGroupName//修改类型
        }),
        ...mapState({
            alarmId:state=>state.countrlHistory.alarmId//主键id
        }),
        ...mapState({
            clUser:state=>state.countrlHistory.clUser//小区id
        }),
        ...mapState({
            clUser:state=>state.countrlHistory.clUser
        }),
        ...mapState({
            faceTypeCode:state=>state.countrlHistory.faceTypeCode
        })
    },
    data(){
        return{
            value:""
        }
    },
    methods: {
        submit(){
            var param = {
                alarmId:this.alarmId,
                clUser:this.clUser,
                clContent:this.value,
                clUser:this.clUser,
                faceTypeCode:this.faceTypeCode
            }
            //console.log(param)
            if(this.value){
                this.$store.dispatch("submitDealInfo",param)
            }else{
                alert("请输入处理内容")
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .infoBox{
        width:6rem;
        height:35%;
        background:rgba($color: #000000, $alpha: 0.5);
        text-align: center;
       
    }
    .warning{
         color:#FC6536;
    }
    .primary{
        color:#00B7EE;
    }
    p{
        float:left;
        margin:0.1rem 0 0.1rem 0.2rem; 
    }
    textarea{
        width: 95%;
        height: 70%;
        background:rgba($color: #000000, $alpha: 0.1);
        margin-left: 2.5%;
    }
    .warning2{
         color:#FC6536;
         border: 1px solid #97482F;
    }
     .primary2{
          color:#00B7EE;
          border: 1px solid #00B7EE;
    }
     
    .back{
        
        border:0;
        color:#fff;
        width: 0.8rem;
        height: 0.3rem;
        margin-top:0.1rem;
    }
    .save{
        border:0;
        color:#fff;
         width: 0.8rem;
        height: 0.3rem;
        margin-top:0.1rem;
    }
    .warning1{
        background:#FC6536;
    }
    .primary1{
        background:#00B7EE;
    }
       .warning2::-webkit-input-placeholder{
            color:#FC6536;
        }
        .warning2::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#FC6536;
        }
        .warning2:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#FC6536;
        }
        .warning2:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#FC6536;
        }
     .primary2::-webkit-input-placeholder{
            color:#00B7EE;
        }
        .primary2::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#00B7EE;
        }
        .primary2:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#00B7EE;
        }
        .primary2:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#00B7EE;
        }
</style>
