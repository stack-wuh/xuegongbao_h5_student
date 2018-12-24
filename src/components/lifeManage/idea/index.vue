<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-search background slot="search">
        <my-picker @emitterPick="emitterPick" :data="temp_category" slot="left" ></my-picker>
        <img @click="$push({path: '/base/form', query: {name: '意见征集'}})" src="../../../assets/imgs/icon-edit-white.png" alt="icon-edit" slot="right" />
      </my-search>
      <my-list-item v-for="(item, index) in list" :key="index" border>
        <span class="item-title" :class="temp_color[item.category_name]" slot="left">{{item.category_name}}</span>
        <section class="item-content">
          <p class="flex flex-justify__between">
            <span class="item-content__title">
              提交对象: {{item.object}}
            </span>
            <time class="item-content__time">{{item.date}}</time>
          </p>
          <p :class="[!item.isOpen ? 'text-over' : '' ]" >{{item.content}}{{item.content}}</p>
          <p @click="handleToggleState(index)" class="item-content__btn">{{!item.isOpen ? '展开' : '隐藏'}}</p>
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
  reloadTitleMixin, getListMore, pushRouter
} from '@/utils/mixin'


const categoryList = ['全部', '功能改进', '生活', '情感', '就业' ,'学习']
const categoryColor = ['item-base', 'item-base_1', 'item-base_2', 'item-base_3', 'item-base_4']
export default {
  props: {},
  name: '',
  components: {
    MyList,
    MyListItem,
    MyPicker,
    MySearch,
  },
  computed: {
    temp_category(){
      return categoryList.map(ii => {
        return ii = {label: ii, value: ii}
      })
    },
    temp_color(){
      let _obj = {}
      categoryList.map((ii ,ild) => {
        _obj[ii] = categoryColor[ild]
      })
      return _obj
    }
  },
  data(){
    return {
      isShowText: '没有更多啦',
      search: {
        page: 1,
        search: '',
        categoryName: '全部',
      },
      list: [],
      isShowMore: false,
    }
  },
  methods: {
    ...mapActions({
      'IdeasList': 'IdeasList'
    }),
    /**
     * [handleToggleState 展开/关闭按钮事件]
     * @method handleToggleState
     * @param  {[type]}          index [description]
     * @return {[type]}                [description]
     */
    handleToggleState(index){
      this.$set(this.list[index], 'isOpen', !this.list[index]['isOpen'])
    },
    /**
     * [emitterPick MyPicker 的change事件]
     * @method emitterPick
     * @param  {[type]}    e [description]
     * @return {[type]}      [description]
     */
    emitterPick(e){
      this.list = []
      this.search.categoryName = e.data.value
      this.fetchData()
    },
    /**
     * [fetchData fetch]
     * @method fetchData
     * @return {[type]}  [description]
     */
    fetchData(){
      this.isShowText = '正在加载更多'
      this.IdeasList({search: this.search}).then(res => {
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
  mixins: [reloadTitleMixin, getListMore, pushRouter]
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
