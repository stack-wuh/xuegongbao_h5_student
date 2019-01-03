<template>
  <section class="content-wrapper">
    <section class="form-wrapper"
      v-for="(item, index) in menuList"
      :key="index">
      <section class="label-cell">
        <section class="label-cell__left">
          <span class="label-cell__title">{{item.name}}</span>
        </section>
        <section class="label-cell__right">
          <van-switch
            v-if = 'item.child'
            v-model="item.isChecked" ></van-switch>
        </section>
      </section>
      <section v-show = "item.isChecked" class="detail-cell">
        <ul class="child-list">
          <li class="list-item">
            <template v-for="(cc, cid) in item.child">
              <div class="" v-for="(sub, sid) in cc" :key = "cid + sub.label + sid">
                <p
                  class="label-cell"
                  v-if="sub.type == 'select'">
                  <span>{{sub.label}}</span>
                  <span @click="handleOpenDialog(index, cid)">{{item.forms.post[cid][sub.field] || sub.placeholder}}</span>
                </p>
                <p class="label-cell label-cell__input"
                   v-if = "sub.type == 'default'">
                   <van-field
                      :label="sub.label"
                      :value="sub.value"
                      v-model="item.forms.post[cid][sub.field]"
                      :placeholder="sub.placeholder"/>
                </p>
                <div class="list-item__content">
                  <van-cell-group>
                      <van-field
                        v-if="sub.type === 'textarea'"
                        v-model="item.forms.post[cid][sub.field]"
                        :label = 'sub.label'
                        :type = 'sub.type'
                        :placeholder = 'sub.placeholder'
                        rows = '2'
                        autoszie />
                  </van-cell-group>
                </div>
              </div>
              <div class="item-btn__area">
                <van-button @click="handleAddItem(index)"
                  size="small" :plain = 'true'>
                  继续添加</van-button>
              </div>
            </template>
          </li>
        </ul>
      </section>
    </section>
    <section
      class="label-cell label-cell__input"
      style="padding: 0 .3rem; background-color: #fff;
      color: #666; margin-bottom: 2rem;">
      <p style="line-height: 2;">其他说明(包括创业经历等)</p>
      <van-field v-model="content"
        type="textarea"
        placeholder="请简要说明" />
    </section>
    <my-button size="large" :childClick="handleSubmit"></my-button>
    <van-popup v-model="isShowPopup" position="bottom">
      <van-picker
        show-toolbar
        @cancel="isShowPopup = false"
        @confirm="handleChangePicker"
        :columns="columns"
        value-key="name"></van-picker>
    </van-popup>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin, pushRouter} from '@/utils/mixin'
import MyButton from '@/views/forms/button'
const menuList = [
  {
    name: '是否担任班级干部',
    isChecked: false,
    forms:{
      post: [{}]
    },
    rename: 'banji',
    child: [
      [
        {
          label: '岗位名称' ,
          field: 'post_name',
          value: '',
          type: 'select',
          placeholder: '选择岗位名称',
        },
        {
          label: '主要工作说明',
          field: 'content',
          value: '',
          type: 'textarea',
          placeholder: '请简要说明工作内容',
        }
      ]
    ]
  },
  {
    name: '是否担任院级干部',
    isChecked: false,
    forms: {
      post: [{}]
    },
    rename: 'yuanji',
    child: [
      [
        {
          label: '岗位名称' ,
          field: 'post_name',
          value: '',
          type: 'select',
          placeholder: '请选择岗位名称'
        },
        {
          label: '部门',
          field: 'department',
          value: '',
          type: 'default',
          placeholder: '请编辑部门'
        },
        {
          label: '主要工作内容',
          field: 'content',
          value: '',
          type: 'textarea',
          placeholder: '请简要说明工作内容'
        }
      ]
    ]
  },
  {
    name: '是否担任校级干部',
    isChecked: false,
    forms: {
      post: [{}]
    },
    rename: 'xiaoji',
    child: [
        [
          {
            label: '岗位名称' ,
            field: 'post_name',
            value: '',
            type: 'select',
            placeholder: '请选择岗位名称'
          },
          {
            label: '部门',
            field: 'department',
            value: '',
            type: 'default',
            placeholder: '请编辑部门'
          },
          {
            label: '主要工作内容',
            field: 'content',
            value: '',
            type: 'textarea',
            placeholder: '请简要说明工作内容'
          }
        ]
      ],
  },
  {
    name: '是否参加社团组织',
    isChecked: false,
    forms: {
      post: [{}]
    },
    rename: 'shetuan',
    child: [
      [
        {
          label: '主要工作内容' ,
          field: 'content',
          value: '',
          type: 'textarea',
          placeholder: '请简要说明工作内容'
        }
      ]
    ]
  },
  {
    name: '是否有实习经验',
    isChecked: false,
    forms: {
      post: [{}]
    },
    rename: 'shixi',
    child: [
      [
        {
          label: '主要工作内容' ,
          field: 'content',
          value: '',
          type: 'textarea',
          placeholder: '请简要说明工作内容'
        }
      ]
    ]
  }
]
export default {
  props: {},
  name: '',
  components: {
    MyButton
  },
  computed: {},
  data(){
    return {
      isShowPopup: false,
      menuList,
      content: '',
      docTitle: '个人履历',

      columns: [],
      allColumns: [],
      level_1: -1,
      level_2: -1,
    }
  },
  methods: {
    ...mapActions({
      'PostRecordList': 'PostRecordList',
      'PostRecordSub': 'PostRecordSub'
    }),
    handleAddItem(index){
      let newArr = this.menuList[index].child[0]
      let menuList = JSON.parse(JSON.stringify(this.menuList))
      menuList[index].child.push(newArr)
      menuList[index].forms.post.push({})
      this.menuList = menuList
    },
    handleOpenDialog(index, evl){
      this.level_1 = index
      this.level_2 = evl
      this.isShowPopup = true
      switch(index){
        case 0 : return this.columns = this.allColumns.banji
        case 1 : return this.columns = this.allColumns.yuanji
        case 2 : return this.columns = this.allColumns.xiaoji
      }
    },
    handleChangePicker(e){
      this.menuList[this.level_1].forms.post[this.level_2] = {...this.menuList[this.level_1].forms.post[this.level_2], post: e.id, post_name: e.name}
      this.isShowPopup = false
    },
    handleSubmit(){
      let form = {}
      let data = {qita: {content: this.content}}
      this.menuList.map(ii => {
        let obj = {}
        data[ii.rename] = {
          work: ii.isChecked,
          post: ii.forms.post
        }
      })
      form.year = this.query.name
      form.data = JSON.stringify(data)
      this.PostRecordSub({form})
    }
  },
  created(){
    this.PostRecordList().then(res => {
      this.allColumns = res
    })
  },
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.content-wrapper{
  width: 100vw;
  height: 100vh;
  background-color: #eff7fd;
  overflow-y: scroll;
  .child-list{
    .list-item{
      .item-btn__area{
        height: 1rem;
        padding: 0 .3rem;
        text-align: right;
        line-height: 1rem;
        background-color: #eff7fd;
      }
    }
  }
  .label-cell__input{
    overflow: hidden;
    .van-field{
      padding: 0;
    }
  }
}
</style>
