<template>
  <section class="wrapper content-wrapper">
    <header class="header">
      <span @click="isShowPicker = true">全部 <img class='arrow-white-down' src="../../assets/imgs/arrow-white-down.png" alt="arrow-white-down" /></span>
      <span class="flex-empty"></span>
      <img class="icon-search margin-rg__15" src="../../assets/imgs/icon-search.png" alt="icon-search">
      <img class="icon-calendar" src="../../assets/imgs/icon-calendar.png" alt="icon-calendar">
    </header>
    <div style="height: .8rem;"></div>
    <van-list v-model="isLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load = 'onLoad'>
      <div class="list-item" @click="$router.push({path: '/message/info', query: {id: item}})" v-for="(item, index) in 4" :key="index" >
        <p>
          <span class="item-tips">普通消息</span>来自张小二
        </p>
        <p class="item__title text-over">[主题]测试</p>
        <p class="item__desc">测试</p>
        <p class="item__info flex flex-justify__between">
          <time>2018年12月06日 14:50分</time>
          <span>共497人, 0人已收到</span>
        </p>

        <div :class="['list-item__tips', item % 2 ? 'list-item__tips-active' : 'list-item__tips-normal']">
          已结束
        </div>
      </div>
    </van-list>

    <my-tabbar />
    <van-popup
      v-model="isShowPicker"
      position="bottom" >
        <van-picker
          show-toolbar
          :columns = "[1, 2, 3, 4]"
          @confirm = "isShowPicker = false"
          @cancel = "isShowPicker = false" ></van-picker>
    </van-popup>
  </section>
</template>
<script>
import MyTabbar from '@/components/common/tabbar'
import {reloadTitleMixin} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyTabbar
  },
  data(){
    return {
      docTitle: '消息中心',
      isShowPicker: false, // 展示底层picker
      isLoading: false, //loading状态
      finished: false , //是否加载更多

      list: [],
    }
  },
  methods: {
    onLoad(){
      console.log('is attach bottom')
      setTimeout(() => {
        for(let i =0; i < 20; i++){
          this.list.push(this.list.length+1)
        }
        this.isLoading = false
        if(this.list.length >= 40){
          this.finished = true
        }
      }, 500)
    }
  },
  created(){},
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.wrapper{
  background-color: @base-background;
  overflow-y: scroll;
  header.header{
    position: fixed;
    top:0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: inherit;
    height: .8rem;
    padding: 0 .4rem;
    line-height: .8rem;
    color: @text-color-revser;
    background-color: @base-color;
    z-index: 1000 ;
  }

  .list-item{
    position: relative;
    width: 100vw;
    padding: .2rem;
    margin-top: .2rem;
    background-color: #fff;

    .list-item__tips{
      position: absolute;
      top: 0;
      right: .2rem;
      width: 1.4rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
    }
    .list-item__tips-active{
      color: #7ed321;
      background-color: rgba(126, 211, 33, 0.2)
    }
    .list-item__tips-normal{
      color: #f5a623;
      background-color:rgba(245,166,35,0.2);
    }

    .item__title{
      margin-top: .1rem;
    }

    .item-tips{
      margin-right: .2rem;
      color: @base-blue;
    }
    .item__desc,
    .item__info{
      margin-top: .1rem;
      color: #666;
      font-size: .28rem;
    }
  }
}
</style>
