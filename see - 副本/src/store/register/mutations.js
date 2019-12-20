export default {
    REGISTER(state,res){
        if(res.code==="0100"){//登录成功
            state.success++ //成功提示
            var Authorization = `Bearer ${res.data.access_token}`
            console.log(res)
            var userId = res.data.userId
            //console.log(Authorization)
            sessionStorage.setItem("Authorization",Authorization)//token本地缓存
            sessionStorage.setItem("userId",userId)
            //console.log(sessionStorage.getItem('Authorization'))
            //console.log(res.data.access_token)
        }else{//登录失败
            state.fail++//失败提示
        }
    }
}