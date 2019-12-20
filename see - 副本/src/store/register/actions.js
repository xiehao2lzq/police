//引入axios
import qs from "qs"
import axios from "axios"
export default{
   register({rootState,commit},param){
       axios.post("http://" +rootState.home.url+":9000/plat/login",JSON.stringify(param),{ headers: {
        'Content-Type':'application/json;charset=UTF-8; charset=UTF-8'
      }}).then(res=>{
          var data = res.data
          console.log(data)
          commit("REGISTER",data)//将数据提交给mutation
      })
   }
}