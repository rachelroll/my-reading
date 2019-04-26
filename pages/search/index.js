Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 书评列表
    wx.getStorage({
      key: 'posts',
      success: function (res) {
        console.log(res.data)

        that.setData({
          posts: res.data
        })
      },
    })
  },

  // 搜索
  formSubmit(e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    if (e.detail.value.search.length == 0) {
      wx.showToast({
        title: '请输入要搜索的内容!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: "https://reading-api.oeaudio.com/api/posts/search",
        data: {
          "search": e.detail.value.search,
        },
        success: function (res) {
          console.log(res.data.data);

          // 刷新页面
          that.setData({
            posts: res.data.data
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },

  // 点赞
  like: function(event) {
    var that = this;
    console.log(event.target.dataset.id);
    // 点赞
    wx.request({
      url: "https://reading-api.oeaudio.com/api/post/like",
      data: {
        'id': event.target.dataset.id,
        'token': that.data.token
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 202) {
          console.log('here it is');
          _js.login();
        } else {
          console.log(res)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
