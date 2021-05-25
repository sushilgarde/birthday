<template>
  <div id='card-layout' style='margin: 2rem;'>
    <b-card
      :title="'Greetings from '+greeting.userName"
      img-src="https://www.msgflower.com/birthday/images/birthday-messages-image.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 30rem; margin: 2rem 0"
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