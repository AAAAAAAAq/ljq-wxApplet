//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图部分
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 下拉分页
    page:1,
    // 首页列表
    list: [],
    totalPage: ''
  },
  onLoad: function() {
    this.getBannerImg();
    this.getHomeList()
  },
  // 获取banner图
  getBannerImg () {
    let that=this
    wx.request({
      url: app.url + '/lecturer/classRoom/getHomeInfo',
      data: {
        type: 2
      },
      success: function (res) {
        that.setData({
          imgUrls: res.data.data
        })
      }
    });
  },
  // 获取首页列表数据
  getHomeList() {
    let that = this
    wx.request({
      url: app.url + '/lecturer/classRoom/getHomeList',
      data: {
        page: this.data.page
      },
      success: function (res) {
        if(res.data) {
          that.data.totalPage = res.data.data.totalPage
          for (let i in res.data.data.rows){
            that.data.list.push(res.data.data.rows[i])
          }
          that.setData({
            list: that.data.list
          })
        }
      }
    });
  },
  // 下拉加载
  onReachBottom: function () {
    this.data.page++
    if (this.data.totalPage < this.data.page){
      return false;
    }
    this.getHomeList()
  },
})