export default {
    HOME_DEAL_INFO(state,result){
        /* if(result==="操作成功"){
         state.success.unshift(result)
        }else{
          state.err.unshift(result)
        } */
      },
    GAIN_XQ_INFO(state,res){
     state.xqName = [];//小区的名存入vuex
     state.xqName = res
    },
    GAIN_LG_LIST(state,res){
      state.lgList = []//楼号
      state.lgList = res
    },
    GAIN_DY_LIST(state,res){
      state.dyList = []//单元号
      state.dyList = res
    },
    GAIN_FJ_LIST(state,res){
      state.fjList = []//具体房间号
      state.fjList = res
    },
    LOOK_MORE(state,res){
      state.xqList = res
    },
    handOver(state,res){
      //console.log(res)
      state.xqCode = res
    }
}