// pages/offline/index.js
import {promisify} from './promisify'

const wxGetImageInfo = promisify(wx.getImageInfo)




Page({

    /**
     * Page initial data
     */
    data: {
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

        Promise.all([
            wxGetImageInfo({
                src: '../../images/register-card@2x.png'
            }),
            wxGetImageInfo({
                src: 'https://file.iviewui.com/weapp/dist/e5da9fdc97a0b3fb16c115d379820583.jpg'
            })
        ]).then(res => {
            console.log(res)
            const ctx = wx.createCanvasContext('shareCanvas')
            let image_path = '../../' + res[0].path;
            console.log(image_path)
            // 底图
            ctx.drawImage(image_path, 15, 0, res[0].width/2, res[0].height/2)


            // 作者名称
            ctx.setTextAlign('center')    // 文字居中
            ctx.setFillStyle('#000000')  // 文字颜色：黑色
            ctx.setFontSize(22)         // 文字字号：22px
            ctx.fillText('作者：一斤代码', 600 / 2, 500)

            ctx.setTextAlign('center')    // 文字居中
            ctx.setFillStyle('#000000')  // 文字颜色：黑色
            ctx.setFontSize(22)         // 文字字号：22px
            ctx.fillText('skdfjskdjfskdjfks', 300, 400)


            ctx.setTextAlign('center')    // 文字居中
            ctx.setFillStyle('#fff')  // 文字颜色：黑色
            ctx.setFontSize(22)         // 文字字号：22px
            ctx.fillText('rosssssssss', 300, 450)

            // 小程序码
            // const qrImgSize = 180
            // ctx.drawImage(res[1].path, (600 - qrImgSize) / 2, 530, qrImgSize, qrImgSize)

            ctx.stroke()
            ctx.draw()
        });
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
