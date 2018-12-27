<template>
  <section class="wrapper">
    <h4 class="wrapper-title f16">{{info.title}}</h4>
    <p class="wrapper-time f13">{{info.addtime}}</p>
    <article class="wrapper-detail">
      {{info.content}}
    </article>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {
  reloadTitleMixin, pushRouter
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      info: {}
    }
  },
  methods: {
    ...mapActions({
      'GetExamDetail': 'GetExamDetail'
    })
  },
  created(){
    this.GetExamDetail({id: this.query.id}).then(res => {
      this.info = res
      this.docTitle = res.title
    })
  },
  mixins: [reloadTitleMixin, pushRouter],
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  padding: .3rem;
  text-align: center;
  background-color: @base-background;
  .wrapper-title{
    font-weight: normal;
  }
  .wrapper-detail{
    margin-top: .2rem;
  }
}
</style>
