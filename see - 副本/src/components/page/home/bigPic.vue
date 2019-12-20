<template>
    <div class="background" @click="close" @mousewheel="bigOrLittle">
        <div class="picBox" :style="this.$route.name=='home'?style:style2">
            <img :src="bigImgUrl" alt="">
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    computed: {
      ...mapState({
          bigImgUrl:state=>state.home.bigImgUrl
      })  
    },
    data(){
        return{
            style:{
                width:1+"rem",
                height:1+"rem"
            },
            style2:{
                width:5+"rem",
                height:5+"rem"
            }
        }
    },
    methods: {
        close(){
             this.$store.state.home.bigPicIsshow = false//显示大照片
        },
        bigOrLittle(e){
            if(e.deltaY<0){
                if(this.style.width.replace(/rem/g,"")<3){
                    console.log(this.style.width.replace(/rem/g,""))
                    this.style.width = this.style.width.replace(/rem/g,"")*1 +1 + "rem"
                    this.style.height = this.style.height.replace(/rem/g,"")*1 +1 + "rem"
                }
               
            }else{
                if(this.style.width.replace(/rem/g,"")>1){
                    console.log(this.style.width.replace(/rem/g,""))
                    this.style.width = this.style.width.replace(/rem/g,"")*1 -1 + "rem"
                    this.style.height = this.style.height.replace(/rem/g,"")*1 -1 + "rem"
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .background{
        background: rgba($color: #fff, $alpha: 0.5)!important;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1000;
        .picBox{
            /* width: 2rem;
            height: 2rem; */
            position: absolute;
            top: 0;
            bottom: 0;
            left:0;
            right: 0;
            margin: auto;
        img{
            width: 100%;
            height: 100%;
        }
        }
    }
</style>
