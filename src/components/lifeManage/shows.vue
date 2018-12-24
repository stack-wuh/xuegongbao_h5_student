<template>
  <section class="wrapper">
      <section v-if="this.query.tag == '学期校历'" class="img-box">
        <img @click="prevImage" class="cal-img" :src="info" alt="info">
      </section>
      <section v-if="['校车时刻', '火车站路线'].includes(this.query.tag)">
        <p class="header">
          <img src="../../assets/imgs/bg-white.png" alt="bg-white">
          <h4 class="header__title">{{this.query.tag}}</h4>
        </p>
        <p v-html="info" class="text-content"></p>
      </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {ImagePreview } from 'vant'
import {
  reloadTitleMixin, getListMore
} from '@/utils/mixin'

export default {
  props: {},
  name: '',
  components: {},
  computed: {
    currPath(){
      return
    }
  },
  data(){
    return {
      info: {}
    }
  },
  methods: {
    ...mapActions({
      'SchoolCalendar': 'SchoolCalendar',
      'SchoolBus': 'SchoolBus',
      'SchoolTranstation': 'SchoolTranstation'
    }),

    prevImage(){
      ImagePreview([this.info])
    },

    fetchData(){
      switch(this.query.tag){
        case '学期校历': this.SchoolCalendar().then(res => {
          this.info = res.content
        })
          break;
        case '校车时刻': this.SchoolBus().then(res =>{
          this.info = res.content
        })
          break;
        case '火车站路线': this.SchoolTranstation().then(res => {
          this.info = res.content
        })
          break;
      }
    }
  },
  created(){
    this.docTitle = this.query.tag
    this.fetchData()
  },
  mixins: [reloadTitleMixin, ]
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .img-box{
    img.cal-img{
      width: 100vw;
      height: 5.4rem;
    }
  }
  p.header{
    position: relative;
    width: 100vw;
    height: 1.2rem;
    background-color: @base-color;
    img{
      position: absolute;
      top: 17%;
      width: inherit;
      height: 1rem;
    }
  }
  .header__title{
    position: absolute;
    top: 4%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

<style scoped>
  .text-content >>> p{
    padding: 0 .1rem;
    font-size: .28rem;
  }
</style>
