<template>
  <video ref="localVidElement" autoplay muted></video>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LocalVideo extends Vue {
  public error = false;

  public async mounted() {
    try {
      const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(
        { audio: true, video: true }
      );
	  this.$emit('mediastreamstart', mediaStream);

      const localVideo = this.$refs.localVidElement as HTMLVideoElement;
      if (localVideo) {
        localVideo.srcObject = mediaStream;
      }

    } catch (err) {
      this.error = true;
	  this.$emit('mediastreamstarterror', err);
      console.warn(err.message);
    }
  }
}
</script>

<style lang="scss">
section {
  width: 100%;
}
</style>
