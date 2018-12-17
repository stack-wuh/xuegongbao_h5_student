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
        <section class="item__box flex flex-flow__col" slot="left">
          <p class="item-title__text">{{item.title}}</p>
          <p class="item-time__text">{{item.name}}</p>
          <time class="item-time__text">{{item.sub_time}}</time>
        </section>
        <img slot="right" class="icon-right" src="../../../assets/imgs/arrow-right-green.png" alt="icon">
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
      list: state => state.Study.quesList
    }),
  },
  data(){
    return {
      search: {
        page: 1
      },
      isShowMore: false,
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
    canGoNext(e){
      let isShowMore = this.list.length === 10 ? true : false
      if(isShowMore){
        this.search.page ++
        this.getQuesList({search: this.search})
      }
    }
  },
  created(){
    this.getQuesList({search: this.search})
  },
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
