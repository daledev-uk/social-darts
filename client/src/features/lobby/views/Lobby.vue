<template>
	<v-container>
		<v-row>
			<v-col>
				<p>Users</p>
				<v-tabs v-model="tab">
					<v-tabs-slider color="yellow"></v-tabs-slider>

					<v-tab key="online">Online</v-tab>
					<v-tab key="favs">Favourites</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item key="online">
						<v-list>
							<v-list-item v-for="user in onlineUsers" :key="user.socketId">
								<v-list-item-avatar>
									<v-img :src="user.avatar"></v-img>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title v-text="user.displayName"></v-list-item-title>
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
				<table>
					<tr>
						<td>Name: </td>
						<td>{{ displayName }}</td>
					</tr>
										<tr>
						<td>SocketId: </td>
						<td>{{ socketId }}</td>
					</tr>
				</table>
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
import LocalVideo from '../components/LocalVideo.vue';
import RemoteVideo from '../components/RemoteVideo.vue';
import { OnlineUser } from '../../../../../server/src/viewModels/onlineUser';

@Component({
	components: {
		LocalVideo,
		RemoteVideo
	}
})
export default class Lobby extends Vue {
	@Getter public onlineUsers!: OnlineUser[];
	@Getter public loggedOnUser!: OnlineUser;

	public selectedUser: string = '';
	public tab = 'online';

	public get displayName() {
		return this.loggedOnUser.displayName;
	}

	public get socketId() {
		return this.loggedOnUser.socketId;
	}

	public get talkingWithHeaderText() {
		return this.selectedUser ? `Talking with: "Socket: ${this.selectedUser}"` : 'Select active user on the left menu.';
	}
}
</script>

<style lang="scss">
section { width: 100%; }
</style>
