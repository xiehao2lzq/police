<template>
  <div class="popWindow1" :style="style">
    <li class="clear">
       <i class="el-icon-error" @click="deleteNode(item)"></i>
      <div class="header clear">
        <i class="el-icon-warning"></i>
        <span>车辆占据消防通道</span>
      </div>
      <div class="body_info clear">
        <div class="imgBox">
          <img src="@static/image/1.png" alt />
          <p>抓拍信息</p>
        </div>
        <div class="textInfo">
          <p>
            库名称:
            <span>犯罪库</span>
          </p>
          <p>
            车牌号:
            <span>鲁B12345</span>
          </p>
          <p>
            出现地点:
            <span>凤凰城小区</span>
          </p>
          <p>
            抓怕时间:
            <span>2019/12/31 12:31:13</span>
          </p>
        </div>
      </div>
      <div class="footer_button">
        <button class="outLook">忽略</button>
        <button class="deal">立即处理</button>
      </div>
    </li>
  </div>
</template>

<script>
export default {
    props: ["item"],
    data () {
    return {
      style:{
        right:-500+'px'
      }
    }
  },
  mounted () {
    var right =-500
   var timer = setInterval(()=>{
     
      this.style.right = right+'px'
      if(right === 0){
        clearInterval(timer)
      }
      right +=50
    },100)
  },
  methods: {
    deleteNode(item){
      console.log(item)
    }
  }
    
};
</script>

<style lang="scss" scoped>
.popWindow1 {
   width: 500px;
  height: 260px;
  background: #FAF7E5;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  right: -260px;
  margin-top:15px;
}
li>i{
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    color:#f56c6c;
    cursor: pointer;
  }
.header{
    width: 100%;
    margin:10px 0 0 150px;
    color: #000000;
    span{
        font-size: 20px;
        display: block;
        float: left;
    }
    i{
        display: block;
        float: left;
        margin:0 5px;
        color:#f56c6c;
        font-size: 30px;
    }
}
.body_info{
    .imgBox{
        width: 106px;
        height: 126px;
        float: left;
        margin: 15px 30px 10px 80px;
        img{
            width: 106px;
            height: 106px;
            float: left;
        }
        p{
            width: 106px;
            height: 20px;
            float: left;
            background: #3BA9E6;
            line-height: 20px;
            font-size: 14px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .textInfo{
        float: left;
        margin: 15px 0px 10px 0px;
        p{
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #101737;
            margin-top: 12px;
        }
    }
}
.footer_button{
    width: 100%;
    margin-top:20px;
    text-align: right;
    button{
        width: 100px;
        height: 30px;
        border-radius:5px;
        margin-right: 20px;
    }
    .outLook{
        border:1px solid rgba(59, 169, 230, 1);
        background: rgba(240,240,240,1);
        outline: 0;
        color:#000000;
    }
    .deal{
        background:#3BA9E6;
        outline: 0;
        border: 0;
        color: #ffffff;
    }
}
</style>