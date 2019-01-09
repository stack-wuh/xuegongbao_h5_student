import {
  leaveList,
  leaveAdd,
  leaveRemovk,
  checkList,
  awardList,
  signScanQRCode,
} from '@/api/attendance.api.js'

const state = {}

const mutations = {}

const actions = {
  /**
   * [GetLeaveList 请假列表]
   * @method GetLeaveList
   * @param  {[type]}     context [description]
   * @return {Promise}            [description]
   */
  async GetLeaveList(context){
    const response = leaveList()

    return response
  },
  /**
   * [PostLeaveAdd 申请请假]
   * @method PostLeaveAdd
   * @param  {[type]}     context [description]
   * @param  {[type]}     data    [description]
   * @return {Promise}            [description]
   */
  async PostLeaveAdd(context, {data}){
    const response = leaveAdd({data})

    return response
  },
  /**
   * [PostLeaveRemovk 撤销申请]
   * @method PostLeaveRemovk
   * @param  {[type]}        context [description]
   * @param  {[type]}        id      [description]
   * @return {Promise}               [description]
   */
  async PostLeaveRemovk(context, {id}){
    const response = leaveRemovk({id})

    return response
  },

  /**
   * [GetCheckList 考勤评定 -- 考勤列表]
   * @method GetCheckList
   * @param  {[type]}     context [description]
   * @param  {[type]}     search  [description]
   * @return {Promise}            [description]
   */
  async GetCheckList(context, {search: data}){
    const response = await checkList({data})

    return response
  },

  /**
   * [PostSignScanQRCode 签到模块 -- 二维码签到]
   * @method PostSignScanQRCode
   * @param  {[type]}           context [description]
   * @param  {[type]}           form    [description]
   * @return {Promise}                  [description]
   */
  async PostSignScanQRCode(context, {form: data}){
    const response = await signScanQRCode({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.push({path: '/'})
      }, 1000)
    }
    return response
  }
}

const getters = {}

export default {
  state, mutations, actions, getters
}
