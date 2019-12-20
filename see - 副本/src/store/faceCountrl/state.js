export default{
    tableData: [],//searchInfo数据
    faceImgUrl:"",//picBox数据
    capImgUrl:"",
    lineArr:[],
    positions:[],
    names:[1111],
    lines:[],
    mapCapImgUrl:[],
    capVideoUrl:"",//视频地址
    isshow:false,
    loading:false,//数据加载的遮罩层置否显示
    loading2:false,//地图部分的遮罩层
    nextRequest:true,//默认可以进行请求
    url:"http://10.10.5.221:9000/sjwl/manageport",
    capVUrl:"",//方案二视频ip
    capVedioBeginTime:"",//开始时间
    capDevChannel:"",//通道号
    center:[120.138674, 35.977766],//地图中心点
    xqCode:"",//小区识别码
    xqName:[],
    time:[]
}