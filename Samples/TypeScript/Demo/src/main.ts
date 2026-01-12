/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import { initConfig } from './lappdefine';

const { onload, onbeforeunload, onresize, setScale } = initLive2d({
  el: '#hiyori',
  size: 'screen',
  quality: 2,
  resourcesPath: '../../Resources/',
  modelDir: ['l2d3008.u'], // 當使用 modelFileName 時不會被使用
  modelFileName: 'l2d3008.u.model3.json', // 指定此參數時優先使用
  // modelJsonExtension: '.model3.json', // 當 modelFileName 未指定時才使用
  bindFullscreen: true
});

window.onload = onload;
window.onbeforeunload = onbeforeunload;
window.onresize = onresize;

setTimeout(() => {
  // setScale(3)
}, 6000)

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

  /**
   * 取得所有可用的 motion 群組和內部 motion 數量
   * @returns { groupName: string, count: number }[]
   */
  const getAvailableMotions = () => {
    const model = LAppDelegate.getInstance().getLive2DManager().getModel(0);
    if (!model) {
      console.warn('Model not found');
      return [];
    }
    
    const modelSetting = model.getModelSetting();
    if (!modelSetting) {
      console.warn('Model setting not loaded yet');
      return [];
    }
    
    const motions: { groupName: string, count: number }[] = [];
    const motionGroupCount = modelSetting.getMotionGroupCount();
    
    for (let i = 0; i < motionGroupCount; i++) {
      const groupName = modelSetting.getMotionGroupName(i);
      const count = modelSetting.getMotionCount(groupName);
      motions.push({ groupName, count });
    }
    
    return motions;
  };

  /**
   * 切換指定的 motion
   * @param groupName 動作群組名稱
   * @param motionIndex 群組內的 motion 索引 (0-based)，不指定則隨機選擇
   */
  const changeMotion = (groupName: string, motionIndex?: number) => {
    const model = LAppDelegate.getInstance().getLive2DManager().getModel(0);
    if (!model) {
      console.error('Model not found');
      return false;
    }

    const motionCount = model.getModelSetting().getMotionCount(groupName);
    if (motionCount === 0) {
      console.error(`Motion group "${groupName}" not found or has no motions`);
      return false;
    }

    let index = motionIndex;
    if (index === undefined) {
      index = Math.floor(Math.random() * motionCount);
    } else if (index < 0 || index >= motionCount) {
      console.error(`Motion index ${index} out of range [0, ${motionCount - 1}]`);
      return false;
    }

    model.startMotion(groupName, index, 2); // 優先度設為 2 (PriorityNormal)
    console.log(`Playing motion: ${groupName}_${index}`);
    return true;
  };

  /**
   * 取得所有可用的表情列表
   * @returns { name: string, index: number }[]
   */
  const getAvailableExpressions = () => {
    const model = LAppDelegate.getInstance().getLive2DManager().getModel(0);
    if (!model) {
      console.warn('Model not found');
      return [];
    }
    
    const modelSetting = model.getModelSetting();
    if (!modelSetting) {
      console.warn('Model setting not loaded yet');
      return [];
    }
    
    const expressions: { name: string, index: number }[] = [];
    const expressionCount = modelSetting.getExpressionCount();
    
    for (let i = 0; i < expressionCount; i++) {
      const name = modelSetting.getExpressionName(i);
      expressions.push({ name, index: i });
    }
    
    return expressions;
  };

  /**
   * 切換指定的表情
   * @param expressionIndex 表情索引 (0-based)，或表情名稱
   */
  const changeExpression = (expressionIndex: number | string) => {
    const model = LAppDelegate.getInstance().getLive2DManager().getModel(0);
    if (!model) {
      console.error('Model not found');
      return false;
    }

    const modelSetting = model.getModelSetting();
    const expressionCount = modelSetting.getExpressionCount();
    
    if (expressionCount === 0) {
      console.error('No expressions available');
      return false;
    }

    let index: number;
    
    // 如果輸入是字符串，找到對應的索引
    if (typeof expressionIndex === 'string') {
      index = -1;
      for (let i = 0; i < expressionCount; i++) {
        if (modelSetting.getExpressionName(i) === expressionIndex) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        console.error(`Expression "${expressionIndex}" not found`);
        return false;
      }
    } else {
      index = expressionIndex;
      if (index < 0 || index >= expressionCount) {
        console.error(`Expression index ${index} out of range [0, ${expressionCount - 1}]`);
        return false;
      }
    }

    const expressionName = modelSetting.getExpressionName(index);
    model.setExpression(expressionName);
    console.log(`Expression changed to: ${expressionName}`);
    return true;
  };

  return {
    onload,
    onbeforeunload,
    onresize,
    setScale,
    changeMotion,
    getAvailableMotions,
    changeExpression,
    getAvailableExpressions
  }
}
