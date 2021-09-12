<!-- 图片详情页面 -->
<template>
  <view>
    图片详情
  </view>
</template>

<script>
export default {
  data () {
    return {
      imgDetail: {}
    }
  },
  methods: {},
  onLoad(){
      console.log(getApp().globalData)
      this.imgDetail = getApp().globalData.list[getApp().globalData.index]
      console.log(this.imgDetail)
  }
}

</script>
<style scoped>
</style>