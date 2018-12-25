<template>
  <section class="wrapper">
    <section class="type-one" v-if="typeOne.includes(query.tag)">
      <h4 class="my-article__title">{{info.title}}</h4>
      <article class="my-article" v-html="info.content" ></article>
    </section>
    <section v-if="typeTwo.includes(query.tag)" class="type-two">
      <header class="header flex flex-justify__between">
        <img class="margin-rg__15" :src="info.pic" alt="avatar">
        <ul>
          <li class="list-name">姓名: {{info.name}}</li>
          <li>出生年月: {{info.birthday}}</li>
          <li>政治面貌: {{info.politics}}</li>
          <li>毕业时间: {{info.end}}</li>
          <li>专业名称: {{info.classify}}</li>
        </ul>
      </header>
      <article class="my-article" v-html="info.content"></article>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {
  reloadTitleMixin
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      info: {},

      typeOne: ['行业动态', '企业文化'],
      typeTwo: ['校友名录'],
    }
  },
  methods: {
    ...mapActions({
      'FirendDetail': 'FirendDetail',
      'FirendDetailFind': 'FirendDetailFind'
    }),
    fetchData(){
      switch(this.query.tag){
        case '企业文化':
        case '行业动态': return this.FirendDetail({id: this.query.id})
                                .then(res => { this.info = res; this.docTitle = res.title})
        case '校友名录': return this.FirendDetailFind({id: this.query.id})
                                .then(res => {this.info = res; this.docTitle = res.name})

      }
    }
  },
  created(){
    this.fetchData()
    this.docTitle = this.query.tag
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
  text-align: center;
  .type-one{
    padding: .3rem .2rem;
  }
  img[alt="avatar"]{
    width: 1.6rem;
    height: 2rem;
  }
  .my-article__title{
    margin-bottom: .2rem;
  }

  .type-two{
    width: 100%;
    height: 2rem;
    text-align: left;
    header.header{
      padding: .3rem .2rem;
      border-bottom: .2rem solid @base-background;
    }
    .my-article{
      padding: .3rem .2rem;
      line-height: 1.4;
    }
    *{
      font-size: .26rem;
    }
    ul{
      flex: 1;
      li{
        color: #666;
        line-height: 1.4;
      }
      li.list-name{
        color: #666;
        font-size: .3rem;
      }
    }
  }
}
</style>

<style scoped>
  .my-article >>> img{
    width: 100%;
  }
</style>
