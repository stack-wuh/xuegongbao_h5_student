<template>
  <section class="content-wrapper">
    <section class="form-list">
      <van-cell-group>
        <van-cell
          v-if = "item.type === 'select'"
          v-for="(item, index) in formLists(query).list"
          :title="item.label"
          :value="form[item.field] || item.placeholder"
          @click="handleToggle({field: item.field})"></van-cell>
          <van-cell
            v-if = "item.type === 'panel'"
            v-for="(item, index) in formLists(query).list"
            :title="item.label"
            :value = "form[item.field] || item.placeholder"
            ></van-cell>
      </van-cell-group>
      <van-popup v-model="isShowPopup"
        position="bottom">
        <van-picker show-toolbar
          :columns = "selectList({field, list: formLists(query).list}).list"
          @cancel="handleCancel"
          @confirm="handleConfirm"
          value-key="label"></van-picker>
      </van-popup>
    </section>
    <section class="img-box">
      <van-uploader>
        <img class="icon-upload" :src="defaultImg" alt="upload">
      </van-uploader>
    </section>

    <section>
        <my-button size="large" :childClick="handleClickSubmit"></my-button>
    </section>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin, pushRouter} from '@/utils/mixin'
import MyButton from '@/views/forms/button'
export default {
  props: {},
  name: '',
  components: {
    MyButton
  },
  computed: {
    ...mapState({
      'form': 'form'
    }),
    ...mapGetters({
      'formLists': 'getFormList',
      'selectList': 'getSelectList',
    }),
  },
  data(){
    return {
      isShowPopup: false, //是否展示dialog框
      field: '', //当前选定的字段

      defaultImg: require('@/assets/imgs/icon-upload.png')
    }
  },
  methods: {
    ...mapActions({
      'handleSaveFormByField': 'handleSaveFormByField',
      'handleSaveForm': 'handleSaveForm'
    }),
    handleToggle({field}){
      this.isShowPopup = !this.isShowPopup
      this.field = field
    },

    handleCancel(){
      this.isShowPopup = false
      this.field = ''
    },
    handleConfirm(e){
      let _date = this.selectList({field: this.field, list: this.formLists(this.query).list}) // 得到当前的下拉列表
      if(_date.child){
        this.handleSaveFormByField({form: {...e, field: this.field, child: _date.child}}) // 有child子元素就用这个方法保存子元素
      }else {
        this.handleSaveForm({form: {field: this.field, value: e.value}})  // 没有就保存值
      }
      this.handleCancel()
    },

    handleClickSubmit(){
      console.log('this is index')
    }
  },
  created(){
    this.docTitle = `编辑${this.$route.query.name}`
  },
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
.content-wrapper{
  .img-box{
    width: 100vw;
    height: 2rem;
    padding: .4rem .3rem;

    .icon-upload{
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
