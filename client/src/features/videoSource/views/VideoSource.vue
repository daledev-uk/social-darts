<template>
  <v-container>
    Share ID : {{ videoSourceId }}
    <br />
    <LocalVideo v-if="videoSourceLoaded" @mediastreamstart="onMediaStreamStart" />    
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { RemotePeer, P2PConnection, CreateP2PConnectionRequest } from "@/store/screenShare";
import { CREATE_NEW_P2P_CONNECTION, MAKE_P2P_OFFER } from "@/store/screenShare/actionTypes";
import { videoSourceApi } from "../../../services/api/videoSourceApi";
import LocalVideo from "../../lobby/components/LocalVideo.vue";

@Component({
  components: {
    LocalVideo,
  },
})
export default class VideoSource extends Vue {
	@Prop() public videoSourceId!: string;

	@Action(CREATE_NEW_P2P_CONNECTION)
	public createNewP2pConnection: (req: CreateP2PConnectionRequest) => Promise<P2PConnection>;
	@Action(MAKE_P2P_OFFER)
	public makeOffer: (p2pConnId: string) => Promise<void>;

	public videoSourceLoaded = false;

	private p2pConn = {} as P2PConnection;

	public async created() {
		const videoSource = await videoSourceApi.get(this.videoSourceId);

		this.p2pConn = await this.createNewP2pConnection({
			p2pId: videoSource.id,
			remotePeer: {
				type: 'user',
				socketId: videoSource.socketId,
				userId: videoSource.userId
			}
		});
		this.videoSourceLoaded = true;
	}

	public async onMediaStreamStart(mediaStream: MediaStream) {
        console.log('mediaStream started', mediaStream);
		mediaStream.getTracks().forEach(track => this.p2pConn.connection.addTrack(track, mediaStream));
		await this.makeOffer(this.p2pConn.id);
	}
}
</script>

<style lang="scss">
.loginButton {
  margin: auto;
}
</style>