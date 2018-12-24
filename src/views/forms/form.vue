<template>
  <section class="my-form-wrapper">
    <section class="form-list">
      <slot></slot>
    </section>
    <section style="height: 10vh;" ></section>
      <section class="my-form-btn">
        <span class="my-btn my-btn__cancel">取消</span>
        <span class="my-btn my-btn__submit">确定</span>
      </section>
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
    return {}
  },
  methods: {},
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.my-form-wrapper{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  background-color: @base-background;
  *{
    font-size: .36rem;
    color: #999;
  }
  .form-list{
    background-color: #fff;
  }
  .my-form-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 10vh;
    padding: 0 .3rem;
    background-color: #fff;
    .my-btn{
      flex:1;
      max-width: 350vw;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      border:1px solid #eee;
      border-radius: 4px;
      color: #fff;
    }
    .my-btn__cancel{
      margin-right: .3rem;
      background-color: @base-danger;
    }
    .my-btn__submit{
      background-color: @base-color;
    }
  }
}
</style>
