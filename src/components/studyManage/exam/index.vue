<template>
  <section class="wrapper">
    <my-list-wrapper @canGoNext="canGoNext">
      <section class="header">
        <my-search
          @getInputChange="handleInputChange"
          background
          slot="search"
        ></my-search>
      </section>
      <my-list-item v-for="(item, index) in list" >
        <img slot="left" src="../../../assets/imgs/logo.png" alt="logo">
        <section class="list-box flex flex-flow__col">
          <p class="box-title__text">测试资料</p>
          <p class="box-time__text">测试用</p>
          <time class="box-time__text">2018-12-10 10:00:00</time>
        </section>
      </my-list-item>
    </my-list-wrapper>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import MySearch from '@/views/layout/search'
export default {
  props: {},
  name: '',
  components: {
    MyListWrapper,
    MyListItem,
    MySearch,
  },
  computed: {
    ...mapState({
      list: state => state.Study.examList
    }),
  },
  data(){
    return {
      search: {
        page: 1,
        search: ''
      },
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
      this.getExamList({search: this.search})
    },
    /**
     * [canGoNext 翻页]
     * @method canGoNext
     * @param  {[type]}  e [description]
     * @return {[type]}    [description]
     */
    canGoNext(e){
      let isShowMore = this.list.length === 10 ? true : false
      if(isShowMore){
        this.search.page ++
        this.getExamList({search: this.search})
      }
    }
  },
  created(){
    this.getExamList({search: this.search})
  },
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
