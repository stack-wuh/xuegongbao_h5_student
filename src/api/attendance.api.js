import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const leaveList = () => $http.post({
  url: '/leave/lists'
}).catch(_catch)

export const leaveAdd = ({
  data
}) => $http.post({
  url: '/leave/add',
  data
}).catch(_catch)

export const leaveRemovk = ({
  id
}) => $http.post({
  url: '/leave/revoke',
  data: {id}
}).catch(_catch)

export const checkList = ({
  data
}) => $http.post({
  url:'/attendance/studentData',
  data
}).catch(_catch)

export const signScanQRCode = ({
  data
}) => $http.post({
  url: '/signin/qrcodeSignin',
  data
}).catch(_catch)
