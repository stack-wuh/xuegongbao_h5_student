<template>
  <section class="wrapper">
    <h4 class="wrapper-title">
      {{info.theme}}
      <span v-if="info.has_apply"
        class="title_tips"
        >已报名
      </span>
    </h4>
    <p>报名人数: {{info.apply_num}}</p>
    <p>截止时间: {{info.date}}</p>
    <p>会议地址: {{info.address}}</p>
    <p>简介:</p>
    <article class="">
      {{info.intro}}
    </article>
    <section style="height: 1rem;"></section>
    <section
      class="btn-area"
      v-if="!info.has_apply"
      @click="isShowPopup = true">
      <img src="../../../assets/imgs/arrow-white-up.png" alt="arrow-up">
      <span>在线报名</span>
    </section>
    <section
      class="btn-area btn-area_other"
      @click="handleCancel"
      v-if="info.has_apply">
      <span>取消报名</span>
    </section>
    <van-popup
      v-model="isShowPopup"
      position="bottom"
      :overlay="false">
      <section class="form-area">
        <section
          class="btn-area"
          @click="isShowPopup = false">
          <img src="../../../assets/imgs/arrow-white-down.png" alt="arrow-down">
          <span>在线报名</span>
        </section>
        <ul>
          <li
            class="flex form-item"
            v-for="(item, index) in formList" :key="index">
              <span class="form-label">{{item.label}}</span>
              <van-field class="form-input" v-model="form[item.field]"></van-field>
          </li>
        </ul>
        <span @click="handleSubmit" class="form-btn__submit">立即报名</span>
      </section>
    </van-popup>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {
  reloadTitleMixin, pushRouter
} from '@/utils/mixin'
import {getStorageHandle} from '@/utils/global'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      info: {},
      formList: [
        {
          label: '姓名',
          field: 'name',
        },
        {
          label: '专业班级',
          field: 'class',
        },
        {
          label: '学号',
          field: 'num'
        }
      ],
      form: {},
      isShowPopup: false,

      isApply: false
    }
  },
  methods: {
    ...mapActions({
      'GetChairDetail': 'GetChairDetail',
      'PostChairApply': 'PostChairApply',
      'PostChairUnApply': 'PostChairUnApply'
    }),
    handleSubmit(){
      this.PostChairApply({id: this.query.id}).then(res => {
        if(res.error == 0){
          this.info.has_apply = true
          this.isShowPopup = false
        }
      })
    },
    handleCancel(){
      this.PostChairUnApply({id: this.query.id}).then(res => {
        if(res.error == 0){
          this.info.has_apply = false
        }
      })
    }
  },
  created(){
    this.docTitle = '报告详情'
    let _data = getStorageHandle('myInfo'), _info = getStorageHandle('userinfo')
    this.form = {name: _data.name, class: _data.class, num: _data.number}
    this.GetChairDetail({id: this.query.id}).then(res => {
      this.info = res
    })
  },
  mixins: [reloadTitleMixin, pushRouter],
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  padding: .3rem;
  img[alt="arrow-up"]{
    width: .5rem;
    height: .3rem;
  }
  img[alt="arrow-down"]{
    width: .5rem;
    height: .3rem;
  }
  *{
    font-size: .28rem;
  }
  h4.wrapper-title{
    font-size: .32rem;
    font-weight: normal;
  }
  p{
    line-height: 1.6;
  }
  .title_tips{
    margin-left: 10vw;
    border:1px solid @base-color;
    color: @base-color;
  }
  .btn-area{
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 8vh;
    color: #fff;
    background-image: url('../../../assets/imgs/bg-green.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .form-area{
    min-height: 40vh;
    background-color: #00998d;
    color: #fff;
    .form-item{
      width: 80vw;
      height: .8rem;
      margin: 0 auto;
      margin-bottom: .3rem;
      border:1px solid #fff;
      border-radius: .08rem;
      overflow: hidden;
      .form-label{
        width: 40%;
        border-right: 1px solid #fff;
        text-align: center;
      }
      .form-input{
        padding-left: .2rem;
        color: #fff;
        background-color: #00998d;
      }
    }

    .form-btn__submit{
      display: inline-block;
      width: 2.5rem;
      height: 1rem;
      margin-left: calc(50% - 1.2rem);
      margin-bottom: .3rem;
      font-size: .36rem;
      border: 1px solid #fff;
      line-height: 1rem;
      text-align: center;
      border-radius: .1rem;
    }

    .btn-area{
      position: relative;
      height: 10vh;
      background-position: bottom;
      background-color: #fff;
    }
  }
}
</style>
