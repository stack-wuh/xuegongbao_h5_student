export const _toast = ({
  type = 1,
  msg = '',
}) => {
  switch (type) {
    case 1:
      return window.$toast.loading({
        mask: true,
        message: '加载中'
      })
    case 2:
      return msg && window.$toast.success({
        message: msg
      })
    case 3:
      return msg && window.$toast.fail({
        message: msg
      })
    case -1:
      return window.$toast.loading({
        mask: false,
        message: ''
      })
    default:
      return
  }
}

export const _catch = (err) => {
  const actions = new Map([
    [/404/, {
      type: 3,
      msg: '404错误'
    }],
    [/500/, {
      type: 3,
      msg: '500错误'
    }]
  ])
  let action = [...actions].filter(([key]) => key.test(err))
  action.forEach(([key, value]) => _toast(value))
}

export const formatTime = date => {
  let year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDay(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds()
  return  [year, month, day].map(timeToString).join('-') + ' ' + [hours, minutes, seconds].map(timeToString).join(':')
}

const timeToString = val => {
  let _val = val.toString()
  return _val[1] ? _val : '0' + _val
}

const localStorage = window.localStorage

export const setStorageHandle = (item, obj) => {
  let _data = JSON.stringify(obj)
  return  localStorage.setItem(item, _data)
}

export const getStorageHandle = (item) => {
  let _data = localStorage.getItem(item)
  return  _data = _data ? JSON.parse(_data) : null
}
