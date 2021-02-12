<template>
	<b-container>
		<b-row align-v="center" align-h="between" class="header">
			<b-col cols="4">
				<div class="logo-container">
					<img src="./asserts/dartboard.png" alt="social darts logo" class="logo-img" />
					<h1 class="logo-text">
						Social
						<span class="logo-highlight">Darts</span>
					</h1>
				</div>
			</b-col>
			<b-col cols="4">
				<b-button pill variant="primary" to="logout">Logout</b-button>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<router-view />
			</b-col>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SocketIOClient from "socket.io-client";
import { socketApi } from "./services/socketService";
import { peerApi } from "./services/peerConnectionService";

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
	margin: 10px;
	margin-bottom: 30px;
}

.logo-container {
	display: flex;
	align-items: center;

	img {
		width: 60px;	
		height: 60px;	
		margin-right: 15px;
	}

	.logo-text {	
		font-size: 26px;	
		font-weight: 700;	
		color: rgb(0, 143, 47);	

		.logo-highlight {	
			color: rgb(202, 0, 0);	
		}
	}	
}	
</style>