 import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const signin = ({number, password}) =>
  $http.post({
    url: '/user/login',
    data: {
      number,
      password
    }
  }).catch(err => _catch(err))


export const getuserinfo = () =>
  $http.post({
    url: '/user/myInfo'
  }).catch(err => _catch(err))


export const signout = () =>
  $http.post({
    url: '/user/logout'
  }).catch(err => _catch(err))
