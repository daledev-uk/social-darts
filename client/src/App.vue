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
						<TestVideoModel />
						<v-btn to="logout" rounded color="primary">Logout</v-btn>
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
import TestVideoModel from './features/testVideo/components/TestVideoModel.vue';

@Component({
	components: {
		TestVideoModel
	}
})
export default class App extends Vue {
  public created() {
	peerApi.setup(window);
	socketApi.init((this as any).$socket as SocketIOClient.Socket);
  }
}
</script>

<style lang="scss" scope>
.header {
	background-image: linear-gradient(black, #252525), url(./assets/crowd.jpg);
  	background-size: 100% 350px;
	background-position-y: -150px;
  	background-blend-mode: saturation;
}

.logo-text {
	color: #ffffff;
	font-size: 26px;	
	font-weight: 700;	
}	
</style>