import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const firendlist = ({
  url,
  data
}) => $http.post({
  url,
  data
}).catch(err => _catch(err))

export const schoolist = ({
  data
}) => $http.post({
  url: '/job/xuanjiangList',
  data
}).catch(_catch)

export const schoolcollect = ({
  data
}) => $http.post({
  url: '/job/myCollect',
  data
}).catch(_catch)

export const othersource = ({
  data
}) => $http.post({
  url: '/recruit/preachList',
  data
}).catch(_catch)

export const schools = () =>
  $http.post({
    url: '/recruit/preachGroup'
  }).catch(_catch)

export const jobList = ({
  data
}) => $http.post({
  url: '/job/zhaopinList',
  data
}).catch(_catch)

export const helpListAll = ({
  data
}) => $http.post({
  url: '/job/qgzxList',
  data
}).catch(_catch)

export const helpListColl = ({
  data
}) => $http.post({
  url: '/job/myCollect',
  data
}).catch(_catch)


export const firendDetail = ({
  data
}) => $http.post({
  url: '/job/qywhDetail',
  data
}).catch(_catch)

export const firendDetailFind = ({
  data
}) => $http.post({
  url: '/job/alumnusfind',
  data
}).catch(_catch)

export const hignSchoolDetail = ({
  data
}) => $http.post({
  url: '/job/xuanjiangDetail',
  data
}).catch(_catch)

export const hignSchoolCollect = ({
  data
}) => $http.post({
  url: '/job/jobCollect',
  data
}).catch(_catch)

export const hignSchoolPost = ({
  data
}) => $http.post({
  url: '/job/xuanjiangApply',
  data
}).catch(_catch)

export const jobCollect = ({
  data
}) => $http.post({
  url: '/job/myCollect',
  data
})

export const jobDetail = ({
  data
}) => $http.post({
  url: '/job/zhaopinDetail',
  data
}).catch(_catch)

export const jobPost = ({
  data
}) => $http.post({
  url: '/job/zhaopinApply',
  data
}).catch(_catch)

export const helpDetail =  ({
  data
}) => $http.post({
  url: '/job/qgzxDetail',
  data
}).catch(_catch)

export const helpPost = ({
  data
}) => $http.post({
  url: '/job/apply',
  data
}).catch(_catch)
