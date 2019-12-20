<template>
  <div>
    <div class="popWindow1" :style="style" v-if="item.type==1">
      <li class="clear">
        <i class="el-icon-error" @click="deleteNode(item)"></i>
        <div class="header clear">
          <i class="el-icon-warning"></i>
          <span>发现{{item.groupName}}</span>
        </div>
        <div class="body_info clear">
          <div class="imgBox">
            <img :src="item.img" alt />
            <p>抓拍信息</p>
          </div>
          <div class="textInfo">
            <p>
              库名称:
              <span>{{item.groupName}}</span>
            </p>
            <p>
              车牌号:
              <span>{{item.carNum}}</span>
            </p>
            <p>
              出现地点:
              <span>{{item.location }}</span>
            </p>
            <p>
              抓怕时间:
              <span>{{item.captureTimeStr}}</span>
            </p>
          </div>
        </div>
        <div class="footer_button">
          <button class="outLook" @click="deleteNode(item)">忽略</button>
          <button class="deal">立即处理</button>
        </div>
      </li>
    </div>

    <div class="popWindow2" :style="style" v-if="item.type==2">
      <li class="clear">
        <i class="el-icon-error" @click="deleteNode(item)"></i>
        <div class="header clear">
          <i class="el-icon-warning"></i>
          <span>发现{{item.groupName}}</span>
        </div>
        <div class="body_info clear">
          <div class="leftBox clear">
            <span>{{item.similar}}%</span>
            <div class="imgBox">
              <img :src="item.img" alt />
              <p>抓拍信息</p>
            </div>
            <div class="imgBox">
              <img :src="item.libraryImg" alt />
              <p>人脸库信息</p>
            </div>
          </div>
          <div class="textInfo">
            <p>
              库名称:
              <span>{{item.groupName}}</span>
            </p>
            <p>
              姓名:
              <span>{{item.personName}}</span>
            </p>
            <p>
              出现地点:
              <span>{{item.location}}</span>
            </p>
            <p>
              抓怕时间:
              <span>{{item.captureTimeStr}}</span>
            </p>
          </div>
        </div>
        <div class="footer_button">
          <button class="outLook" @click="deleteNode(item)">忽略</button>
          <button class="deal">立即处理</button>
        </div>
      </li>
    </div>

    <div class="popWindow3" :style="style" v-if="item.type==3">
      <li class="clear">
        <i class="el-icon-error" @click="deleteNode(item)"></i>
        <div class="header clear">
          <i class="el-icon-warning"></i>
          <span>发现{{item.groupName}}</span>
        </div>
        <div class="body_info clear">
          <div class="imgBox">
            <img :src="item.img" alt />
            <p>抓拍信息</p>
          </div>
          <div class="textInfo">
            <p>
              库名称:
              <span>{{item.groupName}}</span>
            </p>
            <p>
              车牌号:
              <span>{{item.carNum}}</span>
            </p>
            <p>
              出现地点:
              <span>{{item.location}}</span>
            </p>
            <p>
              抓怕时间:
              <span>{{item.captureTimeStr}}</span>
            </p>
          </div>
        </div>
        <div class="footer_button">
          <button class="outLook" @click="deleteNode(item)">忽略</button>
          <button class="deal">立即处理</button>
        </div>
      </li>
    </div>

      <div class="popWindow4" :style="style" v-if="item.type==4">
    <li class="clear">
      <i class="el-icon-error" @click="deleteNode(item)"></i>
      <div class="header clear">
        <i class="el-icon-warning"></i>
        <span>发现{{item.groupName}}</span>
      </div>
      <div class="body_info clear">
        <div class="leftBox clear">
          <span>{{item.similar}}%</span>
          <div class="imgBox">
            <img :src="item.img" alt />
            <p>抓拍信息</p>
          </div>
          <div class="imgBox">
            <img :src="item.libraryImg" alt />
            <p>人脸库信息</p>
          </div>
        </div>
        <div class="textInfo">
          <p>
            库名称:
            <span>{{item.groupName}}</span>
          </p>
          <p>
            姓名:
            <span>{{item.personName}}</span>
          </p>
          <p>
            出现地点:
            <span>{{item.location}}</span>
          </p>
          <p>
            抓怕时间:
            <span>{{item.captureTimeStr}}</span>
          </p>
        </div>
      </div>
      <div class="footer_button">
        <button class="outLook" @click="deleteNode(item)">忽略</button>
        <button class="deal">立即处理</button>
      </div>
    </li>
  </div>
  
  <div class="popWindow5" :style="style" v-if="item.type==5">
    <li class="clear">
      <i class="el-icon-error" @click="deleteNode(item)"></i>
      <div class="header clear">
        <i class="el-icon-warning"></i>
        <span>发现{{item.groupName}}</span>
      </div>
      <div class="body_info clear">
        <div class="leftBox clear">
          <span>{{item.similar}}%</span>
          <div class="imgBox">
            <img :src="item.img" alt />
            <p>抓拍信息</p>
          </div>
          <div class="imgBox">
            <img :src="item.libraryImg" alt />
            <p>人脸库信息</p>
          </div>
        </div>
        <div class="textInfo">
          <p>
            库名称:
            <span>{{item.groupName}}</span>
          </p>
          <p>
            车牌号:
            <span>{{item.carNum}}</span>
          </p>
          <p>
            出现地点:
            <span>{{item.location}}</span>
          </p>
          <p>
            抓怕时间:
            <span>{{item.captureTimeStr}}</span>
          </p>
        </div>
      </div>
      <div class="footer_button">
        <button class="outLook" @click="deleteNode(item)">忽略</button>
        <button class="deal">立即处理</button>
      </div>
    </li>
  </div>

  <div class="popWindow6" :style="style" v-if="item.type==6">
    <li class="clear">
       <i class="el-icon-error" @click="deleteNode(item)"></i>
      <div class="header clear">
        <i class="el-icon-warning"></i>
        <span>发现{{item.groupName}}</span>
      </div>
      <div class="body_info clear">
        <div class="imgBox">
          <img :src="item.img" alt />
          <p>抓拍信息</p>
        </div>
        <div class="textInfo">
          <p>
            库名称:
            <span>{{item.groupName}}</span>
          </p>
          <p>
            车牌号:
            <span>{{item.carNum}}</span>
          </p>
          <p>
            出现地点:
            <span>{{item.location}}</span>
          </p>
          <p>
            抓拍时间:
            <span>{{item.captureTimeStr}}</span>
          </p>
        </div>
      </div>
      <div class="footer_button">
        <button class="outLook">忽略</button>
        <button class="deal">立即处理</button>
      </div>
    </li>
  </div>

   <div class="popWindow7" :style="style" v-if="item.type==7">
    <li class="clear">
       <i class="el-icon-error" @click="deleteNode(item)"></i>
      <div class="header clear">
        <i class="el-icon-warning"></i>
        <span>发现流浪动物</span>
      </div>
      <div class="body_info clear">
        <div class="imgBox">
          <img :src="item.img" alt />
          <p>抓拍信息</p>
        </div>
        <div class="textInfo">
          <p>
            事件类型:
            <span>{{item.eventName}}</span>
          </p>
          <p>
            抓拍设备:
            <span>{{item.location}}</span>
          </p>
          <p>
            抓拍时间:
            <span>{{item.captureTimeStr}}</span>
          </p>
        </div>
      </div>
      <div class="footer_button">
        <button class="outLook" @click="deleteNode(item)">忽略</button>
        <button class="deal">立即处理</button>
      </div>
    </li>
  </div>

  <div class="popWindow8" :style="style" v-if="item.type==8">
    <li class="clear">
       <i class="el-icon-error" @click="deleteNode(item)"></i>
      <div class="header clear">
        <i class="el-icon-warning"></i>
        <span>车辆占据消防通道</span>
      </div>
      <div class="body_info clear">
        <div class="imgBox">
          <img :src="item.img" alt />
          <p>抓拍信息</p>
        </div>
        <div class="textInfo">
          <p>
            事件类型:
            <span>{{item.eventName}}</span>
          </p>
          <p>
            出现地点:
            <span>{{item.location}}</span>
          </p>
          <p>
            抓拍时间:
            <span>{{item.captureTimeStr}}</span>
          </p>
        </div>
      </div>
      <div class="footer_button">
        <button class="outLook" @click="deleteNode(item)">忽略</button>
        <button class="deal">立即处理</button>
      </div>
    </li>
  </div>

  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  props: ["item"],
  data() {
    return {
      style: {
        right: -500 + "px"
      }
    };
  },
  mounted() {
    var right = -500;
    var timer = setInterval(() => {
      this.style.right = right + "px";
      if (right === 0) {
        clearInterval(timer);
      }
      right += 50;
    }, 100);
  },
  methods: {
    ...mapMutations(['deleteNode'])
  }
};
</script>

<style lang="scss" scoped>
.popWindow7,.popWindow8,
.popWindow6,.popWindow5{
  background: #FAF7E5!important;
}
.popWindow4,.popWindow3{
   background: #F8D8B5!important;
}
.popWindow8,
.popWindow7,
.popWindow6,
.popWindow3,
.popWindow1 {
  width: 500px;
  height: 260px;
  background: #ffc2b2;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  right: -260px;
  margin-top: 10px;
  li > i {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #f56c6c;
    cursor: pointer;
  }
  .header {
    width: 100%;
    margin: 10px 0 0 150px;
    color: #000000;
    span {
      font-size: 20px;
      display: block;
      float: left;
    }
    i {
      display: block;
      float: left;
      margin: 0 5px;
      color: #f56c6c;
      font-size: 30px;
    }
  }
  .body_info {
    .imgBox {
      width: 106px;
      height: 126px;
      float: left;
      margin: 15px 30px 10px 80px;
      img {
        width: 106px;
        height: 106px;
        float: left;
      }
      p {
        width: 106px;
        height: 20px;
        float: left;
        background: #3ba9e6;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .textInfo {
      float: left;
      margin: 15px 0px 10px 0px;
      p {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #101737;
        margin-top: 12px;
      }
    }
  }
  .footer_button {
    width: 100%;
    margin-top: 20px;
    text-align: right;
    button {
      width: 100px;
      height: 30px;
      border-radius: 5px;
      margin-right: 20px;
    }
    .outLook {
      border: 1px solid rgba(59, 169, 230, 1);
      background: rgba(240, 240, 240, 1);
      outline: 0;
      color: #000000;
    }
    .deal {
      background: #3ba9e6;
      outline: 0;
      border: 0;
      color: #ffffff;
    }
  }
}

.popWindow5,.popWindow4,.popWindow2 {
  width: 500px;
  height: 260px;
  background: #ffc2b2;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  right: -260px;
  margin-top: 10px;

  li > i {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #f56c6c;
    cursor: pointer;
  }

  .header {
    width: 100%;
    margin: 10px 0 0 150px;
    color: #000000;
    span {
      font-size: 20px;
      display: block;
      float: left;
    }
    i {
      display: block;
      float: left;
      margin: 0 5px;
      color: #f56c6c;
      font-size: 30px;
    }
  }
  .body_info {
    .leftBox {
      float: left;
      margin: 15px 10px 0px 10px;
      position: relative;
      span {
        display: block;
        width: 58px;
        height: 58px;
        background: #ffffff;
        border: 1px solid rgba(59, 169, 230, 1);
        border-radius: 50%;
        position: absolute;
        line-height: 58px;
        text-align: center;
        color: #000000;
        font-size: 20px;
        left: 83px;
        top: 30px;
      }
    }
    .imgBox {
      width: 106px;
      height: 126px;
      float: left;
      margin-right: 10px;
      img {
        width: 106px;
        height: 106px;
        float: left;
      }
      p {
        width: 106px;
        height: 20px;
        float: left;
        background: #3ba9e6;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .textInfo {
      float: left;
      margin: 15px 0px 10px 0px;
      p {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #101737;
        margin-top: 12px;
      }
    }
  }
  .footer_button {
    width: 100%;
    margin-top: 20px;
    text-align: right;
    button {
      width: 100px;
      height: 30px;
      border-radius: 5px;
      margin-right: 20px;
    }
    .outLook {
      border: 1px solid rgba(59, 169, 230, 1);
      background: rgba(240, 240, 240, 1);
      outline: 0;
      color: #000000;
    }
    .deal {
      background: #3ba9e6;
      outline: 0;
      border: 0;
      color: #ffffff;
    }
  }
}
</style>