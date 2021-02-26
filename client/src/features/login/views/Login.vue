<template>
  <v-card bg-variant="dark" text-variant="white" title="Social Darts">
    <v-card-text>
      Play darts with your friends remote with the need any any special equipment.
    </v-card-text>

	<v-card-actions>
		<v-btn :href="loginUrl" variant="secondary">
			<v-icon left>
			mdi-google
			</v-icon>
			Sign-in Using Google
		</v-btn>
	</v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

const API_SERVER_URL = process.env.VUE_APP_API_HOST ? process.env.VUE_APP_API_HOST : 'http://localhost:5000';

@Component
export default class Login extends Vue {

	public get loginUrl() {
		return `${API_SERVER_URL}/login`;
	}
}
</script>

<style lang="scss">
.loginButton {
	margin: auto;
}
</style>
