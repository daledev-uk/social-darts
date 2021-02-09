<template>
	<video ref="remoteVidElement" autoplay class="remote-video"></video>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {Getter} from 'vuex-class';

@Component
export default class RemoteVideo extends Vue {
	public error = false;
	public initiated = false;

	@Getter public remoteMediaStream!: MediaStream;

	@Watch('remoteMediaStream')
	public onMediaStreamChange(stream: MediaStream) {
		if (!this.initiated && stream) {
			console.log('Setup remote video');

			const remoteVideo = this.$refs.remoteVidElement as HTMLVideoElement;
			if (remoteVideo) {
				remoteVideo.srcObject = stream;
			}			
		}
	}
}
</script>

<style lang="scss">
section { width: 100%; }
</style>
