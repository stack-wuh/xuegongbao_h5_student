import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const userConcat = ({
  data
}) => $http.post({
  url: '/Studentinfo/updateInfo',
  data
}).catch(_catch)

export const familyConcat = ({
  data
}) => $http.post({
  url: '/Studentinfo/updateInfo',
  data
}).catch(_catch)

export const teacherInfo = () => $http.post({
  url: '/studentinfo/getInstructor',
}).catch(_catch)

export const checkPwd = ({
  data
}) => $http.post({
  url: '/User/changePwd',
  data
}).catch(_catch)

export const dormitoryList = () => $http.post({
  url: '/StudentInfo/dormitoryList'
}).catch(_catch)

export const userInfo = ({
  data
}) => $http.post({
  url: '/Studentinfo/updateInfo',
  data
}).catch(_catch)
