<!--  -->
<template>
  <view v-if="recommends.length">
    <scroll-view class="scroll-view" scroll-y @scrolltolower="handleToLower">
      <!-- 推荐图片（四张） -->
      <view class="recommend-wrap">
        <navigator
          class="recommend-item"
          v-for="item in recommends"
          :key="item.id"
          :url="`/pages/album/index?id=${item.target}`"
        >
          <image :src="item.thumb" mode="widthFix"></image>
        </navigator>
      </view>

      <!-- 月份标题 -->
      <view class="month-wrap">
        <view class="month-title-wrap">
          <view class="month-title-info">
            <view class="month-info">
              <text>{{ monthes.DD }}/</text>
              {{ monthes.MM }}月
            </view>
            <view class="month-text">{{ monthes.title }}</view>
          </view>
          <view class="month-title-more">更多 ></view></view
        >

        <!-- 月份图片 -->
        <view class="month-content">
          <view class="month-item" v-for="(item, index) in monthes.items" :key="item.id">
            <img-detail :list='monthes.items' :index='index'>
              <image
                mode="widthFix"
                :src="item.thumb + item.rule.replace('$<Height>', 360)"
              ></image>
            </img-detail>
          </view>
        </view>
      </view>

      <!-- 热门 -->
      <view class="hot-wrap">
        <view class="hot-title">
          <text>热门</text>
        </view>
        <view class="hot-content">
          <view class="hot-item" v-for="(item, index) in hots" :key="item.id">
            <img-detail :list='hots' :index='index'>
            <image mode="widthFix" :src="item.thumb"></image>
            </img-detail>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import moment from "moment";
import imgDetail from "@/components/imgDetail";

export default {
  components: {
    imgDetail,
  },
  data() {
    return {
      // 推荐
      recommends: [],
      // 月份
      monthes: {},
      // 热门
      hots: [],
      // 发送请求参数
      params: {
        limit: 30,
        order: "hot",
        skip: 0,
      },
      // 是否还有数据
      hasMore: true,
    };
  },
  methods: {
    // 滚动条触底事件
    handleToLower() {
      /* 1.需要将 skip （跳过数据的数量） += limit 
      2. 重新发送请求
      3. hots 数组叠加
       */
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getRequest();
      } else {
        uni.showToast({
          title: "已经到底啦~",
          icon: "none",
        });
      }
    },

    // 发送请求封装
    getRequest() {
      this.request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        // url: 'http://157.122.54.189:6006/image/v3/homepage/vertical',
        data: this.params,
      }).then((res) => {
        // console.log(res);

        if (this.recommends.length === 0) {
          // 推荐
          this.recommends = res.res.homepage[1].items;
          // 月份
          this.monthes = res.res.homepage[2];
          this.monthes.MM = moment(this.monthes.stime).format("MM");
          this.monthes.DD = moment(this.monthes.stime).format("DD");
        }
        // 热门
        this.hots = [...this.hots, ...res.res.vertical];
        // console.log(this.hots)
      });
    },
  },
  mounted() {
    this.getRequest();
  },
};
</script>
<style scoped lang="scss">
.scroll-view {
  height: calc(100vh - 36px);
}

.recommend-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 2rpx;
  .recommend-item {
    width: 50%;
    border: 3rpx solid #fff;
  }
}

.month-wrap {
  .month-title-wrap {
    display: flex;
    justify-content: space-between;
    margin: 20rpx;
    font-size: 30rpx;
    .month-title-info {
      display: flex;
      .month-info {
        margin-right: 30rpx;
        font-weight: 500;
        color: $color;
        text {
          font-size: 38rpx;
        }
      }
      .month-text {
        font-weight: 600;
        font-size: 34rpx;
      }
    }
    .month-title-more {
      color: $color;
      font-weight: 600;
    }
  }
}
.month-content {
  display: flex;
  flex-wrap: wrap;
  .month-item {
    width: 100%;
    padding: 5rpx;
  }
}

.hot-wrap {
  .hot-title {
    padding: 20rpx;
    text {
      font-size: 34rpx;
      border-left: 5px solid $color;
      padding-left: 20rpx;
      font-weight: 600;
    }
  }
  .hot-content {
    display: flex;
    flex-wrap: wrap;
    .hot-item {
      width: 33.33%;
      padding: 5rpx;
      image {
      }
    }
  }
}
</style>
