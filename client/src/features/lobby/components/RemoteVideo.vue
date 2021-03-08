<template>
	<video ref="remoteVidElement" autoplay class="remote-video"></video>
</template>

<script lang="ts">
import { P2PConnection } from "@/store/screenShare";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class RemoteVideo extends Vue {
	public error = false;
	public initiated = false;

	@Prop() public p2pConn!: P2PConnection;

	public mounted() {
		this.onConnectionUpdated(this.p2pConn);
	}

	@Watch('p2pConn')
	public onConnectionUpdated(p2p: P2PConnection) {
		if (!this.initiated && p2p.streams.length > 0) {			
			const remoteVideo = this.$refs.remoteVidElement as HTMLVideoElement;			
			if (remoteVideo) {
				for (const stream of p2p.streams) {
					console.log('onConnectionUpdated, adding', stream);
					remoteVideo.srcObject = stream;
				}				
			}
		}
	}
}
</script>

<style lang="scss">
	section { width: 100%; }

	video {
		border: 1px solid white;
	}
</style>
