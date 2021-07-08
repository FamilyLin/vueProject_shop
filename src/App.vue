<template>
  <div>
    <router-view/>
    <footer-guide v-show="$route.meta.showFooter == true"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqFoodCategorys} from './api'

export default {

  async mounted() {
    const result = await reqFoodCategorys()
    console.log(result)
  },

  components: {
    FooterGuide
  }
}
</script>

<style>
</style>
