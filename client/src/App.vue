<template>
	<v-app>
		<v-app-bar app>
			<v-container class="header">
				<v-row valign="middle">
					<v-col>
						<h1 class="logo-text">
							Social Darts
						</h1>
					</v-col>
					<v-col align="right">
						<v-btn to="logout" rounded>Logout</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-app-bar>
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SocketIOClient from "socket.io-client";
import { socketApi } from './services/socketService';
import { peerApi } from './services/peerConnectionService';

@Component
export default class App extends Vue {
  public created() {
	peerApi.createPeerConnection(window);
	socketApi.init((this as any).$socket as SocketIOClient.Socket);
  }
}
</script>

<style lang="scss" scope>
.header {
	background-image: linear-gradient(black, grey), url(./assets/crowd.jpg);
  	background-size: 100% 350px;
  	background-blend-mode: saturation;
}

.logo-text {
	color: #ffffff;
	font-size: 26px;	
	font-weight: 700;	
}	
</style>