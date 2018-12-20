<template>
  <section class="content-wrapper">
    <my-list-wrapper>
        <section slot="tab" class="header">
          <my-tab @lisenterIndex="handleChangeTabCurr" :data="tabs"></my-tab>
          <my-search @getInputChange="getInputChange" style="background-color: #fff;">
            <my-picker v-if="currTabIndex == 0"
              class="margin-rg__20"
              :data="data"
              @emitterPick="handlePicker" slot="left">
            </my-picker>
            <span @click="isShowPopup = true" v-if="currTabIndex == 1" slot="right" style="color: #00998d; margin-right: .1rem;">筛选</span>
          </my-search>
        </section>
        <section style="height: 1.6rem;" ></section>
        <my-list-item v-for="(item, index) in list" :key="index" border>
            <section class="item-box">
              <p class="f16">{{item.title}}</p>
              <p v-if="item.posts" class="item-elems">
                <span v-for="(sub, sid) in item.posts" :key="sid">{{sub.name}}</span>
                <img v-show="item.posts.length === 3" src="../../../assets/imgs/icon-more.png" alt="icon-more">
              </p>
              <p>时间: {{item.time}}</p>
              <p>发布时间: {{item.pubtime}}</p>
              <p>地点: {{item.location}}</p>
            </section>
        </my-list-item>
    </my-list-wrapper>
    <van-popup
      v-model="isShowPopup"
      position="right">
      <section class="popup-wrapper">
        <h4>请选择学校</h4>
        <p v-for="(item, index) in schools"
          :key="index" class="list-item"
          @click="handleChoose(item, index)"
          :class="[item.selected ? 'list-item__active' : '']">{{item.name}}</p>
        <section class="btn-area">
          <span @click="handleCancel">取消</span>
          <span @click="handleSubmit">确定</span>
        </section>
      </section>
    </van-popup>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyTab from '@/views/layout/tab'
import MyPicker from '@/views/layout/picker'
import MySearch from '@/views/layout/search'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import {
  reloadTitleMixin, changeTabCurr
} from '@/utils/mixin'

export default {
  props: {},
  name: '',
  components: {
    MyTab,
    MyPicker,
    MySearch,
    MyListWrapper,
    MyListItem
  },
  computed: {
    ...mapState({
      list: state => state.Job.schoolList,
      schools: state => state.Job.schools
    }),
  },
  data(){
    return {
      tabs: [
        {
          name: '学院发布'
        },
        {
          name: '其他来源'
        }
      ],
      data: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '收藏',
          value: 1
        }
      ],

      search: {
        page: 1,
        search: '',
        school: '',
      },
      pickIndex: -1,
      isShowPopup: false
    }
  },
  methods: {
    ...mapActions({
      'GetSchoolList': 'GetSchoolList',
      'GetSchoolCollect': 'GetSchoolCollect',
      'GetSchoolListOther': 'GetSchoolListOther',
      'GetSchools': 'GetSchools'
    }),
    ...mapMutations(['CLEAR_SCHOOL_ALL']),
    handleChangeTabCurr(e){
      this.docTitle = this.tabs[e.index].name
      this.currTabIndex = e.index
      this.CLEAR_SCHOOL_ALL()
      this.reLoadTitle()
      this.search = {
        page: 1,
        search: '',
        school: '',
      }
      this.pickIndex = -1
      this.fetchData()
      this.schools.forEach(ii => {
        ii.selected = false
      })
    },
    getInputChange(e){
      this.search.search = e.keyword
      this.fetchData()
    },
    handlePicker(e){
      this.pickIndex = e.data.value
      this.search = {
        page: 1,
        search: '',
      }
      this.fetchData()
    },
    handleChoose(item, index){
      item.selected = !item.selected
      this.search.school = this.schools.filter(ii => ii.selected).map(ii => ii.name).toString()
    },
    handleCancel(){
      this.isShowPopup = false
      this.schools.forEach(ii => ii.selected = false)
    },
    handleSubmit(){
      this.fetchData()
      setTimeout(() => {
        this.isShowPopup = false
      }, 1000)
    },
    fetchData(){
      let actions = new Map([
        [{index: 0, pick: 0, search: {...this.search}}, 'GetSchoolList'],
        [{index: 0, pick: -1, search: {...this.search}}, 'GetSchoolList'],
        [{index: 0, pick: 1, search: {...this.search, type: 1}}, 'GetSchoolCollect'],
        [{index: 1, pick: -1, search: {...this.search}}, 'GetSchoolListOther'],
        [{index: 1, pick: 0, search: {...this.search}}, 'GetSchoolListOther'],
        [{index: 1, pick: 1, search: {...this.search}}, 'GetSchoolListOther'],
      ])
      let action = [...actions].filter(([key, val]) => key.index === this.currTabIndex && key.pick === this.pickIndex)
      action.forEach(([key, val]) => {
        this[val]({search: key.search})
      })
    }
  },
  created(){
    this.docTitle = '学院发布'
    this.GetSchoolList({search: this.search})
    this.GetSchools()
  },
  mixins: [reloadTitleMixin, changeTabCurr]
}
</script>
<style lang="less" scoped>
@import  '../../../assets/style/color.less';
.content-wrapper{
  width: 100vw;
  height: inherit;
  overflow-y: scroll;
  background-color: @base-background;
  .header{
    position: fixed;
  }
  img[alt="icon-more"]{
    width: .4rem;
    height: .1rem;
  }
  .item-box{
    p, span{
      font-size: .26rem;
    }
    .item-elems{
      margin: .2rem 0;
      span{
        margin-right: .3rem;
        padding: .04rem .1rem;
        color: @base-color;
        background-color: #BAE3E0;
        border-radius: .08rem;
      }
    }
  }

  .popup-wrapper{
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    width: 90vw;
    height: 100vh;
    background-color: #fff;
    h4{
      margin: .3rem;
      align-self: flex-start;
      font-weight: normal;
    }
    .list-item{
      width: 70%;
      height: 1rem;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 1rem;
    }
    .list-item__active{
      color: #00998d;
      border-color: #00998d;
    }
    .btn-area{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: .8rem;
      margin-top: 1rem;
      span{
        display: inline-block;
        flex:1;
        line-height: 2;
        text-align: center;
      }
      span:first-of-type{
        background-color: #ccc;
        color: #fff;
      }
      span:last-of-type{
        background-color: #00998d;
        color: #fff;
      }
    }
  }
}
</style>
