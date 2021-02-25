<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" rounded v-bind="attrs" v-on="on"> Test Video </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Test Video</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-row>
        <v-col cols="4">
          <v-list three-line subheader>
            <v-subheader>Camera Settings</v-subheader>
            <v-list-item>
              <v-list-item-action> </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Video Source</v-list-item-title>
                <v-list-item-subtitle>
                  Notify me about updates to apps or games that I downloaded
                  <v-radio-group v-model="videoSource" row>
                    <v-radio label="This Device" value="this"></v-radio>
                    <v-radio label="External device" value="external"></v-radio>
                  </v-radio-group>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="videoSource == 'this'">
              <v-list-item-action>
                <v-checkbox v-model="camera"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Camera</v-list-item-title>
                <v-list-item-subtitle>
                  Enable the camera when testing video
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="videoSource == 'this'">
              <v-list-item-action>
                <v-checkbox v-model="microphone"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Microphone</v-list-item-title>
                <v-list-item-subtitle>
                  Enable the microphone when testing video
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>Start Video</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-btn v-if="!cameraStarted" @click="startVideo"
                  >Start Video</v-btn
                >
                <v-btn v-if="cameraStarted" @click="stopVideo"
                  >Stop Video</v-btn
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <div
            v-if="videoSource == 'this'"
            class="video-wrapper"
            id="testVideoDiv"
            ref="testVideoDiv"
          ></div>

          <v-card v-if="videoSource == 'external' && cameraStarted">
            <v-card-title class="justify-center"
              >Initate camera link</v-card-title
            >

            <div class="text-center">
              <vue-qrcode v-if="!p2pConnection.receivedResponse" :value="videoSourceInitateUrl" :width="300" />
              <RemoteVideo v-else />
            </div>

            <v-card-text class="text-center">
              Scan the QR code with your mobile device or tablet to use that
              device as your video feed
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VueQrcode from "vue-qrcode";
import { Getter, Action } from "vuex-class";
import { CREATE_NEW_P2P_CONNECTION } from "../../../store/screenShare/actionTypes";
import { P2PConnection } from "../../../store/screenShare/index";
import { videoSourceApi } from "../../../services/api/videoSourceApi";
import { OnlineUser } from "../../../../../server/src/viewModels/onlineUser";
import RemoteVideo from "@/features/lobby/components/RemoteVideo.vue";

@Component({
  components: {
    VueQrcode,
    RemoteVideo,
  },
})
export default class TestVideoModel extends Vue {
  @Action(CREATE_NEW_P2P_CONNECTION)
  public createNewP2pConnection: () => Promise<P2PConnection>;
  @Getter public loggedOnUser!: OnlineUser;
  @Getter public connections!: { [connectionId: string]: P2PConnection };

  public videoSourceInitateUrl: string = "";
  public dialog = false;
  public videoSource = "this";
  public microphone = true;
  public camera = true;
  public cameraStarted = false;
  public mediaStream: MediaStream;
  public p2pConnection: P2PConnection;

  @Watch("connections", { immediate: true })
  public onConnectionsUpdate() {
    console.log("connections updated");
  }

  public async startVideo() {
    if (this.videoSource == "this") {
      const videoDiv = this.$refs.testVideoDiv as HTMLDivElement;
      const video = document.createElement("video");
      video.style.width = "100%";
      video.style.height = "auto";
      video.muted = true;
      video.autoplay = true;
      videoDiv.appendChild(video);

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: this.microphone,
        video: this.camera,
      });
      video.srcObject = this.mediaStream;
      this.cameraStarted = true;
    } else {
      this.createQrCode();
    }
  }

  public async stopVideo() {
    for (const track of this.mediaStream.getTracks()) {
      track.stop();
    }
    const videoDiv = this.$refs.testVideoDiv as HTMLDivElement;
    videoDiv.innerHTML = "";
    this.cameraStarted = false;
  }

  public async createQrCode() {
    this.p2pConnection = await this.createNewP2pConnection();
    this.videoSourceInitateUrl = await videoSourceApi.createLink(
      this.loggedOnUser.socketId,
      this.p2pConnection.id,
      JSON.stringify(this.p2pConnection.offer)
    );
    this.cameraStarted = true;
  }
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  height: 100%;
  width: auto;
}
</style>