<template>
  <section class="wrapper">
    <section class="tabbar">
      <ul class="tabbar-list">
        <li @click="handleChangeTabCurr({index: 0})" class="tabbar-item" :class="[currTabIndex == 0 ? 'tabbar-item__active' : '']">通知</li>
        <li @click="handleChangeTabCurr({index: 1})" class="tabbar-item" :class="[currTabIndex == 1 ? 'tabbar-item__active' : '']">招募令</li>
      </ul>
    </section>
    <slot name="search"></slot>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {changeTabCurr} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {

    }
  },
  methods: {},
  created(){},
  mixins: [changeTabCurr]
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: .8rem;
  .tabbar{
    width: inherit;
    height: .8rem;
    .tabbar-list{
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      background-color: @base-color;
      .tabbar-item{
        flex: 1;
        height: 100%;
        text-align: center;
        line-height: 2;
        color: #fff;
      }
      .tabbar-item__active{
        color: #333;
        color: @base-color;
        background-color: #fff;
        border-top-left-radius: .1rem;
        border-top-right-radius: .1rem;
      }
    }
  }
}
</style>
