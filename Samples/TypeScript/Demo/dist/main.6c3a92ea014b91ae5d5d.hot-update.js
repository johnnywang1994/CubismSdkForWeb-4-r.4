"use strict";
self["webpackHotUpdateLive2d"]("main",{

/***/ "./src/lappmodel.ts":
/*!**************************!*\
  !*** ./src/lappmodel.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppModel = void 0;
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
var cubismdefaultparameterid_1 = __webpack_require__(/*! @framework/cubismdefaultparameterid */ "../../../Framework/src/cubismdefaultparameterid.ts");
var cubismmodelsettingjson_1 = __webpack_require__(/*! @framework/cubismmodelsettingjson */ "../../../Framework/src/cubismmodelsettingjson.ts");
var cubismbreath_1 = __webpack_require__(/*! @framework/effect/cubismbreath */ "../../../Framework/src/effect/cubismbreath.ts");
var cubismeyeblink_1 = __webpack_require__(/*! @framework/effect/cubismeyeblink */ "../../../Framework/src/effect/cubismeyeblink.ts");
var live2dcubismframework_1 = __webpack_require__(/*! @framework/live2dcubismframework */ "../../../Framework/src/live2dcubismframework.ts");
var cubismusermodel_1 = __webpack_require__(/*! @framework/model/cubismusermodel */ "../../../Framework/src/model/cubismusermodel.ts");
var acubismmotion_1 = __webpack_require__(/*! @framework/motion/acubismmotion */ "../../../Framework/src/motion/acubismmotion.ts");
var cubismmotionqueuemanager_1 = __webpack_require__(/*! @framework/motion/cubismmotionqueuemanager */ "../../../Framework/src/motion/cubismmotionqueuemanager.ts");
var csmmap_1 = __webpack_require__(/*! @framework/type/csmmap */ "../../../Framework/src/type/csmmap.ts");
var csmvector_1 = __webpack_require__(/*! @framework/type/csmvector */ "../../../Framework/src/type/csmvector.ts");
var cubismdebug_1 = __webpack_require__(/*! @framework/utils/cubismdebug */ "../../../Framework/src/utils/cubismdebug.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lappwavfilehandler_1 = __webpack_require__(/*! ./lappwavfilehandler */ "./src/lappwavfilehandler.ts");
var LoadStep;
(function (LoadStep) {
    LoadStep[LoadStep["LoadAssets"] = 0] = "LoadAssets";
    LoadStep[LoadStep["LoadModel"] = 1] = "LoadModel";
    LoadStep[LoadStep["WaitLoadModel"] = 2] = "WaitLoadModel";
    LoadStep[LoadStep["LoadExpression"] = 3] = "LoadExpression";
    LoadStep[LoadStep["WaitLoadExpression"] = 4] = "WaitLoadExpression";
    LoadStep[LoadStep["LoadPhysics"] = 5] = "LoadPhysics";
    LoadStep[LoadStep["WaitLoadPhysics"] = 6] = "WaitLoadPhysics";
    LoadStep[LoadStep["LoadPose"] = 7] = "LoadPose";
    LoadStep[LoadStep["WaitLoadPose"] = 8] = "WaitLoadPose";
    LoadStep[LoadStep["SetupEyeBlink"] = 9] = "SetupEyeBlink";
    LoadStep[LoadStep["SetupBreath"] = 10] = "SetupBreath";
    LoadStep[LoadStep["LoadUserData"] = 11] = "LoadUserData";
    LoadStep[LoadStep["WaitLoadUserData"] = 12] = "WaitLoadUserData";
    LoadStep[LoadStep["SetupEyeBlinkIds"] = 13] = "SetupEyeBlinkIds";
    LoadStep[LoadStep["SetupLipSyncIds"] = 14] = "SetupLipSyncIds";
    LoadStep[LoadStep["SetupLayout"] = 15] = "SetupLayout";
    LoadStep[LoadStep["LoadMotion"] = 16] = "LoadMotion";
    LoadStep[LoadStep["WaitLoadMotion"] = 17] = "WaitLoadMotion";
    LoadStep[LoadStep["CompleteInitialize"] = 18] = "CompleteInitialize";
    LoadStep[LoadStep["CompleteSetupModel"] = 19] = "CompleteSetupModel";
    LoadStep[LoadStep["LoadTexture"] = 20] = "LoadTexture";
    LoadStep[LoadStep["WaitLoadTexture"] = 21] = "WaitLoadTexture";
    LoadStep[LoadStep["CompleteSetup"] = 22] = "CompleteSetup";
})(LoadStep || (LoadStep = {}));
var LAppModel = (function (_super) {
    __extends(LAppModel, _super);
    function LAppModel() {
        var _this = _super.call(this) || this;
        _this._modelSetting = null;
        _this._modelHomeDir = null;
        _this._userTimeSeconds = 0.0;
        _this._eyeBlinkIds = new csmvector_1.csmVector();
        _this._lipSyncIds = new csmvector_1.csmVector();
        _this._motions = new csmmap_1.csmMap();
        _this._expressions = new csmmap_1.csmMap();
        _this._hitArea = new csmvector_1.csmVector();
        _this._userArea = new csmvector_1.csmVector();
        _this._idParamAngleX = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleX);
        _this._idParamAngleY = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleY);
        _this._idParamAngleZ = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleZ);
        _this._idParamEyeBallX = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamEyeBallX);
        _this._idParamEyeBallY = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamEyeBallY);
        _this._idParamBodyAngleX = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamBodyAngleX);
        _this._state = LoadStep.LoadAssets;
        _this._expressionCount = 0;
        _this._textureCount = 0;
        _this._motionCount = 0;
        _this._allMotionCount = 0;
        _this._wavFileHandler = new lappwavfilehandler_1.LAppWavFileHandler();
        return _this;
    }
    LAppModel.prototype.loadAssets = function (dir, fileName) {
        var _this = this;
        this._modelHomeDir = dir;
        fetch("".concat(this._modelHomeDir).concat(fileName))
            .then(function (response) { return response.arrayBuffer(); })
            .then(function (arrayBuffer) {
            var setting = new cubismmodelsettingjson_1.CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
            _this._state = LoadStep.LoadModel;
            _this.setupModel(setting);
        });
    };
    LAppModel.prototype.setupModel = function (setting) {
        var _this = this;
        this._updating = true;
        this._initialized = false;
        this._modelSetting = setting;
        if (this._modelSetting.getModelFileName() != '') {
            var modelFileName = this._modelSetting.getModelFileName();
            fetch("".concat(this._modelHomeDir).concat(modelFileName))
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                _this.loadModel(arrayBuffer);
                _this._state = LoadStep.LoadExpression;
                loadCubismExpression();
            });
            this._state = LoadStep.WaitLoadModel;
        }
        else {
            lapppal_1.LAppPal.printMessage('Model data does not exist.');
        }
        var loadCubismExpression = function () {
            if (_this._modelSetting.getExpressionCount() > 0) {
                var count_1 = _this._modelSetting.getExpressionCount();
                var _loop_1 = function (i) {
                    var expressionName = _this._modelSetting.getExpressionName(i);
                    var expressionFileName = _this._modelSetting.getExpressionFileName(i);
                    fetch("".concat(_this._modelHomeDir).concat(expressionFileName))
                        .then(function (response) { return response.arrayBuffer(); })
                        .then(function (arrayBuffer) {
                        var motion = _this.loadExpression(arrayBuffer, arrayBuffer.byteLength, expressionName);
                        if (_this._expressions.getValue(expressionName) != null) {
                            acubismmotion_1.ACubismMotion.delete(_this._expressions.getValue(expressionName));
                            _this._expressions.setValue(expressionName, null);
                        }
                        _this._expressions.setValue(expressionName, motion);
                        _this._expressionCount++;
                        if (_this._expressionCount >= count_1) {
                            _this._state = LoadStep.LoadPhysics;
                            loadCubismPhysics();
                        }
                    });
                };
                for (var i = 0; i < count_1; i++) {
                    _loop_1(i);
                }
                _this._state = LoadStep.WaitLoadExpression;
            }
            else {
                _this._state = LoadStep.LoadPhysics;
                loadCubismPhysics();
            }
        };
        var loadCubismPhysics = function () {
            if (_this._modelSetting.getPhysicsFileName() != '') {
                var physicsFileName = _this._modelSetting.getPhysicsFileName();
                fetch("".concat(_this._modelHomeDir).concat(physicsFileName))
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.LoadPose;
                    loadCubismPose();
                });
                _this._state = LoadStep.WaitLoadPhysics;
            }
            else {
                _this._state = LoadStep.LoadPose;
                loadCubismPose();
            }
        };
        var loadCubismPose = function () {
            if (_this._modelSetting.getPoseFileName() != '') {
                var poseFileName = _this._modelSetting.getPoseFileName();
                fetch("".concat(_this._modelHomeDir).concat(poseFileName))
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadPose(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.SetupEyeBlink;
                    setupEyeBlink();
                });
                _this._state = LoadStep.WaitLoadPose;
            }
            else {
                _this._state = LoadStep.SetupEyeBlink;
                setupEyeBlink();
            }
        };
        var setupEyeBlink = function () {
            if (_this._modelSetting.getEyeBlinkParameterCount() > 0) {
                _this._eyeBlink = cubismeyeblink_1.CubismEyeBlink.create(_this._modelSetting);
                _this._state = LoadStep.SetupBreath;
            }
            setupBreath();
        };
        var setupBreath = function () {
            _this._breath = cubismbreath_1.CubismBreath.create();
            var breathParameters = new csmvector_1.csmVector();
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamBreath), 0.5, 0.5, 3.2345, 1));
            _this._breath.setParameters(breathParameters);
            _this._state = LoadStep.LoadUserData;
            loadUserData();
        };
        var loadUserData = function () {
            if (_this._modelSetting.getUserDataFile() != '') {
                var userDataFile = _this._modelSetting.getUserDataFile();
                fetch("".concat(_this._modelHomeDir).concat(userDataFile))
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadUserData(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.SetupEyeBlinkIds;
                    setupEyeBlinkIds();
                });
                _this._state = LoadStep.WaitLoadUserData;
            }
            else {
                _this._state = LoadStep.SetupEyeBlinkIds;
                setupEyeBlinkIds();
            }
        };
        var setupEyeBlinkIds = function () {
            var eyeBlinkIdCount = _this._modelSetting.getEyeBlinkParameterCount();
            for (var i = 0; i < eyeBlinkIdCount; ++i) {
                _this._eyeBlinkIds.pushBack(_this._modelSetting.getEyeBlinkParameterId(i));
            }
            _this._state = LoadStep.SetupLipSyncIds;
            setupLipSyncIds();
        };
        var setupLipSyncIds = function () {
            var lipSyncIdCount = _this._modelSetting.getLipSyncParameterCount();
            for (var i = 0; i < lipSyncIdCount; ++i) {
                _this._lipSyncIds.pushBack(_this._modelSetting.getLipSyncParameterId(i));
            }
            _this._state = LoadStep.SetupLayout;
            setupLayout();
        };
        var setupLayout = function () {
            var layout = new csmmap_1.csmMap();
            _this._modelSetting.getLayoutMap(layout);
            _this._modelMatrix.setupFromLayout(layout);
            _this._state = LoadStep.LoadMotion;
            loadCubismMotion();
        };
        var loadCubismMotion = function () {
            _this._state = LoadStep.WaitLoadMotion;
            _this._model.saveParameters();
            _this._allMotionCount = 0;
            _this._motionCount = 0;
            var group = [];
            var motionGroupCount = _this._modelSetting.getMotionGroupCount();
            for (var i = 0; i < motionGroupCount; i++) {
                group[i] = _this._modelSetting.getMotionGroupName(i);
                _this._allMotionCount += _this._modelSetting.getMotionCount(group[i]);
            }
            for (var i = 0; i < motionGroupCount; i++) {
                _this.preLoadMotionGroup(group[i]);
            }
            if (motionGroupCount == 0) {
                _this._state = LoadStep.LoadTexture;
                _this._motionManager.stopAllMotions();
                _this._updating = false;
                _this._initialized = true;
                _this.createRenderer();
                _this.setupTextures();
                _this.getRenderer().startUp(lappdelegate_1.gl);
            }
        };
    };
    LAppModel.prototype.setupTextures = function () {
        var _this = this;
        var usePremultiply = true;
        if (this._state == LoadStep.LoadTexture) {
            var textureCount_1 = this._modelSetting.getTextureCount();
            var _loop_2 = function (modelTextureNumber) {
                if (this_1._modelSetting.getTextureFileName(modelTextureNumber) == '') {
                    console.log('getTextureFileName null');
                    return "continue";
                }
                var texturePath = this_1._modelSetting.getTextureFileName(modelTextureNumber);
                texturePath = this_1._modelHomeDir + texturePath;
                var onLoad = function (textureInfo) {
                    _this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
                    _this._textureCount++;
                    if (_this._textureCount >= textureCount_1) {
                        _this._state = LoadStep.CompleteSetup;
                    }
                };
                lappdelegate_1.LAppDelegate.getInstance()
                    .getTextureManager()
                    .createTextureFromPngFile(texturePath, usePremultiply, onLoad);
                this_1.getRenderer().setIsPremultipliedAlpha(usePremultiply);
            };
            var this_1 = this;
            for (var modelTextureNumber = 0; modelTextureNumber < textureCount_1; modelTextureNumber++) {
                _loop_2(modelTextureNumber);
            }
            this._state = LoadStep.WaitLoadTexture;
        }
    };
    LAppModel.prototype.reloadRenderer = function () {
        this.deleteRenderer();
        this.createRenderer();
        this.setupTextures();
    };
    LAppModel.prototype.update = function () {
        if (this._state != LoadStep.CompleteSetup)
            return;
        var deltaTimeSeconds = lapppal_1.LAppPal.getDeltaTime();
        this._userTimeSeconds += deltaTimeSeconds;
        this._dragManager.update(deltaTimeSeconds);
        this._dragX = this._dragManager.getX();
        this._dragY = this._dragManager.getY();
        var motionUpdated = false;
        this._model.loadParameters();
        if (this._motionManager.isFinished()) {
            this.startRandomMotion(LAppDefine.MotionGroupIdle, LAppDefine.PriorityIdle);
        }
        else {
            motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.saveParameters();
        if (!motionUpdated) {
            if (this._eyeBlink != null) {
                this._eyeBlink.updateParameters(this._model, deltaTimeSeconds);
            }
        }
        if (this._expressionManager != null) {
            this._expressionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30);
        this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
        this._model.addParameterValueById(this._idParamAngleZ, this._dragX * this._dragY * -30);
        this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10);
        this._model.addParameterValueById(this._idParamEyeBallX, this._dragX);
        this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);
        if (this._breath != null) {
            this._breath.updateParameters(this._model, deltaTimeSeconds);
        }
        if (this._physics != null) {
            this._physics.evaluate(this._model, deltaTimeSeconds);
        }
        if (this._lipsync) {
            var value = 0.0;
            this._wavFileHandler.update(deltaTimeSeconds);
            value = this._wavFileHandler.getRms();
            for (var i = 0; i < this._lipSyncIds.getSize(); ++i) {
                this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8);
            }
        }
        if (this._pose != null) {
            this._pose.updateParameters(this._model, deltaTimeSeconds);
        }
        this._model.update();
    };
    LAppModel.prototype.startMotion = function (group, no, priority, onFinishedMotionHandler) {
        var _this = this;
        if (priority == LAppDefine.PriorityForce) {
            this._motionManager.setReservePriority(priority);
        }
        else if (!this._motionManager.reserveMotion(priority)) {
            if (this._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]can't start motion.");
            }
            return cubismmotionqueuemanager_1.InvalidMotionQueueEntryHandleValue;
        }
        var motionFileName = this._modelSetting.getMotionFileName(group, no);
        var name = "".concat(group, "_").concat(no);
        var motion = this._motions.getValue(name);
        var autoDelete = false;
        if (motion == null) {
            fetch("".concat(this._modelHomeDir).concat(motionFileName))
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                motion = _this.loadMotion(arrayBuffer, arrayBuffer.byteLength, null, onFinishedMotionHandler);
                var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeInTime(fadeTime);
                }
                fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeOutTime(fadeTime);
                }
                motion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                autoDelete = true;
            });
        }
        else {
            motion.setFinishedMotionHandler(onFinishedMotionHandler);
        }
        var voice = this._modelSetting.getMotionSoundFileName(group, no);
        if (voice.localeCompare('') != 0) {
            var path = voice;
            path = this._modelHomeDir + path;
            this._wavFileHandler.start(path);
        }
        if (this._debugMode) {
            lapppal_1.LAppPal.printMessage("[APP]start motion: [".concat(group, "_").concat(no));
        }
        return this._motionManager.startMotionPriority(motion, autoDelete, priority);
    };
    LAppModel.prototype.startRandomMotion = function (group, priority, onFinishedMotionHandler) {
        if (this._modelSetting.getMotionCount(group) == 0) {
            return cubismmotionqueuemanager_1.InvalidMotionQueueEntryHandleValue;
        }
        var no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
        return this.startMotion(group, no, priority, onFinishedMotionHandler);
    };
    LAppModel.prototype.setExpression = function (expressionId) {
        var motion = this._expressions.getValue(expressionId);
        if (this._debugMode) {
            lapppal_1.LAppPal.printMessage("[APP]expression: [".concat(expressionId, "]"));
        }
        if (motion != null) {
            this._expressionManager.startMotionPriority(motion, false, LAppDefine.PriorityForce);
        }
        else {
            if (this._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]expression[".concat(expressionId, "] is null"));
            }
        }
    };
    LAppModel.prototype.setRandomExpression = function () {
        if (this._expressions.getSize() == 0) {
            return;
        }
        var no = Math.floor(Math.random() * this._expressions.getSize());
        for (var i = 0; i < this._expressions.getSize(); i++) {
            if (i == no) {
                var name_1 = this._expressions._keyValues[i].first;
                this.setExpression(name_1);
                return;
            }
        }
    };
    LAppModel.prototype.motionEventFired = function (eventValue) {
        (0, cubismdebug_1.CubismLogInfo)('{0} is fired on LAppModel!!', eventValue.s);
    };
    LAppModel.prototype.hitTest = function (hitArenaName, x, y) {
        if (this._opacity < 1) {
            return false;
        }
        var count = this._modelSetting.getHitAreasCount();
        for (var i = 0; i < count; i++) {
            if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
                var drawId = this._modelSetting.getHitAreaId(i);
                return this.isHit(drawId, x, y);
            }
        }
        return false;
    };
    LAppModel.prototype.preLoadMotionGroup = function (group) {
        var _this = this;
        var _loop_3 = function (i) {
            var motionFileName = this_2._modelSetting.getMotionFileName(group, i);
            var name_2 = "".concat(group, "_").concat(i);
            if (this_2._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]load motion: ".concat(motionFileName, " => [").concat(name_2, "]"));
            }
            fetch("".concat(this_2._modelHomeDir).concat(motionFileName))
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                var tmpMotion = _this.loadMotion(arrayBuffer, arrayBuffer.byteLength, name_2);
                var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeInTime(fadeTime);
                }
                fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeOutTime(fadeTime);
                }
                tmpMotion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                if (_this._motions.getValue(name_2) != null) {
                    acubismmotion_1.ACubismMotion.delete(_this._motions.getValue(name_2));
                }
                _this._motions.setValue(name_2, tmpMotion);
                _this._motionCount++;
                if (_this._motionCount >= _this._allMotionCount) {
                    _this._state = LoadStep.LoadTexture;
                    _this._motionManager.stopAllMotions();
                    _this._updating = false;
                    _this._initialized = true;
                    _this.createRenderer();
                    _this.setupTextures();
                    _this.getRenderer().startUp(lappdelegate_1.gl);
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < this._modelSetting.getMotionCount(group); i++) {
            _loop_3(i);
        }
    };
    LAppModel.prototype.releaseMotions = function () {
        this._motions.clear();
    };
    LAppModel.prototype.releaseExpressions = function () {
        this._expressions.clear();
    };
    LAppModel.prototype.doDraw = function () {
        if (this._model == null)
            return;
        var viewport = [0, 0, lappdelegate_1.canvas.width, lappdelegate_1.canvas.height];
        this.getRenderer().setRenderState(lappdelegate_1.frameBuffer, viewport);
        this.getRenderer().drawModel();
    };
    LAppModel.prototype.draw = function (matrix) {
        if (this._model == null) {
            return;
        }
        if (this._state == LoadStep.CompleteSetup) {
            matrix.multiplyByMatrix(this._modelMatrix);
            this.getRenderer().setMvpMatrix(matrix);
            this.doDraw();
        }
    };
    return LAppModel;
}(cubismusermodel_1.CubismUserModel));
exports.LAppModel = LAppModel;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "540c4f5057266d2cb89b"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi42YzNhOTJlYTAxNGI5MWFlNWQ1ZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsZ0ZBQXNCO0FBRXRCLHNKQUErRTtBQUMvRSxnSkFBMkU7QUFDM0UsZ0lBR3dDO0FBQ3hDLHNJQUFrRTtBQUdsRSw2SUFBbUU7QUFFbkUsdUlBQW1FO0FBQ25FLG1JQUd5QztBQUV6QyxvS0FHb0Q7QUFDcEQsMEdBQWdEO0FBR2hELG1IQUFzRDtBQUN0RCwySEFBNkQ7QUFFN0QsOEZBQTJDO0FBQzNDLHdGQUF1RTtBQUN2RSx5RUFBb0M7QUFFcEMsMEdBQTBEO0FBRTFELElBQUssUUF3Qko7QUF4QkQsV0FBSyxRQUFRO0lBQ1gsbURBQVU7SUFDVixpREFBUztJQUNULHlEQUFhO0lBQ2IsMkRBQWM7SUFDZCxtRUFBa0I7SUFDbEIscURBQVc7SUFDWCw2REFBZTtJQUNmLCtDQUFRO0lBQ1IsdURBQVk7SUFDWix5REFBYTtJQUNiLHNEQUFXO0lBQ1gsd0RBQVk7SUFDWixnRUFBZ0I7SUFDaEIsZ0VBQWdCO0lBQ2hCLDhEQUFlO0lBQ2Ysc0RBQVc7SUFDWCxvREFBVTtJQUNWLDREQUFjO0lBQ2Qsb0VBQWtCO0lBQ2xCLG9FQUFrQjtJQUNsQixzREFBVztJQUNYLDhEQUFlO0lBQ2YsMERBQWE7QUFDZixDQUFDLEVBeEJJLFFBQVEsS0FBUixRQUFRLFFBd0JaO0FBTUQ7SUFBK0IsNkJBQWU7SUF3dUI1QztRQUFBLFlBQ0UsaUJBQU8sU0F3Q1I7UUF0Q0MsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUU1QixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUkscUJBQVMsRUFBa0IsQ0FBQztRQUNwRCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUks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U0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUtNLHdCQUFJLEdBQVgsVUFBWSxNQUFzQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3ZCLE9BQU87U0FDUjtRQUdELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUEwRUgsZ0JBQUM7QUFBRCxDQUFDLENBN3lCOEIsaUNBQWUsR0E2eUI3QztBQTd5QlksOEJBQVM7Ozs7Ozs7OztVQ3hFdEIscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTGl2ZTJkLy4vc3JjL2xhcHBtb2RlbC50cyIsIndlYnBhY2s6Ly9MaXZlMmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuaW1wb3J0IHsgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkIH0gZnJvbSAnQGZyYW1ld29yay9jdWJpc21kZWZhdWx0cGFyYW1ldGVyaWQnO1xuaW1wb3J0IHsgQ3ViaXNtTW9kZWxTZXR0aW5nSnNvbiB9IGZyb20gJ0BmcmFtZXdvcmsvY3ViaXNtbW9kZWxzZXR0aW5nanNvbic7XG5pbXBvcnQge1xuICBCcmVhdGhQYXJhbWV0ZXJEYXRhLFxuICBDdWJpc21CcmVhdGhcbn0gZnJvbSAnQGZyYW1ld29yay9lZmZlY3QvY3ViaXNtYnJlYXRoJztcbmltcG9ydCB7IEN1YmlzbUV5ZUJsaW5rIH0gZnJvbSAnQGZyYW1ld29yay9lZmZlY3QvY3ViaXNtZXllYmxpbmsnO1xuaW1wb3J0IHsgSUN1YmlzbU1vZGVsU2V0dGluZyB9IGZyb20gJ0BmcmFtZXdvcmsvaWN1YmlzbW1vZGVsc2V0dGluZyc7XG5pbXBvcnQgeyBDdWJpc21JZEhhbmRsZSB9IGZyb20gJ0BmcmFtZXdvcmsvaWQvY3ViaXNtaWQnO1xuaW1wb3J0IHsgQ3ViaXNtRnJhbWV3b3JrIH0gZnJvbSAnQGZyYW1ld29yay9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuaW1wb3J0IHsgQ3ViaXNtTWF0cml4NDQgfSBmcm9tICdAZnJhbWV3b3JrL21hdGgvY3ViaXNtbWF0cml4NDQnO1xuaW1wb3J0IHsgQ3ViaXNtVXNlck1vZGVsIH0gZnJvbSAnQGZyYW1ld29yay9tb2RlbC9jdWJpc211c2VybW9kZWwnO1xuaW1wb3J0IHtcbiAgQUN1YmlzbU1vdGlvbixcbiAgRmluaXNoZWRNb3Rpb25DYWxsYmFja1xufSBmcm9tICdAZnJhbWV3b3JrL21vdGlvbi9hY3ViaXNtbW90aW9uJztcbmltcG9ydCB7IEN1YmlzbU1vdGlvbiB9IGZyb20gJ0BmcmFtZXdvcmsvbW90aW9uL2N1YmlzbW1vdGlvbic7XG5pbXBvcnQge1xuICBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5SGFuZGxlLFxuICBJbnZhbGlkTW90aW9uUXVldWVFbnRyeUhhbmRsZVZhbHVlXG59IGZyb20gJ0BmcmFtZXdvcmsvbW90aW9uL2N1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlcic7XG5pbXBvcnQgeyBjc21NYXAgfSBmcm9tICdAZnJhbWV3b3JrL3R5cGUvY3NtbWFwJztcbmltcG9ydCB7IGNzbVJlY3QgfSBmcm9tICdAZnJhbWV3b3JrL3R5cGUvY3NtcmVjdGYnO1xuaW1wb3J0IHsgY3NtU3RyaW5nIH0gZnJvbSAnQGZyYW1ld29yay90eXBlL2NzbXN0cmluZyc7XG5pbXBvcnQgeyBjc21WZWN0b3IgfSBmcm9tICdAZnJhbWV3b3JrL3R5cGUvY3NtdmVjdG9yJztcbmltcG9ydCB7IEN1YmlzbUxvZ0luZm8gfSBmcm9tICdAZnJhbWV3b3JrL3V0aWxzL2N1YmlzbWRlYnVnJztcblxuaW1wb3J0ICogYXMgTEFwcERlZmluZSBmcm9tICcuL2xhcHBkZWZpbmUnO1xuaW1wb3J0IHsgY2FudmFzLCBmcmFtZUJ1ZmZlciwgZ2wsIExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XG5pbXBvcnQgeyBMQXBwV2F2RmlsZUhhbmRsZXIgfSBmcm9tICcuL2xhcHB3YXZmaWxlaGFuZGxlcic7XG5cbmVudW0gTG9hZFN0ZXAge1xuICBMb2FkQXNzZXRzLFxuICBMb2FkTW9kZWwsXG4gIFdhaXRMb2FkTW9kZWwsXG4gIExvYWRFeHByZXNzaW9uLFxuICBXYWl0TG9hZEV4cHJlc3Npb24sXG4gIExvYWRQaHlzaWNzLFxuICBXYWl0TG9hZFBoeXNpY3MsXG4gIExvYWRQb3NlLFxuICBXYWl0TG9hZFBvc2UsXG4gIFNldHVwRXllQmxpbmssXG4gIFNldHVwQnJlYXRoLFxuICBMb2FkVXNlckRhdGEsXG4gIFdhaXRMb2FkVXNlckRhdGEsXG4gIFNldHVwRXllQmxpbmtJZHMsXG4gIFNldHVwTGlwU3luY0lkcyxcbiAgU2V0dXBMYXlvdXQsXG4gIExvYWRNb3Rpb24sXG4gIFdhaXRMb2FkTW90aW9uLFxuICBDb21wbGV0ZUluaXRpYWxpemUsXG4gIENvbXBsZXRlU2V0dXBNb2RlbCxcbiAgTG9hZFRleHR1cmUsXG4gIFdhaXRMb2FkVGV4dHVyZSxcbiAgQ29tcGxldGVTZXR1cFxufVxuXG4vKipcbiAqIOODpuODvOOCtuODvOOBjOWun+mam+OBq+S9v+eUqOOBmeOCi+ODouODh+ODq+OBruWun+ijheOCr+ODqeOCuTxicj5cbiAqIOODouODh+ODq+eUn+aIkOOAgeapn+iDveOCs+ODs+ODneODvOODjeODs+ODiOeUn+aIkOOAgeabtOaWsOWHpueQhuOBqOODrOODs+ODgOODquODs+OCsOOBruWRvOOBs+WHuuOBl+OCkuihjOOBhuOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcE1vZGVsIGV4dGVuZHMgQ3ViaXNtVXNlck1vZGVsIHtcbiAgLyoqXG4gICAqIG1vZGVsMy5qc29u44GM572u44GL44KM44Gf44OH44Kj44Os44Kv44OI44Oq44Go44OV44Kh44Kk44Or44OR44K544GL44KJ44Oi44OH44Or44KS55Sf5oiQ44GZ44KLXG4gICAqIEBwYXJhbSBkaXJcbiAgICogQHBhcmFtIGZpbGVOYW1lXG4gICAqL1xuICBwdWJsaWMgbG9hZEFzc2V0cyhkaXI6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX21vZGVsSG9tZURpciA9IGRpcjtcblxuICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke2ZpbGVOYW1lfWApXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICBjb25zdCBzZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nID0gbmV3IEN1YmlzbU1vZGVsU2V0dGluZ0pzb24oXG4gICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIOOCueODhuODvOODiOOCkuabtOaWsFxuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRNb2RlbDtcblxuICAgICAgICAvLyDntZDmnpzjgpLkv53lrZhcbiAgICAgICAgdGhpcy5zZXR1cE1vZGVsKHNldHRpbmcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbW9kZWwzLmpzb27jgYvjgonjg6Ljg4fjg6vjgpLnlJ/miJDjgZnjgovjgIJcbiAgICogbW9kZWwzLmpzb27jga7oqJjov7DjgavlvpPjgaPjgabjg6Ljg4fjg6vnlJ/miJDjgIHjg6Ljg7zjgrfjg6fjg7PjgIHniannkIbmvJTnrpfjgarjganjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jnlJ/miJDjgpLooYzjgYbjgIJcbiAgICpcbiAgICogQHBhcmFtIHNldHRpbmcgSUN1YmlzbU1vZGVsU2V0dGluZ+OBruOCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cE1vZGVsKHNldHRpbmc6IElDdWJpc21Nb2RlbFNldHRpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX21vZGVsU2V0dGluZyA9IHNldHRpbmc7XG5cbiAgICAvLyBDdWJpc21Nb2RlbFxuICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW9kZWxGaWxlTmFtZSgpICE9ICcnKSB7XG4gICAgICBjb25zdCBtb2RlbEZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vZGVsRmlsZU5hbWUoKTtcblxuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7bW9kZWxGaWxlTmFtZX1gKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkTW9kZWwoYXJyYXlCdWZmZXIpO1xuICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZEV4cHJlc3Npb247XG5cbiAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgIGxvYWRDdWJpc21FeHByZXNzaW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkTW9kZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdNb2RlbCBkYXRhIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIH1cblxuICAgIC8vIEV4cHJlc3Npb25cbiAgICBjb25zdCBsb2FkQ3ViaXNtRXhwcmVzc2lvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbkNvdW50KCkgPiAwKSB7XG4gICAgICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbkNvdW50KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZXhwcmVzc2lvbk5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbk5hbWUoaSk7XG4gICAgICAgICAgY29uc3QgZXhwcmVzc2lvbkZpbGVOYW1lID1cbiAgICAgICAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeHByZXNzaW9uRmlsZU5hbWUoaSk7XG5cbiAgICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHtleHByZXNzaW9uRmlsZU5hbWV9YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vdGlvbjogQUN1YmlzbU1vdGlvbiA9IHRoaXMubG9hZEV4cHJlc3Npb24oXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uTmFtZVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9leHByZXNzaW9ucy5nZXRWYWx1ZShleHByZXNzaW9uTmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIEFDdWJpc21Nb3Rpb24uZGVsZXRlKFxuICAgICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbW90aW9uKTtcblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9uQ291bnQrKztcblxuICAgICAgICAgICAgICBpZiAodGhpcy5fZXhwcmVzc2lvbkNvdW50ID49IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUGh5c2ljcztcblxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgbG9hZEN1YmlzbVBoeXNpY3MoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZEV4cHJlc3Npb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQaHlzaWNzO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIGxvYWRDdWJpc21QaHlzaWNzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICBjb25zdCBsb2FkQ3ViaXNtUGh5c2ljcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UGh5c2ljc0ZpbGVOYW1lKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgcGh5c2ljc0ZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFBoeXNpY3NGaWxlTmFtZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke3BoeXNpY3NGaWxlTmFtZX1gKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkUGh5c2ljcyhhcnJheUJ1ZmZlciwgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFBvc2U7XG5cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICBsb2FkQ3ViaXNtUG9zZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkUGh5c2ljcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFBvc2U7XG5cbiAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgbG9hZEN1YmlzbVBvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gUG9zZVxuICAgIGNvbnN0IGxvYWRDdWJpc21Qb3NlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRQb3NlRmlsZU5hbWUoKSAhPSAnJykge1xuICAgICAgICBjb25zdCBwb3NlRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UG9zZUZpbGVOYW1lKCk7XG5cbiAgICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7cG9zZUZpbGVOYW1lfWApXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRQb3NlKGFycmF5QnVmZmVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgc2V0dXBFeWVCbGluaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkUG9zZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGluaztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBzZXR1cEV5ZUJsaW5rKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEV5ZUJsaW5rXG4gICAgY29uc3Qgc2V0dXBFeWVCbGluayA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJDb3VudCgpID4gMCkge1xuICAgICAgICB0aGlzLl9leWVCbGluayA9IEN1YmlzbUV5ZUJsaW5rLmNyZWF0ZSh0aGlzLl9tb2RlbFNldHRpbmcpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwQnJlYXRoO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgc2V0dXBCcmVhdGgoKTtcbiAgICB9O1xuXG4gICAgLy8gQnJlYXRoXG4gICAgY29uc3Qgc2V0dXBCcmVhdGggPSAoKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9icmVhdGggPSBDdWJpc21CcmVhdGguY3JlYXRlKCk7XG5cbiAgICAgIGNvbnN0IGJyZWF0aFBhcmFtZXRlcnM6IGNzbVZlY3RvcjxCcmVhdGhQYXJhbWV0ZXJEYXRhPiA9IG5ldyBjc21WZWN0b3IoKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1BbmdsZVgsIDAuMCwgMTUuMCwgNi41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUFuZ2xlWSwgMC4wLCA4LjAsIDMuNTM0NSwgMC41KVxuICAgICAgKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1BbmdsZVosIDAuMCwgMTAuMCwgNS41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUJvZHlBbmdsZVgsIDAuMCwgNC4wLCAxNS41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEoXG4gICAgICAgICAgQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQnJlYXRoXG4gICAgICAgICAgKSxcbiAgICAgICAgICAwLjUsXG4gICAgICAgICAgMC41LFxuICAgICAgICAgIDMuMjM0NSxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX2JyZWF0aC5zZXRQYXJhbWV0ZXJzKGJyZWF0aFBhcmFtZXRlcnMpO1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkVXNlckRhdGE7XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBsb2FkVXNlckRhdGEoKTtcbiAgICB9O1xuXG4gICAgLy8gVXNlckRhdGFcbiAgICBjb25zdCBsb2FkVXNlckRhdGEgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldFVzZXJEYXRhRmlsZSgpICE9ICcnKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhRmlsZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRVc2VyRGF0YUZpbGUoKTtcblxuICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHt1c2VyRGF0YUZpbGV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFVzZXJEYXRhKGFycmF5QnVmZmVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rSWRzO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgc2V0dXBFeWVCbGlua0lkcygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRVc2VyRGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGlua0lkcztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBzZXR1cEV5ZUJsaW5rSWRzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEV5ZUJsaW5rSWRzXG4gICAgY29uc3Qgc2V0dXBFeWVCbGlua0lkcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGV5ZUJsaW5rSWRDb3VudDogbnVtYmVyID1cbiAgICAgICAgdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV5ZUJsaW5rUGFyYW1ldGVyQ291bnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleWVCbGlua0lkQ291bnQ7ICsraSkge1xuICAgICAgICB0aGlzLl9leWVCbGlua0lkcy5wdXNoQmFjayhcbiAgICAgICAgICB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJJZChpKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwTGlwU3luY0lkcztcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIHNldHVwTGlwU3luY0lkcygpO1xuICAgIH07XG5cbiAgICAvLyBMaXBTeW5jSWRzXG4gICAgY29uc3Qgc2V0dXBMaXBTeW5jSWRzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGlwU3luY0lkQ291bnQgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TGlwU3luY1BhcmFtZXRlckNvdW50KCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlwU3luY0lkQ291bnQ7ICsraSkge1xuICAgICAgICB0aGlzLl9saXBTeW5jSWRzLnB1c2hCYWNrKHRoaXMuX21vZGVsU2V0dGluZy5nZXRMaXBTeW5jUGFyYW1ldGVySWQoaSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cExheW91dDtcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIHNldHVwTGF5b3V0KCk7XG4gICAgfTtcblxuICAgIC8vIExheW91dFxuICAgIGNvbnN0IHNldHVwTGF5b3V0ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGF5b3V0OiBjc21NYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IGNzbU1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRMYXlvdXRNYXAobGF5b3V0KTtcbiAgICAgIHRoaXMuX21vZGVsTWF0cml4LnNldHVwRnJvbUxheW91dChsYXlvdXQpO1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkTW90aW9uO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgbG9hZEN1YmlzbU1vdGlvbigpO1xuICAgIH07XG5cbiAgICAvLyBNb3Rpb25cbiAgICBjb25zdCBsb2FkQ3ViaXNtTW90aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZE1vdGlvbjtcbiAgICAgIHRoaXMuX21vZGVsLnNhdmVQYXJhbWV0ZXJzKCk7XG4gICAgICB0aGlzLl9hbGxNb3Rpb25Db3VudCA9IDA7XG4gICAgICB0aGlzLl9tb3Rpb25Db3VudCA9IDA7XG4gICAgICBjb25zdCBncm91cDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgY29uc3QgbW90aW9uR3JvdXBDb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkdyb3VwQ291bnQoKTtcblxuICAgICAgLy8g44Oi44O844K344On44Oz44Gu57eP5pWw44KS5rGC44KB44KLXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdGlvbkdyb3VwQ291bnQ7IGkrKykge1xuICAgICAgICBncm91cFtpXSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Hcm91cE5hbWUoaSk7XG4gICAgICAgIHRoaXMuX2FsbE1vdGlvbkNvdW50ICs9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cFtpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruiqreOBv+i+vOOBv1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Rpb25Hcm91cENvdW50OyBpKyspIHtcbiAgICAgICAgdGhpcy5wcmVMb2FkTW90aW9uR3JvdXAoZ3JvdXBbaV0pO1xuICAgICAgfVxuXG4gICAgICAvLyDjg6Ljg7zjgrfjg6fjg7PjgYzjgarjgYTloLTlkIhcbiAgICAgIGlmIChtb3Rpb25Hcm91cENvdW50ID09IDApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkVGV4dHVyZTtcblxuICAgICAgICAvLyDlhajjgabjga7jg6Ljg7zjgrfjg6fjg7PjgpLlgZzmraLjgZnjgotcbiAgICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5zdG9wQWxsTW90aW9ucygpO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgICAgIHRoaXMuc2V0dXBUZXh0dXJlcygpO1xuICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuc3RhcnRVcChnbCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4bjgq/jgrnjg4Hjg6Pjg6bjg4vjg4Pjg4jjgavjg4bjgq/jgrnjg4Hjg6PjgpLjg63jg7zjg4njgZnjgotcbiAgICovXG4gIHByaXZhdGUgc2V0dXBUZXh0dXJlcygpOiB2b2lkIHtcbiAgICAvLyBpUGhvbmXjgafjga7jgqLjg6vjg5XjgqHlk4Hos6rlkJHkuIrjga7jgZ/jgoFUeXBlc2NyaXB044Gn44GvcHJlbXVsdGlwbGllZEFscGhh44KS5o6h55SoXG4gICAgY29uc3QgdXNlUHJlbXVsdGlwbHkgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09IExvYWRTdGVwLkxvYWRUZXh0dXJlKSB7XG4gICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Poqq3jgb/ovrzjgb/nlKhcbiAgICAgIGNvbnN0IHRleHR1cmVDb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFRleHR1cmVDb3VudCgpO1xuXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgbW9kZWxUZXh0dXJlTnVtYmVyID0gMDtcbiAgICAgICAgbW9kZWxUZXh0dXJlTnVtYmVyIDwgdGV4dHVyZUNvdW50O1xuICAgICAgICBtb2RlbFRleHR1cmVOdW1iZXIrK1xuICAgICAgKSB7XG4gICAgICAgIC8vIOODhuOCr+OCueODgeODo+WQjeOBjOepuuaWh+Wtl+OBoOOBo+OBn+WgtOWQiOOBr+ODreODvOODieODu+ODkOOCpOODs+ODieWHpueQhuOCkuOCueOCreODg+ODl1xuICAgICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldFRleHR1cmVGaWxlTmFtZShtb2RlbFRleHR1cmVOdW1iZXIpID09ICcnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2dldFRleHR1cmVGaWxlTmFtZSBudWxsJyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZWJHTOOBruODhuOCr+OCueODgeODo+ODpuODi+ODg+ODiOOBq+ODhuOCr+OCueODgeODo+OCkuODreODvOODieOBmeOCi1xuICAgICAgICBsZXQgdGV4dHVyZVBhdGggPVxuICAgICAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlRmlsZU5hbWUobW9kZWxUZXh0dXJlTnVtYmVyKTtcbiAgICAgICAgdGV4dHVyZVBhdGggPSB0aGlzLl9tb2RlbEhvbWVEaXIgKyB0ZXh0dXJlUGF0aDtcblxuICAgICAgICAvLyDjg63jg7zjg4nlrozkuobmmYLjgavlkbzjgbPlh7rjgZnjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICAgICAgY29uc3Qgb25Mb2FkID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5iaW5kVGV4dHVyZShtb2RlbFRleHR1cmVOdW1iZXIsIHRleHR1cmVJbmZvLmlkKTtcblxuICAgICAgICAgIHRoaXMuX3RleHR1cmVDb3VudCsrO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmVDb3VudCA+PSB0ZXh0dXJlQ291bnQpIHtcbiAgICAgICAgICAgIC8vIOODreODvOODieWujOS6hlxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyDoqq3jgb/ovrzjgb9cbiAgICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKClcbiAgICAgICAgICAuZ2V0VGV4dHVyZU1hbmFnZXIoKVxuICAgICAgICAgIC5jcmVhdGVUZXh0dXJlRnJvbVBuZ0ZpbGUodGV4dHVyZVBhdGgsIHVzZVByZW11bHRpcGx5LCBvbkxvYWQpO1xuICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuc2V0SXNQcmVtdWx0aXBsaWVkQWxwaGEodXNlUHJlbXVsdGlwbHkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkVGV4dHVyZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Os44Oz44OA44Op44KS5YaN5qeL56+J44GZ44KLXG4gICAqL1xuICBwdWJsaWMgcmVsb2FkUmVuZGVyZXIoKTogdm9pZCB7XG4gICAgdGhpcy5kZWxldGVSZW5kZXJlcigpO1xuICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcbiAgICB0aGlzLnNldHVwVGV4dHVyZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrBcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N0YXRlICE9IExvYWRTdGVwLkNvbXBsZXRlU2V0dXApIHJldHVybjtcblxuICAgIGNvbnN0IGRlbHRhVGltZVNlY29uZHM6IG51bWJlciA9IExBcHBQYWwuZ2V0RGVsdGFUaW1lKCk7XG4gICAgdGhpcy5fdXNlclRpbWVTZWNvbmRzICs9IGRlbHRhVGltZVNlY29uZHM7XG5cbiAgICB0aGlzLl9kcmFnTWFuYWdlci51cGRhdGUoZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgdGhpcy5fZHJhZ1ggPSB0aGlzLl9kcmFnTWFuYWdlci5nZXRYKCk7XG4gICAgdGhpcy5fZHJhZ1kgPSB0aGlzLl9kcmFnTWFuYWdlci5nZXRZKCk7XG5cbiAgICAvLyDjg6Ljg7zjgrfjg6fjg7Pjgavjgojjgovjg5Hjg6njg6Hjg7zjgr/mm7TmlrDjga7mnInnhKFcbiAgICBsZXQgbW90aW9uVXBkYXRlZCA9IGZhbHNlO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHRoaXMuX21vZGVsLmxvYWRQYXJhbWV0ZXJzKCk7IC8vIOWJjeWbnuOCu+ODvOODluOBleOCjOOBn+eKtuaFi+OCkuODreODvOODiVxuICAgIGlmICh0aGlzLl9tb3Rpb25NYW5hZ2VyLmlzRmluaXNoZWQoKSkge1xuICAgICAgLy8g44Oi44O844K344On44Oz44Gu5YaN55Sf44GM44Gq44GE5aC05ZCI44CB5b6F5qmf44Oi44O844K344On44Oz44Gu5Lit44GL44KJ44Op44Oz44OA44Og44Gn5YaN55Sf44GZ44KLXG4gICAgICB0aGlzLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICBMQXBwRGVmaW5lLk1vdGlvbkdyb3VwSWRsZSxcbiAgICAgICAgTEFwcERlZmluZS5Qcmlvcml0eUlkbGVcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdGlvblVwZGF0ZWQgPSB0aGlzLl9tb3Rpb25NYW5hZ2VyLnVwZGF0ZU1vdGlvbihcbiAgICAgICAgdGhpcy5fbW9kZWwsXG4gICAgICAgIGRlbHRhVGltZVNlY29uZHNcbiAgICAgICk7IC8vIOODouODvOOCt+ODp+ODs+OCkuabtOaWsFxuICAgIH1cbiAgICB0aGlzLl9tb2RlbC5zYXZlUGFyYW1ldGVycygpOyAvLyDnirbmhYvjgpLkv53lrZhcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyDjgb7jgbDjgZ/jgY1cbiAgICBpZiAoIW1vdGlvblVwZGF0ZWQpIHtcbiAgICAgIGlmICh0aGlzLl9leWVCbGluayAhPSBudWxsKSB7XG4gICAgICAgIC8vIOODoeOCpOODs+ODouODvOOCt+ODp+ODs+OBruabtOaWsOOBjOOBquOBhOOBqOOBjVxuICAgICAgICB0aGlzLl9leWVCbGluay51cGRhdGVQYXJhbWV0ZXJzKHRoaXMuX21vZGVsLCBkZWx0YVRpbWVTZWNvbmRzKTsgLy8g55uu44OR44OBXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyLnVwZGF0ZU1vdGlvbih0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7IC8vIOihqOaDheOBp+ODkeODqeODoeODvOOCv+abtOaWsO+8iOebuOWvvuWkieWMlu+8iVxuICAgIH1cblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+WkieWMllxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+mhlOOBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtQW5nbGVYLCB0aGlzLl9kcmFnWCAqIDMwKTsgLy8gLTMw44GL44KJMzDjga7lgKTjgpLliqDjgYjjgotcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUFuZ2xlWSwgdGhpcy5fZHJhZ1kgKiAzMCk7XG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKFxuICAgICAgdGhpcy5faWRQYXJhbUFuZ2xlWixcbiAgICAgIHRoaXMuX2RyYWdYICogdGhpcy5fZHJhZ1kgKiAtMzBcbiAgICApO1xuXG4gICAgLy8g44OJ44Op44OD44Kw44Gr44KI44KL5L2T44Gu5ZCR44GN44Gu6Kq/5pW0XG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKFxuICAgICAgdGhpcy5faWRQYXJhbUJvZHlBbmdsZVgsXG4gICAgICB0aGlzLl9kcmFnWCAqIDEwXG4gICAgKTsgLy8gLTEw44GL44KJMTDjga7lgKTjgpLliqDjgYjjgotcblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+ebruOBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtRXllQmFsbFgsIHRoaXMuX2RyYWdYKTsgLy8gLTHjgYvjgokx44Gu5YCk44KS5Yqg44GI44KLXG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2lkUGFyYW1FeWVCYWxsWSwgdGhpcy5fZHJhZ1kpO1xuXG4gICAgLy8g5ZG85ZC444Gq44GpXG4gICAgaWYgKHRoaXMuX2JyZWF0aCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9icmVhdGgudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLy8g54mp55CG5ryU566X44Gu6Kit5a6aXG4gICAgaWYgKHRoaXMuX3BoeXNpY3MgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcGh5c2ljcy5ldmFsdWF0ZSh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLy8g44Oq44OD44OX44K344Oz44Kv44Gu6Kit5a6aXG4gICAgaWYgKHRoaXMuX2xpcHN5bmMpIHtcbiAgICAgIGxldCB2YWx1ZSA9IDAuMDsgLy8g44Oq44Ki44Or44K/44Kk44Og44Gn44Oq44OD44OX44K344Oz44Kv44KS6KGM44GG5aC05ZCI44CB44K344K544OG44Og44GL44KJ6Z+z6YeP44KS5Y+W5b6X44GX44Gm44CBMH4x44Gu56+E5Zuy44Gn5YCk44KS5YWl5Yqb44GX44G+44GZ44CCXG5cbiAgICAgIHRoaXMuX3dhdkZpbGVIYW5kbGVyLnVwZGF0ZShkZWx0YVRpbWVTZWNvbmRzKTtcbiAgICAgIHZhbHVlID0gdGhpcy5fd2F2RmlsZUhhbmRsZXIuZ2V0Um1zKCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlwU3luY0lkcy5nZXRTaXplKCk7ICsraSkge1xuICAgICAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5fbGlwU3luY0lkcy5hdChpKSwgdmFsdWUsIDAuOCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g44Od44O844K644Gu6Kit5a6aXG4gICAgaWYgKHRoaXMuX3Bvc2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcG9zZS51cGRhdGVQYXJhbWV0ZXJzKHRoaXMuX21vZGVsLCBkZWx0YVRpbWVTZWNvbmRzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tb2RlbC51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlvJXmlbDjgafmjIflrprjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7lho3nlJ/jgpLplovlp4vjgZnjgotcbiAgICogQHBhcmFtIGdyb3VwIOODouODvOOCt+ODp+ODs+OCsOODq+ODvOODl+WQjVxuICAgKiBAcGFyYW0gbm8g44Kw44Or44O844OX5YaF44Gu55Wq5Y+3XG4gICAqIEBwYXJhbSBwcmlvcml0eSDlhKrlhYjluqZcbiAgICogQHBhcmFtIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huaZguOBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICAgKiBAcmV0dXJuIOmWi+Wni+OBl+OBn+ODouODvOOCt+ODp+ODs+OBruitmOWIpeeVquWPt+OCkui/lOOBmeOAguWAi+WIpeOBruODouODvOOCt+ODp+ODs+OBjOe1guS6huOBl+OBn+OBi+WQpuOBi+OCkuWIpOWumuOBmeOCi2lzRmluaXNoZWQoKeOBruW8leaVsOOBp+S9v+eUqOOBmeOCi+OAgumWi+Wni+OBp+OBjeOBquOBhOaZguOBr1stMV1cbiAgICovXG4gIHB1YmxpYyBzdGFydE1vdGlvbihcbiAgICBncm91cDogc3RyaW5nLFxuICAgIG5vOiBudW1iZXIsXG4gICAgcHJpb3JpdHk6IG51bWJlcixcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSB7XG4gICAgaWYgKHByaW9yaXR5ID09IExBcHBEZWZpbmUuUHJpb3JpdHlGb3JjZSkge1xuICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5zZXRSZXNlcnZlUHJpb3JpdHkocHJpb3JpdHkpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX21vdGlvbk1hbmFnZXIucmVzZXJ2ZU1vdGlvbihwcmlvcml0eSkpIHtcbiAgICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXCJbQVBQXWNhbid0IHN0YXJ0IG1vdGlvbi5cIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gSW52YWxpZE1vdGlvblF1ZXVlRW50cnlIYW5kbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtb3Rpb25GaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GaWxlTmFtZShncm91cCwgbm8pO1xuXG4gICAgLy8gZXgpIGlkbGVfMFxuICAgIGNvbnN0IG5hbWUgPSBgJHtncm91cH1fJHtub31gO1xuICAgIGxldCBtb3Rpb246IEN1YmlzbU1vdGlvbiA9IHRoaXMuX21vdGlvbnMuZ2V0VmFsdWUobmFtZSkgYXMgQ3ViaXNtTW90aW9uO1xuICAgIGxldCBhdXRvRGVsZXRlID0gZmFsc2U7XG5cbiAgICBpZiAobW90aW9uID09IG51bGwpIHtcbiAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke21vdGlvbkZpbGVOYW1lfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICBtb3Rpb24gPSB0aGlzLmxvYWRNb3Rpb24oXG4gICAgICAgICAgICBhcnJheUJ1ZmZlcixcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXJcbiAgICAgICAgICApO1xuICAgICAgICAgIGxldCBmYWRlVGltZTogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVJblRpbWVWYWx1ZShcbiAgICAgICAgICAgIGdyb3VwLFxuICAgICAgICAgICAgbm9cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgbW90aW9uLnNldEZhZGVJblRpbWUoZmFkZVRpbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZhZGVUaW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVPdXRUaW1lVmFsdWUoZ3JvdXAsIG5vKTtcbiAgICAgICAgICBpZiAoZmFkZVRpbWUgPj0gMC4wKSB7XG4gICAgICAgICAgICBtb3Rpb24uc2V0RmFkZU91dFRpbWUoZmFkZVRpbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1vdGlvbi5zZXRFZmZlY3RJZHModGhpcy5fZXllQmxpbmtJZHMsIHRoaXMuX2xpcFN5bmNJZHMpO1xuICAgICAgICAgIGF1dG9EZWxldGUgPSB0cnVlOyAvLyDntYLkuobmmYLjgavjg6Hjg6Ljg6rjgYvjgonliYrpmaRcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdGlvbi5zZXRGaW5pc2hlZE1vdGlvbkhhbmRsZXIob25GaW5pc2hlZE1vdGlvbkhhbmRsZXIpO1xuICAgIH1cblxuICAgIC8vdm9pY2VcbiAgICBjb25zdCB2b2ljZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Tb3VuZEZpbGVOYW1lKGdyb3VwLCBubyk7XG4gICAgaWYgKHZvaWNlLmxvY2FsZUNvbXBhcmUoJycpICE9IDApIHtcbiAgICAgIGxldCBwYXRoID0gdm9pY2U7XG4gICAgICBwYXRoID0gdGhpcy5fbW9kZWxIb21lRGlyICsgcGF0aDtcbiAgICAgIHRoaXMuX3dhdkZpbGVIYW5kbGVyLnN0YXJ0KHBhdGgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBbQVBQXXN0YXJ0IG1vdGlvbjogWyR7Z3JvdXB9XyR7bm99YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9tb3Rpb25NYW5hZ2VyLnN0YXJ0TW90aW9uUHJpb3JpdHkoXG4gICAgICBtb3Rpb24sXG4gICAgICBhdXRvRGVsZXRlLFxuICAgICAgcHJpb3JpdHlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOODqeODs+ODgOODoOOBq+mBuOOBsOOCjOOBn+ODouODvOOCt+ODp+ODs+OBruWGjeeUn+OCkumWi+Wni+OBmeOCi+OAglxuICAgKiBAcGFyYW0gZ3JvdXAg44Oi44O844K344On44Oz44Kw44Or44O844OX5ZCNXG4gICAqIEBwYXJhbSBwcmlvcml0eSDlhKrlhYjluqZcbiAgICogQHBhcmFtIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huaZguOBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICAgKiBAcmV0dXJuIOmWi+Wni+OBl+OBn+ODouODvOOCt+ODp+ODs+OBruitmOWIpeeVquWPt+OCkui/lOOBmeOAguWAi+WIpeOBruODouODvOOCt+ODp+ODs+OBjOe1guS6huOBl+OBn+OBi+WQpuOBi+OCkuWIpOWumuOBmeOCi2lzRmluaXNoZWQoKeOBruW8leaVsOOBp+S9v+eUqOOBmeOCi+OAgumWi+Wni+OBp+OBjeOBquOBhOaZguOBr1stMV1cbiAgICovXG4gIHB1YmxpYyBzdGFydFJhbmRvbU1vdGlvbihcbiAgICBncm91cDogc3RyaW5nLFxuICAgIHByaW9yaXR5OiBudW1iZXIsXG4gICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUge1xuICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uQ291bnQoZ3JvdXApID09IDApIHtcbiAgICAgIHJldHVybiBJbnZhbGlkTW90aW9uUXVldWVFbnRyeUhhbmRsZVZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vOiBudW1iZXIgPSBNYXRoLmZsb29yKFxuICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cClcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RhcnRNb3Rpb24oZ3JvdXAsIG5vLCBwcmlvcml0eSwgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIOW8leaVsOOBp+aMh+WumuOBl+OBn+ihqOaDheODouODvOOCt+ODp+ODs+OCkuOCu+ODg+ODiOOBmeOCi1xuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbklkIOihqOaDheODouODvOOCt+ODp+ODs+OBrklEXG4gICAqL1xuICBwdWJsaWMgc2V0RXhwcmVzc2lvbihleHByZXNzaW9uSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1vdGlvbjogQUN1YmlzbU1vdGlvbiA9IHRoaXMuX2V4cHJlc3Npb25zLmdldFZhbHVlKGV4cHJlc3Npb25JZCk7XG5cbiAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF1leHByZXNzaW9uOiBbJHtleHByZXNzaW9uSWR9XWApO1xuICAgIH1cblxuICAgIGlmIChtb3Rpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIuc3RhcnRNb3Rpb25Qcmlvcml0eShcbiAgICAgICAgbW90aW9uLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgTEFwcERlZmluZS5Qcmlvcml0eUZvcmNlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBbQVBQXWV4cHJlc3Npb25bJHtleHByZXNzaW9uSWR9XSBpcyBudWxsYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODqeODs+ODgOODoOOBq+mBuOOBsOOCjOOBn+ihqOaDheODouODvOOCt+ODp+ODs+OCkuOCu+ODg+ODiOOBmeOCi1xuICAgKi9cbiAgcHVibGljIHNldFJhbmRvbUV4cHJlc3Npb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKSA9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm86IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBpZiAoaSA9PSBubykge1xuICAgICAgICBjb25zdCBuYW1lOiBzdHJpbmcgPSB0aGlzLl9leHByZXNzaW9ucy5fa2V5VmFsdWVzW2ldLmZpcnN0O1xuICAgICAgICB0aGlzLnNldEV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI44Gu55m654Gr44KS5Y+X44GR5Y+W44KLXG4gICAqL1xuICBwdWJsaWMgbW90aW9uRXZlbnRGaXJlZChldmVudFZhbHVlOiBjc21TdHJpbmcpOiB2b2lkIHtcbiAgICBDdWJpc21Mb2dJbmZvKCd7MH0gaXMgZmlyZWQgb24gTEFwcE1vZGVsISEnLCBldmVudFZhbHVlLnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOW9k+OBn+OCiuWIpOWumuODhuOCueODiFxuICAgKiDmjIflrprvvKnvvKTjga7poILngrnjg6rjgrnjg4jjgYvjgonnn6nlvaLjgpLoqIjnrpfjgZfjgIHluqfmqJnjgpLjgYznn6nlvaLnr4Tlm7LlhoXjgYvliKTlrprjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGhpdEFyZW5hTmFtZSAg5b2T44Gf44KK5Yik5a6a44KS44OG44K544OI44GZ44KL5a++6LGh44GuSURcbiAgICogQHBhcmFtIHggICAgICAgICAgICAg5Yik5a6a44KS6KGM44GGWOW6p+aomVxuICAgKiBAcGFyYW0geSAgICAgICAgICAgICDliKTlrprjgpLooYzjgYZZ5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgaGl0VGVzdChoaXRBcmVuYU5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAvLyDpgI/mmI7mmYLjga/lvZPjgZ/jgorliKTlrprnhKHjgZfjgIJcbiAgICBpZiAodGhpcy5fb3BhY2l0eSA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEhpdEFyZWFzQ291bnQoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRIaXRBcmVhTmFtZShpKSA9PSBoaXRBcmVuYU5hbWUpIHtcbiAgICAgICAgY29uc3QgZHJhd0lkOiBDdWJpc21JZEhhbmRsZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRIaXRBcmVhSWQoaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSGl0KGRyYXdJZCwgeCwgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OCkuOCsOODq+ODvOODl+WQjeOBi+OCieS4gOaLrOOBp+ODreODvOODieOBmeOCi+OAglxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jga7lkI3liY3jga/lhoXpg6jjgadNb2RlbFNldHRpbmfjgYvjgonlj5blvpfjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGdyb3VwIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OBruOCsOODq+ODvOODl+WQjVxuICAgKi9cbiAgcHVibGljIHByZUxvYWRNb3Rpb25Hcm91cChncm91cDogc3RyaW5nKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uQ291bnQoZ3JvdXApOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vdGlvbkZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZpbGVOYW1lKGdyb3VwLCBpKTtcblxuICAgICAgLy8gZXgpIGlkbGVfMFxuICAgICAgY29uc3QgbmFtZSA9IGAke2dyb3VwfV8ke2l9YDtcbiAgICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgICAgYFtBUFBdbG9hZCBtb3Rpb246ICR7bW90aW9uRmlsZU5hbWV9ID0+IFske25hbWV9XWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7bW90aW9uRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIGNvbnN0IHRtcE1vdGlvbjogQ3ViaXNtTW90aW9uID0gdGhpcy5sb2FkTW90aW9uKFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBsZXQgZmFkZVRpbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZUluVGltZVZhbHVlKGdyb3VwLCBpKTtcbiAgICAgICAgICBpZiAoZmFkZVRpbWUgPj0gMC4wKSB7XG4gICAgICAgICAgICB0bXBNb3Rpb24uc2V0RmFkZUluVGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmFkZVRpbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZU91dFRpbWVWYWx1ZShncm91cCwgaSk7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgdG1wTW90aW9uLnNldEZhZGVPdXRUaW1lKGZhZGVUaW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG1wTW90aW9uLnNldEVmZmVjdElkcyh0aGlzLl9leWVCbGlua0lkcywgdGhpcy5fbGlwU3luY0lkcyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5fbW90aW9ucy5nZXRWYWx1ZShuYW1lKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBBQ3ViaXNtTW90aW9uLmRlbGV0ZSh0aGlzLl9tb3Rpb25zLmdldFZhbHVlKG5hbWUpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9tb3Rpb25zLnNldFZhbHVlKG5hbWUsIHRtcE1vdGlvbik7XG5cbiAgICAgICAgICB0aGlzLl9tb3Rpb25Db3VudCsrO1xuICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25Db3VudCA+PSB0aGlzLl9hbGxNb3Rpb25Db3VudCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkVGV4dHVyZTtcblxuICAgICAgICAgICAgLy8g5YWo44Gm44Gu44Oi44O844K344On44Oz44KS5YGc5q2i44GZ44KLXG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyLnN0b3BBbGxNb3Rpb25zKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBUZXh0dXJlcygpO1xuICAgICAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnN0YXJ0VXAoZ2wpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOOBmeOBueOBpuOBruODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OCkuino+aUvuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIHJlbGVhc2VNb3Rpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuX21vdGlvbnMuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlhajjgabjga7ooajmg4Xjg4fjg7zjgr/jgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlRXhwcmVzc2lvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovlh6bnkIbjgILjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovnqbrplpPjga5WaWV3LVByb2plY3Rpb27ooYzliJfjgpLmuKHjgZnjgIJcbiAgICovXG4gIHB1YmxpYyBkb0RyYXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21vZGVsID09IG51bGwpIHJldHVybjtcblxuICAgIC8vIOOCreODo+ODs+ODkOOCueOCteOCpOOCuuOCkua4oeOBmVxuICAgIGNvbnN0IHZpZXdwb3J0OiBudW1iZXJbXSA9IFswLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRdO1xuXG4gICAgdGhpcy5nZXRSZW5kZXJlcigpLnNldFJlbmRlclN0YXRlKGZyYW1lQnVmZmVyLCB2aWV3cG9ydCk7XG4gICAgdGhpcy5nZXRSZW5kZXJlcigpLmRyYXdNb2RlbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OCkuaPj+eUu+OBmeOCi+WHpueQhuOAguODouODh+ODq+OCkuaPj+eUu+OBmeOCi+epuumWk+OBrlZpZXctUHJvamVjdGlvbuihjOWIl+OCkua4oeOBmeOAglxuICAgKi9cbiAgcHVibGljIGRyYXcobWF0cml4OiBDdWJpc21NYXRyaXg0NCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8g5ZCE6Kqt44G/6L6844G/57WC5LqG5b6MXG4gICAgaWYgKHRoaXMuX3N0YXRlID09IExvYWRTdGVwLkNvbXBsZXRlU2V0dXApIHtcbiAgICAgIG1hdHJpeC5tdWx0aXBseUJ5TWF0cml4KHRoaXMuX21vZGVsTWF0cml4KTtcblxuICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnNldE12cE1hdHJpeChtYXRyaXgpO1xuXG4gICAgICB0aGlzLmRvRHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fbW9kZWxTZXR0aW5nID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbEhvbWVEaXIgPSBudWxsO1xuICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kcyA9IDAuMDtcblxuICAgIHRoaXMuX2V5ZUJsaW5rSWRzID0gbmV3IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT4oKTtcbiAgICB0aGlzLl9saXBTeW5jSWRzID0gbmV3IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT4oKTtcblxuICAgIHRoaXMuX21vdGlvbnMgPSBuZXcgY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj4oKTtcbiAgICB0aGlzLl9leHByZXNzaW9ucyA9IG5ldyBjc21NYXA8c3RyaW5nLCBBQ3ViaXNtTW90aW9uPigpO1xuXG4gICAgdGhpcy5faGl0QXJlYSA9IG5ldyBjc21WZWN0b3I8Y3NtUmVjdD4oKTtcbiAgICB0aGlzLl91c2VyQXJlYSA9IG5ldyBjc21WZWN0b3I8Y3NtUmVjdD4oKTtcblxuICAgIHRoaXMuX2lkUGFyYW1BbmdsZVggPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1BbmdsZVhcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1BbmdsZVkgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1BbmdsZVlcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1BbmdsZVogPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1BbmdsZVpcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1FeWVCYWxsWCA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUV5ZUJhbGxYXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtRXllQmFsbFkgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1FeWVCYWxsWVxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUJvZHlBbmdsZVggPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1Cb2R5QW5nbGVYXG4gICAgKTtcblxuICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZEFzc2V0cztcbiAgICB0aGlzLl9leHByZXNzaW9uQ291bnQgPSAwO1xuICAgIHRoaXMuX3RleHR1cmVDb3VudCA9IDA7XG4gICAgdGhpcy5fbW90aW9uQ291bnQgPSAwO1xuICAgIHRoaXMuX2FsbE1vdGlvbkNvdW50ID0gMDtcbiAgICB0aGlzLl93YXZGaWxlSGFuZGxlciA9IG5ldyBMQXBwV2F2RmlsZUhhbmRsZXIoKTtcbiAgfVxuXG4gIF9tb2RlbFNldHRpbmc6IElDdWJpc21Nb2RlbFNldHRpbmc7IC8vIOODouODh+ODq+OCu+ODg+ODhuOCo+ODs+OCsOaDheWgsVxuICBfbW9kZWxIb21lRGlyOiBzdHJpbmc7IC8vIOODouODh+ODq+OCu+ODg+ODhuOCo+ODs+OCsOOBjOe9ruOBi+OCjOOBn+ODh+OCo+ODrOOCr+ODiOODqlxuICBfdXNlclRpbWVTZWNvbmRzOiBudW1iZXI7IC8vIOODh+ODq+OCv+aZgumWk+OBruepjeeul+WApFvnp5JdXG5cbiAgX2V5ZUJsaW5rSWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDjg6Ljg4fjg6vjgavoqK3lrprjgZXjgozjgZ/nnqzjgY3mqZ/og73nlKjjg5Hjg6njg6Hjg7zjgr9JRFxuICBfbGlwU3luY0lkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g44Oi44OH44Or44Gr6Kit5a6a44GV44KM44Gf44Oq44OD44OX44K344Oz44Kv5qmf6IO955So44OR44Op44Oh44O844K/SURcblxuICBfbW90aW9uczogY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj47IC8vIOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODouODvOOCt+ODp+ODs+OBruODquOCueODiFxuICBfZXhwcmVzc2lvbnM6IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+OyAvLyDoqq3jgb/ovrzjgb7jgozjgabjgYTjgovooajmg4Xjga7jg6rjgrnjg4hcblxuICBfaGl0QXJlYTogY3NtVmVjdG9yPGNzbVJlY3Q+O1xuICBfdXNlckFyZWE6IGNzbVZlY3Rvcjxjc21SZWN0PjtcblxuICBfaWRQYXJhbUFuZ2xlWDogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUFuZ2xlWFxuICBfaWRQYXJhbUFuZ2xlWTogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUFuZ2xlWVxuICBfaWRQYXJhbUFuZ2xlWjogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUFuZ2xlWlxuICBfaWRQYXJhbUV5ZUJhbGxYOiBDdWJpc21JZEhhbmRsZTsgLy8g44OR44Op44Oh44O844K/SUQ6IFBhcmFtRXllQmFsbFhcbiAgX2lkUGFyYW1FeWVCYWxsWTogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUV5ZUJBbGxZXG4gIF9pZFBhcmFtQm9keUFuZ2xlWDogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUJvZHlBbmdsZVhcblxuICBfc3RhdGU6IG51bWJlcjsgLy8g54++5Zyo44Gu44K544OG44O844K/44K5566h55CG55SoXG4gIF9leHByZXNzaW9uQ291bnQ6IG51bWJlcjsgLy8g6KGo5oOF44OH44O844K/44Kr44Km44Oz44OIXG4gIF90ZXh0dXJlQ291bnQ6IG51bWJlcjsgLy8g44OG44Kv44K544OB44Oj44Kr44Km44Oz44OIXG4gIF9tb3Rpb25Db3VudDogbnVtYmVyOyAvLyDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgqvjgqbjg7Pjg4hcbiAgX2FsbE1vdGlvbkNvdW50OiBudW1iZXI7IC8vIOODouODvOOCt+ODp+ODs+e3j+aVsFxuICBfd2F2RmlsZUhhbmRsZXI6IExBcHBXYXZGaWxlSGFuZGxlcjsgLy93YXbjg5XjgqHjgqTjg6vjg4/jg7Pjg4njg6lcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCI1NDBjNGY1MDU3MjY2ZDJjYjg5YlwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9