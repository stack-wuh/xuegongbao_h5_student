<template>
  <section class="content-wrapper flex flex-flow__col">
    <!-- <section class="img-wrapper">
      <img :src="defaultImg" alt="img">
      <p>未上传照片</p>

      <van-uploader :after-read="onRead" style="width: 100%; height: 100%;">
        <van-icon name="photograph" />
      </van-uploader>
    </section> -->
    <van-uploader class="img-wrapper"
     :after-read="handleImgSuccess">
      <img :src="uploadImg || defaultImg" alt="img">
      <p v-if="!uploadImg">未上传照片</p>
    </van-uploader>
    <section v-if="uploadImg" class="btn-area">
      <my-button text="上传" :childClick="handleClickParent" size="large"></my-button>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyButton from '@/views/forms/button'
import {reloadTitleMixin} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyButton
  },
  computed: {},
  data(){
    return {
      docTitle: '上传图片',
      defaultImg: require('@/assets/imgs/center/img.png'),

      uploadImg: '',
    }
  },
  methods: {
    handleClickParent(){
      console.log('is clicked')
    },
    handleImgSuccess(file){
      this.uploadImg = file.content
      console.log(file)
    }
  },
  created(){},
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.content-wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @base-background;
  .img-wrapper, .btn-area{
    width: 100vw;
    height: 50vh;
  }
  .img-wrapper{
    padding: .4rem;
    padding-bottom: .8rem;
    overflow: hidden;
    text-align: center;
    color: #ccc;
    background-color: #fff;
    box-sizing: border-box;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
