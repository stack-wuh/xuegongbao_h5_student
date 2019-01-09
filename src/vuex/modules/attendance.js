import {
  leaveList,
  leaveAdd,
  leaveRemovk,
  checkList,
  awardList,
  signScanQRCode,
  checkTypeList,
  photoSignList,
  photoSign,
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
        window.$router.push({path: '/index'})
      }, 1000)
    }
    return response
  },

  /**
   * [GetCheckTypeList 获取首页签到的信息]
   * @method GetCheckTypeList
   * @param  {[type]}         context [description]
   * @return {Promise}                [description]
   */
  async GetCheckTypeList(context){
    const response = await checkTypeList()

    return response
  },

  /**
   * [GetPhotoSignList 签到模块 -- 照片签到 -- 获取签到要求和记录]
   * @method GetPhotoSignList
   * @param  {[type]}         context [description]
   * @param  {[type]}         id      [description]
   * @return {Promise}                [description]
   */
  async GetPhotoSignList(context, {id}){
    const response = await photoSignList({id})
    return response
  },

  /**
   * [PostPhotoSign 照片签到 -- 上传发起的签到的照片]
   * @method PostPhotoSign
   * @param  {[type]}      context [description]
   * @param  {[type]}      form    [description]
   * @return {Promise}             [description]
   */
  async PostPhotoSign(context, {form: data}){
    const response = await photoSign({data})
    return response
  }
}

const getters = {}

export default {
  state, mutations, actions, getters
}
