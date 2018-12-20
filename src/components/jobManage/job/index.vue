<template>
  <section class="content-wrapper">
    <my-list-wrapper>
      <my-search @getInputChange="getInputChange">
        <my-picker @emitterPick="handlePicker" :data="pick" slot="left" ></my-picker>
      </my-search>
      <my-list-item border>
        <section class="item-box flex flex-flow__col">
          <p>
            <span>2018移动端测试</span>
            <img src="../../../assets/imgs/icon-collected-s.png" alt="icon">
          </p>
          <p>
            <span>测试岗位</span>
            <span>测试岗位</span>
          </p>
          <p>发布时间: 2018asdasdasd</p>
        </section>
      </my-list-item>
    </my-list-wrapper>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MySearch from '@/views/layout/search'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import MyPicker from '@/views/layout/picker'
import {
  reloadTitleMixin
} from '@/utils/mixin'

export default {
  props: {},
  name: '',
  components: {
    MyListWrapper, MyListItem, MySearch, MyPicker
  },
  computed: {},
  data(){
    return {
      pick: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '收藏',
          value:1
        }
      ],
      pickIndex: 0
    }
  },
  methods: {
    getInputChange(e){
      console.log(e)
    },
    handlePicker(e){
      this.pickIndex = e.data.value
      console.log(e)
    }
  },
  created(){
    this.docTitle = '招聘信息'
  },
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>

</style>
