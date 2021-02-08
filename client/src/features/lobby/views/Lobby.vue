<template>
<section>
	<div class="active-users-panel" id="active-user-container">
		<h3 class="panel-title">Active Users:</h3>

		<div v-for="userId in users" :key="userId" :id="userId" class="active-user" @click="selectUser(userId)">
			<p class="username">Socket: {{ userId }}</p>
		</div>

	</div>
	<div class="video-chat-container">
		<h2 class="talk-info" id="talking-with-info">
			{{ talkingWithHeaderText }}
		</h2>
		<div class="video-container">
			<video autoplay class="remote-video" id="remote-video"></video>
			<video autoplay muted class="local-video" id="local-video" style="position: fixed"></video>
		</div>
	</div>
</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Action, Getter} from 'vuex-class';
import SocketIOClient from "socket.io-client";

const { RTCPeerConnection, RTCSessionDescription } = window;
const peerConnection = new RTCPeerConnection();

@Component
export default class Lobby extends Vue {
	@Getter public users!: string[];
	public selectedUser: string = '';

	public async mounted() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

			const localVideo = document.getElementById("local-video") as HTMLVideoElement;
			if (localVideo) {
				localVideo.srcObject = stream;
			}

			stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
		} catch (err) {
			console.warn(err.message);
		}
	}

	public selectUser(userId: string) {        
		this.selectedUser = userId;        
        this.callUser(userId);
	}

	public get talkingWithHeaderText() {
		return this.selectedUser ? `Talking with: "Socket: ${this.selectedUser}"` : 'Select active user on the left menu.';
	}

	private async callUser(socketId) {
		const offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

		console.log('this.$socket', this.socket);
		this.socket.emit("inititateVideoShare", {
			offer,
			to: socketId
		});
	}

	private get socket(): SocketIOClient.Socket {
		return (this as any).$socket;
	}
}
</script>

<style lang="scss">
section { width: 100%; }
</style>
