<template>
  <section class="wrapper">
    <section class="list-item">
      <p>
        <span class="item-tips">普通消息</span>来自张小二
      </p>
      <p class="item__title text-over">[主题]测试</p>
      <p class="item__desc">测试</p>
      <p class="item__info flex flex-justify__between">
        <time>2018年12月06日 14:50分</time>
        <span>共497人, 0人已收到</span>
      </p>

      <div :class="['list-item__tips', 3 % 2 ? 'list-item__tips-active' : 'list-item__tips-normal']">
        已结束
      </div>
    </section>

    <section class="list-col">
      <span>图片</span>
      <img src="" alt="">
    </section>
    <section class="list-col">
      <span>表单</span>
      <img src="" alt="">
    </section>
    <section class="list-col">
      <span>接收人: </span>
    </section>
  </section>
</template>
<script>
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {}
  },
  methods: {},
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @base-background;
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

  .list-col{
    width: 100vw;
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    border-bottom: .02rem solid #eee;
  }
}
</style>
