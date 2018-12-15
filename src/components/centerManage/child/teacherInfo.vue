<template>
  <section class="content-wrapper flex flex-flow__col flex-align__center">
    <section class="img-box">
      <img :src="defaultImg" alt="avatar">
    </section>
    <h3 class="info-name">陶俊贞</h3>
    <p class="info-gray">电话: 未公开</p>
    <p class="info-gray">邮箱: 未公开</p>
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

    }
  },
  methods: {},
  created(){},
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.content-wrapper{
  background-color: @base-background;

  .img-box{
    img{
      width: 2.8rem;
      height: 2.8rem;
      margin-top: 2rem;
      border-radius: 50%;
    }
  }
  .info-name{
    margin:.2rem;
    font-size: .44rem;
    font-weight: normal;
  }
  .info-gray{
    margin: .1rem;
    color: #666;
    font-size: .36rem;
  }
}
</style>
