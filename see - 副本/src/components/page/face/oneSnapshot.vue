<template>
    <li :style="style" >
        <div class="img">
              <img :src="snapshotRecord.capImgPath" alt />
        </div>
        <div class="adress">{{snapshotRecord.devName}}</div>
        <div class="time">{{snapshotRecord.capTime.split(" ")[1]}}</div>
        <div class="type">{{snapshotRecord.personName}}</div>
    </li>
</template>
<script>
export default {
    props: ["snapshotRecord"],
    data(){
        return{
            style:{
            opacity:0     
        }
        }
    },
    mounted () {
        if(this.snapshotRecord.isActive){//根据isActive动态判断是否有动画
      var timeer = setInterval(() => {
        this.style.opacity = this.style.opacity + 0.2;
        if (this.style.opacity >= 1) {
          clearInterval(timeer);
        }
      }, 150);
    }else{
        this.style.opacity = 1;
    }
    }
}
</script>
<style lang="scss" scoped>
    li {
      margin: 0.11rem 0.1rem;
      height: 1.68rem;
      width: 1.15rem;
      border: 2px solid #0c75b5;
      display: inline-block;
      .img {
        width: 100%;
        text-align: center;
        margin: 0.05rem 0;
        height: 1rem;
        display: flex;
        justify-content: center;
        img {
          height: 100%;
          width: 0.78rem;
          display: block;
        }
      }
      .time,
      .adress,
      .type {
        text-align: center;
        height: 0.18rem;
        line-height: 0.18rem;
        font-size: 0.12rem;
        overflow: hidden; 
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
                        
      }
    }
</style>
