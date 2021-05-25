<template>
  <div>
    <AddGreeting :socket="socket" @addGreeting="addGreeting" />
    <Cards :greetings="greetings" />
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
import axios from 'axios'
// import Balloons from './Balloons.vue';

export default {
  components: {
    AddGreeting,
    Cards,
    // Balloons,
  },
  data() {
    return {
      greetings: [],
      socket: "",
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
      if(res.data.length>0){
        res.data.forEach(greeting=>{
          this.greetings.push({
            text: greeting.text,
            userName: greeting.user
          })
        })
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