//引入axios
import qs from "qs"
import axios from "axios"
export default{
    //触发axios请求查找数据
    historyInfo({commit,rootState},param){
        //console.log(rootState.home.url)
        rootState.countrlHistory.loading = true//开启遮罩层
        axios.get("http://"+rootState.home.url+":9000/sjwl/manageport/face/alarmRecord/list",{
            params:param
        }).then(res=>{
            console.log(res.data)
            if(res.data.status==="1000"){
                var historyData = res.data.data;
                //提交给mutation
                //console.log(historyData)
                if(!historyData.list.length){
                    rootState.home.err.unshift("暂无数据")
                }
                commit("HISTORY_INFO",historyData)
            }else{
                rootState.home.err.unshift(res.data.msg)//弹窗信息
                rootState.countrlHistory.tableData = [];//清空数据
            } 
            rootState.countrlHistory.loading = false//关闭遮罩层
            rootState.countrlHistory.showInfo = {}
        })
    },
    submitDealInfo({commit,rootState},param){
        axios.put("http://"+rootState.home.url+":9000/sjwl/manageport/face/alarmRecord",qs.stringify(param),{
            headers:{
                "contentType": "application/json; charset=utf-8",
            }
        }).then(res=>{
            //var result = res.data.data;
            console.log(res)
            if(res.data.status==="1000"){
                 //提交给mutation
            if(res.data.msg==="操作成功"){
                rootState.home.success.unshift("处理成功")
                
            }
            commit("SUBMIT_DEAL_INFO",res.data.msg)
            }else{
                rootState.home.err.unshift("保存失败")
            }  
        })
    },
}