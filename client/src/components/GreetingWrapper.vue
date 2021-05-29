<template>
  <div style="background: #333744 !important">
    <AddGreeting :socket="socket" @addGreeting="addGreeting" />
    <div style='margin: 2rem'>
      <div class="text-center" v-if="cardsLoading">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>

      <b-card v-if="cardsLoading">
        <b-skeleton animation="fade" width="85%"></b-skeleton>
        <b-skeleton animation="fade" width="55%"></b-skeleton>
        <b-skeleton animation="fade" width="70%"></b-skeleton>
      </b-card>
    </div>
    <Cards :greetings="greetings" v-if="!cardsLoading"/>
    <b-button
      @click="$router.push('/')"
      style="z-index: 1000; position: fixed; right: 10px; bottom: 10px"
      variant="success"
      >Home</b-button
    >
  </div>
</template>

<script>
import AddGreeting from "./AddGreeting";
import Cards from "./Cards";
import io from "socket.io-client";
import axios from "axios";
// import Balloons from './Balloons.vue';

export default {
  components: {
    AddGreeting,
    Cards,
    // Balloons,
  },
  data() {
    return {
      greetings: [{
        text: 'Wishing you a spectacular celebration and a fabulous year ahead! <br> Happy Birthday!!🎂🎉',
        userName: "Sushil"
      }],
      socket: "",
      cardsLoading: true,
    };
  },
  methods: {
    addGreeting(data) {
      this.greetings.push(data);
    },
  },
  created() {
    // this.socket = io("http://localhost:3000")
    this.socket = io({
      reconnection: true, // whether to reconnect automatically
      reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
      reconnectionDelay: 1000, // how long to initially wait before attempting a new reconnection
      reconnectionDelayMax: 5000, // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
      randomizationFactor: 0.5,
    });
  },

  mounted() {
    axios.get("/commentsinsession/" + "300594").then((res) => {
      if (res.data.length > 0) {
        res.data.forEach((greeting) => {
          this.greetings.push({
            text: greeting.text,
            userName: greeting.user,
          });
        });
        this.cardsLoading= false;
      }
    });
  },
};
</script>

<style scoped>
body {
  background: #333744 !important;
}
</style>