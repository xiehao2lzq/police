<template>
  <div class="bgImage">
    <div class="leftBox">
      <router-link :class="this.$route.name==='nameSearch'?'selected':''" tag="p" to='/nameSearch'>实名检索</router-link>
      <router-link :class="this.$route.name==='picSearch'?'selected':''" tag="p" to='/picSearch'>图片检索</router-link>
      <router-link :class="this.$route.name==='history'?'selected':''" tag="p" to='/history'>布控记录</router-link>
    </div>
    <img class="logo" @click="backHome" src="../../../static/bgImage/logo.png" alt />
    <div class="select case2">
      <p class="p1"></p>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="rightBox">
      <router-link :class="this.$route.name==='Setting'?'selected':''" tag="p" to='/Setting'>布控库设定</router-link>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
             options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        }
    },
    mounted () {
       
    },
    methods: {
       backHome(){
          this.$router.push({ path:'/'})
        }
    }
};
</script>

<style lang="scss" scoped>
.bgImage {
  background: url(../../../static/bgImage/headerBg.png);
  height: 84px;
  width: 1920px;
  position: relative;
}
.logo {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 15px auto 10px;
  cursor: pointer;
}
.case2 {
  background: url(../../../static/bgImage/case2.png);
  width: 315px;
  height: 56px;
  padding-left: 15px;
  padding-top: 11px;
  float: right;
  margin-left: 50px;
  margin-top: 6px;
  text-align: center;
  p1 {
    margin: 10px 6px;
  }
}
.leftBox {
  float: left;
  padding-left: 150px;
  p {
    float: left;
    font-size: 16px;
    width: 145px;
    height: 65px;
    text-align: center;
    line-height: 65px;
    cursor: pointer;
  }
}
.rightBox {
  float: right;
  p {
    float: left;
    font-size: 16px;
    width: 145px;
    height: 65px;
    text-align: center;
    line-height: 65px;
    cursor: pointer;
  }
}
.selected{
    background: url(../../../static/bgImage/selectBg.png);
}
</style>