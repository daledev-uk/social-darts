<template>
  <div id="app">
    <a class="loginButton" href="http://localhost:5000/login">Login with google</a>
  </div>
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
