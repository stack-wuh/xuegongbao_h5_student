import {
  categoryList,
  imageUpload,
  yearList,
  burseList,
  awardName,
  patendList,
  prizeList,
} from '@/api/common.api.js'

const state = {
  gameCategoryList: [], // 科研赛事 -- 分类列表
  yearList: [], // 学年列表
  burseList: [], // 奖学金项目列表
  awardNameList: [], // 荣誉称号列表
  patendList: [], //软著专利列表
  prizeList: [], // 获奖列表
}

const mutations = {
  SET_CATEGORYLIST: (state, response) => {
    state.gameCategoryList = [{name: '全部', id: 0}].concat(response)
  },

  SET_YEAR: (state, response) => {
    state.yearList = response
  },

  SET_BURSE: (state, response) => {
    state.burseList = response
  },

  SET_AWARDNAME: (state, response) => {
    state.awardNameList = response
  },

  SET_PATEND: (state, response) => {
    state.patendList = response
  },

  SET_PRIZE: (state, response) => {
    state.prizeList = response
  }
}

const actions = {
  async getCategoryList(context){
    const response = await categoryList()
    context.commit('SET_CATEGORYLIST', response)
    return response
  },

  /**
   * [PostImageUploader 图片上传]
   * @method PostImageUploader
   * @param  {[type]}          context [description]
   * @return {Promise}                 [description]
   */
  async PostImageUploader(context, {data}){
    const response = await imageUpload({data})

    return response
  },

  /**
   * [GetYearList 获取全部学年的列表]
   * @method GetYearList
   * @param  {[type]}    context [description]
   * @return {Promise}           [description]
   */
  async GetYearList(context){
    const response = await yearList()
    context.commit('SET_YEAR', response)
    return response
  },

  /**
   * [GetBurseList 添加奖学金的名称列表]
   * @method GetBurseList
   * @param  {[type]}     context [description]
   * @return {Promise}            [description]
   */
  async GetBurseList(context){
    const response = await burseList()
    context.commit('SET_BURSE', response)
    return response
  },

  /**
   * [GetAwardNameList 获取荣誉称号列表]
   * @method GetAwardNameList
   * @param  {[type]}         context [description]
   * @return {Promise}                [description]
   */
  async GetAwardNameList(context){
    const response = await awardName()
    context.commit('SET_AWARDNAME', response)
    return response
  },

  /**
   * [GetPatendList 获取软著专利列表]
   * @method GetPatendList
   * @param  {[type]}      context [description]
   * @return {Promise}             [description]
   */
  async GetPatendList(context){
    const response = await patendList()
    context.commit('SET_PATEND', response)
    return response
  },

  /**
   * [GetPrizeList 获取获奖情况列表]
   * @method GetPrizeList
   * @param  {[type]}     context [description]
   * @return {Promise}            [description]
   */
  async GetPrizeList(context){
    const response = await prizeList()
    context.commit('SET_PRIZE', response)
    return response
  }
}

const getters = {
  formatGameCategoryList: state => {
    return state.gameCategoryList.map(ii => {
      return ii = {label: ii.name, value: ii.id}
    })
  }
}

export default {
  state, mutations, actions, getters
}
