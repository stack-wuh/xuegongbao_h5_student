<template>
  <section class="wrapper">
    <h4 class="c333 flex flex-justify__between">
      <span class="f16">{{info.title || info.name}}</span>
      <span v-if="info.category" :class="bgColor(info.category)" class="f16">{{info.category}}</span>
    </h4>
    <section v-if="query.tag == '科研赛事' && query.tab == '通知'">
      <ul class="list">
        <li class="list-item">
          <span>发布时间: {{info.time}}</span>
        </li>
        <li class="list-item">
          <span>截止时间: {{info.endtime}}</span>
        </li>
        <li class="list-item">
          <article class="">内容: {{info.content}}</article>
        </li>
      </ul>
    </section>
    <section v-if="query.tag == '科研赛事' && query.tab == '招募令'">
      <ul class="list">
        <li class="list-item">
          <span>发起人: {{info.creater}}</span>
          <span>需要个人简历</span>
        </li>
        <li class="list-item">
          <span>联系方式: {{info.contact}}</span>
        </li>
        <li class="list-item">
          <span>截止时间: {{info.endtime}}</span>
        </li>
        <li class="list-item flex-flow__col flex-align__start">
          <span>项目简介:</span>
          <article class="">
            {{info.intro}}
          </article>
        </li>
        <li class="list-item">
          <span>招募人数: {{info.num}}人</span>
        </li>
        <li class="list-item flex-flow__col flex-align__start">
          <span>招募要求: </span>
          <article class="">
            {{info.command}}
          </article>
        </li>
      </ul>
    </section>

    <section
      class="btn-area"
      @click="isShowPopup = true">
      <img src="../../../assets/imgs/arrow-white-up.png" alt="arrow-up">
      <span>在线报名</span>
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
              <van-field
                class="form-input"
                :placeholder="item.placeholder"
                v-model="form[item.field]"></van-field>
          </li>
        </ul>
        <span @click="handleSubmit" class="form-btn__submit">立即报名</span>
      </section>
    </van-popup>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {getStorageHandle} from '@/utils/global'
import {
  reloadTitleMixin
} from '@/utils/mixin'
const forms = [
  {
    name: '科研赛事',
    tab: '通知',
    list: [
      {
        label: '姓名',
        field: 'name',
        isRequired: false,
        placeholder: '请编辑姓名',
      },
      {
        label: '专业班级',
        field: 'class',
        isRequired: false,
        placeholder: '请编辑专业班级',
      },
      {
        label: '手机号',
        field: 'phone',
        isRequired: true,
        placeholder: '请编辑手机号',
      },
      {
        label: '邮箱',
        field: 'email',
        isRequired: true,
        placeholder: '请编辑邮箱',
      },
      {
        label: '项目',
        field: 'project',
        tips:'无项目则不需要填写',
        isRequired: false,
        placeholder: '请编辑项目',
      },
    ]
  },
  {
    name: '科研赛事',
    tab:'招募令',
    list: [
      {
        label: '姓名',
        field: 'name',
        isRequired: false,
      },
      {
        label: '专业班级',
        field: 'class',
        isRequired: false,
      },
      {
        label: '手机号',
        field: 'phone',
        isRequired: true,
      },
      {
        label: '邮箱',
        field: 'email',
        isRequired: true,
      }
    ]
  },
  {
    name: '勤工助学',
    list: [
      {
        label: '姓名',
        field: 'name',
        isRequired: true,
      },
      {
        label: '专业班级',
        field: 'class',
        isRequired: true,
      },
      {
        label: '手机号',
        field: 'phone',
        isRequired: true,
      },
      {
        label: '应聘岗位',
        field: 'port',
        isRequired: true,
      }
    ]
  }
]
export default {
  props: {},
  name: '',
  components: {},
  computed: {
    formList(){
      return forms.find(ii => ii.name == this.query.tag && ii.tab == this.query.tab).list
    }
  },
  data(){
    return {
      isShowPopup: false,

      form: {},
      info: {},
    }
  },
  methods: {
    ...mapActions({
      'getNoticeDetail': 'getNoticeDetail',
      'PostNoticeDetail': 'PostNoticeDetail',
      'GetEnlistDetail': 'GetEnlistDetail'
    }),
    handleSubmit(){
      let result = true
      let _formList = this.formList.filter(ii => ii.isRequired).map(ss => ss.field)
      _formList.forEach(ii => {
        if(!this.form[ii]) result = false
      })
      this.$toast({type: 3, msg: '请检查必填参数'})
      if(!result) return
      switch(this.query.tab){
        case '通知': return this.PostNoticeDetail({form: {...this.form, id: this.query.id}})
      }
    },

    fetchData(){
      let _data = getStorageHandle('myInfo')
      switch(this.query.tab){
        case '通知': return this.getNoticeDetail({id: this.query.id}).then(res => {this.info = res}),
                            this.form = {name: _data.name, class: _data.class}
        case '招募令': return this.GetEnlistDetail({id: this.query.id}).then(res => this.info = res),
                              this.form = {name: _data.name, class: _data.class}
      }
    },
    /**
     * [bgColor 返回文字的背景颜色]
     * @method bgColor
     * @param  {[type]} info [description]
     * @return {[type]}      [description]
     */
    bgColor(info){
      switch(info){
        case '自创': return 'yellow'
        case '国创': return 'other'
        case '挑战杯': return 'default'
        case '教师课题': return 'other'
        case '节能减排': return 'lightgreen'
        default: return 'other'
      }
    },
  },
  created(){
    this.docTitle = '详情'
    this.fetchData()
  },
  mixins: [reloadTitleMixin, ]
}
</script>
<style lang="less" scoped>
.wrapper{
  width:100vw;
  height: 100vh;
  padding: .2rem;
  box-sizing: border-box;
  *{
    font-size: .26rem;
  }

  img[alt="arrow-up"]{
    width: .5rem;
    height: .3rem;
  }
  img[alt="arrow-down"]{
    width: .5rem;
    height: .3rem;
  }

  .list{
    .list-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: .1rem;
      line-height: 1.5;
      color: #666;
    }
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
    color: #fff !important;
    background-image: url('../../../assets/imgs/bg-green.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .form-area{
    min-height: 40vh;
    background-color: #00998d;
    color: #fff !important;
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
