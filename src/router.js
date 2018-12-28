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
          path: '/message/detail',
          name: 'messageDesc',
          component: () => import('@/components/messageManage/detail')
        },
        {
          path: '/message/list',
          component: () => import('@/components/messageManage/list')
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
          path: '/index/game/detail',
          component: () => import('@/components/studyManage/game/detail')
        },
        {
          path: '/index/question/index',
          component: () => import('@/components/studyManage/question/index')
        },
        {
          path: '/index/question/detail',
          component: () => import('@/components/studyManage/question/detail')
        },
        {
          path: '/index/exam/index',
          component: () => import('@/components/studyManage/exam/index')
        },
        {
          path: '/index/exam/detail',
          component: () => import('@/components/studyManage/exam/detail')
        },
        {
          path: '/index/chair/index',
          component: () => import('@/components/studyManage/chair/index')
        },
        {
          path: '/index/chair/detail',
          component: () => import('@/components/studyManage/chair/detail')
        },
        {
          path: '/index/firend/index',
          component: () => import ('@/components/jobManage/firend/index')
        },
        {
          path: '/index/firend/detail',
          component: () => import('@/components/jobManage/firend/detail')
        },
        {
          path: '/index/high/index',
          component: () => import ('@/components/jobManage/highschool/index')
        },
        {
          path: '/index/high/detail',
          alias:['/index/job/detail', '/index/help/detail'],
          component: () => import('@/components/jobManage/highschool/detail')
        },
        {
          path: '/index/job/index',
          component: () => import ('@/components/jobManage/job/index')
        },
        {
          path: '/index/help/index',
          component: () => import('@/components/jobManage/help/index')
        },
        {
          path: '/life/shows',
          alias: ['/life/cars','/life/transtation'],
          component: () => import('@/components/lifeManage/shows')
        },
        {
          path: '/life/phones',
          alias: ['/life/emails'],
          component: () => import('@/components/lifeManage/phones')
        },
        {
          path: '/life/idea/index',
          component: () => import('@/components/lifeManage/idea/index'),
        },
        {
          path: '/life/apply/index',
          component: () => import('@/components/lifeManage/apply/index')
        },
        {
          path: '/life/pick/index',
          component: () => import('@/components/lifeManage/pick/index')
        },
        {
          path: '/life/pick/detail',
          component: () => import('@/components/lifeManage/pick/detail')
        },
        {
          path: '/index/leave/index',
          component: () => import('@/components/attendanceManage/leave/index')
        },
        {
          path: '/index/check/index',
          component: () => import('@/components/attendanceManage/check/index')
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
