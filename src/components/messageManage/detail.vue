<template>
  <section class="wrapper">
    <section class="list-item">
      <p>
        <span class="item-tips">{{info.classify}}</span>来自{{info.names}}
      </p>
      <p class="item__title text-over">[主题]{{info.title}}</p>
      <p class="item__desc">{{info.content}}</p>
      <p class="item__info flex flex-justify__between">
        <time>发布时间: {{info.addtime}}</time>
      </p>
      <p class="item__info flex flex-justify__between">
        <time>截止时间: {{info.end_time}}</time>
      </p>

      <div :class="['list-item__tips', info.statu == 0 ? 'list-item__tips-active' : 'list-item__tips-normal']">
        {{info.statu == 1 ? '已结束' : '待处理'}}
      </div>
    </section>

    <section class="flex list-col margin-tp__10">
      <span>图片</span>
      <div class="flex flex-justify__between" style="flex-wrap: wrap">
        <span style="width: .8rem; visibility: hidden;"></span>
        <img @click="prevImgs(iid)" v-for="(ii, iid) in info.img_url" :src="ii" alt="info">
      </div>
    </section>
    <section class="list-col flex flex-justify__between">
      <span>表单</span>
      <span v-if="info.form"  @click="isShowPopup = true"  style="flex: 1; text-align: right; margin-right: .3rem;">{{info && info.formLabel}}</span>
      <img v-if="info.form" @click="isShowPopup = true"  src="../../assets/imgs/arrow-right-black.png" alt="arrow">
    </section>
    <section class="flex flex-justify__between list-col margin-tp__10">
      <span>接收人: </span>
      <span style="flex: 1;">{{info.myname}}等{{info.totals}}人</span>
      <span @click="$push({path: '/message/list', query: {id: info.id}})" class="margin-rg__15">{{info.isreceier}}/{{info.totals}}收到</span>
      <img  src="../../assets/imgs/arrow-right-black.png" alt="arrow">
    </section>

    <my-button v-if="info.is_receive == 0" :childClick="handleSubmit" :text="'收到消息'" size="large" />

    <van-popup
      v-model="isShowPopup"
      position="right">
      <section v-if="info.form" class="form-area">
        <van-cell-group>
          <van-field
            v-for="(item, index) in info.form[info.formLabel]"
            :label="item"
            :placeholder="'请编辑' + item"
            v-model="form[item]" />
        </van-cell-group>
        <my-button :childClick="handleSubmitForm" :text="'提交'" size="large" />
      </section>
    </van-popup>
  </section>
</template>
<script>
import MyButton from '@/views/forms/button'
import {
  reloadTitleMixin, pushRouter, getListMore
} from '@/utils/mixin'
import {mapActions} from 'vuex'
import { ImagePreview} from 'vant'
export default {
  props: {},
  name: '',
  components: {
    MyButton,
  },
  data(){
    return {
      info: {},
      isShowPopup: false,

      form: {},
    }
  },
  methods: {
    ...mapActions({
      'GetMessageDetail': 'GetMessageDetail',
      'PostMessageForm': 'PostMessageForm',
      'PostMessageRecive': 'PostMessageRecive'
    }),
    handleSubmit(){
      this.PostMessageRecive({id: this.query.id}).then(res => {
        if(!res.error){
            setTimeout(this.fetchData(), 1000)
        }
      })
    },
    fetchData(){
      this.GetMessageDetail({id: this.query.id}).then(res => {
        this.info = res
        this.info.form = this.info.form && JSON.parse(this.info.form)
        this.info.formLabel = Object.keys(this.info.form)[0]
      })
    },
    prevImgs(index){
      ImagePreview({
        images:[...this.info.img_url],
        startPosition: index
      })
    },
    handleSubmitForm(){
      let result = true
      this.info.form[this.info.formLabel].map(ii => {
        if(!this.form[ii]) result = false
      })
      if(!result){
        this.$toast({
          type: 3,
          msg: '请编辑必填项目后提交'
        })
        return
      }
      let form = {
        pid: this.query.id,
        info: Object.values(this.form)
      }
      this.PostMessageForm({form})
    }
  },
  created(){
    this.docTitle = "消息详情"
    this.fetchData()
  },
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @base-background;
  img[alt="info"]{
    width: .8rem;
    height: .8rem;
    margin-left: .2rem;
  }
  .list-item{
    position: relative;
    width: 100vw;
    padding: .2rem;
    background-color: #fff;

    .list-item__tips{
      position: absolute;
      top: 0;
      right: .2rem;
      width: 1.4rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
    }
    .list-item__tips-active{
      color: #7ed321;
      background-color: rgba(126, 211, 33, 0.2)
    }
    .list-item__tips-normal{
      color: #f5a623;
      background-color:rgba(245,166,35,0.2);
    }

    .item__title{
      margin-top: .1rem;
    }

    .item-tips{
      margin-right: .2rem;
      color: @base-blue;
    }
    .item__desc,
    .item__info{
      margin-top: .1rem;
      color: #666;
      font-size: .28rem;
    }
  }

  .list-col{
    width: 100vw;
    height: 1rem;
    padding: 0 .2rem;
    line-height: 1rem;
    background-color: #fff;
    border-bottom: .02rem solid #eee;
  }

  .form-area{
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }
}
</style>
