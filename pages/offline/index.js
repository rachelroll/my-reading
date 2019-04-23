// pages/offline/index.js
import {promisify} from './promisify'

const wxGetImageInfo = promisify(wx.getImageInfo)



Page({

    /**
     * Page initial data
     */
data: {
    path:'../../images/123.jpg'
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
