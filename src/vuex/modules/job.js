import {
  firendlist,
  schoolist,
  schoolcollect,
  othersource,
  schools,
  jobList
}from '@/api/job.api.js'

const state = {
  firendList: [], //企业校友数据列表
  schoolList: [], //搞笑宣讲数据列表
  schools: [], //筛选学校列表
  jobList: [], //招聘信息列表
}

const mutations = {
  SET_FIRENDLIST: (state, data) => {
    state.firendList = state.firendList.concat(data)
  },
  CLEAR_FIRENDLIST: state => {
    state.firendList = []
  },
  SET_SCHOOL_ALL: (state, data) => {
    state.schoolList = state.schoolList.concat(data)
  },
  CLEAR_SCHOOL_ALL: stata => {
    state.schoolList = []
  },
  SET_SCHOOL_COLL: (state, data) => {
    state.schoolList = state.schoolList.concat(data)
  },
  SET_SCHOOLS_INFO: (stata, data) => {
    state.schools = data
  }
}

const actions = {
  /**
   * [GetFirendList 企业校友 -- 全部内容]
   * @method GetFirendList
   * @param  {[type]}      context               [description]
   * @param  {String}      [url='/job/qywhList'] [description]
   * @param  {[type]}      search                [description]
   * @return {Promise}                           [description]
   */
  async GetFirendList(context, {url = '/job/qywhList', search: data}){
    const response = await firendlist({url, data})
    context.commit('SET_FIRENDLIST', response)
    return response
  },

  /**
   * [GetSchoolList 高校宣讲 --- 学院发布 -- 全部]
   * @method GetSchoolList
   * @param  {[type]}      context [description]
   * @param  {[type]}      search  [description]
   * @return {Promise}             [description]
   */
  async GetSchoolList(context, {search: data}){
    const response  = await schoolist({data})
    context.commit('CLEAR_SCHOOL_ALL')
    context.commit('SET_SCHOOL_ALL', response)
    return response
  },

  /**
   * [GetSchoolCollect 高校宣讲 -- 学院发布 -- 收藏]
   * @method GetSchoolCollect
   * @param  {[type]}         context [description]
   * @param  {[type]}         search  [description]
   * @return {Promise}                [description]
   */
  async GetSchoolCollect(context, {search: data}){
    const response  = await schoolcollect({data})
    context.commit('CLEAR_SCHOOL_ALL')
    context.commit('SET_SCHOOL_COLL', response)
    return response
  },

  /**
   * [GetSchoolListOther 高校宣讲 -- 其他来源]
   * @method GetSchoolListOther
   * @param  {[type]}           context [description]
   * @param  {[type]}           search  [description]
   * @return {Promise}                  [description]
   */
  async GetSchoolListOther(context, {search: data}){
    const response  = await othersource({data})
    context.commit('CLEAR_SCHOOL_ALL')
    context.commit('SET_SCHOOL_ALL', response)
    return response
  },

  /**
   * [GetSchools 高校宣讲 -- 其他来源 -- 获取筛选学校]
   * @method GetSchools
   * @param  {[type]}   context [description]
   * @return {Promise}          [description]
   */
  async GetSchools(context){
    const response = await schools()
    context.commit('SET_SCHOOLS_INFO', response)
    return response
  },

  async GetJobList(context, {search: data}){
    const response  = await jobList({
      data
    })
    return response
  }
}

const getters = {}

export default {
  state, mutations, actions, getters
}
