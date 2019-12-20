<template>
  <div>
    <label></label>
    <!-- <div @click="qiehuan">切换</div> -->
    <div id="video"></div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: 'ckplayerPlugin',
  computed: {
    ...mapState({
      rtmpUrl:state=>state.realTimeMonitoring.rtmpUrl
    }),
     ...mapState({
      url:state=>state.realTimeMonitoring.url
    }),
  },
  data(){
    return{
      url2:"rtmp://10.10.100.216:1935/live/room",
      id:1
    }
  },
  methods: {
    qiehuan(){
      this.id++
    }
  },
  watch: {
    rtmpUrl(){
      //console.log(this.rtmpUrl)
      // 挂载完成后进行
      console.log(this.rtmpUrl)
    var _this = this
    var videoObject = {
                container: '#video', //容器的ID或className
                variable: 'player', //播放函数名称
                loaded: 'loadedHandler', //当播放器加载后执行的函数
                loop: true, //播放结束是否循环播放
                cktrack: '', //字幕文件
                poster: '', //封面图片
                preview: { //预览图片
                    file: [],
                    scale: 2
                },
                config: '', //指定配置函数
                debug: false, //是否开启调试模式
                drag: 'start', //拖动的属性
                seek: 0, //默认跳转的时间
                autoplay:true,//自动播放
               /*  //广告部分开始
                adfront: 'http://×××w.ckplayer.com/yytf/swf/front001.swf,http://×××w.ckplayer.com/yytf/swf/front002.swf', //前置广告
                adfronttime: '15,15',
                adfrontlink: '',
                adpause: 'http://×××w.ckplayer.com/yytf/swf/pause001.swf,http://×××w.ckplayer.com/yytf/swf/pause002.swf',
                adpausetime: '5,5',
                adpauselink: '',
                adinsert: 'http://×××w.ckplayer.com/yytf/swf/insert001.swf,http://×××w.ckplayer.com/yytf/swf/insert002.swf',
                adinserttime: '10,10',
                adinsertlink: '',
                inserttime: '10,80',
                adend: 'http://×××w.ckplayer.com/yytf/swf/end001.swf,http://×××w.ckplayer.com/yytf/swf/end002.swf',
                adendtime: '15,15',
                adendlink: '',
                //广告部分结束
                promptSpot: [ //提示点
                    {
                        words: '提示点文字01',
                        time: 30
                    },
                    {
                        words: '提示点文字02',
                        time: 150
                    }
                ], */
                video:_this.rtmpUrl//视频地址
            };
      // 定义一个对象
      var player = new ckplayer(videoObject);
    }
  },
  mounted(){
    // 挂载完成后进行
    var _this = this
    var videoObject = {
                container: '#video', //容器的ID或className
                variable: 'player', //播放函数名称
                loaded: 'loadedHandler', //当播放器加载后执行的函数
                loop: true, //播放结束是否循环播放
                cktrack: '', //字幕文件
                poster: '', //封面图片
                preview: { //预览图片
                    file: [],
                    scale: 2
                },
                config: '', //指定配置函数
                debug: false, //是否开启调试模式
                drag: 'start', //拖动的属性
                seek: 0, //默认跳转的时间
               /*  //广告部分开始
                adfront: 'http://×××w.ckplayer.com/yytf/swf/front001.swf,http://×××w.ckplayer.com/yytf/swf/front002.swf', //前置广告
                adfronttime: '15,15',
                adfrontlink: '',
                adpause: 'http://×××w.ckplayer.com/yytf/swf/pause001.swf,http://×××w.ckplayer.com/yytf/swf/pause002.swf',
                adpausetime: '5,5',
                adpauselink: '',
                adinsert: 'http://×××w.ckplayer.com/yytf/swf/insert001.swf,http://×××w.ckplayer.com/yytf/swf/insert002.swf',
                adinserttime: '10,10',
                adinsertlink: '',
                inserttime: '10,80',
                adend: 'http://×××w.ckplayer.com/yytf/swf/end001.swf,http://×××w.ckplayer.com/yytf/swf/end002.swf',
                adendtime: '15,15',
                adendlink: '',
                //广告部分结束
                promptSpot: [ //提示点
                    {
                        words: '提示点文字01',
                        time: 30
                    },
                    {
                        words: '提示点文字02',
                        time: 150
                    }
                ], */
                video:_this.rtmpUrl//视频地址
            };
      // 定义一个对象
      var player = new ckplayer(videoObject);
  }
}
</script>

<style scoped>
  #video {
    width: 100%;
    height: 5.4rem;
    margin: 0px auto;
  }
</style>