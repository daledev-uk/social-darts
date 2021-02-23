<template>
  <v-container>
    Share ID : {{ socketId }}
	<br />
    <LocalVideo />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { videoSourceApi } from "../../../services/api/videoSourceApi";
import LocalVideo from "../../lobby/components/LocalVideo.vue";

@Component({
  components: {
    LocalVideo,
  },
})
export default class VideoSource extends Vue {
  @Prop() public socketId!: string;

  public async created() {
      const videoSource = await videoSourceApi.get(this.socketId);
      console.log('videoSource', videoSource);
      const offer: RTCSessionDescriptionInit = JSON.parse(videoSource.offer);
      console.log('offer', offer);
  }
}
</script>

<style lang="scss">
.loginButton {
  margin: auto;
}
</style>
