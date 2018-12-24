<template>
  <section class="list-wrapper">
    <section @scroll.native="handleScholl" class="list-content">
      <slot name="tab"></slot>
      <slot name="search"></slot>
      <slot></slot>
      <p class="tips-text">{{finishedText}}</p>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    finishedText: {
      default: '加载中...',
      type: String
    }
  },
  name: '',
  components: {},
  computed: {},
  data(){
    return {}
  },
  methods: {},
  created(){},
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.list-wrapper{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  background-color: @base-background;

  p.tips-text{
    width: 100vw;
    height: 10vh;
    text-align: center;
    line-height: 10vh;
    background-color: @base-background;
  }
}
</style>
