<template>
  <section class="wrapper">
      <section class="box-content">
        <p class="flex">
          <img src="../../../assets/imgs/icon-voice.png" alt="message">
          照片签到要求:
        </p>
        <p class="margin-tp__10">
          {{info.command}}
        </p>
      </section>

      <section class="box-content">
        <p class="flex">
          <img src="../../../assets/imgs/icon-camera.png" alt="camera">
          上传照片:
        </p>
        <van-uploader
         :after-read="handleSuceess"
         class="my-uploader" >
          <img :src="imgUrl || defaultAvatar" alt="icon-photo">
        </van-uploader>
        <p @click="handleSubmit" class="btn-submit">立即上传</p>
      </section>

      <section class="box-content">
        <p class="flex">
          <img src="../../../assets/imgs/icon-camera.png" alt="camera">
          我的照片签到
        </p>
        <my-list-item
          v-for="(item, index) in info.list"
          :key="index">
            <img :src="item.photo || defaultImage" alt="logo" slot="left" >
            <div class="">
              <p>宿舍考勤</p>
              <p>{{item.time}}</p>
            </div>
          <span slot="right" style="margin-right: .3rem;" :class="stateColorArr[item.status]" >{{stateArr[item.status]}}</span>
        </my-list-item>
      </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin} from '@/utils/mixin'
import MyListItem from '@/views/layout/listItem'
import MyList from '@/views/layout/list'

const stateArr = ['审核中', '签到', '请假', '旷到']
const stateColorArr = ['base', 'signin1', 'signin3', 'signin4']

export default {
  props: {},
  name: '',
  components: {
    MyListItem,
    MyList
  },
  computed: {},
  data(){
    return {
      stateArr,
      stateColorArr,
      info: {},

      imgUrl: '',
      defaultImage: require('@/assets/imgs/logo.png'),
      defaultAvatar: require('@/assets/imgs/icon-photo.png'),
    }
  },
  methods: {
    ...mapActions({
      'GetPhotoSignList': 'GetPhotoSignList',
      'PostPhotoSign': 'PostPhotoSign'
    }),
    /**
     * [handleSuceess 上传图片]
     * @method handleSuceess
     * @param  {[type]}      file [description]
     * @return {[type]}           [description]
     */
    handleSuceess(file){
      let formData = new FormData()
      formData.append('file', file.file)
      window.axois({
        method: 'post',
        url: window.rootPath + '/upload/uploadImg',
        data: formData
      }).then(res => {
        window.$toast.clear()
        this.imgUrl = res.data.msg
      })
    },

    /**
     * [handleSubmit 立即上传签到表单]
     * @method handleSubmit
     * @return {[type]}     [description]
     */
    handleSubmit(){
      let form = {
        id: this.query.id,
        img: this.imgUrl
      }
      this.PostPhotoSign({form}).then(res => {
        if(!res.error){
          setTimeout(() => {
            this.fetchData()
          }, 1000)
        }
      })
    },
    /**
     * [fetchData 获取签到的要求的和签到列表]
     * @method fetchData
     * @return {[type]}  [description]
     */
    fetchData(){
      this.GetPhotoSignList({id: this.query.id}).then(res => {
        this.info = res
      })
    }
  },
  created(){
    this.fetchData()
  },
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
img[alt='icon-photo']{
  width: 2rem;
  height: 2rem;
}
.base{
  color: #ffab34;
}
.signin1{
  color: @base-color;
}
.signin3{
  color: #5c76fc;
}
.signin4{
  color: #ff3d3d;
}


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
