<template>
  <section class="wrapper">

    <section class="form-area">
      <van-cell-group>
          <van-cell title="年度">
            <van-field class="my-field" placeholder="请选择年度" />
          </van-cell>
          <van-cell title="期刊等级">
            <span @click="handleOpenPopup(0)" class="c666" slot="right-icon">请选择期刊等级</span>
          </van-cell>
          <van-cell title="期刊名称">
            <van-field class="my-field" placeholder="请编辑期刊名称" />
          </van-cell>
          <van-cell title="题目">
            <van-field class="my-field" placeholder="请编辑题目" />
          </van-cell>
          <van-cell title="第几作者">
            <span @click="handleOpenPopup(1)" class="c666" slot="right-icon">请选择作者</span>
          </van-cell>
          <van-cell title="发表时间">
            <span @click="handleOpenPopup(2)" class="c666" slot="right-icon">请选择发表时间</span>
          </van-cell>
          <van-cell title="奖励分" value="1"></van-cell>
      </van-cell-group>
    </section>

    <section class="imgs-list flex flex-justify__between flex-align__center margin-tp__10">
      <van-uploader
        :after-read="(file) => {return uploadSuccess(file, index)}"
        style="text-align: center;"
        v-for="(item, index) in imgs" :key="index" >
        <img :src="item.url || defaultUpload" alt="upload">
        <p class="f14 c999">{{item.label}}</p>
      </van-uploader>
    </section>

    <van-popup
      v-model="isShowPopup"
      position="bottom">
      <van-picker
        v-if="[0, 1].includes(currIndex)"
        @cancel="isShowPopup = false"
        @confirm="handleChange"
        show-toolbar
        :columns="columns[currIndex]"
        value-key="label" >
      </van-picker>
      <van-datetime-picker
        @cancel="isShowPopup = false"
        @confirm="pickerConfirm"
        :min-date="new Date()"
        type="date">
      </van-datetime-picker>
    </van-popup>

    <my-button :childClick="handleSubmit" size="large" />

  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {formatTime} from '@/utils/global'
import MyButton from '@/views/forms/button'
export default {
  props: {},
  name: '',
  components: {
    MyButton,
  },
  computed: {},
  data(){
    return {
      isShowPopup: false,
      currIndex: -1,
      form: {},
      defaultUpload: require('@/assets/imgs/icon-upload.png'),
      columns: [
        [
          {label: 'aa', value: 1}
        ],
        [
          '第一作者','第二作者','第三作者','第四作者','第五作者','第六作者','第七作者','第八作者'
        ]
      ],

      imgs: [
        {
          label: '封面图片',
          url: '',
        },
        {
          label: '目录图片',
          url: '',
        },
        {
          label: '内容图片',
          url: '',
        }
      ]
    }
  },
  methods: {
    uploadSuccess(file, index){
      let formData = new FormData()
      formData.append('file', file.file)
      window.axois({
        method: 'post',
        url: window.rootPath + '/upload/uploadImg',
        data: formData
      }).then(res => {
        window.$toast.clear()
        this.imgs[index].url = res.data.msg
      })
    },
    handleOpenPopup(index){
      this.isShowPopup = true
      this.currIndex = index
    },
    handleChange(e){
      console.log(e)
    },
    pickerConfirm(e){
      console.log(formatTime(e, false))
    },
    handleSubmit(){
      console.log('is ok 111')
    }
  },
  created(){}
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  .my-field{
    padding: 0;
    color: #666;
  }
  img[alt="upload"]{
    width: 2rem;
    height: 2rem;
  }
  .imgs-list{
    padding: .2rem;
  }
}
</style>
