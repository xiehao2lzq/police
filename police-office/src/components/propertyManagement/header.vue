<template>
  <div class="header">
    <img class="logo" src="@static/image/logo.png" @click="back" alt="">
    <!-- <div class="select case2" v-if="this.$route.name=='propertyManagementHomePage'">
      <p class="p1"></p>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in selectedArr"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </div> -->
    <div class="select case3">
      <div class="back-btn" @click="$router.go(-1)">
        返回
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return {
        value: ''
      }
    },
    computed: {
      ...mapState({
        selectedArr: state => state.commonData.selectedArr
      }),
      ...mapState({
        url: state => state.commonData.url
      })
    },
    methods: {
      back () {
        this.$router.push('/')
      }
    },
    watch: {
      value () {
        //this.$store.state.commonData.selectedValue = this.value
      },
      selectedArr () {
        this.value = this.selectedArr[0].value
        console.log(this.selectedArr)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    background: url(../../../static/image/headerBg.png);
    height: 100px;
    width: 1920px;
    position: relative;
    overflow: hidden;
  }

  .logo {
    margin-top: 25px;
    margin-left: 30px;
    cursor: pointer;
  }

  .p1 {
    margin: 6px 6px;
  }

  .case2 {
    width: 271px;
    height: 52px;
    background: url(../../../static/image/selectBox2.png);
    overflow: hidden;
    position: absolute;
    right: 20px;
    top: 25px;


  }

  .case3 {
    width: 130px;
    height: 52px;
    background: no-repeat url(../../../static/image/back.png);
    overflow: hidden;
    position: absolute;
    right: 20px;
    top: 25px;
    .back-btn {
      height: 100%;
      display: flex;
      padding-top: 15px;
      justify-content: center;
      cursor: pointer;
    }
  }
</style>
