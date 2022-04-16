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
                console.log(arrayBuffer);
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
/******/ 	__webpack_require__.h = function() { return "6c3a92ea014b91ae5d5d"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hM2RlZTNjYWY0ZmM0MzJjYTA0My5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsZ0ZBQXNCO0FBRXRCLHNKQUErRTtBQUMvRSxnSkFBMkU7QUFDM0UsZ0lBR3dDO0FBQ3hDLHNJQUFrRTtBQUdsRSw2SUFBbUU7QUFFbkUsdUlBQW1FO0FBQ25FLG1JQUd5QztBQUV6QyxvS0FHb0Q7QUFDcEQsMEdBQWdEO0FBR2hELG1IQUFzRDtBQUN0RCwySEFBNkQ7QUFFN0QsOEZBQTJDO0FBQzNDLHdGQUF1RTtBQUN2RSx5RUFBb0M7QUFFcEMsMEdBQTBEO0FBRTFELElBQUssUUF3Qko7QUF4QkQsV0FBSyxRQUFRO0lBQ1gsbURBQVU7SUFDVixpREFBUztJQUNULHlEQUFhO0lBQ2IsMkRBQWM7SUFDZCxtRUFBa0I7SUFDbEIscURBQVc7SUFDWCw2REFBZTtJQUNmLCtDQUFRO0lBQ1IsdURBQVk7SUFDWix5REFBYTtJQUNiLHNEQUFXO0lBQ1gsd0RBQVk7SUFDWixnRUFBZ0I7SUFDaEIsZ0VBQWdCO0lBQ2hCLDhEQUFlO0lBQ2Ysc0RBQVc7SUFDWCxvREFBVTtJQUNWLDREQUFjO0lBQ2Qsb0VBQWtCO0lBQ2xCLG9FQUFrQjtJQUNsQixzREFBVztJQUNYLDhEQUFlO0lBQ2YsMERBQWE7QUFDZixDQUFDLEVBeEJJLFFBQVEsS0FBUixRQUFRLFFBd0JaO0FBTUQ7SUFBK0IsNkJBQWU7SUF5dUI1QztRQUFBLFlBQ0UsaUJBQU8sU0F3Q1I7UUF0Q0MsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUU1QixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUkscUJBQVMsRUFBa0IsQ0FBQztRQUNwRCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUks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LENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFLTSx3QkFBSSxHQUFYLFVBQVksTUFBc0I7UUFDaEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixPQUFPO1NBQ1I7UUFHRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBMEVILGdCQUFDO0FBQUQsQ0FBQyxDQTl5QjhCLGlDQUFlLEdBOHlCN0M7QUE5eUJZLDhCQUFTOzs7Ozs7Ozs7VUN4RXRCLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uL3NyYy9sYXBwbW9kZWwudHMiLCJ3ZWJwYWNrOi8vTGl2ZTJkL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5cbmltcG9ydCB7IEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZCB9IGZyb20gJ0BmcmFtZXdvcmsvY3ViaXNtZGVmYXVsdHBhcmFtZXRlcmlkJztcbmltcG9ydCB7IEN1YmlzbU1vZGVsU2V0dGluZ0pzb24gfSBmcm9tICdAZnJhbWV3b3JrL2N1YmlzbW1vZGVsc2V0dGluZ2pzb24nO1xuaW1wb3J0IHtcbiAgQnJlYXRoUGFyYW1ldGVyRGF0YSxcbiAgQ3ViaXNtQnJlYXRoXG59IGZyb20gJ0BmcmFtZXdvcmsvZWZmZWN0L2N1YmlzbWJyZWF0aCc7XG5pbXBvcnQgeyBDdWJpc21FeWVCbGluayB9IGZyb20gJ0BmcmFtZXdvcmsvZWZmZWN0L2N1YmlzbWV5ZWJsaW5rJztcbmltcG9ydCB7IElDdWJpc21Nb2RlbFNldHRpbmcgfSBmcm9tICdAZnJhbWV3b3JrL2ljdWJpc21tb2RlbHNldHRpbmcnO1xuaW1wb3J0IHsgQ3ViaXNtSWRIYW5kbGUgfSBmcm9tICdAZnJhbWV3b3JrL2lkL2N1YmlzbWlkJztcbmltcG9ydCB7IEN1YmlzbUZyYW1ld29yayB9IGZyb20gJ0BmcmFtZXdvcmsvbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbmltcG9ydCB7IEN1YmlzbU1hdHJpeDQ0IH0gZnJvbSAnQGZyYW1ld29yay9tYXRoL2N1YmlzbW1hdHJpeDQ0JztcbmltcG9ydCB7IEN1YmlzbVVzZXJNb2RlbCB9IGZyb20gJ0BmcmFtZXdvcmsvbW9kZWwvY3ViaXNtdXNlcm1vZGVsJztcbmltcG9ydCB7XG4gIEFDdWJpc21Nb3Rpb24sXG4gIEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbn0gZnJvbSAnQGZyYW1ld29yay9tb3Rpb24vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBDdWJpc21Nb3Rpb24gfSBmcm9tICdAZnJhbWV3b3JrL21vdGlvbi9jdWJpc21tb3Rpb24nO1xuaW1wb3J0IHtcbiAgQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSxcbiAgSW52YWxpZE1vdGlvblF1ZXVlRW50cnlIYW5kbGVWYWx1ZVxufSBmcm9tICdAZnJhbWV3b3JrL21vdGlvbi9jdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXInO1xuaW1wb3J0IHsgY3NtTWFwIH0gZnJvbSAnQGZyYW1ld29yay90eXBlL2NzbW1hcCc7XG5pbXBvcnQgeyBjc21SZWN0IH0gZnJvbSAnQGZyYW1ld29yay90eXBlL2NzbXJlY3RmJztcbmltcG9ydCB7IGNzbVN0cmluZyB9IGZyb20gJ0BmcmFtZXdvcmsvdHlwZS9jc21zdHJpbmcnO1xuaW1wb3J0IHsgY3NtVmVjdG9yIH0gZnJvbSAnQGZyYW1ld29yay90eXBlL2NzbXZlY3Rvcic7XG5pbXBvcnQgeyBDdWJpc21Mb2dJbmZvIH0gZnJvbSAnQGZyYW1ld29yay91dGlscy9jdWJpc21kZWJ1Zyc7XG5cbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcbmltcG9ydCB7IGNhbnZhcywgZnJhbWVCdWZmZXIsIGdsLCBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgeyBMQXBwUGFsIH0gZnJvbSAnLi9sYXBwcGFsJztcbmltcG9ydCB7IFRleHR1cmVJbmZvIH0gZnJvbSAnLi9sYXBwdGV4dHVyZW1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcFdhdkZpbGVIYW5kbGVyIH0gZnJvbSAnLi9sYXBwd2F2ZmlsZWhhbmRsZXInO1xuXG5lbnVtIExvYWRTdGVwIHtcbiAgTG9hZEFzc2V0cyxcbiAgTG9hZE1vZGVsLFxuICBXYWl0TG9hZE1vZGVsLFxuICBMb2FkRXhwcmVzc2lvbixcbiAgV2FpdExvYWRFeHByZXNzaW9uLFxuICBMb2FkUGh5c2ljcyxcbiAgV2FpdExvYWRQaHlzaWNzLFxuICBMb2FkUG9zZSxcbiAgV2FpdExvYWRQb3NlLFxuICBTZXR1cEV5ZUJsaW5rLFxuICBTZXR1cEJyZWF0aCxcbiAgTG9hZFVzZXJEYXRhLFxuICBXYWl0TG9hZFVzZXJEYXRhLFxuICBTZXR1cEV5ZUJsaW5rSWRzLFxuICBTZXR1cExpcFN5bmNJZHMsXG4gIFNldHVwTGF5b3V0LFxuICBMb2FkTW90aW9uLFxuICBXYWl0TG9hZE1vdGlvbixcbiAgQ29tcGxldGVJbml0aWFsaXplLFxuICBDb21wbGV0ZVNldHVwTW9kZWwsXG4gIExvYWRUZXh0dXJlLFxuICBXYWl0TG9hZFRleHR1cmUsXG4gIENvbXBsZXRlU2V0dXBcbn1cblxuLyoqXG4gKiDjg6bjg7zjgrbjg7zjgYzlrp/pmpvjgavkvb/nlKjjgZnjgovjg6Ljg4fjg6vjga7lrp/oo4Xjgq/jg6njgrk8YnI+XG4gKiDjg6Ljg4fjg6vnlJ/miJDjgIHmqZ/og73jgrPjg7Pjg53jg7zjg43jg7Pjg4jnlJ/miJDjgIHmm7TmlrDlh6bnkIbjgajjg6zjg7Pjg4Djg6rjg7PjgrDjga7lkbzjgbPlh7rjgZfjgpLooYzjgYbjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBNb2RlbCBleHRlbmRzIEN1YmlzbVVzZXJNb2RlbCB7XG4gIC8qKlxuICAgKiBtb2RlbDMuanNvbuOBjOe9ruOBi+OCjOOBn+ODh+OCo+ODrOOCr+ODiOODquOBqOODleOCoeOCpOODq+ODkeOCueOBi+OCieODouODh+ODq+OCkueUn+aIkOOBmeOCi1xuICAgKiBAcGFyYW0gZGlyXG4gICAqIEBwYXJhbSBmaWxlTmFtZVxuICAgKi9cbiAgcHVibGljIGxvYWRBc3NldHMoZGlyOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9tb2RlbEhvbWVEaXIgPSBkaXI7XG5cbiAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHtmaWxlTmFtZX1gKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZzogSUN1YmlzbU1vZGVsU2V0dGluZyA9IG5ldyBDdWJpc21Nb2RlbFNldHRpbmdKc29uKFxuICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgKTtcblxuICAgICAgICAvLyDjgrnjg4bjg7zjg4jjgpLmm7TmlrBcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkTW9kZWw7XG5cbiAgICAgICAgLy8g57WQ5p6c44KS5L+d5a2YXG4gICAgICAgIHRoaXMuc2V0dXBNb2RlbChzZXR0aW5nKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1vZGVsMy5qc29u44GL44KJ44Oi44OH44Or44KS55Sf5oiQ44GZ44KL44CCXG4gICAqIG1vZGVsMy5qc29u44Gu6KiY6L+w44Gr5b6T44Gj44Gm44Oi44OH44Or55Sf5oiQ44CB44Oi44O844K344On44Oz44CB54mp55CG5ryU566X44Gq44Gp44Gu44Kz44Oz44Od44O844ON44Oz44OI55Sf5oiQ44KS6KGM44GG44CCXG4gICAqXG4gICAqIEBwYXJhbSBzZXR0aW5nIElDdWJpc21Nb2RlbFNldHRpbmfjga7jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICovXG4gIHByaXZhdGUgc2V0dXBNb2RlbChzZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9tb2RlbFNldHRpbmcgPSBzZXR0aW5nO1xuXG4gICAgLy8gQ3ViaXNtTW9kZWxcbiAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vZGVsRmlsZU5hbWUoKSAhPSAnJykge1xuICAgICAgY29uc3QgbW9kZWxGaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb2RlbEZpbGVOYW1lKCk7XG5cbiAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke21vZGVsRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZE1vZGVsKGFycmF5QnVmZmVyKTtcbiAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRFeHByZXNzaW9uO1xuXG4gICAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgICBsb2FkQ3ViaXNtRXhwcmVzc2lvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZE1vZGVsO1xuICAgIH0gZWxzZSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnTW9kZWwgZGF0YSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9XG5cbiAgICAvLyBFeHByZXNzaW9uXG4gICAgY29uc3QgbG9hZEN1YmlzbUV4cHJlc3Npb24gPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25Db3VudCgpID4gMCkge1xuICAgICAgICBjb25zdCBjb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25Db3VudCgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGV4cHJlc3Npb25OYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25OYW1lKGkpO1xuICAgICAgICAgIGNvbnN0IGV4cHJlc3Npb25GaWxlTmFtZSA9XG4gICAgICAgICAgICB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbkZpbGVOYW1lKGkpO1xuXG4gICAgICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7ZXhwcmVzc2lvbkZpbGVOYW1lfWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtb3Rpb246IEFDdWJpc21Nb3Rpb24gPSB0aGlzLmxvYWRFeHByZXNzaW9uKFxuICAgICAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgICAgIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbk5hbWVcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBpZiAodGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBBQ3ViaXNtTW90aW9uLmRlbGV0ZShcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cHJlc3Npb25zLmdldFZhbHVlKGV4cHJlc3Npb25OYW1lKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuc2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUsIG51bGwpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuc2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUsIG1vdGlvbik7XG5cbiAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbkNvdW50Kys7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2V4cHJlc3Npb25Db3VudCA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFBoeXNpY3M7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGxvYWRDdWJpc21QaHlzaWNzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRFeHByZXNzaW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUGh5c2ljcztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBsb2FkQ3ViaXNtUGh5c2ljcygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgY29uc3QgbG9hZEN1YmlzbVBoeXNpY3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldFBoeXNpY3NGaWxlTmFtZSgpICE9ICcnKSB7XG4gICAgICAgIGNvbnN0IHBoeXNpY3NGaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRQaHlzaWNzRmlsZU5hbWUoKTtcblxuICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHtwaHlzaWNzRmlsZU5hbWV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBoeXNpY3MoYXJyYXlCdWZmZXIsIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQb3NlO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgbG9hZEN1YmlzbVBvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFBoeXNpY3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQb3NlO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIGxvYWRDdWJpc21Qb3NlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFBvc2VcbiAgICBjb25zdCBsb2FkQ3ViaXNtUG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UG9zZUZpbGVOYW1lKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgcG9zZUZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFBvc2VGaWxlTmFtZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke3Bvc2VGaWxlTmFtZX1gKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkUG9zZShhcnJheUJ1ZmZlciwgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGluaztcblxuICAgICAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgICAgIHNldHVwRXllQmxpbmsoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFBvc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwRXllQmxpbms7XG5cbiAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgc2V0dXBFeWVCbGluaygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBFeWVCbGlua1xuICAgIGNvbnN0IHNldHVwRXllQmxpbmsgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldEV5ZUJsaW5rUGFyYW1ldGVyQ291bnQoKSA+IDApIHtcbiAgICAgICAgdGhpcy5fZXllQmxpbmsgPSBDdWJpc21FeWVCbGluay5jcmVhdGUodGhpcy5fbW9kZWxTZXR0aW5nKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEJyZWF0aDtcbiAgICAgIH1cblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIHNldHVwQnJlYXRoKCk7XG4gICAgfTtcblxuICAgIC8vIEJyZWF0aFxuICAgIGNvbnN0IHNldHVwQnJlYXRoID0gKCk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fYnJlYXRoID0gQ3ViaXNtQnJlYXRoLmNyZWF0ZSgpO1xuXG4gICAgICBjb25zdCBicmVhdGhQYXJhbWV0ZXJzOiBjc21WZWN0b3I8QnJlYXRoUGFyYW1ldGVyRGF0YT4gPSBuZXcgY3NtVmVjdG9yKCk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YSh0aGlzLl9pZFBhcmFtQW5nbGVYLCAwLjAsIDE1LjAsIDYuNTM0NSwgMC41KVxuICAgICAgKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1BbmdsZVksIDAuMCwgOC4wLCAzLjUzNDUsIDAuNSlcbiAgICAgICk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YSh0aGlzLl9pZFBhcmFtQW5nbGVaLCAwLjAsIDEwLjAsIDUuNTM0NSwgMC41KVxuICAgICAgKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYLCAwLjAsIDQuMCwgMTUuNTM0NSwgMC41KVxuICAgICAgKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKFxuICAgICAgICAgIEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgICAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUJyZWF0aFxuICAgICAgICAgICksXG4gICAgICAgICAgMC41LFxuICAgICAgICAgIDAuNSxcbiAgICAgICAgICAzLjIzNDUsXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9icmVhdGguc2V0UGFyYW1ldGVycyhicmVhdGhQYXJhbWV0ZXJzKTtcbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFVzZXJEYXRhO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgbG9hZFVzZXJEYXRhKCk7XG4gICAgfTtcblxuICAgIC8vIFVzZXJEYXRhXG4gICAgY29uc3QgbG9hZFVzZXJEYXRhID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRVc2VyRGF0YUZpbGUoKSAhPSAnJykge1xuICAgICAgICBjb25zdCB1c2VyRGF0YUZpbGUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VXNlckRhdGFGaWxlKCk7XG5cbiAgICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7dXNlckRhdGFGaWxlfWApXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRVc2VyRGF0YShhcnJheUJ1ZmZlciwgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGlua0lkcztcblxuICAgICAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgICAgIHNldHVwRXllQmxpbmtJZHMoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkVXNlckRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwRXllQmxpbmtJZHM7XG5cbiAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgc2V0dXBFeWVCbGlua0lkcygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBFeWVCbGlua0lkc1xuICAgIGNvbnN0IHNldHVwRXllQmxpbmtJZHMgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBleWVCbGlua0lkQ291bnQ6IG51bWJlciA9XG4gICAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeWVCbGlua1BhcmFtZXRlckNvdW50KCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXllQmxpbmtJZENvdW50OyArK2kpIHtcbiAgICAgICAgdGhpcy5fZXllQmxpbmtJZHMucHVzaEJhY2soXG4gICAgICAgICAgdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV5ZUJsaW5rUGFyYW1ldGVySWQoaSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cExpcFN5bmNJZHM7XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBzZXR1cExpcFN5bmNJZHMoKTtcbiAgICB9O1xuXG4gICAgLy8gTGlwU3luY0lkc1xuICAgIGNvbnN0IHNldHVwTGlwU3luY0lkcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGxpcFN5bmNJZENvdW50ID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldExpcFN5bmNQYXJhbWV0ZXJDb3VudCgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpcFN5bmNJZENvdW50OyArK2kpIHtcbiAgICAgICAgdGhpcy5fbGlwU3luY0lkcy5wdXNoQmFjayh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TGlwU3luY1BhcmFtZXRlcklkKGkpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBMYXlvdXQ7XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBzZXR1cExheW91dCgpO1xuICAgIH07XG5cbiAgICAvLyBMYXlvdXRcbiAgICBjb25zdCBzZXR1cExheW91dCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGxheW91dDogY3NtTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBjc21NYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgICB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TGF5b3V0TWFwKGxheW91dCk7XG4gICAgICB0aGlzLl9tb2RlbE1hdHJpeC5zZXR1cEZyb21MYXlvdXQobGF5b3V0KTtcbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZE1vdGlvbjtcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIGxvYWRDdWJpc21Nb3Rpb24oKTtcbiAgICB9O1xuXG4gICAgLy8gTW90aW9uXG4gICAgY29uc3QgbG9hZEN1YmlzbU1vdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRNb3Rpb247XG4gICAgICB0aGlzLl9tb2RlbC5zYXZlUGFyYW1ldGVycygpO1xuICAgICAgdGhpcy5fYWxsTW90aW9uQ291bnQgPSAwO1xuICAgICAgdGhpcy5fbW90aW9uQ291bnQgPSAwO1xuICAgICAgY29uc3QgZ3JvdXA6IHN0cmluZ1tdID0gW107XG5cbiAgICAgIGNvbnN0IG1vdGlvbkdyb3VwQ291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Hcm91cENvdW50KCk7XG5cbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBrue3j+aVsOOCkuaxguOCgeOCi1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Rpb25Hcm91cENvdW50OyBpKyspIHtcbiAgICAgICAgZ3JvdXBbaV0gPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uR3JvdXBOYW1lKGkpO1xuICAgICAgICB0aGlzLl9hbGxNb3Rpb25Db3VudCArPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uQ291bnQoZ3JvdXBbaV0pO1xuICAgICAgfVxuXG4gICAgICAvLyDjg6Ljg7zjgrfjg6fjg7Pjga7oqq3jgb/ovrzjgb9cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW90aW9uR3JvdXBDb3VudDsgaSsrKSB7XG4gICAgICAgIHRoaXMucHJlTG9hZE1vdGlvbkdyb3VwKGdyb3VwW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8g44Oi44O844K344On44Oz44GM44Gq44GE5aC05ZCIXG4gICAgICBpZiAobW90aW9uR3JvdXBDb3VudCA9PSAwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFRleHR1cmU7XG5cbiAgICAgICAgLy8g5YWo44Gm44Gu44Oi44O844K344On44Oz44KS5YGc5q2i44GZ44KLXG4gICAgICAgIHRoaXMuX21vdGlvbk1hbmFnZXIuc3RvcEFsbE1vdGlvbnMoKTtcblxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLnNldHVwVGV4dHVyZXMoKTtcbiAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnN0YXJ0VXAoZ2wpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICog44OG44Kv44K544OB44Oj44Om44OL44OD44OI44Gr44OG44Kv44K544OB44Oj44KS44Ot44O844OJ44GZ44KLXG4gICAqL1xuICBwcml2YXRlIHNldHVwVGV4dHVyZXMoKTogdm9pZCB7XG4gICAgLy8gaVBob25l44Gn44Gu44Ki44Or44OV44Kh5ZOB6LOq5ZCR5LiK44Gu44Gf44KBVHlwZXNjcmlwdOOBp+OBr3ByZW11bHRpcGxpZWRBbHBoYeOCkuaOoeeUqFxuICAgIGNvbnN0IHVzZVByZW11bHRpcGx5ID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkU3RlcC5Mb2FkVGV4dHVyZSkge1xuICAgICAgLy8g44OG44Kv44K544OB44Oj6Kqt44G/6L6844G/55SoXG4gICAgICBjb25zdCB0ZXh0dXJlQ291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlQ291bnQoKTtcblxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IG1vZGVsVGV4dHVyZU51bWJlciA9IDA7XG4gICAgICAgIG1vZGVsVGV4dHVyZU51bWJlciA8IHRleHR1cmVDb3VudDtcbiAgICAgICAgbW9kZWxUZXh0dXJlTnVtYmVyKytcbiAgICAgICkge1xuICAgICAgICAvLyDjg4bjgq/jgrnjg4Hjg6PlkI3jgYznqbrmloflrZfjgaDjgaPjgZ/loLTlkIjjga/jg63jg7zjg4njg7vjg5DjgqTjg7Pjg4nlh6bnkIbjgpLjgrnjgq3jg4Pjg5dcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlRmlsZU5hbWUobW9kZWxUZXh0dXJlTnVtYmVyKSA9PSAnJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRUZXh0dXJlRmlsZU5hbWUgbnVsbCcpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2ViR0zjga7jg4bjgq/jgrnjg4Hjg6Pjg6bjg4vjg4Pjg4jjgavjg4bjgq/jgrnjg4Hjg6PjgpLjg63jg7zjg4njgZnjgotcbiAgICAgICAgbGV0IHRleHR1cmVQYXRoID1cbiAgICAgICAgICB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VGV4dHVyZUZpbGVOYW1lKG1vZGVsVGV4dHVyZU51bWJlcik7XG4gICAgICAgIHRleHR1cmVQYXRoID0gdGhpcy5fbW9kZWxIb21lRGlyICsgdGV4dHVyZVBhdGg7XG5cbiAgICAgICAgLy8g44Ot44O844OJ5a6M5LqG5pmC44Gr5ZG844Gz5Ye644GZ44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAgICAgIGNvbnN0IG9uTG9hZCA9ICh0ZXh0dXJlSW5mbzogVGV4dHVyZUluZm8pOiB2b2lkID0+IHtcbiAgICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuYmluZFRleHR1cmUobW9kZWxUZXh0dXJlTnVtYmVyLCB0ZXh0dXJlSW5mby5pZCk7XG5cbiAgICAgICAgICB0aGlzLl90ZXh0dXJlQ291bnQrKztcblxuICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlQ291bnQgPj0gdGV4dHVyZUNvdW50KSB7XG4gICAgICAgICAgICAvLyDjg63jg7zjg4nlrozkuoZcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuQ29tcGxldGVTZXR1cDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8g6Kqt44G/6L6844G/XG4gICAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpXG4gICAgICAgICAgLmdldFRleHR1cmVNYW5hZ2VyKClcbiAgICAgICAgICAuY3JlYXRlVGV4dHVyZUZyb21QbmdGaWxlKHRleHR1cmVQYXRoLCB1c2VQcmVtdWx0aXBseSwgb25Mb2FkKTtcbiAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnNldElzUHJlbXVsdGlwbGllZEFscGhhKHVzZVByZW11bHRpcGx5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFRleHR1cmU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODrOODs+ODgOODqeOCkuWGjeani+evieOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbG9hZFJlbmRlcmVyKCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZXRlUmVuZGVyZXIoKTtcbiAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgdGhpcy5zZXR1cFRleHR1cmVzKCk7XG4gIH1cblxuICAvKipcbiAgICog5pu05pawXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwKSByZXR1cm47XG5cbiAgICBjb25zdCBkZWx0YVRpbWVTZWNvbmRzOiBudW1iZXIgPSBMQXBwUGFsLmdldERlbHRhVGltZSgpO1xuICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kcyArPSBkZWx0YVRpbWVTZWNvbmRzO1xuXG4gICAgdGhpcy5fZHJhZ01hbmFnZXIudXBkYXRlKGRlbHRhVGltZVNlY29uZHMpO1xuICAgIHRoaXMuX2RyYWdYID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WCgpO1xuICAgIHRoaXMuX2RyYWdZID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WSgpO1xuXG4gICAgLy8g44Oi44O844K344On44Oz44Gr44KI44KL44OR44Op44Oh44O844K/5pu05paw44Gu5pyJ54ShXG4gICAgbGV0IG1vdGlvblVwZGF0ZWQgPSBmYWxzZTtcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB0aGlzLl9tb2RlbC5sb2FkUGFyYW1ldGVycygpOyAvLyDliY3lm57jgrvjg7zjg5bjgZXjgozjgZ/nirbmhYvjgpLjg63jg7zjg4lcbiAgICBpZiAodGhpcy5fbW90aW9uTWFuYWdlci5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruWGjeeUn+OBjOOBquOBhOWgtOWQiOOAgeW+heapn+ODouODvOOCt+ODp+ODs+OBruS4reOBi+OCieODqeODs+ODgOODoOOBp+WGjeeUn+OBmeOCi1xuICAgICAgdGhpcy5zdGFydFJhbmRvbU1vdGlvbihcbiAgICAgICAgTEFwcERlZmluZS5Nb3Rpb25Hcm91cElkbGUsXG4gICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlJZGxlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3Rpb25VcGRhdGVkID0gdGhpcy5fbW90aW9uTWFuYWdlci51cGRhdGVNb3Rpb24oXG4gICAgICAgIHRoaXMuX21vZGVsLFxuICAgICAgICBkZWx0YVRpbWVTZWNvbmRzXG4gICAgICApOyAvLyDjg6Ljg7zjgrfjg6fjg7PjgpLmm7TmlrBcbiAgICB9XG4gICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTsgLy8g54q25oWL44KS5L+d5a2YXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8g44G+44Gw44Gf44GNXG4gICAgaWYgKCFtb3Rpb25VcGRhdGVkKSB7XG4gICAgICBpZiAodGhpcy5fZXllQmxpbmsgIT0gbnVsbCkge1xuICAgICAgICAvLyDjg6HjgqTjg7Pjg6Ljg7zjgrfjg6fjg7Pjga7mm7TmlrDjgYzjgarjgYTjgajjgY1cbiAgICAgICAgdGhpcy5fZXllQmxpbmsudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7IC8vIOebruODkeODgVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9leHByZXNzaW9uTWFuYWdlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlci51cGRhdGVNb3Rpb24odGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpOyAvLyDooajmg4Xjgafjg5Hjg6njg6Hjg7zjgr/mm7TmlrDvvIjnm7jlr77lpInljJbvvIlcbiAgICB9XG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovlpInljJZcbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovpoZTjga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUFuZ2xlWCwgdGhpcy5fZHJhZ1ggKiAzMCk7IC8vIC0zMOOBi+OCiTMw44Gu5YCk44KS5Yqg44GI44KLXG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2lkUGFyYW1BbmdsZVksIHRoaXMuX2RyYWdZICogMzApO1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1BbmdsZVosXG4gICAgICB0aGlzLl9kcmFnWCAqIHRoaXMuX2RyYWdZICogLTMwXG4gICAgKTtcblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+S9k+OBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYLFxuICAgICAgdGhpcy5fZHJhZ1ggKiAxMFxuICAgICk7IC8vIC0xMOOBi+OCiTEw44Gu5YCk44KS5Yqg44GI44KLXG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovnm67jga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUV5ZUJhbGxYLCB0aGlzLl9kcmFnWCk7IC8vIC0x44GL44KJMeOBruWApOOCkuWKoOOBiOOCi1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtRXllQmFsbFksIHRoaXMuX2RyYWdZKTtcblxuICAgIC8vIOWRvOWQuOOBquOBqVxuICAgIGlmICh0aGlzLl9icmVhdGggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYnJlYXRoLnVwZGF0ZVBhcmFtZXRlcnModGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOeJqeeQhua8lOeul+OBruioreWumlxuICAgIGlmICh0aGlzLl9waHlzaWNzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3BoeXNpY3MuZXZhbHVhdGUodGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOODquODg+ODl+OCt+ODs+OCr+OBruioreWumlxuICAgIGlmICh0aGlzLl9saXBzeW5jKSB7XG4gICAgICBsZXQgdmFsdWUgPSAwLjA7IC8vIOODquOCouODq+OCv+OCpOODoOOBp+ODquODg+ODl+OCt+ODs+OCr+OCkuihjOOBhuWgtOWQiOOAgeOCt+OCueODhuODoOOBi+OCiemfs+mHj+OCkuWPluW+l+OBl+OBpuOAgTB+MeOBruevhOWbsuOBp+WApOOCkuWFpeWKm+OBl+OBvuOBmeOAglxuXG4gICAgICB0aGlzLl93YXZGaWxlSGFuZGxlci51cGRhdGUoZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgICB2YWx1ZSA9IHRoaXMuX3dhdkZpbGVIYW5kbGVyLmdldFJtcygpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpcFN5bmNJZHMuZ2V0U2l6ZSgpOyArK2kpIHtcbiAgICAgICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2xpcFN5bmNJZHMuYXQoaSksIHZhbHVlLCAwLjgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOODneODvOOCuuOBruioreWumlxuICAgIGlmICh0aGlzLl9wb3NlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3Bvc2UudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWwudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog5byV5pWw44Gn5oyH5a6a44GX44Gf44Oi44O844K344On44Oz44Gu5YaN55Sf44KS6ZaL5aeL44GZ44KLXG4gICAqIEBwYXJhbSBncm91cCDjg6Ljg7zjgrfjg6fjg7PjgrDjg6vjg7zjg5flkI1cbiAgICogQHBhcmFtIG5vIOOCsOODq+ODvOODl+WGheOBrueVquWPt1xuICAgKiBAcGFyYW0gcHJpb3JpdHkg5YSq5YWI5bqmXG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDplovlp4vjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7orZjliKXnlarlj7fjgpLov5TjgZnjgILlgIvliKXjga7jg6Ljg7zjgrfjg6fjg7PjgYzntYLkuobjgZfjgZ/jgYvlkKbjgYvjgpLliKTlrprjgZnjgotpc0ZpbmlzaGVkKCnjga7lvJXmlbDjgafkvb/nlKjjgZnjgovjgILplovlp4vjgafjgY3jgarjgYTmmYLjga9bLTFdXG4gICAqL1xuICBwdWJsaWMgc3RhcnRNb3Rpb24oXG4gICAgZ3JvdXA6IHN0cmluZyxcbiAgICBubzogbnVtYmVyLFxuICAgIHByaW9yaXR5OiBudW1iZXIsXG4gICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUge1xuICAgIGlmIChwcmlvcml0eSA9PSBMQXBwRGVmaW5lLlByaW9yaXR5Rm9yY2UpIHtcbiAgICAgIHRoaXMuX21vdGlvbk1hbmFnZXIuc2V0UmVzZXJ2ZVByaW9yaXR5KHByaW9yaXR5KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9tb3Rpb25NYW5hZ2VyLnJlc2VydmVNb3Rpb24ocHJpb3JpdHkpKSB7XG4gICAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFwiW0FQUF1jYW4ndCBzdGFydCBtb3Rpb24uXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgbW90aW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmlsZU5hbWUoZ3JvdXAsIG5vKTtcblxuICAgIC8vIGV4KSBpZGxlXzBcbiAgICBjb25zdCBuYW1lID0gYCR7Z3JvdXB9XyR7bm99YDtcbiAgICBsZXQgbW90aW9uOiBDdWJpc21Nb3Rpb24gPSB0aGlzLl9tb3Rpb25zLmdldFZhbHVlKG5hbWUpIGFzIEN1YmlzbU1vdGlvbjtcbiAgICBsZXQgYXV0b0RlbGV0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1vdGlvbiA9PSBudWxsKSB7XG4gICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHttb3Rpb25GaWxlTmFtZX1gKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgbW90aW9uID0gdGhpcy5sb2FkTW90aW9uKFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyXG4gICAgICAgICAgKTtcbiAgICAgICAgICBsZXQgZmFkZVRpbWU6IG51bWJlciA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GYWRlSW5UaW1lVmFsdWUoXG4gICAgICAgICAgICBncm91cCxcbiAgICAgICAgICAgIG5vXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIG1vdGlvbi5zZXRGYWRlSW5UaW1lKGZhZGVUaW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmYWRlVGltZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GYWRlT3V0VGltZVZhbHVlKGdyb3VwLCBubyk7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgbW90aW9uLnNldEZhZGVPdXRUaW1lKGZhZGVUaW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtb3Rpb24uc2V0RWZmZWN0SWRzKHRoaXMuX2V5ZUJsaW5rSWRzLCB0aGlzLl9saXBTeW5jSWRzKTtcbiAgICAgICAgICBhdXRvRGVsZXRlID0gdHJ1ZTsgLy8g57WC5LqG5pmC44Gr44Oh44Oi44Oq44GL44KJ5YmK6ZmkXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3Rpb24uc2V0RmluaXNoZWRNb3Rpb25IYW5kbGVyKG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvL3ZvaWNlXG4gICAgY29uc3Qgdm9pY2UgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uU291bmRGaWxlTmFtZShncm91cCwgbm8pO1xuICAgIGlmICh2b2ljZS5sb2NhbGVDb21wYXJlKCcnKSAhPSAwKSB7XG4gICAgICBsZXQgcGF0aCA9IHZvaWNlO1xuICAgICAgcGF0aCA9IHRoaXMuX21vZGVsSG9tZURpciArIHBhdGg7XG4gICAgICB0aGlzLl93YXZGaWxlSGFuZGxlci5zdGFydChwYXRoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF1zdGFydCBtb3Rpb246IFske2dyb3VwfV8ke25vfWApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbW90aW9uTWFuYWdlci5zdGFydE1vdGlvblByaW9yaXR5KFxuICAgICAgbW90aW9uLFxuICAgICAgYXV0b0RlbGV0ZSxcbiAgICAgIHByaW9yaXR5XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6njg7Pjg4Djg6DjgavpgbjjgbDjgozjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7lho3nlJ/jgpLplovlp4vjgZnjgovjgIJcbiAgICogQHBhcmFtIGdyb3VwIOODouODvOOCt+ODp+ODs+OCsOODq+ODvOODl+WQjVxuICAgKiBAcGFyYW0gcHJpb3JpdHkg5YSq5YWI5bqmXG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDplovlp4vjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7orZjliKXnlarlj7fjgpLov5TjgZnjgILlgIvliKXjga7jg6Ljg7zjgrfjg6fjg7PjgYzntYLkuobjgZfjgZ/jgYvlkKbjgYvjgpLliKTlrprjgZnjgotpc0ZpbmlzaGVkKCnjga7lvJXmlbDjgafkvb/nlKjjgZnjgovjgILplovlp4vjgafjgY3jgarjgYTmmYLjga9bLTFdXG4gICAqL1xuICBwdWJsaWMgc3RhcnRSYW5kb21Nb3Rpb24oXG4gICAgZ3JvdXA6IHN0cmluZyxcbiAgICBwcmlvcml0eTogbnVtYmVyLFxuICAgIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyPzogRmluaXNoZWRNb3Rpb25DYWxsYmFja1xuICApOiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5SGFuZGxlIHtcbiAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkNvdW50KGdyb3VwKSA9PSAwKSB7XG4gICAgICByZXR1cm4gSW52YWxpZE1vdGlvblF1ZXVlRW50cnlIYW5kbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBubzogbnVtYmVyID0gTWF0aC5mbG9vcihcbiAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uQ291bnQoZ3JvdXApXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLnN0YXJ0TW90aW9uKGdyb3VwLCBubywgcHJpb3JpdHksIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlvJXmlbDjgafmjIflrprjgZfjgZ/ooajmg4Xjg6Ljg7zjgrfjg6fjg7PjgpLjgrvjg4Pjg4jjgZnjgotcbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25JZCDooajmg4Xjg6Ljg7zjgrfjg6fjg7Pjga5JRFxuICAgKi9cbiAgcHVibGljIHNldEV4cHJlc3Npb24oZXhwcmVzc2lvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtb3Rpb246IEFDdWJpc21Nb3Rpb24gPSB0aGlzLl9leHByZXNzaW9ucy5nZXRWYWx1ZShleHByZXNzaW9uSWQpO1xuXG4gICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdZXhwcmVzc2lvbjogWyR7ZXhwcmVzc2lvbklkfV1gKTtcbiAgICB9XG5cbiAgICBpZiAobW90aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyLnN0YXJ0TW90aW9uUHJpb3JpdHkoXG4gICAgICAgIG1vdGlvbixcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlGb3JjZVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF1leHByZXNzaW9uWyR7ZXhwcmVzc2lvbklkfV0gaXMgbnVsbGApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg6njg7Pjg4Djg6DjgavpgbjjgbDjgozjgZ/ooajmg4Xjg6Ljg7zjgrfjg6fjg7PjgpLjgrvjg4Pjg4jjgZnjgotcbiAgICovXG4gIHB1YmxpYyBzZXRSYW5kb21FeHByZXNzaW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9leHByZXNzaW9ucy5nZXRTaXplKCkgPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLl9leHByZXNzaW9ucy5nZXRTaXplKCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9leHByZXNzaW9ucy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgaWYgKGkgPT0gbm8pIHtcbiAgICAgICAgY29uc3QgbmFtZTogc3RyaW5nID0gdGhpcy5fZXhwcmVzc2lvbnMuX2tleVZhbHVlc1tpXS5maXJzdDtcbiAgICAgICAgdGhpcy5zZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOOCpOODmeODs+ODiOOBrueZuueBq+OCkuWPl+OBkeWPluOCi1xuICAgKi9cbiAgcHVibGljIG1vdGlvbkV2ZW50RmlyZWQoZXZlbnRWYWx1ZTogY3NtU3RyaW5nKTogdm9pZCB7XG4gICAgQ3ViaXNtTG9nSW5mbygnezB9IGlzIGZpcmVkIG9uIExBcHBNb2RlbCEhJywgZXZlbnRWYWx1ZS5zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlvZPjgZ/jgorliKTlrprjg4bjgrnjg4hcbiAgICog5oyH5a6a77yp77yk44Gu6aCC54K544Oq44K544OI44GL44KJ55+p5b2i44KS6KiI566X44GX44CB5bqn5qiZ44KS44GM55+p5b2i56+E5Zuy5YaF44GL5Yik5a6a44GZ44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBoaXRBcmVuYU5hbWUgIOW9k+OBn+OCiuWIpOWumuOCkuODhuOCueODiOOBmeOCi+WvvuixoeOBrklEXG4gICAqIEBwYXJhbSB4ICAgICAgICAgICAgIOWIpOWumuOCkuihjOOBhljluqfmqJlcbiAgICogQHBhcmFtIHkgICAgICAgICAgICAg5Yik5a6a44KS6KGM44GGWeW6p+aomVxuICAgKi9cbiAgcHVibGljIGhpdFRlc3QoaGl0QXJlbmFOYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgLy8g6YCP5piO5pmC44Gv5b2T44Gf44KK5Yik5a6a54Sh44GX44CCXG4gICAgaWYgKHRoaXMuX29wYWNpdHkgPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgY291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRIaXRBcmVhc0NvdW50KCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0SGl0QXJlYU5hbWUoaSkgPT0gaGl0QXJlbmFOYW1lKSB7XG4gICAgICAgIGNvbnN0IGRyYXdJZDogQ3ViaXNtSWRIYW5kbGUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0SGl0QXJlYUlkKGkpO1xuICAgICAgICByZXR1cm4gdGhpcy5pc0hpdChkcmF3SWQsIHgsIHkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgpLjgrDjg6vjg7zjg5flkI3jgYvjgonkuIDmi6zjgafjg63jg7zjg4njgZnjgovjgIJcbiAgICog44Oi44O844K344On44Oz44OH44O844K/44Gu5ZCN5YmN44Gv5YaF6YOo44GnTW9kZWxTZXR0aW5n44GL44KJ5Y+W5b6X44GZ44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBncm91cCDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jga7jgrDjg6vjg7zjg5flkI1cbiAgICovXG4gIHB1YmxpYyBwcmVMb2FkTW90aW9uR3JvdXAoZ3JvdXA6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkNvdW50KGdyb3VwKTsgaSsrKSB7XG4gICAgICBjb25zdCBtb3Rpb25GaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GaWxlTmFtZShncm91cCwgaSk7XG5cbiAgICAgIC8vIGV4KSBpZGxlXzBcbiAgICAgIGNvbnN0IG5hbWUgPSBgJHtncm91cH1fJHtpfWA7XG4gICAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFxuICAgICAgICAgIGBbQVBQXWxvYWQgbW90aW9uOiAke21vdGlvbkZpbGVOYW1lfSA9PiBbJHtuYW1lfV1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke21vdGlvbkZpbGVOYW1lfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhhcnJheUJ1ZmZlcilcbiAgICAgICAgICBjb25zdCB0bXBNb3Rpb246IEN1YmlzbU1vdGlvbiA9IHRoaXMubG9hZE1vdGlvbihcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IGZhZGVUaW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVJblRpbWVWYWx1ZShncm91cCwgaSk7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgdG1wTW90aW9uLnNldEZhZGVJblRpbWUoZmFkZVRpbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZhZGVUaW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVPdXRUaW1lVmFsdWUoZ3JvdXAsIGkpO1xuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIHRtcE1vdGlvbi5zZXRGYWRlT3V0VGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRtcE1vdGlvbi5zZXRFZmZlY3RJZHModGhpcy5fZXllQmxpbmtJZHMsIHRoaXMuX2xpcFN5bmNJZHMpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX21vdGlvbnMuZ2V0VmFsdWUobmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgQUN1YmlzbU1vdGlvbi5kZWxldGUodGhpcy5fbW90aW9ucy5nZXRWYWx1ZShuYW1lKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fbW90aW9ucy5zZXRWYWx1ZShuYW1lLCB0bXBNb3Rpb24pO1xuXG4gICAgICAgICAgdGhpcy5fbW90aW9uQ291bnQrKztcbiAgICAgICAgICBpZiAodGhpcy5fbW90aW9uQ291bnQgPj0gdGhpcy5fYWxsTW90aW9uQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFRleHR1cmU7XG5cbiAgICAgICAgICAgIC8vIOWFqOOBpuOBruODouODvOOCt+ODp+ODs+OCkuWBnOatouOBmeOCi1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5zdG9wQWxsTW90aW9ucygpO1xuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwVGV4dHVyZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zdGFydFVwKGdsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgZnjgbnjgabjga7jg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlTW90aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9tb3Rpb25zLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog5YWo44Gm44Gu6KGo5oOF44OH44O844K/44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZUV4cHJlc3Npb25zKCk6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44KS5o+P55S744GZ44KL5Yem55CG44CC44Oi44OH44Or44KS5o+P55S744GZ44KL56m66ZaT44GuVmlldy1Qcm9qZWN0aW9u6KGM5YiX44KS5rih44GZ44CCXG4gICAqL1xuICBwdWJsaWMgZG9EcmF3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbCA9PSBudWxsKSByZXR1cm47XG5cbiAgICAvLyDjgq3jg6Pjg7Pjg5DjgrnjgrXjgqTjgrrjgpLmuKHjgZlcbiAgICBjb25zdCB2aWV3cG9ydDogbnVtYmVyW10gPSBbMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XTtcblxuICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zZXRSZW5kZXJTdGF0ZShmcmFtZUJ1ZmZlciwgdmlld3BvcnQpO1xuICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5kcmF3TW9kZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovlh6bnkIbjgILjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovnqbrplpPjga5WaWV3LVByb2plY3Rpb27ooYzliJfjgpLmuKHjgZnjgIJcbiAgICovXG4gIHB1YmxpYyBkcmF3KG1hdHJpeDogQ3ViaXNtTWF0cml4NDQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbW9kZWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIOWQhOiqreOBv+i+vOOBv+e1guS6huW+jFxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwKSB7XG4gICAgICBtYXRyaXgubXVsdGlwbHlCeU1hdHJpeCh0aGlzLl9tb2RlbE1hdHJpeCk7XG5cbiAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zZXRNdnBNYXRyaXgobWF0cml4KTtcblxuICAgICAgdGhpcy5kb0RyYXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX21vZGVsU2V0dGluZyA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWxIb21lRGlyID0gbnVsbDtcbiAgICB0aGlzLl91c2VyVGltZVNlY29uZHMgPSAwLjA7XG5cbiAgICB0aGlzLl9leWVCbGlua0lkcyA9IG5ldyBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+KCk7XG4gICAgdGhpcy5fbGlwU3luY0lkcyA9IG5ldyBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+KCk7XG5cbiAgICB0aGlzLl9tb3Rpb25zID0gbmV3IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+KCk7XG4gICAgdGhpcy5fZXhwcmVzc2lvbnMgPSBuZXcgY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj4oKTtcblxuICAgIHRoaXMuX2hpdEFyZWEgPSBuZXcgY3NtVmVjdG9yPGNzbVJlY3Q+KCk7XG4gICAgdGhpcy5fdXNlckFyZWEgPSBuZXcgY3NtVmVjdG9yPGNzbVJlY3Q+KCk7XG5cbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVYID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVYXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVZID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVZXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVaID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVaXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtRXllQmFsbFggPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1FeWVCYWxsWFxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUV5ZUJhbGxZID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtRXllQmFsbFlcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQm9keUFuZ2xlWFxuICAgICk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRBc3NldHM7XG4gICAgdGhpcy5fZXhwcmVzc2lvbkNvdW50ID0gMDtcbiAgICB0aGlzLl90ZXh0dXJlQ291bnQgPSAwO1xuICAgIHRoaXMuX21vdGlvbkNvdW50ID0gMDtcbiAgICB0aGlzLl9hbGxNb3Rpb25Db3VudCA9IDA7XG4gICAgdGhpcy5fd2F2RmlsZUhhbmRsZXIgPSBuZXcgTEFwcFdhdkZpbGVIYW5kbGVyKCk7XG4gIH1cblxuICBfbW9kZWxTZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nOyAvLyDjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDmg4XloLFcbiAgX21vZGVsSG9tZURpcjogc3RyaW5nOyAvLyDjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDjgYznva7jgYvjgozjgZ/jg4fjgqPjg6zjgq/jg4jjg6pcbiAgX3VzZXJUaW1lU2Vjb25kczogbnVtYmVyOyAvLyDjg4fjg6vjgr/mmYLplpPjga7nqY3nrpflgKRb56eSXVxuXG4gIF9leWVCbGlua0lkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g44Oi44OH44Or44Gr6Kit5a6a44GV44KM44Gf556s44GN5qmf6IO955So44OR44Op44Oh44O844K/SURcbiAgX2xpcFN5bmNJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOODouODh+ODq+OBq+ioreWumuOBleOCjOOBn+ODquODg+ODl+OCt+ODs+OCr+apn+iDveeUqOODkeODqeODoeODvOOCv0lEXG5cbiAgX21vdGlvbnM6IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+OyAvLyDoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg6Ljg7zjgrfjg6fjg7Pjga7jg6rjgrnjg4hcbiAgX2V4cHJlc3Npb25zOiBjc21NYXA8c3RyaW5nLCBBQ3ViaXNtTW90aW9uPjsgLy8g6Kqt44G/6L6844G+44KM44Gm44GE44KL6KGo5oOF44Gu44Oq44K544OIXG5cbiAgX2hpdEFyZWE6IGNzbVZlY3Rvcjxjc21SZWN0PjtcbiAgX3VzZXJBcmVhOiBjc21WZWN0b3I8Y3NtUmVjdD47XG5cbiAgX2lkUGFyYW1BbmdsZVg6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVhcbiAgX2lkUGFyYW1BbmdsZVk6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVlcbiAgX2lkUGFyYW1BbmdsZVo6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVpcbiAgX2lkUGFyYW1FeWVCYWxsWDogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUV5ZUJhbGxYXG4gIF9pZFBhcmFtRXllQmFsbFk6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1FeWVCQWxsWVxuICBfaWRQYXJhbUJvZHlBbmdsZVg6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1Cb2R5QW5nbGVYXG5cbiAgX3N0YXRlOiBudW1iZXI7IC8vIOePvuWcqOOBruOCueODhuODvOOCv+OCueeuoeeQhueUqFxuICBfZXhwcmVzc2lvbkNvdW50OiBudW1iZXI7IC8vIOihqOaDheODh+ODvOOCv+OCq+OCpuODs+ODiFxuICBfdGV4dHVyZUNvdW50OiBudW1iZXI7IC8vIOODhuOCr+OCueODgeODo+OCq+OCpuODs+ODiFxuICBfbW90aW9uQ291bnQ6IG51bWJlcjsgLy8g44Oi44O844K344On44Oz44OH44O844K/44Kr44Km44Oz44OIXG4gIF9hbGxNb3Rpb25Db3VudDogbnVtYmVyOyAvLyDjg6Ljg7zjgrfjg6fjg7Pnt4/mlbBcbiAgX3dhdkZpbGVIYW5kbGVyOiBMQXBwV2F2RmlsZUhhbmRsZXI7IC8vd2F244OV44Kh44Kk44Or44OP44Oz44OJ44OpXG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiNmMzYTkyZWEwMTRiOTFhZTVkNWRcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==