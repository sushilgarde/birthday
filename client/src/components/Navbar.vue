<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" style="z-index: 1000">
      <b-navbar-brand href="#" @click='$router.push("/")'>HAPPY BIRTHDAY VAISHALI</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          

          <b-navbar-nav>
            <b-button variant='success' @click="$router.push('/add-greeting')">+ Add Greeting</b-button>
          </b-navbar-nav>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- <Timer v-if='$route.path!="/add-greeting"'/> -->
  </div>
</template>

<script>
// import Timer from './Timer.vue'

export default {
  components:{
    // Timer
  }
};
</script>

<style scoped>
</style>