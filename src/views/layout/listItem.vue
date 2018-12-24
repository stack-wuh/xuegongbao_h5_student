<template>
  <section class="list-item__wrapper">
    <section class="list-item" :class="[border ? 'border-top' : 'border-bottom']">
      <slot name="left"></slot>
      <section class="list-item__center">
        <slot></slot>
      </section>
      <slot name="right"></slot>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    border:{
      type: Boolean,
      default: false,
    }
  },
  name: '',
  components: {},
  computed: {},
  data(){
    return {}
  },
  methods: {

  },
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.list-item__wrapper{
  width: inherit;
  background-color: #fff;
  .list-item{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    min-height: 1rem;
    padding: .2rem .3rem;
    color: #333;
    background-color: #fff;
    .list-item__center{
      flex: 1;
      max-width: 100vw;
      overflow: hidden;
    }
  }

  .border-top{
    border-top: .2rem solid @base-background;
  }
  .border-bottom{
    border-bottom: 1px solid #eee;
  }
}
</style>
