<template>
  <section class="wrapper">

    <section class="form-area">
      <van-cell-group>
          <van-cell title="年度">
            <span @click="handleOpenPopup(0)" class="c666" slot="right-icon">{{form.year || '请选择年度'}}</span>
          </van-cell>
          <van-cell title="名称">
            <van-field class="my-field" v-model='form.name' placeholder="请编辑证书名称" />
          </van-cell>
          <van-cell title="是否包含分项考试">
            <van-switch active-color="#00998d" v-model='form.has_sub' />
          </van-cell>
          <div v-if="!form.has_sub">
            <van-cell title="考试分数">
              <van-field class="my-field" v-model="form.score" />
            </van-cell>
            <van-cell title="及格分数">
              <van-field class="my-field" v-model="form.pass_score" />
            </van-cell>
          </div>
          <div v-else>
            <van-cell-group v-for="(item, index) in lists" :key="index">
              <van-cell v-for="(sub, sid) in item" :key="sid"  :title="sub.label">
                <van-field class="my-field" v-model="sub.value" />
              </van-cell>
              <van-cell title="">
                <div slot="right-icon">
                  <van-button @click="handleDelItem(index)" type="danger" size="small" class="margin-rg__15" >删除</van-button>
                  <van-button @click="handleAddItem" size="small" >添加更多</van-button>
                </div>
              </van-cell>
            </van-cell-group>
          </div>
      </van-cell-group>
    </section>
    <van-popup
      v-model="isShowPopup"
      position="bottom">
      <van-picker
        @cancel="isShowPopup = false"
        @confirm="handleChange"
        show-toolbar
        :columns="pickerList"
        value-key="label" >
      </van-picker>
    </van-popup>

    <my-button :childClick="handleSubmit" size="large" />

  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {formatTime} from '@/utils/global'
import MyButton from '@/views/forms/button'
export default {
  props: {},
  name: '',
  components: {
    MyButton,
  },
  computed: {
    // 返回新的picker列表
    pickerList(){
      return this.columns[this.currIndex]
    }
  },
  data(){
    return {
      isShowMore: false,
      isShowPopup: false,
      currIndex: -1,
      form: {
        year: '',
        has_sub: false,
        name: '',
        score: '',
        pass_score: '',
      },
      columns: [
        ['2018-2019'],
      ],

      lists: [
        [
          {
            label: '分项考试名称',
            field: 'name',
            value: '',
          },
          {
            label: '考试分数',
            field: 'score',
            value: '',
          },
          {
            label: '及格分数',
            field: 'pass_score',
            value: '',
          }
        ]
      ]
    }
  },
  methods: {
    ...mapActions({
      'GetYearList': 'GetYearList',
      'PostCertificateSub': 'PostCertificateSub'
    }),
    /**
     * [handleAddItem 添加考试证书 -- 分项考试]
     * @method handleAddItem
     * @return {[type]}      [description]
     */
    handleAddItem(){
      let _arr = this.lists[0].map(ii => {
        return ii = {...ii, value: ''}
      })
      let _list = JSON.parse(JSON.stringify(this.lists))
      _list.push(_arr)
      this.lists = _list
    },
    handleDelItem(index){
      this.lists.length > 1 && this.lists.splice(index, 1)
    },
    handleOpenPopup(index){
      this.isShowPopup = true
      this.currIndex = index
    },
    handleChange(e){
      switch(this.currIndex){
        case 0 : this.form.year = e
          break;
      }
      this.isShowPopup = false

    },
    handleSubmit(){
      let form = JSON.parse(JSON.stringify(this.form))
      form.has_sub = form.has_sub == true ? 1 : 0
      let subList = []
      this.lists.map((ii,iid) => {
        let obj = {}
        ii.map(ss => {
          obj[ss.field] = ss.value
        })
        subList.push(obj)
      })
      if(form.has_sub) {
        delete form.score
        delete form.pass_score
        form.subList = JSON.stringify(subList)
       }
      this.PostCertificateSub({form})
    }
  },
  created(){
    this.GetYearList().then(res => {
      this.columns[0] = res
    })
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
  padding-bottom: 10vh;
  overflow-y: scroll;
  .my-field{
    padding: 0;
    color: #666;
  }
  img[alt="upload"]{
    width: 2rem;
    height: 2rem;
  }
  .imgs-list{
    padding: .2rem;
  }
}
</style>
