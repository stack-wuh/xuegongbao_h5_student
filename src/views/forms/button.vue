<template>
  <section class="btn-wrapper">
    <van-button @click="childClick" :size="size" :class="type" >{{text}}</van-button>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    text: {
      type: String,
      default: '确定'
    },
    type:{
      type:String,
      default: 'primary'
    },
    childClick:{
      type: Function,
      required: true,
    }
  },
  components: {},
  computed: {},
  data(){
    return {
    }
  },
  methods: {

  },

  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.btn-wrapper{
  position: fixed;
  bottom: 5vh;
  left: 0;
  width: 100vw;
  height: .8rem;
  padding: 0 .4rem;
  button{
    height: .8rem;
    line-height: .8rem;
  }
  .primary{
    color: @text-color-revser;
    background-color: @base-color;
  }
}
</style>
