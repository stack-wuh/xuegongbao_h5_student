import {
  categoryList,
} from '@/api/common.api.js'

const state = {
  gameCategoryList: [], // 科研赛事 -- 分类列表
}

const mutations = {
  SET_CATEGORYLIST: (state, response) => {
    state.gameCategoryList = [{name: '全部', id: 0}].concat(response)
  }
}

const actions = {
  async getCategoryList(context){
    const response = await categoryList()
    context.commit('SET_CATEGORYLIST', response)
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
