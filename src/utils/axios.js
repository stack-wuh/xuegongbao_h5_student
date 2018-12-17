import axios from 'axios'
import qs from 'qs'
import {
  _toast,
  getStorageHandle
} from '@/utils/global'

axios.interceptors.request.use(config => {
  window.$toast.loading({
    duration: 5 * 1000,
    mask: true,
    message: '加载中...'
  })
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

const checkStatus = response => {
  const map = new Map([
    [{
      resStatus: 200,
      msgStatus: 0
    }, {
      type: 2,
      msg: response.data.msg
    }],
    [{
        resStatus: 200,
        msgStatus: 1
      },
      {
        type: 3,
        msg: response.data.msg
      }
    ],
    [{
        resStatus: 300,
      },
      {
        type: 3,
        msg: '300错误'
      }
    ],
    [{
        resStatus: 400,
        msgStatus: 'undefined'
      },
      {
        type: 3,
        msg: '400错误'
      }
    ],
    [{
        resStatus: 404,
        msgStatus: 'undefined'
      },
      {
        type: 3,
        msg: '400错误'
      }
    ],
    [{
        resStatus: 500
      },
      {
        type: 3,
        msg: '500错误'
      }
    ]
  ])
  let result = [...map].filter(([key]) => (key.resStatus == response.status && key.msgStatus == response.data.error))
  setTimeout(() => {
    result.forEach(item => _toast(item[1]))
  }, 1000)
  return response.data
}

const ObjNotNull = (obj) => {
  let _obj = {}
  Object.keys(obj).map(oo => {
    if(obj[oo] !== undefined || obj[oo] !== null || obj[oo] !== '') _obj[oo] = obj[oo]
  })
  return _obj
}

export default {
  post({
    url,
    data,
  }) {
    return axios({
      method: 'post',
      baseURL: window.rootPath,
      url,
      data: qs.stringify(ObjNotNull({number:
                        getStorageHandle('userinfo') && getStorageHandle('userinfo').username, ...data})),
      timeout: 10000,
      crossDomain: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(res => {
      window.$toast.clear()
      return checkStatus(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  }
}
