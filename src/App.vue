<template>
  <div>
    <router-view />
    <footer-guide v-show="$route.meta.showFooter == true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'  //映射函数
import FooterGuide from './components/FooterGuide/FooterGuide.vue'

export default {

  mounted () {
    this.getAddress()
    this.getUserInfo()
    // this.$store.dispatch('getAddress')
  },

  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },

  components: {
    FooterGuide
  }
}
</script>

<style>
</style>
