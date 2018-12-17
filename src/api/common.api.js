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
