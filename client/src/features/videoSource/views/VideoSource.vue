<template>
  <v-container>
    Socket ID : {{ socketId }}
	<br />
    <LocalVideo />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import LocalVideo from "../../lobby/components/LocalVideo.vue";

@Component({
  components: {
    LocalVideo,
  },
})
export default class VideoSource extends Vue {
  @Prop() public socketId!: string;
}
</script>

<style lang="scss">
.loginButton {
  margin: auto;
}
</style>
