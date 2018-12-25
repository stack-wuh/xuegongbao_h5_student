import {
  firendlist,
  schoolist,
  schoolcollect,
  othersource,
  schools,
  jobList,
  helpListAll,
  helpListColl,
  firendDetail,
  firendDetailFind,
  hignSchoolDetail,
  hignSchoolCollect,
  hignSchoolPost,
  jobCollect,
  jobDetail,
  jobPost,
  helpDetail,
  helpPost,
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

  /**
   * [GetJobList 获取招聘信息列表]
   * @method GetJobList
   * @param  {[type]}   context [description]
   * @param  {[type]}   search  [description]
   * @return {Promise}          [description]
   */
  async GetJobList(context, {search: data}){
    const response  = await jobList({
      data
    })
    return response
  },

  /**
   * [helpListAll 获取勤工助学的列表]
   * @method helpListAll
   * @param  {[type]}    context [description]
   * @param  {[type]}    search  [description]
   * @return {Promise}           [description]
   */
  async HelpListAll(context, {search: data}){
    const response  = await helpListAll({
      data
    })
    return response
  },

  /**
   * [HelpListColl 获取勤工助学的收藏列表]
   * @method HelpListColl
   * @param  {[type]}     context [description]
   * @param  {[type]}     search  [description]
   * @return {Promise}            [description]
   */
  async HelpListColl(context, {search: data}){
    const response = await helpListColl({
      data
    })
    return response
  },

  /**
   * [FirendDetail 企业校友 -- 行业动态详情]
   * @method FirendDetail
   * @param  {[type]}     context [description]
   * @param  {[type]}     id      [description]
   * @return {Promise}            [description]
   */
  async FirendDetail(context, {id}){
    const response  = await firendDetail({
      data: {
        id
      }
    })

    return response
  },

  /**
   * [FirendDetailFind 企业校友 -- 校友名录]
   * @method FirendDetailFind
   * @param  {[type]}         context [description]
   * @param  {[type]}         id      [description]
   * @return {Promise}                [description]
   */
  async FirendDetailFind(context, {id}){
    const response = await firendDetailFind({data: {id}})

    return response
  },
  /**
   * [getters 高校宣讲 -- 详情]
   * @type {Object}
   */
  async HignSchoolDetail(context, {id}){
    const response = await hignSchoolDetail({data: {id}})

    return response
  },

  /**
   * [HignSchoolCollect 高校宣讲 -- 收藏事件]
   * @method HignSchoolCollect
   * @param  {[type]}          context [description]
   * @param  {[type]}          id      [description]
   * @param  {[type]}          type    [description]
   * @return {Promise}                 [description]
   */
  async HignSchoolCollect(context, {id, type}){
    const response = await hignSchoolCollect({data: {id, type}})
    return response
  },

  /**
   * [HignSchoolPost 高校宣讲 -- ]
   * @method HignSchoolPost
   * @param  {[type]}       context [description]
   * @param  {[type]}       form    [description]
   * @param  {[type]}       class   [description]
   * @param  {[type]}       phone   [description]
   * @param  {[type]}       port    [description]
   * @param  {[type]}       id      [description]
   * @return {Promise}              [description]
   */
  async HignSchoolPost(context, {form: data}){
    const response = await hignSchoolPost({data})

    return response
  },

  /**
   * [JobDetail 获取招聘信息的详情]
   * @method JobDetail
   * @param  {[type]}  context [description]
   * @param  {[type]}  id      [description]
   * @return {Promise}         [description]
   */
  async JobDetail(context, {id}){
    const response  = await jobDetail({data: {id}})

    return response
  },

  /**
   * [JobPost 招聘信息 -- 报名]
   * @method JobPost
   * @param  {[type]}  context [description]
   * @param  {[type]}  form    [description]
   * @return {Promise}         [description]
   */
  async JobPost(context, {form: data}){
    const response  = await jobPost({data})

    return response
  },

  /**
   * [HelpDetail 获取勤工助学详情]
   * @method HelpDetail
   * @param  {[type]}   context [description]
   * @param  {[type]}   id      [description]
   * @return {Promise}          [description]
   */
  async HelpDetail(context, {id}){
    const response = await helpDetail({data: {id}})

    return response
  },

  /**
   * [HelpPost 勤工助学报名]
   * @method HelpPost
   * @param  {[type]}  context [description]
   * @param  {[type]}  form    [description]
   * @return {Promise}         [description]
   */
  async HelpPost(context, {form: data}){
    const response = await helpPost({data})

    return response
  }

}

const getters = {}

export default {
  state, mutations, actions, getters
}
