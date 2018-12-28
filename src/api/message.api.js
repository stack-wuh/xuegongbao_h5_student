import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const messageList = ({
  data
}) => $http.post({
  url: '/Studentmes/stuAllmes',
  data
}).catch(_catch)

export const messageDetail = ({
  id
}) => $http.post({
  data:{id},
  url: '/StudentMes/msgInfo'
}).catch(_catch)

export const messageForm = ({
  data
}) => $http.post({
  url: '/studentMes/formSubmit',
  data
}).catch(_catch)

export const messageRecive = ({
  id
}) => $http.post({
  url: '/StudentMes/getReceive',
  data: {id}
}).catch(_catch)


export const messageReciveList = ({
  id
}) => $http.post({
  url: '/StudentMes/receiveList',
  data: {id}
}).catch(_catch)

export const messageUnReciveList = ({
  id
}) => $http.post({
  url: '/StudentMes/noReceiveList',
  data: {id}
}).catch(_catch)
