import {
  schoolCalendar,
  schoolBus,
  schoolTranstation,
  schoolTels,
  schoolEmails,
  ideasList,
  applyList,
  voteList,
}from '@/api/life.api.js'

const state = {}

const mutations = {}

const actions = {
  /**
   * [schoolCalendar 获取学期校历的内容]
   * @method schoolCalendar
   * @param  {[type]}       context [description]
   * @return {Promise}              [description]
   */
  async SchoolCalendar(){
    const response = await schoolCalendar()

    return response
  },

  /**
   * [SchoolBus 获取校车时刻的内容]
   * @method SchoolBus
   * @return {Promise} [description]
   */
  async SchoolBus(){
    const response = await schoolBus()

    return response
  },

  /**
   * [SchoolTranstation 获取火车站路线的内容]
   * @method SchoolTranstation
   * @return {Promise}         [description]
   */
  async SchoolTranstation(){
    const response  = await schoolTranstation()

    return response
  },

  /**
   * [SchoolTels 获取校园电话内容]
   * @method SchoolTels
   * @return {Promise}  [description]
   */
  async SchoolTels(context, {search:data}){
    const response  = await schoolTels({
      data
    })

    return response
  },

  /**
   * [SchoolEmails 获取教师邮箱内容]
   * @method SchoolEmails
   * @param  {[type]}     context [description]
   * @param  {[type]}     search  [description]
   * @return {Promise}            [description]
   */
  async SchoolEmails(context, {search: data}){
    const response = await schoolEmails({
      data
    })

    return response
  },

  /**
   * [IdeasList 获取意见征集内容]
   * @method IdeasList
   * @param  {[type]}  context [description]
   * @param  {[type]}  search  [description]
   * @return {Promise}         [description]
   */
  async IdeasList(context, {search: data}){
    const response  = await ideasList({data})

    return response
  },

  /**
   * [ApplyList 资助申请列表内容]
   * @method ApplyList
   * @param  {[type]}  context [description]
   * @param  {[type]}  search  [description]
   * @return {Promise}         [description]
   */
  async ApplyList(context, {search: data}){
    const response  = await applyList({data})

    return response
  },

  /**
   * [VoteList 评比评选列表内容]
   * @method VoteList
   * @param  {[type]}  context [description]
   * @param  {[type]}  search  [description]
   * @return {Promise}         [description]
   */
  async VoteList(context, {search: data}){
    const response  = await voteList({data})

    return response
  }
}

const getters = {}

export default {
  state, mutations, actions, getters
}
