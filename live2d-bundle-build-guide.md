# Live2D Bundle v1.0.js 生成指南

## 概述

`live2d-bundle-v1.0.js` 是由 **Cubism SDK for Web** 中的 Demo 示例通過 Webpack 打包生成的 JavaScript 文件。

## 源文件位置

```
/lib/CubismSdkForWeb-4-r.4/Samples/TypeScript/Demo/
├── src/
│   ├── main.ts           # 入口文件（導出 initLive2d 函數）
│   ├── lappdelegate.ts
│   ├── lappmodel.ts
│   ├── lapplive2dmanager.ts
│   ├── lapppal.ts
│   ├── lappview.ts
│   └── ...
├── webpack.config.js     # Webpack 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 依賴配置
```

## 生成流程

### 1. **TypeScript 源代碼**

主要入口文件 `src/main.ts` 導出了 `initLive2d` 函數：

```typescript
export default function initLive2d(options) {
  initConfig(options);
  
  const onload = (): void => {
    if (LAppDelegate.getInstance().initialize(options) == false) {
      return;
    }
    LAppDelegate.getInstance().run();
  };

  const onbeforeunload = (): void => LAppDelegate.releaseInstance();

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
```

### 2. **Webpack 打包配置**

`webpack.config.js` 中的配置：

```javascript
{
  mode: 'production',
  target: ['web', 'es5'],
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: {
      name: 'Live2d',
      type: 'var',
      export: 'default',
      umdNamedDefine: true
    }
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@framework': path.resolve(__dirname, '../../../Framework/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
}
```

### 3. **構建流程**

**步驟：**

```bash
# 1. 進入 Demo 目錄
cd /lib/CubismSdkForWeb-4-r.4/Samples/TypeScript/Demo/

# 2. 安裝依賴
npm install

# 3. 執行 Webpack 打包
npm run build:prod
# 或
webpack --mode production
```

### 4. **輸出文件**

執行後，Webpack 會生成：

- `dist/bundle.js` - 打包後的文件
- 暴露全局變數：`window.Live2d` = `initLive2d` 函數

## 使用方式

打包後的 JS 文件可以在 HTML 中引入：

```html
<script src="/path/to/live2dcubismcore.min.js"></script>
<script src="/path/to/live2d-bundle-v1.0.js"></script>

<script>
  const { onload, onbeforeunload, onresize, setScale } = window.Live2d({
    el: '#board-girl',
    size: 'screen',
    quality: 2,
    resourcesPath: '/path/to/resources/',
    modelDir: ['model-name'],
    bindFullscreen: true
  })

  onload()
  window.addEventListener('beforeunload', onbeforeunload)
  window.addEventListener('resize', onresize)
</script>
```

## 文件名變更

如果需要改變輸出文件名：

### 方法 1：修改 webpack.config.js

```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'live2d-bundle-v1.0.js',  // 改成你想要的名稱
  // ...
}
```

### 方法 2：打包時指定

```bash
webpack --mode production --output-filename live2d-bundle-v1.0.js
```

## 相關文件位置

已找到的 bundle 文件位置：

1. `/repo/dev-modules/src/topics/spine-test/cdn/live2d-bundle-v1.0.js`
2. `/repo/book/docs/.vuepress/public/live2d-bundle-v1.0.js`

## 核心依賴

- **Webpack 5.64.4+** - 模塊打包工具
- **TypeScript 4.5.2+** - 類型檢查與轉譯
- **ts-loader** - TypeScript 加載器
- **whatwg-fetch** - Fetch API polyfill
- **Live2D Cubism Framework** - Live2D 框架代碼

## 總結

`live2d-bundle-v1.0.js` 的生成流程：

```
TypeScript 源代碼 → TypeScript 編譯 → Webpack 打包 → UMD 模式 → 生成 bundle.js
   (src/)              (ts-loader)      (Webpack)      (var Live2d)
```

最後將 `dist/bundle.js` 重命名為 `live2d-bundle-v1.0.js` 即可在項目中使用。
