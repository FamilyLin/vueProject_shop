<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家信息</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'

export default {
  mounted () {
    this.$store.dispatch('getShopInfo')
  },
  components: {
    ShopHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
