<template>
  <section class="wrapper">
    <section class="tabbar">
      <ul class="tabbar-list">
          <li
            v-for="(item, index) in data" :key="index"
            @click="handleChangeTabCurr({index})"
            class="tabbar-item"
            :class="[currTabIndex == index ? 'tabbar-item__active' : '']">{{item.name}}</li>
      </ul>
    </section>
    <slot name="search"></slot>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {changeTabCurr} from '@/utils/mixin'
export default {
  props: {
    data: {
      type: Array,
      default: [
        {
          name: '标签1'
        },
        {
          name: '标签2'
        }
      ],
      required: false
    }
  },
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
        color: #fff;
        font-size: .28rem;
        line-height: 3;
      }
      .tabbar-item__active{
        color: @base-color;
        font-size: .32rem;
        line-height: 2;
        background-color: #fff;
        border-top-left-radius: .1rem;
        border-top-right-radius: .1rem;
      }
    }
  }
}
</style>
