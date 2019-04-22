//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    post:'',
    comments:[]
  },

  onLoad: function(options) {
    // options 是个对象
    console.log(options.id)
    
    var that = this;

    // 请求书评详情页
    wx.request({
      url: "http://127.0.0.1:8000/api/post",
      data: {
        'id': options.id
      },
      success: function (res) {
        if (res.data.code == 202) {
          console.log('here it is')
          _js.login();
        } else {
          console.log(res)
          that.setData({
            'post': res.data.data
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })   

    // 请求关于这个书评的评论
    wx.request({
      url: "http://127.0.0.1:8000/api/comments",
      data: {
        'id': options.id
      },
      success: function (res) {
        if (res.data.code == 202) {
          console.log('here it is')
          _js.login();
        } else {
          console.log(res.data.data)
          that.setData({
            'comments': res.data.data
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })   
  },

  formSubmit: function (e) {
    var that = this;
    that.data.userInfo = app.globalData.userInfo;
    if (e.detail.value.comment.length == 0) {
      wx.showToast({
        title: '请写下评论!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }  else {

      // 提交表单
      wx.getStorage({
        key: 'token',
        success: function (res) {

          console.log(e.detail.value)
          // 表单提交的数据
          var data = {
            comment: e.detail.value.comment,
            post_id: e.detail.value.id,
            token: res.data,
            user_nickname: app.globalData.userInfo.nickName,
            user_avatar: app.globalData.userInfo.avatarUrl
          }
          wx.request({
            url: "http://127.0.0.1:8000/api/comment",
            data: data,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
              console.log(res.data)

              if(res.data.code == 200) {
                wx.showToast({
                  title: '提交评论成功!',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(function () {
                  wx.hideToast()
                }, 2000)
              }

              // 再次请求书评详情页
              wx.request({
                url: "http://127.0.0.1:8000/api/comments",
                data: {
                  'id': e.detail.value.id,
                },
                success: function (res) {
                  if (res.data.code == 202) {
                    console.log('here it is')
                    _js.login();
                  } else {
                    console.log(res.data.data)
                    that.setData({
                      'comments': res.data.data
                    })
                  }
                },
                fail: function (err) {
                  console.log(err)
                }
              }) 
            },
            fail: function (err) {
              console.log(err)
            }
          })
        },
      })
    }
  },
})