export default {
  HISTORY_INFO(state, historyData) {
    var pageData = historyData.list;
    state.tableData = [];
    state.showInfo = {};
    if(!pageData.length){
      //alert("暂无数据")
      return false
    }
    console.log(historyData)
    pageData.forEach(item => {
      //console.log(item.alarmLevel)
      state.tableData.push({
        capImgUrl:item.capImgUrl,
        xqCode:item.xqCode,
        alarmId:item.alarmId,//主键ID
        NO: item.id,
        xqName: item.xqName,
        deviceAddr: item.deviceAddr,
        alarmTime: item.alarmTime,
        personName: item.personName,
        faceTypeName: item.faceTypeName,
        capVideoUrl: item.capVideoUrl,
        //alarmLevel:item.alarmLevel,
        clStatus: item.clStatus=== "0" ?"未处理":"已处理",//是否处理
        isSelect:false,
        faceTypeCode:item.faceTypeCode,
        capVUrl:item.capVUrl,//视频ip
        capVedioBeginTime:item.capVedioBeginTime,//开始时间
        capDevChannel:item.capDevChannel,//设别通道号
        xqCode:item.xqCode,//小区识别码
      });
    });
    state.totalPage = Math.ceil(historyData.totalRows/20);//总页数
    //state.currentPage = historyData.currentPage;//当前页
    state.totalRows = historyData.totalRows;//总条数
    state.currentPage = historyData.currentPage//当前页
  },
  SUBMIT_DEAL_INFO(state,result){
    if(result==="操作成功"){
      state.tableData[state.id-1].clStatus= "已处理"
      //console.log(rootState)
      state.tableData = [...state.tableData]
      //alert("保存成功")
    }
  }
}