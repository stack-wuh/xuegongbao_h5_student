<template>
  <section class="wrapper search-wrapper" :class="[background ? 'background-base' : '']">
    <slot name="left"></slot>
    <section class="search-box">
      <van-field v-model="keyword" class="my-van-field" placeholder="搜索" >
        <img
          @click="handleChange"
          slot="left-icon"
          src="../../assets/imgs/icon-search-green.png"
          style="width: .4rem; height: .4rem; margin-right: .1rem;" alt="icon-search">
      </van-field>
    </section>
    <slot name="right"></slot>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {
  changeInput
} from '@/utils/mixin'
export default {
  props: {
    background: {
      type: Boolean,
      default: false
    },
  },
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      keyword: ''
    }
  },
  methods: {
    handleChange(){
      this.$emit('getInputChange', {keyword: this.keyword})
    }
  },
  created(){},
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
  background-color: @base-color !important;
  .search-box{
    .my-van-field{
      color: @base-color !important;
    }
  }
}
</style>
