<template>
  <section class="wrapper picker-wrapper">
    <span class="picker-label__text" @click="isShowPopup = true">全部</span>
    <van-popup
      v-model="isShowPopup"
      position='bottom'
      :overlay="true">
      <van-picker
        show-toolbar
        @change="onChange"
        :columns = 'columns'
        @cancel="onCancel"
        @confirm="onConfirm"
        ></van-picker>
    </van-popup>
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
    return {
      isShowPopup: false,
      columns: [
        {
          text: '杭州',
          value: 1,
        },
        {
          text: '宁波',
          value: 2,
        },
        {
          text: '温州',
          value: 3,
        }
      ]
    }
  },
  methods: {
    onChange(e){
      console.log(e, 'this is change emitter')
    },
    onCancel(e){
      this.isShowPopup = false
      console.log(e, 'this is cancel emitter')
    },
    onConfirm(e){
      this.isShowPopup = false
      console.log(e, 'this is confirm emitter')
    }
  },
  created(){}
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.picker-wrapper{
  .picker-label__text{
    color: @base-color;
  }
}
</style>
