import * as React from "react";
import Playable, { IPlayerInstance } from "playable";
import DASHAdapter from "playable/dist/src/adapters/dash";
import { CrossOriginValue } from "playable/dist/src/modules/playback-engine/types";
import "./styles.css";

export class VideoPlayback extends React.Component<any, any> {
  private player: IPlayerInstance = Playable.create();

  constructor(props: any) {
    super(props);
    this.player = Playable.create();
  }

  componentDidMount(): void {
    // shaka.polyfill.installAll();
    Playable.registerPlaybackAdapter(DASHAdapter);
    this.player = Playable.create({
      width: 800,
      height: 450,
      // src: "https://kumar-s3-screen-recordings.s3-us-west-2.amazonaws.com/test_session/replay.mpd",
      // tslint:disable-next-line:no-http-string
      src:
        "https://app.local.tehama.io:8080/video/kumar-s3-screen-recordings/test_session/replay.mpd",
      hideOverlay: true,
      crossOrigin: CrossOriginValue.CREDENTIALS
    });

    // this.player.setCrossOrigin!(CrossOriginValue.CREDENTIALS);
    this.player.attachToElement!(document.getElementById("content"));

    (window as any).player = this.player;
    document.cookie = "promo_shown=1; Max-Age=2600000; Secure";
  }

  render(): JSX.Element {
    return <div id="content" crossorigin="use-credentials" />;
  }
}
