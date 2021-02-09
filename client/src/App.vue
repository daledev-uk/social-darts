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

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafc;
  color: #595354;
}

.header {
  background-color: #ffffff;
  padding: 10px 40px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.header > .logo-container {
  display: flex;
  align-items: center;
}

.header > .logo-container > .logo-img {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.header > .logo-container > .logo-text {
  font-size: 26px;
  font-weight: 700;
  color: rgb(0, 143, 47);
}

.header > .logo-container > .logo-text > .logo-highlight {
  color: rgb(202, 0, 0);
}

.content-container {
  width: 100%;
  height: calc(100vh - 89px);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.active-users-panel {
  width: 300px;
  height: 100%;
  border-right: 1px solid #cddfe7;
}

.panel-title {
  margin: 10px 0 0 0;
  padding-left: 30px;
  font-weight: 500;
  font-size: 18px;
  border-bottom: 1px solid #cddfe7;
  padding-bottom: 10px;
}

.active-user {
  padding: 10px 30px;
  border-bottom: 1px solid #cddfe7;
  cursor: pointer;
  user-select: none;
}

.active-user:hover {
  background-color: #e8e9eb;
  transition: background-color 0.5s ease;
}

.active-user--selected {
  background-color: #fff;
  border-right: 5px solid #65a9e5;
  font-weight: 500;
  transition: all 0.5s ease;
}

.video-chat-container {
  padding: 0 20px;
  flex: 1;
  position: relative;
}

.talk-info {
  font-weight: 500;
  font-size: 21px;
}

.remote-video {
  position: fixed;
  right:0;
  top:0;
  border: 1px solid #cddfe7;
  width: 500px;
  height: 500px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}

.local-video {
  position: absolute;
  border: 1px solid #cddfe7;
  bottom: 60px;
  right: 40px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 300px;
}
</style>