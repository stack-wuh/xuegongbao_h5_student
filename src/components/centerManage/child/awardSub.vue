<template>
  <section class="content-wrapper">
    <section class="form-list">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in formLists(query).list"
          v-if="item.type == 'default'"
          :title="item.label"
          >
          <van-field class="my-field" v-model="form[item.field]" style="height: 100%; padding: 0;" />
        </van-cell>
        <van-cell
          v-if = "item.type === 'select'"
          v-for="(item, index) in formLists(query).list"
          :title="item.label"
          :value="form[item.field] || item.placeholder"
          @click="handleToggle({field: item.field})"
          ></van-cell>
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
      <van-uploader
        style="margin-bottom: .2rem;"
        :after-read="handleUploadSuccess">
        <img class="icon-upload" :src="defaultImg" alt="upload">
      </van-uploader>
      <div v-for="(item, index) in imgList"
        :key="index" class="upload-list margin-rg__10 margin-bm__10">
        <img :src="item" class="icon-upload" alt="logo">
        <img @click="handleDelImg(index)" :src="iconDelete" class="icon-delete" alt="icon-del">
      </div>
      <span class="flex-empty"></span>
      <span class="flex-empty"></span>
      <span class="flex-empty"></span>
      <span class="flex-empty"></span>
      <span class="flex-empty"></span>
      <span class="flex-empty"></span>
      <span class="flex-empty"></span>
      <span class="flex-empty"></span>
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
      imgList: [], // 图片上传的临时地址
      defaultImg: require('@/assets/imgs/icon-upload.png'),

      // form:{},
    }
  },
  methods: {
    ...mapActions({
      'handleSaveFormByField': 'handleSaveFormByField',
      'handleSaveForm': 'handleSaveForm',
      'PostAward': 'PostAward',
      'GetBurseList': 'GetBurseList',
      'GetYearList': 'GetYearList',
      'GetAwardNameList': 'GetAwardNameList',
      'GetPatendList': 'GetPatendList',
      'GetPrizeList': 'GetPrizeList'
    }),
    handleToggle({field}){
      this.isShowPopup = !this.isShowPopup
      this.field = field
    },
    /**
     * [handleUploadSuccess 图片上传成功]
     * @method handleUploadSuccess
     * @return {[type]}            [description]
     */
    handleUploadSuccess(file){
      let formData = new FormData()
      formData.append('file', file.file)
      window.axois({
        method: 'post',
        url: window.rootPath + "upload/uploadImg",
        data: formData
      }).then(res => {
        if(!res.data.error){
          window.$toast.clear()
          this.imgList.push(res.data.msg)
        }
      })
    },
    /**
     * [handleDelImg 删除已上传的图片]
     * @method handleDelImg
     * @param  {[type]}     index [图片数组下标]
     * @return {[type]}           [description]
     */
    handleDelImg(index){
      this.imgList.splice(index, 1)
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
      let form = {...this.form, pic: this.imgList}
      let result = this.formLists(this.query).list.filter(ii => ii.isRequired).map(ss => ss.field).every(ee => form[ee])
      if(!result){
        this.$toast({type: 3, msg: '请编辑必填项目之后提交'})
        return
      }
      switch(this.query.name){
        case '奖学金': return form = {...form, type_: 'burse'}, this.PostAward({form})
        case '荣誉称号': return form = {...form, type_: 'title'}, this.PostAward({form})
        case '软著专利': return form = {...form, type_: 'patent'}, this.PostAward({form})
        case '获奖情况': return form = {...form, type_: 'prize'}, this.PostAward({form})
      }
    },
    /**
     * [fetchData 页面内全部的get请求]
     * @method fetchData
     * @return {[type]}  [description]
     */
    fetchData(){
      switch(this.query.name){
        case '奖学金': return this.GetYearList(), this.GetBurseList()
        case '荣誉称号': return this.GetAwardNameList(), this.GetYearList()
        case '软著专利': return  this.GetYearList(), this.GetPatendList()
        case '获奖情况': return this.GetYearList(), this.GetPrizeList()
      }
    }
  },
  created(){
    this.docTitle = `编辑${this.$route.query.name}`
    this.fetchData()
  },
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
.content-wrapper{
  .upload-list{
    position: relative;
    top: 0;
    left: 0;
    .icon-delete{
      position: absolute;
      top:-10%;
      right: 0%;
    }
  }
  .img-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100vw;
    min-height: 2rem;
    padding: .4rem .3rem;

    .icon-upload{
      width: 2rem;
      height: 2rem;
      margin-right: .2rem;
    }
    .icon-delete{
      width: .4rem;
      height: .4rem;
    }
  }

  .flex-empty{
    visibility: hidden;
    width: 33%;
  }
}
</style>
