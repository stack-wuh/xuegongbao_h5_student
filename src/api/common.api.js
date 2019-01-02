import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'


/**
 * [categoryList 学习服务 -- 科研赛事 -- category列表]
 * @method categoryList
 * @return {[type]}     [description]
 */
export const categoryList = () => $http.post({
  url: '/keyan/category'
}).catch(err => _catch(err))

/**
 * [imageUpload 上传图片]
 * @method imageUpload
 * @param  {[type]}    data [description]
 * @return {[type]}         [description]
 */
export const imageUpload = ({
  data
}) => $http.post({
  url: '/upload/uploadImg',
  data
}).catch(_catch)

/**
 * [yearList 获取全部的学年内容]
 * @method yearList
 * @return {[type]} [description]
 */
export const yearList = () => $http.post({
  url: '/Awards/getYears'
}).catch(_catch)

/**
 * [burseList 奖学金名称]
 * @method burseList
 * @return {[type]}  [description]
 */
export const burseList = () => $http.post({
  url: '/Awards/getBurseList'
}).catch(_catch)


export const awardName = () => $http.post({
  url: '/Awards/getTitleList'
}).catch(_catch)


export  const patendList = () => $http.post({
  url: '/Awards/getPatentList'
}).catch(_catch)

export const prizeList = () => $http.post({
  url: '/Awards/getPrizeList'
}).catch(_catch)
