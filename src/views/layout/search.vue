<template>
  <section class="wrapper search-wrapper" :class="[background ? 'background-base' : '']">
    <slot name="left"></slot>
    <section class="search-box">
      <van-field class="my-van-field" placeholder="搜索" >
        <img slot="left-icon"
          src="../../assets/imgs/icon-search-green.png"
          style="width: .4rem; height: .4rem; margin-right: .1rem;" alt="icon-search">
      </van-field>
    </section>
    <slot name="right"></slot>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    background: {
      type: Boolean,
      default: false
    }
  },
  name: '',
  components: {},
  computed: {},
  data(){
    return {}
  },
  methods: {},
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.search-wrapper{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: .8rem;
  padding: 0 .1rem;
  overflow: hidden;
  background-color: #fff;
  .search-box{
    flex: 1;
    height: inherit;
    padding: .1rem .2rem;
    border-radius: .4rem;
    .my-van-field{
      display: flex;
      align-items: center;
      padding: 0;
      padding: 0 .3rem;
      border-radius: .3rem;
      color: #333;
      background-color: @base-background;
    }
  }
}
.background-base{
  color: #fff;
  background-color: @base-color;
  .search-box{
    .my-van-field{
      color: @base-color;
    }
  }
}
</style>
