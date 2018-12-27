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
        <section @click="$push({path: '/index/question/detail', query: {tag: query.tag, id: item.id}})" class="item__box flex flex-flow__col" slot="left">
          <p class="item-title__text">{{item.title}}</p>
          <p class="item-time__text">{{item.name}}</p>
          <time class="item-time__text">{{item.sub_time}}</time>
        </section>
        <img slot="right" class="icon-right" src="../../../assets/imgs/arrow-right-green.png" alt="icon">
      </my-list-item>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import MyList from '@/views/layout/list'
import MySearch from '@/views/layout/search'
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
    MyList,
  },
  computed: {
    ...mapState({
      list: state => state.Study.quesList
    }),
  },
  data(){
    return {
      search: {
        page: 1
      },
      isShowMore: false,
      isShowText: '没有更多啦'
    }
  },
  methods: {
    ...mapActions({
      'getQuesList': 'getQuesList'
    }),
    ...mapMutations({
      'CLEAR_QUESLIST': 'CLEAR_QUESLIST'
    }),

    /**
     * [handleInputChange 搜索框的点击事件]
     * @method handleInputChange
     * @param  {[type]}          e [description]
     * @return {[type]}            [description]
     */
    handleInputChange(e){
      this.CLEAR_QUESLIST()
      this.search.search = e.keyword
      this.getQuesList({search: this.search})
    },
    getMore(){
      this.isShowMore = this.list.length == 10 ? true : false
      if(this.isShowMore){
        this.search.page ++
        this.getQuesList({search: this.search})
      }
    },
  },
  created(){
    this.docTitle = '问卷调查'
    this.getQuesList({search: this.search})
  },
  mixins:[reloadTitleMixin, pushRouter, getListMore],
  destroyed(){
    this.CLEAR_QUESLIST()
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
  .icon-right{
    width: .2rem;
    height: .4rem;
  }
  .item__box{
    .item-title__text{
      font-size: .3rem;
      color: #333;
    }
    .item-time__text{
      font-size: .2rem;
      color: #999;
    }
  }
}
</style>
