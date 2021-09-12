<!--  -->
<template>
  <view>
    <scroll-view scroll-y @scrolltolower="handleToLower" class="album-scroll-view">
      <!-- 轮播图 -->
      <view class="banner-wrap">
        <swiper autoplay indicator-dots circular interval="2000">
          <swiper-item v-for="item in banner">
            <image :src="item.thumb" :key="item.id"></image>
          </swiper-item>
        </swiper>
      </view>

      <!-- 专辑列表 -->
      <view class="album-wrap">
        <navigator class="album-item" v-for="item in album" :key="item.id"
        :url='`/pages/album/index?id=${item.id}`'>
          <!-- 左侧图片 -->
          <view class="album-img">
            <image :src="item.cover" mode='aspectFill'></image>
          </view>
          <!-- 右侧信息 -->
          <view class="album-info">
            <view class="album-title">{{ item.name }}</view>
            <view class="album-desc">{{ item.desc }}</view>
            <view class="album-btn">
              <text class="attention">+ 关注</text>
            </view>
          </view>
        </navigator>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 请求中的参数
      params: {
        limit: 30,
        order: "new",
        skip: 0,
      },
      // 专辑
      album: [],
      // 轮播图
      banner: [],
      // 是否还有数据
      hasMore: true
    };
  },
  methods: {
    // 获取轮播图数据
    getBanner() {
      this.request({
        // url: 'http://service.picasso.adesk.com/v1/wallpaper/album',
        url: "http://157.122.54.189:6006/image/v1/wallpaper/album",
        // url: "http://157.122.54.189:6006/image/v1/wallpaper/album",
        data: this.params,
      }).then((res) => {
        console.log(res);
        // this.album = res.res.album;
        this.banner = res.res.banner;
      });
    },
    // 获取专辑列表
    getAlbum() {
      this.request({
        url: "http://service.picasso.adesk.com/v1/wallpaper/album",
        // url: "http://157.122.54.189:6006/image/v1/wallpaper/album",
        data: this.params,
      }).then((res) => {
        console.log(res);
        // 没有数据了
        if(res.res.album.length === 0){
          this.hasMore = false
        }
        this.album = [...this.album,...res.res.album];
        // this.banner = res.res.banner;
      });
    },
    // 当滚动条触底
    handleToLower(){
      this.params.skip += this.params.limit

      if(this.hasMore){
        this.getAlbum()
      }else{
        uni.showToast({
          title: '已经到底啦~',
          icon: 'none'
        });
      }
    }
  },
  mounted() {
    // 发送请求
    this.getBanner();
    this.getAlbum();
  },
};
</script>
<style scoped lang="scss">
.album-scroll-view{
  height: calc(100vh - 36px);
}
.banner-wrap {
  swiper {
    height: calc(750 * 375 / 620 rpx);
    swiper-item {
      /* 图片 620 x 375 */
      /* 750 / height = 620 /375 */
      width: 100%;
      height: 100%;
      image {
        height: 100%;
      }
    }
  }
}

.album-wrap {
  .album-item {
    display: flex;
    margin-top: 20rpx;
    padding: 10rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px solid #ccc;
    .album-img {
      flex: 1;
      image {
        width: 250rpx;
        height: 200rpx;
      }
    }
    .album-info {
      flex: 2;
      margin-left: 20rpx;
      overflow: hidden;
      .album-title {
        font-size: 32rpx;
      }
      .album-desc {
        font-size: 26rpx;
        margin-top: 20rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .album-btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 20rpx;
        margin-right: 10rpx;
        .attention {
          color: $color;
          border: 1px $color solid;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
