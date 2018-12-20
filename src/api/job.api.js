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
