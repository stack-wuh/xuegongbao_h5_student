<template>
  <section class="wrapper">
    <header class="header">
      <p class="flex flex-justify__between">
        <span>{{info.title}}</span>
        <img :src="info.collect ? collectActive : collectDefault" alt="collect">
      </p>
      <p class="post-list">
        <span
          v-for="(item, index) in info.posts"
          :key="index" class='post-item'
        >{{item.name}}</span>
      </p>
      <p class="header-default">时间: {{info.time}}</p>
      <p class="header-default">发布时间: {{info.pubtime}}</p>
      <p class="header-default">地点: {{info.location}}</p>
    </header>
    <ul class="post-info-list">
      <li
        v-for="(item, index) in info.posts" :key="index"
        class="post-info-item">
        <p class="post-item__title">{{item.name}}</p>
        <article class="post-item__detail">{{item.content}}</article>
      </li>
      <li class="post-info-item content-info">
        <p>{{info.title}}</p>
        <article class="">
          {{info.content}}
        </article>
        <img src="../../../assets/imgs/img-profile.png" alt="icon-profile">
      </li>

      <li style="height: 1rem; background-color: #efeff4;"></li>
    </ul>

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
import {reloadTitleMixin} from '@/utils/mixin'
import {getStorageHandle} from '@/utils/global'
const forms = [
  {
    name: '高校宣讲',
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
        label: '应聘岗位',
        field: 'port',
        isRequired: true,
      }
    ]
  },
  {
    name: '招聘信息',
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
      return forms.find(ii => ii.name == this.query.tag).list
    }
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
      'HignSchoolDetail': 'HignSchoolDetail',
      'HignSchoolPost': 'HignSchoolPost',
      'JobDetail': 'JobDetail',
      'JobPost': 'JobPost',
      'HelpDetail': 'HelpDetail',
      'HelpPost': 'HelpPost'
    }),
    handleSubmit(){
      let result = true
      let _formList = this.formList.filter(ii => ii.isRequired).map(ss => ss.field)
      _formList.forEach(ii => {
        if(!this.form[ii]) result = false
      })
      this.form = {...this.form, id: this.query.id}
      this.$toast({type: 3, msg: '请检查必填参数'})
      if(!result) return
      switch(this.query.tag){
        case '高校宣讲': return this.HignSchoolPost({form: this.form})
        case '招聘信息': return this.JobPost({form: this.form})
        case '勤工助学': return this.HelpPost({form: this.form})
      }
    },
    fetchData(){
      let _data = getStorageHandle('myInfo')
      switch(this.query.tag){
        case '高校宣讲': return  this.HignSchoolDetail({id: this.query.id}).then(res => this.info = res),
                                this.form = {name: _data.name, class: _data.class}
        case '招聘信息': return this.JobDetail({id: this.query.id}).then(res => this.info = res),
                                this.form = {name: _data.name, class: _data.class}
        case '勤工助学': return this.HelpDetail({id: this.query.id}).then(res => this.info = res),
                                this.form = {name: _data.name, class: _data.class}
      }
    }
  },
  created(){
    this.docTitle = this.query.tag
    this.fetchData()
  },
  mixins: [reloadTitleMixin]
}

</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  img[alt="icon-profile"]{
    position: absolute;
    top: -.2rem;
    right: 0;
    width: .5rem;
  }

  img[alt="arrow-up"]{
    width: .5rem;
    height: .3rem;
  }
  img[alt="arrow-down"]{
    width: .5rem;
    height: .3rem;
  }
  header.header{
    width: inherit;
    padding: .3rem;
    box-sizing: border-box;
    border-bottom: .2rem solid @base-background;

    p.header-default{
      font-size: .28rem;
      color: #666;
    }
    .post-list{
      display: flex;
      align-items: center;
      margin: .2rem 0;
      span{
        padding: .05rem .1rem;
        margin-right: .2rem;
        border-radius: .04rem;
        font-size: .26rem;
        background-color: #BAE3E0;
        color: @base-color;
      }
    }
  }
  .post-info-list{
    width: 100vw;
    .post-info-item{
      padding: .2rem 0;
      border-bottom: .2rem solid @base-background;
      background-color: #fff;

      .post-item__title{
        padding-left: .2rem;
        border-left: .1rem solid @base-color;
        color: @base-color;
      }
      .post-item__detail{
        padding: .2rem;
        box-sizing: border-box;
        font-size: .26rem;
      }
    }
    .content-info{
      position: relative;
      font-size: .28rem;
      p{
        text-align: center;
      }
      article{
        padding: .2rem ;
      }
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
