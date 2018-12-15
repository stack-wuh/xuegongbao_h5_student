<template>
  <section class="tabbar-wrapper">
    <van-tabbar class="my-van-tabbar" fixed  v-model="active">
      <van-tabbar-item v-for="(item, index) in tabbarList" :key="index" :to="item.path" :dot="item.info>0">
        <span :class="[$route.path === item.path ? 'my-tabbar__text-active' : 'my-tabbar__text' ]">{{item.name}}</span>
        <img slot="icon" slot-scope="props" :src="$route.path === item.path ? item.active : item.normal" :alt="props.active">
      </van-tabbar-item>
    </van-tabbar>
  </section>
</template>
<script>

const tabbarList = [
  {
    name: '首页',
    normal: require('@/assets/imgs/icon-01.png'),
    active: require('@/assets/imgs/icon-01-s.png'),
    info: 0,
    path: '/index',
  },
  {
    name: '消息',
    normal: require('@/assets/imgs/icon-02.png'),
    active: require('@/assets/imgs/icon-02-s.png'),
    info: 1,
    path: '/message',
  },
  {
    name: '我的',
    normal: require('@/assets/imgs/icon-03.png'),
    active: require('@/assets/imgs/icon-03-s.png'),
    info: 1,
    path: '/center',
  }
]
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      active: 0,

      tabbarList, // 导航栏列表
    }
  },
  methods: {},
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.tabbar-wrapper{
  height: 1rem;
  // overflow: hidden;
  .my-van-tabbar{
    height: 1rem;
    .my-tabbar__text{
      color: @text-color;
      font-size: .2rem;
    }
    .my-tabbar__text-active{
      color: @base-color;
      font-size: .2rem;
    }
  }
}
</style>
