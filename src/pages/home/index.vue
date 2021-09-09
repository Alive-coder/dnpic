<!-- 首页 -->
<template>
  <view>
    <view>
      <uni-segmented-control
        :current="current"
        :values="items.map((v) => v.title)"
        @clickItem="onClickItem"
        styleType="text"
        activeColor="#d4237a"
      ></uni-segmented-control>
      <view class="content">
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
        { title: "专辑" },
      ],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>
<style scoped></style>
