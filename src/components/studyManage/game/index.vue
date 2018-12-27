<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText" >
      <section class="header-wrapper">
        <my-tab @lisenterIndex='lisenterIndex' :data="tabList" slot="tab"></my-tab>
        <my-search @getInputChange="handleChange" slot="search">
          <my-picker @emitterPick="handlePick" :data="category" valueKey="label" slot="left"></my-picker>
          <img @click="$push({path: '/base/form', query: {name: '科研赛事招募令'}})" v-if="currTabIndex == 1" slot="right" src="../../../assets/imgs/icon-edit-green.png" alt="edit">
        </my-search>
      </section>
      <section style="height: 1.6rem;"></section>
      <my-list-item class="my-list-item" v-for="(item, index) in list" :key="index" border >
        <div :class="bgColor(item.category)" slot="left" class="left-wrapper">
          {{item.category || '暂无'}}
        </div>
        <div @click="$push({path: '/index/game/detail', query: {tag: query.tag, tab: tabList[currTabIndex].name, id: item.id}})" class="center-wrapper">
          <p>{{currTabIndex == 0 ? item.title : item.name}}</p>
          <div class="flex flex-justify__between">
            <p>
              <span class="sub__title">发布时间: </span>
              <time>{{item.time}}</time>
            </p>
            <p v-if="currTabIndex == 0" >
              <span class="sub__title">截止时间: </span>
              <time>{{item.endtime}}</time>
            </p>
            <p v-else>
              <span class="sub__title">发起人: </span>
              <time>{{item.creater}}</time>
            </p>
          </div>
        </div>
      </my-list-item>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyListItem from '@/views/layout/listItem'
import MyTab from '@/views/layout/tab'
import MySearch from '@/views/layout/search'
import MyPicker from '@/views/layout/picker'
import MyList from '@/views/layout/list'
import {
  changeTabCurr, reloadTitleMixin, getListMore, pushRouter
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyListItem,
    MyTab,
    MySearch,
    MyPicker,
    MyList,
  },
  computed: {
    ...mapState({
      list: state => state.Study.gameList
    }),
    ...mapGetters({
      category: 'formatGameCategoryList',
    }),
  },
  data(){
    return {
      search: {
        page: 1,
        category: 0,
        search: ''
      },
      isShowMore: false,
      isShowText: '没有更多啦',
      tabList: [
        {
          name: '通知',
          value: 0
        },
        {
          name: '招募令',
          value: 1
        }
      ],
    }
  },
  methods: {
    /**
     * [handleChange 搜索框的点击搜索事件]
     * @method handleChange
     * @param  {[type]}     e [description]
     * @return {[type]}       [description]
     */
    handleChange(e){
      this.search.search = e.keyword
      this.CLEAR_GAMELIST()
      this.getList({search: this.search, currIndex: this.currTabIndex})
    },
    ...mapActions({
      'getCategoryList': 'getCategoryList',
      'getList': 'getGameList'
    }),
    ...mapMutations({
      'CLEAR_GAMELIST': 'CLEAR_GAMELIST'
    }),

    /**
     * [lisenterIndex navbar的点击切换事件]
     * @method lisenterIndex
     * @param  {[type]}      e [description]
     * @return {[type]}        [description]
     */
    lisenterIndex(e){
      this.search.page = 1
      this.currTabIndex = e.index
      this.CLEAR_GAMELIST()
      this.getList({search: this.search, currIndex: e.index})
    },
    /**
     * [handlePick picker的change事件]
     * @method handlePick
     * @param  {[type]}   e [description]
     * @return {[type]}     [description]
     */
    handlePick(e){
      this.CLEAR_GAMELIST()
      this.getList({
        search: {
          page: 1,
          category: e.data.value
        },  currIndex: this.currTabIndex
      })
    },
    /**
     * [bgColor 返回文字的背景颜色]
     * @method bgColor
     * @param  {[type]} info [description]
     * @return {[type]}      [description]
     */
    bgColor(info){
      switch(info){
        case '自创': return 'yellow'
        case '国创': return 'other'
        case '挑战杯': return 'default'
        case '教师课题': return 'other'
        case '节能减排': return 'lightgreen'
        default: return 'other'
      }
    },

    /**
     * [canGoNext 翻页]
     * @method canGoNext
     * @param  {[type]}  e [description]
     * @return {[type]}    [description]
     */
    getMore(e){
      let isShowMore = this.list.length === 10 ? true : false
      if(isShowMore){
        this.search.page ++
        this.getList({search: this.search, currIndex: this.currTabIndex})
      }
    }
  },
  created(){
    this.getCategoryList()
    this.getList({search: this.search, currIndex: this.currTabIndex})
  },
  destroyed(){
    this.CLEAR_GAMELIST()
  },
  mixins: [changeTabCurr, reloadTitleMixin, getListMore, pushRouter]
}
</script>
<style lang="less" scoped>
.content-wrapper{
  .header-wrapper{
    position: fixed;
  }
  .my-list-item{
    display: flex;
    height: 1.6rem;
  }
  .left-wrapper{
    width: 1rem;
    text-align: center;
    padding-right: .2rem;
    margin-right: .1rem;
    border-right: .04rem solid red;
    font-size: .36rem;
  }
  .center-wrapper{
    p, span{
      font-size: .28rem;
    }
  }
}
</style>
