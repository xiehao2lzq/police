//引入axios
import qs from "qs"
import axios from "axios"
export default{
   gainVideoList({rootState,commit},param){
       axios.get("http://"+rootState.home.url+":9000/sjwl/manageport/capture",{params:param}).then(res=>{
           if(res.data.code==="1000"){
               commit("GAIN_VIDEO_LIST",res.data.data)
           }else{
            rootState.home.err.unshift(res.data.msg)//抛错
           }
       })
   },


   //紧急备选方案
   gainVideoUrl({rootState,commit},param){
       //console.log(param,111)
       axios.get(/* "http://"+rootState.home.url+":9010/video" */"http://10.10.5.222:8980/windaka/api/video",{params:param}).then(res=>{
           //console.log(res)
           if(res.data.code==="1000"){
               //console.log(res)
               commit("GAIN_VIDEO_URL",res.data.rtmpUrl)
           }else{
               rootState.home.err.unshift(res.data.msg)//抛错
           }
       })
   },
   gainVideoUrl2({rootState,commit},param){
    //console.log(param,111)
    axios.get("http://"+rootState.home.url  +":9010/video" ,{params:param}).then(res=>{
        //console.log(res)
        if(res.data.code==="1000"){
            //console.log(res)
            commit("GAIN_VIDEO_URL",res.data.data.rtmpUrl)
        }else{
            rootState.home.err.unshift(res.data.msg)//抛错
        }
    })
},


   closeVideoUrl({rootState},param){
       //console.log(param,222)
    axios.delete("http://"+rootState.home.url  +":9010/video",{params:param}).then(res=>{
       // console.log(res)
        if(res.data.code==="1000"){
            //rootState.home.success.unshift(res.data.msg+"已关闭上个视频")
        }else{
            rootState.home.err.unshift(res.data.msg)//抛错
        }
    })
},
}