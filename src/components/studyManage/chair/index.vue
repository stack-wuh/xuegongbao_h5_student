<template>
  <section class="wrapper">
    <my-list @scroll.native="handleSchool" :finishedText="isShowText">
      <section class="header">
        <my-search
          @getInputChange="handleInputChange"
          background
          slot="search"
        ></my-search>
      </section>
      <my-list-item v-for="(item, index) in list" >
        <section @click="$push({path: '/index/chair/detail', query: {tag: query.tag, id: item.id}})" class="list-box flex flex-flow__col">
          <p class="box-title__text">{{item.theme}}
            <span class="title__tips" v-if="item.has_apply">已报名</span>
          </p>
          <p class="box-time__text">报名人数: {{item.apply_num}}</p>
          <p class="box-time__text text-over__cols">{{item.intro}}</p>
          <time class="box-time__text flex">
            <img src="../../../assets/imgs/icon-clock.png" alt="icon__goast">{{item.date}}</time>
          <time class="box-time__text flex">
            <img src="../../../assets/imgs/icon-pos.png" alt="icon__goast">{{item.address}}</time>
        </section>
      </my-list-item>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import MySearch from '@/views/layout/search'
import MyList from '@/views/layout/list'
import {
  reloadTitleMixin, pushRouter, getListMore
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyListWrapper,
    MyListItem,
    MySearch,
    MyList
  },
  computed: {
    ...mapState({
    }),
  },
  data(){
    return {
      search: {
        page: 1,
        search: ''
      },
      isShowText: '没有更多啦',
      isShowMore: false,
      list: [],
    }
  },
  methods: {
    ...mapActions({
      'getChairList': 'getChairList'
    }),
    ...mapMutations({
      'CLEAR_CHAIRLIST': 'CLEAR_CHAIRLIST'
    }),

    /**
     * [handleInputChange 搜索框的点击事件]
     * @method handleInputChange
     * @param  {[type]}          e [description]
     * @return {[type]}            [description]
     */
    handleInputChange(e){
      this.list = []
      this.search.search = e.keyword
      this.search.page = 1
      this.fetchData()
    },
    /**
     * [canGoNext 翻页]
     * @method canGoNext
     * @param  {[type]}  e [description]
     * @return {[type]}    [description]
     */
    getMore(e){
      if(this.isShowMore){
        this.search.page ++
        this.fetchData()
      }
    },
    fetchData(){
      this.getChairList({search: this.search}).then(res => {
        this.list = this.list.concat(res)
        this.isShowMore = res.length == 10 ? true: false
        this.isShowText = res.length == 10 ? '正在加载更多' : '没有更多啦'
      })
    }
  },
  created(){
    this.docTitle = '讲座报告'
    this.fetchData()
  },
  destroyed(){
    this.CLEAR_CHAIRLIST()
  },
  mixins: [reloadTitleMixin, pushRouter, getListMore]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: inherit;
  height: inherit;
  background-color: @base-background;
  overflow-y: scroll;
  .title__tips{
    margin-left: 10vw;
    border:1px solid @base-color;
    color: @base-color;
    font-size: .28rem;
  }
  img[alt="logo"]{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .2rem;
  }
  img[alt="icon__goast"]{
    width: .3rem;
    height: .3rem;
    margin-right: .1rem;
  }
  .list-box{
    .box-title__text{
      font-size: .32rem;
    }
    .box-time__text{
      margin-top: .1rem;
      font-size: .24rem;
    }
  }
}
</style>
