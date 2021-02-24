<template>
  <v-container>
    Share ID : {{ socketId }}
    <br />
    <LocalVideo v-if="hasP2PConnection" @mediastreamstart="onMediaStreamStart" />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { videoSourceApi } from "../../../services/api/videoSourceApi";
import { peerApi } from "../../../services/peerConnectionService";
import LocalVideo from "../../lobby/components/LocalVideo.vue";

@Component({
  components: {
    LocalVideo,
  },
})
export default class VideoSource extends Vue {
	@Prop() public socketId!: string;

	private p2pConn: RTCPeerConnection = null;

	public async created() {
		const videoSource = await videoSourceApi.get(this.socketId);
		console.log('videoSource', videoSource);

		const offer: RTCSessionDescriptionInit = JSON.parse(videoSource.offer);
		console.log('offer', offer);

		if (offer) {
			this.p2pConn = peerApi.createNewConnection();
			await peerApi.attachOfferToConnection(this.p2pConn, offer);

			// TODO, is an answer required for one way
		}
	}

	public get hasP2PConnection(): boolean {
		return !!this.p2pConn;
	}

	public onMediaStreamStart(mediaStream: MediaStream) {
		mediaStream.getTracks().forEach(track => this.p2pConn.addTrack(track, mediaStream));
	}
}
</script>

<style lang="scss">
.loginButton {
  margin: auto;
}
</style>