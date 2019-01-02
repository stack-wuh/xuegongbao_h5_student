import {forms} from '@/utils/form'
import {validDate} from '@/utils/vaild'
import {
  formatTime
} from '@/utils/global'

const state = {
  form: {}, //全部页面的表单内容
  search: {}, //全部页面的搜索条件
}

const mutations = {
  /**
   * [setFormDate 设置表单触发的值]
   * @method setFormDate
   * @param  {[type]}    state [description]
   * @param  {[type]}    form  [description]
   */
  setFormDate(state, form){
    state.form[form.field] = form.value
    let _arr = Object.keys(state.form).map(validDate)
    _arr.map(item => {
      if(!item) return
      state.form[item] = formatTime(state.form[item])
    })
  },

  setFormDateByField(state, form){
    state.form.id = form.id
    state.form[form.field] = form.label
    state.form[form.child] = form.value
  },
}

const actions = {
  /**
   * [handleSaveForm 表单的change事件, 返回的值绑定进vuex]
   * @method handleSaveForm
   * @param  {[type]}       commit [description]
   * @param  {[type]}       form   [description]
   * @return {[type]}              [description]
   */
  handleSaveForm({commit}, {form}){
    commit('setFormDate', form)
  },

  handleSaveFormByField({commit}, {form}){
    commit('setFormDateByField', form)
  },


}

const getters = {
  /**
   * [getFormList 定义一个函数返回按条件查询出来的表单]
   * @method getFormList
   * @param  {[type]}    getters [description]
   * @return {[type]}            [description]
   */
  getFormList: (context, rootGetters) => (pick = {}) => {
    let _obj = forms.find(item => item.picks.includes(pick.path || pick.name))
    if(pick.name == '科研赛事招募令'){
      _obj.list.map(ii => {
        if(ii.label == '项目类别'){
          ii.list = context.Common && context.Common.gameCategoryList.map(ii => {
              return ii = {label: ii.name, value: ii.name}
          })
        }
      })
    }else if(pick.name == '基础信息'){
      _obj.list.map(ii => {
        if(ii.label === '宿舍楼栋'){
          ii.list = context.Center.domList && context.Center.domList.map(ss => {
            return ss = {label: ss.name, value: ss.name}
          })
        }
      })
    }else if(pick.name == '奖学金'){
      _obj.list.map(ii => {
        if(ii.label == '年度'){
          ii.list = context.Common.yearList && context.Common.yearList.map(ss => {
            return ss = {label: ss, value: ss}
          })
        }else if(ii.label == '名称'){
          ii.list = context.Common.burseList && context.Common.burseList.map(ss => {
            return ss = {label: ss.rank, value: ss.score, id: ss.id}
          })
        }
      })
    }else if(pick.name == '荣誉称号'){
      _obj.list.map(ii => {
        if(ii.label == '年度'){
          ii.list = context.Common.yearList && context.Common.yearList.map(ss => {
            return ss = {label: ss, value: ss}
          })
        }else if(ii.label == '名称'){
          ii.list = context.Common.awardNameList && context.Common.awardNameList.map(ss => {
            return ss = {label: ss.rank, value: ss.score, id: ss.id}
          })
        }
      })
    }else if(pick.name == '软著专利'){
      _obj.list.map(ii => {
        if(ii.label == '年度'){
          ii.list = context.Common.yearList && context.Common.yearList.map(ss => {
            return ss = {label: ss, value: ss}
          })
        }else if(ii.label == '名称'){
          ii.list = context.Common.patendList && context.Common.patendList.map(ss => {
            return ss = {label: ss.rank, value: ss.score, id: ss.id}
          })
        }
      })
    }else if(pick.name == '获奖情况'){
      _obj.list.map(ii => {
        if(ii.label == '年度'){
          ii.list = context.Common.yearList && context.Common.yearList.map(ss => {
            return ss = {label: ss, value: ss}
          })
        }else if(ii.label == '名称'){
          ii.list = context.Common.prizeList && context.Common.prizeList.map(ss => {
            return ss = {label: ss.rank, value: ss.score, id: ss.id}
          })
        }
      })
    }
    return _obj
  },

  /**
   * [getSelectList 定义一个函数来获取表单中的select选择列表]
   * @method getSelectList
   * @param  {[type]}      getters [description]
   * @return {[type]}      field  [根据字段来筛选]
   */
  getSelectList: getters => ({field, list = []}) => {
    return field && list.find(item => item.field == field)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
