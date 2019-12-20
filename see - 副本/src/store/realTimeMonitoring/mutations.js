export default {
    GAIN_VIDEO_LIST(state,list){
        state.list = list.list//设备列表
        state.tjOnline = list.tjOnline//在线数
        state.tjNotOnline = list.tjNotOnline//不在线数
        //console.log(list)
    },
    GAIN_VIDEO_URL(state,rtmpUrl){
        state.rtmpUrl = rtmpUrl//拉取的视频流地址
    }
}