<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-search @getInputChange="handleInputChange" background slot="search"> </my-search>
      <my-list-item v-for="(item, index) in list" :key="index">
        <section  @click="$push({path: '/life/pick/detail', query: {id: item.id, title: item.title, desc: item.descript}})" class="item-content">
          <p class="item-content__title">{{item.title || '暂无'}}</p>
          <p class="item-content__time">投票发起人: {{item.name}}</p>
          <p class="item-content__time">投票截止时间: {{item.endtime || '暂无'}}</p>
        </section>
        <img slot="right" src="../../../assets/imgs/arrow-right-green.png" alt="arrow">
      </my-list-item>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyList from '@/views/layout/list'
import MyListItem from '@/views/layout/listItem'
import MyPicker from '@/views/layout/picker'
import MySearch from '@/views/layout/search'
import {
  reloadTitleMixin, getListMore, pushRouter
} from '@/utils/mixin'


export default {
  props: {},
  name: '',
  components: {
    MyList,
    MyListItem,
    MyPicker,
    MySearch,
  },
  computed: {},
  data(){
    return {
      isShowText: '没有更多啦',
      search: {
        page: 1,
        search: '',
        type: 0
      },
      list: [],
      isShowMore: false,

      cateList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '奖学金',
          value: '奖学金'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      'VoteList': 'VoteList'
    }),
    emitterPick(e){
      this.list = []
      this.search.type = e.data.value
      this.fetchData()
    },
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
    fetchData(){
      this.isShowText = '正在加载更多'
      this.VoteList({search: this.search}).then(res => {
        this.list = this.list.concat(res)
        this.isShowMore = res.length == 10 ? true : false
        this.isShowText = res.length == 10 ? '加载中' : '没有更多啦'
      })
    }
  },
  created(){
    this.docTitle = this.query.tag
    this.fetchData()
  },
  mixins: [reloadTitleMixin, getListMore, pushRouter]
}
</script>
<style lang="less" scoped>
.content-wrapper{
  .item-content{
    *{
      font-size: .26rem;
    }
    .item-content__title{
      font-size: .34rem;
    }
    .item-content__time{
      margin-top: .1rem;
      color: #999;
    }
  }
}
</style>
