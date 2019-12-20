<template>
    <div class="faceContrasts">
        <h3 class="title">
            >>人脸库对比
        </h3>
        <div class="contrastWindow">
            <ul>
                <ContrastWindow v-for="contrastWindow in contrastWindows" :key="contrastWindow.id" :contrastWindow="contrastWindow"/>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
import ContrastWindow from "./contrastWindow"
export default {
    components: {
      ContrastWindow  
    },
    computed: {
    ...mapState({
      contrastWindows:state=>state.realTimeMonitoring.contrastWindows//取出从socket推送的数据
    }),
  },
  
}
</script>
<style lang="scss" scoped>
    .faceContrasts{
        width:28%;
        height: 8rem;
        box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
        float: left;
        margin: 0.1rem 0 0 0.1rem;
        
    }
    .title{
        margin:0.15rem 0.2rem;
        color:#68ABEF;
    }
   .contrastWindow{
        width: 100%;
        height: 7.2rem;
        overflow: hidden;
        ul{
            width: 100%;
            height: 7rem;
            overflow: auto;
             .firstWarning{
                    border:2px solid #FC6536;
                }
             .special{
                    border:2px solid #00B7EE;
            }
            
        }
    }
</style>
