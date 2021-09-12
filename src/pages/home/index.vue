<!-- 首页 -->
<template>
  <view class="content">
    <view class="tab-bar">
      <view class="tab-bar-title">
        <view class="tab-bar-title-inner">
          <uni-segmented-control
          :current="current"
          :values="items.map((v) => v.title)"
          @clickItem="onClickItem"
          styleType="text"
          activeColor="#d4237a"
        ></uni-segmented-control>
        </view>
        <text class="iconfont icon-sousuo"></text>
      </view>
      <view class="tab-bar-content">
        <view v-show="current === 0">
          <home-recommend></home-recommend>
        </view>
        <view v-show="current === 1">
          <home-category></home-category>
        </view>
        <view v-show="current === 2">
          <home-new></home-new>
        </view>
        <view v-show="current === 3">
          <home-album></home-album>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import homeAlbum from "./home-album";
import homeCategory from "./home-category";
import homeNew from "./home-new";
import homeRecommend from "./home-recommend";

export default {
  components: {
    uniSegmentedControl,

    homeAlbum,
    homeCategory,
    homeNew,
    homeRecommend,
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专题" },
      ],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    }

  },
  mounted(){
    uni.setNavigationBarTitle({
      title: '首页'
    });
  }
  
};
</script>
<style scoped lang='scss'>
.content{
  .tab-bar{
    .tab-bar-title{
      position: relative;
      .tab-bar-title-inner{
        width: 60%;
        margin: 0 auto;
      }
      .icon-sousuo{
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
        font-size: 40rpx;
        font-weight: 600;
      }
    }
    .tab-bar-content{}
  }
}
</style>
