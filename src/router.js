import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/signin',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/components/index')
        },
        {
          path: '/message',
          name: 'message',
          component: () => import ('@/components/messageManage/index'),
        },
        {
          path: '/message/info',
          name: 'messageDesc',
          component: () => import('@/components/messageManage/detail')
        },
        {
          path: '/center',
          name: 'center',
          component: () => import ('@/components/centerManage/index')
        },
        {
          path: '/center/uploadImg',
          component: () => import('@/components/centerManage/child/uploadImage')
        },
        {
          path: '/center/subindex',
          component: () => import ('@/components/centerManage/child/subIndex')
        },
        {
          path: '/center/subindex/awardSub',
          component: () => import('@/components/centerManage/child/awardSub')
        },
        {
          path: '/center/teacher/info',
          component: () => import('@/components/centerManage/child/teacherInfo')
        },
        {
          path: '/center/record/sub',
          component: () => import('@/components/centerManage/child/recordSub')
        },
        {
          path: '/index/game/index',
          component: () => import ('@/components/studyManage/game/index')
        },
        {
          path: '/index/question/index',
          component: () => import('@/components/studyManage/question/index')
        },
        {
          path: '/index/exam/index',
          component: () => import('@/components/studyManage/exam/index')
        },
        {
          path: '/index/chair/index',
          component: () => import('@/components/studyManage/chair/index')
        },
        {
          path: '/index/firend/index',
          component: () => import ('@/components/jobManage/firend/index')
        },
        {
          path: '/index/high/index',
          component: () => import ('@/components/jobManage/highschool/index')
        },
        {
          path: '/index/job/index',
          component: () => import ('@/components/jobManage/job/index')
        },

        {
          path: '/signin',
          name: 'signin',
          component: () => import('@/components/signin')
        },
        {
          path: '/base/form',
          name: 'form',
          component:() => import ('@/views/forms/myBaseForm')
        }
      ]
    }
  ]
})
