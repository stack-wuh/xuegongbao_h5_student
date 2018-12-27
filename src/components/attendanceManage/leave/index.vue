<template>
  <section class="wrapper">
    <section class="form-area">
        <p class="form-title">请假原因</p>
        <van-field
          class="form-textarea"
          type="textarea" rows="4"
          placeholder="请编辑请假原因"
          v-model="form.reason"></van-field>
        <p class="form-title">添加图片</p>
        <section class="form-imgs">
          <van-uploader class="uploader-box" :after-read="onRead">
              <van-icon name="photograph" />
          </van-uploader>
          <div v-for="(item, index) in form.url" :key="index"  class="imgs-box">
            <img :src="item" alt="avatar" />
            <img @click="handleDeleteImg(index)" src="../../../assets/imgs/icon-delete.png" alt="delete">
          </div>
          <div class="flex-empty__hidden"></div>
          <div class="flex-empty__hidden"></div>
          <div class="flex-empty__hidden"></div>
          <div class="flex-empty__hidden"></div>
          <div class="flex-empty__hidden"></div>
          <div class="flex-empty__hidden"></div>
        </section>
        <p class="form-title">选择时间段</p>
        <section>
          <p class="time-picker">
            <span>开始时间: </span>
            <span @click="handleOpenPopup(0)">{{form.start_time || '选择'}}</span>
          </p>
          <p class="time-picker">
            <span>结束时间: </span>
            <span @click="handleOpenPopup(1)">{{form.end_time || '选择'}}</span>
          </p>
        </section>
        <section @click="handleSubmit" class="btn-area">
          <span>立即申请</span>
        </section>
    </section>
    <ul class="list">
      <li class="list-title">
        <span>请假记录</span>
      </li>
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="flex item">
            <span>请假时间:</span>
            <span>{{item.start_time}}-{{item.end_time}}</span>
        </div>
        <div class="flex item">
            <span>请假原因:</span>
            <span>{{item.reason}}</span>
        </div>
        <div class="flex item">
            <span>申请时间:</span>
            <span>{{item.time}}</span>
        </div>
        <div class="flex item">
            <span>审批状态:</span>
            <span
              :class="[item.state == -1 ? 'text-error' :
                item.state == 0 ? 'text-other' : 'text-success']"
              >{{item.state == -1 ? '未通过' : item.state == 0 ?
               '审核中' : '已通过'}}
               <span @click="handleItemCancel(item.id)" v-if="item.state == 0" class="btn_apply">撤销申请</span>
            </span>
        </div>
        <div class="flex item">
            <span>审批时间:</span>
            <span>{{item.approve_time}}</span>
        </div>
        <div class="flex item">
            <span>附件照片:</span>
            <span></span>
        </div>
        <div v-if="item.url" class="flex img-list">
          <img v-for="(ii, ild) in item.url" :src="ii" alt="info">
          <img class="flex-empty__hidden" src="" alt="">
          <img class="flex-empty__hidden" src="" alt="">
          <img class="flex-empty__hidden" src="" alt="">
          <img class="flex-empty__hidden" src="" alt="">
          <img class="flex-empty__hidden" src="" alt="">
          <img class="flex-empty__hidden" src="" alt="">
          <img class="flex-empty__hidden" src="" alt="">
        </div>
      </li>
    </ul>

    <van-popup
      v-model="isShowPopup"
      position="bottom"
      :overlay="true"
      >
      <van-datetime-picker
        v-model="currentDate"
        @confirm="confirm"
        @cancel="cancel">
      </van-datetime-picker>
    </van-popup>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin} from '@/utils/mixin'
import {formatTime} from '@/utils/global'
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      imgs: [],
      isShowPopup: false,
      currentDate: new Date(),

      typeIndex: -1, // 选择时间开始结束
      startTime: '',
      endTime: '',

      list: [],

      form: {
        start_time: '',
        end_time: '',
        reason: '',
        url: [],
      },
    }
  },
  methods: {
    ...mapActions({
      'GetLeaveList': 'GetLeaveList',
      'PostImageUploader': 'PostImageUploader',
      'PostLeaveAdd': 'PostLeaveAdd',
      'PostLeaveRemovk': 'PostLeaveRemovk'
    }),
    /**
     * [handleItemCancel 撤销申请请假]
     * @method handleItemCancel
     * @param  {[type]}         id [description]
     * @return {[type]}            [description]
     */
    handleItemCancel(id){
      this.$dialog.confirm({
        title: '提示',
        message: '是否要撤销此条请假申请'
      }).then(() => {
        this.PostLeaveRemovk({id}).then(res => {
          if(!res.error){
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        })
      }).catch(() => {
        this.$toast({type: 3, msg: '操作已取消'})
      })
    },
    handleOpenPopup(type){
      this.typeIndex = type
      this.isShowPopup = true
    },
    onRead(file){
      let _data =  new FormData()
      _data.append('file', file.file)
      window.axois({
        method: 'post',
        url: window.rootPath + '/upload/uploadImg',
        data: _data,
      }).then(res => {
        window.$toast.clear()
        this.form.url.push(res.data.msg)
      })
    },
    handleDeleteImg(index){
      this.imgs.splice(index, 1)
    },
    confirm(e){
      let _time = formatTime(e, true)
      if(this.typeIndex == 0) {
        this.form.start_time = _time
      }else {
        this.form.end_time = _time
      }
      this.isShowPopup = false
    },
    cancel(e){
      this.typeIndex = -1
      this.isShowPopup = false
    },
    /**
     * [handleSubmit 发起申请]
     * @method handleSubmit
     * @return {[type]}     [description]
     */
    handleSubmit(){
      let result = true
      Object.keys(this.form).map(ii => {
        if(!this.form[ii]) result = false
      })

      if(!result){
        this.$toast({type: 3, msg: '请编辑必填项之后提交'})
        return
      }
      this.PostLeaveAdd({data: this.form}).then(res => {
        if(!res.error){
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      })
    },
  },
  created(){
    this.docTitle = '请假申请'
    this.GetLeaveList().then(res => {
      this.list = res
    })
  },
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  .form-area{
    padding: .3rem;
    border-bottom: .2rem solid #f2f2f2;
    .form-title{
      margin: .2rem 0;
      font-size: .32rem;
    }
    .form-textarea{
      background-color: #f2f2f2;
      padding: .2rem;
    }

    .form-imgs{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      img[alt="avatar"]{
        width: 1.2rem;
        height: 1.2rem;
      }
      img[alt="delete"]{
        position: absolute;
        top: -.2rem;
        right: -.2rem;
        width: .4rem;
        height: .4rem;
      }
      .uploader-box{
        width: 1.2rem;
        height: 1.2rem;
        margin-bottom: .2rem;
        text-align: center;
        line-height: 1.2rem;
        background-color: #f2f2f2;
      }
      .flex-empty__hidden{
        width: 1.2rem;
        visibility: hidden;
      }
      .imgs-box{
        position: relative;
        margin-bottom: .1rem;
      }
    }

    .time-picker{
      color: #999;
      *{
        font-size: .3rem;
      }
    }
    .btn-area{
      width: 90vw;
      margin: 0 auto;
      margin-top: .4rem;
      padding: .2rem 0;
      text-align: center;
      color: #fff;
      background-color: #00998d;
    }

  }

  .list{
    .list-title{
      padding: .2rem .3rem;
      border-bottom: 1px solid #eee;
    }
    .list-item{
      padding: .2rem;
      border-bottom: .2rem solid #f2f2f2;
      *{
        font-size: .28rem;
      }
      .item{
        margin-bottom: .1rem;
        span:first-of-type{
          min-width: 20%;
        }
      }
      img[alt="info"]{
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .2rem;
      }
    }
    .img-list{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .text-error{
      color: #ff3d3d;
    }
    .text-success{
      color: #00998d;
    }
    .text-other{
      color: #ffab34;
    }
    .btn_apply{
      padding: .02rem .2rem;
      background-color: rgba(0,153,141,.1);
      color: #00998d;
      border-radius: .2rem;
    }
  }
}
</style>
