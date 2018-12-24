<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
        <my-search background @getInputChange="handleInputChange" slot="search"></my-search>

        <ul class="list">
          <li
            v-for="(item, index) in list" :key="index"
            class="item-wrapper flex flex-justify__between">
            <img :src="avatarImg" alt="avatar">
            <span>{{item.department || item.name}}</span>
            <span class="flex-empty"></span>
            <span>{{item.tel || item.email}}</span>
          </li>
        </ul>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin, getListMore} from '@/utils/mixin'
import MySearch from '@/views/layout/search'
import MyList from '@/views/layout/list'
export default {
  props: {},
  name: '',
  components: {
    MySearch,
    MyList,
  },
  computed: {
    avatarImg(){
      switch(this.query.tag){
        case '教师邮箱': return require('@/assets/imgs/icon-teacher-green.png')
        case '校园电话': return require('@/assets/imgs/icon-04-s.png')
        default: return require('@/assets/imgs/icon-04-s.png')
      }
    }
  },
  data(){
    return {
      isShowText: '没有更多啦',
      info: {},
      list: [],
      search: {
        page: 1,
        search: '',
      },
    }
  },
  methods: {
    ...mapActions({
      'SchoolTels': 'SchoolTels',
      'SchoolEmails': 'SchoolEmails'
    }),
    handleInputChange(e){
      this.list = []
      this.search.search = e.keyword
      this.fetchData()
    },
    getMore(){
      if(this.isShowMore){
        this.search.page ++
        this.fetchData()
      }
    },
    checkShowMore(length){
      this.isShowMore = length == 10 ? true : false
      this.isShowText = length == 10 ? '正在加载更多' : '没有更多啦'
    },
    fetchData(){
      switch(this.query.tag){
        case '校园电话': this.SchoolTels({search: this.search}).then(res => {
          this.list = res
          this.checkShowMore(res.length)
        })
          break;
        case '教师邮箱': this.SchoolEmails({search: this.search}).then(res => {
          this.list = res
          this.checkShowMore(res.length)
        })
          break;
      }
    }
  },
  created(){
    this.docTitle = this.query.tag
    this.fetchData()
  },
  mixins: [reloadTitleMixin, getListMore]
}
</script>
<style lang="less" scoped>
.content-wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  .list{
    width: 100vw;
    .item-wrapper{
      width: inherit;
      height: 1rem;
      margin-top: .2rem;
      padding: .2rem;
      border-top-left-radius: .5rem;
      border-bottom-left-radius: .5rem;
      background-color: #fff;
      *{
        font-size: .28rem;
      }
      img{
        width: .6rem;
        height: .6rem;
        margin-right: .2rem;
      }
    }
  }
}
</style>
