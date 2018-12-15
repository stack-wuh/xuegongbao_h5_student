<template>
  <section class="content-wrapper">
    <my-list-wrapper>
      <section class="header-wrapper">
        <my-tab name="tab"></my-tab>
        <my-search name="search">
          <my-picker slot="left"></my-picker>
        </my-search>
      </section>
      <section style="height: 1.6rem;"></section>
      <my-list-item class="my-list-item" v-for="(item, index) in 10" :key="index" border >
        <div slot="left" class="left-wrapper">
          自创
        </div>
        <div class="center-wrapper">
          <p>111111</p>
          <div class="flex">
            <p>
              <span class="sub__title">发布时间: </span>
              <time>2018-12-14</time>
            </p>
            <p>
              <span class="sub__title">截止时间: </span>
              <time>2018-12-14</time>
            </p>
          </div>
        </div>
      </my-list-item>
    </my-list-wrapper>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import MyListWrapper from '@/views/layout/listWrapper'
import MyListItem from '@/views/layout/listItem'
import MyTab from '@/views/layout/tab'
import MySearch from '@/views/layout/search'
import MyPicker from '@/views/layout/picker'
export default {
  props: {},
  name: '',
  components: {
    MyListWrapper,
    MyListItem,
    MyTab,
    MySearch,
    MyPicker
  },
  computed: {},
  data(){
    return {}
  },
  methods: {
    lisenterIndex(e){
      console.log(e)
    }
  },
  created(){}
}
</script>
<style lang="less" scoped>
.content-wrapper{
  .header-wrapper{
    position: fixed;
  }
  .my-list-item{
    display: flex;
    height: 1.6rem;
  }
  .left-wrapper{
    padding-right: .2rem;
    margin-right: .1rem;
    border-right: .04rem solid red;
    font-size: .36rem;
  }
  .center-wrapper{
    p, span{
      font-size: .28rem;
    }
  }
}
</style>
