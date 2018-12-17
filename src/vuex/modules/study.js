import {
  gameList,
  quesList,
  examList,
  chairList
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

  async getExamList(context, {search: data}){
    const response = await examList({data})
    context.commit('SET_EXAMLIST', response.data)
    return response
  },

  async getChairList(context, {search: data}){
    const response = await chairList({data})
    context.commit('SET_CHAIRLIST', response)
    return response
  }
}


const getters = {}

export default {
  state, mutations, actions, getters
}
