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
			<RemoteVideo />
			<LocalVideo />
		</div>
	</div>
</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Action, Getter} from 'vuex-class';
import {peerApi} from '../../../services/peerConnectionService';
import {socketApi} from '../../../services/socketService';
import LocalVideo from '../components/LocalVideo.vue';
import RemoteVideo from '../components/RemoteVideo.vue';

@Component({
	components: {
		LocalVideo,
		RemoteVideo
	}
})
export default class Lobby extends Vue {
	@Getter public users!: string[];
	public selectedUser: string = '';

	public selectUser(userId: string) {        
		this.selectedUser = userId;        
        this.callUser(userId);
	}

	public get talkingWithHeaderText() {
		return this.selectedUser ? `Talking with: "Socket: ${this.selectedUser}"` : 'Select active user on the left menu.';
	}

	private async callUser(socketId: string) {
		const offer = await peerApi.setupLocalPeerOffer();
		socketApi.offerUserVideoShare(socketId, offer);
	}
}
</script>

<style lang="scss">
section { width: 100%; }
</style>
