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
    var pos = motionData.points.at(pointPosition);
    for (var i = curve.baseSegmentIndex; i < totalSegmentCount; ++i) {
        pointPosition =
            motionData.segments.at(i).basePointIndex +
                (motionData.segments.at(i).segmentType ==
                    cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier
                    ? 3
                    : 1);
        if (pos.time > time) {
            target = i;
            break;
        }
    }
    if (target == -1) {
        return pos.value;
    }
    var segment = motionData.segments.at(target);
    return segment.evaluate(motionData.points.get(segment.basePointIndex), time);
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
/******/ 	__webpack_require__.h = function() { return "bea77bf20adb60e416e5"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43NzUyMzk2MmYzMzZlMTEzYWVmMy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEscUlBQTJEO0FBQzNELDhHQUFnRDtBQUVoRCwyR0FBOEM7QUFFOUMsbUhBSThCO0FBQzlCLG1IQUF3RTtBQUN4RSx3SUFRZ0M7QUFDaEMsNEhBQTRFO0FBRzVFLElBQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUNoQyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQUN4QyxJQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztBQUs1QyxJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUV2QyxTQUFTLFVBQVUsQ0FDakIsQ0FBb0IsRUFDcEIsQ0FBb0IsRUFDcEIsQ0FBUztJQUVULElBQU0sTUFBTSxHQUFzQixJQUFJLHdDQUFpQixFQUFFLENBQUM7SUFFMUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBMkIsRUFBRSxJQUFZO0lBQy9ELElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVFLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtRQUNYLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDVDtJQUVELE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBMkIsRUFBRSxJQUFZO0lBQy9ELElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVFLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtRQUNYLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDVDtJQUVELElBQU0sR0FBRyxHQUFzQixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRSxJQUFNLEdBQUcsR0FBc0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsSUFBTSxHQUFHLEdBQXNCLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRW5FLElBQU0sSUFBSSxHQUFzQixVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxJQUFNLElBQUksR0FBc0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFeEQsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDekMsQ0FBQztBQUVELFNBQVMsMEJBQTBCLENBQ2pDLE1BQTJCLEVBQzNCLElBQVk7SUFFWixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFFckIsSUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDO0lBQ3ZCLElBQUksRUFBRSxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDaEMsSUFBSSxFQUFFLEdBQVcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNoQyxJQUFJLEdBQUcsR0FBVyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pDLElBQUksR0FBRyxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFakMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ2IsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVYsS0FBSyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNsQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFO1lBQ3BCLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDUCxNQUFNO1NBQ1A7UUFFRCxJQUFJLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDUCxNQUFNO1NBQ1A7UUFFRCxJQUFJLE9BQU8sR0FBVyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN2QixHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQU0sT0FBTyxHQUFXLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM5QyxJQUFNLE9BQU8sR0FBVyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUMsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxPQUFPLEVBQUU7WUFDZixFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLElBQUksT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1AsTUFBTTthQUNQO1lBRUQsRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUNiLEdBQUcsR0FBRyxPQUFPLENBQUM7U0FDZjthQUFNO1lBQ0wsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxFQUFFO2dCQUN6QixDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNQLE1BQU07YUFDUDtZQUVELEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDYixHQUFHLEdBQUcsT0FBTyxDQUFDO1NBQ2Y7S0FDRjtJQUVELElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNYLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDckI7SUFFRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7UUFDWCxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ1Q7SUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7UUFDWCxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ1Q7SUFFRCxJQUFNLEdBQUcsR0FBc0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsSUFBTSxHQUFHLEdBQXNCLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQU0sR0FBRyxHQUFzQixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuRSxJQUFNLElBQUksR0FBc0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsSUFBTSxJQUFJLEdBQXNCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhELE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxTQUFTLG1DQUFtQyxDQUMxQyxNQUEyQixFQUMzQixJQUFZO0lBRVosSUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDO0lBQ3ZCLElBQU0sRUFBRSxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEMsSUFBTSxFQUFFLEdBQVcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsQyxJQUFNLEdBQUcsR0FBVyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25DLElBQU0sR0FBRyxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFbkMsSUFBTSxDQUFDLEdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDbEQsSUFBTSxDQUFDLEdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDbkQsSUFBTSxDQUFDLEdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLElBQU0sQ0FBQyxHQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFekIsSUFBTSxDQUFDLEdBQVcsdUJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuRSxJQUFNLEdBQUcsR0FBc0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsSUFBTSxHQUFHLEdBQXNCLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQU0sR0FBRyxHQUFzQixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuRSxJQUFNLElBQUksR0FBc0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsSUFBTSxJQUFJLEdBQXNCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhELE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxNQUEyQixFQUFFLElBQVk7SUFDaEUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUM3QixNQUEyQixFQUMzQixJQUFZO0lBRVosT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FDcEIsVUFBNEIsRUFDNUIsS0FBYSxFQUNiLElBQVk7SUFHWixJQUFNLEtBQUssR0FBc0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFN0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEIsSUFBTSxpQkFBaUIsR0FBVyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUM5RSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsSUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEQsS0FBSyxJQUFJLENBQUMsR0FBVyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBRXZFLGFBQWE7WUFDWCxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjO2dCQUN4QyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7b0JBQ3RDLDhDQUF1QixDQUFDLDhCQUE4QjtvQkFDcEQsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR1QsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRTtZQUNuQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsTUFBTTtTQUNQO0tBQ0Y7SUFFRCxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNoQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7S0FDbEI7SUFFRCxJQUFNLE9BQU8sR0FBd0IsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEUsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBT0Q7SUFBa0MsZ0NBQWE7SUFzYzdDO1FBQUEsWUFDRSxpQkFBTyxTQVdSO1FBVkMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixLQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDakMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsS0FBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxLQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQzs7SUFDbkMsQ0FBQztJQXpjYSxtQkFBTSxHQUFwQixVQUNFLE1BQW1CLEVBQ25CLElBQVksRUFDWix1QkFBZ0Q7UUFFaEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsR0FBRyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQztRQUloRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFTTSx5Q0FBa0IsR0FBekIsVUFDRSxLQUFrQixFQUNsQixlQUF1QixFQUN2QixVQUFrQixFQUNsQixnQkFBd0M7UUFFeEMsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyx1Q0FBZSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FDL0Qsa0JBQWtCLENBQ25CLENBQUM7U0FDSDtRQUVELElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksRUFBRTtZQUNyQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsdUNBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQzlELGlCQUFpQixDQUNsQixDQUFDO1NBQ0g7UUFFRCxJQUFJLGlCQUFpQixHQUNuQixlQUFlLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEQsSUFBSSxpQkFBaUIsR0FBRyxHQUFHLEVBQUU7WUFDM0IsaUJBQWlCLEdBQUcsR0FBRyxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxZQUFZLEdBQVcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUM1QyxJQUFJLGFBQWEsR0FBVyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRzdDLElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBR3RCLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxHQUFHLGFBQWEsRUFBRTtZQUN4RCxnQ0FBYyxFQUNaLGtDQUFrQyxFQUNsQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQ3JDLENBQUM7U0FDSDtRQUNELElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxHQUFHLGFBQWEsRUFBRTtZQUN2RCxnQ0FBYyxFQUNaLGlDQUFpQyxFQUNqQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQ3BDLENBQUM7U0FDSDtRQUVELElBQU0sU0FBUyxHQUNiLElBQUksQ0FBQyxjQUFjLElBQUksR0FBRztZQUN4QixDQUFDLENBQUMsR0FBRztZQUNMLENBQUMsQ0FBQyx1QkFBVSxDQUFDLGFBQWEsQ0FDdEIsQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FDdEIsQ0FBQztRQUVSLElBQU0sVUFBVSxHQUNkLElBQUksQ0FBQyxlQUFlLElBQUksR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUc7WUFDaEUsQ0FBQyxDQUFDLEdBQUc7WUFDTCxDQUFDLENBQUMsdUJBQVUsQ0FBQyxhQUFhLENBQ3RCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEdBQUcsZUFBZSxDQUFDO2dCQUMvQyxJQUFJLENBQUMsZUFBZSxDQUN2QixDQUFDO1FBQ1IsSUFBSSxLQUFhLENBQUM7UUFDbEIsSUFBSSxDQUFTLEVBQUUsY0FBc0IsQ0FBQztRQUd0QyxJQUFJLElBQUksR0FBVyxpQkFBaUIsQ0FBQztRQUVyQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUNuQztTQUNGO1FBRUQsSUFBTSxNQUFNLEdBQWlDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBR3JFLEtBQ0UsQ0FBQyxHQUFHLENBQUMsRUFDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVO1lBQy9CLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDZiw4Q0FBdUIsQ0FBQyw2QkFBNkIsRUFDdkQsRUFBRSxDQUFDLEVBQ0g7WUFFQSxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWpELElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUNqRCxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO2lCQUFNLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUN2RCxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQ3RCO1NBQ0Y7UUFFRCxJQUFJLHlCQUF5QixHQUFHLENBQUMsQ0FBQztRQUVsQyxPQUVFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVU7WUFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNmLDhDQUF1QixDQUFDLGlDQUFpQyxFQUMzRCxFQUFFLENBQUMsRUFDSDtZQUNBLHlCQUF5QixFQUFFLENBQUM7WUFHNUIsY0FBYyxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRzFELElBQUksY0FBYyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN4QixTQUFTO2FBQ1Y7WUFFRCxJQUFNLFdBQVcsR0FBVyxLQUFLLENBQUMsd0JBQXdCLENBQ3hELGNBQWMsQ0FDZixDQUFDO1lBR0YsS0FBSyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVqRCxJQUFJLGFBQWEsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUNyQyxLQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDVCxDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxhQUFhLEVBQzdELEVBQUUsQ0FBQyxFQUNIO29CQUNBLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDdkQsS0FBSyxJQUFJLGFBQWEsQ0FBQzt3QkFDdkIsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLE1BQU07cUJBQ1A7aUJBQ0Y7YUFDRjtZQUVELElBQUksWUFBWSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BDLEtBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFDNUQsRUFBRSxDQUFDLEVBQ0g7b0JBQ0EsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUN0RCxLQUFLLElBQUksWUFBWSxDQUFDO3dCQUN0QixZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdkIsTUFBTTtxQkFDUDtpQkFDRjthQUNGO1lBRUQsSUFBSSxDQUFDLFNBQVEsQ0FBQztZQUdkLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRTtnQkFFbkUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUM7YUFDdEQ7aUJBQU07Z0JBRUwsSUFBSSxHQUFHLFNBQVEsQ0FBQztnQkFDaEIsSUFBSSxJQUFJLFNBQVEsQ0FBQztnQkFFakIsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7b0JBQ2pDLEdBQUcsR0FBRyxTQUFTLENBQUM7aUJBQ2pCO3FCQUFNO29CQUNMLEdBQUc7d0JBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksR0FBRzs0QkFDNUIsQ0FBQyxDQUFDLEdBQUc7NEJBQ0wsQ0FBQyxDQUFDLHVCQUFVLENBQUMsYUFBYSxDQUN0QixDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dDQUN2RCxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FDMUIsQ0FBQztpQkFDVDtnQkFFRCxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRTtvQkFDbEMsSUFBSSxHQUFHLFVBQVUsQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0wsSUFBSTt3QkFDRixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxHQUFHOzRCQUMvQixnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHOzRCQUNqQyxDQUFDLENBQUMsR0FBRzs0QkFDTCxDQUFDLENBQUMsdUJBQVUsQ0FBQyxhQUFhLENBQ3RCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEdBQUcsZUFBZSxDQUFDO2dDQUMvQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FDM0IsQ0FBQztpQkFDVDtnQkFFRCxJQUFNLFdBQVcsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBR3RELENBQUMsR0FBRyxXQUFXLEdBQUcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsV0FBVyxDQUFDO2FBQ3ZEO1lBRUQsS0FBSyxDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDeEQ7UUFFRDtZQUNFLElBQUksYUFBYSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JDLEtBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFDN0QsRUFBRSxDQUFDLEVBQ0g7b0JBQ0EsSUFBTSxXQUFXLEdBQVcsS0FBSyxDQUFDLHFCQUFxQixDQUNyRCxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNqQyxDQUFDO29CQUdGLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO3dCQUMvQixTQUFTO3FCQUNWO29CQUVELElBQU0sQ0FBQyxHQUNMLFdBQVcsR0FBRyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUM7b0JBRTNELEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsRTthQUNGO1lBRUQsSUFBSSxZQUFZLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDcEMsS0FDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsYUFBYSxFQUM1RCxFQUFFLENBQUMsRUFDSDtvQkFDQSxJQUFNLFdBQVcsR0FBVyxLQUFLLENBQUMscUJBQXFCLENBQ3JELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2hDLENBQUM7b0JBR0YsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUU7d0JBQzlCLFNBQVM7cUJBQ1Y7b0JBRUQsSUFBTSxDQUFDLEdBQ0wsV0FBVyxHQUFHLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFFMUQsS0FBSyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2pFO2FBQ0Y7U0FDRjtRQUVELE9BRUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVTtZQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ2YsOENBQXVCLENBQUMsbUNBQW1DLEVBQzdELEVBQUUsQ0FBQyxFQUNIO1lBRUEsY0FBYyxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRzFELElBQUksY0FBYyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN4QixTQUFTO2FBQ1Y7WUFHRCxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWpELEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLGlCQUFpQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ2xELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBRXRCLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN0RDthQUNGO2lCQUFNO2dCQUNMLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlCO2dCQUVELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QztTQUNGO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQU1NLGdDQUFTLEdBQWhCLFVBQWlCLElBQWE7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQU9NLDZCQUFNLEdBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQU1NLHNDQUFlLEdBQXRCLFVBQXVCLFVBQW1CO1FBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFRTSxtQ0FBWSxHQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBT00sa0NBQVcsR0FBbEI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDekQsQ0FBQztJQU9NLHNDQUFlLEdBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDbkMsQ0FBQztJQVFNLDZDQUFzQixHQUE3QixVQUNFLFdBQTJCLEVBQzNCLEtBQWE7UUFFYixJQUFNLE1BQU0sR0FBaUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFckUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3BELElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ2hDLE9BQU87YUFDUjtTQUNGO0lBQ0gsQ0FBQztJQU9NLDhDQUF1QixHQUE5QixVQUNFLFdBQTJCLEVBQzNCLEtBQWE7UUFFYixJQUFNLE1BQU0sR0FBaUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFckUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3BELElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ2pDLE9BQU87YUFDUjtTQUNGO0lBQ0gsQ0FBQztJQU9NLDZDQUFzQixHQUE3QixVQUE4QixXQUEyQjtRQUN2RCxJQUFNLE1BQU0sR0FBaUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFckUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3BELElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO2FBQ2hDO1NBQ0Y7UUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQVFNLDhDQUF1QixHQUE5QixVQUErQixXQUEyQjtRQUN4RCxJQUFNLE1BQU0sR0FBaUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFckUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3BELElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2FBQ2pDO1NBQ0Y7UUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQU9NLG1DQUFZLEdBQW5CLFVBQ0Usb0JBQStDLEVBQy9DLG1CQUE4QztRQUU5QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsb0JBQW9CLENBQUM7UUFDbEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDO0lBQ2xELENBQUM7SUFzQk0sOEJBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQVFNLDRCQUFLLEdBQVosVUFBYSxVQUF1QixFQUFFLElBQVk7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHVDQUFnQixFQUFFLENBQUM7UUFFMUMsSUFBSSxJQUFJLEdBQXFCLElBQUksbUNBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRW5ELElBQU0sb0JBQW9CLEdBQVksSUFBSSxDQUFDLHVCQUF1QixDQUNoRSx1Q0FBb0IsQ0FBQyx5Q0FBeUMsQ0FDL0QsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWM7Z0JBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUN2RTthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7U0FDM0I7UUFFRCxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxlQUFlO2dCQUNsQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDekU7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFDM0Isd0NBQWlCLEVBQ2pCLElBQUksQ0FDTCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUNsQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsRUFDakMsMENBQW1CLEVBQ25CLElBQUksQ0FDTCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUNoQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsRUFDL0Isd0NBQWlCLEVBQ2pCLElBQUksQ0FDTCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFDM0Isd0NBQWlCLEVBQ2pCLElBQUksQ0FDTCxDQUFDO1FBRUYsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBRzFCLEtBQ0UsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUNsQixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQ3hDLEVBQUUsVUFBVSxFQUNaO1lBQ0EsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLElBQUksZUFBZSxFQUFFO2dCQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSTtvQkFDekMsOENBQXVCLENBQUMsNkJBQTZCLENBQUM7YUFDekQ7aUJBQU0sSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLElBQUksbUJBQW1CLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJO29CQUN6Qyw4Q0FBdUIsQ0FBQyxpQ0FBaUMsQ0FBQzthQUM3RDtpQkFBTSxJQUNMLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxxQkFBcUIsRUFDOUQ7Z0JBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUk7b0JBQ3pDLDhDQUF1QixDQUFDLG1DQUFtQyxDQUFDO2FBQy9EO2lCQUFNO2dCQUNMLGtDQUFnQixFQUNkLCtGQUErRixDQUNoRyxDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FDL0QsVUFBVSxDQUNYLENBQUM7WUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ3hCLFVBQVUsQ0FDWCxDQUFDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO1lBRXZDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsVUFBVSxDQUNYLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ3hCLFVBQVUsQ0FDWCxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsVUFBVSxDQUFDO2dCQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQztnQkFDNUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBR1QsS0FDRSxJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQ3ZCLGVBQWUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsVUFBVSxDQUFDLEdBRTdEO2dCQUNBLElBQUksZUFBZSxJQUFJLENBQUMsRUFBRTtvQkFDeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRTt3QkFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUMxQixpQkFBaUIsQ0FDbEIsQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO3FCQUNwQztvQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTt3QkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUN4QixlQUFlLENBQ2hCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsZUFBZSxDQUNoQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDdkU7b0JBRUQsZUFBZSxJQUFJLENBQUMsQ0FBQztvQkFDckIsZUFBZSxJQUFJLENBQUMsQ0FBQztpQkFDdEI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYzt3QkFDNUQsZUFBZSxHQUFHLENBQUMsQ0FBQztpQkFDdkI7Z0JBRUQsSUFBTSxPQUFPLEdBQVcsSUFBSSxDQUFDLHFCQUFxQixDQUNoRCxVQUFVLEVBQ1YsZUFBZSxDQUNoQixDQUFDO2dCQUNGLFFBQVEsT0FBTyxFQUFFO29CQUNmLEtBQUssOENBQXVCLENBQUMsOEJBQThCLENBQUMsQ0FBQzt3QkFDM0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRTs0QkFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVztnQ0FDekQsOENBQXVCLENBQUMsOEJBQThCLENBQUM7NEJBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDMUIsaUJBQWlCLENBQ2xCLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQzt5QkFDN0I7d0JBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7NEJBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsZUFBZSxDQUNoQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQ2pDLFVBQVUsRUFDVixlQUFlLEdBQUcsQ0FBQyxDQUNwQixDQUFDOzRCQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsZUFBZSxDQUNoQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQ2xDLFVBQVUsRUFDVixlQUFlLEdBQUcsQ0FBQyxDQUNwQixDQUFDO3lCQUNIO3dCQUVELGVBQWUsSUFBSSxDQUFDLENBQUM7d0JBQ3JCLGVBQWUsSUFBSSxDQUFDLENBQUM7d0JBRXJCLE1BQU07cUJBQ1A7b0JBQ0QsS0FBSyw4Q0FBdUIsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXOzRCQUN6RCw4Q0FBdUIsQ0FBQyw4QkFBOEIsQ0FBQzt3QkFFekQsSUFBSSxvQkFBb0IsSUFBSSx3QkFBd0IsRUFBRTs0QkFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUMxQixpQkFBaUIsQ0FDbEIsQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO3lCQUM3Qjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQzFCLGlCQUFpQixDQUNsQixDQUFDLFFBQVEsR0FBRyxtQ0FBbUMsQ0FBQzt5QkFDbEQ7d0JBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7NEJBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsZUFBZSxDQUNoQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQ2pDLFVBQVUsRUFDVixlQUFlLEdBQUcsQ0FBQyxDQUNwQixDQUFDOzRCQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsZUFBZSxDQUNoQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQ2xDLFVBQVUsRUFDVixlQUFlLEdBQUcsQ0FBQyxDQUNwQixDQUFDO3lCQUNIO3dCQUVELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRTs0QkFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUN4QixlQUFlLEdBQUcsQ0FBQyxDQUNwQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQ2pDLFVBQVUsRUFDVixlQUFlLEdBQUcsQ0FBQyxDQUNwQixDQUFDOzRCQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsZUFBZSxHQUFHLENBQUMsQ0FDcEIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUNsQyxVQUFVLEVBQ1YsZUFBZSxHQUFHLENBQUMsQ0FDcEIsQ0FBQzt5QkFDSDt3QkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDeEIsZUFBZSxHQUFHLENBQUMsQ0FDcEIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUNqQyxVQUFVLEVBQ1YsZUFBZSxHQUFHLENBQUMsQ0FDcEIsQ0FBQzs0QkFDRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ3hCLGVBQWUsR0FBRyxDQUFDLENBQ3BCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDbEMsVUFBVSxFQUNWLGVBQWUsR0FBRyxDQUFDLENBQ3BCLENBQUM7eUJBQ0g7d0JBRUQsZUFBZSxJQUFJLENBQUMsQ0FBQzt3QkFDckIsZUFBZSxJQUFJLENBQUMsQ0FBQzt3QkFFckIsTUFBTTtxQkFDUDtvQkFFRCxLQUFLLDhDQUF1QixDQUFDLCtCQUErQixDQUFDLENBQUM7d0JBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVc7NEJBQ3pELDhDQUF1QixDQUFDLCtCQUErQixDQUFDO3dCQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQzFCLGlCQUFpQixDQUNsQixDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7d0JBRTdCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFOzRCQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ3hCLGVBQWUsQ0FDaEIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUNqQyxVQUFVLEVBQ1YsZUFBZSxHQUFHLENBQUMsQ0FDcEIsQ0FBQzs0QkFDRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ3hCLGVBQWUsQ0FDaEIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUNsQyxVQUFVLEVBQ1YsZUFBZSxHQUFHLENBQUMsQ0FDcEIsQ0FBQzt5QkFDSDt3QkFFRCxlQUFlLElBQUksQ0FBQyxDQUFDO3dCQUNyQixlQUFlLElBQUksQ0FBQyxDQUFDO3dCQUVyQixNQUFNO3FCQUNQO29CQUVELEtBQUssOENBQXVCLENBQUMsc0NBQXNDLENBQUMsQ0FBQzt3QkFDbkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVzs0QkFDekQsOENBQXVCLENBQUMsc0NBQXNDLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDMUIsaUJBQWlCLENBQ2xCLENBQUMsUUFBUSxHQUFHLHNCQUFzQixDQUFDO3dCQUVwQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTs0QkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUN4QixlQUFlLENBQ2hCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDakMsVUFBVSxFQUNWLGVBQWUsR0FBRyxDQUFDLENBQ3BCLENBQUM7NEJBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUN4QixlQUFlLENBQ2hCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDbEMsVUFBVSxFQUNWLGVBQWUsR0FBRyxDQUFDLENBQ3BCLENBQUM7eUJBQ0g7d0JBRUQsZUFBZSxJQUFJLENBQUMsQ0FBQzt3QkFDckIsZUFBZSxJQUFJLENBQUMsQ0FBQzt3QkFFckIsTUFBTTtxQkFDUDtvQkFDRCxPQUFPLENBQUMsQ0FBQzt3QkFDUCw0QkFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNkLE1BQU07cUJBQ1A7aUJBQ0Y7Z0JBRUQsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUN0RCxFQUFFLGlCQUFpQixDQUFDO2FBQ3JCO1NBQ0Y7UUFFRCxLQUNFLElBQUksYUFBYSxHQUFHLENBQUMsRUFDckIsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFDcEMsRUFBRSxhQUFhLEVBQ2Y7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQ3BFLGFBQWEsQ0FDZCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNsRSxhQUFhLENBQ2QsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNkLENBQUM7SUFXTSxvQ0FBYSxHQUFwQixVQUNFLHNCQUE4QixFQUM5QixpQkFBeUI7UUFFekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUdyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDcEQsSUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLHNCQUFzQjtnQkFDL0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsRUFDM0Q7Z0JBQ0EsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FDN0IsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ3JELENBQUM7YUFDSDtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQWVILG1CQUFDO0FBQUQsQ0FBQyxDQWgwQmlDLDZCQUFhLEdBZzBCOUM7QUFoMEJZLG9DQUFZO0FBbTBCekIsaUhBQW9DO0FBRXBDLElBQWlCLHFCQUFxQixDQUdyQztBQUhELFdBQWlCLHFCQUFxQjtJQUN2QixrQ0FBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFFN0MsQ0FBQyxFQUhnQixxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQUdyQzs7Ozs7Ozs7O1VDdGpDRCxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MaXZlMmQvLi4vLi4vLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9uLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgQ3ViaXNtSWRIYW5kbGUgfSBmcm9tICcuLi9pZC9jdWJpc21pZCc7XG5pbXBvcnQgeyBDdWJpc21GcmFtZXdvcmsgfSBmcm9tICcuLi9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuaW1wb3J0IHsgQ3ViaXNtTWF0aCB9IGZyb20gJy4uL21hdGgvY3ViaXNtbWF0aCc7XG5pbXBvcnQgeyBDdWJpc21Nb2RlbCB9IGZyb20gJy4uL21vZGVsL2N1YmlzbW1vZGVsJztcbmltcG9ydCB7IGNzbVN0cmluZyB9IGZyb20gJy4uL3R5cGUvY3Ntc3RyaW5nJztcbmltcG9ydCB7IGNzbVZlY3RvciB9IGZyb20gJy4uL3R5cGUvY3NtdmVjdG9yJztcbmltcG9ydCB7XG4gIENTTV9BU1NFUlQsXG4gIEN1YmlzbUxvZ0RlYnVnLFxuICBDdWJpc21Mb2dXYXJuaW5nXG59IGZyb20gJy4uL3V0aWxzL2N1YmlzbWRlYnVnJztcbmltcG9ydCB7IEFDdWJpc21Nb3Rpb24sIEZpbmlzaGVkTW90aW9uQ2FsbGJhY2sgfSBmcm9tICcuL2FjdWJpc21tb3Rpb24nO1xuaW1wb3J0IHtcbiAgQ3ViaXNtTW90aW9uQ3VydmUsXG4gIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LFxuICBDdWJpc21Nb3Rpb25EYXRhLFxuICBDdWJpc21Nb3Rpb25FdmVudCxcbiAgQ3ViaXNtTW90aW9uUG9pbnQsXG4gIEN1YmlzbU1vdGlvblNlZ21lbnQsXG4gIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlXG59IGZyb20gJy4vY3ViaXNtbW90aW9uaW50ZXJuYWwnO1xuaW1wb3J0IHsgQ3ViaXNtTW90aW9uSnNvbiwgRXZhbHVhdGlvbk9wdGlvbkZsYWcgfSBmcm9tICcuL2N1YmlzbW1vdGlvbmpzb24nO1xuaW1wb3J0IHsgQ3ViaXNtTW90aW9uUXVldWVFbnRyeSB9IGZyb20gJy4vY3ViaXNtbW90aW9ucXVldWVlbnRyeSc7XG5cbmNvbnN0IEVmZmVjdE5hbWVFeWVCbGluayA9ICdFeWVCbGluayc7XG5jb25zdCBFZmZlY3ROYW1lTGlwU3luYyA9ICdMaXBTeW5jJztcbmNvbnN0IFRhcmdldE5hbWVNb2RlbCA9ICdNb2RlbCc7XG5jb25zdCBUYXJnZXROYW1lUGFyYW1ldGVyID0gJ1BhcmFtZXRlcic7XG5jb25zdCBUYXJnZXROYW1lUGFydE9wYWNpdHkgPSAnUGFydE9wYWNpdHknO1xuXG4vKipcbiAqIEN1YmlzbSBTREsgUjIg5Lul5YmN44Gu44Oi44O844K344On44Oz44KS5YaN54++44GV44Gb44KL44Gq44KJIHRydWUg44CB44Ki44OL44Oh44O844K/44Gu44Oi44O844K344On44Oz44KS5q2j44GX44GP5YaN54++44GZ44KL44Gq44KJIGZhbHNlIOOAglxuICovXG5jb25zdCBVc2VPbGRCZXppZXJzQ3VydmVNb3Rpb24gPSBmYWxzZTtcblxuZnVuY3Rpb24gbGVycFBvaW50cyhcbiAgYTogQ3ViaXNtTW90aW9uUG9pbnQsXG4gIGI6IEN1YmlzbU1vdGlvblBvaW50LFxuICB0OiBudW1iZXJcbik6IEN1YmlzbU1vdGlvblBvaW50IHtcbiAgY29uc3QgcmVzdWx0OiBDdWJpc21Nb3Rpb25Qb2ludCA9IG5ldyBDdWJpc21Nb3Rpb25Qb2ludCgpO1xuXG4gIHJlc3VsdC50aW1lID0gYS50aW1lICsgKGIudGltZSAtIGEudGltZSkgKiB0O1xuICByZXN1bHQudmFsdWUgPSBhLnZhbHVlICsgKGIudmFsdWUgLSBhLnZhbHVlKSAqIHQ7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbGluZWFyRXZhbHVhdGUocG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLCB0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgdDogbnVtYmVyID0gKHRpbWUgLSBwb2ludHNbMF0udGltZSkgLyAocG9pbnRzWzFdLnRpbWUgLSBwb2ludHNbMF0udGltZSk7XG5cbiAgaWYgKHQgPCAwLjApIHtcbiAgICB0ID0gMC4wO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50c1swXS52YWx1ZSArIChwb2ludHNbMV0udmFsdWUgLSBwb2ludHNbMF0udmFsdWUpICogdDtcbn1cblxuZnVuY3Rpb24gYmV6aWVyRXZhbHVhdGUocG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLCB0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgdDogbnVtYmVyID0gKHRpbWUgLSBwb2ludHNbMF0udGltZSkgLyAocG9pbnRzWzNdLnRpbWUgLSBwb2ludHNbMF0udGltZSk7XG5cbiAgaWYgKHQgPCAwLjApIHtcbiAgICB0ID0gMC4wO1xuICB9XG5cbiAgY29uc3QgcDAxOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHQpO1xuICBjb25zdCBwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMV0sIHBvaW50c1syXSwgdCk7XG4gIGNvbnN0IHAyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1syXSwgcG9pbnRzWzNdLCB0KTtcblxuICBjb25zdCBwMDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDAxLCBwMTIsIHQpO1xuICBjb25zdCBwMTIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDEyLCBwMjMsIHQpO1xuXG4gIHJldHVybiBsZXJwUG9pbnRzKHAwMTIsIHAxMjMsIHQpLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBiZXppZXJFdmFsdWF0ZUJpbmFyeVNlYXJjaChcbiAgcG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLFxuICB0aW1lOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGNvbnN0IHhfZXJyb3IgPSAwLjAxO1xuXG4gIGNvbnN0IHg6IG51bWJlciA9IHRpbWU7XG4gIGxldCB4MTogbnVtYmVyID0gcG9pbnRzWzBdLnRpbWU7XG4gIGxldCB4MjogbnVtYmVyID0gcG9pbnRzWzNdLnRpbWU7XG4gIGxldCBjeDE6IG51bWJlciA9IHBvaW50c1sxXS50aW1lO1xuICBsZXQgY3gyOiBudW1iZXIgPSBwb2ludHNbMl0udGltZTtcblxuICBsZXQgdGEgPSAwLjA7XG4gIGxldCB0YiA9IDEuMDtcbiAgbGV0IHQgPSAwLjA7XG4gIGxldCBpID0gMDtcblxuICBmb3IgKGxldCB2YXIzMyA9IHRydWU7IGkgPCAyMDsgKytpKSB7XG4gICAgaWYgKHggPCB4MSArIHhfZXJyb3IpIHtcbiAgICAgIHQgPSB0YTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICh4MiAtIHhfZXJyb3IgPCB4KSB7XG4gICAgICB0ID0gdGI7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsZXQgY2VudGVyeDogbnVtYmVyID0gKGN4MSArIGN4MikgKiAwLjU7XG4gICAgY3gxID0gKHgxICsgY3gxKSAqIDAuNTtcbiAgICBjeDIgPSAoeDIgKyBjeDIpICogMC41O1xuICAgIGNvbnN0IGN0cmx4MTI6IG51bWJlciA9IChjeDEgKyBjZW50ZXJ4KSAqIDAuNTtcbiAgICBjb25zdCBjdHJseDIxOiBudW1iZXIgPSAoY3gyICsgY2VudGVyeCkgKiAwLjU7XG4gICAgY2VudGVyeCA9IChjdHJseDEyICsgY3RybHgyMSkgKiAwLjU7XG4gICAgaWYgKHggPCBjZW50ZXJ4KSB7XG4gICAgICB0YiA9ICh0YSArIHRiKSAqIDAuNTtcbiAgICAgIGlmIChjZW50ZXJ4IC0geF9lcnJvciA8IHgpIHtcbiAgICAgICAgdCA9IHRiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgeDIgPSBjZW50ZXJ4O1xuICAgICAgY3gyID0gY3RybHgxMjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGEgPSAodGEgKyB0YikgKiAwLjU7XG4gICAgICBpZiAoeCA8IGNlbnRlcnggKyB4X2Vycm9yKSB7XG4gICAgICAgIHQgPSB0YTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHgxID0gY2VudGVyeDtcbiAgICAgIGN4MSA9IGN0cmx4MjE7XG4gICAgfVxuICB9XG5cbiAgaWYgKGkgPT0gMjApIHtcbiAgICB0ID0gKHRhICsgdGIpICogMC41O1xuICB9XG5cbiAgaWYgKHQgPCAwLjApIHtcbiAgICB0ID0gMC4wO1xuICB9XG4gIGlmICh0ID4gMS4wKSB7XG4gICAgdCA9IDEuMDtcbiAgfVxuXG4gIGNvbnN0IHAwMTogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdLCB0KTtcbiAgY29uc3QgcDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0sIHQpO1xuICBjb25zdCBwMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMl0sIHBvaW50c1szXSwgdCk7XG5cbiAgY29uc3QgcDAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAwMSwgcDEyLCB0KTtcbiAgY29uc3QgcDEyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAxMiwgcDIzLCB0KTtcblxuICByZXR1cm4gbGVycFBvaW50cyhwMDEyLCBwMTIzLCB0KS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gYmV6aWVyRXZhbHVhdGVDYXJkYW5vSW50ZXJwcmV0YXRpb24oXG4gIHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSxcbiAgdGltZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICBjb25zdCB4OiBudW1iZXIgPSB0aW1lO1xuICBjb25zdCB4MTogbnVtYmVyID0gcG9pbnRzWzBdLnRpbWU7XG4gIGNvbnN0IHgyOiBudW1iZXIgPSBwb2ludHNbM10udGltZTtcbiAgY29uc3QgY3gxOiBudW1iZXIgPSBwb2ludHNbMV0udGltZTtcbiAgY29uc3QgY3gyOiBudW1iZXIgPSBwb2ludHNbMl0udGltZTtcblxuICBjb25zdCBhOiBudW1iZXIgPSB4MiAtIDMuMCAqIGN4MiArIDMuMCAqIGN4MSAtIHgxO1xuICBjb25zdCBiOiBudW1iZXIgPSAzLjAgKiBjeDIgLSA2LjAgKiBjeDEgKyAzLjAgKiB4MTtcbiAgY29uc3QgYzogbnVtYmVyID0gMy4wICogY3gxIC0gMy4wICogeDE7XG4gIGNvbnN0IGQ6IG51bWJlciA9IHgxIC0geDtcblxuICBjb25zdCB0OiBudW1iZXIgPSBDdWJpc21NYXRoLmNhcmRhbm9BbGdvcml0aG1Gb3JCZXppZXIoYSwgYiwgYywgZCk7XG5cbiAgY29uc3QgcDAxOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHQpO1xuICBjb25zdCBwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMV0sIHBvaW50c1syXSwgdCk7XG4gIGNvbnN0IHAyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1syXSwgcG9pbnRzWzNdLCB0KTtcblxuICBjb25zdCBwMDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDAxLCBwMTIsIHQpO1xuICBjb25zdCBwMTIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDEyLCBwMjMsIHQpO1xuXG4gIHJldHVybiBsZXJwUG9pbnRzKHAwMTIsIHAxMjMsIHQpLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBzdGVwcGVkRXZhbHVhdGUocG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLCB0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gcG9pbnRzWzBdLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlU3RlcHBlZEV2YWx1YXRlKFxuICBwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sXG4gIHRpbWU6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIHBvaW50c1sxXS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gZXZhbHVhdGVDdXJ2ZShcbiAgbW90aW9uRGF0YTogQ3ViaXNtTW90aW9uRGF0YSxcbiAgaW5kZXg6IG51bWJlcixcbiAgdGltZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICAvLyBGaW5kIHNlZ21lbnQgdG8gZXZhbHVhdGUuXG4gIGNvbnN0IGN1cnZlOiBDdWJpc21Nb3Rpb25DdXJ2ZSA9IG1vdGlvbkRhdGEuY3VydmVzLmF0KGluZGV4KTtcblxuICBsZXQgdGFyZ2V0ID0gLTE7XG4gIGNvbnN0IHRvdGFsU2VnbWVudENvdW50OiBudW1iZXIgPSBjdXJ2ZS5iYXNlU2VnbWVudEluZGV4ICsgY3VydmUuc2VnbWVudENvdW50O1xuICBsZXQgcG9pbnRQb3NpdGlvbiA9IDA7XG4gIGNvbnN0IHBvcyA9IG1vdGlvbkRhdGEucG9pbnRzLmF0KHBvaW50UG9zaXRpb24pO1xuICBmb3IgKGxldCBpOiBudW1iZXIgPSBjdXJ2ZS5iYXNlU2VnbWVudEluZGV4OyBpIDwgdG90YWxTZWdtZW50Q291bnQ7ICsraSkge1xuICAgIC8vIEdldCBmaXJzdCBwb2ludCBvZiBuZXh0IHNlZ21lbnQuXG4gICAgcG9pbnRQb3NpdGlvbiA9XG4gICAgICBtb3Rpb25EYXRhLnNlZ21lbnRzLmF0KGkpLmJhc2VQb2ludEluZGV4ICtcbiAgICAgIChtb3Rpb25EYXRhLnNlZ21lbnRzLmF0KGkpLnNlZ21lbnRUeXBlID09XG4gICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9CZXppZXJcbiAgICAgICAgPyAzXG4gICAgICAgIDogMSk7XG5cbiAgICAvLyBCcmVhayBpZiB0aW1lIGxpZXMgd2l0aGluIGN1cnJlbnQgc2VnbWVudC5cbiAgICBpZiAocG9zLnRpbWUgPiB0aW1lKSB7XG4gICAgICB0YXJnZXQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRhcmdldCA9PSAtMSkge1xuICAgIHJldHVybiBwb3MudmFsdWU7XG4gIH1cblxuICBjb25zdCBzZWdtZW50OiBDdWJpc21Nb3Rpb25TZWdtZW50ID0gbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0YXJnZXQpO1xuXG4gIHJldHVybiBzZWdtZW50LmV2YWx1YXRlKG1vdGlvbkRhdGEucG9pbnRzLmdldChzZWdtZW50LmJhc2VQb2ludEluZGV4KSwgdGltZSk7XG59XG5cbi8qKlxuICog44Oi44O844K344On44Oz44Kv44Op44K5XG4gKlxuICog44Oi44O844K344On44Oz44Gu44Kv44Op44K544CCXG4gKi9cbmV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb24gZXh0ZW5kcyBBQ3ViaXNtTW90aW9uIHtcbiAgLyoqXG4gICAqIOOCpOODs+OCueOCv+ODs+OCueOCkuS9nOaIkOOBmeOCi1xuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIG1vdGlvbjMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSDjg5Djg4Pjg5XjgqHjga7jgrXjgqTjgrpcbiAgICogQHBhcmFtIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huaZguOBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICAgKiBAcmV0dXJuIOS9nOaIkOOBleOCjOOBn+OCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoXG4gICAgYnVmZmVyOiBBcnJheUJ1ZmZlcixcbiAgICBzaXplOiBudW1iZXIsXG4gICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICk6IEN1YmlzbU1vdGlvbiB7XG4gICAgY29uc3QgcmV0ID0gbmV3IEN1YmlzbU1vdGlvbigpO1xuXG4gICAgcmV0LnBhcnNlKGJ1ZmZlciwgc2l6ZSk7XG4gICAgcmV0Ll9zb3VyY2VGcmFtZVJhdGUgPSByZXQuX21vdGlvbkRhdGEuZnBzO1xuICAgIHJldC5fbG9vcER1cmF0aW9uU2Vjb25kcyA9IHJldC5fbW90aW9uRGF0YS5kdXJhdGlvbjtcbiAgICByZXQuX29uRmluaXNoZWRNb3Rpb24gPSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcjtcblxuICAgIC8vIE5PVEU6IEVkaXRvcuOBp+OBr+ODq+ODvOODl+OBguOCiuOBruODouODvOOCt+ODp+ODs+abuOOBjeWHuuOBl+OBr+mdnuWvvuW/nFxuICAgIC8vIHJldC0+X2xvb3AgPSAocmV0LT5fbW90aW9uRGF0YS0+TG9vcCA+IDApO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44Gu44OR44Op44Oh44O844K/44Gu5pu05paw44Gu5a6f6KGMXG4gICAqIEBwYXJhbSBtb2RlbCAgICAgICAgICAgICDlr77osaHjga7jg6Ljg4fjg6tcbiAgICogQHBhcmFtIHVzZXJUaW1lU2Vjb25kcyAgIOePvuWcqOOBruaZguWIu1vnp5JdXG4gICAqIEBwYXJhbSBmYWRlV2VpZ2h0ICAgICAgICDjg6Ljg7zjgrfjg6fjg7Pjga7ph43jgb9cbiAgICogQHBhcmFtIG1vdGlvblF1ZXVlRW50cnkgIEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlcuOBp+euoeeQhuOBleOCjOOBpuOBhOOCi+ODouODvOOCt+ODp+ODs1xuICAgKi9cbiAgcHVibGljIGRvVXBkYXRlUGFyYW1ldGVycyhcbiAgICBtb2RlbDogQ3ViaXNtTW9kZWwsXG4gICAgdXNlclRpbWVTZWNvbmRzOiBudW1iZXIsXG4gICAgZmFkZVdlaWdodDogbnVtYmVyLFxuICAgIG1vdGlvblF1ZXVlRW50cnk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlcbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rID09IG51bGwpIHtcbiAgICAgIHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgICBFZmZlY3ROYW1lRXllQmxpbmtcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fbW9kZWxDdXJ2ZUlkTGlwU3luYyA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgICAgRWZmZWN0TmFtZUxpcFN5bmNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IHRpbWVPZmZzZXRTZWNvbmRzOiBudW1iZXIgPVxuICAgICAgdXNlclRpbWVTZWNvbmRzIC0gbW90aW9uUXVldWVFbnRyeS5nZXRTdGFydFRpbWUoKTtcblxuICAgIGlmICh0aW1lT2Zmc2V0U2Vjb25kcyA8IDAuMCkge1xuICAgICAgdGltZU9mZnNldFNlY29uZHMgPSAwLjA7IC8vIOOCqOODqeODvOWbnumBv1xuICAgIH1cblxuICAgIGxldCBsaXBTeW5jVmFsdWU6IG51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgbGV0IGV5ZUJsaW5rVmFsdWU6IG51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICAvL+OBvuOBsOOBn+OBjeOAgeODquODg+ODl+OCt+ODs+OCr+OBruOBhuOBoeODouODvOOCt+ODp+ODs+OBrumBqeeUqOOCkuaknOWHuuOBmeOCi+OBn+OCgeOBruODk+ODg+ODiO+8iG1heEZsYWdDb3VudOWAi+OBvuOBp1xuICAgIGNvbnN0IE1heFRhcmdldFNpemUgPSA2NDtcbiAgICBsZXQgbGlwU3luY0ZsYWdzID0gMDtcbiAgICBsZXQgZXllQmxpbmtGbGFncyA9IDA7XG5cbiAgICAvL+eerOOBjeOAgeODquODg+ODl+OCt+ODs+OCr+OBruOCv+ODvOOCsuODg+ODiOaVsOOBjOS4iumZkOOCkui2heOBiOOBpuOBhOOCi+WgtOWQiFxuICAgIGlmICh0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5nZXRTaXplKCkgPiBNYXhUYXJnZXRTaXplKSB7XG4gICAgICBDdWJpc21Mb2dEZWJ1ZyhcbiAgICAgICAgJ3RvbyBtYW55IGV5ZSBibGluayB0YXJnZXRzIDogezB9JyxcbiAgICAgICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKCkgPiBNYXhUYXJnZXRTaXplKSB7XG4gICAgICBDdWJpc21Mb2dEZWJ1ZyhcbiAgICAgICAgJ3RvbyBtYW55IGxpcCBzeW5jIHRhcmdldHMgOiB7MH0nLFxuICAgICAgICB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmdldFNpemUoKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0bXBGYWRlSW46IG51bWJlciA9XG4gICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzIDw9IDAuMFxuICAgICAgICA/IDEuMFxuICAgICAgICA6IEN1YmlzbU1hdGguZ2V0RWFzaW5nU2luZShcbiAgICAgICAgICAgICh1c2VyVGltZVNlY29uZHMgLSBtb3Rpb25RdWV1ZUVudHJ5LmdldEZhZGVJblN0YXJ0VGltZSgpKSAvXG4gICAgICAgICAgICAgIHRoaXMuX2ZhZGVJblNlY29uZHNcbiAgICAgICAgICApO1xuXG4gICAgY29uc3QgdG1wRmFkZU91dDogbnVtYmVyID1cbiAgICAgIHRoaXMuX2ZhZGVPdXRTZWNvbmRzIDw9IDAuMCB8fCBtb3Rpb25RdWV1ZUVudHJ5LmdldEVuZFRpbWUoKSA8IDAuMFxuICAgICAgICA/IDEuMFxuICAgICAgICA6IEN1YmlzbU1hdGguZ2V0RWFzaW5nU2luZShcbiAgICAgICAgICAgIChtb3Rpb25RdWV1ZUVudHJ5LmdldEVuZFRpbWUoKSAtIHVzZXJUaW1lU2Vjb25kcykgL1xuICAgICAgICAgICAgICB0aGlzLl9mYWRlT3V0U2Vjb25kc1xuICAgICAgICAgICk7XG4gICAgbGV0IHZhbHVlOiBudW1iZXI7XG4gICAgbGV0IGM6IG51bWJlciwgcGFyYW1ldGVySW5kZXg6IG51bWJlcjtcblxuICAgIC8vICdSZXBlYXQnIHRpbWUgYXMgbmVjZXNzYXJ5LlxuICAgIGxldCB0aW1lOiBudW1iZXIgPSB0aW1lT2Zmc2V0U2Vjb25kcztcblxuICAgIGlmICh0aGlzLl9pc0xvb3ApIHtcbiAgICAgIHdoaWxlICh0aW1lID4gdGhpcy5fbW90aW9uRGF0YS5kdXJhdGlvbikge1xuICAgICAgICB0aW1lIC09IHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICAvLyBFdmFsdWF0ZSBtb2RlbCBjdXJ2ZXMuXG4gICAgZm9yIChcbiAgICAgIGMgPSAwO1xuICAgICAgYyA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudCAmJlxuICAgICAgY3VydmVzLmF0KGMpLnR5cGUgPT1cbiAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfTW9kZWw7XG4gICAgICArK2NcbiAgICApIHtcbiAgICAgIC8vIEV2YWx1YXRlIGN1cnZlIGFuZCBjYWxsIGhhbmRsZXIuXG4gICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG5cbiAgICAgIGlmIChjdXJ2ZXMuYXQoYykuaWQgPT0gdGhpcy5fbW9kZWxDdXJ2ZUlkRXllQmxpbmspIHtcbiAgICAgICAgZXllQmxpbmtWYWx1ZSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChjdXJ2ZXMuYXQoYykuaWQgPT0gdGhpcy5fbW9kZWxDdXJ2ZUlkTGlwU3luYykge1xuICAgICAgICBsaXBTeW5jVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcGFyYW1ldGVyTW90aW9uQ3VydmVDb3VudCA9IDA7XG5cbiAgICBmb3IgKFxuICAgICAgO1xuICAgICAgYyA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudCAmJlxuICAgICAgY3VydmVzLmF0KGMpLnR5cGUgPT1cbiAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfUGFyYW1ldGVyO1xuICAgICAgKytjXG4gICAgKSB7XG4gICAgICBwYXJhbWV0ZXJNb3Rpb25DdXJ2ZUNvdW50Kys7XG5cbiAgICAgIC8vIEZpbmQgcGFyYW1ldGVyIGluZGV4LlxuICAgICAgcGFyYW1ldGVySW5kZXggPSBtb2RlbC5nZXRQYXJhbWV0ZXJJbmRleChjdXJ2ZXMuYXQoYykuaWQpO1xuXG4gICAgICAvLyBTa2lwIGN1cnZlIGV2YWx1YXRpb24gaWYgbm8gdmFsdWUgaW4gc2luay5cbiAgICAgIGlmIChwYXJhbWV0ZXJJbmRleCA9PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc291cmNlVmFsdWU6IG51bWJlciA9IG1vZGVsLmdldFBhcmFtZXRlclZhbHVlQnlJbmRleChcbiAgICAgICAgcGFyYW1ldGVySW5kZXhcbiAgICAgICk7XG5cbiAgICAgIC8vIEV2YWx1YXRlIGN1cnZlIGFuZCBhcHBseSB2YWx1ZS5cbiAgICAgIHZhbHVlID0gZXZhbHVhdGVDdXJ2ZSh0aGlzLl9tb3Rpb25EYXRhLCBjLCB0aW1lKTtcblxuICAgICAgaWYgKGV5ZUJsaW5rVmFsdWUgIT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBpIDwgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpICYmIGkgPCBNYXhUYXJnZXRTaXplO1xuICAgICAgICAgICsraVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuYXQoaSkgPT0gY3VydmVzLmF0KGMpLmlkKSB7XG4gICAgICAgICAgICB2YWx1ZSAqPSBleWVCbGlua1ZhbHVlO1xuICAgICAgICAgICAgZXllQmxpbmtGbGFncyB8PSAxIDw8IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxpcFN5bmNWYWx1ZSAhPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGkgPCB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuYXQoaSkgPT0gY3VydmVzLmF0KGMpLmlkKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBsaXBTeW5jVmFsdWU7XG4gICAgICAgICAgICBsaXBTeW5jRmxhZ3MgfD0gMSA8PCBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCB2OiBudW1iZXI7XG5cbiAgICAgIC8vIOODkeODqeODoeODvOOCv+OBlOOBqOOBruODleOCp+ODvOODiVxuICAgICAgaWYgKGN1cnZlcy5hdChjKS5mYWRlSW5UaW1lIDwgMC4wICYmIGN1cnZlcy5hdChjKS5mYWRlT3V0VGltZSA8IDAuMCkge1xuICAgICAgICAvLyDjg6Ljg7zjgrfjg6fjg7Pjga7jg5Xjgqfjg7zjg4njgpLpgannlKhcbiAgICAgICAgdiA9IHNvdXJjZVZhbHVlICsgKHZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOODkeODqeODoeODvOOCv+OBq+WvvuOBl+OBpuODleOCp+ODvOODieOCpOODs+OBi+ODleOCp+ODvOODieOCouOCpuODiOOBjOioreWumuOBl+OBpuOBguOCi+WgtOWQiOOBr+OBneOBoeOCieOCkumBqeeUqFxuICAgICAgICBsZXQgZmluOiBudW1iZXI7XG4gICAgICAgIGxldCBmb3V0OiBudW1iZXI7XG5cbiAgICAgICAgaWYgKGN1cnZlcy5hdChjKS5mYWRlSW5UaW1lIDwgMC4wKSB7XG4gICAgICAgICAgZmluID0gdG1wRmFkZUluO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbiA9XG4gICAgICAgICAgICBjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA9PSAwLjBcbiAgICAgICAgICAgICAgPyAxLjBcbiAgICAgICAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAgICAgICAodXNlclRpbWVTZWNvbmRzIC0gbW90aW9uUXVldWVFbnRyeS5nZXRGYWRlSW5TdGFydFRpbWUoKSkgL1xuICAgICAgICAgICAgICAgICAgICBjdXJ2ZXMuYXQoYykuZmFkZUluVGltZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lIDwgMC4wKSB7XG4gICAgICAgICAgZm91dCA9IHRtcEZhZGVPdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm91dCA9XG4gICAgICAgICAgICBjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWUgPT0gMC4wIHx8XG4gICAgICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5LmdldEVuZFRpbWUoKSA8IDAuMFxuICAgICAgICAgICAgICA/IDEuMFxuICAgICAgICAgICAgICA6IEN1YmlzbU1hdGguZ2V0RWFzaW5nU2luZShcbiAgICAgICAgICAgICAgICAgIChtb3Rpb25RdWV1ZUVudHJ5LmdldEVuZFRpbWUoKSAtIHVzZXJUaW1lU2Vjb25kcykgL1xuICAgICAgICAgICAgICAgICAgICBjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1XZWlnaHQ6IG51bWJlciA9IHRoaXMuX3dlaWdodCAqIGZpbiAqIGZvdXQ7XG5cbiAgICAgICAgLy8g44OR44Op44Oh44O844K/44GU44Go44Gu44OV44Kn44O844OJ44KS6YGp55SoXG4gICAgICAgIHYgPSBzb3VyY2VWYWx1ZSArICh2YWx1ZSAtIHNvdXJjZVZhbHVlKSAqIHBhcmFtV2VpZ2h0O1xuICAgICAgfVxuXG4gICAgICBtb2RlbC5zZXRQYXJhbWV0ZXJWYWx1ZUJ5SW5kZXgocGFyYW1ldGVySW5kZXgsIHYsIDEuMCk7XG4gICAgfVxuXG4gICAge1xuICAgICAgaWYgKGV5ZUJsaW5rVmFsdWUgIT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBpIDwgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpICYmIGkgPCBNYXhUYXJnZXRTaXplO1xuICAgICAgICAgICsraVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2VWYWx1ZTogbnVtYmVyID0gbW9kZWwuZ2V0UGFyYW1ldGVyVmFsdWVCeUlkKFxuICAgICAgICAgICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuYXQoaSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8g44Oi44O844K344On44Oz44Gn44Gu5LiK5pu444GN44GM44GC44Gj44Gf5pmC44Gr44Gv44G+44Gw44Gf44GN44Gv6YGp55So44GX44Gq44GEXG4gICAgICAgICAgaWYgKChleWVCbGlua0ZsYWdzID4+IGkpICYgMHgwMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdjogbnVtYmVyID1cbiAgICAgICAgICAgIHNvdXJjZVZhbHVlICsgKGV5ZUJsaW5rVmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBmYWRlV2VpZ2h0O1xuXG4gICAgICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmF0KGkpLCB2KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobGlwU3luY1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpICYmIGkgPCBNYXhUYXJnZXRTaXplO1xuICAgICAgICAgICsraVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2VWYWx1ZTogbnVtYmVyID0gbW9kZWwuZ2V0UGFyYW1ldGVyVmFsdWVCeUlkKFxuICAgICAgICAgICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5hdChpKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyDjg6Ljg7zjgrfjg6fjg7Pjgafjga7kuIrmm7jjgY3jgYzjgYLjgaPjgZ/mmYLjgavjga/jg6rjg4Pjg5fjgrfjg7Pjgq/jga/pgannlKjjgZfjgarjgYRcbiAgICAgICAgICBpZiAoKGxpcFN5bmNGbGFncyA+PiBpKSAmIDB4MDEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHY6IG51bWJlciA9XG4gICAgICAgICAgICBzb3VyY2VWYWx1ZSArIChsaXBTeW5jVmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBmYWRlV2VpZ2h0O1xuXG4gICAgICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuYXQoaSksIHYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChcbiAgICAgIDtcbiAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgIGN1cnZlcy5hdChjKS50eXBlID09XG4gICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcnRPcGFjaXR5O1xuICAgICAgKytjXG4gICAgKSB7XG4gICAgICAvLyBGaW5kIHBhcmFtZXRlciBpbmRleC5cbiAgICAgIHBhcmFtZXRlckluZGV4ID0gbW9kZWwuZ2V0UGFyYW1ldGVySW5kZXgoY3VydmVzLmF0KGMpLmlkKTtcblxuICAgICAgLy8gU2tpcCBjdXJ2ZSBldmFsdWF0aW9uIGlmIG5vIHZhbHVlIGluIHNpbmsuXG4gICAgICBpZiAocGFyYW1ldGVySW5kZXggPT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIEV2YWx1YXRlIGN1cnZlIGFuZCBhcHBseSB2YWx1ZS5cbiAgICAgIHZhbHVlID0gZXZhbHVhdGVDdXJ2ZSh0aGlzLl9tb3Rpb25EYXRhLCBjLCB0aW1lKTtcblxuICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUluZGV4KHBhcmFtZXRlckluZGV4LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVPZmZzZXRTZWNvbmRzID49IHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24pIHtcbiAgICAgIGlmICh0aGlzLl9pc0xvb3ApIHtcbiAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRTdGFydFRpbWUodXNlclRpbWVTZWNvbmRzKTsgLy8g5pyA5Yid44Gu54q25oWL44G4XG4gICAgICAgIGlmICh0aGlzLl9pc0xvb3BGYWRlSW4pIHtcbiAgICAgICAgICAvLyDjg6vjg7zjg5flhoXjgafjg6vjg7zjg5fnlKjjg5Xjgqfjg7zjg4njgqTjg7PjgYzmnInlirnjga7mmYLjga/jgIHjg5Xjgqfjg7zjg4njgqTjg7PoqK3lrprjgZfnm7TjgZdcbiAgICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5LnNldEZhZGVJblN0YXJ0VGltZSh1c2VyVGltZVNlY29uZHMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fb25GaW5pc2hlZE1vdGlvbikge1xuICAgICAgICAgIHRoaXMuX29uRmluaXNoZWRNb3Rpb24odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5LnNldElzRmluaXNoZWQodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2xhc3RXZWlnaHQgPSBmYWRlV2VpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIOODq+ODvOODl+aDheWgseOBruioreWumlxuICAgKiBAcGFyYW0gbG9vcCDjg6vjg7zjg5fmg4XloLFcbiAgICovXG4gIHB1YmxpYyBzZXRJc0xvb3AobG9vcDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2lzTG9vcCA9IGxvb3A7XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5oOF5aCx44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4gdHJ1ZSDjg6vjg7zjg5fjgZnjgotcbiAgICogQHJldHVybiBmYWxzZSDjg6vjg7zjg5fjgZfjgarjgYRcbiAgICovXG4gIHB1YmxpYyBpc0xvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTG9vcDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6vjg7zjg5fmmYLjga7jg5Xjgqfjg7zjg4njgqTjg7Pmg4XloLHjga7oqK3lrppcbiAgICogQHBhcmFtIGxvb3BGYWRlSW4gIOODq+ODvOODl+aZguOBruODleOCp+ODvOODieOCpOODs+aDheWgsVxuICAgKi9cbiAgcHVibGljIHNldElzTG9vcEZhZGVJbihsb29wRmFkZUluOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5faXNMb29wRmFkZUluID0gbG9vcEZhZGVJbjtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6vjg7zjg5fmmYLjga7jg5Xjgqfjg7zjg4njgqTjg7Pmg4XloLHjga7lj5blvpdcbiAgICpcbiAgICogQHJldHVybiAgdHJ1ZSAgICDjgZnjgotcbiAgICogQHJldHVybiAgZmFsc2UgICDjgZfjgarjgYRcbiAgICovXG4gIHB1YmxpYyBpc0xvb3BGYWRlSW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTG9vcEZhZGVJbjtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7plbfjgZXjgpLlj5blvpfjgZnjgovjgIJcbiAgICpcbiAgICogQHJldHVybiAg44Oi44O844K344On44Oz44Gu6ZW344GVW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXREdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pc0xvb3AgPyAtMS4wIDogdGhpcy5fbG9vcER1cmF0aW9uU2Vjb25kcztcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7jg6vjg7zjg5fmmYLjga7plbfjgZXjgpLlj5blvpfjgZnjgovjgIJcbiAgICpcbiAgICogQHJldHVybiAg44Oi44O844K344On44Oz44Gu44Or44O844OX5pmC44Gu6ZW344GVW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRMb29wRHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbG9vcER1cmF0aW9uU2Vjb25kcztcbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZnjgovjg5Xjgqfjg7zjg4njgqTjg7Pjga7mmYLplpPjgpLoqK3lrprjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcGFyYW0gdmFsdWUgICAgICAgICAgIOODleOCp+ODvOODieOCpOODs+OBq+OBi+OBi+OCi+aZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgc2V0UGFyYW1ldGVyRmFkZUluVGltZShcbiAgICBwYXJhbWV0ZXJJZDogQ3ViaXNtSWRIYW5kbGUsXG4gICAgdmFsdWU6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjdXJ2ZXM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25DdXJ2ZT4gPSB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50OyArK2kpIHtcbiAgICAgIGlmIChwYXJhbWV0ZXJJZCA9PSBjdXJ2ZXMuYXQoaSkuaWQpIHtcbiAgICAgICAgY3VydmVzLmF0KGkpLmZhZGVJblRpbWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZnjgovjg5Xjgqfjg7zjg4njgqLjgqbjg4jjga7mmYLplpPjga7oqK3lrppcbiAgICogQHBhcmFtIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcGFyYW0gdmFsdWUgICAgICAgICAgIOODleOCp+ODvOODieOCouOCpuODiOOBq+OBi+OBi+OCi+aZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgc2V0UGFyYW1ldGVyRmFkZU91dFRpbWUoXG4gICAgcGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlLFxuICAgIHZhbHVlOiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIGN1cnZlcy5hdChpKS5mYWRlT3V0VGltZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODkeODqeODoeODvOOCv+OBq+WvvuOBmeOCi+ODleOCp+ODvOODieOCpOODs+OBruaZgumWk+OBruWPluW+l1xuICAgKiBAcGFyYW0gICAgcGFyYW1ldGVySWQgICAgIOODkeODqeODoeODvOOCv0lEXG4gICAqIEByZXR1cm4gICDjg5Xjgqfjg7zjg4njgqTjg7PjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIGdldFBhcmFtZXRlckZhZGVJblRpbWUocGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlKTogbnVtYmVyIHtcbiAgICBjb25zdCBjdXJ2ZXM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25DdXJ2ZT4gPSB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50OyArK2kpIHtcbiAgICAgIGlmIChwYXJhbWV0ZXJJZCA9PSBjdXJ2ZXMuYXQoaSkuaWQpIHtcbiAgICAgICAgcmV0dXJuIGN1cnZlcy5hdChpKS5mYWRlSW5UaW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZnjgovjg5Xjgqfjg7zjg4njgqLjgqbjg4jjga7mmYLplpPjgpLlj5blvpdcbiAgICpcbiAgICogQHBhcmFtICAgcGFyYW1ldGVySWQgICAgIOODkeODqeODoeODvOOCv0lEXG4gICAqIEByZXR1cm4gICDjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIGdldFBhcmFtZXRlckZhZGVPdXRUaW1lKHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSk6IG51bWJlciB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIHJldHVybiBjdXJ2ZXMuYXQoaSkuZmFkZU91dFRpbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIOiHquWLleOCqOODleOCp+OCr+ODiOOBjOOBi+OBi+OBo+OBpuOBhOOCi+ODkeODqeODoeODvOOCv0lE44Oq44K544OI44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBleWVCbGlua1BhcmFtZXRlcklkcyAgICDoh6rli5Xjgb7jgbDjgZ/jgY3jgYzjgYvjgYvjgaPjgabjgYTjgovjg5Hjg6njg6Hjg7zjgr9JROOBruODquOCueODiFxuICAgKiBAcGFyYW0gbGlwU3luY1BhcmFtZXRlcklkcyAgICAg44Oq44OD44OX44K344Oz44Kv44GM44GL44GL44Gj44Gm44GE44KL44OR44Op44Oh44O844K/SUTjga7jg6rjgrnjg4hcbiAgICovXG4gIHB1YmxpYyBzZXRFZmZlY3RJZHMoXG4gICAgZXllQmxpbmtQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT4sXG4gICAgbGlwU3luY1BhcmFtZXRlcklkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPlxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcyA9IGV5ZUJsaW5rUGFyYW1ldGVySWRzO1xuICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMgPSBsaXBTeW5jUGFyYW1ldGVySWRzO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc291cmNlRnJhbWVSYXRlID0gMzAuMDtcbiAgICB0aGlzLl9sb29wRHVyYXRpb25TZWNvbmRzID0gLTEuMDtcbiAgICB0aGlzLl9pc0xvb3AgPSBmYWxzZTsgLy8gdHJ1ZeOBi+OCiSBmYWxzZSDjgbjjg4fjg5Xjgqnjg6vjg4jjgpLlpInmm7RcbiAgICB0aGlzLl9pc0xvb3BGYWRlSW4gPSB0cnVlOyAvLyDjg6vjg7zjg5fmmYLjgavjg5Xjgqfjg7zjg4njgqTjg7PjgYzmnInlirnjgYvjganjgYbjgYvjga7jg5Xjg6njgrBcbiAgICB0aGlzLl9sYXN0V2VpZ2h0ID0gMC4wO1xuICAgIHRoaXMuX21vdGlvbkRhdGEgPSBudWxsO1xuICAgIHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbEN1cnZlSWRMaXBTeW5jID0gbnVsbDtcbiAgICB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcyA9IG51bGw7XG4gICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICog44OH44K544OI44Op44Kv44K/55u45b2T44Gu5Yem55CGXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gdm9pZCAwO1xuICAgIHRoaXMuX21vdGlvbkRhdGEgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIG1vdGlvbjMuanNvbuOCkuODkeODvOOCueOBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gbW90aW9uSnNvbiAgbW90aW9uMy5qc29u44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAqIEBwYXJhbSBzaXplICAgICAgICDjg5Djg4Pjg5XjgqHjga7jgrXjgqTjgrpcbiAgICovXG4gIHB1YmxpYyBwYXJzZShtb3Rpb25Kc29uOiBBcnJheUJ1ZmZlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbW90aW9uRGF0YSA9IG5ldyBDdWJpc21Nb3Rpb25EYXRhKCk7XG5cbiAgICBsZXQganNvbjogQ3ViaXNtTW90aW9uSnNvbiA9IG5ldyBDdWJpc21Nb3Rpb25Kc29uKG1vdGlvbkpzb24sIHNpemUpO1xuXG4gICAgdGhpcy5fbW90aW9uRGF0YS5kdXJhdGlvbiA9IGpzb24uZ2V0TW90aW9uRHVyYXRpb24oKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmxvb3AgPSBqc29uLmlzTW90aW9uTG9vcCgpO1xuICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudCA9IGpzb24uZ2V0TW90aW9uQ3VydmVDb3VudCgpO1xuICAgIHRoaXMuX21vdGlvbkRhdGEuZnBzID0ganNvbi5nZXRNb3Rpb25GcHMoKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50Q291bnQgPSBqc29uLmdldEV2ZW50Q291bnQoKTtcblxuICAgIGNvbnN0IGFyZUJlemllcnNSZXN0cnVjdGVkOiBib29sZWFuID0ganNvbi5nZXRFdmFsdWF0aW9uT3B0aW9uRmxhZyhcbiAgICAgIEV2YWx1YXRpb25PcHRpb25GbGFnLkV2YWx1YXRpb25PcHRpb25GbGFnX0FyZUJlemllcnNSaXN0cmljdGVkXG4gICAgKTtcblxuICAgIGlmIChqc29uLmlzRXhpc3RNb3Rpb25GYWRlSW5UaW1lKCkpIHtcbiAgICAgIHRoaXMuX2ZhZGVJblNlY29uZHMgPVxuICAgICAgICBqc29uLmdldE1vdGlvbkZhZGVJblRpbWUoKSA8IDAuMCA/IDEuMCA6IGpzb24uZ2V0TW90aW9uRmFkZUluVGltZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzID0gMS4wO1xuICAgIH1cblxuICAgIGlmIChqc29uLmlzRXhpc3RNb3Rpb25GYWRlT3V0VGltZSgpKSB7XG4gICAgICB0aGlzLl9mYWRlT3V0U2Vjb25kcyA9XG4gICAgICAgIGpzb24uZ2V0TW90aW9uRmFkZU91dFRpbWUoKSA8IDAuMCA/IDEuMCA6IGpzb24uZ2V0TW90aW9uRmFkZU91dFRpbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHMgPSAxLjA7XG4gICAgfVxuXG4gICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMudXBkYXRlU2l6ZShcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudCxcbiAgICAgIEN1YmlzbU1vdGlvbkN1cnZlLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy51cGRhdGVTaXplKFxuICAgICAganNvbi5nZXRNb3Rpb25Ub3RhbFNlZ21lbnRDb3VudCgpLFxuICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudCxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLnVwZGF0ZVNpemUoXG4gICAgICBqc29uLmdldE1vdGlvblRvdGFsUG9pbnRDb3VudCgpLFxuICAgICAgQ3ViaXNtTW90aW9uUG9pbnQsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy51cGRhdGVTaXplKFxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudENvdW50LFxuICAgICAgQ3ViaXNtTW90aW9uRXZlbnQsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGxldCB0b3RhbFBvaW50Q291bnQgPSAwO1xuICAgIGxldCB0b3RhbFNlZ21lbnRDb3VudCA9IDA7XG5cbiAgICAvLyBDdXJ2ZXNcbiAgICBmb3IgKFxuICAgICAgbGV0IGN1cnZlQ291bnQgPSAwO1xuICAgICAgY3VydmVDb3VudCA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDtcbiAgICAgICsrY3VydmVDb3VudFxuICAgICkge1xuICAgICAgaWYgKGpzb24uZ2V0TW90aW9uQ3VydmVUYXJnZXQoY3VydmVDb3VudCkgPT0gVGFyZ2V0TmFtZU1vZGVsKSB7XG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnR5cGUgPVxuICAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X01vZGVsO1xuICAgICAgfSBlbHNlIGlmIChqc29uLmdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlQ291bnQpID09IFRhcmdldE5hbWVQYXJhbWV0ZXIpIHtcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkudHlwZSA9XG4gICAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfUGFyYW1ldGVyO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAganNvbi5nZXRNb3Rpb25DdXJ2ZVRhcmdldChjdXJ2ZUNvdW50KSA9PSBUYXJnZXROYW1lUGFydE9wYWNpdHlcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS50eXBlID1cbiAgICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJ0T3BhY2l0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEN1YmlzbUxvZ1dhcm5pbmcoXG4gICAgICAgICAgJ1dhcm5pbmcgOiBVbmFibGUgdG8gZ2V0IHNlZ21lbnQgdHlwZSBmcm9tIEN1cnZlISBUaGUgbnVtYmVyIG9mIFwiQ3VydmVDb3VudFwiIG1heSBiZSBpbmNvcnJlY3QhJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS5pZCA9IGpzb24uZ2V0TW90aW9uQ3VydmVJZChcbiAgICAgICAgY3VydmVDb3VudFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICkuYmFzZVNlZ21lbnRJbmRleCA9IHRvdGFsU2VnbWVudENvdW50O1xuXG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChcbiAgICAgICAgY3VydmVDb3VudFxuICAgICAgKS5mYWRlSW5UaW1lID0ganNvbi5pc0V4aXN0TW90aW9uQ3VydmVGYWRlSW5UaW1lKGN1cnZlQ291bnQpXG4gICAgICAgID8ganNvbi5nZXRNb3Rpb25DdXJ2ZUZhZGVJblRpbWUoY3VydmVDb3VudClcbiAgICAgICAgOiAtMS4wO1xuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICkuZmFkZU91dFRpbWUgPSBqc29uLmlzRXhpc3RNb3Rpb25DdXJ2ZUZhZGVPdXRUaW1lKGN1cnZlQ291bnQpXG4gICAgICAgID8ganNvbi5nZXRNb3Rpb25DdXJ2ZUZhZGVPdXRUaW1lKGN1cnZlQ291bnQpXG4gICAgICAgIDogLTEuMDtcblxuICAgICAgLy8gU2VnbWVudHNcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBzZWdtZW50UG9zaXRpb24gPSAwO1xuICAgICAgICBzZWdtZW50UG9zaXRpb24gPCBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudENvdW50KGN1cnZlQ291bnQpO1xuXG4gICAgICApIHtcbiAgICAgICAgaWYgKHNlZ21lbnRQb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgKS5iYXNlUG9pbnRJbmRleCA9IHRvdGFsUG9pbnRDb3VudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoY3VydmVDb3VudCwgc2VnbWVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChjdXJ2ZUNvdW50LCBzZWdtZW50UG9zaXRpb24gKyAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMTtcbiAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5iYXNlUG9pbnRJbmRleCA9XG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VnbWVudDogbnVtYmVyID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICBzZWdtZW50UG9zaXRpb25cbiAgICAgICAgKTtcbiAgICAgICAgc3dpdGNoIChzZWdtZW50KSB7XG4gICAgICAgICAgY2FzZSBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9MaW5lYXI6IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5zZWdtZW50VHlwZSA9XG4gICAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfTGluZWFyO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgICkuZXZhbHVhdGUgPSBsaW5lYXJFdmFsdWF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMTtcbiAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAzO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9CZXppZXI6IHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyO1xuXG4gICAgICAgICAgICBpZiAoYXJlQmV6aWVyc1Jlc3RydWN0ZWQgfHwgVXNlT2xkQmV6aWVyc0N1cnZlTW90aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGJlemllckV2YWx1YXRlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgICApLmV2YWx1YXRlID0gYmV6aWVyRXZhbHVhdGVDYXJkYW5vSW50ZXJwcmV0YXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCArIDEpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArIDFcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAzXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArIDFcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgNFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50ICsgMikpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMlxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDVcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMlxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyA2XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAzO1xuICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDc7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfU3RlcHBlZDoge1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9TdGVwcGVkO1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICkuZXZhbHVhdGUgPSBzdGVwcGVkRXZhbHVhdGU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9JbnZlcnNlU3RlcHBlZDoge1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9JbnZlcnNlU3RlcHBlZDtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICApLmV2YWx1YXRlID0gaW52ZXJzZVN0ZXBwZWRFdmFsdWF0ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMTtcbiAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAzO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgQ1NNX0FTU0VSVCgwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICsrdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkuc2VnbWVudENvdW50O1xuICAgICAgICArK3RvdGFsU2VnbWVudENvdW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoXG4gICAgICBsZXQgdXNlcmRhdGFjb3VudCA9IDA7XG4gICAgICB1c2VyZGF0YWNvdW50IDwganNvbi5nZXRFdmVudENvdW50KCk7XG4gICAgICArK3VzZXJkYXRhY291bnRcbiAgICApIHtcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHVzZXJkYXRhY291bnQpLmZpcmVUaW1lID0ganNvbi5nZXRFdmVudFRpbWUoXG4gICAgICAgIHVzZXJkYXRhY291bnRcbiAgICAgICk7XG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1c2VyZGF0YWNvdW50KS52YWx1ZSA9IGpzb24uZ2V0RXZlbnRWYWx1ZShcbiAgICAgICAgdXNlcmRhdGFjb3VudFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBqc29uLnJlbGVhc2UoKTtcbiAgICBqc29uID0gdm9pZCAwO1xuICAgIGpzb24gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OBruODkeODqeODoeODvOOCv+abtOaWsFxuICAgKlxuICAgKiDjgqTjg5njg7Pjg4jnmbrngavjga7jg4Hjgqfjg4Pjgq/jgIJcbiAgICog5YWl5Yqb44GZ44KL5pmC6ZaT44Gv5ZG844Gw44KM44KL44Oi44O844K344On44Oz44K/44Kk44Of44Oz44Kw44KS77yQ44Go44GX44Gf56eS5pWw44Gn6KGM44GG44CCXG4gICAqXG4gICAqIEBwYXJhbSBiZWZvcmVDaGVja1RpbWVTZWNvbmRzICAg5YmN5Zue44Gu44Kk44OZ44Oz44OI44OB44Kn44OD44Kv5pmC6ZaTW+enkl1cbiAgICogQHBhcmFtIG1vdGlvblRpbWVTZWNvbmRzICAgICAgICDku4rlm57jga7lho3nlJ/mmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIGdldEZpcmVkRXZlbnQoXG4gICAgYmVmb3JlQ2hlY2tUaW1lU2Vjb25kczogbnVtYmVyLFxuICAgIG1vdGlvblRpbWVTZWNvbmRzOiBudW1iZXJcbiAgKTogY3NtVmVjdG9yPGNzbVN0cmluZz4ge1xuICAgIHRoaXMuX2ZpcmVkRXZlbnRWYWx1ZXMudXBkYXRlU2l6ZSgwKTtcblxuICAgIC8vIOOCpOODmeODs+ODiOOBrueZuueBq+ODgeOCp+ODg+OCr1xuICAgIGZvciAobGV0IHUgPSAwOyB1IDwgdGhpcy5fbW90aW9uRGF0YS5ldmVudENvdW50OyArK3UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodSkuZmlyZVRpbWUgPiBiZWZvcmVDaGVja1RpbWVTZWNvbmRzICYmXG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHUpLmZpcmVUaW1lIDw9IG1vdGlvblRpbWVTZWNvbmRzXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fZmlyZWRFdmVudFZhbHVlcy5wdXNoQmFjayhcbiAgICAgICAgICBuZXcgY3NtU3RyaW5nKHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHUpLnZhbHVlLnMpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ZpcmVkRXZlbnRWYWx1ZXM7XG4gIH1cblxuICBwdWJsaWMgX3NvdXJjZUZyYW1lUmF0ZTogbnVtYmVyOyAvLyDjg63jg7zjg4njgZfjgZ/jg5XjgqHjgqTjg6vjga5GUFPjgILoqJjov7DjgYznhKHjgZHjgozjgbDjg4fjg5Xjgqnjg6vjg4jlgKQxNWZwc+OBqOOBquOCi1xuICBwdWJsaWMgX2xvb3BEdXJhdGlvblNlY29uZHM6IG51bWJlcjsgLy8gbXRu44OV44Kh44Kk44Or44Gn5a6a576p44GV44KM44KL5LiA6YCj44Gu44Oi44O844K344On44Oz44Gu6ZW344GVXG4gIHB1YmxpYyBfaXNMb29wOiBib29sZWFuOyAvLyDjg6vjg7zjg5fjgZnjgovjgYs/XG4gIHB1YmxpYyBfaXNMb29wRmFkZUluOiBib29sZWFuOyAvLyDjg6vjg7zjg5fmmYLjgavjg5Xjgqfjg7zjg4njgqTjg7PjgYzmnInlirnjgYvjganjgYbjgYvjga7jg5Xjg6njgrDjgILliJ3mnJ/lgKTjgafjga/mnInlirnjgIJcbiAgcHVibGljIF9sYXN0V2VpZ2h0OiBudW1iZXI7IC8vIOacgOW+jOOBq+ioreWumuOBleOCjOOBn+mHjeOBv1xuXG4gIHB1YmxpYyBfbW90aW9uRGF0YTogQ3ViaXNtTW90aW9uRGF0YTsgLy8g5a6f6Zqb44Gu44Oi44O844K344On44Oz44OH44O844K/5pys5L2TXG5cbiAgcHVibGljIF9leWVCbGlua1BhcmFtZXRlcklkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g6Ieq5YuV44G+44Gw44Gf44GN44KS6YGp55So44GZ44KL44OR44Op44Oh44O844K/SUTjg4/jg7Pjg4njg6vjga7jg6rjgrnjg4jjgIIgIOODouODh+ODq++8iOODouODh+ODq+OCu+ODg+ODhuOCo+ODs+OCsO+8ieOBqOODkeODqeODoeODvOOCv+OCkuWvvuW/nOS7mOOBkeOCi+OAglxuICBwdWJsaWMgX2xpcFN5bmNQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOODquODg+ODl+OCt+ODs+OCr+OCkumBqeeUqOOBmeOCi+ODkeODqeODoeODvOOCv0lE44OP44Oz44OJ44Or44Gu44Oq44K544OI44CCICDjg6Ljg4fjg6vvvIjjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDvvInjgajjg5Hjg6njg6Hjg7zjgr/jgpLlr77lv5zku5jjgZHjgovjgIJcblxuICBwdWJsaWMgX21vZGVsQ3VydmVJZEV5ZUJsaW5rOiBDdWJpc21JZEhhbmRsZTsgLy8g44Oi44OH44Or44GM5oyB44Gk6Ieq5YuV44G+44Gw44Gf44GN55So44OR44Op44Oh44O844K/SUTjga7jg4/jg7Pjg4njg6vjgIIgIOODouODh+ODq+OBqOODouODvOOCt+ODp+ODs+OCkuWvvuW/nOS7mOOBkeOCi+OAglxuICBwdWJsaWMgX21vZGVsQ3VydmVJZExpcFN5bmM6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg6Ljg4fjg6vjgYzmjIHjgaTjg6rjg4Pjg5fjgrfjg7Pjgq/nlKjjg5Hjg6njg6Hjg7zjgr9JROOBruODj+ODs+ODieODq+OAgiAg44Oi44OH44Or44Go44Oi44O844K344On44Oz44KS5a++5b+c5LuY44GR44KL44CCXG59XG5cbi8vIE5hbWVzcGFjZSBkZWZpbml0aW9uIGZvciBjb21wYXRpYmlsaXR5LlxuaW1wb3J0ICogYXMgJCBmcm9tICcuL2N1YmlzbW1vdGlvbic7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBMaXZlMkRDdWJpc21GcmFtZXdvcmsge1xuICBleHBvcnQgY29uc3QgQ3ViaXNtTW90aW9uID0gJC5DdWJpc21Nb3Rpb247XG4gIGV4cG9ydCB0eXBlIEN1YmlzbU1vdGlvbiA9ICQuQ3ViaXNtTW90aW9uO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcImJlYTc3YmYyMGFkYjYwZTQxNmU1XCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=