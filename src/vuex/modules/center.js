import {
  userConcat,
  familyConcat,
  teacherInfo,
  checkPwd,
  dormitoryList,
  userInfo,
  awardList,
  awardSub,
  awardSubForThesis,
  certificateList,
  certificateSub,
  recordSub,
} from '@/api/center.api.js'
import {
  _toast
} from '@/utils/global'

const state = {
  domList: [],
}

const mutations = {
  SET_DOMLIST: (state, store) => {
    state.domList = store
  }
}

const actions = {
  /**
   * [PostUserConcat 个人中心 -- 个人联系方式]
   * @method PostUserConcat
   * @param  {[type]}       context [description]
   * @param  {[type]}       form    [description]
   * @return {Promise}              [description]
   */
  async PostUserConcat(context, {form: data}){
    const response = await userConcat({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

  /**
   * [PostFamilyConcat 个人中心 -- 家庭联系方式]
   * @method PostFamilyConcat
   * @param  {[type]}         context [description]
   * @param  {[type]}         form    [description]
   * @return {Promise}                [description]
   */
  async PostFamilyConcat(context, {form: data}){
    const response = await familyConcat({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

  /**
   * [GetteacherInfo 个人中心 -- 辅导员信息]
   * @method GetteacherInfo
   * @param  {[type]}       context [description]
   * @return {Promise}              [description]
   */
  async GetteacherInfo(context){
    const response = await teacherInfo()

    return response
  },

  /**
   * [PostCheckPwd 个人中心 -- 修改密码]
   * @method PostCheckPwd
   * @param  {[type]}     context [description]
   * @return {Promise}            [description]
   */
  async PostCheckPwd(context, {form: data}){
    let {newpwd1, newpwd2} = data
    if(newpwd1 != newpwd2){
      _toast({type: 3, msg: '密码不一致,请重试!'})
      return
    }
    const response = await checkPwd({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

  /**
   * [GetDormitoryList 个人信息 -- 宿舍楼栋的下拉列表]
   * @method GetDormitoryList
   * @param  {[type]}         context [description]
   * @return {Promise}                [description]
   */
  async GetDormitoryList(context){
    const response = await dormitoryList()
    context.commit('SET_DOMLIST', response)
    return response
  },

  /**
   * [PostUserInfo 个人中心 -- 个人信息详情]
   * @method PostUserInfo
   * @param  {[type]}     context [description]
   * @param  {[type]}     form    [description]
   * @return {Promise}            [description]
   */
  async PostUserInfo(context, {form: data}){
    const response = await userInfo({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },
  /**
   * [GetAwardList  个人中心 -- 获取奖学金]
   * @method GetAwardList
   * @param  {[type]}     context [description]
   * @return {Promise}            [description]
   */
  async GetAwardList(context){
    const response = await awardList()

    return response
  },

  /**
   * [PostAward 添加奖学金]
   * @method PostAward
   * @param  {[type]}  context [description]
   * @param  {[type]}  form    [description]
   * @return {Promise}         [description]
   */
  async PostAward(context, {form: {
    id: caia_id,
    rank: name,
    pic,
    score,
    type_,
    year: years
  },form}){
    const response = await awardSub({data: {
      caia_id,
      name,
      pic: pic.toString(),
      score,
      type_,
      years,
      name,
    }})
    if(!response.error){
      _toast({type: 2, msg: '添加成功'})
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

  /**
   * [PostAwardSubForThesis 个人中心 -- 添加奖励 -- 已发表论文]
   * @method PostAwardSubForThesis
   * @param  {[type]}              context [description]
   * @param  {[type]}              form    [description]
   * @return {Promise}                     [description]
   */
  async PostAwardSubForThesis(context, {form: data}){
    const response = await awardSubForThesis({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

  /**
   * [PostCertificateList 个人中心 -- 奖励 -- 考试证书]
   * @method PostCertificateList
   * @param  {[type]}            context [description]
   * @return {Promise}                   [description]
   */
  async GetCertificateList(context){
    const response = await certificateList()

    return response
  },

  /**
   * [PostCertificateSub 个人中心 -- 奖励 -- 发布考试证书]
   * @method PostCertificateSub
   * @param  {[type]}           context [description]
   * @return {Promise}                  [description]
   */
  async PostCertificateSub(context, {form: data}){
    const response = await certificateSub({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

  /**
   * [PostRecordSub 个人中心 -- 发布个人履历]
   * @method PostRecordSub
   * @param  {[type]}      context [description]
   * @param  {[type]}      form    [description]
   * @return {Promise}             [description]
   */
  async PostRecordSub(context, {form: data}){
    const response = await recordSub({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  }

}

const getters = {}

export default {
  state, mutations, actions, getters
}
