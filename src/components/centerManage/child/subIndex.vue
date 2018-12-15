<template>
  <section class="content-wrapper">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text='没有更多了'
      @load="onLoad"
      >
      <ul class="list-wrapper">
        <li class="list-item__base flex flex-justify__between" v-for="(item, index) in 10" :key="index">
          <section>
            <p>国家奖学金</p>
            <p>获奖学年: 2015-2016</p>
            <p>奖励分: 2分</p>
          </section>
          <section>
            <img src="../../../assets/imgs/logo.png" alt="logo" class="item__logo">
          </section>
        </li>
      </ul>
    </van-list>
    <section @click="$push({path: '/center/subindex/awardSub', query: {name: query.name}})" class="load-wrapper">
      <img src="../../../assets/imgs/center/icon-edit-white.png" alt="icon-edit">
      <p>添加</p>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin, pushRouter} from '@/utils/mixin'

export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad(){
      setTimeout(() => {
        this.loading = false
        this.finished = true
      }, 300)
    }
  },
  created(){},
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.content-wrapper{
  position: relative;
  overflow-y: scroll;
  background-color: @base-background;
  .load-wrapper{
    position: fixed;
    right: .4rem;
    bottom: .4rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 50%;
    color: #fff;
    background-color: @base-color;
    box-shadow: 0 0 .1rem #999;
    img{
      width: .45rem;
      height: .45rem;
    }
    p{
      margin-top: .1rem;
      font-size: .14rem;
    }
  }

  .list-wrapper{
    .list-item__base{
      min-height: 1.65rem;
      padding: .1rem .2rem;
      background-color: #fff;
      border-bottom: .1rem solid @base-background;
      box-sizing: border-box;

    }
    img.item__logo{
      width: 1.2rem;
      height: 1.2rem;
    }
  }
}
</style>
