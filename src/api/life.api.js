import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const schoolCalendar = () => $http.post({
  url: '/service/calendar'
}).catch(_catch)


export const schoolBus = () => $http.post({
  url: '/service/schoolbus'
}).catch(_catch)

export const schoolTranstation = () => $http.post({
  url: '/service/trainstation'
}).catch(_catch)


export const schoolTels = ({
  data
}) => $http.post({
  url: '/service/schooltel',
  data
}).catch(_catch)

export const schoolEmails = ({
  data
}) => $http.post({
  url: '/service/teachermail',
  data
}).catch(_catch)

export const ideasList = ({
  data
}) => $http.post({
  url: '/opinion/query',
  data
}).catch(_catch)


export const applyList = ({
  data
}) => $http.post({
  url: '/opinion/subsidizeList',
  data
}).catch(_catch)

export const voteList = ({
  data
}) => $http.post({
  url: '/Questionnaire/listVote',
  data
}).catch(_catch)
