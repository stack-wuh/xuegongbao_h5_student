<template>
  <section class="wrapper content1-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-search @getInputChange="handleInput" class="my-search" background>
        <my-picker @emitterPick="handlePick" :data="['全部', '普通消息', '会议消息']" slot="left" style="background-color: inherit;"></my-picker>
        <img class="icon-calendar" slot="right" src="../../assets/imgs/icon-calendar.png" alt="icon-calendar">
      </my-search>
      <section style="height: .8rem;"></section>
      <my-list-item v-for="(item, index) in list" :key="index" border>
        <section @click="$push({path: '/message/detail', query: {id: item.id}})" class="list-items">
            <p class="item-header">
              <span class="f14 margin-rg__10 item-type">{{item.classify}}</span>
              <span class="f14">来自于{{item.name}}</span>
              <span class="flex-empty"></span>
              <span class="f14 item-tips">{{item.status == 1 ? '已结束' : '待确认'}}</span>
            </p>
            <p class="f16 margin-bm__5">[主题]{{item.title}}</p>
            <p class="f13 margin-bm__5">
              {{item.content}}
            </p>
            <p class="flex flex-justify__between">
              <time class="f13">{{item.add_time}}</time>
              <span class="f13">共{{item.totals}}人, {{item.receive}}人已收到</span>
            </p>
          </section>
      </my-list-item>
    </my-list>
    <my-tabbar />
  </section>
</template>
<script>
import {mapActions} from 'vuex'
import MyTabbar from '@/components/common/tabbar'
import MyList from '@/views/layout/list'
import MyListItem from '@/views/layout/listItem'
import MySearch from '@/views/layout/search'
import MyPicker from '@/views/layout/picker'
import {
  reloadTitleMixin, pushRouter, getListMore
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyTabbar,
    MyListItem,
    MyList,
    MySearch,
    MyPicker,
  },
  data(){
    return {
      docTitle: '消息中心',
      isShowPicker: false, // 展示底层picker

      list: [],

      isShowText: '没有更多啦',
      isShowMore: false,
      search: {
        page: 1,
        keyword: '',
        category: '全部'
      },
      currIndex: -1,

    }
  },
  methods: {
    ...mapActions({
      'GetMessageList': 'GetMessageList'
    }),
    fetchData(){
      this.GetMessageList({search: this.search}).then(res => {
        this.list = this.list.concat(res)
        this.isShowMore = res.length == 10 ? true : false
        this.isShowText = res.length == 10 ? '正在加载更多' : '没有更多啦'
      })
    },
    getMore(){
      if(this.isShowMore){
        this.search.page ++
        this.fetchData()
      }
    },
    handlePick(e){
      this.list = []
      this.search.page = 1
      this.search.category = e.data
      this.fetchData()
    },
    handleInput(e){
      this.list = []
      this.search.page = 1
      this.search.keyword = e.keyword
      this.fetchData()
    }
  },
  created(){
    this.fetchData()
  },
  mixins: [reloadTitleMixin, pushRouter, getListMore]
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.content1-wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @base-background;
  overflow-y: scroll;
  .my-search{
    position: fixed;
    top: 0;
    left: 0;
  }
  .list-items{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    box-sizing: border-box;
    p{
      width: 100%;
    }
    .item-header{
      display: flex;
      align-items: center;
      justify-content:space-between;
      .item-tips{
        padding: .1rem .2rem;
        background-color: rgba(245,166,35,0.2);
        color: #f5a623;
      }
      .item-type{
        margin-right: .2rem;
        color: #0076ff;
      }
    }
  }
}
</style>
