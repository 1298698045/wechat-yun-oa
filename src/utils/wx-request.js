const host = 'https://wx.phxinfo.com.cn'

function request(url, method, data, header = {}) {
    wx.showLoading({
        title: '加载中' // 数据请求前loading
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url, // 仅为示例，并非真实的接口地址
            method: method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
                wx.hideLoading()
                resolve(res.data)
            },
            fail: function(res) {
                wx.showModal({
                    content: '服务器出现异常，请稍后尝试',
                    showCancel: false,
                    confirmText: '我知道了',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                wx.hideLoading();
                // reject(false)
            },
            complete: function() {
                wx.hideLoading()
            }
        })
    })
}

function get(obj) {
    return request(obj.url, 'GET', obj.data)
}

function post(obj) {
    return request(obj.url, 'POST', obj.data)
}

export default {
    request,
    get,
    post,
    host
}