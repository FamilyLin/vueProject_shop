<template>
  <div>
    <router-view/>
    <footer-guide v-show="$route.meta.showFooter == true"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  }
}
</script>

<style>
</style>
