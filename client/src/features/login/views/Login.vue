<template>
  <v-card bg-variant="dark" text-variant="white" title="Social Darts">
    <v-card-text>
      Play darts with your friends remote with the need any any special equipment.
    </v-card-text>

	<v-card-actions>
		<v-btn href="http://localhost:5000/login" variant="secondary">
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

@Component
export default class Login extends Vue {}
</script>

<style lang="scss">
.loginButton {
	margin: auto;
}
</style>
