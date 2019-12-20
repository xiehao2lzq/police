<template>
    <div class="liBox" :style="style">
        <li>
          <img :src="item.img" alt="">
          <p v-if="item.name"><span>姓&ensp;&ensp;&ensp;&ensp;名:</span>{{item.name}}</p>
           <p v-else><span>车&ensp;&ensp;&ensp;&ensp;牌:</span>{{item.carNum}}</p>
          <p><span>出入地点:</span>{{item.xqName}}</p>
          <p><span>抓拍时间:</span>{{item.time}}</p>
        </li>
    </div>
</template>

<script>
    export default {
        props: ["item"],
        data () {
            return {
                style:{
                    width:"0px"
                }
            }
        },
        mounted () {
            var width = 0
            var _this = this
            var timer = setInterval(() => {
                _this.style.width = width+'px'
                if(width==230){
                    clearInterval(timer)
                }
                 width +=23
            }, 100);
            
        }
    }
</script>

<style lang="scss" scoped>
.liBox{
    position: relative;
    margin: 0px 10px;
    height: 300px !important;
    float: left;
}
    li {
      width: 230px;
      height: 300px !important;
      background: #E0EDF9;
      overflow: hidden;
      position: absolute;
      right: 0;
      img{
        width:208px;
        height: 180px;
        margin: 10px auto 0;
      }
      p{
        margin-top:10px;
        margin-left:10px;
        color:#333333;
        span{
          margin-right: 10px;
        }
      }
    }
</style>