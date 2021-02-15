<template>
    <video ref="localVidElement" autoplay muted class="local-video" style="position: fixed"></video>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {peerApi} from '../../../services/peerConnectionService';

@Component
export default class LocalVideo extends Vue {
	public error = false;

	public async mounted() {
		try {
			const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

			const localVideo = this.$refs.localVidElement as HTMLVideoElement;
			if (localVideo) {
				localVideo.srcObject = mediaStream;
			}

   peerApi.addMediaStream(mediaStream);
		} catch (err) {
			this.error = true;
			         console.warn(err.message);
		}
	}
}
</script>

<style lang="scss">
section { width: 100%; }
</style>
