<template>
  <div id='card-layout' style='margin: 2rem;'>
    <!-- img-src="https://www.msgflower.com/birthday/images/birthday-messages-image.jpg" -->
    <b-card
      :title="'Greetings from '+greeting.userName"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 30rem; margin: 2rem 0;background:linear-gradient(30deg, rgb(44, 188, 99), rgb(22, 164, 138) 70%);color:white"
      class="mb-2"
      v-for='greeting in greetings'
      :key='greeting'
    >
      <b-card-text>
        {{greeting.text}}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props:['greetings']
};
</script>

<style scoped>
#card-layout{
  background: #333744!important;
}
</style>