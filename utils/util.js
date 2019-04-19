const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var login = function() {
  wx.login({
    success: res => {
      // console.log(res)
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        url: 'http://127.0.0.1:8001/api/user-info', //接口地址
        data: { code: res.code },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          // console.log(res.data)

          // 请求成功后, 把后台返回的 token 缓存起来
          wx.setStorage({
            key: 'token',
            data: res.data,
          })

          that.globalData.token = res.data
        },
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  login: login
}
