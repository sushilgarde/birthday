<template>
  <div class="countdown" style="position: fixed; z-index:1000; height: 10px">
    <div class="counter-el days-c">
      <p class="big-text" id="days">25</p>
      <span>Days</span>
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
      <span>Second</span>
    </div>
  </div>
</template>

<script>
export default {
  
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