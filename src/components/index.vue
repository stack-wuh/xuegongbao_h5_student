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
      },
      {
        name: '请假申请',
        icon: require('@/assets/imgs/icon-12.png'),
      },
      {
        name: '考勤评定',
        icon: require('@/assets/imgs/icon-13.png'),
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
    ...mapActions(['ReLogin']),
  },
  created(){
    this.ReLogin()
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
