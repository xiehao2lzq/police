//引入axios
import qs from "qs"
import axios from "axios"
export default{
    Login({rootState,commit}){//伪登录
        axios.post("http://" +rootState.homePage.url+":9000/plat/login",{
            "username":'admin',
            "password":'admin',
            "verifyCode":"1234"
          }).then(res=>{
            if(res.data.code=="0100"){
              var data = res.data
              commit("LOGIN",data)//将数据提交给mutation
            }else{
              rootState.homePage.errorMsg.unshift(res.data.msg)
            }
      })
    },
    gainXqList({rootState,commit}){
        axios({
            method: 'get',
            url:"http://" +rootState.homePage.url+":9000/sjwl/webapi/subdistrict/xq",
            headers:{
              "Authorization":sessionStorage.getItem("Authorization"),
            }
          }).then(res=>{
            if(res.data.code=="1000"){
              var data = res.data
              //console.log(data)
              commit("GAIN_XQ_LIST",res.data.data)//将数据提交给mutation
            }else{
              rootState.homePage.errorMsg.unshift(res.data.msg)
            }
          });
    }
}