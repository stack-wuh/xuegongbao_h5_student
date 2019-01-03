<template>
  <section class="wrapper">

    <section class="form-area">
      <van-cell-group>
          <van-cell title="年度">
            <span @click="handleOpenPopup(0)" class="c666" slot="right-icon">{{form.years || '请选择年度'}}</span>
          </van-cell>
          <van-cell title="期刊等级">
            <span @click="handleOpenPopup(1)" class="c666" slot="right-icon">{{form.name || '请选择期刊等级'}}</span>
          </van-cell>
          <van-cell title="期刊名称">
            <van-field class="my-field" v-model='form.journal' placeholder="请编辑期刊名称" />
          </van-cell>
          <van-cell title="题目">
            <van-field class="my-field" v-model="form.title" placeholder="请编辑题目" />
          </van-cell>
          <van-cell title="第几作者">
            <span @click="handleOpenPopup(2)" class="c666" slot="right-icon">{{form.author || '请选择作者'}}</span>
          </van-cell>
          <van-cell title="发表时间">
            <span @click="handleOpenPopup(3)" class="c666" slot="right-icon">{{form.pubtime || '请选择发表时间'}}</span>
          </van-cell>
          <van-cell title="奖励分" :value="form.score"></van-cell>
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
        v-if="[0, 1, 2].includes(currIndex)"
        @cancel="isShowPopup = false"
        @confirm="handleChange"
        show-toolbar
        :columns="pickerList"
        value-key="label" >
      </van-picker>
      <van-datetime-picker
        v-else
        @cancel="isShowPopup = false"
        @confirm="handleChange"
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
  computed: {
    // 返回新的picker列表
    pickerList(){
      return this.columns[this.currIndex]
    }
  },
  data(){
    return {
      isShowPopup: false,
      currIndex: -1,
      form: {
        years: '',
        journal: '',
        title: '',
        author: '',
        pubtime: '',
        score: '',
        caia_id: '',
        name: '',
        type_: 'thesis'
      },
      defaultUpload: require('@/assets/imgs/icon-upload.png'),
      columns: [
        ['2018-2019'],
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
    ...mapActions({
      'GetYearList': 'GetYearList',
      'GetThesisList' : 'GetThesisList',
      'PostAwardSubForThesis' : 'PostAwardSubForThesis'
    }),
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
      switch(this.currIndex){
        case 0 : this.form.years = e
          break;
        case 1: this.form.name = e.label, this.form.caia_id = e.id, this.form.score = e.value
          break;
        case 2: this.form.author = e
          break;
        case 3: this.form.pubtime = formatTime(e, false)
          break;
      }
      this.isShowPopup = false

    },
    handleSubmit(){
      let [pic_cover, pic_list, pic_content] = this.imgs.map(ii => ii.url)
      let form = {...this.form, pic_cover, pic_list, pic_content}
      this.PostAwardSubForThesis({form})
    }
  },
  created(){
    this.GetYearList().then(res => {
      this.columns[0] = res
    })
    this.GetThesisList().then(res => {
      let _arr =  res.map(ii => {
        return ii = {label: ii.rank, value: ii.score, id: ii.id}
      })
      this.columns[1] = _arr
    })
  }
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
