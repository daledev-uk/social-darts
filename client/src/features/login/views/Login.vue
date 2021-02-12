<template>
  <b-card bg-variant="dark" text-variant="white" title="Social Darts">
    <b-card-text>
      Play darts with your friends remote with the need any any special equipment.
    </b-card-text>

    <b-button href="http://localhost:5000/login" variant="secondary">
      <img src="https://img.icons8.com/color/16/000000/google-logo.png">
      Sign-in Using Google
    </b-button>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>

<style lang="scss">
.loginButton {
	margin: auto;
}
</style>
