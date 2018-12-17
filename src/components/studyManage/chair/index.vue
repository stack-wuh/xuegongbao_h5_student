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
        <section class="list-box flex flex-flow__col">
          <p class="box-title__text">{{item.theme}}</p>
          <p class="box-time__text">报名人数: {{item.apply_num}}</p>
          <p class="box-time__text text-over__cols">{{item.intro}}</p>
          <time class="box-time__text flex">
            <img src="../../../assets/imgs/icon-clock.png" alt="icon__goast">{{item.date}}</time>
          <time class="box-time__text flex">
            <img src="../../../assets/imgs/icon-pos.png" alt="icon__goast">{{item.address}}</time>
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
      list: state => state.Study.chairList
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
      this.CLEAR_CHAIRLIST()
      this.search.search = e.keyword
      this.getChairList({search: this.search})
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
        this.getChairList({search: this.search})
      }
    }
  },
  created(){
    this.getChairList({search: this.search})
  },
  destroyed(){
    this.CLEAR_CHAIRLIST()
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
