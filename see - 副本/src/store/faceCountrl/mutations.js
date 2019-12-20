
export default {
    NAME_SEARCH(state,nameSearchData){
      //console.log(nameSearchData)
       //searchInfo模块数据
        state.tableData = [];//先清空上次数据
        state.mapCapImgUrl = []
        state.lineArr = [];
        state.positions = [];
        state.names = [];
        state.lines = [];
        state.faceImgUrl = ""
        if(!nameSearchData){
          state.loading = false//关掉列表的遮罩层
          state.loading2 = false//关掉列表的遮罩层
          state.nextRequest = true//可以再次请求
          //alert("数据解析错误")
          return false
        }
        //如果没有数据就组织后续，并弹出提示
        if(!nameSearchData.list.length){
          state.loading = false//关掉列表的遮罩层
          state.loading2 = false//关掉列表的遮罩层
          state.nextRequest = true//可以再次请求
          //alert("暂无数据")
          return false
        }
        nameSearchData.list.forEach(item => {
            state.tableData.push({
              NO: item.id,
              name: item.personName,
              time: item.capTime,
              deviceAddr: item.deviceAddr,
              capVideoUrl: item.capVideoUrl,
              capImgUrl: item.capImgUrl,
              isSelect:false,
              capVUrl:item.capVUrl,//视频ip
              capVedioBeginTime:item.capVedioBeginTime,//开始时间
              capDevChannel:item.capDevChannel,//设别通道号
              xqCode:item.xqCode,//小区识别码
            });
            //此条数据为地图部分点击加载照片使用
            state.mapCapImgUrl.push(item.capImgUrl)
          });
       //picbox的数据
       state.faceImgUrl = nameSearchData.list.length?nameSearchData.list[0].faceImgUrl:"";
       state.capImgUrl = "";
       //地图的数据
       state.lineArr = [];
       state.positions = [];
       state.names = [];
       state.lines = [];
       state.xqName = [];
       state.time = [];
       nameSearchData.list.forEach(item => {
        state.lineArr.push(item.deviceLocation.split(","));
        state.names.push(item.deviceName);
        state.positions.push(item.deviceLocation.split(","));
        state.xqName.push(item.xqName) 
        state.time.push(item.capTime)
      });
      state.center = [...nameSearchData.center.split(",")]//地图中心点
      //按时间逆序
      var primaryLines = state.lineArr.reverse();
      //处理坐标
      if(primaryLines.length){
        for(var i=0;i<primaryLines.length-1;i++){
          if(primaryLines[i][0]===primaryLines[i+1][0]){
            primaryLines.splice(i,1)
            i--;
          }
        }
        for(var i=0;i<primaryLines.length-1;i++){
          if(primaryLines[0][0]===primaryLines[i+1][0]){
            primaryLines[i+1][0]= ((primaryLines[i+1][0]*99/100)+(primaryLines[i][0]/100)).toFixed(6)
            primaryLines[i+1][1]= ((primaryLines[i+1][1]*99/100)+(primaryLines[i][1]/100)).toFixed(6)
          }
        }
      }
      state.lines = [...primaryLines];
      state.loading = false//关掉列表的遮罩层
      state.nextRequest = true//可以再次请求
    },
    PIC_SEARCH(state,picSearchData){
        state.tableData = [];//先清空上次数据
        state.mapCapImgUrl = []
        state.lineArr = [];
        state.positions = [];
        state.names = [];
        state.lines = [];
        state.faceImgUrl = ""
       //state.center = picSearchData.center//地图的中心点
       picSearchData.list.length && picSearchData.list.forEach(item => {
           state.tableData.push({
             NO: item.id,
             name: item.personName,
             time: item.capTime,
             deviceAddr: item.deviceAddr,
             capVideoUrl: item.capVideoUrl,
             capImgUrl: item.capImgUrl,
             isSelect:false,
             capVUrl:item.capVUrl,//视频ip
             capVedioBeginTime:item.capVedioBeginTime,//开始时间
             capDevChannel:item.capDevChannel,//设别通道号
             xqCode:item.xqCode,//小区识别码
           });
           //此条数据为地图部分点击加载照片使用
           state.mapCapImgUrl.push(item.capImgUrl)
         });
      //picbox的数据
      state.faceImgUrl = picSearchData.list.length?picSearchData.list[0].faceImgUrl:"";
      state.capImgUrl = "";
      //地图的数据
      state.lineArr = [];
      state.positions = [];
      state.names = [];
      state.lines = [];
      state.xqName = [];
      state.time = [];
      picSearchData.list.forEach(item => {
       state.lineArr.push(item.deviceLocation.split(","));
       state.names.push(item.deviceName);
       state.positions.push(item.deviceLocation.split(","));
       state.xqName.push(item.xqName) 
       state.time.push(item.capTime)
     });
     state.center = [...picSearchData.center.split(",")]//地图中心点
     
     //按时间逆序
     var primaryLines = state.lineArr.reverse();
     //处理坐标
     if(primaryLines.length){
       for(var i=0;i<primaryLines.length-1;i++){
         if(primaryLines[i][0]===primaryLines[i+1][0]){
           primaryLines.splice(i,1)
           i--;
         }
       }
       for(var i=0;i<primaryLines.length-1;i++){
         if(primaryLines[0][0]===primaryLines[i+1][0]){
           primaryLines[i+1][0]= ((primaryLines[i+1][0]*99/100)+(primaryLines[i][0]/100)).toFixed(6)
           primaryLines[i+1][1]= ((primaryLines[i+1][1]*99/100)+(primaryLines[i][1]/100)).toFixed(6)
         }
       }
     }
     state.lines = [...primaryLines];
     state.loading = false//关掉列表的遮罩层
     state.loading2 = false//关掉列表的遮罩层
     state.nextRequest = true//可以再次请求
   },
   ERROR(state,msg){
    state.loading = false//关掉列表的遮罩层
    state.loading2 = false//关掉列表的遮罩层
    state.nextRequest = true//可以再次请求
    console.log(222)
    state.tableData = [];//失败后清空上次数据
    state.mapCapImgUrl = []
    state.lineArr = [];
    state.positions = [];
    state.names = [];
    state.lines = [];
    state.faceImgUrl = "";
    state.capImgUrl = "";
    //alert(msg)
    return false
   }
}