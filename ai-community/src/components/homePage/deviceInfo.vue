<template>
    <div class="deviceInfo">
         <div class="title">
            <img src="../../../static/bgImage/pointLeft.png" alt />
            <span>设备信息统计</span>
            <img src="../../../static/bgImage/pointRight.png" alt />
        </div>
        <div class="deviceInfoBox">
            <div id="deviceInfo1">

            </div>
        </div>
    </div>
</template>

<script>
    import G2 from "@antv/g2";
    export default {
        mounted() {
    var data = [{
    item: '事例一',
    count: 40,
    percent: 0.4
  }, {
    item: '事例二',
    count: 21,
    percent: 0.21
  }];
  
  var chart = new G2.Chart({
    container: 'deviceInfo1',
    forceFit: true,
    height: 150,
    padding:[20,20,20,20]
  });
  chart.source(data, {
    percent: {
      formatter: function formatter(val) {
        val = val * 100 + '%';
        return val;
      }
    }
  });
  chart.coord('theta');
  chart.tooltip({
    showTitle: false
  });
  chart.intervalStack().position('percent').color('item').label('percent', {
    offset: -15,
    // autoRotate: false,
    textStyle: {
      textAlign: 'center',
      shadowBlur: 2,
      shadowColor: 'rgba(255, 255, 255)',
      fill:'rgba(255, 255, 255)'
    }
  }).tooltip('item*percent', function(item, percent) {
    percent = percent * 100 + '%';
    return {
      name: item,
      value: percent
    };
  })
  chart.legend(false)
  chart.render();
  }
    }
</script>

<style lang="scss" scoped>
    .deviceInfo{
         width: 531px;
         height: 182px;
         background: url(../../../static/bgImage/right5.png);
         overflow: hidden;
          margin-top: 2px;
    }
    .title {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  font-size: 16px;
  img {
    display: inline-block;
  }
  text-align: center;
}
.deviceInfoBox{
    width: 33.3%;
    float: left;
}
</style>