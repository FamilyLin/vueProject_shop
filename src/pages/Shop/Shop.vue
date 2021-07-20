<template>
  <div>
    <shop-heaer />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info">商家信息</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeaer from '../../components/ShopHeader/ShopHeaer.vue'

export default {
  mounted(){
    this.$store.dispatch('getShopInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
