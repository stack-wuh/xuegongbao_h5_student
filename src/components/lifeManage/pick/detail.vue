<template>
  <section class="wrapper">
    <header class="header">
      <h4 class="f16">{{query.title || '暂无'}}</h4>
      <p class="f13 c999 margin-tp__5">{{query.desc || '暂无内容'}}</p>
    </header>
    <section
      v-if="!item.number"
      class="list"
      v-for="(item, index) in list" :key="index" >
      <p class="list-item">选项{{index + 1}}</p>
      <section class="item">
        <p class="flex flex-justify__between">
          <span class="item-title">{{item.title}}</span>
          <van-checkbox class="margin-rg__15" v-model="item.isChecked" />
        </p>
        <p v-if="item.url" class="item-img-list">
          <img  class="item-avatar" :src="item.url" alt="logo">
        </p>
      </section>
    </section>
    <section v-else  class="list-curr">
      <p class="item-curr flex">
        <span>{{item.title}}: {{item.number}}票</span>
        <van-progress style="flex: 1; margin-left: .2rem;"
          :percentage="item.rate"
          :pivot-text="item.rate + '%'" pivot-color="#00998d"
          color="linear-gradient(to right, #00998d, #00998d)"
         />
      </p>
    </section>

    <my-button v-if="isShow" size="large" :childClick="handleSubmit" />
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyButton from '@/views/forms/button'
import {
  reloadTitleMixin
} from '@/utils/mixin'
export default {
  props: {},
  name: '',
  components: {
    MyButton,
  },
  computed: {},
  data(){
    return {
      isChecked: true,
      list: [],
      isShow: true
    }
  },
  methods: {
    ...mapActions({
      'VoteDetail': 'VoteDetail',
      'VoteAdd': 'VoteAdd'
    }),
    fetchData(){
      this.VoteDetail({id: this.query.id}).then(res => {
        let count = 0
        res.map(ii => {
            if(ii.number) count += ii.number, this.isShow = false
        })
        if(!isNaN(count) && count!=0){
          res.map(ii => {
            if(ii.number) ii.rate = parseFloat((ii.number/count)) * 100
            return ii
          })
        }
        this.list = res
      })
    },
    handleSubmit(){
      let pid = this.list[0].pid, id = ''
      id = this.list.filter(ii => ii.isChecked).map(ss => ss.id).toString()
      this.VoteAdd({pid, id})
    }
  },
  created(){
    this.docTitle = '提交结果'
    this.fetchData()
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
    min-height: 1.3rem;
    background-color: #fff;
  }
  .list{
    width: 100vw;
    overflow: hidden;
    .list-item{
      margin: .2rem 0;
    }
    .item{
      padding: .2rem 0;
      background-color: #fff;
      .item-title{
        padding-left: .2rem;
        border-left: .1rem solid #00998d;
      }
      .item-img-list{
        padding: 0 .2rem;
      }
      .item-avatar{
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }

  .list-curr{
    width: inherit;
    height: 6vh;
    padding: .2rem;
    box-sizing: border-box;
    span{
      font-size: .26rem;
    }
  }
}
</style>
