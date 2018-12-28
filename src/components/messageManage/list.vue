<template>
  <section class="content-wrapper">
    <my-list @scoll.native="handleScholl" :finishedText="isShowText">
      <section class="my-header">
        <my-search @getInputChange="handleInputChange" slot="tab" background></my-search>
        <my-tab @lisenterIndex="handleTabChange"  slot="search" :data="[{name: '已签到'}, {name: '未签到'}]"></my-tab>
      </section>
      <section style="height: 1.6rem;"></section>
      <my-list-item v-for="(item, index) in list" :key="index" border>
        <img slot="left" :src="item.wx_pic || defaultImg" alt="avatar" class="margin-rg__15">
        <section>
          <p class="f16">{{item.name}}({{item.number}})</p>
          <p class="f13 margin-tp__5">接收时间: {{item.times || '暂无'}}</p>
        </section>
      </my-list-item>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyList from '@/views/layout/list'
import MyListItem from '@/views/layout/listItem'
import MySearch from '@/views/layout/search'
import MyTab from '@/views/layout/tab'
import {reloadTitleMixin, getListMore, changeTabCurr} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyList,
    MyListItem,
    MySearch,
    MyTab,
  },
  computed: {},
  data(){
    return {
      isShowText: '没有更多啦',
      isShowMore: false,

      list: [],
      
    }
  },
  methods: {
    ...mapActions(['GetMessageReciveList', 'GetMessageUnReciveList']),
    fetchData(){
      if(this.currTabIndex == 0){
        this.GetMessageReciveList({id: this.query.id}).then(res => {
          this.list = this.list.concat(res)
          this.isShowMore = res.length == 10 ? true : false
          this.isShowText = res.length == 10 ? '正在加载更多' : '没有更多啦'
        })
      }else{
        this.GetMessageUnReciveList({id: this.query.id}).then(res => {
          this.list = this.list.concat(res)
          this.isShowMore = res.length == 10 ? true : false
          this.isShowText = res.length == 10 ? '正在加载更多' : '没有更多啦'
        })
      }
    },
    handleInputChange(e){

    },
    handleTabChange(e){
      this.list = []
      this.currTabIndex = e.index
      this.fetchData()
    },
  },
  created(){
    this.docTitle = '接收人列表'
    this.fetchData()
  },
  mixins: [reloadTitleMixin, getListMore, changeTabCurr],
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.content-wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: @base-background;
  img[alt="avatar"]{
    width: 1.2rem;
    height: 1.2rem;
  }
  .my-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }
}
</style>
