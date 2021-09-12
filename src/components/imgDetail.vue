<!-- 相当于是中间存储数据层
 （需要接收图片数组，并且需要接收图片 id）
点击图片详情时需要切换图片
 -->
<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number,
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      //  当点击图片时  将 list , index 存入全局对象中，并进行跳转
      getApp().globalData.list = this.list;
      getApp().globalData.index = this.index;

      uni.navigateTo({
          url: '/pages/imgdetail/index'
      });
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
