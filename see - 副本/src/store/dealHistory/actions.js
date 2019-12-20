//引入axios
import axios from "axios"
export default{
    //触发axios请求查找数据
    dealhistoryInfo({commit,rootState},param){
        rootState.dealHistory.loading = true//开启遮罩层
        axios.get("http://"+rootState.home.url+":9000/sjwl/manageport/face/alarmRecord/list",{params:param}).then(res=>{
            if(res.data.code==="1000"){
                var dealHistoryData = res.data.data;
                //console.log(dealHistoryData.list)
                if(!dealHistoryData.list.length){
                    rootState.home.err.unshift("暂无数据")
                }
                commit("DEAL_HISTORY_INFO",dealHistoryData)
            }else{
                rootState.home.err.unshift(res.data.msg)
                rootState.dealHistory.tableData = [];//清空数据
            }
            rootState.dealHistory.loading = false//关闭遮罩层
            
        })
    },
    gainOneInfo({commit,rootState},param){
        axios.get("http://"+rootState.home.url+":9000/sjwl/manageport/face/alarmRecord",{params:param}).then(res=>{
            if(res.data.code==="1000"){
                var oneInfo = res.data.data;
                //console.log(oneInfo)
                commit("GAIN_ONE_INFO",oneInfo)
            }else{
                rootState.home.err.unshift(res.data.msg)
            }
            
            //console.log(oneInfo)
            
            
        })
    }
}