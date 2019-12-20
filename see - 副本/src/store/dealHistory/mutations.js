export default {
  DEAL_HISTORY_INFO(state, historyData) {
    var pageData = historyData.list;
    state.tableData = [];
    pageData.forEach(item => {
      state.tableData.push({
        NO: item.id,
        xqName: item.xqName,
        deviceAddr: item.deviceAddr,//抓拍地点
        alarmTime: item.alarmTime,//时间
        personName: item.personName,
        faceTypeName: item.faceTypeName,//人脸库类型
        faceTypeCode:item.faceTypeCode,//人脸库类型编号
        capVideoUrl: item.capVideoUrl,//视频地址
        capImgUrl:item.capImgUrl,//抓拍照片地址
        xqCode:item.xqCode,
        alarmId:item.alarmId,//主键ID
        clTime:item.clTime,//处理时间
        faceTypeCode:item.faceTypeCode,
        isSelect:false,
        capVUrl:item.capVUrl,//视频ip
        capVedioBeginTime:item.capVedioBeginTime,//开始时间
        capDevChannel:item.capDevChannel,//设别通道号
        xqCode:item.xqCode,//小区识别码
      });
    });
    state.totalPage = Math.ceil(historyData.totalRows/20);//总页数
    state.currentPage = historyData.currentPage;//当前页
    state.totalRows = historyData.totalRows;//总条数
  },
  GAIN_ONE_INFO(state,oneInfo){
    state.gainOneInfo = null;//清空上次数据
    state.gainOneInfo = oneInfo;//将详细信息存入vuex
    //console.log(oneInfo)
    state.isshow2 = true;
  }
}