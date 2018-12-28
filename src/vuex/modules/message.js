import {
  messageList,
  messageDetail,
  messageForm,
  messageRecive,
  messageReciveList,
  messageUnReciveList,
} from '@/api/message.api.js'

const state = {}

const mutations = {}

const actions = {
  /**
   * [GetMessageList 获取消息列表]
   * @method GetMessageList
   * @param  {[type]}       context [description]
   * @param  {[type]}       search  [description]
   * @return {Promise}              [description]
   */
  async GetMessageList(context, {search: data}){
    const response = await messageList({data})

    return response
  },

  /**
   * [GetMessageDetail 消息详情]
   * @method GetMessageDetail
   * @param  {[type]}         context [description]
   * @param  {[type]}         id      [description]
   * @return {Promise}                [description]
   */
  async GetMessageDetail(context, {id}){
    const response =  await messageDetail({id})

    return response
  },

  /**
   * [PostMessageForm 消息详情 -- 发布表单]
   * @method PostMessageForm
   * @param  {[type]}        context [description]
   * @param  {[type]}        form    [description]
   * @return {Promise}               [description]
   */
  async PostMessageForm(context, {form: data}){
    const response  = await messageForm({data})
    if(!response.error){
      setTimeout(() => {
        window.$router.go(-1)
      }, 1000)
    }
    return response
  },

  /**
   * [PostMessageRecive 消息详情 -- 收到消息 ]
   * @method PostMessageRecive
   * @param  {[type]}          context [description]
   * @param  {[type]}          id      [description]
   * @return {Promise}                 [description]
   */
  async PostMessageRecive(context, {id}){
    const response = await messageRecive({id})
    return response
  },

  /**
   * [GetMessageReciveList 消息中心 -- 消息详情 -- 已收到消息人员列表]
   * @method GetMessageReciveList
   * @param  {[type]}             context [description]
   * @param  {[type]}             id      [description]
   * @return {Promise}                    [description]
   */
  async GetMessageReciveList(context, {id}){
    const response = await messageReciveList({id})
    return response
  },

  /**
   * [GetMessageUnReciveList 消息中心 -- 消息详情 -- 未收到消息人员列表]
   * @method GetMessageUnReciveList
   * @param  {[type]}               context [description]
   * @param  {[type]}               id      [description]
   * @return {Promise}                      [description]
   */
  async GetMessageUnReciveList(context, {id}){
    const response = await messageUnReciveList({id})
    return response
  }

}

const getters = {}

export default {
  state, mutations, actions, getters
}
