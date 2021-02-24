<template>
  <v-container>
    Share ID : {{ videoSourceId }}
    <br />
    <LocalVideo v-if="hasP2PConnection" @mediastreamstart="onMediaStreamStart" />
  </v-container>
</template>

<script lang="ts">
import { socketApi } from "@/services/socketService";
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
	@Prop() public videoSourceId!: string;
    private requestorSocketId: string = '';

	private p2pConn: RTCPeerConnection|null = null;

	public async created() {
		const videoSource = await videoSourceApi.get(this.videoSourceId);

		const offer: RTCSessionDescriptionInit = JSON.parse(videoSource.offer);
		console.log('offer', offer);

		if (offer) {
            this.requestorSocketId = videoSource.socketId;
			this.p2pConn = peerApi.createNewConnection();
			await peerApi.attachOfferToConnection(this.p2pConn, offer);

			// TODO, is an answer required for one way
		}
	}

	public get hasP2PConnection(): boolean {
		return !!this.p2pConn;
	}

	public onMediaStreamStart(mediaStream: MediaStream) {
        console.log('mediaStream started', mediaStream);
		mediaStream.getTracks().forEach(track => this.p2pConn!.addTrack(track, mediaStream));
        socketApi.confirmVideoForSource(this.requestorSocketId, this.videoSourceId);
	}
}
</script>

<style lang="scss">
.loginButton {
  margin: auto;
}
</style>