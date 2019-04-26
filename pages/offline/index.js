// pages/offline/index.js

Page({

    /**
     * Page initial data
     */

data: {
        images: [
            '../resources/banner1@2x.png',
            '../resources/banner2@2x.png'
        ],
        TabCur: 0,
        scrollLeft:0,
        months:[
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
        ],


        // 数据结构
        timeline_data:{
            0:{   //普通的键  index ,对应上面月份的键
                '05':[   // day 比如一月份 05号
                    {
                        'meridiem':'上午',
                        'time':'10:00',
                        'title':'2年,我把公司搞上了市',
                        'position':'中国 北京 西单商场',
                        'desc':'该活动纯属吹牛,请不要相信.哈哈哈哈哈',
                    },
                    {
                        'meridiem':'下午',
                        'time':'15:00',
                        'title':'2年,我把公司搞上了市',
                        'position':'中国 北京 西单商场',
                        'desc':'该活动纯属吹牛,请不要相信.哈哈哈哈哈',
                    }
                ],
                '23':[  // day 比如一月份 23号
                    {
                        'meridiem':'上午',
                        'time':'10:00',
                        'title':'3年,我去了京东商城',
                        'position':'中国 北京 西单商场',
                        'desc':'该活动纯属吹牛,请不要相信.哈哈哈哈哈',
                    }
                ],
                '30':[
                    {
                        'meridiem':'上午',
                        'time':'10:00',
                        'title':'3年,我去了京东商城',
                        'position':'中国 北京 西单商场',
                        'desc':'该活动纯属吹牛,请不要相信.哈哈哈哈哈',
                    }
                ]
            },
            1:{
                '12':[
                    {
                        'meridiem':'上午',
                        'time':'10:00',
                        'title':'2年,我把公司搞上了市',
                        'position':'中国 北京 西单商场',
                        'desc':'该活动纯属吹牛,请不要相信.哈哈哈哈哈',
                    },
                    {
                        'meridiem':'下午',
                        'time':'15:00',
                        'title':'2年,我把公司搞上了市',
                        'position':'中国 北京 西单商场',
                        'desc':'该活动纯属吹牛,请不要相信.哈哈哈哈哈',
                    }
                ],

            },
            2:{
                '27':[
                    {
                        'meridiem':'上午',
                        'time':'10:00',
                        'title':'京北读书会',
                        'position':'中国 北京 天安门北广场',
                        'desc':'该活动纯属吹牛,请不要相信.哈哈哈哈哈',
                    }
                ],

            }
        }
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: "https://reading-api.oeaudio.com/api/offlines",

            success: function (res) {
                console.log(res.data);
                var arr = Object.keys(res.data);
                console.log(arr[0]);

                // 通过 setData 函数给 data 里的数据赋值
                that.setData({
                    'timeline_data': res.data,
                    'TabCur': arr[0]
                });

            },
            fail: function (err) {
                console.log(err)
            }
        })
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})
