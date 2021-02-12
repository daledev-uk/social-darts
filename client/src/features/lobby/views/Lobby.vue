<template>
	<b-container>
		<b-row>
			<b-col>
				<p>Users</p>
				<b-tabs content-class="mt-3">
					<b-tab title="Online" active>
						<b-list-group>
							<b-list-group-item v-for="user in users" :key="user">
								{{ user }}
							</b-list-group-item>
						</b-list-group>
					</b-tab>
					<b-tab title="Favourites">
						<p>No favourites</p>
					</b-tab>
				</b-tabs>
			</b-col>
			<b-col>
				<p>Your stats</p>
			</b-col>
			<b-col>
				<p>Games in progress</p>
			</b-col>
		</b-row>
	</b-container>
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
