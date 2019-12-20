//引入axios
import axios from "axios"
import qs from "qs"
export default{
    //触发axios请求查找数据
    nameSearch({commit,rootState},param){//从state中解析出url
        axios.get("http://"+rootState.home.url+":9000/sjwl/manageport/face/track/list",{
            params:param,
           /*  headers:{
                Authorization:sessionStorage.getItem("Authorization")
            } */
        }).then(res=>{
            console.log(res)
            if(res.data.code==="1000"){
                var nameSearchData = res.data.data;
                console.log(nameSearchData)
                if(!nameSearchData){
                    rootState.home.err.unshift("数据解析失败")
                    commit("ERROR",res.data.msg)
                }
                if(!nameSearchData.list.length){
                    rootState.home.err.unshift("暂无数据")
                    commit("ERROR",res.data.msg)
                }
                commit("NAME_SEARCH",nameSearchData) //提交给mutation
            
            }else{
                rootState.home.err.unshift(res.data.msg)
                commit("ERROR",res.data.msg)
            } 
        })
    },
      //触发axios请求查找数据
      picSearch({commit,rootState},param){
        axios.post("http://"+  rootState.home.url +":9010/face/track/listByImg",qs.stringify(param)).then(res=>{
            if(res.data.code==="1000"){
                console.log(res.data.data)
                var picSearchData = res.data.data;
                //提交给mutation
                if(!picSearchData.list.length){
                    rootState.home.err.unshift("查无此人")
                    //关掉遮罩层
                    rootState.faceCountrl.loading = false 
                    rootState.faceCountrl.loading2 = false
                    rootState.faceCountrl.nextRequest = true
                    commit("ERROR",res.data.msg)
                }else{
                    commit("PIC_SEARCH",picSearchData)
                }
            }else{
                //alert(res.data.msg)
                //将错误抛出
                rootState.home.err.unshift(res.data.msg)
                commit("ERROR",res.data.msg)
            }   
        })
    }
}