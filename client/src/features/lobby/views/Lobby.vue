<template>
	<v-container>
		<v-row>
			<v-col>
				<p>Users</p>
				<v-tabs>
					<v-tabs-slider color="yellow"></v-tabs-slider>

					<v-tab key="online">Online</v-tab>
					<v-tab key="favs">Favourites</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item key="online">
						<v-list>
							<v-list-item v-for="user in users" :key="user">
								<v-list-item-avatar>
									<v-img src="https://gravatar.com/avatar/c313637634df52bd6c729d6dce692b44?s=32&d=robohash&r=x"></v-img>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title v-text="user"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-tab-item>

					<v-tab-item key="favs">
						<p>No favourites</p>
					</v-tab-item>
				</v-tabs-items>
			</v-col>
			<v-col>
				<p>Your stats</p>
			</v-col>
			<v-col>
				<p>Games in progress</p>
			</v-col>
		</v-row>
	</v-container>
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
