<template>
  <section class="wrapper">
      <section class="box-content">
        <p class="flex">
          <img src="../../../assets/imgs/icon-voice.png" alt="message">
          照片签到要求:
        </p>
        <p class="margin-tp__10">
          this is details
        </p>
      </section>

      <section class="box-content">
        <p class="flex">
          <img src="../../../assets/imgs/icon-camera.png" alt="camera">
          上传照片:
        </p>
        <van-uploader class="my-uploader" >
          <img src="../../../assets/imgs/icon-photo.png" alt="icon-photo">
        </van-uploader>
        <p class="btn-submit">立即上传</p>
      </section>

      <section class="box-content">
        <p class="flex">
          <img src="../../../assets/imgs/icon-camera.png" alt="camera">
          我的照片签到
        </p>
        <my-list-item v-for="item in 2" :key="item">
          <img src="../../../assets/imgs/logo.png" alt="logo" slot="left" >
          <div class="">
            <p>宿舍考勤</p>
            <p>2018-09-05</p>
          </div>
          <span slot="right" style="margin-right: .3rem;" >签到</span>
        </my-list-item>
      </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyListItem from '@/views/layout/listItem'
import MyList from '@/views/layout/list'
export default {
  props: {},
  name: '',
  components: {
    MyListItem,
    MyList
  },
  computed: {},
  data(){
    return {}
  },
  methods: {},
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @base-background;

  img[alt='message'], img[alt = 'camera']{
      width: .3rem;
      height: .3rem;
      margin-right: .1rem;
  }

  img[alt="logo"]{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .2rem;
  }

  .box-content{
    width: 100vw;
    padding: .3rem;
    margin-bottom: .2rem;
    background-color: #fff;
    box-sizing: border-box;
  }

  .btn-submit{
    width: 90vw;
    height: .6rem;
    margin-top: .2rem;
    color: #fff;
    background-color: @base-color;
    line-height: .6rem;
    text-align: center;
  }

  .my-uploader{
    width: 2rem;
    height: 2rem;
    margin-left: calc(50% - 1rem);
    border: 1px dotted #eee;
    text-align: center;
    line-height: 2rem;
  }


}

</style>
