/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import { initConfig } from './lappdefine';

// const { onload, onbeforeunload, onresize, setScale } = initLive2d({
//   el: '#hiyori',
//   size: 'screen',
//   quality: 2,
//   resourcesPath: '../../Resources/',
//   modelDir: ['z46_4'],
//   bindFullscreen: true
// });

// window.onload = onload;
// window.onbeforeunload = onbeforeunload;
// window.onresize = onresize;

// setTimeout(() => {
//   // setScale(3)
// }, 6000)

export default function initLive2d(options) {
  initConfig(options);
  /**
   * ブラウザロード後の処理
   */
  const onload = (): void => {
    // create the application instance
    if (LAppDelegate.getInstance().initialize(options) == false) {
      return;
    }

    LAppDelegate.getInstance().run();
  };

  /**
   * 終了時の処理
   */
  const onbeforeunload = (): void => LAppDelegate.releaseInstance();

  /**
   * Process when changing screen size.
   */
  const onresize = () => {
    if (options.size === 'auto') {
      LAppDelegate.getInstance().onResize();
    }
  };

  const setScale = (scaleSize: number) => {
    LAppDelegate.getInstance().scaleView(scaleSize);
  }

  return {
    onload,
    onbeforeunload,
    onresize,
    setScale
  }
}
