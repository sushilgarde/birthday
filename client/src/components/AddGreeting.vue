<template>
  <form
    @submit.prevent="addGreeting"
    style="
      background: linear-gradient(30deg,rgb(104, 44, 188), rgb(154, 111, 199) 70%);
      border: 1px solid lightblue;
      margin: 2rem;
      padding: 1rem;
    "
  >
    <div>
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Enter Greetings..."
        rows="3"
        max-rows="6"
        v-model.trim="greeting"
        required
      ></b-form-textarea>
      <br />
      <b-form-input
        id="input-2"
        v-model.trim="userName"
        placeholder="Enter name"
        required
      ></b-form-input>
    </div>

    <br />
    <b-button type="submit" variant="success">+ Add</b-button>
  </form>
</template>

<script>
import * as uuid from "uuid";
import axios from 'axios'
import swal from 'sweetalert'
export default {
  data() {
    return {
      greeting: "",
      userName: "",
      sessionId: "300594"
    };
  },
  props:['socket'],
  methods: {
    addGreeting() {
      // this.greetings.push({
      //   id: uuid.v4(),
      //   text: this.greeting,
      //   userName: this.userName
      // })

      this.$emit("addGreeting", {
        id: uuid.v4(),
        text: this.greeting,
        userName: this.userName,
      });

      axios.post('/newComment', {
            text: this.greeting,
            user: this.userName,
            like: 0,
            context: 'wentWell',
            sessionId: this.sessionId
        }).then((res)=>{
            console.log(res)
        })
         
      this.greeting = "";
      this.userName = "";

      swal("Successfully added!", {
          icon: "success",
      });
    },
  },
};
</script>

<style >
</style>