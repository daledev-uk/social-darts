<template>
  <div class="container">
    <header class="header">
      <div class="logo-container">
        <img
          src="./images/dartboard.png"
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
      <div class="active-users-panel" id="active-user-container">
        <h3 class="panel-title">Active Users:</h3>
      </div>
      <div class="video-chat-container">
        <h2 class="talk-info" id="talking-with-info">
          Select active user on the left menu.
        </h2>
        <div class="video-container">
          <video autoplay class="remote-video" id="remote-video"></video>
          <video autoplay muted class="local-video" id="local-video"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class App extends Vue {
    
</script>