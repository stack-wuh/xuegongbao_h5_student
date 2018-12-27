<template>
  <section class="wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <section class="header">
        <my-search
          @getInputChange="handleInputChange"
          background
          slot="search"
        ></my-search>
      </section>
      <section style="height: 1rem;"></section>
      <my-list-item v-for="(item, index) in list" >
        <img slot="left" src="../../../assets/imgs/logo.png" alt="logo">
        <section @click="$push({path: '/index/exam/detail', query: {tag: query.tag, id: item.id}})" class="list-box flex flex-flow__col">
          <p class="box-title__text">{{item.title}}</p>
          <p class="box-time__text">{{item.content}}</p>
          <time class="box-time__text">{{item.addtime}}</time>
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
import {reloadTitleMixin, pushRouter, getListMore} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyListWrapper,
    MyListItem,
    MySearch,
    MyList,
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
      list: [],
      isShowMore: false,
      isShowText: '没有更多啦'
    }
  },
  methods: {
    ...mapActions({
      'getExamList': 'getExamList'
    }),
    ...mapMutations({
      'CLEAR_EXAMLIST': 'CLEAR_EXAMLIST'
    }),

    /**
     * [handleInputChange 搜索框的点击事件]
     * @method handleInputChange
     * @param  {[type]}          e [description]
     * @return {[type]}            [description]
     */
    handleInputChange(e){
      this.CLEAR_EXAMLIST()
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
      this.getExamList({search: this.search}).then(res => {
        this.list = this.list.concat(res.data)
        this.isShowMore = res.data.length == 10 ? true : false
        this.isShowText = res.length == 10 ? '正在加载更多' : '没有更多啦'
      })
    }
  },
  created(){
    this.docTitle = '学习考试'
    this.fetchData()
  },
  mixins:[reloadTitleMixin, pushRouter, getListMore],
  destroyed(){
    this.CLEAR_EXAMLIST()
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: inherit;
  height: inherit;
  background-color: @base-background;
  overflow-y: scroll;

  .header{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
  }

  img[alt="logo"]{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .2rem;
  }
  .list-box{
    .box-title__text{
      font-size: .32rem;
    }
    .box-time__text{
      font-size: .24rem;
    }
  }
}
</style>
