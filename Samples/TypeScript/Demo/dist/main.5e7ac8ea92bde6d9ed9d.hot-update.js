"use strict";
self["webpackHotUpdateLive2d"]("main",{

/***/ "../../../Framework/src/motion/cubismmotion.ts":
/*!*****************************************************!*\
  !*** ../../../Framework/src/motion/cubismmotion.ts ***!
  \*****************************************************/
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
exports.Live2DCubismFramework = exports.CubismMotion = void 0;
var live2dcubismframework_1 = __webpack_require__(/*! ../live2dcubismframework */ "../../../Framework/src/live2dcubismframework.ts");
var cubismmath_1 = __webpack_require__(/*! ../math/cubismmath */ "../../../Framework/src/math/cubismmath.ts");
var csmstring_1 = __webpack_require__(/*! ../type/csmstring */ "../../../Framework/src/type/csmstring.ts");
var cubismdebug_1 = __webpack_require__(/*! ../utils/cubismdebug */ "../../../Framework/src/utils/cubismdebug.ts");
var acubismmotion_1 = __webpack_require__(/*! ./acubismmotion */ "../../../Framework/src/motion/acubismmotion.ts");
var cubismmotioninternal_1 = __webpack_require__(/*! ./cubismmotioninternal */ "../../../Framework/src/motion/cubismmotioninternal.ts");
var cubismmotionjson_1 = __webpack_require__(/*! ./cubismmotionjson */ "../../../Framework/src/motion/cubismmotionjson.ts");
var EffectNameEyeBlink = 'EyeBlink';
var EffectNameLipSync = 'LipSync';
var TargetNameModel = 'Model';
var TargetNameParameter = 'Parameter';
var TargetNamePartOpacity = 'PartOpacity';
var UseOldBeziersCurveMotion = false;
function lerpPoints(a, b, t) {
    var result = new cubismmotioninternal_1.CubismMotionPoint();
    result.time = a.time + (b.time - a.time) * t;
    result.value = a.value + (b.value - a.value) * t;
    return result;
}
function linearEvaluate(points, time) {
    var t = (time - points[0].time) / (points[1].time - points[0].time);
    if (t < 0.0) {
        t = 0.0;
    }
    return points[0].value + (points[1].value - points[0].value) * t;
}
function bezierEvaluate(points, time) {
    var t = (time - points[0].time) / (points[3].time - points[0].time);
    if (t < 0.0) {
        t = 0.0;
    }
    var p01 = lerpPoints(points[0], points[1], t);
    var p12 = lerpPoints(points[1], points[2], t);
    var p23 = lerpPoints(points[2], points[3], t);
    var p012 = lerpPoints(p01, p12, t);
    var p123 = lerpPoints(p12, p23, t);
    return lerpPoints(p012, p123, t).value;
}
function bezierEvaluateBinarySearch(points, time) {
    var x_error = 0.01;
    var x = time;
    var x1 = points[0].time;
    var x2 = points[3].time;
    var cx1 = points[1].time;
    var cx2 = points[2].time;
    var ta = 0.0;
    var tb = 1.0;
    var t = 0.0;
    var i = 0;
    for (var var33 = true; i < 20; ++i) {
        if (x < x1 + x_error) {
            t = ta;
            break;
        }
        if (x2 - x_error < x) {
            t = tb;
            break;
        }
        var centerx = (cx1 + cx2) * 0.5;
        cx1 = (x1 + cx1) * 0.5;
        cx2 = (x2 + cx2) * 0.5;
        var ctrlx12 = (cx1 + centerx) * 0.5;
        var ctrlx21 = (cx2 + centerx) * 0.5;
        centerx = (ctrlx12 + ctrlx21) * 0.5;
        if (x < centerx) {
            tb = (ta + tb) * 0.5;
            if (centerx - x_error < x) {
                t = tb;
                break;
            }
            x2 = centerx;
            cx2 = ctrlx12;
        }
        else {
            ta = (ta + tb) * 0.5;
            if (x < centerx + x_error) {
                t = ta;
                break;
            }
            x1 = centerx;
            cx1 = ctrlx21;
        }
    }
    if (i == 20) {
        t = (ta + tb) * 0.5;
    }
    if (t < 0.0) {
        t = 0.0;
    }
    if (t > 1.0) {
        t = 1.0;
    }
    var p01 = lerpPoints(points[0], points[1], t);
    var p12 = lerpPoints(points[1], points[2], t);
    var p23 = lerpPoints(points[2], points[3], t);
    var p012 = lerpPoints(p01, p12, t);
    var p123 = lerpPoints(p12, p23, t);
    return lerpPoints(p012, p123, t).value;
}
function bezierEvaluateCardanoInterpretation(points, time) {
    var x = time;
    var x1 = points[0].time;
    var x2 = points[3].time;
    var cx1 = points[1].time;
    var cx2 = points[2].time;
    var a = x2 - 3.0 * cx2 + 3.0 * cx1 - x1;
    var b = 3.0 * cx2 - 6.0 * cx1 + 3.0 * x1;
    var c = 3.0 * cx1 - 3.0 * x1;
    var d = x1 - x;
    var t = cubismmath_1.CubismMath.cardanoAlgorithmForBezier(a, b, c, d);
    var p01 = lerpPoints(points[0], points[1], t);
    var p12 = lerpPoints(points[1], points[2], t);
    var p23 = lerpPoints(points[2], points[3], t);
    var p012 = lerpPoints(p01, p12, t);
    var p123 = lerpPoints(p12, p23, t);
    return lerpPoints(p012, p123, t).value;
}
function steppedEvaluate(points, time) {
    return points[0].value;
}
function inverseSteppedEvaluate(points, time) {
    return points[1].value;
}
function evaluateCurve(motionData, index, time) {
    var curve = motionData.curves.at(index);
    var target = -1;
    var totalSegmentCount = curve.baseSegmentIndex + curve.segmentCount;
    var pointPosition = 0;
    for (var i = curve.baseSegmentIndex; i < totalSegmentCount; ++i) {
        pointPosition =
            motionData.segments.at(i).basePointIndex +
                (motionData.segments.at(i).segmentType ==
                    cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier
                    ? 3
                    : 1);
        var pos = motionData.points.at(pointPosition);
        if (!pos || pos.time > time) {
            target = i;
            break;
        }
    }
    if (target == -1) {
        var pos = motionData.points.at(pointPosition);
        return !pospos.value;
    }
    var segment = motionData.segments.at(target);
    return segment && segment.evaluate(motionData.points.get(segment.basePointIndex), time);
}
var CubismMotion = (function (_super) {
    __extends(CubismMotion, _super);
    function CubismMotion() {
        var _this = _super.call(this) || this;
        _this._sourceFrameRate = 30.0;
        _this._loopDurationSeconds = -1.0;
        _this._isLoop = false;
        _this._isLoopFadeIn = true;
        _this._lastWeight = 0.0;
        _this._motionData = null;
        _this._modelCurveIdEyeBlink = null;
        _this._modelCurveIdLipSync = null;
        _this._eyeBlinkParameterIds = null;
        _this._lipSyncParameterIds = null;
        return _this;
    }
    CubismMotion.create = function (buffer, size, onFinishedMotionHandler) {
        var ret = new CubismMotion();
        ret.parse(buffer, size);
        ret._sourceFrameRate = ret._motionData.fps;
        ret._loopDurationSeconds = ret._motionData.duration;
        ret._onFinishedMotion = onFinishedMotionHandler;
        return ret;
    };
    CubismMotion.prototype.doUpdateParameters = function (model, userTimeSeconds, fadeWeight, motionQueueEntry) {
        if (this._modelCurveIdEyeBlink == null) {
            this._modelCurveIdEyeBlink = live2dcubismframework_1.CubismFramework.getIdManager().getId(EffectNameEyeBlink);
        }
        if (this._modelCurveIdLipSync == null) {
            this._modelCurveIdLipSync = live2dcubismframework_1.CubismFramework.getIdManager().getId(EffectNameLipSync);
        }
        var timeOffsetSeconds = userTimeSeconds - motionQueueEntry.getStartTime();
        if (timeOffsetSeconds < 0.0) {
            timeOffsetSeconds = 0.0;
        }
        var lipSyncValue = Number.MAX_VALUE;
        var eyeBlinkValue = Number.MAX_VALUE;
        var MaxTargetSize = 64;
        var lipSyncFlags = 0;
        var eyeBlinkFlags = 0;
        if (this._eyeBlinkParameterIds.getSize() > MaxTargetSize) {
            (0, cubismdebug_1.CubismLogDebug)('too many eye blink targets : {0}', this._eyeBlinkParameterIds.getSize());
        }
        if (this._lipSyncParameterIds.getSize() > MaxTargetSize) {
            (0, cubismdebug_1.CubismLogDebug)('too many lip sync targets : {0}', this._lipSyncParameterIds.getSize());
        }
        var tmpFadeIn = this._fadeInSeconds <= 0.0
            ? 1.0
            : cubismmath_1.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                this._fadeInSeconds);
        var tmpFadeOut = this._fadeOutSeconds <= 0.0 || motionQueueEntry.getEndTime() < 0.0
            ? 1.0
            : cubismmath_1.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                this._fadeOutSeconds);
        var value;
        var c, parameterIndex;
        var time = timeOffsetSeconds;
        if (this._isLoop) {
            while (time > this._motionData.duration) {
                time -= this._motionData.duration;
            }
        }
        var curves = this._motionData.curves;
        for (c = 0; c < this._motionData.curveCount &&
            curves.at(c).type ==
                cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Model; ++c) {
            value = evaluateCurve(this._motionData, c, time);
            if (curves.at(c).id == this._modelCurveIdEyeBlink) {
                eyeBlinkValue = value;
            }
            else if (curves.at(c).id == this._modelCurveIdLipSync) {
                lipSyncValue = value;
            }
        }
        var parameterMotionCurveCount = 0;
        for (; c < this._motionData.curveCount &&
            curves.at(c).type ==
                cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter; ++c) {
            parameterMotionCurveCount++;
            parameterIndex = model.getParameterIndex(curves.at(c).id);
            if (parameterIndex == -1) {
                continue;
            }
            var sourceValue = model.getParameterValueByIndex(parameterIndex);
            value = evaluateCurve(this._motionData, c, time);
            if (eyeBlinkValue != Number.MAX_VALUE) {
                for (var i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    if (this._eyeBlinkParameterIds.at(i) == curves.at(c).id) {
                        value *= eyeBlinkValue;
                        eyeBlinkFlags |= 1 << i;
                        break;
                    }
                }
            }
            if (lipSyncValue != Number.MAX_VALUE) {
                for (var i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    if (this._lipSyncParameterIds.at(i) == curves.at(c).id) {
                        value += lipSyncValue;
                        lipSyncFlags |= 1 << i;
                        break;
                    }
                }
            }
            var v = void 0;
            if (curves.at(c).fadeInTime < 0.0 && curves.at(c).fadeOutTime < 0.0) {
                v = sourceValue + (value - sourceValue) * fadeWeight;
            }
            else {
                var fin = void 0;
                var fout = void 0;
                if (curves.at(c).fadeInTime < 0.0) {
                    fin = tmpFadeIn;
                }
                else {
                    fin =
                        curves.at(c).fadeInTime == 0.0
                            ? 1.0
                            : cubismmath_1.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                                curves.at(c).fadeInTime);
                }
                if (curves.at(c).fadeOutTime < 0.0) {
                    fout = tmpFadeOut;
                }
                else {
                    fout =
                        curves.at(c).fadeOutTime == 0.0 ||
                            motionQueueEntry.getEndTime() < 0.0
                            ? 1.0
                            : cubismmath_1.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                                curves.at(c).fadeOutTime);
                }
                var paramWeight = this._weight * fin * fout;
                v = sourceValue + (value - sourceValue) * paramWeight;
            }
            model.setParameterValueByIndex(parameterIndex, v, 1.0);
        }
        {
            if (eyeBlinkValue != Number.MAX_VALUE) {
                for (var i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    var sourceValue = model.getParameterValueById(this._eyeBlinkParameterIds.at(i));
                    if ((eyeBlinkFlags >> i) & 0x01) {
                        continue;
                    }
                    var v = sourceValue + (eyeBlinkValue - sourceValue) * fadeWeight;
                    model.setParameterValueById(this._eyeBlinkParameterIds.at(i), v);
                }
            }
            if (lipSyncValue != Number.MAX_VALUE) {
                for (var i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    var sourceValue = model.getParameterValueById(this._lipSyncParameterIds.at(i));
                    if ((lipSyncFlags >> i) & 0x01) {
                        continue;
                    }
                    var v = sourceValue + (lipSyncValue - sourceValue) * fadeWeight;
                    model.setParameterValueById(this._lipSyncParameterIds.at(i), v);
                }
            }
        }
        for (; c < this._motionData.curveCount &&
            curves.at(c).type ==
                cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity; ++c) {
            parameterIndex = model.getParameterIndex(curves.at(c).id);
            if (parameterIndex == -1) {
                continue;
            }
            value = evaluateCurve(this._motionData, c, time);
            model.setParameterValueByIndex(parameterIndex, value);
        }
        if (timeOffsetSeconds >= this._motionData.duration) {
            if (this._isLoop) {
                motionQueueEntry.setStartTime(userTimeSeconds);
                if (this._isLoopFadeIn) {
                    motionQueueEntry.setFadeInStartTime(userTimeSeconds);
                }
            }
            else {
                if (this._onFinishedMotion) {
                    this._onFinishedMotion(this);
                }
                motionQueueEntry.setIsFinished(true);
            }
        }
        this._lastWeight = fadeWeight;
    };
    CubismMotion.prototype.setIsLoop = function (loop) {
        this._isLoop = loop;
    };
    CubismMotion.prototype.isLoop = function () {
        return this._isLoop;
    };
    CubismMotion.prototype.setIsLoopFadeIn = function (loopFadeIn) {
        this._isLoopFadeIn = loopFadeIn;
    };
    CubismMotion.prototype.isLoopFadeIn = function () {
        return this._isLoopFadeIn;
    };
    CubismMotion.prototype.getDuration = function () {
        return this._isLoop ? -1.0 : this._loopDurationSeconds;
    };
    CubismMotion.prototype.getLoopDuration = function () {
        return this._loopDurationSeconds;
    };
    CubismMotion.prototype.setParameterFadeInTime = function (parameterId, value) {
        var curves = this._motionData.curves;
        for (var i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                curves.at(i).fadeInTime = value;
                return;
            }
        }
    };
    CubismMotion.prototype.setParameterFadeOutTime = function (parameterId, value) {
        var curves = this._motionData.curves;
        for (var i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                curves.at(i).fadeOutTime = value;
                return;
            }
        }
    };
    CubismMotion.prototype.getParameterFadeInTime = function (parameterId) {
        var curves = this._motionData.curves;
        for (var i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                return curves.at(i).fadeInTime;
            }
        }
        return -1;
    };
    CubismMotion.prototype.getParameterFadeOutTime = function (parameterId) {
        var curves = this._motionData.curves;
        for (var i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                return curves.at(i).fadeOutTime;
            }
        }
        return -1;
    };
    CubismMotion.prototype.setEffectIds = function (eyeBlinkParameterIds, lipSyncParameterIds) {
        this._eyeBlinkParameterIds = eyeBlinkParameterIds;
        this._lipSyncParameterIds = lipSyncParameterIds;
    };
    CubismMotion.prototype.release = function () {
        this._motionData = void 0;
        this._motionData = null;
    };
    CubismMotion.prototype.parse = function (motionJson, size) {
        this._motionData = new cubismmotioninternal_1.CubismMotionData();
        var json = new cubismmotionjson_1.CubismMotionJson(motionJson, size);
        this._motionData.duration = json.getMotionDuration();
        this._motionData.loop = json.isMotionLoop();
        this._motionData.curveCount = json.getMotionCurveCount();
        this._motionData.fps = json.getMotionFps();
        this._motionData.eventCount = json.getEventCount();
        var areBeziersRestructed = json.getEvaluationOptionFlag(cubismmotionjson_1.EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted);
        if (json.isExistMotionFadeInTime()) {
            this._fadeInSeconds =
                json.getMotionFadeInTime() < 0.0 ? 1.0 : json.getMotionFadeInTime();
        }
        else {
            this._fadeInSeconds = 1.0;
        }
        if (json.isExistMotionFadeOutTime()) {
            this._fadeOutSeconds =
                json.getMotionFadeOutTime() < 0.0 ? 1.0 : json.getMotionFadeOutTime();
        }
        else {
            this._fadeOutSeconds = 1.0;
        }
        this._motionData.curves.updateSize(this._motionData.curveCount, cubismmotioninternal_1.CubismMotionCurve, true);
        this._motionData.segments.updateSize(json.getMotionTotalSegmentCount(), cubismmotioninternal_1.CubismMotionSegment, true);
        this._motionData.points.updateSize(json.getMotionTotalPointCount(), cubismmotioninternal_1.CubismMotionPoint, true);
        this._motionData.events.updateSize(this._motionData.eventCount, cubismmotioninternal_1.CubismMotionEvent, true);
        var totalPointCount = 0;
        var totalSegmentCount = 0;
        for (var curveCount = 0; curveCount < this._motionData.curveCount; ++curveCount) {
            if (json.getMotionCurveTarget(curveCount) == TargetNameModel) {
                this._motionData.curves.at(curveCount).type =
                    cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
            }
            else if (json.getMotionCurveTarget(curveCount) == TargetNameParameter) {
                this._motionData.curves.at(curveCount).type =
                    cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter;
            }
            else if (json.getMotionCurveTarget(curveCount) == TargetNamePartOpacity) {
                this._motionData.curves.at(curveCount).type =
                    cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity;
            }
            else {
                (0, cubismdebug_1.CubismLogWarning)('Warning : Unable to get segment type from Curve! The number of "CurveCount" may be incorrect!');
            }
            this._motionData.curves.at(curveCount).id = json.getMotionCurveId(curveCount);
            this._motionData.curves.at(curveCount).baseSegmentIndex = totalSegmentCount;
            this._motionData.curves.at(curveCount).fadeInTime = json.isExistMotionCurveFadeInTime(curveCount)
                ? json.getMotionCurveFadeInTime(curveCount)
                : -1.0;
            this._motionData.curves.at(curveCount).fadeOutTime = json.isExistMotionCurveFadeOutTime(curveCount)
                ? json.getMotionCurveFadeOutTime(curveCount)
                : -1.0;
            for (var segmentPosition = 0; segmentPosition < json.getMotionCurveSegmentCount(curveCount);) {
                if (segmentPosition == 0) {
                    if (this._motionData.segments.at(totalSegmentCount)) {
                        this._motionData.segments.at(totalSegmentCount).basePointIndex = totalPointCount;
                    }
                    if (this._motionData.points.at(totalPointCount)) {
                        this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition);
                        this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                    }
                    totalPointCount += 1;
                    segmentPosition += 2;
                }
                else {
                    this._motionData.segments.at(totalSegmentCount).basePointIndex =
                        totalPointCount - 1;
                }
                var segment = json.getMotionCurveSegment(curveCount, segmentPosition);
                switch (segment) {
                    case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Linear: {
                        if (this._motionData.segments.at(totalSegmentCount)) {
                            this._motionData.segments.at(totalSegmentCount).segmentType =
                                cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Linear;
                            this._motionData.segments.at(totalSegmentCount).evaluate = linearEvaluate;
                        }
                        if (this._motionData.points.at(totalPointCount)) {
                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        }
                        totalPointCount += 1;
                        segmentPosition += 3;
                        break;
                    }
                    case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier;
                        if (areBeziersRestructed || UseOldBeziersCurveMotion) {
                            this._motionData.segments.at(totalSegmentCount).evaluate = bezierEvaluate;
                        }
                        else {
                            this._motionData.segments.at(totalSegmentCount).evaluate = bezierEvaluateCardanoInterpretation;
                        }
                        if (this._motionData.points.at(totalPointCount)) {
                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        }
                        if (this._motionData.points.at(totalPointCount + 1)) {
                            this._motionData.points.at(totalPointCount + 1).time = json.getMotionCurveSegment(curveCount, segmentPosition + 3);
                            this._motionData.points.at(totalPointCount + 1).value = json.getMotionCurveSegment(curveCount, segmentPosition + 4);
                        }
                        if (this._motionData.points.at(totalPointCount + 2)) {
                            this._motionData.points.at(totalPointCount + 2).time = json.getMotionCurveSegment(curveCount, segmentPosition + 5);
                            this._motionData.points.at(totalPointCount + 2).value = json.getMotionCurveSegment(curveCount, segmentPosition + 6);
                        }
                        totalPointCount += 3;
                        segmentPosition += 7;
                        break;
                    }
                    case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped;
                        this._motionData.segments.at(totalSegmentCount).evaluate = steppedEvaluate;
                        if (this._motionData.points.at(totalPointCount)) {
                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        }
                        totalPointCount += 1;
                        segmentPosition += 3;
                        break;
                    }
                    case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped;
                        this._motionData.segments.at(totalSegmentCount).evaluate = inverseSteppedEvaluate;
                        if (this._motionData.points.at(totalPointCount)) {
                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        }
                        totalPointCount += 1;
                        segmentPosition += 3;
                        break;
                    }
                    default: {
                        (0, cubismdebug_1.CSM_ASSERT)(0);
                        break;
                    }
                }
                ++this._motionData.curves.at(curveCount).segmentCount;
                ++totalSegmentCount;
            }
        }
        for (var userdatacount = 0; userdatacount < json.getEventCount(); ++userdatacount) {
            this._motionData.events.at(userdatacount).fireTime = json.getEventTime(userdatacount);
            this._motionData.events.at(userdatacount).value = json.getEventValue(userdatacount);
        }
        json.release();
        json = void 0;
        json = null;
    };
    CubismMotion.prototype.getFiredEvent = function (beforeCheckTimeSeconds, motionTimeSeconds) {
        this._firedEventValues.updateSize(0);
        for (var u = 0; u < this._motionData.eventCount; ++u) {
            if (this._motionData.events.at(u).fireTime > beforeCheckTimeSeconds &&
                this._motionData.events.at(u).fireTime <= motionTimeSeconds) {
                this._firedEventValues.pushBack(new csmstring_1.csmString(this._motionData.events.at(u).value.s));
            }
        }
        return this._firedEventValues;
    };
    return CubismMotion;
}(acubismmotion_1.ACubismMotion));
exports.CubismMotion = CubismMotion;
var $ = __importStar(__webpack_require__(/*! ./cubismmotion */ "../../../Framework/src/motion/cubismmotion.ts"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotion = $.CubismMotion;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "837e965cc33b269e8921"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41ZTdhYzhlYTkyYmRlNmQ5ZWQ5ZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEscUlBQTJEO0FBQzNELDhHQUFnRDtBQUVoRCwyR0FBOEM7QUFFOUMsbUhBSThCO0FBQzlCLG1IQUF3RTtBQUN4RSx3SUFRZ0M7QUFDaEMsNEhBQTRFO0FBRzVFLElBQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUNoQyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQUN4QyxJQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztBQUs1QyxJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUV2QyxTQUFTLFVBQVUsQ0FDakIsQ0FBb0IsRUFDcEIsQ0FBb0IsRUFDcEIsQ0FBUztJQUVULElBQU0sTUFBTSxHQUFzQixJQUFJLHdDQUFpQixFQUFFLENBQUM7SUFFMUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBMkIsRUFBRSxJQUFZO0lBQy9ELElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcs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SUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FDN0IsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ3JELENBQUM7YUFDSDtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQWVILG1CQUFDO0FBQUQsQ0FBQyxDQWgwQmlDLDZCQUFhLEdBZzBCOUM7QUFoMEJZLG9DQUFZO0FBbTBCekIsaUhBQW9DO0FBRXBDLElBQWlCLHFCQUFxQixDQUdyQztBQUhELFdBQWlCLHFCQUFxQjtJQUN2QixrQ0FBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFFN0MsQ0FBQyxFQUhnQixxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQUdyQzs7Ozs7Ozs7O1VDdmpDRCxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MaXZlMmQvLi4vLi4vLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9uLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgQ3ViaXNtSWRIYW5kbGUgfSBmcm9tICcuLi9pZC9jdWJpc21pZCc7XG5pbXBvcnQgeyBDdWJpc21GcmFtZXdvcmsgfSBmcm9tICcuLi9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuaW1wb3J0IHsgQ3ViaXNtTWF0aCB9IGZyb20gJy4uL21hdGgvY3ViaXNtbWF0aCc7XG5pbXBvcnQgeyBDdWJpc21Nb2RlbCB9IGZyb20gJy4uL21vZGVsL2N1YmlzbW1vZGVsJztcbmltcG9ydCB7IGNzbVN0cmluZyB9IGZyb20gJy4uL3R5cGUvY3Ntc3RyaW5nJztcbmltcG9ydCB7IGNzbVZlY3RvciB9IGZyb20gJy4uL3R5cGUvY3NtdmVjdG9yJztcbmltcG9ydCB7XG4gIENTTV9BU1NFUlQsXG4gIEN1YmlzbUxvZ0RlYnVnLFxuICBDdWJpc21Mb2dXYXJuaW5nXG59IGZyb20gJy4uL3V0aWxzL2N1YmlzbWRlYnVnJztcbmltcG9ydCB7IEFDdWJpc21Nb3Rpb24sIEZpbmlzaGVkTW90aW9uQ2FsbGJhY2sgfSBmcm9tICcuL2FjdWJpc21tb3Rpb24nO1xuaW1wb3J0IHtcbiAgQ3ViaXNtTW90aW9uQ3VydmUsXG4gIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LFxuICBDdWJpc21Nb3Rpb25EYXRhLFxuICBDdWJpc21Nb3Rpb25FdmVudCxcbiAgQ3ViaXNtTW90aW9uUG9pbnQsXG4gIEN1YmlzbU1vdGlvblNlZ21lbnQsXG4gIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlXG59IGZyb20gJy4vY3ViaXNtbW90aW9uaW50ZXJuYWwnO1xuaW1wb3J0IHsgQ3ViaXNtTW90aW9uSnNvbiwgRXZhbHVhdGlvbk9wdGlvbkZsYWcgfSBmcm9tICcuL2N1YmlzbW1vdGlvbmpzb24nO1xuaW1wb3J0IHsgQ3ViaXNtTW90aW9uUXVldWVFbnRyeSB9IGZyb20gJy4vY3ViaXNtbW90aW9ucXVldWVlbnRyeSc7XG5cbmNvbnN0IEVmZmVjdE5hbWVFeWVCbGluayA9ICdFeWVCbGluayc7XG5jb25zdCBFZmZlY3ROYW1lTGlwU3luYyA9ICdMaXBTeW5jJztcbmNvbnN0IFRhcmdldE5hbWVNb2RlbCA9ICdNb2RlbCc7XG5jb25zdCBUYXJnZXROYW1lUGFyYW1ldGVyID0gJ1BhcmFtZXRlcic7XG5jb25zdCBUYXJnZXROYW1lUGFydE9wYWNpdHkgPSAnUGFydE9wYWNpdHknO1xuXG4vKipcbiAqIEN1YmlzbSBTREsgUjIg5Lul5YmN44Gu44Oi44O844K344On44Oz44KS5YaN54++44GV44Gb44KL44Gq44KJIHRydWUg44CB44Ki44OL44Oh44O844K/44Gu44Oi44O844K344On44Oz44KS5q2j44GX44GP5YaN54++44GZ44KL44Gq44KJIGZhbHNlIOOAglxuICovXG5jb25zdCBVc2VPbGRCZXppZXJzQ3VydmVNb3Rpb24gPSBmYWxzZTtcblxuZnVuY3Rpb24gbGVycFBvaW50cyhcbiAgYTogQ3ViaXNtTW90aW9uUG9pbnQsXG4gIGI6IEN1YmlzbU1vdGlvblBvaW50LFxuICB0OiBudW1iZXJcbik6IEN1YmlzbU1vdGlvblBvaW50IHtcbiAgY29uc3QgcmVzdWx0OiBDdWJpc21Nb3Rpb25Qb2ludCA9IG5ldyBDdWJpc21Nb3Rpb25Qb2ludCgpO1xuXG4gIHJlc3VsdC50aW1lID0gYS50aW1lICsgKGIudGltZSAtIGEudGltZSkgKiB0O1xuICByZXN1bHQudmFsdWUgPSBhLnZhbHVlICsgKGIudmFsdWUgLSBhLnZhbHVlKSAqIHQ7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbGluZWFyRXZhbHVhdGUocG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLCB0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgdDogbnVtYmVyID0gKHRpbWUgLSBwb2ludHNbMF0udGltZSkgLyAocG9pbnRzWzFdLnRpbWUgLSBwb2ludHNbMF0udGltZSk7XG5cbiAgaWYgKHQgPCAwLjApIHtcbiAgICB0ID0gMC4wO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50c1swXS52YWx1ZSArIChwb2ludHNbMV0udmFsdWUgLSBwb2ludHNbMF0udmFsdWUpICogdDtcbn1cblxuZnVuY3Rpb24gYmV6aWVyRXZhbHVhdGUocG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLCB0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgdDogbnVtYmVyID0gKHRpbWUgLSBwb2ludHNbMF0udGltZSkgLyAocG9pbnRzWzNdLnRpbWUgLSBwb2ludHNbMF0udGltZSk7XG5cbiAgaWYgKHQgPCAwLjApIHtcbiAgICB0ID0gMC4wO1xuICB9XG5cbiAgY29uc3QgcDAxOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHQpO1xuICBjb25zdCBwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMV0sIHBvaW50c1syXSwgdCk7XG4gIGNvbnN0IHAyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1syXSwgcG9pbnRzWzNdLCB0KTtcblxuICBjb25zdCBwMDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDAxLCBwMTIsIHQpO1xuICBjb25zdCBwMTIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDEyLCBwMjMsIHQpO1xuXG4gIHJldHVybiBsZXJwUG9pbnRzKHAwMTIsIHAxMjMsIHQpLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBiZXppZXJFdmFsdWF0ZUJpbmFyeVNlYXJjaChcbiAgcG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLFxuICB0aW1lOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGNvbnN0IHhfZXJyb3IgPSAwLjAxO1xuXG4gIGNvbnN0IHg6IG51bWJlciA9IHRpbWU7XG4gIGxldCB4MTogbnVtYmVyID0gcG9pbnRzWzBdLnRpbWU7XG4gIGxldCB4MjogbnVtYmVyID0gcG9pbnRzWzNdLnRpbWU7XG4gIGxldCBjeDE6IG51bWJlciA9IHBvaW50c1sxXS50aW1lO1xuICBsZXQgY3gyOiBudW1iZXIgPSBwb2ludHNbMl0udGltZTtcblxuICBsZXQgdGEgPSAwLjA7XG4gIGxldCB0YiA9IDEuMDtcbiAgbGV0IHQgPSAwLjA7XG4gIGxldCBpID0gMDtcblxuICBmb3IgKGxldCB2YXIzMyA9IHRydWU7IGkgPCAyMDsgKytpKSB7XG4gICAgaWYgKHggPCB4MSArIHhfZXJyb3IpIHtcbiAgICAgIHQgPSB0YTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICh4MiAtIHhfZXJyb3IgPCB4KSB7XG4gICAgICB0ID0gdGI7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsZXQgY2VudGVyeDogbnVtYmVyID0gKGN4MSArIGN4MikgKiAwLjU7XG4gICAgY3gxID0gKHgxICsgY3gxKSAqIDAuNTtcbiAgICBjeDIgPSAoeDIgKyBjeDIpICogMC41O1xuICAgIGNvbnN0IGN0cmx4MTI6IG51bWJlciA9IChjeDEgKyBjZW50ZXJ4KSAqIDAuNTtcbiAgICBjb25zdCBjdHJseDIxOiBudW1iZXIgPSAoY3gyICsgY2VudGVyeCkgKiAwLjU7XG4gICAgY2VudGVyeCA9IChjdHJseDEyICsgY3RybHgyMSkgKiAwLjU7XG4gICAgaWYgKHggPCBjZW50ZXJ4KSB7XG4gICAgICB0YiA9ICh0YSArIHRiKSAqIDAuNTtcbiAgICAgIGlmIChjZW50ZXJ4IC0geF9lcnJvciA8IHgpIHtcbiAgICAgICAgdCA9IHRiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgeDIgPSBjZW50ZXJ4O1xuICAgICAgY3gyID0gY3RybHgxMjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGEgPSAodGEgKyB0YikgKiAwLjU7XG4gICAgICBpZiAoeCA8IGNlbnRlcnggKyB4X2Vycm9yKSB7XG4gICAgICAgIHQgPSB0YTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHgxID0gY2VudGVyeDtcbiAgICAgIGN4MSA9IGN0cmx4MjE7XG4gICAgfVxuICB9XG5cbiAgaWYgKGkgPT0gMjApIHtcbiAgICB0ID0gKHRhICsgdGIpICogMC41O1xuICB9XG5cbiAgaWYgKHQgPCAwLjApIHtcbiAgICB0ID0gMC4wO1xuICB9XG4gIGlmICh0ID4gMS4wKSB7XG4gICAgdCA9IDEuMDtcbiAgfVxuXG4gIGNvbnN0IHAwMTogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdLCB0KTtcbiAgY29uc3QgcDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0sIHQpO1xuICBjb25zdCBwMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMl0sIHBvaW50c1szXSwgdCk7XG5cbiAgY29uc3QgcDAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAwMSwgcDEyLCB0KTtcbiAgY29uc3QgcDEyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAxMiwgcDIzLCB0KTtcblxuICByZXR1cm4gbGVycFBvaW50cyhwMDEyLCBwMTIzLCB0KS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gYmV6aWVyRXZhbHVhdGVDYXJkYW5vSW50ZXJwcmV0YXRpb24oXG4gIHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSxcbiAgdGltZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICBjb25zdCB4OiBudW1iZXIgPSB0aW1lO1xuICBjb25zdCB4MTogbnVtYmVyID0gcG9pbnRzWzBdLnRpbWU7XG4gIGNvbnN0IHgyOiBudW1iZXIgPSBwb2ludHNbM10udGltZTtcbiAgY29uc3QgY3gxOiBudW1iZXIgPSBwb2ludHNbMV0udGltZTtcbiAgY29uc3QgY3gyOiBudW1iZXIgPSBwb2ludHNbMl0udGltZTtcblxuICBjb25zdCBhOiBudW1iZXIgPSB4MiAtIDMuMCAqIGN4MiArIDMuMCAqIGN4MSAtIHgxO1xuICBjb25zdCBiOiBudW1iZXIgPSAzLjAgKiBjeDIgLSA2LjAgKiBjeDEgKyAzLjAgKiB4MTtcbiAgY29uc3QgYzogbnVtYmVyID0gMy4wICogY3gxIC0gMy4wICogeDE7XG4gIGNvbnN0IGQ6IG51bWJlciA9IHgxIC0geDtcblxuICBjb25zdCB0OiBudW1iZXIgPSBDdWJpc21NYXRoLmNhcmRhbm9BbGdvcml0aG1Gb3JCZXppZXIoYSwgYiwgYywgZCk7XG5cbiAgY29uc3QgcDAxOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHQpO1xuICBjb25zdCBwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMV0sIHBvaW50c1syXSwgdCk7XG4gIGNvbnN0IHAyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1syXSwgcG9pbnRzWzNdLCB0KTtcblxuICBjb25zdCBwMDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDAxLCBwMTIsIHQpO1xuICBjb25zdCBwMTIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDEyLCBwMjMsIHQpO1xuXG4gIHJldHVybiBsZXJwUG9pbnRzKHAwMTIsIHAxMjMsIHQpLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBzdGVwcGVkRXZhbHVhdGUocG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLCB0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gcG9pbnRzWzBdLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlU3RlcHBlZEV2YWx1YXRlKFxuICBwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sXG4gIHRpbWU6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIHBvaW50c1sxXS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gZXZhbHVhdGVDdXJ2ZShcbiAgbW90aW9uRGF0YTogQ3ViaXNtTW90aW9uRGF0YSxcbiAgaW5kZXg6IG51bWJlcixcbiAgdGltZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICAvLyBGaW5kIHNlZ21lbnQgdG8gZXZhbHVhdGUuXG4gIGNvbnN0IGN1cnZlOiBDdWJpc21Nb3Rpb25DdXJ2ZSA9IG1vdGlvbkRhdGEuY3VydmVzLmF0KGluZGV4KTtcblxuICBsZXQgdGFyZ2V0ID0gLTE7XG4gIGNvbnN0IHRvdGFsU2VnbWVudENvdW50OiBudW1iZXIgPSBjdXJ2ZS5iYXNlU2VnbWVudEluZGV4ICsgY3VydmUuc2VnbWVudENvdW50O1xuICBsZXQgcG9pbnRQb3NpdGlvbiA9IDA7XG4gIGZvciAobGV0IGk6IG51bWJlciA9IGN1cnZlLmJhc2VTZWdtZW50SW5kZXg7IGkgPCB0b3RhbFNlZ21lbnRDb3VudDsgKytpKSB7XG4gICAgLy8gR2V0IGZpcnN0IHBvaW50IG9mIG5leHQgc2VnbWVudC5cbiAgICBwb2ludFBvc2l0aW9uID1cbiAgICAgIG1vdGlvbkRhdGEuc2VnbWVudHMuYXQoaSkuYmFzZVBvaW50SW5kZXggK1xuICAgICAgKG1vdGlvbkRhdGEuc2VnbWVudHMuYXQoaSkuc2VnbWVudFR5cGUgPT1cbiAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0JlemllclxuICAgICAgICA/IDNcbiAgICAgICAgOiAxKTtcblxuICAgIC8vIEJyZWFrIGlmIHRpbWUgbGllcyB3aXRoaW4gY3VycmVudCBzZWdtZW50LlxuICAgIGNvbnN0IHBvcyA9IG1vdGlvbkRhdGEucG9pbnRzLmF0KHBvaW50UG9zaXRpb24pO1xuICAgIGlmICghcG9zIHx8IHBvcy50aW1lID4gdGltZSkge1xuICAgICAgdGFyZ2V0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0YXJnZXQgPT0gLTEpIHtcbiAgICBjb25zdCBwb3MgPSBtb3Rpb25EYXRhLnBvaW50cy5hdChwb2ludFBvc2l0aW9uKTtcbiAgICByZXR1cm4gIXBvc3Bvcy52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0IHNlZ21lbnQ6IEN1YmlzbU1vdGlvblNlZ21lbnQgPSBtb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRhcmdldCk7XG5cbiAgcmV0dXJuIHNlZ21lbnQgJiYgc2VnbWVudC5ldmFsdWF0ZShtb3Rpb25EYXRhLnBvaW50cy5nZXQoc2VnbWVudC5iYXNlUG9pbnRJbmRleCksIHRpbWUpO1xufVxuXG4vKipcbiAqIOODouODvOOCt+ODp+ODs+OCr+ODqeOCuVxuICpcbiAqIOODouODvOOCt+ODp+ODs+OBruOCr+ODqeOCueOAglxuICovXG5leHBvcnQgY2xhc3MgQ3ViaXNtTW90aW9uIGV4dGVuZHMgQUN1YmlzbU1vdGlvbiB7XG4gIC8qKlxuICAgKiDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzmiJDjgZnjgotcbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciBtb3Rpb24zLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDkvZzmiJDjgZXjgozjgZ/jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gICAgc2l6ZTogbnVtYmVyLFxuICAgIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyPzogRmluaXNoZWRNb3Rpb25DYWxsYmFja1xuICApOiBDdWJpc21Nb3Rpb24ge1xuICAgIGNvbnN0IHJldCA9IG5ldyBDdWJpc21Nb3Rpb24oKTtcblxuICAgIHJldC5wYXJzZShidWZmZXIsIHNpemUpO1xuICAgIHJldC5fc291cmNlRnJhbWVSYXRlID0gcmV0Ll9tb3Rpb25EYXRhLmZwcztcbiAgICByZXQuX2xvb3BEdXJhdGlvblNlY29uZHMgPSByZXQuX21vdGlvbkRhdGEuZHVyYXRpb247XG4gICAgcmV0Ll9vbkZpbmlzaGVkTW90aW9uID0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI7XG5cbiAgICAvLyBOT1RFOiBFZGl0b3Ljgafjga/jg6vjg7zjg5fjgYLjgorjga7jg6Ljg7zjgrfjg6fjg7Pmm7jjgY3lh7rjgZfjga/pnZ7lr77lv5xcbiAgICAvLyByZXQtPl9sb29wID0gKHJldC0+X21vdGlvbkRhdGEtPkxvb3AgPiAwKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OBruODkeODqeODoeODvOOCv+OBruabtOaWsOOBruWun+ihjFxuICAgKiBAcGFyYW0gbW9kZWwgICAgICAgICAgICAg5a++6LGh44Gu44Oi44OH44OrXG4gICAqIEBwYXJhbSB1c2VyVGltZVNlY29uZHMgICDnj77lnKjjga7mmYLliLtb56eSXVxuICAgKiBAcGFyYW0gZmFkZVdlaWdodCAgICAgICAg44Oi44O844K344On44Oz44Gu6YeN44G/XG4gICAqIEBwYXJhbSBtb3Rpb25RdWV1ZUVudHJ5ICBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXLjgafnrqHnkIbjgZXjgozjgabjgYTjgovjg6Ljg7zjgrfjg6fjg7NcbiAgICovXG4gIHB1YmxpYyBkb1VwZGF0ZVBhcmFtZXRlcnMoXG4gICAgbW9kZWw6IEN1YmlzbU1vZGVsLFxuICAgIHVzZXJUaW1lU2Vjb25kczogbnVtYmVyLFxuICAgIGZhZGVXZWlnaHQ6IG51bWJlcixcbiAgICBtb3Rpb25RdWV1ZUVudHJ5OiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5XG4gICk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgICAgRWZmZWN0TmFtZUV5ZUJsaW5rXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2RlbEN1cnZlSWRMaXBTeW5jID09IG51bGwpIHtcbiAgICAgIHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICAgIEVmZmVjdE5hbWVMaXBTeW5jXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCB0aW1lT2Zmc2V0U2Vjb25kczogbnVtYmVyID1cbiAgICAgIHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0U3RhcnRUaW1lKCk7XG5cbiAgICBpZiAodGltZU9mZnNldFNlY29uZHMgPCAwLjApIHtcbiAgICAgIHRpbWVPZmZzZXRTZWNvbmRzID0gMC4wOyAvLyDjgqjjg6njg7zlm57pgb9cbiAgICB9XG5cbiAgICBsZXQgbGlwU3luY1ZhbHVlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIGxldCBleWVCbGlua1ZhbHVlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuXG4gICAgLy/jgb7jgbDjgZ/jgY3jgIHjg6rjg4Pjg5fjgrfjg7Pjgq/jga7jgYbjgaHjg6Ljg7zjgrfjg6fjg7Pjga7pgannlKjjgpLmpJzlh7rjgZnjgovjgZ/jgoHjga7jg5Pjg4Pjg4jvvIhtYXhGbGFnQ291bnTlgIvjgb7jgadcbiAgICBjb25zdCBNYXhUYXJnZXRTaXplID0gNjQ7XG4gICAgbGV0IGxpcFN5bmNGbGFncyA9IDA7XG4gICAgbGV0IGV5ZUJsaW5rRmxhZ3MgPSAwO1xuXG4gICAgLy/nnqzjgY3jgIHjg6rjg4Pjg5fjgrfjg7Pjgq/jga7jgr/jg7zjgrLjg4Pjg4jmlbDjgYzkuIrpmZDjgpLotoXjgYjjgabjgYTjgovloLTlkIhcbiAgICBpZiAodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgQ3ViaXNtTG9nRGVidWcoXG4gICAgICAgICd0b28gbWFueSBleWUgYmxpbmsgdGFyZ2V0cyA6IHswfScsXG4gICAgICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgQ3ViaXNtTG9nRGVidWcoXG4gICAgICAgICd0b28gbWFueSBsaXAgc3luYyB0YXJnZXRzIDogezB9JyxcbiAgICAgICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdG1wRmFkZUluOiBudW1iZXIgPVxuICAgICAgdGhpcy5fZmFkZUluU2Vjb25kcyA8PSAwLjBcbiAgICAgICAgPyAxLjBcbiAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAodXNlclRpbWVTZWNvbmRzIC0gbW90aW9uUXVldWVFbnRyeS5nZXRGYWRlSW5TdGFydFRpbWUoKSkgL1xuICAgICAgICAgICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzXG4gICAgICAgICAgKTtcblxuICAgIGNvbnN0IHRtcEZhZGVPdXQ6IG51bWJlciA9XG4gICAgICB0aGlzLl9mYWRlT3V0U2Vjb25kcyA8PSAwLjAgfHwgbW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgPCAwLjBcbiAgICAgICAgPyAxLjBcbiAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAobW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgLSB1c2VyVGltZVNlY29uZHMpIC9cbiAgICAgICAgICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHNcbiAgICAgICAgICApO1xuICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgIGxldCBjOiBudW1iZXIsIHBhcmFtZXRlckluZGV4OiBudW1iZXI7XG5cbiAgICAvLyAnUmVwZWF0JyB0aW1lIGFzIG5lY2Vzc2FyeS5cbiAgICBsZXQgdGltZTogbnVtYmVyID0gdGltZU9mZnNldFNlY29uZHM7XG5cbiAgICBpZiAodGhpcy5faXNMb29wKSB7XG4gICAgICB3aGlsZSAodGltZSA+IHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24pIHtcbiAgICAgICAgdGltZSAtPSB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgLy8gRXZhbHVhdGUgbW9kZWwgY3VydmVzLlxuICAgIGZvciAoXG4gICAgICBjID0gMDtcbiAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgIGN1cnZlcy5hdChjKS50eXBlID09XG4gICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X01vZGVsO1xuICAgICAgKytjXG4gICAgKSB7XG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgY2FsbCBoYW5kbGVyLlxuICAgICAgdmFsdWUgPSBldmFsdWF0ZUN1cnZlKHRoaXMuX21vdGlvbkRhdGEsIGMsIHRpbWUpO1xuXG4gICAgICBpZiAoY3VydmVzLmF0KGMpLmlkID09IHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rKSB7XG4gICAgICAgIGV5ZUJsaW5rVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoY3VydmVzLmF0KGMpLmlkID09IHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMpIHtcbiAgICAgICAgbGlwU3luY1ZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhcmFtZXRlck1vdGlvbkN1cnZlQ291bnQgPSAwO1xuXG4gICAgZm9yIChcbiAgICAgIDtcbiAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgIGN1cnZlcy5hdChjKS50eXBlID09XG4gICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcmFtZXRlcjtcbiAgICAgICsrY1xuICAgICkge1xuICAgICAgcGFyYW1ldGVyTW90aW9uQ3VydmVDb3VudCsrO1xuXG4gICAgICAvLyBGaW5kIHBhcmFtZXRlciBpbmRleC5cbiAgICAgIHBhcmFtZXRlckluZGV4ID0gbW9kZWwuZ2V0UGFyYW1ldGVySW5kZXgoY3VydmVzLmF0KGMpLmlkKTtcblxuICAgICAgLy8gU2tpcCBjdXJ2ZSBldmFsdWF0aW9uIGlmIG5vIHZhbHVlIGluIHNpbmsuXG4gICAgICBpZiAocGFyYW1ldGVySW5kZXggPT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvdXJjZVZhbHVlOiBudW1iZXIgPSBtb2RlbC5nZXRQYXJhbWV0ZXJWYWx1ZUJ5SW5kZXgoXG4gICAgICAgIHBhcmFtZXRlckluZGV4XG4gICAgICApO1xuXG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgYXBwbHkgdmFsdWUuXG4gICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG5cbiAgICAgIGlmIChleWVCbGlua1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmF0KGkpID09IGN1cnZlcy5hdChjKS5pZCkge1xuICAgICAgICAgICAgdmFsdWUgKj0gZXllQmxpbmtWYWx1ZTtcbiAgICAgICAgICAgIGV5ZUJsaW5rRmxhZ3MgfD0gMSA8PCBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsaXBTeW5jVmFsdWUgIT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBpIDwgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKCkgJiYgaSA8IE1heFRhcmdldFNpemU7XG4gICAgICAgICAgKytpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmF0KGkpID09IGN1cnZlcy5hdChjKS5pZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gbGlwU3luY1ZhbHVlO1xuICAgICAgICAgICAgbGlwU3luY0ZsYWdzIHw9IDEgPDwgaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgdjogbnVtYmVyO1xuXG4gICAgICAvLyDjg5Hjg6njg6Hjg7zjgr/jgZTjgajjga7jg5Xjgqfjg7zjg4lcbiAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA8IDAuMCAmJiBjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWUgPCAwLjApIHtcbiAgICAgICAgLy8g44Oi44O844K344On44Oz44Gu44OV44Kn44O844OJ44KS6YGp55SoXG4gICAgICAgIHYgPSBzb3VyY2VWYWx1ZSArICh2YWx1ZSAtIHNvdXJjZVZhbHVlKSAqIGZhZGVXZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZfjgabjg5Xjgqfjg7zjg4njgqTjg7PjgYvjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgYzoqK3lrprjgZfjgabjgYLjgovloLTlkIjjga/jgZ3jgaHjgonjgpLpgannlKhcbiAgICAgICAgbGV0IGZpbjogbnVtYmVyO1xuICAgICAgICBsZXQgZm91dDogbnVtYmVyO1xuXG4gICAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA8IDAuMCkge1xuICAgICAgICAgIGZpbiA9IHRtcEZhZGVJbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaW4gPVxuICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVJblRpbWUgPT0gMC4wXG4gICAgICAgICAgICAgID8gMS4wXG4gICAgICAgICAgICAgIDogQ3ViaXNtTWF0aC5nZXRFYXNpbmdTaW5lKFxuICAgICAgICAgICAgICAgICAgKHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0RmFkZUluU3RhcnRUaW1lKCkpIC9cbiAgICAgICAgICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVJblRpbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnZlcy5hdChjKS5mYWRlT3V0VGltZSA8IDAuMCkge1xuICAgICAgICAgIGZvdXQgPSB0bXBGYWRlT3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvdXQgPVxuICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lID09IDAuMCB8fFxuICAgICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgPCAwLjBcbiAgICAgICAgICAgICAgPyAxLjBcbiAgICAgICAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAgICAgICAobW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgLSB1c2VyVGltZVNlY29uZHMpIC9cbiAgICAgICAgICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtV2VpZ2h0OiBudW1iZXIgPSB0aGlzLl93ZWlnaHQgKiBmaW4gKiBmb3V0O1xuXG4gICAgICAgIC8vIOODkeODqeODoeODvOOCv+OBlOOBqOOBruODleOCp+ODvOODieOCkumBqeeUqFxuICAgICAgICB2ID0gc291cmNlVmFsdWUgKyAodmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBwYXJhbVdlaWdodDtcbiAgICAgIH1cblxuICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUluZGV4KHBhcmFtZXRlckluZGV4LCB2LCAxLjApO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGlmIChleWVCbGlua1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlVmFsdWU6IG51bWJlciA9IG1vZGVsLmdldFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgICAgICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmF0KGkpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBp+OBruS4iuabuOOBjeOBjOOBguOBo+OBn+aZguOBq+OBr+OBvuOBsOOBn+OBjeOBr+mBqeeUqOOBl+OBquOBhFxuICAgICAgICAgIGlmICgoZXllQmxpbmtGbGFncyA+PiBpKSAmIDB4MDEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHY6IG51bWJlciA9XG4gICAgICAgICAgICBzb3VyY2VWYWx1ZSArIChleWVCbGlua1ZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcblxuICAgICAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5hdChpKSwgdik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxpcFN5bmNWYWx1ZSAhPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGkgPCB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlVmFsdWU6IG51bWJlciA9IG1vZGVsLmdldFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgICAgICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuYXQoaSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8g44Oi44O844K344On44Oz44Gn44Gu5LiK5pu444GN44GM44GC44Gj44Gf5pmC44Gr44Gv44Oq44OD44OX44K344Oz44Kv44Gv6YGp55So44GX44Gq44GEXG4gICAgICAgICAgaWYgKChsaXBTeW5jRmxhZ3MgPj4gaSkgJiAweDAxKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB2OiBudW1iZXIgPVxuICAgICAgICAgICAgc291cmNlVmFsdWUgKyAobGlwU3luY1ZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcblxuICAgICAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmF0KGkpLCB2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoXG4gICAgICA7XG4gICAgICBjIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ICYmXG4gICAgICBjdXJ2ZXMuYXQoYykudHlwZSA9PVxuICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJ0T3BhY2l0eTtcbiAgICAgICsrY1xuICAgICkge1xuICAgICAgLy8gRmluZCBwYXJhbWV0ZXIgaW5kZXguXG4gICAgICBwYXJhbWV0ZXJJbmRleCA9IG1vZGVsLmdldFBhcmFtZXRlckluZGV4KGN1cnZlcy5hdChjKS5pZCk7XG5cbiAgICAgIC8vIFNraXAgY3VydmUgZXZhbHVhdGlvbiBpZiBubyB2YWx1ZSBpbiBzaW5rLlxuICAgICAgaWYgKHBhcmFtZXRlckluZGV4ID09IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgYXBwbHkgdmFsdWUuXG4gICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG5cbiAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJbmRleChwYXJhbWV0ZXJJbmRleCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aW1lT2Zmc2V0U2Vjb25kcyA+PSB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uKSB7XG4gICAgICBpZiAodGhpcy5faXNMb29wKSB7XG4gICAgICAgIG1vdGlvblF1ZXVlRW50cnkuc2V0U3RhcnRUaW1lKHVzZXJUaW1lU2Vjb25kcyk7IC8vIOacgOWIneOBrueKtuaFi+OBuFxuICAgICAgICBpZiAodGhpcy5faXNMb29wRmFkZUluKSB7XG4gICAgICAgICAgLy8g44Or44O844OX5YaF44Gn44Or44O844OX55So44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544Gu5pmC44Gv44CB44OV44Kn44O844OJ44Kk44Oz6Kit5a6a44GX55u044GXXG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRGYWRlSW5TdGFydFRpbWUodXNlclRpbWVTZWNvbmRzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX29uRmluaXNoZWRNb3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl9vbkZpbmlzaGVkTW90aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRJc0ZpbmlzaGVkKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9sYXN0V2VpZ2h0ID0gZmFkZVdlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6vjg7zjg5fmg4XloLHjga7oqK3lrppcbiAgICogQHBhcmFtIGxvb3Ag44Or44O844OX5oOF5aCxXG4gICAqL1xuICBwdWJsaWMgc2V0SXNMb29wKGxvb3A6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9pc0xvb3AgPSBsb29wO1xuICB9XG5cbiAgLyoqXG4gICAqIOODq+ODvOODl+aDheWgseOBruWPluW+l1xuICAgKiBAcmV0dXJuIHRydWUg44Or44O844OX44GZ44KLXG4gICAqIEByZXR1cm4gZmFsc2Ug44Or44O844OX44GX44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNMb29wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0xvb3A7XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCx44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBsb29wRmFkZUluICDjg6vjg7zjg5fmmYLjga7jg5Xjgqfjg7zjg4njgqTjg7Pmg4XloLFcbiAgICovXG4gIHB1YmxpYyBzZXRJc0xvb3BGYWRlSW4obG9vcEZhZGVJbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2lzTG9vcEZhZGVJbiA9IGxvb3BGYWRlSW47XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCx44Gu5Y+W5b6XXG4gICAqXG4gICAqIEByZXR1cm4gIHRydWUgICAg44GZ44KLXG4gICAqIEByZXR1cm4gIGZhbHNlICAg44GX44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNMb29wRmFkZUluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0xvb3BGYWRlSW47XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu6ZW344GV44KS5Y+W5b6X44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBrumVt+OBlVvnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faXNMb29wID8gLTEuMCA6IHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44Or44O844OX5pmC44Gu6ZW344GV44KS5Y+W5b6X44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBruODq+ODvOODl+aZguOBrumVt+OBlVvnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9vcER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Kk44Oz44Gu5pmC6ZaT44KS6Kit5a6a44GZ44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICDjg5Xjgqfjg7zjg4njgqTjg7PjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIHNldFBhcmFtZXRlckZhZGVJblRpbWUoXG4gICAgcGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlLFxuICAgIHZhbHVlOiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIGN1cnZlcy5hdChpKS5mYWRlSW5UaW1lID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICDjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIHNldFBhcmFtZXRlckZhZGVPdXRUaW1lKFxuICAgIHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSxcbiAgICB2YWx1ZTogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICBjdXJ2ZXMuYXQoaSkuZmFkZU91dFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZnjgovjg5Xjgqfjg7zjg4njgqTjg7Pjga7mmYLplpPjga7lj5blvpdcbiAgICogQHBhcmFtICAgIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Kk44Oz44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJGYWRlSW5UaW1lKHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSk6IG51bWJlciB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIHJldHVybiBjdXJ2ZXMuYXQoaSkuZmFkZUluVGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44KS5Y+W5b6XXG4gICAqXG4gICAqIEBwYXJhbSAgIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Ki44Km44OI44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJGYWRlT3V0VGltZShwYXJhbWV0ZXJJZDogQ3ViaXNtSWRIYW5kbGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICByZXR1cm4gY3VydmVzLmF0KGkpLmZhZGVPdXRUaW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiDoh6rli5Xjgqjjg5Xjgqfjgq/jg4jjgYzjgYvjgYvjgaPjgabjgYTjgovjg5Hjg6njg6Hjg7zjgr9JROODquOCueODiOOBruioreWumlxuICAgKiBAcGFyYW0gZXllQmxpbmtQYXJhbWV0ZXJJZHMgICAg6Ieq5YuV44G+44Gw44Gf44GN44GM44GL44GL44Gj44Gm44GE44KL44OR44Op44Oh44O844K/SUTjga7jg6rjgrnjg4hcbiAgICogQHBhcmFtIGxpcFN5bmNQYXJhbWV0ZXJJZHMgICAgIOODquODg+ODl+OCt+ODs+OCr+OBjOOBi+OBi+OBo+OBpuOBhOOCi+ODkeODqeODoeODvOOCv0lE44Gu44Oq44K544OIXG4gICAqL1xuICBwdWJsaWMgc2V0RWZmZWN0SWRzKFxuICAgIGV5ZUJsaW5rUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+LFxuICAgIGxpcFN5bmNQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT5cbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMgPSBleWVCbGlua1BhcmFtZXRlcklkcztcbiAgICB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzID0gbGlwU3luY1BhcmFtZXRlcklkcztcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NvdXJjZUZyYW1lUmF0ZSA9IDMwLjA7XG4gICAgdGhpcy5fbG9vcER1cmF0aW9uU2Vjb25kcyA9IC0xLjA7XG4gICAgdGhpcy5faXNMb29wID0gZmFsc2U7IC8vIHRydWXjgYvjgokgZmFsc2Ug44G444OH44OV44Kp44Or44OI44KS5aSJ5pu0XG4gICAgdGhpcy5faXNMb29wRmFkZUluID0gdHJ1ZTsgLy8g44Or44O844OX5pmC44Gr44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544GL44Gp44GG44GL44Gu44OV44Op44KwXG4gICAgdGhpcy5fbGFzdFdlaWdodCA9IDAuMDtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWxDdXJ2ZUlkTGlwU3luYyA9IG51bGw7XG4gICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMgPSBudWxsO1xuICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+OCueODiOODqeOCr+OCv+ebuOW9k+OBruWHpueQhlxuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbW90aW9uRGF0YSA9IHZvaWQgMDtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBtb3Rpb24zLmpzb27jgpLjg5Hjg7zjgrnjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIG1vdGlvbkpzb24gIG1vdGlvbjMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSAgICAgICAg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqL1xuICBwdWJsaWMgcGFyc2UobW90aW9uSnNvbjogQXJyYXlCdWZmZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX21vdGlvbkRhdGEgPSBuZXcgQ3ViaXNtTW90aW9uRGF0YSgpO1xuXG4gICAgbGV0IGpzb246IEN1YmlzbU1vdGlvbkpzb24gPSBuZXcgQ3ViaXNtTW90aW9uSnNvbihtb3Rpb25Kc29uLCBzaXplKTtcblxuICAgIHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24gPSBqc29uLmdldE1vdGlvbkR1cmF0aW9uKCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5sb29wID0ganNvbi5pc01vdGlvbkxvb3AoKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgPSBqc29uLmdldE1vdGlvbkN1cnZlQ291bnQoKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmZwcyA9IGpzb24uZ2V0TW90aW9uRnBzKCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudENvdW50ID0ganNvbi5nZXRFdmVudENvdW50KCk7XG5cbiAgICBjb25zdCBhcmVCZXppZXJzUmVzdHJ1Y3RlZDogYm9vbGVhbiA9IGpzb24uZ2V0RXZhbHVhdGlvbk9wdGlvbkZsYWcoXG4gICAgICBFdmFsdWF0aW9uT3B0aW9uRmxhZy5FdmFsdWF0aW9uT3B0aW9uRmxhZ19BcmVCZXppZXJzUmlzdHJpY3RlZFxuICAgICk7XG5cbiAgICBpZiAoanNvbi5pc0V4aXN0TW90aW9uRmFkZUluVGltZSgpKSB7XG4gICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzID1cbiAgICAgICAganNvbi5nZXRNb3Rpb25GYWRlSW5UaW1lKCkgPCAwLjAgPyAxLjAgOiBqc29uLmdldE1vdGlvbkZhZGVJblRpbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmFkZUluU2Vjb25kcyA9IDEuMDtcbiAgICB9XG5cbiAgICBpZiAoanNvbi5pc0V4aXN0TW90aW9uRmFkZU91dFRpbWUoKSkge1xuICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHMgPVxuICAgICAgICBqc29uLmdldE1vdGlvbkZhZGVPdXRUaW1lKCkgPCAwLjAgPyAxLjAgOiBqc29uLmdldE1vdGlvbkZhZGVPdXRUaW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZhZGVPdXRTZWNvbmRzID0gMS4wO1xuICAgIH1cblxuICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLnVwZGF0ZVNpemUoXG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQsXG4gICAgICBDdWJpc21Nb3Rpb25DdXJ2ZSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMudXBkYXRlU2l6ZShcbiAgICAgIGpzb24uZ2V0TW90aW9uVG90YWxTZWdtZW50Q291bnQoKSxcbiAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnQsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy51cGRhdGVTaXplKFxuICAgICAganNvbi5nZXRNb3Rpb25Ub3RhbFBvaW50Q291bnQoKSxcbiAgICAgIEN1YmlzbU1vdGlvblBvaW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMudXBkYXRlU2l6ZShcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudCxcbiAgICAgIEN1YmlzbU1vdGlvbkV2ZW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBsZXQgdG90YWxQb2ludENvdW50ID0gMDtcbiAgICBsZXQgdG90YWxTZWdtZW50Q291bnQgPSAwO1xuXG4gICAgLy8gQ3VydmVzXG4gICAgZm9yIChcbiAgICAgIGxldCBjdXJ2ZUNvdW50ID0gMDtcbiAgICAgIGN1cnZlQ291bnQgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7XG4gICAgICArK2N1cnZlQ291bnRcbiAgICApIHtcbiAgICAgIGlmIChqc29uLmdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlQ291bnQpID09IFRhcmdldE5hbWVNb2RlbCkge1xuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS50eXBlID1cbiAgICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9Nb2RlbDtcbiAgICAgIH0gZWxzZSBpZiAoanNvbi5nZXRNb3Rpb25DdXJ2ZVRhcmdldChjdXJ2ZUNvdW50KSA9PSBUYXJnZXROYW1lUGFyYW1ldGVyKSB7XG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnR5cGUgPVxuICAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcmFtZXRlcjtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGpzb24uZ2V0TW90aW9uQ3VydmVUYXJnZXQoY3VydmVDb3VudCkgPT0gVGFyZ2V0TmFtZVBhcnRPcGFjaXR5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkudHlwZSA9XG4gICAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfUGFydE9wYWNpdHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBDdWJpc21Mb2dXYXJuaW5nKFxuICAgICAgICAgICdXYXJuaW5nIDogVW5hYmxlIHRvIGdldCBzZWdtZW50IHR5cGUgZnJvbSBDdXJ2ZSEgVGhlIG51bWJlciBvZiBcIkN1cnZlQ291bnRcIiBtYXkgYmUgaW5jb3JyZWN0ISdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkuaWQgPSBqc29uLmdldE1vdGlvbkN1cnZlSWQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApLmJhc2VTZWdtZW50SW5kZXggPSB0b3RhbFNlZ21lbnRDb3VudDtcblxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICkuZmFkZUluVGltZSA9IGpzb24uaXNFeGlzdE1vdGlvbkN1cnZlRmFkZUluVGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA/IGpzb24uZ2V0TW90aW9uQ3VydmVGYWRlSW5UaW1lKGN1cnZlQ291bnQpXG4gICAgICAgIDogLTEuMDtcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApLmZhZGVPdXRUaW1lID0ganNvbi5pc0V4aXN0TW90aW9uQ3VydmVGYWRlT3V0VGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA/IGpzb24uZ2V0TW90aW9uQ3VydmVGYWRlT3V0VGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA6IC0xLjA7XG5cbiAgICAgIC8vIFNlZ21lbnRzXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgc2VnbWVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgc2VnbWVudFBvc2l0aW9uIDwganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnRDb3VudChjdXJ2ZUNvdW50KTtcblxuICAgICAgKSB7XG4gICAgICAgIGlmIChzZWdtZW50UG9zaXRpb24gPT0gMCkge1xuICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KSkge1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICkuYmFzZVBvaW50SW5kZXggPSB0b3RhbFBvaW50Q291bnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCkpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KGN1cnZlQ291bnQsIHNlZ21lbnRQb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoY3VydmVDb3VudCwgc2VnbWVudFBvc2l0aW9uICsgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuYmFzZVBvaW50SW5kZXggPVxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlZ21lbnQ6IG51bWJlciA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgc2VnbWVudFBvc2l0aW9uXG4gICAgICAgICk7XG4gICAgICAgIHN3aXRjaCAoc2VnbWVudCkge1xuICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfTGluZWFyOiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0xpbmVhcjtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgICApLmV2YWx1YXRlID0gbGluZWFyRXZhbHVhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyOiB7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5zZWdtZW50VHlwZSA9XG4gICAgICAgICAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0JlemllcjtcblxuICAgICAgICAgICAgaWYgKGFyZUJlemllcnNSZXN0cnVjdGVkIHx8IFVzZU9sZEJlemllcnNDdXJ2ZU1vdGlvbikge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgICkuZXZhbHVhdGUgPSBiZXppZXJFdmFsdWF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGJlemllckV2YWx1YXRlQ2FyZGFub0ludGVycHJldGF0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAyXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQgKyAxKSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAxXG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgM1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAxXG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCArIDIpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArIDJcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyA1XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArIDJcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgNlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMztcbiAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSA3O1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX1N0ZXBwZWQ6IHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfU3RlcHBlZDtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICApLmV2YWx1YXRlID0gc3RlcHBlZEV2YWx1YXRlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAyXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDM7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfSW52ZXJzZVN0ZXBwZWQ6IHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfSW52ZXJzZVN0ZXBwZWQ7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGludmVyc2VTdGVwcGVkRXZhbHVhdGU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIENTTV9BU1NFUlQoMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICArK3RoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnNlZ21lbnRDb3VudDtcbiAgICAgICAgKyt0b3RhbFNlZ21lbnRDb3VudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgbGV0IHVzZXJkYXRhY291bnQgPSAwO1xuICAgICAgdXNlcmRhdGFjb3VudCA8IGpzb24uZ2V0RXZlbnRDb3VudCgpO1xuICAgICAgKyt1c2VyZGF0YWNvdW50XG4gICAgKSB7XG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1c2VyZGF0YWNvdW50KS5maXJlVGltZSA9IGpzb24uZ2V0RXZlbnRUaW1lKFxuICAgICAgICB1c2VyZGF0YWNvdW50XG4gICAgICApO1xuICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodXNlcmRhdGFjb3VudCkudmFsdWUgPSBqc29uLmdldEV2ZW50VmFsdWUoXG4gICAgICAgIHVzZXJkYXRhY291bnRcbiAgICAgICk7XG4gICAgfVxuXG4gICAganNvbi5yZWxlYXNlKCk7XG4gICAganNvbiA9IHZvaWQgMDtcbiAgICBqc29uID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjga7jg5Hjg6njg6Hjg7zjgr/mm7TmlrBcbiAgICpcbiAgICog44Kk44OZ44Oz44OI55m654Gr44Gu44OB44Kn44OD44Kv44CCXG4gICAqIOWFpeWKm+OBmeOCi+aZgumWk+OBr+WRvOOBsOOCjOOCi+ODouODvOOCt+ODp+ODs+OCv+OCpOODn+ODs+OCsOOCku+8kOOBqOOBl+OBn+enkuaVsOOBp+ihjOOBhuOAglxuICAgKlxuICAgKiBAcGFyYW0gYmVmb3JlQ2hlY2tUaW1lU2Vjb25kcyAgIOWJjeWbnuOBruOCpOODmeODs+ODiOODgeOCp+ODg+OCr+aZgumWk1vnp5JdXG4gICAqIEBwYXJhbSBtb3Rpb25UaW1lU2Vjb25kcyAgICAgICAg5LuK5Zue44Gu5YaN55Sf5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRGaXJlZEV2ZW50KFxuICAgIGJlZm9yZUNoZWNrVGltZVNlY29uZHM6IG51bWJlcixcbiAgICBtb3Rpb25UaW1lU2Vjb25kczogbnVtYmVyXG4gICk6IGNzbVZlY3Rvcjxjc21TdHJpbmc+IHtcbiAgICB0aGlzLl9maXJlZEV2ZW50VmFsdWVzLnVwZGF0ZVNpemUoMCk7XG5cbiAgICAvLyDjgqTjg5njg7Pjg4jjga7nmbrngavjg4Hjgqfjg4Pjgq9cbiAgICBmb3IgKGxldCB1ID0gMDsgdSA8IHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudDsgKyt1KSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHUpLmZpcmVUaW1lID4gYmVmb3JlQ2hlY2tUaW1lU2Vjb25kcyAmJlxuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS5maXJlVGltZSA8PSBtb3Rpb25UaW1lU2Vjb25kc1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2ZpcmVkRXZlbnRWYWx1ZXMucHVzaEJhY2soXG4gICAgICAgICAgbmV3IGNzbVN0cmluZyh0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS52YWx1ZS5zKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9maXJlZEV2ZW50VmFsdWVzO1xuICB9XG5cbiAgcHVibGljIF9zb3VyY2VGcmFtZVJhdGU6IG51bWJlcjsgLy8g44Ot44O844OJ44GX44Gf44OV44Kh44Kk44Or44GuRlBT44CC6KiY6L+w44GM54Sh44GR44KM44Gw44OH44OV44Kp44Or44OI5YCkMTVmcHPjgajjgarjgotcbiAgcHVibGljIF9sb29wRHVyYXRpb25TZWNvbmRzOiBudW1iZXI7IC8vIG10buODleOCoeOCpOODq+OBp+Wumue+qeOBleOCjOOCi+S4gOmAo+OBruODouODvOOCt+ODp+ODs+OBrumVt+OBlVxuICBwdWJsaWMgX2lzTG9vcDogYm9vbGVhbjsgLy8g44Or44O844OX44GZ44KL44GLP1xuICBwdWJsaWMgX2lzTG9vcEZhZGVJbjogYm9vbGVhbjsgLy8g44Or44O844OX5pmC44Gr44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544GL44Gp44GG44GL44Gu44OV44Op44Kw44CC5Yid5pyf5YCk44Gn44Gv5pyJ5Yq544CCXG4gIHB1YmxpYyBfbGFzdFdlaWdodDogbnVtYmVyOyAvLyDmnIDlvozjgavoqK3lrprjgZXjgozjgZ/ph43jgb9cblxuICBwdWJsaWMgX21vdGlvbkRhdGE6IEN1YmlzbU1vdGlvbkRhdGE7IC8vIOWun+mam+OBruODouODvOOCt+ODp+ODs+ODh+ODvOOCv+acrOS9k1xuXG4gIHB1YmxpYyBfZXllQmxpbmtQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOiHquWLleOBvuOBsOOBn+OBjeOCkumBqeeUqOOBmeOCi+ODkeODqeODoeODvOOCv0lE44OP44Oz44OJ44Or44Gu44Oq44K544OI44CCICDjg6Ljg4fjg6vvvIjjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDvvInjgajjg5Hjg6njg6Hjg7zjgr/jgpLlr77lv5zku5jjgZHjgovjgIJcbiAgcHVibGljIF9saXBTeW5jUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDjg6rjg4Pjg5fjgrfjg7Pjgq/jgpLpgannlKjjgZnjgovjg5Hjg6njg6Hjg7zjgr9JROODj+ODs+ODieODq+OBruODquOCueODiOOAgiAg44Oi44OH44Or77yI44Oi44OH44Or44K744OD44OG44Kj44Oz44Kw77yJ44Go44OR44Op44Oh44O844K/44KS5a++5b+c5LuY44GR44KL44CCXG5cbiAgcHVibGljIF9tb2RlbEN1cnZlSWRFeWVCbGluazogQ3ViaXNtSWRIYW5kbGU7IC8vIOODouODh+ODq+OBjOaMgeOBpOiHquWLleOBvuOBsOOBn+OBjeeUqOODkeODqeODoeODvOOCv0lE44Gu44OP44Oz44OJ44Or44CCICDjg6Ljg4fjg6vjgajjg6Ljg7zjgrfjg6fjg7PjgpLlr77lv5zku5jjgZHjgovjgIJcbiAgcHVibGljIF9tb2RlbEN1cnZlSWRMaXBTeW5jOiBDdWJpc21JZEhhbmRsZTsgLy8g44Oi44OH44Or44GM5oyB44Gk44Oq44OD44OX44K344Oz44Kv55So44OR44Op44Oh44O844K/SUTjga7jg4/jg7Pjg4njg6vjgIIgIOODouODh+ODq+OBqOODouODvOOCt+ODp+ODs+OCkuWvvuW/nOS7mOOBkeOCi+OAglxufVxuXG4vLyBOYW1lc3BhY2UgZGVmaW5pdGlvbiBmb3IgY29tcGF0aWJpbGl0eS5cbmltcG9ydCAqIGFzICQgZnJvbSAnLi9jdWJpc21tb3Rpb24nO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIHtcbiAgZXhwb3J0IGNvbnN0IEN1YmlzbU1vdGlvbiA9ICQuQ3ViaXNtTW90aW9uO1xuICBleHBvcnQgdHlwZSBDdWJpc21Nb3Rpb24gPSAkLkN1YmlzbU1vdGlvbjtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCI4MzdlOTY1Y2MzM2IyNjllODkyMVwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9