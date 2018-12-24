<template>
  <section class="wrapper">
    <header class="header">
      <h4 class="f16">测试</h4>
      <p class="f13 c999 margin-tp__5">测试u数据</p>
    </header>
    <section >

    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {
  reloadTitleMixin
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {}
  },
  methods: {},
  created(){
    this.docTitle = '提交结果'
  },
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  background-color: @base-background;
  header.header{
    padding: .2rem;
    height: 1.3rem;
    background-color: #fff;
  }
}
</style>
