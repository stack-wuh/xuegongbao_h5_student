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

export const awardList = () =>  $http.post({
  url: '/Awards/awardsList',
}).catch(_catch)


export const awardSub = ({
  data
}) => $http.post({
  url: '/Awards/addAwards',
  data
}).catch(_catch)

export const awardSubForThesis = ({
  data
}) => $http.post({
  url: '/Awards/addAwards',
  data
}).catch(_catch)

export const certificateList = () => $http.post({
  url: '/Awards/certificate',
}).catch(_catch)

export const certificateSub = ({
  data
}) => $http.post({
  url: '/awards/addCertificate',
  data
}).catch(_catch)

export const recordSub = ({
  data
}) => $http.post({
  url: '/record/addRecord',
  data
}).catch(_catch)
