<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-search @getInputChange="getInputChange">
        <my-picker @emitterPick="handlePicker" :data="pick" slot="left" ></my-picker>
      </my-search>
      <my-list-item v-for="(item, index) in list" :key="index" border>
        <section @click="$push({path: '/index/job/detail', query: {tag: query.tag, id: item.id}})" class="item-box flex flex-flow__col">
          <p class="flex flex-justify__between item__title">
            <span class="f16">2018移动端测试</span>
            <img @click.stop="handleCollect(item.id)" :src="item.collect ? collectActive : collectDefault" alt="icon-collect">
          </p>
          <p v-if="item.posts" class="tips-list">
            <span v-for="(sub, sid) in item.posts" :key="sid">{{sub.name}}</span>
            <img v-show="item.posts.length === 3"  src="../../../assets/imgs/icon-more.png" alt="icon-more">
          </p>
          <p>发布时间: 2018asdasdasd</p>
        </section>
      </my-list-item>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MySearch from '@/views/layout/search'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import MyPicker from '@/views/layout/picker'
import MyList from '@/views/layout/list'
import {
  reloadTitleMixin, getListMore, pushRouter
} from '@/utils/mixin'

export default {
  props: {},
  name: '',
  components: {
    MyListWrapper, MyListItem, MySearch, MyPicker, MyList
  },
  computed: {},
  data(){
    return {
      pick: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '收藏',
          value:1
        }
      ],
      pickIndex: 0,

      search: {
        search: '',
        page: 1,
        classify: ''
      },

      list: [],
      isShowMore: false,
      isShowText: '没有更多啦'
    }
  },
  methods: {
    ...mapActions({
      'GetJobList': 'GetJobList',
      'HignSchoolCollect': 'HignSchoolCollect',
      'JobCollect': 'JobCollect'
    }),
    getInputChange(e){
      this.search.search = e.keyword
      this.fetchData()
    },
    handlePicker(e){
      this.list = []
      this.search = {page: 1, search: ''}
      this.pickIndex = e.data.value
      this.search.classify = e.data.label
      this.fetchData()
    },
    handleCollect(id){
      this.list = []
      this.HignSchoolCollect({id, type: 2}).then(res => {
        if(!res.error) this.fetchData()
      })
    },
    getMore(){
      if(this.isShowMore){
        this.search.page ++
        this.GetJobList({search: this.search}).then(res => {
          this.list = this.list.concat(res)
          this.isShowMore = this.list.length == 10 ? true : false
        })
      }
    },
    fetchData(){
      this.isShowText = '更在加载更多'
      if(this.pickIndex == 0){
        this.GetJobList({search: this.search}).then(res => {
          this.list = this.list.concat(res)
          this.isShowMore = this.list.length == 10 ? true : false
        })
      }else if(this.pickIndex == 1){
        this.JobCollect({search: {...this.search, type: 2}}).then(res => {
          this.list = this.list.concat(res)
          this.isShowMore = this.list.length == 10 ? true : false
        })
      }
      this.isShowText = '没有更多啦'
    }
  },
  created(){
    this.docTitle = '招聘信息'
    this.fetchData()
  },
  mixins: [reloadTitleMixin, getListMore, pushRouter]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';


.content-wrapper{
  .item-box{
    width: inherit;
    p, span{
      font-size: .26rem;
    }
    p.item__title{
      width: 100%;
    }
    p.tips-list{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: .2rem 0;
      span{
        margin-right: .3rem;
        padding: .04rem .1rem;
        color: @base-color;
        background-color: #BAE3E0;
        border-radius: .08rem;
      }
    }
  }
}
</style>
