import {
  gameList,
  quesList,
  examList,
  chairList,
  noticeDetail,
  noticePost,
  enlistDetail,
  enlistAdd,
  quesDetail,
  quesPost,
} from '@/api/study.api.js'
const state = {
  gameList: [], // 科研赛事数据列表
  quesList: [], //问卷调查数据列表
  examList: [], //学习考试数据列表
  chairList: [], //讲座报告列表
}

const mutations = {
  SET_GAMELIST: (state, data) => {
    state.gameList = state.gameList.concat(data)
  },
  CLEAR_GAMELIST: state => {
    state.gameList = []
  },

  SET_QUESLIST: (state, data) => {
    state.quesList = state.quesList.concat(data)
  },
  CLEAR_QUESLIST: state => {
    state.quesList = []
  },

  SET_EXAMLIST: (state, data) => {
    state.examList = state.examList.concat(data)
  },
  CLEAR_EXAMLIST: state => {
    state.examList = []
  },
  SET_CHAIRLIST: (state, data) => {
    state.chairList = state.chairList.concat(data)
  },
  CLEAR_CHAIRLIST: state => {
    state.chairList = []
  }
}

const actions = {
  /**
   * [getGameList 获取学习服务 -- 科研赛事内的数据列表]
   * @method getGameList
   * @param  {[type]}    context        [description]
   * @param  {[type]}    search         [description]
   * @param  {[type]}    [currIndex=0}] [description]
   * @return {Promise}                  [description]
   */
  async getGameList(context, {search: data, currIndex = 0}){
    let _url = currIndex == 0 ? '/keyan/noticeList' : '/keyan/enlistList'
    const response = await gameList({data, url: _url})
    context.commit('SET_GAMELIST', response)
    return response
  },

  /**
   * [getQuesList 学习服务--问卷调查]
   * @method getQuesList
   * @param  {[type]}    context [description]
   * @param  {[type]}    search  [description]
   * @return {Promise}           [description]
   */
  async getQuesList(context, {search: data}){
    const response  = await quesList({data})
    context.commit('SET_QUESLIST', response)
    return response
  },

  /**
   * [getExamList 获取学习考试的内容]
   * @method getExamList
   * @param  {[type]}    context [description]
   * @param  {[type]}    search  [description]
   * @return {Promise}           [description]
   */
  async getExamList(context, {search: data}){
    const response = await examList({data})
    context.commit('SET_EXAMLIST', response.data)
    return response
  },

  /**
   * [getChairList 获取讲座报告的内容]
   * @method getChairList
   * @param  {[type]}     context [description]
   * @param  {[type]}     search  [description]
   * @return {Promise}            [description]
   */
  async getChairList(context, {search: data}){
    const response = await chairList({data})
    context.commit('SET_CHAIRLIST', response)
    return response
  },

  /**
   * [getNoticeDetail 科研赛事 -- 通知 -- 详情]
   * @method getNoticeDetail
   * @param  {[type]}        context [description]
   * @param  {[type]}        id      [description]
   * @return {Promise}               [description]
   */
  async getNoticeDetail(context, {id}){
    const response = await noticeDetail({id})

    return response
  },
  /**
   * [PostNoticeDetail 科研赛事 -- 通知 -- 报名]
   * @method PostNoticeDetail
   * @param  {[type]}         context [description]
   * @param  {[type]}         form    [description]
   * @param  {[type]}         project [description]
   * @return {Promise}                [description]
   */
  async PostNoticeDetail(context, {form: {
    id, project
  }}){
    const response = await noticePost({data: {id, project}})

    return response
  },

  /**
   * [GetEnlistDetail 科研赛事 -- 招募令 -- 详情]
   * @method GetEnlistDetail
   * @param  {[type]}        context [description]
   * @param  {[type]}        id      [description]
   * @return {Promise}               [description]
   */
  async GetEnlistDetail(context, {id}){
    const response = await enlistDetail({id})
    return response
  },

  /**
   * [PostEnlistAdd 科研赛事 -- 招募令 -- 发起招募]
   * @method PostEnlistAdd
   * @param  {[type]}      context [description]
   * @param  {[type]}      form    [description]
   * @return {Promise}             [description]
   */
  async PostEnlistAdd(context, {form: data}){
    const response = await enlistAdd({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

/**
 * [GetQuesDetail 获取问卷调查的详情]
 * @method GetQuesDetail
 * @param  {[type]}      context [description]
 * @param  {[type]}      id      [description]
 * @return {Promise}             [description]
 */
  async GetQuesDetail(context, {id}){
    const response = await quesDetail({data: {id}})

    return response
  },

  async QuesPost(context, {data, id}){
    const response = await quesPost({
      data: {
        id,
        data: JSON.stringify(data)
      }
    })
    if(!response.error) window.$router.go(-1)
    return response
  }
}


const getters = {}

export default {
  state, mutations, actions, getters
}
