<template>
  <section class="content-wrapper">
    <my-list @scroll.native="handleScholl" :finishedText="isShowText">
      <my-list-item v-for="(item, index) in list" :key="index" >
        <section>
          <p>{{item.name}}</p>
          <p class="f13 c999">获奖学年: {{item.years}}</p>
          <p class="f13 c999">奖励分: {{item.score}}分</p>
        </section>
        <img @click="handlePrevImg(item)" slot="right" :src="item.pic && item.pic[0] || defaultImg" alt="logo">
      </my-list-item>
    </my-list>
    <section @click="$push({path: query.name == '已发表论文' ? '/center/thesis/sub' : query.name == '考试证书' ? '/center/certificate/sub' : '/center/subindex/awardSub', query: {name: query.name}})" class="load-wrapper">
      <img src="../../../assets/imgs/center/icon-edit-white.png" alt="icon-edit">
      <p>添加</p>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin, pushRouter, getListMore} from '@/utils/mixin'
import {ImagePreview } from 'vant'

import MyList from '@/views/layout/list'
import MyListItem from '@/views/layout/listItem'
export default {
  props: {},
  name: '',
  components: {
    MyList,
    MyListItem,
  },
  computed: {},
  data(){
    return {
      isShowText: '没有更多啦',
      isShowMore: false,

      list: [],
    }
  },
  methods: {
    ...mapActions({
      'GetAwardList' : 'GetAwardList',
      'GetCertificateList': 'GetCertificateList'
    }),
    getMore(){

    },
    /**
     * [handlePrevImg 图片预览]
     * @method handlePrevImg
     * @param  {[type]}      item [description]
     * @return {[type]}           [description]
     */
    handlePrevImg(item){
      ImagePreview(item.pic)
    },
    /**
     * [fetchData ]
     * @method fetchData
     * @return {[type]}  [description]
     */
    fetchData(){
      this.GetAwardList().then(res => {
        if(this.query.name === '奖学金'){
          this.list = res.burse.list
          this.isShowText = res.burse.hint && res.burse.hint
        }else if(this.query.name === '荣誉称号'){
          this.list = res.title.list
          this.isShowText = res.title.hint && res.title.hint
        }else if(this.query.name === '软著专利'){
          this.list = res.patent.list
          this.isShowText = res.patent.hint && res.patent.hint
        }else if(this.query.name ===  '获奖情况'){
          this.list = res.prize.list
          this.isShowText = res.prize.hint && res.prize.hint
        }else if (this.query.name == '已发表论文'){
          this.list = res.thesis.list
          this.isShowText = res.thesis.hint && res.thesis.hint
        }
      })
    }
  },
  created(){
    if(this.query.name == '考试证书'){
      this.GetCertificateList().then(res => {
        this.list = res.list
        this.isShowText = res.hint || '没有更多啦'
      })
    }else {
      this.fetchData()
    }
  },
  mixins: [reloadTitleMixin, pushRouter, getListMore]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.content-wrapper{
  position: relative;
  overflow-y: scroll;
  background-color: @base-background;
  .load-wrapper{
    position: fixed;
    right: .4rem;
    bottom: .4rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 50%;
    color: #fff;
    background-color: @base-color;
    box-shadow: 0 0 .1rem #999;
    img{
      width: .45rem;
      height: .45rem;
    }
    p{
      margin-top: .1rem;
      font-size: .14rem;
    }
  }

  img[alt="logo"]{
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>
