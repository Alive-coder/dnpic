// 封装异步请求
export default (params) => {

    uni.showLoading({
        title: '加载中...'
      })

    return new Promise((reslove, reject) => {
        wx.request({
            // 参数解构
            ...params,
            success: (result) => {
                reslove(result.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                uni.hideLoading();
            }
        });
          
    })
}