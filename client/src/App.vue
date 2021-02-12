<template>
  <div class="container">
    <header class="header">
      <div class="logo-container">
        <img
          src="./asserts/dartboard.png"
          alt="social darts logo"
          class="logo-img"
        />
        <h1 class="logo-text">
          Social
          <span class="logo-highlight">Darts</span>
        </h1>
      </div>
    </header>
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SocketIOClient from "socket.io-client";
import { socketApi } from "./services/socketService";
import { peerApi } from "./services/peerConnectionService";

@Component
export default class App extends Vue {
  public created() {
    peerApi.createPeerConnection(window);
	  socketApi.init((this as any).$socket as SocketIOClient.Socket);
  }
}
</script>

<style lang="scss">
</style>