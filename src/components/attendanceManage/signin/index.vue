<template>
  <section class="wrapper">
    <section class="top-content">
      <p class="title">签到注意事项</p>
      <p>1.蓝牙签到：打开蓝牙设置后，点击蓝牙签到，选择正在签到的老师即可签到成功。</p>
      <p>2.二维码签到：扫描动态二维码即可签到成功。</p>
      <p>3.照片签到：即为宿舍签到，在辅导员规定签到时间范围内，按照签到要求拍摄一张合照(在完善个人中心宿舍信息的前提下，同宿舍全体成员只需一人进行拍照操作即可)。</p>
    </section>
    <section class="btn-area">
      <p class="btn">蓝牙签到</p>
      <p @click="handleScanQRCode" class="btn">二维码签到</p>
      <p @click="$push({path: '/index/sign/photo', query: {name: '照片签到'}})" class="btn">照片签到</p>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {
  reloadTitleMixin, pushRouter
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {}
  },
  methods: {
    /**
     * [handleScanQRCode 二维码签到]
     * @method handleScanQRCode
     * @return {[type]}         [description]
     */
    handleScanQRCode(){
      wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      })
    },
  },
  created(){
    this.docTitle = '我要签到'
  },
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @base-background;

  .top-content{
    padding: .2rem;
    background-color: #fff;

    .title{
      margin-bottom: .2rem;
      font-size: .32rem;
    }

    p{
      font-size: .26rem;
      line-height: 1.7;
    }
  }

  .btn-area{
    margin: 50% 0;
  }
  .btn{
    width: 90vw;
    height: .8rem;
    margin-left: calc(50% - 45vw);
    margin-bottom: .4rem;
    background-color: @base-color;
    color: #fff;
    text-align: center;
    line-height: .8rem;
    border-radius: .1rem;
  }
}
</style>
