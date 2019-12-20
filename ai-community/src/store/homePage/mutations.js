export default {
    LOGIN(state,res){
        if(res.code==="0100"){//登录成功
            //state.success++ //成功提示
            var Authorization = `Bearer ${res.data.access_token}`
            var userId = res.data.userId
            sessionStorage.setItem("Authorization",Authorization)//token本地缓存
            sessionStorage.setItem("userId",userId)
        }else{//登录失败
            //state.fail++//失败提示
        }
    },
    GAIN_XQ_LIST(state,res){
        state.selectedArr = []
        state.selectedArr.push({
           name:res[0].subdistrictName,
           value:""
        })
        res[0].xqList.forEach(item=>{
            state.selectedArr.push({
                name:item.xqName,
                value:item.xqCode
             })
        })
    }
}