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
                  <span>{{sub.value || sub.placeholder}}</span>
                </p>
                <p class="label-cell label-cell__input"
                   v-if = "sub.type == 'default'">
                   <van-field
                      :label="sub.label"
                      :value="sub.value"
                      :placeholder="sub.placeholder"/>
                </p>
                <div class="list-item__content">
                  <van-cell-group>
                      <van-field
                        v-if="sub.type === 'textarea'"
                        v-model="sub.value"
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
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin, pushRouter} from '@/utils/mixin'
import MyButton from '@/views/forms/button'
const menuList = [
  {
    name: '是否担任班级干部',
    isChecked: true,
    child: [
      [
        {
          label: '岗位名称' ,
          field: '',
          value: '',
          type: 'select',
          placeholder: '选择岗位名称'
        },
        {
          label: '主要工作说明',
          field: '',
          value: '',
          type: 'textarea',
          placeholder: '请简要说明工作内容'
        }
      ]
    ]
  },
  {
    name: '是否担任院级干部',
    isChecked: false,
    child: [
      [
        {
          label: '岗位名称' ,
          field: '',
          value: '',
          type: 'select',
          placeholder: '请选择岗位名称'
        },
        {
          label: '部门',
          field: '',
          value: '',
          type: 'default',
          placeholder: '请编辑部门'
        },
        {
          label: '主要工作内容',
          field: '',
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
    child: [
        [
          {
            label: '岗位名称' ,
            field: '',
            value: '',
            type: 'select',
            placeholder: '请选择岗位名称'
          },
          {
            label: '部门',
            field: '',
            value: '',
            type: 'default',
            placeholder: '请编辑部门'
          },
          {
            label: '主要工作内容',
            field: '',
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
    child: [
      [
        {
          label: '主要工作内容' ,
          field: '',
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
    child: [
      [
        {
          label: '主要工作内容' ,
          field: '',
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
      isShow: false,
      menuList,
      content: '',
      docTitle: '个人履历'
    }
  },
  methods: {
    handleAddItem(index){
      let newArr = this.menuList[index].child[0]
      let menuList = JSON.parse(JSON.stringify(this.menuList))
      menuList[index].child.push(newArr)
      this.menuList = menuList
    },
    handleSubmit(){
      console.log('is clicked ')
    }
  },
  created(){},
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
