<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import $ from 'jquery'
import swal from 'sweetalert'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data(){
    return{
       player: new Audio(),
    }
  },
  mounted() {
    var _this = this;
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secondsEl = document.getElementById("seconds");

    const newYears = "30 May 2021";

    function countdown() {
      const newYearDate = new Date(newYears);
      const currentDate = new Date();

      const totalSeconds = (newYearDate - currentDate) / 1000;

      const days = Math.floor(totalSeconds / 3600 / 24);
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const seconds = Math.floor(totalSeconds) % 60;

      daysEl.innerHTML = days;
      hoursEl.innerHTML = formatTime(hours);
      minsEl.innerHTML = formatTime(minutes);
      secondsEl.innerHTML = formatTime(seconds);
    }

    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }

    countdown();

    setInterval(countdown, 1000);

    $(document).ready(function(){ 
      swal({
            title:'Time left for Birthday!',
            html:true,
            text: `${hoursEl.innerHTML } Hrs | ${minsEl.innerHTML } Mins`,
            icon: "info",
            dangerMode: false,
        })
        .then((ok) => {
          _this.player.src = require('./assets/happybday.mp3');
          _this.player.play();

          setInterval(function(){
            _this.player.src = require('./assets/happybday.mp3');
            _this.player.play();
          }, 20000)
        })
    });
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #333744!important;
  height: 100vh;
}

.swal-text{
  color: magenta;
  border: 1px solid lightblue;
  padding: 10px;
  box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
}

</style>
