//引入axios
import qs from "qs"
import axios from "axios"
export default{
    //提交处理数据
    homeDealInfo({commit,rootState},param){
        axios.put("http://"+rootState.home.url+":9000/sjwl/manageport/face/alarmRecord",qs.stringify(param),{
            headers:{
                "contentType": "application/json; charset=utf-8",
            }}).then(res=>{
            console.log(res.data)
            if(res.data.status==="1000"){
                var historyData = res.data.data;
                //提交给mutation
                console.log(res.data)
                if(res.data.msg==="操作成功"){
                    rootState.home.success.unshift("处理成功")
                }
                commit("HOME_DEAL_INFO",historyData)
            }else{
               
                rootState.home.err.unshift(res.data.msg) //错误弹窗
               
            } 
        })
    },
    /* //获取小区
    gainXqInfo({commit}){
        axios.get("http://10.10.5.26:9002/windaka/api/getXqList").then(res=>{
            if(res.data.success){
                   //提交给mutation
            commit("GAIN_XQ_INFO",res.data.data)
            }else{
                alert(res.data.errMsg)
            }
        })
    },
    //获取楼号
    gainLgList({commit},param){
        axios.get("http://10.10.5.26:9002/windaka/api/getLgList",{params:param}).then(res=>{
            if(res.data.success){
                   //提交给mutation
            commit("GAIN_LG_LIST",res.data.data)
            }else{
                alert(res.data.errMsg)
            }
        })
    },
    //获取单元号
    gainDyList({commit},param){
        axios.get("http://10.10.5.26:9002/windaka/api/getDyList",{params:param}).then(res=>{
            if(res.data.success){
                   //提交给mutation
            commit("GAIN_DY_LIST",res.data.data)
            }else{
                alert(res.data.errMsg)
            }
        })
    },
    //获取具体房间号
    gainFjList({commit},param){
        axios.get("http://10.10.5.26:9002/windaka/api/getFjList",{params:param}).then(res=>{
            if(res.data.success){
                   //提交给mutation
            commit("GAIN_FJ_LIST",res.data.data)
            }else{
                alert(res.data.errMsg)
            }
        })
    }, */
    //获取小区列表
    lookMore({commit,rootState}){
        axios.get("http://"+rootState.home.url+":9000/sjwl/manageport/xq/list",{
            params:{
                page:1,
                limit:1000,
                areaId:0
            }
        }).then(res=>{
            
            if(res.data.code==="1000"){
                commit("LOOK_MORE",res.data.data.list)
                //console.log(res.data.data.list)
            }
            
        })
    }
}