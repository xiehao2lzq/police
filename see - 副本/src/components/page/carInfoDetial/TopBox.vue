<template>
    <div class="topBox">
        <div class="littleBox">
            <div class="title">
                >>车位数
            </div>
            <div class="all">
                {{carInfo.parkingNum}}
            </div>
            <div class="allnum">
                <div class="carNum">
                    车位总数
                </div>
                <ul>
                    <li v-for="(item,index) in num" :key="index">{{item}}</li>
                </ul>
            </div>
        </div>
        <div class="littleBox">
            <div class="title">
                >>车位数
            </div>
            <div class="num">
                <div class="left">
                    <p><span>进场 <br>{{carInfo.inNum}}</span></p>
                </div>
                <div class="right">
                    <p><span>出场 <br>{{carInfo.outNum}}</span></p>
                </div>
            </div>
        </div>
        <div class="littleBox">
            <div class="title">
                >>车位数
            </div>
            <div class="num">
                <div class="left2">
                    <p><span>陌生车辆 <br>{{carInfo.strangeNum}}</span></p>
                </div>
                <div class="right2">
                    <p><span>占道展示 <br>{{carInfo.jeevesNum}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex"

    export default {
        data () {
            return {
                carInfo:{},
                num:[]
            }
        },
        computed: {
          ...mapState({
              url:state=>state.home.url
          }),
          ...mapState({
              xqCode:state=>state.home.xqCode
          }) 
        },
        mounted () {
           this.$axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/car/overview",{
       params:{
           xqCode:this.xqCode,
           areaId:"0",
        },
    }).then(res=>{
        //console.log(res.data.data)
        this.carInfo = res.data.data
        this.num = (this.carInfo.parkingNum+"").split("")
        //console.log(this.num)
    })
        }
    }
</script>

<style lang="scss" scoped>
    .topBox{
        height: 1.6rem;
        width: 99%;
        margin:  auto;
        //background:red;
        display: flex;
        justify-content: space-between;
            }
    .littleBox{
        width: 33%;
        height: 100%;
        box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
        overflow: hidden;
    }
    .title{
        margin: 0.1rem 0 0.1rem 0.2rem;
        color: #68ABEF;
        font-size: 0.14rem;
        font-weight: 900;
    }
    .all{
        width: 1.2rem;
        height: 1.2rem;
        background:url(../../../../static/1.png) no-repeat;
        background-size: contain;
        margin: 0 0 0 1rem;
        text-align: center;
        line-height: 1.2rem;
        float: left;
        font-size: 0.25rem;
    }
    .allnum{
        float: left;
        height: 1.2rem;
        width: 3rem;
        margin-left: 0.8rem;
        .carNum{
            color: #68ABEF;
            font-size: 0.3rem;
            font-weight: 900;
            margin-left: 0.2rem;
        }
        ul{
            width: 100%;
            height: 0.8rem;
            overflow: hidden;
            padding-left: 0.2rem;
            li{
                width: 0.3rem;
                height: 0.5rem;
                margin:0.15rem 0.05rem;
                float: left;
                line-height: 0.5rem;
                text-align: center;
                font-weight: 900;
                font-size: 0.4rem;
                box-shadow: 0 0 0.05rem 0.05rem inset #596bbd91;
            }
        }
    }
    .num{
        width:100%;
        height: 1.2rem;
        //background: green;
        .right{
            width: 50%;
            height: 1.2rem;
            //background: gold;
            float: left;
            p{
                width: 1.2rem;
                height: 1.2rem;
                background:url(../../../../static/3.png) no-repeat;
                background-size: contain;
                text-align: center;
                overflow: hidden;
                margin: auto;
                span{
                    height: 0.5rem;
                    display: block;
                    margin-top: 0.3rem;
                    font-size: 0.2rem;
                    font-weight: 900;
                }
            }
        }
        .left{
            width: 50%;
            height: 1.2rem;
            //background: rgb(111, 0, 255);
            float: left;
             
            p{
                width: 1.2rem;
                height: 1.2rem;
                background:url(../../../../static/2.png) no-repeat;
                background-size: contain;
                text-align: center;
                overflow: hidden;
                margin: auto;
                span{
                    height: 0.5rem;
                    display: block;
                    margin-top: 0.3rem;
                    font-size: 0.2rem;
                    font-weight: 900;
                }
            }
        }
    }
     .right2{
            width: 50%;
            height: 1.2rem;
            //background: gold;
            float: left;
            p{
                width: 1.2rem;
                height: 1.2rem;
                background:url(../../../../static/5.png) no-repeat;
                background-size: contain;
                text-align: center;
                overflow: hidden;
                margin: auto;
                span{
                    height: 0.5rem;
                    display: block;
                    margin-top: 0.3rem;
                    font-size: 0.2rem;
                    font-weight: 900;
                }
            }
        }
        .left2{
            width: 50%;
            height: 1.2rem;
            //background: rgb(111, 0, 255);
            float: left;
             
            p{
                width: 1.2rem;
                height: 1.2rem;
                background:url(../../../../static/4.png) no-repeat;
                background-size: contain;
                text-align: center;
                overflow: hidden;
                margin: auto;
                span{
                    height: 0.5rem;
                    display: block;
                    margin-top: 0.3rem;
                    font-size: 0.2rem;
                    font-weight: 900;
                }
            }
        }
</style>