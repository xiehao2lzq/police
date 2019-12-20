<template>
    <div class="list">
        <ul>
            <li @click="handOver(xqList.code,xqList.xqName)" v-for="xqList in xqLists" :key="xqList.code">{{xqList.xqName}}</li>
        </ul>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
    computed:{
        ...mapState({
            xqLists:state=>state.home.xqList
        })
    },
    methods: {
        //...mapMutations(["handOver"])
        handOver(param,name){
            this.$store.commit("handOver",param);
            this.$store.state.home.name = name;//所选择的小区名存入vuex
        }
    }
}
</script>
<style lang="scss" scoped>
    .list{
        width: 100%;
        height:9rem;
        position: absolute;
        z-index: 1000;
        
        ul{
            width: 7rem;
            height: 3.5rem;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            border:1px solid #37477f;
            background: #101737;
            li{
                height: 0.4rem;
                width: 20%;
                font-size: 0.16rem;
                font-weight: 900;
                border-right: 1px solid #37477f;
                border-bottom: 1px solid #37477f;
                cursor: pointer;
                float:left;
                text-align: center;
                line-height: 0.4rem;
            }
        }
    }
</style>

