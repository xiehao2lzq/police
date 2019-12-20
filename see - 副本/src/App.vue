<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: 'App',
  methods: {
    isshow(){
      if(this.$store.state.register.Authorization==="Bearer "&& this.$route.name==="register"){
        return true
      }else{
        return false
      }
    },
     //element-ui弹窗
    open2() {
      //console.log(this.success)
        this.$message({
          message: this.success[0],
          type: 'success'
        });
      },
    open4() {
        this.$message.error(this.err[0]);
      }
  },
  computed: {
    ...mapState({
      success:state=>state.home.success
    }),
    ...mapState({
      err:state=>state.home.err
    })
  },
  watch:{
    success(){
      this.open2()
    },
    err(){
      this.open4()
    }
  }
}
</script>

<style>
#app {
 display: flex;
 justify-content: center;
 align-items: center;
}
</style>
