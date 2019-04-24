const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
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
        url: 'http://127.0.0.1:8000/api/user-info', //接口地址
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
          // this.globalData.token = res.data
        },
      })
    }
  })
}


function savePicToAlbum(tempFilePath) {
  let that = this;
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功'
                });
              },
              fail(res) {
                console.log(res);
              }
            })
          },
          fail() {
            // 用户拒绝授权,打开设置页面
            wx.openSetting({
              success: function (data) {
                console.log("openSetting: success");
              },
              fail: function (data) {
                console.log("openSetting: fail");
              }
            });
          }
        })
      } else {
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            });
          },
          fail(res) {
            console.log(res);
          }
        })
      }
    },
    fail(res) {
      console.log(res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  savePicToAlbum: savePicToAlbum,
  login: login
}
