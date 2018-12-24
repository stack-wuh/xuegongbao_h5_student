<template>
<section class="wrapper form-wrapper">
  <section class="form-list">
    <van-cell-group>
      <van-field v-model="form[item.field]"
        v-if="item.type === 'default'"
        v-for="(item, index) in formLists(search).list"
        :key="index"
        :label="item.label"
        :placeholder="item.placeholder || '请编辑' + item.label"  />
      <van-cell @click="handleToggleupop({type: item.type, index, field: item.field})"
        v-if="item.type === 'select'"
        is-link v-for="(item, index) in formLists(search).list"
        :key="index" :title="item.label"
        :value="form[item.field] ||  '请选择' + item.label">
      </van-cell>
      <section
        v-for="(item, index) in formLists(search).list"
        :key="index"  class="label-cell"
        v-if="item.type == 'switch'">
        <section class="label-cell__left">
          <span class="label-cell__title">{{item.label}}</span>
        </section>
        <section class="label-cell__right">
          <van-switch
            v-model="form[item.field]" ></van-switch>
        </section>
      </section>
      <van-cell @click="handleToggleupop({type: item.type, index, field: item.field})"
        v-if="item.type === 'date'"
        is-link v-for="(item, index) in formLists(search).list"
        :key="index" :title="item.label"
        :value="form[item.field] || '请选择' + item.label">
      </van-cell>
      <van-field v-model="form[item.field]"
        v-if="item.type === 'textarea'"
        v-for="(item, index) in formLists(search).list"
        :key="index"
        :label="item.label"
        type="textarea"
        rows = '1'
        autosize
        :placeholder="item.placeholder || '请编辑' + item.label"  />
    </van-cell-group>
    <slot name="img-uploader"></slot>
    <van-popup position="bottom" v-model = 'isShowPupop'>
      <van-picker
        v-if="types == 0" show-toolbar
        :columns = "formLists(search).list[currClickIndex].list"
        @confirm = '(e) => {this.handleConfirm({label: this.field, value: e})}'
        @cancel = 'handleCancel'
        value-key = 'label'>
      </van-picker>
      <van-datetime-picker
        @cancel="handleCancel"
        @confirm="(e) => {this.handleConfirm({label: this.field, value: e})}"
        v-if="types > 1" :type="picks[types]" >
      </van-datetime-picker>
    </van-popup>
  </section>
  <section class="btn-area">
    <my-base-button :childClick="handleClick" size="large" />
  </section>
</section>
</template>
<script>
import {
  mapState
} from 'vuex'
import {reloadTitleMixin} from '@/utils/mixin'
import {mapGetters, mapActions} from 'vuex'
import MyBaseButton from '@/views/forms/button'

export default {
  props: {},
  name: '',
  components: {
    MyBaseButton
  },
  computed:{
    ...mapState({
      'form': 'form'
    }),
    ...mapGetters({
      'formLists': 'getFormList'
    }),
    search(){
      return this.$route.query
    }
  },
  data() {
    return {
      isShowPupop: false, //是否展示pupor遮罩层
      types: -1, // popup展示的类型

      currIndex: -1, //选中的那一项的下标
      picks: ['select', 'datetime', 'date', 'time'],
      field: '', //备选的字段号
      currClickIndex: -1, //点击元素的序列号
    }
  },
  methods: {
    ...mapActions({
      'handleSaveForm': 'handleSaveForm',
      'PostIdeaInfo': 'PostIdeaInfo',
      'PostApplyInfo': 'PostApplyInfo'
    }),
    /**
     * [handleToggleupop description]
     * @method handleToggleupop
     * @return {[type]}         [popup展示的类型, -1: 不展示, 0: picker, 1: DateTimerPicker, 2: date, 3: time]
     */
    handleToggleupop({type, field, index}){
      let _arr = ['select', 'datetime', 'date', 'time']
      this.isShowPupop = !this.isShowPupop
      this.types = _arr.indexOf(type)
      this.field = field
      this.currClickIndex = index
    },

    handleCancel(){
      this.isShowPupop = false
      this.types = -1
    },
    handleConfirm({label, value}){
      this.isShowPupop = false
      this.types = -1
      let form = {
        field: label,
        value: typeof(value) === 'object' ? value.value || value : value
      }
      this.handleSaveForm({form})
    },
    handleClick(){
      let actions = new Map([
        [{name: '意见征集'}, 'PostIdeaInfo'],
        [{name: '资助申请'}, 'PostApplyInfo']
      ])
      let action = [...actions].filter(([key, val]) => key.name == this.query.name)
      action.forEach(([key, val]) => {
        this[val].call(this, {form: this.form})
      })
      console.log('this is click submit', this.form)
    }
  },
  created() {
    this.docTitle = this.formLists(this.search).docTitle || '学工宝学生端公众号'
  },
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
.form-wrapper{
  width: 100vw;
  height: 100vh;
  .btn-area{
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: 1.6rem;
    background-color: #fff;
  }
}
</style>
