<!--  -->
<template>
  <view>
    <!-- 图片 -->
    <view class="album-wrap">
      <view class="album-title">
        <view class="album-bg">
          <image :src="album.cover"></image>
        </view>
        <view class="album-title-info">
          <view class="album-title-name">{{ album.name }}</view>
          <view class="album-title-at">关注专题</view>
        </view>
      </view>
      <view class="album-content"></view>
    </view>
    <!-- 作者信息 -->
    <view class="author-wrap">
      <view class="author-info">
        <view class="author-img">
          <image :src="album.user.avatar" mode="widthFix"></image>
        </view>
        <view class="author-name">{{ album.user.name }}</view>
      </view>
      <view class="album-desc">
        <text>{{ album.desc }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 主题详情 id
      id: "",
      // 请求参数
      params: {
        limit: 30,
        skip: 0,
        order: "new",
        // 1表示第一次发送请求（包含信息和列表数据）， 0 表示不是第一次发送（只有列表数据）
        first: 1,
      },
      // 专题详情信息
      album: {},
      // 专题详情图片
      wallpaper: [],
    };
    // 5e5cf679e7bce739db1281e4
  },
  methods: {
    getList() {
      this.request({
        // url: `http://157.122.54.189:6006/image/v1/wallpaper/album/${this.id}/wallpaper`,
        url: `http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
        // http://service.picasso.adesk.com/v1/wallpaper/album

        // 5e7617d1aaa8d91460798739
        data: this.params,
      }).then((res) => {
        console.log(res);
        this.album = res.res.album;
      });
    },
  },
  onLoad(options) {
    // console.log(options);
    this.id = options.id;
    this.getList();
  },
};
</script>
<style scoped lang="scss">
.album-wrap {
  .album-title {
    position: relative;
    .album-bg {
      image {
      }
    }

    .album-title-info {
      width: 100%;
      position: absolute;
      bottom: 20rpx;
      left: 0;
      display: flex;
      font-size: 36rpx;
      color: #fff;
      justify-content: space-between;
      .album-title-name {
        font-weight: 600;
        margin-left: 40rpx;
      }
      .album-title-at {
        font-size: 30rpx;
        background-color: $color;
        width: 152rpx;
        height: 56rpx;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        margin-right: 20rpx;
      }
    }
  }

  .album-content {
  }
}

.author-wrap {
  margin: 15rpx;
  .author-info {
    display: flex;
    .author-img {
      image {
        width: 60rpx;
      }
    }
    .author-name {
      margin-left: 10rpx;
      font-weight: 600;
      font-size: 34rpx;
    }
  }
  .album-desc {
    margin-top: 10rpx;
    font-size: 30rpx;
  }
}
</style>
