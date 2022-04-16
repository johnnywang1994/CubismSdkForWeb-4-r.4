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
        if (pos && pos.time > time) {
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
/******/ 	__webpack_require__.h = function() { return "a8e76f2efc502264f9cd"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zN2ZhOTk0ZjdhYzA2YzZiMDgzNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEscUlBQTJEO0FBQzNELDhHQUFnRDtBQUVoRCwyR0FBOEM7QUFFOUMsbUhBSThCO0FBQzlCLG1IQUF3RTtBQUN4RSx3SUFRZ0M7QUFDaEMsNEhBQTRFO0FBRzVFLElBQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUNoQyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQUN4QyxJQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztBQUs1QyxJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUV2QyxTQUFTLFVBQVUsQ0FDakIsQ0FBb0IsRUFDcEIsQ0FBb0IsRUFDcEIsQ0FBUztJQUVULElBQU0sTUFBTSxHQUFzQixJQUFJLHdDQUFpQixFQUFFLENBQUM7SUFFMUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBMkIsRUFBRSxJQUFZO0lBQy9ELElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcs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QUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNyRCxDQUFDO2FBQ0g7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFlSCxtQkFBQztBQUFELENBQUMsQ0FoMEJpQyw2QkFBYSxHQWcwQjlDO0FBaDBCWSxvQ0FBWTtBQW0wQnpCLGlIQUFvQztBQUVwQyxJQUFpQixxQkFBcUIsQ0FHckM7QUFIRCxXQUFpQixxQkFBcUI7SUFDdkIsa0NBQVksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO0FBRTdDLENBQUMsRUFIZ0IscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFHckM7Ozs7Ozs7OztVQ3RqQ0QscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTGl2ZTJkLy4uLy4uLy4uL0ZyYW1ld29yay9zcmMvbW90aW9uL2N1YmlzbW1vdGlvbi50cyIsIndlYnBhY2s6Ly9MaXZlMmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7IEN1YmlzbUlkSGFuZGxlIH0gZnJvbSAnLi4vaWQvY3ViaXNtaWQnO1xuaW1wb3J0IHsgQ3ViaXNtRnJhbWV3b3JrIH0gZnJvbSAnLi4vbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbmltcG9ydCB7IEN1YmlzbU1hdGggfSBmcm9tICcuLi9tYXRoL2N1YmlzbW1hdGgnO1xuaW1wb3J0IHsgQ3ViaXNtTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9jdWJpc21tb2RlbCc7XG5pbXBvcnQgeyBjc21TdHJpbmcgfSBmcm9tICcuLi90eXBlL2NzbXN0cmluZyc7XG5pbXBvcnQgeyBjc21WZWN0b3IgfSBmcm9tICcuLi90eXBlL2NzbXZlY3Rvcic7XG5pbXBvcnQge1xuICBDU01fQVNTRVJULFxuICBDdWJpc21Mb2dEZWJ1ZyxcbiAgQ3ViaXNtTG9nV2FybmluZ1xufSBmcm9tICcuLi91dGlscy9jdWJpc21kZWJ1Zyc7XG5pbXBvcnQgeyBBQ3ViaXNtTW90aW9uLCBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrIH0gZnJvbSAnLi9hY3ViaXNtbW90aW9uJztcbmltcG9ydCB7XG4gIEN1YmlzbU1vdGlvbkN1cnZlLFxuICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldCxcbiAgQ3ViaXNtTW90aW9uRGF0YSxcbiAgQ3ViaXNtTW90aW9uRXZlbnQsXG4gIEN1YmlzbU1vdGlvblBvaW50LFxuICBDdWJpc21Nb3Rpb25TZWdtZW50LFxuICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZVxufSBmcm9tICcuL2N1YmlzbW1vdGlvbmludGVybmFsJztcbmltcG9ydCB7IEN1YmlzbU1vdGlvbkpzb24sIEV2YWx1YXRpb25PcHRpb25GbGFnIH0gZnJvbSAnLi9jdWJpc21tb3Rpb25qc29uJztcbmltcG9ydCB7IEN1YmlzbU1vdGlvblF1ZXVlRW50cnkgfSBmcm9tICcuL2N1YmlzbW1vdGlvbnF1ZXVlZW50cnknO1xuXG5jb25zdCBFZmZlY3ROYW1lRXllQmxpbmsgPSAnRXllQmxpbmsnO1xuY29uc3QgRWZmZWN0TmFtZUxpcFN5bmMgPSAnTGlwU3luYyc7XG5jb25zdCBUYXJnZXROYW1lTW9kZWwgPSAnTW9kZWwnO1xuY29uc3QgVGFyZ2V0TmFtZVBhcmFtZXRlciA9ICdQYXJhbWV0ZXInO1xuY29uc3QgVGFyZ2V0TmFtZVBhcnRPcGFjaXR5ID0gJ1BhcnRPcGFjaXR5JztcblxuLyoqXG4gKiBDdWJpc20gU0RLIFIyIOS7peWJjeOBruODouODvOOCt+ODp+ODs+OCkuWGjeePvuOBleOBm+OCi+OBquOCiSB0cnVlIOOAgeOCouODi+ODoeODvOOCv+OBruODouODvOOCt+ODp+ODs+OCkuato+OBl+OBj+WGjeePvuOBmeOCi+OBquOCiSBmYWxzZSDjgIJcbiAqL1xuY29uc3QgVXNlT2xkQmV6aWVyc0N1cnZlTW90aW9uID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGxlcnBQb2ludHMoXG4gIGE6IEN1YmlzbU1vdGlvblBvaW50LFxuICBiOiBDdWJpc21Nb3Rpb25Qb2ludCxcbiAgdDogbnVtYmVyXG4pOiBDdWJpc21Nb3Rpb25Qb2ludCB7XG4gIGNvbnN0IHJlc3VsdDogQ3ViaXNtTW90aW9uUG9pbnQgPSBuZXcgQ3ViaXNtTW90aW9uUG9pbnQoKTtcblxuICByZXN1bHQudGltZSA9IGEudGltZSArIChiLnRpbWUgLSBhLnRpbWUpICogdDtcbiAgcmVzdWx0LnZhbHVlID0gYS52YWx1ZSArIChiLnZhbHVlIC0gYS52YWx1ZSkgKiB0O1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGxpbmVhckV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IHQ6IG51bWJlciA9ICh0aW1lIC0gcG9pbnRzWzBdLnRpbWUpIC8gKHBvaW50c1sxXS50aW1lIC0gcG9pbnRzWzBdLnRpbWUpO1xuXG4gIGlmICh0IDwgMC4wKSB7XG4gICAgdCA9IDAuMDtcbiAgfVxuXG4gIHJldHVybiBwb2ludHNbMF0udmFsdWUgKyAocG9pbnRzWzFdLnZhbHVlIC0gcG9pbnRzWzBdLnZhbHVlKSAqIHQ7XG59XG5cbmZ1bmN0aW9uIGJlemllckV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IHQ6IG51bWJlciA9ICh0aW1lIC0gcG9pbnRzWzBdLnRpbWUpIC8gKHBvaW50c1szXS50aW1lIC0gcG9pbnRzWzBdLnRpbWUpO1xuXG4gIGlmICh0IDwgMC4wKSB7XG4gICAgdCA9IDAuMDtcbiAgfVxuXG4gIGNvbnN0IHAwMTogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdLCB0KTtcbiAgY29uc3QgcDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0sIHQpO1xuICBjb25zdCBwMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMl0sIHBvaW50c1szXSwgdCk7XG5cbiAgY29uc3QgcDAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAwMSwgcDEyLCB0KTtcbiAgY29uc3QgcDEyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAxMiwgcDIzLCB0KTtcblxuICByZXR1cm4gbGVycFBvaW50cyhwMDEyLCBwMTIzLCB0KS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gYmV6aWVyRXZhbHVhdGVCaW5hcnlTZWFyY2goXG4gIHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSxcbiAgdGltZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICBjb25zdCB4X2Vycm9yID0gMC4wMTtcblxuICBjb25zdCB4OiBudW1iZXIgPSB0aW1lO1xuICBsZXQgeDE6IG51bWJlciA9IHBvaW50c1swXS50aW1lO1xuICBsZXQgeDI6IG51bWJlciA9IHBvaW50c1szXS50aW1lO1xuICBsZXQgY3gxOiBudW1iZXIgPSBwb2ludHNbMV0udGltZTtcbiAgbGV0IGN4MjogbnVtYmVyID0gcG9pbnRzWzJdLnRpbWU7XG5cbiAgbGV0IHRhID0gMC4wO1xuICBsZXQgdGIgPSAxLjA7XG4gIGxldCB0ID0gMC4wO1xuICBsZXQgaSA9IDA7XG5cbiAgZm9yIChsZXQgdmFyMzMgPSB0cnVlOyBpIDwgMjA7ICsraSkge1xuICAgIGlmICh4IDwgeDEgKyB4X2Vycm9yKSB7XG4gICAgICB0ID0gdGE7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoeDIgLSB4X2Vycm9yIDwgeCkge1xuICAgICAgdCA9IHRiO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbGV0IGNlbnRlcng6IG51bWJlciA9IChjeDEgKyBjeDIpICogMC41O1xuICAgIGN4MSA9ICh4MSArIGN4MSkgKiAwLjU7XG4gICAgY3gyID0gKHgyICsgY3gyKSAqIDAuNTtcbiAgICBjb25zdCBjdHJseDEyOiBudW1iZXIgPSAoY3gxICsgY2VudGVyeCkgKiAwLjU7XG4gICAgY29uc3QgY3RybHgyMTogbnVtYmVyID0gKGN4MiArIGNlbnRlcngpICogMC41O1xuICAgIGNlbnRlcnggPSAoY3RybHgxMiArIGN0cmx4MjEpICogMC41O1xuICAgIGlmICh4IDwgY2VudGVyeCkge1xuICAgICAgdGIgPSAodGEgKyB0YikgKiAwLjU7XG4gICAgICBpZiAoY2VudGVyeCAtIHhfZXJyb3IgPCB4KSB7XG4gICAgICAgIHQgPSB0YjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHgyID0gY2VudGVyeDtcbiAgICAgIGN4MiA9IGN0cmx4MTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhID0gKHRhICsgdGIpICogMC41O1xuICAgICAgaWYgKHggPCBjZW50ZXJ4ICsgeF9lcnJvcikge1xuICAgICAgICB0ID0gdGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB4MSA9IGNlbnRlcng7XG4gICAgICBjeDEgPSBjdHJseDIxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpID09IDIwKSB7XG4gICAgdCA9ICh0YSArIHRiKSAqIDAuNTtcbiAgfVxuXG4gIGlmICh0IDwgMC4wKSB7XG4gICAgdCA9IDAuMDtcbiAgfVxuICBpZiAodCA+IDEuMCkge1xuICAgIHQgPSAxLjA7XG4gIH1cblxuICBjb25zdCBwMDE6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMF0sIHBvaW50c1sxXSwgdCk7XG4gIGNvbnN0IHAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1sxXSwgcG9pbnRzWzJdLCB0KTtcbiAgY29uc3QgcDIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzJdLCBwb2ludHNbM10sIHQpO1xuXG4gIGNvbnN0IHAwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMDEsIHAxMiwgdCk7XG4gIGNvbnN0IHAxMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMTIsIHAyMywgdCk7XG5cbiAgcmV0dXJuIGxlcnBQb2ludHMocDAxMiwgcDEyMywgdCkudmFsdWU7XG59XG5cbmZ1bmN0aW9uIGJlemllckV2YWx1YXRlQ2FyZGFub0ludGVycHJldGF0aW9uKFxuICBwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sXG4gIHRpbWU6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgY29uc3QgeDogbnVtYmVyID0gdGltZTtcbiAgY29uc3QgeDE6IG51bWJlciA9IHBvaW50c1swXS50aW1lO1xuICBjb25zdCB4MjogbnVtYmVyID0gcG9pbnRzWzNdLnRpbWU7XG4gIGNvbnN0IGN4MTogbnVtYmVyID0gcG9pbnRzWzFdLnRpbWU7XG4gIGNvbnN0IGN4MjogbnVtYmVyID0gcG9pbnRzWzJdLnRpbWU7XG5cbiAgY29uc3QgYTogbnVtYmVyID0geDIgLSAzLjAgKiBjeDIgKyAzLjAgKiBjeDEgLSB4MTtcbiAgY29uc3QgYjogbnVtYmVyID0gMy4wICogY3gyIC0gNi4wICogY3gxICsgMy4wICogeDE7XG4gIGNvbnN0IGM6IG51bWJlciA9IDMuMCAqIGN4MSAtIDMuMCAqIHgxO1xuICBjb25zdCBkOiBudW1iZXIgPSB4MSAtIHg7XG5cbiAgY29uc3QgdDogbnVtYmVyID0gQ3ViaXNtTWF0aC5jYXJkYW5vQWxnb3JpdGhtRm9yQmV6aWVyKGEsIGIsIGMsIGQpO1xuXG4gIGNvbnN0IHAwMTogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdLCB0KTtcbiAgY29uc3QgcDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0sIHQpO1xuICBjb25zdCBwMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMl0sIHBvaW50c1szXSwgdCk7XG5cbiAgY29uc3QgcDAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAwMSwgcDEyLCB0KTtcbiAgY29uc3QgcDEyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAxMiwgcDIzLCB0KTtcblxuICByZXR1cm4gbGVycFBvaW50cyhwMDEyLCBwMTIzLCB0KS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gc3RlcHBlZEV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIHBvaW50c1swXS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gaW52ZXJzZVN0ZXBwZWRFdmFsdWF0ZShcbiAgcG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLFxuICB0aW1lOiBudW1iZXJcbik6IG51bWJlciB7XG4gIHJldHVybiBwb2ludHNbMV0udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGV2YWx1YXRlQ3VydmUoXG4gIG1vdGlvbkRhdGE6IEN1YmlzbU1vdGlvbkRhdGEsXG4gIGluZGV4OiBudW1iZXIsXG4gIHRpbWU6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgLy8gRmluZCBzZWdtZW50IHRvIGV2YWx1YXRlLlxuICBjb25zdCBjdXJ2ZTogQ3ViaXNtTW90aW9uQ3VydmUgPSBtb3Rpb25EYXRhLmN1cnZlcy5hdChpbmRleCk7XG5cbiAgbGV0IHRhcmdldCA9IC0xO1xuICBjb25zdCB0b3RhbFNlZ21lbnRDb3VudDogbnVtYmVyID0gY3VydmUuYmFzZVNlZ21lbnRJbmRleCArIGN1cnZlLnNlZ21lbnRDb3VudDtcbiAgbGV0IHBvaW50UG9zaXRpb24gPSAwO1xuICBjb25zdCBwb3MgPSBtb3Rpb25EYXRhLnBvaW50cy5hdChwb2ludFBvc2l0aW9uKTtcbiAgZm9yIChsZXQgaTogbnVtYmVyID0gY3VydmUuYmFzZVNlZ21lbnRJbmRleDsgaSA8IHRvdGFsU2VnbWVudENvdW50OyArK2kpIHtcbiAgICAvLyBHZXQgZmlyc3QgcG9pbnQgb2YgbmV4dCBzZWdtZW50LlxuICAgIHBvaW50UG9zaXRpb24gPVxuICAgICAgbW90aW9uRGF0YS5zZWdtZW50cy5hdChpKS5iYXNlUG9pbnRJbmRleCArXG4gICAgICAobW90aW9uRGF0YS5zZWdtZW50cy5hdChpKS5zZWdtZW50VHlwZSA9PVxuICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyXG4gICAgICAgID8gM1xuICAgICAgICA6IDEpO1xuXG4gICAgLy8gQnJlYWsgaWYgdGltZSBsaWVzIHdpdGhpbiBjdXJyZW50IHNlZ21lbnQuXG4gICAgaWYgKHBvcyAmJiBwb3MudGltZSA+IHRpbWUpIHtcbiAgICAgIHRhcmdldCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAodGFyZ2V0ID09IC0xKSB7XG4gICAgcmV0dXJuIHBvcy52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0IHNlZ21lbnQ6IEN1YmlzbU1vdGlvblNlZ21lbnQgPSBtb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRhcmdldCk7XG5cbiAgcmV0dXJuIHNlZ21lbnQuZXZhbHVhdGUobW90aW9uRGF0YS5wb2ludHMuZ2V0KHNlZ21lbnQuYmFzZVBvaW50SW5kZXgpLCB0aW1lKTtcbn1cblxuLyoqXG4gKiDjg6Ljg7zjgrfjg6fjg7Pjgq/jg6njgrlcbiAqXG4gKiDjg6Ljg7zjgrfjg6fjg7Pjga7jgq/jg6njgrnjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIEN1YmlzbU1vdGlvbiBleHRlbmRzIEFDdWJpc21Nb3Rpb24ge1xuICAvKipcbiAgICog44Kk44Oz44K544K/44Oz44K544KS5L2c5oiQ44GZ44KLXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgbW90aW9uMy5qc29u44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAqIEBwYXJhbSBzaXplIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgKiBAcGFyYW0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIg44Oi44O844K344On44Oz5YaN55Sf57WC5LqG5pmC44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAqIEByZXR1cm4g5L2c5oiQ44GV44KM44Gf44Kk44Oz44K544K/44Oz44K5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShcbiAgICBidWZmZXI6IEFycmF5QnVmZmVyLFxuICAgIHNpemU6IG51bWJlcixcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKTogQ3ViaXNtTW90aW9uIHtcbiAgICBjb25zdCByZXQgPSBuZXcgQ3ViaXNtTW90aW9uKCk7XG5cbiAgICByZXQucGFyc2UoYnVmZmVyLCBzaXplKTtcbiAgICByZXQuX3NvdXJjZUZyYW1lUmF0ZSA9IHJldC5fbW90aW9uRGF0YS5mcHM7XG4gICAgcmV0Ll9sb29wRHVyYXRpb25TZWNvbmRzID0gcmV0Ll9tb3Rpb25EYXRhLmR1cmF0aW9uO1xuICAgIHJldC5fb25GaW5pc2hlZE1vdGlvbiA9IG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyO1xuXG4gICAgLy8gTk9URTogRWRpdG9y44Gn44Gv44Or44O844OX44GC44KK44Gu44Oi44O844K344On44Oz5pu444GN5Ye644GX44Gv6Z2e5a++5b+cXG4gICAgLy8gcmV0LT5fbG9vcCA9IChyZXQtPl9tb3Rpb25EYXRhLT5Mb29wID4gMCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjga7jg5Hjg6njg6Hjg7zjgr/jga7mm7TmlrDjga7lrp/ooYxcbiAgICogQHBhcmFtIG1vZGVsICAgICAgICAgICAgIOWvvuixoeOBruODouODh+ODq1xuICAgKiBAcGFyYW0gdXNlclRpbWVTZWNvbmRzICAg54++5Zyo44Gu5pmC5Yi7W+enkl1cbiAgICogQHBhcmFtIGZhZGVXZWlnaHQgICAgICAgIOODouODvOOCt+ODp+ODs+OBrumHjeOBv1xuICAgKiBAcGFyYW0gbW90aW9uUXVldWVFbnRyeSAgQ3ViaXNtTW90aW9uUXVldWVNYW5hZ2Vy44Gn566h55CG44GV44KM44Gm44GE44KL44Oi44O844K344On44OzXG4gICAqL1xuICBwdWJsaWMgZG9VcGRhdGVQYXJhbWV0ZXJzKFxuICAgIG1vZGVsOiBDdWJpc21Nb2RlbCxcbiAgICB1c2VyVGltZVNlY29uZHM6IG51bWJlcixcbiAgICBmYWRlV2VpZ2h0OiBudW1iZXIsXG4gICAgbW90aW9uUXVldWVFbnRyeTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeVxuICApOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbW9kZWxDdXJ2ZUlkRXllQmxpbmsgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fbW9kZWxDdXJ2ZUlkRXllQmxpbmsgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICAgIEVmZmVjdE5hbWVFeWVCbGlua1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbW9kZWxDdXJ2ZUlkTGlwU3luYyA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9tb2RlbEN1cnZlSWRMaXBTeW5jID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgICBFZmZlY3ROYW1lTGlwU3luY1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgdGltZU9mZnNldFNlY29uZHM6IG51bWJlciA9XG4gICAgICB1c2VyVGltZVNlY29uZHMgLSBtb3Rpb25RdWV1ZUVudHJ5LmdldFN0YXJ0VGltZSgpO1xuXG4gICAgaWYgKHRpbWVPZmZzZXRTZWNvbmRzIDwgMC4wKSB7XG4gICAgICB0aW1lT2Zmc2V0U2Vjb25kcyA9IDAuMDsgLy8g44Ko44Op44O85Zue6YG/XG4gICAgfVxuXG4gICAgbGV0IGxpcFN5bmNWYWx1ZTogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICBsZXQgZXllQmxpbmtWYWx1ZTogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIC8v44G+44Gw44Gf44GN44CB44Oq44OD44OX44K344Oz44Kv44Gu44GG44Gh44Oi44O844K344On44Oz44Gu6YGp55So44KS5qSc5Ye644GZ44KL44Gf44KB44Gu44OT44OD44OI77yIbWF4RmxhZ0NvdW505YCL44G+44GnXG4gICAgY29uc3QgTWF4VGFyZ2V0U2l6ZSA9IDY0O1xuICAgIGxldCBsaXBTeW5jRmxhZ3MgPSAwO1xuICAgIGxldCBleWVCbGlua0ZsYWdzID0gMDtcblxuICAgIC8v556s44GN44CB44Oq44OD44OX44K344Oz44Kv44Gu44K/44O844Ky44OD44OI5pWw44GM5LiK6ZmQ44KS6LaF44GI44Gm44GE44KL5aC05ZCIXG4gICAgaWYgKHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKSA+IE1heFRhcmdldFNpemUpIHtcbiAgICAgIEN1YmlzbUxvZ0RlYnVnKFxuICAgICAgICAndG9vIG1hbnkgZXllIGJsaW5rIHRhcmdldHMgOiB7MH0nLFxuICAgICAgICB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5nZXRTaXplKClcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmdldFNpemUoKSA+IE1heFRhcmdldFNpemUpIHtcbiAgICAgIEN1YmlzbUxvZ0RlYnVnKFxuICAgICAgICAndG9vIG1hbnkgbGlwIHN5bmMgdGFyZ2V0cyA6IHswfScsXG4gICAgICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHRtcEZhZGVJbjogbnVtYmVyID1cbiAgICAgIHRoaXMuX2ZhZGVJblNlY29uZHMgPD0gMC4wXG4gICAgICAgID8gMS4wXG4gICAgICAgIDogQ3ViaXNtTWF0aC5nZXRFYXNpbmdTaW5lKFxuICAgICAgICAgICAgKHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0RmFkZUluU3RhcnRUaW1lKCkpIC9cbiAgICAgICAgICAgICAgdGhpcy5fZmFkZUluU2Vjb25kc1xuICAgICAgICAgICk7XG5cbiAgICBjb25zdCB0bXBGYWRlT3V0OiBudW1iZXIgPVxuICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHMgPD0gMC4wIHx8IG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIDwgMC4wXG4gICAgICAgID8gMS4wXG4gICAgICAgIDogQ3ViaXNtTWF0aC5nZXRFYXNpbmdTaW5lKFxuICAgICAgICAgICAgKG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIC0gdXNlclRpbWVTZWNvbmRzKSAvXG4gICAgICAgICAgICAgIHRoaXMuX2ZhZGVPdXRTZWNvbmRzXG4gICAgICAgICAgKTtcbiAgICBsZXQgdmFsdWU6IG51bWJlcjtcbiAgICBsZXQgYzogbnVtYmVyLCBwYXJhbWV0ZXJJbmRleDogbnVtYmVyO1xuXG4gICAgLy8gJ1JlcGVhdCcgdGltZSBhcyBuZWNlc3NhcnkuXG4gICAgbGV0IHRpbWU6IG51bWJlciA9IHRpbWVPZmZzZXRTZWNvbmRzO1xuXG4gICAgaWYgKHRoaXMuX2lzTG9vcCkge1xuICAgICAgd2hpbGUgKHRpbWUgPiB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uKSB7XG4gICAgICAgIHRpbWUgLT0gdGhpcy5fbW90aW9uRGF0YS5kdXJhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjdXJ2ZXM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25DdXJ2ZT4gPSB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcztcblxuICAgIC8vIEV2YWx1YXRlIG1vZGVsIGN1cnZlcy5cbiAgICBmb3IgKFxuICAgICAgYyA9IDA7XG4gICAgICBjIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ICYmXG4gICAgICBjdXJ2ZXMuYXQoYykudHlwZSA9PVxuICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9Nb2RlbDtcbiAgICAgICsrY1xuICAgICkge1xuICAgICAgLy8gRXZhbHVhdGUgY3VydmUgYW5kIGNhbGwgaGFuZGxlci5cbiAgICAgIHZhbHVlID0gZXZhbHVhdGVDdXJ2ZSh0aGlzLl9tb3Rpb25EYXRhLCBjLCB0aW1lKTtcblxuICAgICAgaWYgKGN1cnZlcy5hdChjKS5pZCA9PSB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluaykge1xuICAgICAgICBleWVCbGlua1ZhbHVlID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGN1cnZlcy5hdChjKS5pZCA9PSB0aGlzLl9tb2RlbEN1cnZlSWRMaXBTeW5jKSB7XG4gICAgICAgIGxpcFN5bmNWYWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwYXJhbWV0ZXJNb3Rpb25DdXJ2ZUNvdW50ID0gMDtcblxuICAgIGZvciAoXG4gICAgICA7XG4gICAgICBjIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ICYmXG4gICAgICBjdXJ2ZXMuYXQoYykudHlwZSA9PVxuICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJhbWV0ZXI7XG4gICAgICArK2NcbiAgICApIHtcbiAgICAgIHBhcmFtZXRlck1vdGlvbkN1cnZlQ291bnQrKztcblxuICAgICAgLy8gRmluZCBwYXJhbWV0ZXIgaW5kZXguXG4gICAgICBwYXJhbWV0ZXJJbmRleCA9IG1vZGVsLmdldFBhcmFtZXRlckluZGV4KGN1cnZlcy5hdChjKS5pZCk7XG5cbiAgICAgIC8vIFNraXAgY3VydmUgZXZhbHVhdGlvbiBpZiBubyB2YWx1ZSBpbiBzaW5rLlxuICAgICAgaWYgKHBhcmFtZXRlckluZGV4ID09IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2VWYWx1ZTogbnVtYmVyID0gbW9kZWwuZ2V0UGFyYW1ldGVyVmFsdWVCeUluZGV4KFxuICAgICAgICBwYXJhbWV0ZXJJbmRleFxuICAgICAgKTtcblxuICAgICAgLy8gRXZhbHVhdGUgY3VydmUgYW5kIGFwcGx5IHZhbHVlLlxuICAgICAgdmFsdWUgPSBldmFsdWF0ZUN1cnZlKHRoaXMuX21vdGlvbkRhdGEsIGMsIHRpbWUpO1xuXG4gICAgICBpZiAoZXllQmxpbmtWYWx1ZSAhPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGkgPCB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5nZXRTaXplKCkgJiYgaSA8IE1heFRhcmdldFNpemU7XG4gICAgICAgICAgKytpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5hdChpKSA9PSBjdXJ2ZXMuYXQoYykuaWQpIHtcbiAgICAgICAgICAgIHZhbHVlICo9IGV5ZUJsaW5rVmFsdWU7XG4gICAgICAgICAgICBleWVCbGlua0ZsYWdzIHw9IDEgPDwgaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobGlwU3luY1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpICYmIGkgPCBNYXhUYXJnZXRTaXplO1xuICAgICAgICAgICsraVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5hdChpKSA9PSBjdXJ2ZXMuYXQoYykuaWQpIHtcbiAgICAgICAgICAgIHZhbHVlICs9IGxpcFN5bmNWYWx1ZTtcbiAgICAgICAgICAgIGxpcFN5bmNGbGFncyB8PSAxIDw8IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHY6IG51bWJlcjtcblxuICAgICAgLy8g44OR44Op44Oh44O844K/44GU44Go44Gu44OV44Kn44O844OJXG4gICAgICBpZiAoY3VydmVzLmF0KGMpLmZhZGVJblRpbWUgPCAwLjAgJiYgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lIDwgMC4wKSB7XG4gICAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruODleOCp+ODvOODieOCkumBqeeUqFxuICAgICAgICB2ID0gc291cmNlVmFsdWUgKyAodmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBmYWRlV2VpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g44OR44Op44Oh44O844K/44Gr5a++44GX44Gm44OV44Kn44O844OJ44Kk44Oz44GL44OV44Kn44O844OJ44Ki44Km44OI44GM6Kit5a6a44GX44Gm44GC44KL5aC05ZCI44Gv44Gd44Gh44KJ44KS6YGp55SoXG4gICAgICAgIGxldCBmaW46IG51bWJlcjtcbiAgICAgICAgbGV0IGZvdXQ6IG51bWJlcjtcblxuICAgICAgICBpZiAoY3VydmVzLmF0KGMpLmZhZGVJblRpbWUgPCAwLjApIHtcbiAgICAgICAgICBmaW4gPSB0bXBGYWRlSW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmluID1cbiAgICAgICAgICAgIGN1cnZlcy5hdChjKS5mYWRlSW5UaW1lID09IDAuMFxuICAgICAgICAgICAgICA/IDEuMFxuICAgICAgICAgICAgICA6IEN1YmlzbU1hdGguZ2V0RWFzaW5nU2luZShcbiAgICAgICAgICAgICAgICAgICh1c2VyVGltZVNlY29uZHMgLSBtb3Rpb25RdWV1ZUVudHJ5LmdldEZhZGVJblN0YXJ0VGltZSgpKSAvXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlcy5hdChjKS5mYWRlSW5UaW1lXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWUgPCAwLjApIHtcbiAgICAgICAgICBmb3V0ID0gdG1wRmFkZU91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3V0ID1cbiAgICAgICAgICAgIGN1cnZlcy5hdChjKS5mYWRlT3V0VGltZSA9PSAwLjAgfHxcbiAgICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIDwgMC4wXG4gICAgICAgICAgICAgID8gMS4wXG4gICAgICAgICAgICAgIDogQ3ViaXNtTWF0aC5nZXRFYXNpbmdTaW5lKFxuICAgICAgICAgICAgICAgICAgKG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIC0gdXNlclRpbWVTZWNvbmRzKSAvXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlcy5hdChjKS5mYWRlT3V0VGltZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbVdlaWdodDogbnVtYmVyID0gdGhpcy5fd2VpZ2h0ICogZmluICogZm91dDtcblxuICAgICAgICAvLyDjg5Hjg6njg6Hjg7zjgr/jgZTjgajjga7jg5Xjgqfjg7zjg4njgpLpgannlKhcbiAgICAgICAgdiA9IHNvdXJjZVZhbHVlICsgKHZhbHVlIC0gc291cmNlVmFsdWUpICogcGFyYW1XZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJbmRleChwYXJhbWV0ZXJJbmRleCwgdiwgMS4wKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoZXllQmxpbmtWYWx1ZSAhPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGkgPCB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5nZXRTaXplKCkgJiYgaSA8IE1heFRhcmdldFNpemU7XG4gICAgICAgICAgKytpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZVZhbHVlOiBudW1iZXIgPSBtb2RlbC5nZXRQYXJhbWV0ZXJWYWx1ZUJ5SWQoXG4gICAgICAgICAgICB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5hdChpKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyDjg6Ljg7zjgrfjg6fjg7Pjgafjga7kuIrmm7jjgY3jgYzjgYLjgaPjgZ/mmYLjgavjga/jgb7jgbDjgZ/jgY3jga/pgannlKjjgZfjgarjgYRcbiAgICAgICAgICBpZiAoKGV5ZUJsaW5rRmxhZ3MgPj4gaSkgJiAweDAxKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB2OiBudW1iZXIgPVxuICAgICAgICAgICAgc291cmNlVmFsdWUgKyAoZXllQmxpbmtWYWx1ZSAtIHNvdXJjZVZhbHVlKSAqIGZhZGVXZWlnaHQ7XG5cbiAgICAgICAgICBtb2RlbC5zZXRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuYXQoaSksIHYpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsaXBTeW5jVmFsdWUgIT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBpIDwgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKCkgJiYgaSA8IE1heFRhcmdldFNpemU7XG4gICAgICAgICAgKytpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZVZhbHVlOiBudW1iZXIgPSBtb2RlbC5nZXRQYXJhbWV0ZXJWYWx1ZUJ5SWQoXG4gICAgICAgICAgICB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmF0KGkpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBp+OBruS4iuabuOOBjeOBjOOBguOBo+OBn+aZguOBq+OBr+ODquODg+ODl+OCt+ODs+OCr+OBr+mBqeeUqOOBl+OBquOBhFxuICAgICAgICAgIGlmICgobGlwU3luY0ZsYWdzID4+IGkpICYgMHgwMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdjogbnVtYmVyID1cbiAgICAgICAgICAgIHNvdXJjZVZhbHVlICsgKGxpcFN5bmNWYWx1ZSAtIHNvdXJjZVZhbHVlKSAqIGZhZGVXZWlnaHQ7XG5cbiAgICAgICAgICBtb2RlbC5zZXRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5hdChpKSwgdik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgO1xuICAgICAgYyA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudCAmJlxuICAgICAgY3VydmVzLmF0KGMpLnR5cGUgPT1cbiAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfUGFydE9wYWNpdHk7XG4gICAgICArK2NcbiAgICApIHtcbiAgICAgIC8vIEZpbmQgcGFyYW1ldGVyIGluZGV4LlxuICAgICAgcGFyYW1ldGVySW5kZXggPSBtb2RlbC5nZXRQYXJhbWV0ZXJJbmRleChjdXJ2ZXMuYXQoYykuaWQpO1xuXG4gICAgICAvLyBTa2lwIGN1cnZlIGV2YWx1YXRpb24gaWYgbm8gdmFsdWUgaW4gc2luay5cbiAgICAgIGlmIChwYXJhbWV0ZXJJbmRleCA9PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gRXZhbHVhdGUgY3VydmUgYW5kIGFwcGx5IHZhbHVlLlxuICAgICAgdmFsdWUgPSBldmFsdWF0ZUN1cnZlKHRoaXMuX21vdGlvbkRhdGEsIGMsIHRpbWUpO1xuXG4gICAgICBtb2RlbC5zZXRQYXJhbWV0ZXJWYWx1ZUJ5SW5kZXgocGFyYW1ldGVySW5kZXgsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGltZU9mZnNldFNlY29uZHMgPj0gdGhpcy5fbW90aW9uRGF0YS5kdXJhdGlvbikge1xuICAgICAgaWYgKHRoaXMuX2lzTG9vcCkge1xuICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5LnNldFN0YXJ0VGltZSh1c2VyVGltZVNlY29uZHMpOyAvLyDmnIDliJ3jga7nirbmhYvjgbhcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9vcEZhZGVJbikge1xuICAgICAgICAgIC8vIOODq+ODvOODl+WGheOBp+ODq+ODvOODl+eUqOODleOCp+ODvOODieOCpOODs+OBjOacieWKueOBruaZguOBr+OAgeODleOCp+ODvOODieOCpOODs+ioreWumuOBl+ebtOOBl1xuICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkuc2V0RmFkZUluU3RhcnRUaW1lKHVzZXJUaW1lU2Vjb25kcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9vbkZpbmlzaGVkTW90aW9uKSB7XG4gICAgICAgICAgdGhpcy5fb25GaW5pc2hlZE1vdGlvbih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdGlvblF1ZXVlRW50cnkuc2V0SXNGaW5pc2hlZCh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbGFzdFdlaWdodCA9IGZhZGVXZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5oOF5aCx44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBsb29wIOODq+ODvOODl+aDheWgsVxuICAgKi9cbiAgcHVibGljIHNldElzTG9vcChsb29wOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5faXNMb29wID0gbG9vcDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6vjg7zjg5fmg4XloLHjga7lj5blvpdcbiAgICogQHJldHVybiB0cnVlIOODq+ODvOODl+OBmeOCi1xuICAgKiBAcmV0dXJuIGZhbHNlIOODq+ODvOODl+OBl+OBquOBhFxuICAgKi9cbiAgcHVibGljIGlzTG9vcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNMb29wO1xuICB9XG5cbiAgLyoqXG4gICAqIOODq+ODvOODl+aZguOBruODleOCp+ODvOODieOCpOODs+aDheWgseOBruioreWumlxuICAgKiBAcGFyYW0gbG9vcEZhZGVJbiAg44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCxXG4gICAqL1xuICBwdWJsaWMgc2V0SXNMb29wRmFkZUluKGxvb3BGYWRlSW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9pc0xvb3BGYWRlSW4gPSBsb29wRmFkZUluO1xuICB9XG5cbiAgLyoqXG4gICAqIOODq+ODvOODl+aZguOBruODleOCp+ODvOODieOCpOODs+aDheWgseOBruWPluW+l1xuICAgKlxuICAgKiBAcmV0dXJuICB0cnVlICAgIOOBmeOCi1xuICAgKiBAcmV0dXJuICBmYWxzZSAgIOOBl+OBquOBhFxuICAgKi9cbiAgcHVibGljIGlzTG9vcEZhZGVJbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNMb29wRmFkZUluO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+OBrumVt+OBleOCkuWPluW+l+OBmeOCi+OAglxuICAgKlxuICAgKiBAcmV0dXJuICDjg6Ljg7zjgrfjg6fjg7Pjga7plbfjgZVb56eSXVxuICAgKi9cbiAgcHVibGljIGdldER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTG9vcCA/IC0xLjAgOiB0aGlzLl9sb29wRHVyYXRpb25TZWNvbmRzO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+OBruODq+ODvOODl+aZguOBrumVt+OBleOCkuWPluW+l+OBmeOCi+OAglxuICAgKlxuICAgKiBAcmV0dXJuICDjg6Ljg7zjgrfjg6fjg7Pjga7jg6vjg7zjg5fmmYLjga7plbfjgZVb56eSXVxuICAgKi9cbiAgcHVibGljIGdldExvb3BEdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sb29wRHVyYXRpb25TZWNvbmRzO1xuICB9XG5cbiAgLyoqXG4gICAqIOODkeODqeODoeODvOOCv+OBq+WvvuOBmeOCi+ODleOCp+ODvOODieOCpOODs+OBruaZgumWk+OCkuioreWumuOBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1ldGVySWQgICAgIOODkeODqeODoeODvOOCv0lEXG4gICAqIEBwYXJhbSB2YWx1ZSAgICAgICAgICAg44OV44Kn44O844OJ44Kk44Oz44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBzZXRQYXJhbWV0ZXJGYWRlSW5UaW1lKFxuICAgIHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSxcbiAgICB2YWx1ZTogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICBjdXJ2ZXMuYXQoaSkuZmFkZUluVGltZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODkeODqeODoeODvOOCv+OBq+WvvuOBmeOCi+ODleOCp+ODvOODieOCouOCpuODiOOBruaZgumWk+OBruioreWumlxuICAgKiBAcGFyYW0gcGFyYW1ldGVySWQgICAgIOODkeODqeODoeODvOOCv0lEXG4gICAqIEBwYXJhbSB2YWx1ZSAgICAgICAgICAg44OV44Kn44O844OJ44Ki44Km44OI44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBzZXRQYXJhbWV0ZXJGYWRlT3V0VGltZShcbiAgICBwYXJhbWV0ZXJJZDogQ3ViaXNtSWRIYW5kbGUsXG4gICAgdmFsdWU6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjdXJ2ZXM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25DdXJ2ZT4gPSB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50OyArK2kpIHtcbiAgICAgIGlmIChwYXJhbWV0ZXJJZCA9PSBjdXJ2ZXMuYXQoaSkuaWQpIHtcbiAgICAgICAgY3VydmVzLmF0KGkpLmZhZGVPdXRUaW1lID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Kk44Oz44Gu5pmC6ZaT44Gu5Y+W5b6XXG4gICAqIEBwYXJhbSAgICBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHJldHVybiAgIOODleOCp+ODvOODieOCpOODs+OBq+OBi+OBi+OCi+aZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFyYW1ldGVyRmFkZUluVGltZShwYXJhbWV0ZXJJZDogQ3ViaXNtSWRIYW5kbGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICByZXR1cm4gY3VydmVzLmF0KGkpLmZhZGVJblRpbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIOODkeODqeODoeODvOOCv+OBq+WvvuOBmeOCi+ODleOCp+ODvOODieOCouOCpuODiOOBruaZgumWk+OCkuWPluW+l1xuICAgKlxuICAgKiBAcGFyYW0gICBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHJldHVybiAgIOODleOCp+ODvOODieOCouOCpuODiOOBq+OBi+OBi+OCi+aZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFyYW1ldGVyRmFkZU91dFRpbWUocGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlKTogbnVtYmVyIHtcbiAgICBjb25zdCBjdXJ2ZXM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25DdXJ2ZT4gPSB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50OyArK2kpIHtcbiAgICAgIGlmIChwYXJhbWV0ZXJJZCA9PSBjdXJ2ZXMuYXQoaSkuaWQpIHtcbiAgICAgICAgcmV0dXJuIGN1cnZlcy5hdChpKS5mYWRlT3V0VGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICog6Ieq5YuV44Ko44OV44Kn44Kv44OI44GM44GL44GL44Gj44Gm44GE44KL44OR44Op44Oh44O844K/SUTjg6rjgrnjg4jjga7oqK3lrppcbiAgICogQHBhcmFtIGV5ZUJsaW5rUGFyYW1ldGVySWRzICAgIOiHquWLleOBvuOBsOOBn+OBjeOBjOOBi+OBi+OBo+OBpuOBhOOCi+ODkeODqeODoeODvOOCv0lE44Gu44Oq44K544OIXG4gICAqIEBwYXJhbSBsaXBTeW5jUGFyYW1ldGVySWRzICAgICDjg6rjg4Pjg5fjgrfjg7Pjgq/jgYzjgYvjgYvjgaPjgabjgYTjgovjg5Hjg6njg6Hjg7zjgr9JROOBruODquOCueODiFxuICAgKi9cbiAgcHVibGljIHNldEVmZmVjdElkcyhcbiAgICBleWVCbGlua1BhcmFtZXRlcklkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPixcbiAgICBsaXBTeW5jUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+XG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzID0gZXllQmxpbmtQYXJhbWV0ZXJJZHM7XG4gICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcyA9IGxpcFN5bmNQYXJhbWV0ZXJJZHM7XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zb3VyY2VGcmFtZVJhdGUgPSAzMC4wO1xuICAgIHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHMgPSAtMS4wO1xuICAgIHRoaXMuX2lzTG9vcCA9IGZhbHNlOyAvLyB0cnVl44GL44KJIGZhbHNlIOOBuOODh+ODleOCqeODq+ODiOOCkuWkieabtFxuICAgIHRoaXMuX2lzTG9vcEZhZGVJbiA9IHRydWU7IC8vIOODq+ODvOODl+aZguOBq+ODleOCp+ODvOODieOCpOODs+OBjOacieWKueOBi+OBqeOBhuOBi+OBruODleODqeOCsFxuICAgIHRoaXMuX2xhc3RXZWlnaHQgPSAwLjA7XG4gICAgdGhpcy5fbW90aW9uRGF0YSA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWxDdXJ2ZUlkRXllQmxpbmsgPSBudWxsO1xuICAgIHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMgPSBudWxsO1xuICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzID0gbnVsbDtcbiAgICB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4fjgrnjg4jjg6njgq/jgr/nm7jlvZPjga7lh6bnkIZcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIHRoaXMuX21vdGlvbkRhdGEgPSB2b2lkIDA7XG4gICAgdGhpcy5fbW90aW9uRGF0YSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogbW90aW9uMy5qc29u44KS44OR44O844K544GZ44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBtb3Rpb25Kc29uICBtb3Rpb24zLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUgICAgICAgIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgKi9cbiAgcHVibGljIHBhcnNlKG1vdGlvbkpzb246IEFycmF5QnVmZmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gbmV3IEN1YmlzbU1vdGlvbkRhdGEoKTtcblxuICAgIGxldCBqc29uOiBDdWJpc21Nb3Rpb25Kc29uID0gbmV3IEN1YmlzbU1vdGlvbkpzb24obW90aW9uSnNvbiwgc2l6ZSk7XG5cbiAgICB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uID0ganNvbi5nZXRNb3Rpb25EdXJhdGlvbigpO1xuICAgIHRoaXMuX21vdGlvbkRhdGEubG9vcCA9IGpzb24uaXNNb3Rpb25Mb29wKCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ID0ganNvbi5nZXRNb3Rpb25DdXJ2ZUNvdW50KCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5mcHMgPSBqc29uLmdldE1vdGlvbkZwcygpO1xuICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudCA9IGpzb24uZ2V0RXZlbnRDb3VudCgpO1xuXG4gICAgY29uc3QgYXJlQmV6aWVyc1Jlc3RydWN0ZWQ6IGJvb2xlYW4gPSBqc29uLmdldEV2YWx1YXRpb25PcHRpb25GbGFnKFxuICAgICAgRXZhbHVhdGlvbk9wdGlvbkZsYWcuRXZhbHVhdGlvbk9wdGlvbkZsYWdfQXJlQmV6aWVyc1Jpc3RyaWN0ZWRcbiAgICApO1xuXG4gICAgaWYgKGpzb24uaXNFeGlzdE1vdGlvbkZhZGVJblRpbWUoKSkge1xuICAgICAgdGhpcy5fZmFkZUluU2Vjb25kcyA9XG4gICAgICAgIGpzb24uZ2V0TW90aW9uRmFkZUluVGltZSgpIDwgMC4wID8gMS4wIDoganNvbi5nZXRNb3Rpb25GYWRlSW5UaW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZhZGVJblNlY29uZHMgPSAxLjA7XG4gICAgfVxuXG4gICAgaWYgKGpzb24uaXNFeGlzdE1vdGlvbkZhZGVPdXRUaW1lKCkpIHtcbiAgICAgIHRoaXMuX2ZhZGVPdXRTZWNvbmRzID1cbiAgICAgICAganNvbi5nZXRNb3Rpb25GYWRlT3V0VGltZSgpIDwgMC4wID8gMS4wIDoganNvbi5nZXRNb3Rpb25GYWRlT3V0VGltZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9mYWRlT3V0U2Vjb25kcyA9IDEuMDtcbiAgICB9XG5cbiAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy51cGRhdGVTaXplKFxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50LFxuICAgICAgQ3ViaXNtTW90aW9uQ3VydmUsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLnVwZGF0ZVNpemUoXG4gICAgICBqc29uLmdldE1vdGlvblRvdGFsU2VnbWVudENvdW50KCksXG4gICAgICBDdWJpc21Nb3Rpb25TZWdtZW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMudXBkYXRlU2l6ZShcbiAgICAgIGpzb24uZ2V0TW90aW9uVG90YWxQb2ludENvdW50KCksXG4gICAgICBDdWJpc21Nb3Rpb25Qb2ludCxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLnVwZGF0ZVNpemUoXG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50Q291bnQsXG4gICAgICBDdWJpc21Nb3Rpb25FdmVudCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgbGV0IHRvdGFsUG9pbnRDb3VudCA9IDA7XG4gICAgbGV0IHRvdGFsU2VnbWVudENvdW50ID0gMDtcblxuICAgIC8vIEN1cnZlc1xuICAgIGZvciAoXG4gICAgICBsZXQgY3VydmVDb3VudCA9IDA7XG4gICAgICBjdXJ2ZUNvdW50IDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50O1xuICAgICAgKytjdXJ2ZUNvdW50XG4gICAgKSB7XG4gICAgICBpZiAoanNvbi5nZXRNb3Rpb25DdXJ2ZVRhcmdldChjdXJ2ZUNvdW50KSA9PSBUYXJnZXROYW1lTW9kZWwpIHtcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkudHlwZSA9XG4gICAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfTW9kZWw7XG4gICAgICB9IGVsc2UgaWYgKGpzb24uZ2V0TW90aW9uQ3VydmVUYXJnZXQoY3VydmVDb3VudCkgPT0gVGFyZ2V0TmFtZVBhcmFtZXRlcikge1xuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS50eXBlID1cbiAgICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJhbWV0ZXI7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBqc29uLmdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlQ291bnQpID09IFRhcmdldE5hbWVQYXJ0T3BhY2l0eVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnR5cGUgPVxuICAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcnRPcGFjaXR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgQ3ViaXNtTG9nV2FybmluZyhcbiAgICAgICAgICAnV2FybmluZyA6IFVuYWJsZSB0byBnZXQgc2VnbWVudCB0eXBlIGZyb20gQ3VydmUhIFRoZSBudW1iZXIgb2YgXCJDdXJ2ZUNvdW50XCIgbWF5IGJlIGluY29ycmVjdCEnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLmlkID0ganNvbi5nZXRNb3Rpb25DdXJ2ZUlkKFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApO1xuXG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChcbiAgICAgICAgY3VydmVDb3VudFxuICAgICAgKS5iYXNlU2VnbWVudEluZGV4ID0gdG90YWxTZWdtZW50Q291bnQ7XG5cbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApLmZhZGVJblRpbWUgPSBqc29uLmlzRXhpc3RNb3Rpb25DdXJ2ZUZhZGVJblRpbWUoY3VydmVDb3VudClcbiAgICAgICAgPyBqc29uLmdldE1vdGlvbkN1cnZlRmFkZUluVGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA6IC0xLjA7XG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChcbiAgICAgICAgY3VydmVDb3VudFxuICAgICAgKS5mYWRlT3V0VGltZSA9IGpzb24uaXNFeGlzdE1vdGlvbkN1cnZlRmFkZU91dFRpbWUoY3VydmVDb3VudClcbiAgICAgICAgPyBqc29uLmdldE1vdGlvbkN1cnZlRmFkZU91dFRpbWUoY3VydmVDb3VudClcbiAgICAgICAgOiAtMS4wO1xuXG4gICAgICAvLyBTZWdtZW50c1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IHNlZ21lbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIHNlZ21lbnRQb3NpdGlvbiA8IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50Q291bnQoY3VydmVDb3VudCk7XG5cbiAgICAgICkge1xuICAgICAgICBpZiAoc2VnbWVudFBvc2l0aW9uID09IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICApLmJhc2VQb2ludEluZGV4ID0gdG90YWxQb2ludENvdW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChjdXJ2ZUNvdW50LCBzZWdtZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KGN1cnZlQ291bnQsIHNlZ21lbnRQb3NpdGlvbiArIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLmJhc2VQb2ludEluZGV4ID1cbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWdtZW50OiBudW1iZXIgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgIHNlZ21lbnRQb3NpdGlvblxuICAgICAgICApO1xuICAgICAgICBzd2l0Y2ggKHNlZ21lbnQpIHtcbiAgICAgICAgICBjYXNlIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0xpbmVhcjoge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9MaW5lYXI7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGxpbmVhckV2YWx1YXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAyXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDM7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0Jlemllcjoge1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9CZXppZXI7XG5cbiAgICAgICAgICAgIGlmIChhcmVCZXppZXJzUmVzdHJ1Y3RlZCB8fCBVc2VPbGRCZXppZXJzQ3VydmVNb3Rpb24pIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgICApLmV2YWx1YXRlID0gYmV6aWVyRXZhbHVhdGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgICkuZXZhbHVhdGUgPSBiZXppZXJFdmFsdWF0ZUNhcmRhbm9JbnRlcnByZXRhdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50ICsgMSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMVxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMVxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyA0XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQgKyAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAyXG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgNVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAyXG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDZcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDM7XG4gICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gNztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9TdGVwcGVkOiB7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5zZWdtZW50VHlwZSA9XG4gICAgICAgICAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX1N0ZXBwZWQ7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IHN0ZXBwZWRFdmFsdWF0ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMTtcbiAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAzO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0ludmVyc2VTdGVwcGVkOiB7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5zZWdtZW50VHlwZSA9XG4gICAgICAgICAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0ludmVyc2VTdGVwcGVkO1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICkuZXZhbHVhdGUgPSBpbnZlcnNlU3RlcHBlZEV2YWx1YXRlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAyXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDM7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBDU01fQVNTRVJUKDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgKyt0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS5zZWdtZW50Q291bnQ7XG4gICAgICAgICsrdG90YWxTZWdtZW50Q291bnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChcbiAgICAgIGxldCB1c2VyZGF0YWNvdW50ID0gMDtcbiAgICAgIHVzZXJkYXRhY291bnQgPCBqc29uLmdldEV2ZW50Q291bnQoKTtcbiAgICAgICsrdXNlcmRhdGFjb3VudFxuICAgICkge1xuICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodXNlcmRhdGFjb3VudCkuZmlyZVRpbWUgPSBqc29uLmdldEV2ZW50VGltZShcbiAgICAgICAgdXNlcmRhdGFjb3VudFxuICAgICAgKTtcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHVzZXJkYXRhY291bnQpLnZhbHVlID0ganNvbi5nZXRFdmVudFZhbHVlKFxuICAgICAgICB1c2VyZGF0YWNvdW50XG4gICAgICApO1xuICAgIH1cblxuICAgIGpzb24ucmVsZWFzZSgpO1xuICAgIGpzb24gPSB2b2lkIDA7XG4gICAganNvbiA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44Gu44OR44Op44Oh44O844K/5pu05pawXG4gICAqXG4gICAqIOOCpOODmeODs+ODiOeZuueBq+OBruODgeOCp+ODg+OCr+OAglxuICAgKiDlhaXlipvjgZnjgovmmYLplpPjga/lkbzjgbDjgozjgovjg6Ljg7zjgrfjg6fjg7Pjgr/jgqTjg5/jg7PjgrDjgpLvvJDjgajjgZfjgZ/np5LmlbDjgafooYzjgYbjgIJcbiAgICpcbiAgICogQHBhcmFtIGJlZm9yZUNoZWNrVGltZVNlY29uZHMgICDliY3lm57jga7jgqTjg5njg7Pjg4jjg4Hjgqfjg4Pjgq/mmYLplpNb56eSXVxuICAgKiBAcGFyYW0gbW90aW9uVGltZVNlY29uZHMgICAgICAgIOS7iuWbnuOBruWGjeeUn+aZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0RmlyZWRFdmVudChcbiAgICBiZWZvcmVDaGVja1RpbWVTZWNvbmRzOiBudW1iZXIsXG4gICAgbW90aW9uVGltZVNlY29uZHM6IG51bWJlclxuICApOiBjc21WZWN0b3I8Y3NtU3RyaW5nPiB7XG4gICAgdGhpcy5fZmlyZWRFdmVudFZhbHVlcy51cGRhdGVTaXplKDApO1xuXG4gICAgLy8g44Kk44OZ44Oz44OI44Gu55m654Gr44OB44Kn44OD44KvXG4gICAgZm9yIChsZXQgdSA9IDA7IHUgPCB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50Q291bnQ7ICsrdSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS5maXJlVGltZSA+IGJlZm9yZUNoZWNrVGltZVNlY29uZHMgJiZcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodSkuZmlyZVRpbWUgPD0gbW90aW9uVGltZVNlY29uZHNcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9maXJlZEV2ZW50VmFsdWVzLnB1c2hCYWNrKFxuICAgICAgICAgIG5ldyBjc21TdHJpbmcodGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodSkudmFsdWUucylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZmlyZWRFdmVudFZhbHVlcztcbiAgfVxuXG4gIHB1YmxpYyBfc291cmNlRnJhbWVSYXRlOiBudW1iZXI7IC8vIOODreODvOODieOBl+OBn+ODleOCoeOCpOODq+OBrkZQU+OAguiomOi/sOOBjOeEoeOBkeOCjOOBsOODh+ODleOCqeODq+ODiOWApDE1ZnBz44Go44Gq44KLXG4gIHB1YmxpYyBfbG9vcER1cmF0aW9uU2Vjb25kczogbnVtYmVyOyAvLyBtdG7jg5XjgqHjgqTjg6vjgaflrprnvqnjgZXjgozjgovkuIDpgKPjga7jg6Ljg7zjgrfjg6fjg7Pjga7plbfjgZVcbiAgcHVibGljIF9pc0xvb3A6IGJvb2xlYW47IC8vIOODq+ODvOODl+OBmeOCi+OBiz9cbiAgcHVibGljIF9pc0xvb3BGYWRlSW46IGJvb2xlYW47IC8vIOODq+ODvOODl+aZguOBq+ODleOCp+ODvOODieOCpOODs+OBjOacieWKueOBi+OBqeOBhuOBi+OBruODleODqeOCsOOAguWIneacn+WApOOBp+OBr+acieWKueOAglxuICBwdWJsaWMgX2xhc3RXZWlnaHQ6IG51bWJlcjsgLy8g5pyA5b6M44Gr6Kit5a6a44GV44KM44Gf6YeN44G/XG5cbiAgcHVibGljIF9tb3Rpb25EYXRhOiBDdWJpc21Nb3Rpb25EYXRhOyAvLyDlrp/pmpvjga7jg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/mnKzkvZNcblxuICBwdWJsaWMgX2V5ZUJsaW5rUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDoh6rli5Xjgb7jgbDjgZ/jgY3jgpLpgannlKjjgZnjgovjg5Hjg6njg6Hjg7zjgr9JROODj+ODs+ODieODq+OBruODquOCueODiOOAgiAg44Oi44OH44Or77yI44Oi44OH44Or44K744OD44OG44Kj44Oz44Kw77yJ44Go44OR44Op44Oh44O844K/44KS5a++5b+c5LuY44GR44KL44CCXG4gIHB1YmxpYyBfbGlwU3luY1BhcmFtZXRlcklkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g44Oq44OD44OX44K344Oz44Kv44KS6YGp55So44GZ44KL44OR44Op44Oh44O844K/SUTjg4/jg7Pjg4njg6vjga7jg6rjgrnjg4jjgIIgIOODouODh+ODq++8iOODouODh+ODq+OCu+ODg+ODhuOCo+ODs+OCsO+8ieOBqOODkeODqeODoeODvOOCv+OCkuWvvuW/nOS7mOOBkeOCi+OAglxuXG4gIHB1YmxpYyBfbW9kZWxDdXJ2ZUlkRXllQmxpbms6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg6Ljg4fjg6vjgYzmjIHjgaToh6rli5Xjgb7jgbDjgZ/jgY3nlKjjg5Hjg6njg6Hjg7zjgr9JROOBruODj+ODs+ODieODq+OAgiAg44Oi44OH44Or44Go44Oi44O844K344On44Oz44KS5a++5b+c5LuY44GR44KL44CCXG4gIHB1YmxpYyBfbW9kZWxDdXJ2ZUlkTGlwU3luYzogQ3ViaXNtSWRIYW5kbGU7IC8vIOODouODh+ODq+OBjOaMgeOBpOODquODg+ODl+OCt+ODs+OCr+eUqOODkeODqeODoeODvOOCv0lE44Gu44OP44Oz44OJ44Or44CCICDjg6Ljg4fjg6vjgajjg6Ljg7zjgrfjg6fjg7PjgpLlr77lv5zku5jjgZHjgovjgIJcbn1cblxuLy8gTmFtZXNwYWNlIGRlZmluaXRpb24gZm9yIGNvbXBhdGliaWxpdHkuXG5pbXBvcnQgKiBhcyAkIGZyb20gJy4vY3ViaXNtbW90aW9uJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG5leHBvcnQgbmFtZXNwYWNlIExpdmUyREN1YmlzbUZyYW1ld29yayB7XG4gIGV4cG9ydCBjb25zdCBDdWJpc21Nb3Rpb24gPSAkLkN1YmlzbU1vdGlvbjtcbiAgZXhwb3J0IHR5cGUgQ3ViaXNtTW90aW9uID0gJC5DdWJpc21Nb3Rpb247XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiYThlNzZmMmVmYzUwMjI2NGY5Y2RcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==