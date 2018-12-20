<template>
  <section class="wrapper">
    <my-list-wrapper @canGoNext="canGoNext">
      <ul slot="tab" class="header-wrapper">
        <li
            v-for="(item, index) in tabs" :key="index"
            class="header-item" :class="[item.curr == curr ? 'header-item__active' : '']"
            @click="handleChangeTab(item)">{{item.name}}</li>
      </ul>
      <section style="height: .8rem;"></section>
        <my-list-item v-if="curr <2"
          v-for="(item, index) in list"
          :key="index" border>
            <img slot="left" class="margin-rg__20" :src=" item.img || defaultImg" alt="logo">
            <section class="item-box">
              <p class="f16" style="font-size: .32rem;">{{item.title}}</p>
              <time class="f13">{{item.pubtime}}</time>
            </section>
            <img slot="right" src="../../../assets/imgs/arrow-right-green.png" alt="arrow">
        </my-list-item>
        <my-list-item v-else border>
          <img slot="left" :src="item.pic || defaultImg" alt="avatar">
          <section class="item-box">
            <p class="f15 c333">{{item.name}}</p>
            <p class="flex flex-justify__between">
              <span class="f13">出生年月: {{item.birthday}}</span>
              <img src="../../../assets/imgs/arrow-right-green.png" alt="arrow">
            </p>
            <p>政治面貌: {{item.politics}}</p>
            <p>毕业时间: {{item.end}}</p>
            <p>专业名称: {{item.classify}}</p>
            <p class="text-over__cols">
               概要: {{item.content}}
            </p>
          </section>
        </my-list-item>
    </my-list-wrapper>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import {
  reloadTitleMixin
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyListItem,
    MyListWrapper,
  },
  computed: {
    ...mapState({
      list: state => state.Job.firendList
    }),
  },
  data(){
    return {
      docTitle: '行业动态',
      defaultImg: require('@/assets/imgs/logo.png'),
      curr: 0,
      tabs: [
        {
          name: '行业动态',
          curr: 0,
          url: '/job/qywhList',
        },
        {
          name: '企业文化',
          curr: 1,
          url: '/job/qywhList',
        },
        {
          name: '校友名录',
          curr: 2,
          url: '/job/alumnuslist',
        }
      ],
      search: {
        page: 1,
        category: '行业动态'
      }
    }
  },
  methods: {
    ...mapActions({
      'GetFirendList': 'GetFirendList'
    }),
    ...mapMutations(['CLEAR_FIRENDLIST']),
    /**
     * [handleChangeTab 切换顶部导航栏内容]
     * @method handleChangeTab
     * @return {[type]}        [description]
     */
    handleChangeTab(item){
      this.curr = item.curr
      this.docTitle = item.name
      this.search.category = item.name
      this.reLoadTitle()
      this.CLEAR_FIRENDLIST()
      this.GetFirendList({url: item.url, search: this.search})
    },
    canGoNext(){
      let isShowMore = this.list.length === 10 ? true : false
      if(isShowMore){
        this.search.page ++
        this.GetFirendList({url: this.tabs[this.curr].url, search: this.search})
      }
    }
  },
  created(){
    this.GetFirendList({search: this.search})
  },
  destroyed(){
    this.CLEAR_FIRENDLIST()
  },
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: inherit;
  overflow-y: scroll;
  background-color: @base-background;
  .header-wrapper{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: .8rem;
    width: inherit;
    background-color: @base-color;
    color: rgba(255,255,255,.5);

    .header-item{
      padding-bottom: .06rem;
      text-align: center;
      font-size: .26rem;
    }
    .header-item__active{
      color: #fff;
      border-bottom: .02rem solid #fff;
    }
  }

  img[alt='logo']{
    width: 1.2rem;
    height: .8rem;
  }
  img[alt="avatar"]{
    width: 2rem;
    height: 2.6rem;
    margin-right: .2rem;
  }
  .item-box{
    p{
      font-size: .26rem;
    }
  }
}
</style>
