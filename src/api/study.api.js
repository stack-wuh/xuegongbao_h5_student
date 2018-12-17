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
