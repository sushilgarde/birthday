<template>
  <div class="countdown" style="position: fixed; z-index:1000; height: 10px">
    <div class="counter-el days-c">
      <p class="big-text" id="days">25</p>
      <span>Day</span>
    </div>
    <div class="counter-el hours-c">
      <p class="big-text" id="hours">23</p>
      <span>Hours</span>
    </div>
    <div class="counter-el mins-c">
      <p class="big-text" id="mins">25</p>
      <span>Mins</span>
    </div>
    <div class="counter-el sec-c">
      <p class="big-text" id="seconds">25</p>
      <span>Seconds</span>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
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
  }
};
</script>

<style scoped>

.countdown {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 1rem 2rem;
  color: white;
}

.big-text {
  font-weight: bold;
  font-size: 1rem;
  line-height: 1;
  margin: 0 2rem;
}

.counter-el {
  text-align: center;
}

.counter-el span {
  font-size: 1.4rem;
}
</style>