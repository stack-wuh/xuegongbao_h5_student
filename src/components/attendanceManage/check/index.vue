<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-search class="my-header" @getInputChange="handleInputChange" background></my-search>
      <section style="height: 1rem;"></section>
      <section class="list-header">
        <span>考勤列表</span>
        <span @click="isShowPopup = true" class="btn__pick">筛选</span>
      </section>
      <my-list-item v-for="(item, index) in list" :key="index" >
        <img slot="left"
          :src="item.category == 1 ? sign1 :
          item.category == 2 ? sign2 :
          item.category == 3 ? sign3 :
          item.category == 4 ? sign4 : sign5"
          alt="logo">
        <section>
          <p class="flex flex-justify__between">
            <span>{{item.category_name}}</span>
            <span>{{item.start_time}}</span>
          </p>
          <p>
            <span>备注: {{item.comments}}</span>
          </p>
        </section>
        <span
          class="item-sub"
          slot="right"
          :class="'signin'+ item.state">
          {{item.state == 1 ? '签到' : item.state == 2 ? '迟到' : item.state == 3 ? '请假' : '旷到'}}
        </span>
      </my-list-item>
    </my-list>

    <van-popup
      v-model="isShowPopup"
      position="right">
      <section class="my-dialog" >
        <p class="my-dialog__title">签到类型</p>
        <ul class="list">
          <li class="item"
            v-for="(item, index) in category"
            :key="index"
            :class="[item.value ? 'item__active' : '', ]"
            @click="chooseOne(item)">{{item.label}}
          </li>
          <li class="flex-empty__hidden"></li>
          <li class="flex-empty__hidden"></li>
          <li class="flex-empty__hidden"></li>
          <li class="flex-empty__hidden"></li>
          <li class="flex-empty__hidden"></li>
          <li class="flex-empty__hidden"></li>
        </ul>
        <p class="my-dialog__title">签到状态</p>
        <ul class="list">
          <li class="item"
            v-for="(item, index) in state"
            :key="index"
            :class="[item.value ? 'item__active' : '', ]"
            @click="chooseOne(item)">{{item.label}}
          </li>
          <li class="flex-empty__hidden"></li>
          <li class="flex-empty__hidden"></li>
          <li class="flex-empty__hidden"></li>
        </ul>
        <section class="btn-area">
          <span @click="isShowPopup = false" class="btn__cancel">取消</span>
          <span @click="handleSubmit" class="btn__submit">确定</span>
        </section>
      </section>
    </van-popup>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MySearch from '@/views/layout/search'
import MyList from '@/views/layout/list'
import MyListItem from '@/views/layout/listItem'
import {
  reloadTitleMixin, getListMore
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MySearch,
    MyList,
    MyListItem,
  },
  computed: {},
  data(){
    return {
      isShowText: '没有更多啦',
      isShowMore: false,
      search: {
        keyword: '',
        category: '',
        state: '',
        page: 1
      },
      list: [],
      isShowPopup: false,

      sign1: require('@/assets/imgs/signin/signin1.png'),
      sign2: require('@/assets/imgs/signin/signin2.png'),
      sign3: require('@/assets/imgs/signin/signin3.png'),
      sign4: require('@/assets/imgs/signin/signin4.png'),
      sign5: require('@/assets/imgs/signin/signin5.png'),

      category:[
        {
          label: '课程',
          value: false,
          index: 1,
        },
        {
          label: '晚点名',
          value: false,
          index: 2,
        },
        {
          label: '宿舍',
          value: false,
          index: 3,
        },
        {
          label: '会议讲座',
          value: false,
          index: 4,
        },
        {
          label: '其他',
          value: false,
          index: 5,
        }
      ],
      state: [
        {
          label: '签到',
          value: false,
          index: 1,
        },
        {
          label: '迟到',
          value: false,
          index: 2,
        },
        {
          label: '请假',
          value: false,
          index: 3,
        },
        {
          label: '旷到',
          value: false,
          index: 4,
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      'GetCheckList': 'GetCheckList'
    }),
    chooseOne(item){
      item.value = !item.value
    },
    handleSubmit(){
      this.list = []
      this.search.page = 1
      this.search.category = this.category.filter(ii => ii.value).map(ss => ss.index).toString()
      this.search.state = this.state.filter(ii => ii.value).map(ss => ss.index).toString()
      setTimeout(() => {
        this.fetchData()
        this.isShowPopup = false
      }, 500)
    },
    fetchData(){
      this.GetCheckList({search: this.search}).then(res => {
        this.list = this.list.concat(res)
        this.isShowText = res.length == 10 ? '正在加载更多' : '没有更多啦'
        this.isShowMore = res.length == 10 ? true : false
      })
    },
    handleInputChange(e){
      this.list = []
      this.search.page = 1
      this.search.keyword = e.keyword
      this.fetchData()
    },
    getMore(){
      if(this.isShowMore){
        this.search.page ++
        this.fetchData()
      }
    }
  },
  created(){
    this.docTitle = '考勤评定'
    this.fetchData()
  },
  mixins: [reloadTitleMixin, getListMore]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.content-wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: @base-background;

  .my-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }

  .list-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .3rem .2rem;
    border-bottom: 1px solid #eee;
    background-color: #fff;

    .btn__pick{
      padding: .04rem .2rem;
      border-radius: .2rem;
      border: 1px solid #00998d;
      color: #00998d;
    }
  }

  *{
    font-size: .28rem;
  }
  img[alt="logo"]{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .2rem;
  }
  .item-sub{
    margin-left: .2rem;
  }

  .signin1{
    color: #00998d;
  }
  .signin2{
    color: #ffab34;
  }
  .signin3{
    color: #5c76fc;
  }
  .signin4{
    color: #ff3d3d;
  }

  .my-dialog{
    width: 90vw;
    height: 100vh;
    padding: .2rem;
    background-color: #fff;

    .my-dialog__title{
      margin: .2rem 0;
    }
    .list{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-right: -.3rem;
      .item{
        position: relative;
        width: 25%;
        padding: .2rem 0;
        margin-right: .3rem;
        margin-bottom: .3rem;
        text-align: center;
        border:1px solid #eee;
      }
      .item__active{
        position: relative;
        border:1px solid #00998d;
        color: #00998d;
      }
      .item__active::after{
        position: absolute;
        right: -.22rem;
        bottom: -.24rem;
        content: '';
        padding: .3rem;
        background-image: url('../../../assets/imgs/icon-selected.png');
        background-size: .4rem;
        background-repeat: no-repeat;
      }
      .flex-empty__hidden{
        visibility: hidden;
      }
    }
    .btn-area{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 90vw;
      height: 8vh;
      line-height: 8vh;
      text-align: center;
      border-top: 1px solid #eee;

      span{
        display: inline-block;
        width: 50%;
      }
      .btn__submit{
        color: #fff;
        background-color: #00998d;
      }
      .btn__cancel{
        background-color: #ccc;
        color: #fff;
      }
    }
  }
}
</style>
