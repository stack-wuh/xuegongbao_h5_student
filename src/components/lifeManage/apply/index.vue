<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-search background slot="search">
        <my-picker @emitterPick="emitterPick" :data="cateList" slot="left" ></my-picker>
        <img src="../../../assets/imgs/icon-edit-white.png" alt="icon-edit" slot="right" />
      </my-search>
      <my-list-item v-for="(item, index) in list" :key="index" border>
        <section class="item-content">
          <p class="flex flex-justify__between">
            <span class="item-content__title">{{item.apply_type}}</span>
            <time class="item-content__time">{{item.apply_date}}</time>
          </p>
          <p class="text-over" >{{item.apply_reason}}</p>
          <p class="item-content__btn">展开</p>
        </section>
      </my-list-item>
    </my-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyList from '@/views/layout/list'
import MyListItem from '@/views/layout/listItem'
import MyPicker from '@/views/layout/picker'
import MySearch from '@/views/layout/search'
import {
  reloadTitleMixin, getListMore
} from '@/utils/mixin'


export default {
  props: {},
  name: '',
  components: {
    MyList,
    MyListItem,
    MyPicker,
    MySearch,
  },
  computed: {},
  data(){
    return {
      isShowText: '没有更多啦',
      search: {
        page: 1,
        search: '',
        type: 0
      },
      list: [],
      isShowMore: false,

      cateList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '奖学金',
          value: '奖学金'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      'ApplyList': 'ApplyList'
    }),
    emitterPick(e){
      this.list = []
      this.search.type = e.data.value
      this.fetchData()
    },
    fetchData(){
      this.isShowText = '正在加载更多'
      this.ApplyList({search: this.search}).then(res => {
        this.list = this.list.concat(res)
        this.isShowMore = res.length == 10 ? true : false
        this.isShowText = res.length == 10 ? '加载中' : '没有更多啦'
      })
    }
  },
  created(){
    this.docTitle = this.query.tag
    this.fetchData()
  },
  mixins: [reloadTitleMixin, getListMore]
}
</script>
<style lang="less" scoped>
.content-wrapper{
  .item-title{
    width: 1rem;
    padding-right: .2rem;
    margin-right: .1rem;
    border-right: .04rem solid red;
    font-size: .36rem;
    text-align: center;
  }
  .item-base{
    color: #4a90e2;
    border-right: .04rem solid #4a90e2;
  }
  .item-base_1{
    color: #7ed321;
    border-right: .04rem solid #7ed321;
  }
  .item-base_2{
    color: #f5a623;
    border-right: .04rem solid #f5a623;
  }
  .item-base_3{
    color: #ff6b64;
    border-right: .04rem solid #ff6b64;
  }
  .item-base_4{
    color: #00998d;
    border-right: .04rem solid #00998d;
  }

  .item-content{
    *{
      font-size: .26rem;
    }
    .item-content__title{
      font-size: .3rem;
    }
    .item-content__time{
      color: #999;
    }
    .item-content__btn{
      color: #4a90e2;
      text-align: right;
    }
  }
}
</style>
