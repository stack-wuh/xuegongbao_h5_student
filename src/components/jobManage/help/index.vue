<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-search @getInputChange="getInputChange">
        <my-picker @emitterPick="handlePicker" :data="pick" slot="left" ></my-picker>
      </my-search>
      <my-list-item v-for="(item, index) in list" :key="index" border>
        <section @click="$push({path: '/index/help/detail', query: {tag: query.tag, id: item.id}})" class="item-box flex flex-flow__col">
          <p class="flex flex-justify__between item__title">
            <span class="f16">{{item.title}}</span>
            <img @click.stop="handleCollect(item.id)" :src="item.collect ? collectActive: collectDefault" alt="icon-collect">
          </p>
          <p>联系人: {{item.contact}}</p>
          <p class="flex flex-justify__between item__title">
            <span>发布时间: {{item.pubtime}}</span>
            <span class="danger-text">￥{{item.pay}}/月</span>
          </p>
          <p>要求: {{item.describe}}</p>
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
      'HelpListAll': 'HelpListAll',
      'HelpListColl': 'HelpListColl',
      'HelpCollect': 'HignSchoolCollect'
    }),
    handleCollect(id){
      this.list = []
      this.HelpCollect({id, type: 3}).then(res => {
        if(!res.error) this.fetchData()
      })
    },
    getInputChange(e){
      this.list = []
      this.search.search = e.keyword
      this.fetchData()
    },
    handlePicker(e){
      this.pickIndex = e.data.value
      this.list = []
      this.fetchData()
    },
    getMore(){
      if(this.isShowMore){
        this.search.page ++
        this.fetchData()
      }
    },
    fetchData(){
      this.isShowText = '更在加载更多'
      if(this.pickIndex == 0){
        this.HelpListAll({search: this.search}).then(res => {
          this.list = this.list.concat(res)
          this.isShowMore = this.list.length == 10 ? true : false
          this.isShowText = '没有更多啦'
        })
      }else {
        this.HelpListColl({search: {...this.search, type: 3}}).then(res => {
          this.list = this.list.concat(res)
          this.isShowMore = this.list.length == 10 ? true : false
          this.isShowText = '没有更多啦'
        })
      }
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
  .danger-text{
    color: @base-danger;
  }
}
</style>
