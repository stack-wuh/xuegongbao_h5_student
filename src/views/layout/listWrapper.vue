<template>
  <section class="list-wrapper">
    <slot name="tab"></slot>
    <slot name="search"></slot>
    <van-list
      v-model = "loading"
      :finished = 'finished'
      finished-text = '没有更多了'
      @load = 'onLoad'
      >
      <slot></slot>
    </van-list>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad(e){
      this.loading = true
      setTimeout(() => {
        this.$emit('canGoNext', true)
        this.loading = false
      }, 1000)
      this.finished = true
    }
  },
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.list-wrapper{
  width: inherit;
  height: inherit;
  overflow-y: scroll;
  background-color: @base-background;
}
</style>
