import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const gameList = ({
  data,
  url
}) => $http.post({
  url,
  data
}).catch(err => _catch(err))

export const quesList = ({
  data
}) => $http.post({
  url: '/Questionnaire/questionnaire',
  data
})

export const examList = ({
  data
}) => $http.post({
  url: '/keyan/sourceList',
  data
}).catch(err => _catch(err))

export const chairList = ({
  data
}) => $http.post({
  url: '/chair/query',
  data
}).catch(err => _catch(err))


export const noticeDetail = ({
  id
}) => $http.post({
  url: '/keyan/noticeDetail',
  data: {id}
}).catch(_catch)

export const noticePost = ({
  data
}) => $http.post({
  url: '/job/keyanApply',
  data
}).catch(_catch)

export const enlistDetail = ({
  id
}) => $http.post({
  url: '/keyan/enlistDetail',
  data: {id}
})

export const enlistAdd = ({
  data
}) => $http.post({
  url: '/keyan/enlistAdd',
  data
})

export const quesDetail = ({
  data
}) => $http.post({
  url: '/Questionnaire/detailQuestionnaire',
  data
}).catch(_catch)

export const quesPost = ({
  data
}) => $http.post({
  url: '/Questionnaire/answerQuestionnaire',
  data
}).catch(_catch)

export const examDetail = ({
  id
}) => $http.post({
  url: '/keyan/sourceDetail',
  data: {id}
})

export const chairDetail = ({
  id
}) => $http.post({
  url: '/chair/detail',
  data: {id}
})
export const chairApply = ({
  id
}) => $http.post({
  url: '/chair/apply',
  data: {id}
})

export const chairUnApply = ({
  id
}) => $http.post({
  url: '/chair/applyCancel',
  data: {id}
})
