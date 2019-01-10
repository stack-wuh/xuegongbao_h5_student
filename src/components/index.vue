<template>
  <section class="wrapper content-wrapper">
    <ul class="menulist">
      <li class="list-item" v-for="(item, index) in menuList" :key="index">
        <p class="list-item__title">{{item.name}}</p>
        <div class="list-item__child">
          <div
            v-for="(sub, sid) in item.child"
            :key="sid" class="list-item__box"
            :style="sub.style"
            @click="$push({path: sub.path, query: {tag: sub.name}})">
              <img :src="sub.icon" alt="icon" class="list-item__icon">
              <span class="list-item__text">{{sub.name}}</span>
          </div>
          <div class="list-item__box flex-empty-none"></div>
          <div class="list-item__box flex-empty-none"></div>
          <div class="list-item__box flex-empty-none"></div>
          <div class="list-item__box flex-empty-none"></div>
          <div class="list-item__box flex-empty-none"></div>
        </div>
      </li>
    </ul>
    <my-tabbar></my-tabbar>
  </section>
</template>
<script>
import {reloadTitleMixin, pushRouter} from '@/utils/mixin'
import MyTabbar from '@/components/common/tabbar'
import {mapActions} from 'vuex'
const menuList = [
  {
    name: '考勤管理',
    child: [
      {
        name: '我要签到',
        icon: require('@/assets/imgs/icon-11.png'),
        path: '/index/sign/index'
      },
      {
        name: '请假申请',
        icon: require('@/assets/imgs/icon-12.png'),
        path: '/index/leave/index'
      },
      {
        name: '考勤评定',
        icon: require('@/assets/imgs/icon-13.png'),
        path: '/index/check/index'
      }
    ]
  },
  {
    name: '学习服务',
    child: [
      {
        name: '科研赛事',
        icon: require('@/assets/imgs/icon-21.png'),
        path: '/index/game/index'
      },
      {
        name: '问卷调查',
        icon: require('@/assets/imgs/icon-22.png'),
        path: '/index/question/index'
      },
      {
        name: '学习考试',
        icon: require('@/assets/imgs/icon-23.png'),
        path: '/index/exam/index'
      },
      {
        name: '讲座报告',
        icon: require('@/assets/imgs/icon-24.png'),
        path: '/index/chair/index'
      }
    ]
  },
  {
    name: '就业服务',
    child: [
      {
        name: '企业校友',
        icon: require('@/assets/imgs/icon-31.png'),
        path: '/index/firend/index'
      },
      {
        name: '高校宣讲',
        icon: require('@/assets/imgs/icon-32.png'),
        path: '/index/high/index',
      },
      {
        name: '招聘信息',
        icon: require('@/assets/imgs/icon-33.png'),
        path: '/index/job/index'
      },
      {
        name: '勤工助学',
        icon: require('@/assets/imgs/icon-34.png'),
        path: '/index/help/index'
      }
    ]
  },
  {
    name: '生活服务',
    child: [
      {
        name: '意见征集',
        icon: require('@/assets/imgs/icon-41.png'),
        path: '/life/idea/index'
      },
      {
        name: '资助申请',
        icon: require('@/assets/imgs/icon-42.png'),
        path: '/life/apply/index'
      },
      {
        name: '评比评选',
        icon: require('@/assets/imgs/icon-43.png'),
        path: '/life/pick/index',
      },
      {
        name: '校园电话',
        icon: require('@/assets/imgs/icon-44.png'),
        path: '/life/phones'
      },
      {
        name: '学期校历',
        icon: require('@/assets/imgs/icon-45.png'),
        style: 'margin-top: .4rem;',
        path: '/life/shows'
      },
      {
        name: '校车时刻',
        icon: require('@/assets/imgs/icon-46.png'),
        style: 'margin-top: .4rem;',
        path: '/life/cars'
      },
      {
        name: '火车站路线',
        icon: require('@/assets/imgs/icon-47.png'),
        style: 'margin-top: .4rem;',
        path: '/life/transtation'
      },
      {
        name: '教师邮箱',
        icon: require('@/assets/imgs/icon-48.png'),
        style: 'margin-top: .4rem;',
        path: '/life/emails'
      }
    ]
  }
]
export default {
  props: {},
  name: '',
  components: {
    MyTabbar
  },
  data(){
    return {
      menuList,
    }
  },
  methods: {
    ...mapActions(['ReLogin', 'GetCheckTypeList', 'PostSignScanQRCode']),
    /**
     * [$push 子菜单点击事件]
     * @method $push
     * @param  {[type]} path  [description]
     * @param  {[type]} query [description]
     * @return {[type]}       [description]
     */
    $push({path, query}){
      if(query.tag === '我要签到'){
        /**
         * [GetCheckTypeList 查询签到类型]
         * 1 蓝牙签到打开蓝牙搜索
         * 2 二维码签到打开微信扫码
         * 3 照片签到跳转页面
         * @type {[type]}
         */
        this.GetCheckTypeList().then(res => {
          if(res == null){
            this.$toast({type: 3, msg: '暂时没有签到请求或签到已成功'})
          }else if( res.type == 1) {
            this.handleIbeacon()
          }else if(res.type == 2){
            this.handleScanQRCode()
          }else if(res.type == 3){
            this.$router.push({path: '/index/sign/photo', query: {tag: '照片签到', id: res.id}})
          }
        })
      }else {
        this.$router.push({path, query})
      }
    },

    /**
     * [handleIbeacon 处理蓝牙签到]
     * @method handleIbeacon
     * @return {[type]}      [description]
     */
    handleIbeacon(){
      let _this = this
      wx.startSearchBeacons({
        complete: info => {
          wx.onSearchBeacons({
            fail: err =>{
              console.log(err)
            } ,
            complete: res => {
              console.log(res)
            }
          })
        }
      })
    },

    /**
     * [handleScanQRCode 处理二维码签到 ]
     * @method handleScanQRCode
     */
    handleScanQRCode(){
      let _this = this
      wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          var result = res.resultStr
          var data = result.split('&')
          let params = {
            id: data[0],
            rand: data[1]
          }
          _this.PostSignScanQRCode({form: params})
        }
      })
    }
  },
  created(){
    this.ReLogin()
  },
  destroyed(){
    wx.stopSearchBeacons({
      complete: err => {
        _toast({type: 3, msg: '已关闭搜索周边'})
      }
    })
  },
  mixins:[reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: #efeff4;
  overflow-y: scroll;
  .menulist{
    .list-item{
      padding: .25rem .2rem;
      margin-bottom: .2rem;
      background-color: #fff;
      .list-item__title{
        padding-left: .1rem;
        margin-bottom: .15rem;
        border-left: .05rem solid #0076ff;
        font-size: .28rem;
        color: #666;
      }
      .list-item__child{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        .list-item__box{
          display: flex;
          flex-flow: column nowrap;
          width: 25%;
          justify-content: center;
          align-items: center;
          .list-item__text{
            font-size: .28rem;
            color: #333;
          }
          img{
            width: .7rem;
            height: .7rem;
            margin-bottom: .1rem;
          }
        }
      }
    }
  }
}
</style>
