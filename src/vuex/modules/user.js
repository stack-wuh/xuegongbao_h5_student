import {
  signin,
  getuserinfo,
  signout
} from '@/api/user.api.js'
import {
  setStorageHandle
} from '@/utils/global'

const state = {
  userInfo: {}
}

const mutations = {
  SET_USERINFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {

  /**
   * [SignIn 登录]
   * @method SignIn
   * @param  {[type]}  context  [description]
   * @param  {[type]}  username [用户名]
   * @param  {[type]}  password [用户密码]
   * @return {Promise}          [description]
   */
  async SignIn(context, {username:number, password}){
    try{
      let response  = await signin({
        number,
        password
      })

      return response
    }catch(err){
      throw new Error(err)
    }
  },

  /**
   * [GetUserInfo 个人中心获取个人信息]
   * @method GetUserInfo
   * @param  {[type]}    context [description]
   * @return {Promise}           [description]
   */
  async GetUserInfo(context){
    try{
      let response = await getuserinfo()
      context.commit('SET_USERINFO', response)
      return response
    }catch(err){
      throw new Error(err)
    }
  },

  async SignOut(context){
    try{
      let response = await signout()
      if(response.error === 0){
        setStorageHandle('userinfo', {})
        setTimeout(function(){
          this.$router.push({path: '/signin'})
        }, 1000)
      }
    }catch(err){
      throw new Error(err)
    }
  }
}

const getters = {}

export default {
  state, mutations, actions, getters
}
