const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    kinds: [],
    bannerId: '',
    active: 0,
    page: 0,
    totalPage: 1,
    index: 0,
    name: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getKinds()
  },
  chooseItem: function (data) {
    let active = data.currentTarget.dataset.index
    let name = data.currentTarget.dataset.name
    this.data.bannerId = data.currentTarget.dataset.id
    this.data.page = 0
    this.data.listData = []
    this.setData({
      active: active,
      current: 0,
      name: name
    })
    this.getList()
  },
  getKinds: function () {
    wx.request({
      url: app.hostUrl + '/lecturer/classRoom/typeList',
      data: {
        isShow: 0
      },
      method: 'GET',
      success: (res) => {
        if (res.data.code == 0) {
          this.setData({
            kinds: res.data.data,
            name: res.data.data[0].name
          })
          this.data.bannerId = res.data.data[0].id
          this.getList()
        }
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
  getList: function (id) {
    this.data.page++
    if (this.data.page > this.data.totalPage) {
      return false
    }
    wx.request({
      url: app.hostUrl + '/lecturer/classRoom/getInformationInfo',
      data: {
        page: this.data.page,
        typeId: this.data.bannerId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code == 0) {
          if (this.data.bannerId == 100) {
            res.data.data.vieoList.map((value, key, arr) => {
              res.data.data.vieoList[key].createTime = res.data.data.vieoList[key].createTime.split(' ')[0]
            })
            this.setData({
              listData: res.data.data.vieoList
            })
          } else {
            res.data.data.baseList.map((value, key, arr) => {
              res.data.data.baseList[key].createTime = res.data.data.baseList[key].createTime && res.data.data.baseList[key].createTime.split(' ')[0]
            })
            this.setData({
              listData: res.data.data.baseList
            })
          }
          
          
        }
      }
    })
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})