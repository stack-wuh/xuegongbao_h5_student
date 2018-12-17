<template>
  <section class="wrapper picker-wrapper">
    <span class="picker-label__text" @click="isShowPopup = true">{{pickText}}</span>
    <van-popup
      v-model="isShowPopup"
      position='bottom'
      :overlay="true">
      <van-picker
        show-toolbar
        @change="onChange"
        :columns = 'data'
        @cancel="onCancel"
        @confirm="onConfirm"
        :title = 'title'
        :value-key = 'valueKey'
        ></van-picker>
    </van-popup>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: []
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    valueKey: {
      type: String,
      required: false,
      default: ''
    },
    index: {
      type: [String, Number],
      required: false,
      default: 0
    }
  },
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      isShowPopup: false,
      pickText: '全部',
      pickValue: '',
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
      this.pickText = e[this.valueKey]
      this.$emit('emitterPick', {index: this.index, data: e})
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
