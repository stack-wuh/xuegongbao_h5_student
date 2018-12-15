
<template>
  <section class="wrapper content-wrapper">
    <header class="header">
      <img :src="userInfo.photo || defaultImg" alt="avatar">
    </header>
    <section class="user-wrapper">
      <p>{{userInfo.name}}</p>
      <p class="user__number">{{userInfo.number}}</p>
      <img src="../../assets/imgs/bg-green.png" alt="bg">
    </section>

    <ul class="list-wrapper">
      <li class="list-item" v-for="(item, index) in List" :key="index" >
        <div @click="handleOpenChild(index)" class="item-head flex flex-align__center">
          <img :src="item.icon" alt="icon-title">
          <div class="item-head__box flex flex-justify__between">
            <span>{{item.name}}</span>
            <img v-if="item.arrowRight"
              :src="currIndex === index ? arrowUpGreen : item.arrowRight"
              :alt="currIndex === index ? 'arrow-up' :'arrow-right'">
          </div>
        </div>
        <transition name="child" mode="out-in">
          <section v-if="item.child && currIndex == index" class="child-list flex flex-align__center">
            <div @click="$push({path: sub.path, query:{name: sub.name}})"  v-for="(sub, sid) in item.child" class="child-item flex flex-flow__col flex-justify__center flex-align__center">
              <img v-if="sub.icon" :src="sub.icon" alt="icon-sub">
              <p>{{sub.name}}</p>
            </div>
          </section>
        </transition>
      </li>
    </ul>
    <my-tabbar />
  </section>
</template>
<script>
import MyTabbar from '@/components/common/tabbar'
import {reloadTitleMixin, pushRouter} from '@/utils/mixin'
import {mapActions, mapState} from 'vuex'
const List = [
  {
    name: '个人信息',
    icon: require('@/assets/imgs/center/icon-3-1.png'),
    arrowRight: require('@/assets/imgs/arrow-right-black.png'),
    child: [
      {
        name: '基础信息',
        icon: require('@/assets/imgs/center/icon-3-11.png'),
        path: '/base/form'
      },
      {
        name: '上传照片',
        icon: require('@/assets/imgs/center/icon-3-12.png'),
        path: '/center/uploadImg'
      },
      {
        name: '个人联系方式',
        icon: require('@/assets/imgs/center/icon-3-13.png'),
        path: '/base/form'
      },
      {
        name: '家庭联系方式',
        icon: require('@/assets/imgs/center/icon-3-14.png'),
        path:'/base/form'
      }
    ],
  },
  {
    name: '奖励情况',
    icon: require('@/assets/imgs/center/icon-3-2.png'),
    arrowRight: require('@/assets/imgs/arrow-right-black.png'),
    child: [
      {
        name: '奖学金',
        icon: require('@/assets/imgs/center/icon-3-21.png'),
        path: '/center/subindex',
      },
      {
        name: '荣誉称号',
        icon: require('@/assets/imgs/center/icon-3-22.png'),
        path: '/center/subindex',
      },
      {
        name: '软著专利',
        icon: require('@/assets/imgs/center/icon-3-23.png'),
        path: '/center/subindex',
      },
      {
        name: '获奖情况',
        icon: require('@/assets/imgs/center/icon-3-24.png'),
        path: '/center/subindex',
      },
      {
        name: '已发表论文',
        icon: require('@/assets/imgs/center/icon-3-25.png'),
        path: '/center/subindex',
      },
      {
        name: '考试证书',
        icon: require('@/assets/imgs/center/icon-3-27.png'),
        path: '/center/subindex',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      }
    ],
  },
  {
    name: '个人履历',
    icon: require('@/assets/imgs/center/icon-3-8.png'),
    arrowRight: require('@/assets/imgs/arrow-right-black.png'),
    child: [
      {
        name: '2015-2016',
        icon: require('@/assets/imgs/center/icon-3-11.png'),
        path: '/center/record/sub',
      },
      {
        name: '2016-2017',
        icon: require('@/assets/imgs/center/icon-3-11.png'),
        path: '/center/record/sub',
      },
      {
        name: '2017-2018',
        icon: require('@/assets/imgs/center/icon-3-11.png'),
        path: '/center/record/sub',
      },
      {
        name: '2018-2019',
        icon: require('@/assets/imgs/center/icon-3-11.png'),
        path: '/center/record/sub',
      },
    ],
  },
  {
    name: '辅导员信息',
    icon: require('@/assets/imgs/center/icon-3-3.png'),
    arrowRight: require('@/assets/imgs/arrow-right-black.png'),
    path: '/center/teacher/info'
  },
  {
    name: '修改密码',
    icon: require('@/assets/imgs/center/icon-3-6.png'),
    arrowRight: require('@/assets/imgs/arrow-right-black.png'),
  },
  {
    name: '注销登录',
    icon: require('@/assets/imgs/center/icon-3-7.png'),
    arrowRight: '',
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
      docTitle: '个人中心',
      List, // 菜单列表
      currIndex: -1, // 控制打开子元素列表的下标
      arrowUpGreen: require('@/assets/imgs/icon-arrow-up.png'), // 绿色上箭头

      defaultImg: require('@/assets/imgs/logo.png')
    }
  },
  computed: {
    ...mapState({
      'userInfo': state => state.User.userInfo
    }),
  },
  methods: {
    ...mapActions(['GetUserInfo', 'SignOut']),
    /**
     * [handleOpenChild 打开子元素列表]
     * @method handleOpenChild
     * @return {[type]}        [description]
     */
    handleOpenChild(index){
      if(index < 3){
        this.currIndex = this.currIndex === index ? -1 : index
      }else if(index === 4){
        this.$push({path: '/base/form', query: {name: '修改密码'}})
      }else if(index === 3){
        this.$push({path: '/center/teacher/info', query: {name: '辅导员信息'}})
      }else{
        this.SignOut()
      }
    },
  },
  created(){
    this.GetUserInfo()
  },
  mixins: [reloadTitleMixin, pushRouter]
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  header.header{
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: 4rem;
    background-color: @base-color;

    img[alt="avatar"]{
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }
  .user-wrapper{
    position: relative;
    p{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: #fff;
      z-index: 1000;
    }
    p.user__number{
      margin-top: 5%;
    }
    img[alt="bg"]{
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      transform: rotateX(-180deg);
      z-index: 100;
    }
  }

  .list-wrapper{
    width: 100vw;
    margin-top: 1.8rem;
    .list-item{
      width: inherit;

      .item-head{
        padding: 0 .3rem;
        img[alt="icon-title"]{
          width: .5rem;
          height: .5rem;
        }
        img[alt='arrow-right']{
          width: .2rem;
          height: .4rem;
        }
        img[alt="arrow-up"]{
          width: .4rem;
          height: .2rem;
        }
        .item-head__box{
          height: 1rem;
          margin-left: .2rem;
          border-bottom: 1px solid #eee;
        }
      }
      .child-list{
        width: 100%;
        border-bottom: 5px solid #eee;
        flex-flow: row wrap;
        img[alt="icon-sub"]{
          width: .7rem;
          height: .7rem;
        }
        .child-item{
          width: 25%;
          padding: .2rem 0;
          p{
            font-size: .26rem;
          }
        }
      }
    }
  }
}

.child-enter-active, .child-enter-leave{
  transition: all 1s;
}

.child-enter, .child-leave{
  opacity: 0;
  transform: translateY(30px);
}
</style>
