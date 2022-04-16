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
        if (motionData.points.at(pointPosition).time > time) {
            target = i;
            break;
        }
    }
    if (target == -1) {
        return motionData.points.at(pointPosition).value;
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
                    if (this._motionData.segments.at(totalSegmentCount))
                        this._motionData.segments.at(totalSegmentCount).basePointIndex = totalPointCount;
                    this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition);
                    this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
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
                        this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        this._motionData.points.at(totalPointCount + 1).time = json.getMotionCurveSegment(curveCount, segmentPosition + 3);
                        this._motionData.points.at(totalPointCount + 1).value = json.getMotionCurveSegment(curveCount, segmentPosition + 4);
                        this._motionData.points.at(totalPointCount + 2).time = json.getMotionCurveSegment(curveCount, segmentPosition + 5);
                        this._motionData.points.at(totalPointCount + 2).value = json.getMotionCurveSegment(curveCount, segmentPosition + 6);
                        totalPointCount += 3;
                        segmentPosition += 7;
                        break;
                    }
                    case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped;
                        this._motionData.segments.at(totalSegmentCount).evaluate = steppedEvaluate;
                        this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        totalPointCount += 1;
                        segmentPosition += 3;
                        break;
                    }
                    case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped;
                        this._motionData.segments.at(totalSegmentCount).evaluate = inverseSteppedEvaluate;
                        this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
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


/***/ }),

/***/ "../../../Framework/src/motion/cubismmotioninternal.ts":
/*!*************************************************************!*\
  !*** ../../../Framework/src/motion/cubismmotioninternal.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Live2DCubismFramework = exports.CubismMotionData = exports.CubismMotionEvent = exports.CubismMotionCurve = exports.CubismMotionSegment = exports.CubismMotionPoint = exports.CubismMotionSegmentType = exports.CubismMotionCurveTarget = void 0;
var csmvector_1 = __webpack_require__(/*! ../type/csmvector */ "../../../Framework/src/type/csmvector.ts");
var CubismMotionCurveTarget;
(function (CubismMotionCurveTarget) {
    CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Model"] = 0] = "CubismMotionCurveTarget_Model";
    CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Parameter"] = 1] = "CubismMotionCurveTarget_Parameter";
    CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_PartOpacity"] = 2] = "CubismMotionCurveTarget_PartOpacity";
})(CubismMotionCurveTarget = exports.CubismMotionCurveTarget || (exports.CubismMotionCurveTarget = {}));
var CubismMotionSegmentType;
(function (CubismMotionSegmentType) {
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Linear"] = 0] = "CubismMotionSegmentType_Linear";
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Bezier"] = 1] = "CubismMotionSegmentType_Bezier";
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Stepped"] = 2] = "CubismMotionSegmentType_Stepped";
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_InverseStepped"] = 3] = "CubismMotionSegmentType_InverseStepped";
})(CubismMotionSegmentType = exports.CubismMotionSegmentType || (exports.CubismMotionSegmentType = {}));
var CubismMotionPoint = (function () {
    function CubismMotionPoint() {
        this.time = 0.0;
        this.value = 0.0;
    }
    return CubismMotionPoint;
}());
exports.CubismMotionPoint = CubismMotionPoint;
var CubismMotionSegment = (function () {
    function CubismMotionSegment() {
        this.evaluate = null;
        this.basePointIndex = 0;
        this.segmentType = 0;
    }
    return CubismMotionSegment;
}());
exports.CubismMotionSegment = CubismMotionSegment;
var CubismMotionCurve = (function () {
    function CubismMotionCurve() {
        this.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
        this.segmentCount = 0;
        this.baseSegmentIndex = 0;
        this.fadeInTime = 0.0;
        this.fadeOutTime = 0.0;
    }
    return CubismMotionCurve;
}());
exports.CubismMotionCurve = CubismMotionCurve;
var CubismMotionEvent = (function () {
    function CubismMotionEvent() {
        this.fireTime = 0.0;
    }
    return CubismMotionEvent;
}());
exports.CubismMotionEvent = CubismMotionEvent;
var CubismMotionData = (function () {
    function CubismMotionData() {
        this.duration = 0.0;
        this.loop = false;
        this.curveCount = 0;
        this.eventCount = 0;
        this.fps = 0.0;
        this.curves = new csmvector_1.csmVector();
        this.segments = new csmvector_1.csmVector();
        this.points = new csmvector_1.csmVector();
        this.events = new csmvector_1.csmVector();
    }
    return CubismMotionData;
}());
exports.CubismMotionData = CubismMotionData;
var $ = __importStar(__webpack_require__(/*! ./cubismmotioninternal */ "../../../Framework/src/motion/cubismmotioninternal.ts"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionCurve = $.CubismMotionCurve;
    Live2DCubismFramework.CubismMotionCurveTarget = $.CubismMotionCurveTarget;
    Live2DCubismFramework.CubismMotionData = $.CubismMotionData;
    Live2DCubismFramework.CubismMotionEvent = $.CubismMotionEvent;
    Live2DCubismFramework.CubismMotionPoint = $.CubismMotionPoint;
    Live2DCubismFramework.CubismMotionSegment = $.CubismMotionSegment;
    Live2DCubismFramework.CubismMotionSegmentType = $.CubismMotionSegmentType;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ }),

/***/ "../../../Framework/src/motion/cubismmotionjson.ts":
/*!*********************************************************!*\
  !*** ../../../Framework/src/motion/cubismmotionjson.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Live2DCubismFramework = exports.EvaluationOptionFlag = exports.CubismMotionJson = void 0;
var live2dcubismframework_1 = __webpack_require__(/*! ../live2dcubismframework */ "../../../Framework/src/live2dcubismframework.ts");
var csmstring_1 = __webpack_require__(/*! ../type/csmstring */ "../../../Framework/src/type/csmstring.ts");
var cubismjson_1 = __webpack_require__(/*! ../utils/cubismjson */ "../../../Framework/src/utils/cubismjson.ts");
var Meta = 'Meta';
var Duration = 'Duration';
var Loop = 'Loop';
var AreBeziersRestricted = 'AreBeziersRestricted';
var CurveCount = 'CurveCount';
var Fps = 'Fps';
var TotalSegmentCount = 'TotalSegmentCount';
var TotalPointCount = 'TotalPointCount';
var Curves = 'Curves';
var Target = 'Target';
var Id = 'Id';
var FadeInTime = 'FadeInTime';
var FadeOutTime = 'FadeOutTime';
var Segments = 'Segments';
var UserData = 'UserData';
var UserDataCount = 'UserDataCount';
var TotalUserDataSize = 'TotalUserDataSize';
var Time = 'Time';
var Value = 'Value';
var CubismMotionJson = (function () {
    function CubismMotionJson(buffer, size) {
        this._json = cubismjson_1.CubismJson.create(buffer, size);
    }
    CubismMotionJson.prototype.release = function () {
        cubismjson_1.CubismJson.delete(this._json);
    };
    CubismMotionJson.prototype.getMotionDuration = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(Duration)
            .toFloat();
    };
    CubismMotionJson.prototype.isMotionLoop = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(Loop)
            .toBoolean();
    };
    CubismMotionJson.prototype.getEvaluationOptionFlag = function (flagType) {
        if (EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted == flagType) {
            return this._json
                .getRoot()
                .getValueByString(Meta)
                .getValueByString(AreBeziersRestricted)
                .toBoolean();
        }
        return false;
    };
    CubismMotionJson.prototype.getMotionCurveCount = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(CurveCount)
            .toInt();
    };
    CubismMotionJson.prototype.getMotionFps = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(Fps)
            .toFloat();
    };
    CubismMotionJson.prototype.getMotionTotalSegmentCount = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalSegmentCount)
            .toInt();
    };
    CubismMotionJson.prototype.getMotionTotalPointCount = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalPointCount)
            .toInt();
    };
    CubismMotionJson.prototype.isExistMotionFadeInTime = function () {
        return !this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeInTime)
            .isNull();
    };
    CubismMotionJson.prototype.isExistMotionFadeOutTime = function () {
        return !this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeOutTime)
            .isNull();
    };
    CubismMotionJson.prototype.getMotionFadeInTime = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeInTime)
            .toFloat();
    };
    CubismMotionJson.prototype.getMotionFadeOutTime = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeOutTime)
            .toFloat();
    };
    CubismMotionJson.prototype.getMotionCurveTarget = function (curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Target)
            .getRawString();
    };
    CubismMotionJson.prototype.getMotionCurveId = function (curveIndex) {
        return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Id)
            .getRawString());
    };
    CubismMotionJson.prototype.isExistMotionCurveFadeInTime = function (curveIndex) {
        return !this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeInTime)
            .isNull();
    };
    CubismMotionJson.prototype.isExistMotionCurveFadeOutTime = function (curveIndex) {
        return !this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeOutTime)
            .isNull();
    };
    CubismMotionJson.prototype.getMotionCurveFadeInTime = function (curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeInTime)
            .toFloat();
    };
    CubismMotionJson.prototype.getMotionCurveFadeOutTime = function (curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeOutTime)
            .toFloat();
    };
    CubismMotionJson.prototype.getMotionCurveSegmentCount = function (curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Segments)
            .getVector()
            .getSize();
    };
    CubismMotionJson.prototype.getMotionCurveSegment = function (curveIndex, segmentIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Segments)
            .getValueByIndex(segmentIndex)
            .toFloat();
    };
    CubismMotionJson.prototype.getEventCount = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(UserDataCount)
            .toInt();
    };
    CubismMotionJson.prototype.getTotalEventValueSize = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalUserDataSize)
            .toInt();
    };
    CubismMotionJson.prototype.getEventTime = function (userDataIndex) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(userDataIndex)
            .getValueByString(Time)
            .toFloat();
    };
    CubismMotionJson.prototype.getEventValue = function (userDataIndex) {
        return new csmstring_1.csmString(this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(userDataIndex)
            .getValueByString(Value)
            .getRawString());
    };
    return CubismMotionJson;
}());
exports.CubismMotionJson = CubismMotionJson;
var EvaluationOptionFlag;
(function (EvaluationOptionFlag) {
    EvaluationOptionFlag[EvaluationOptionFlag["EvaluationOptionFlag_AreBeziersRistricted"] = 0] = "EvaluationOptionFlag_AreBeziersRistricted";
})(EvaluationOptionFlag = exports.EvaluationOptionFlag || (exports.EvaluationOptionFlag = {}));
var $ = __importStar(__webpack_require__(/*! ./cubismmotionjson */ "../../../Framework/src/motion/cubismmotionjson.ts"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionJson = $.CubismMotionJson;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "227b53459cc52e7db5af"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iMWY3Y2ViZWZmYmYxYTExMDAxYi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEscUlBQTJEO0FBQzNELDhHQUFnRDtBQUVoRCwyR0FBOEM7QUFFOUMsbUhBSThCO0FBQzlCLG1IQUF3RTtBQUN4RSx3SUFRZ0M7QUFDaEMsNEhBQTRFO0FBRzVFLElBQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUNoQyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQUN4QyxJQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztBQUs1QyxJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUV2QyxTQUFTLFVBQVUsQ0FDakIsQ0FBb0IsRUFDcEIsQ0FBb0IsRUFDcEIsQ0FBUztJQUVULElBQU0sTUFBTSxHQUFzQixJQUFJLHdDQUFpQixFQUFFLENBQUM7SUFFMUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBMkIsRUFBRSxJQUFZO0lBQy9ELElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcs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QUMsYUFBYSxDQUFDO2FBQzlCLGdCQUFnQixDQUFDLEtBQUssQ0FBQzthQUN2QixZQUFZLEVBQUUsQ0FDbEIsQ0FBQztJQUNKLENBQUM7SUFHSCx1QkFBQztBQUFELENBQUM7QUEzVVksNENBQWdCO0FBZ1Y3QixJQUFZLG9CQUVYO0FBRkQsV0FBWSxvQkFBb0I7SUFDOUIseUlBQTZDO0FBQy9DLENBQUMsRUFGVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQUUvQjtBQUdELHlIQUF3QztBQUV4QyxJQUFpQixxQkFBcUIsQ0FHckM7QUFIRCxXQUFpQixxQkFBcUI7SUFDdkIsc0NBQWdCLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0FBRXJELENBQUMsRUFIZ0IscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFHckM7Ozs7Ozs7OztVQzlYRCxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MaXZlMmQvLi4vLi4vLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9uLnRzIiwid2VicGFjazovL0xpdmUyZC8uLi8uLi8uLi9GcmFtZXdvcmsvc3JjL21vdGlvbi9jdWJpc21tb3Rpb25pbnRlcm5hbC50cyIsIndlYnBhY2s6Ly9MaXZlMmQvLi4vLi4vLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9uanNvbi50cyIsIndlYnBhY2s6Ly9MaXZlMmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7IEN1YmlzbUlkSGFuZGxlIH0gZnJvbSAnLi4vaWQvY3ViaXNtaWQnO1xuaW1wb3J0IHsgQ3ViaXNtRnJhbWV3b3JrIH0gZnJvbSAnLi4vbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbmltcG9ydCB7IEN1YmlzbU1hdGggfSBmcm9tICcuLi9tYXRoL2N1YmlzbW1hdGgnO1xuaW1wb3J0IHsgQ3ViaXNtTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9jdWJpc21tb2RlbCc7XG5pbXBvcnQgeyBjc21TdHJpbmcgfSBmcm9tICcuLi90eXBlL2NzbXN0cmluZyc7XG5pbXBvcnQgeyBjc21WZWN0b3IgfSBmcm9tICcuLi90eXBlL2NzbXZlY3Rvcic7XG5pbXBvcnQge1xuICBDU01fQVNTRVJULFxuICBDdWJpc21Mb2dEZWJ1ZyxcbiAgQ3ViaXNtTG9nV2FybmluZ1xufSBmcm9tICcuLi91dGlscy9jdWJpc21kZWJ1Zyc7XG5pbXBvcnQgeyBBQ3ViaXNtTW90aW9uLCBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrIH0gZnJvbSAnLi9hY3ViaXNtbW90aW9uJztcbmltcG9ydCB7XG4gIEN1YmlzbU1vdGlvbkN1cnZlLFxuICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldCxcbiAgQ3ViaXNtTW90aW9uRGF0YSxcbiAgQ3ViaXNtTW90aW9uRXZlbnQsXG4gIEN1YmlzbU1vdGlvblBvaW50LFxuICBDdWJpc21Nb3Rpb25TZWdtZW50LFxuICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZVxufSBmcm9tICcuL2N1YmlzbW1vdGlvbmludGVybmFsJztcbmltcG9ydCB7IEN1YmlzbU1vdGlvbkpzb24sIEV2YWx1YXRpb25PcHRpb25GbGFnIH0gZnJvbSAnLi9jdWJpc21tb3Rpb25qc29uJztcbmltcG9ydCB7IEN1YmlzbU1vdGlvblF1ZXVlRW50cnkgfSBmcm9tICcuL2N1YmlzbW1vdGlvbnF1ZXVlZW50cnknO1xuXG5jb25zdCBFZmZlY3ROYW1lRXllQmxpbmsgPSAnRXllQmxpbmsnO1xuY29uc3QgRWZmZWN0TmFtZUxpcFN5bmMgPSAnTGlwU3luYyc7XG5jb25zdCBUYXJnZXROYW1lTW9kZWwgPSAnTW9kZWwnO1xuY29uc3QgVGFyZ2V0TmFtZVBhcmFtZXRlciA9ICdQYXJhbWV0ZXInO1xuY29uc3QgVGFyZ2V0TmFtZVBhcnRPcGFjaXR5ID0gJ1BhcnRPcGFjaXR5JztcblxuLyoqXG4gKiBDdWJpc20gU0RLIFIyIOS7peWJjeOBruODouODvOOCt+ODp+ODs+OCkuWGjeePvuOBleOBm+OCi+OBquOCiSB0cnVlIOOAgeOCouODi+ODoeODvOOCv+OBruODouODvOOCt+ODp+ODs+OCkuato+OBl+OBj+WGjeePvuOBmeOCi+OBquOCiSBmYWxzZSDjgIJcbiAqL1xuY29uc3QgVXNlT2xkQmV6aWVyc0N1cnZlTW90aW9uID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGxlcnBQb2ludHMoXG4gIGE6IEN1YmlzbU1vdGlvblBvaW50LFxuICBiOiBDdWJpc21Nb3Rpb25Qb2ludCxcbiAgdDogbnVtYmVyXG4pOiBDdWJpc21Nb3Rpb25Qb2ludCB7XG4gIGNvbnN0IHJlc3VsdDogQ3ViaXNtTW90aW9uUG9pbnQgPSBuZXcgQ3ViaXNtTW90aW9uUG9pbnQoKTtcblxuICByZXN1bHQudGltZSA9IGEudGltZSArIChiLnRpbWUgLSBhLnRpbWUpICogdDtcbiAgcmVzdWx0LnZhbHVlID0gYS52YWx1ZSArIChiLnZhbHVlIC0gYS52YWx1ZSkgKiB0O1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGxpbmVhckV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IHQ6IG51bWJlciA9ICh0aW1lIC0gcG9pbnRzWzBdLnRpbWUpIC8gKHBvaW50c1sxXS50aW1lIC0gcG9pbnRzWzBdLnRpbWUpO1xuXG4gIGlmICh0IDwgMC4wKSB7XG4gICAgdCA9IDAuMDtcbiAgfVxuXG4gIHJldHVybiBwb2ludHNbMF0udmFsdWUgKyAocG9pbnRzWzFdLnZhbHVlIC0gcG9pbnRzWzBdLnZhbHVlKSAqIHQ7XG59XG5cbmZ1bmN0aW9uIGJlemllckV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IHQ6IG51bWJlciA9ICh0aW1lIC0gcG9pbnRzWzBdLnRpbWUpIC8gKHBvaW50c1szXS50aW1lIC0gcG9pbnRzWzBdLnRpbWUpO1xuXG4gIGlmICh0IDwgMC4wKSB7XG4gICAgdCA9IDAuMDtcbiAgfVxuXG4gIGNvbnN0IHAwMTogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdLCB0KTtcbiAgY29uc3QgcDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0sIHQpO1xuICBjb25zdCBwMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMl0sIHBvaW50c1szXSwgdCk7XG5cbiAgY29uc3QgcDAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAwMSwgcDEyLCB0KTtcbiAgY29uc3QgcDEyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAxMiwgcDIzLCB0KTtcblxuICByZXR1cm4gbGVycFBvaW50cyhwMDEyLCBwMTIzLCB0KS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gYmV6aWVyRXZhbHVhdGVCaW5hcnlTZWFyY2goXG4gIHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSxcbiAgdGltZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICBjb25zdCB4X2Vycm9yID0gMC4wMTtcblxuICBjb25zdCB4OiBudW1iZXIgPSB0aW1lO1xuICBsZXQgeDE6IG51bWJlciA9IHBvaW50c1swXS50aW1lO1xuICBsZXQgeDI6IG51bWJlciA9IHBvaW50c1szXS50aW1lO1xuICBsZXQgY3gxOiBudW1iZXIgPSBwb2ludHNbMV0udGltZTtcbiAgbGV0IGN4MjogbnVtYmVyID0gcG9pbnRzWzJdLnRpbWU7XG5cbiAgbGV0IHRhID0gMC4wO1xuICBsZXQgdGIgPSAxLjA7XG4gIGxldCB0ID0gMC4wO1xuICBsZXQgaSA9IDA7XG5cbiAgZm9yIChsZXQgdmFyMzMgPSB0cnVlOyBpIDwgMjA7ICsraSkge1xuICAgIGlmICh4IDwgeDEgKyB4X2Vycm9yKSB7XG4gICAgICB0ID0gdGE7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoeDIgLSB4X2Vycm9yIDwgeCkge1xuICAgICAgdCA9IHRiO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbGV0IGNlbnRlcng6IG51bWJlciA9IChjeDEgKyBjeDIpICogMC41O1xuICAgIGN4MSA9ICh4MSArIGN4MSkgKiAwLjU7XG4gICAgY3gyID0gKHgyICsgY3gyKSAqIDAuNTtcbiAgICBjb25zdCBjdHJseDEyOiBudW1iZXIgPSAoY3gxICsgY2VudGVyeCkgKiAwLjU7XG4gICAgY29uc3QgY3RybHgyMTogbnVtYmVyID0gKGN4MiArIGNlbnRlcngpICogMC41O1xuICAgIGNlbnRlcnggPSAoY3RybHgxMiArIGN0cmx4MjEpICogMC41O1xuICAgIGlmICh4IDwgY2VudGVyeCkge1xuICAgICAgdGIgPSAodGEgKyB0YikgKiAwLjU7XG4gICAgICBpZiAoY2VudGVyeCAtIHhfZXJyb3IgPCB4KSB7XG4gICAgICAgIHQgPSB0YjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHgyID0gY2VudGVyeDtcbiAgICAgIGN4MiA9IGN0cmx4MTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhID0gKHRhICsgdGIpICogMC41O1xuICAgICAgaWYgKHggPCBjZW50ZXJ4ICsgeF9lcnJvcikge1xuICAgICAgICB0ID0gdGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB4MSA9IGNlbnRlcng7XG4gICAgICBjeDEgPSBjdHJseDIxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpID09IDIwKSB7XG4gICAgdCA9ICh0YSArIHRiKSAqIDAuNTtcbiAgfVxuXG4gIGlmICh0IDwgMC4wKSB7XG4gICAgdCA9IDAuMDtcbiAgfVxuICBpZiAodCA+IDEuMCkge1xuICAgIHQgPSAxLjA7XG4gIH1cblxuICBjb25zdCBwMDE6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMF0sIHBvaW50c1sxXSwgdCk7XG4gIGNvbnN0IHAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1sxXSwgcG9pbnRzWzJdLCB0KTtcbiAgY29uc3QgcDIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzJdLCBwb2ludHNbM10sIHQpO1xuXG4gIGNvbnN0IHAwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMDEsIHAxMiwgdCk7XG4gIGNvbnN0IHAxMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMTIsIHAyMywgdCk7XG5cbiAgcmV0dXJuIGxlcnBQb2ludHMocDAxMiwgcDEyMywgdCkudmFsdWU7XG59XG5cbmZ1bmN0aW9uIGJlemllckV2YWx1YXRlQ2FyZGFub0ludGVycHJldGF0aW9uKFxuICBwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sXG4gIHRpbWU6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgY29uc3QgeDogbnVtYmVyID0gdGltZTtcbiAgY29uc3QgeDE6IG51bWJlciA9IHBvaW50c1swXS50aW1lO1xuICBjb25zdCB4MjogbnVtYmVyID0gcG9pbnRzWzNdLnRpbWU7XG4gIGNvbnN0IGN4MTogbnVtYmVyID0gcG9pbnRzWzFdLnRpbWU7XG4gIGNvbnN0IGN4MjogbnVtYmVyID0gcG9pbnRzWzJdLnRpbWU7XG5cbiAgY29uc3QgYTogbnVtYmVyID0geDIgLSAzLjAgKiBjeDIgKyAzLjAgKiBjeDEgLSB4MTtcbiAgY29uc3QgYjogbnVtYmVyID0gMy4wICogY3gyIC0gNi4wICogY3gxICsgMy4wICogeDE7XG4gIGNvbnN0IGM6IG51bWJlciA9IDMuMCAqIGN4MSAtIDMuMCAqIHgxO1xuICBjb25zdCBkOiBudW1iZXIgPSB4MSAtIHg7XG5cbiAgY29uc3QgdDogbnVtYmVyID0gQ3ViaXNtTWF0aC5jYXJkYW5vQWxnb3JpdGhtRm9yQmV6aWVyKGEsIGIsIGMsIGQpO1xuXG4gIGNvbnN0IHAwMTogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdLCB0KTtcbiAgY29uc3QgcDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0sIHQpO1xuICBjb25zdCBwMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMl0sIHBvaW50c1szXSwgdCk7XG5cbiAgY29uc3QgcDAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAwMSwgcDEyLCB0KTtcbiAgY29uc3QgcDEyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAxMiwgcDIzLCB0KTtcblxuICByZXR1cm4gbGVycFBvaW50cyhwMDEyLCBwMTIzLCB0KS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gc3RlcHBlZEV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIHBvaW50c1swXS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gaW52ZXJzZVN0ZXBwZWRFdmFsdWF0ZShcbiAgcG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLFxuICB0aW1lOiBudW1iZXJcbik6IG51bWJlciB7XG4gIHJldHVybiBwb2ludHNbMV0udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGV2YWx1YXRlQ3VydmUoXG4gIG1vdGlvbkRhdGE6IEN1YmlzbU1vdGlvbkRhdGEsXG4gIGluZGV4OiBudW1iZXIsXG4gIHRpbWU6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgLy8gRmluZCBzZWdtZW50IHRvIGV2YWx1YXRlLlxuICBjb25zdCBjdXJ2ZTogQ3ViaXNtTW90aW9uQ3VydmUgPSBtb3Rpb25EYXRhLmN1cnZlcy5hdChpbmRleCk7XG5cbiAgbGV0IHRhcmdldCA9IC0xO1xuICBjb25zdCB0b3RhbFNlZ21lbnRDb3VudDogbnVtYmVyID0gY3VydmUuYmFzZVNlZ21lbnRJbmRleCArIGN1cnZlLnNlZ21lbnRDb3VudDtcbiAgbGV0IHBvaW50UG9zaXRpb24gPSAwO1xuICBmb3IgKGxldCBpOiBudW1iZXIgPSBjdXJ2ZS5iYXNlU2VnbWVudEluZGV4OyBpIDwgdG90YWxTZWdtZW50Q291bnQ7ICsraSkge1xuICAgIC8vIEdldCBmaXJzdCBwb2ludCBvZiBuZXh0IHNlZ21lbnQuXG4gICAgcG9pbnRQb3NpdGlvbiA9XG4gICAgICBtb3Rpb25EYXRhLnNlZ21lbnRzLmF0KGkpLmJhc2VQb2ludEluZGV4ICtcbiAgICAgIChtb3Rpb25EYXRhLnNlZ21lbnRzLmF0KGkpLnNlZ21lbnRUeXBlID09XG4gICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9CZXppZXJcbiAgICAgICAgPyAzXG4gICAgICAgIDogMSk7XG5cbiAgICAvLyBCcmVhayBpZiB0aW1lIGxpZXMgd2l0aGluIGN1cnJlbnQgc2VnbWVudC5cbiAgICBpZiAobW90aW9uRGF0YS5wb2ludHMuYXQocG9pbnRQb3NpdGlvbikudGltZSA+IHRpbWUpIHtcbiAgICAgIHRhcmdldCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAodGFyZ2V0ID09IC0xKSB7XG4gICAgcmV0dXJuIG1vdGlvbkRhdGEucG9pbnRzLmF0KHBvaW50UG9zaXRpb24pLnZhbHVlO1xuICB9XG5cbiAgY29uc3Qgc2VnbWVudDogQ3ViaXNtTW90aW9uU2VnbWVudCA9IG1vdGlvbkRhdGEuc2VnbWVudHMuYXQodGFyZ2V0KTtcblxuICByZXR1cm4gc2VnbWVudC5ldmFsdWF0ZShtb3Rpb25EYXRhLnBvaW50cy5nZXQoc2VnbWVudC5iYXNlUG9pbnRJbmRleCksIHRpbWUpO1xufVxuXG4vKipcbiAqIOODouODvOOCt+ODp+ODs+OCr+ODqeOCuVxuICpcbiAqIOODouODvOOCt+ODp+ODs+OBruOCr+ODqeOCueOAglxuICovXG5leHBvcnQgY2xhc3MgQ3ViaXNtTW90aW9uIGV4dGVuZHMgQUN1YmlzbU1vdGlvbiB7XG4gIC8qKlxuICAgKiDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzmiJDjgZnjgotcbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciBtb3Rpb24zLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDkvZzmiJDjgZXjgozjgZ/jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gICAgc2l6ZTogbnVtYmVyLFxuICAgIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyPzogRmluaXNoZWRNb3Rpb25DYWxsYmFja1xuICApOiBDdWJpc21Nb3Rpb24ge1xuICAgIGNvbnN0IHJldCA9IG5ldyBDdWJpc21Nb3Rpb24oKTtcblxuICAgIHJldC5wYXJzZShidWZmZXIsIHNpemUpO1xuICAgIHJldC5fc291cmNlRnJhbWVSYXRlID0gcmV0Ll9tb3Rpb25EYXRhLmZwcztcbiAgICByZXQuX2xvb3BEdXJhdGlvblNlY29uZHMgPSByZXQuX21vdGlvbkRhdGEuZHVyYXRpb247XG4gICAgcmV0Ll9vbkZpbmlzaGVkTW90aW9uID0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI7XG5cbiAgICAvLyBOT1RFOiBFZGl0b3Ljgafjga/jg6vjg7zjg5fjgYLjgorjga7jg6Ljg7zjgrfjg6fjg7Pmm7jjgY3lh7rjgZfjga/pnZ7lr77lv5xcbiAgICAvLyByZXQtPl9sb29wID0gKHJldC0+X21vdGlvbkRhdGEtPkxvb3AgPiAwKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OBruODkeODqeODoeODvOOCv+OBruabtOaWsOOBruWun+ihjFxuICAgKiBAcGFyYW0gbW9kZWwgICAgICAgICAgICAg5a++6LGh44Gu44Oi44OH44OrXG4gICAqIEBwYXJhbSB1c2VyVGltZVNlY29uZHMgICDnj77lnKjjga7mmYLliLtb56eSXVxuICAgKiBAcGFyYW0gZmFkZVdlaWdodCAgICAgICAg44Oi44O844K344On44Oz44Gu6YeN44G/XG4gICAqIEBwYXJhbSBtb3Rpb25RdWV1ZUVudHJ5ICBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXLjgafnrqHnkIbjgZXjgozjgabjgYTjgovjg6Ljg7zjgrfjg6fjg7NcbiAgICovXG4gIHB1YmxpYyBkb1VwZGF0ZVBhcmFtZXRlcnMoXG4gICAgbW9kZWw6IEN1YmlzbU1vZGVsLFxuICAgIHVzZXJUaW1lU2Vjb25kczogbnVtYmVyLFxuICAgIGZhZGVXZWlnaHQ6IG51bWJlcixcbiAgICBtb3Rpb25RdWV1ZUVudHJ5OiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5XG4gICk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgICAgRWZmZWN0TmFtZUV5ZUJsaW5rXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2RlbEN1cnZlSWRMaXBTeW5jID09IG51bGwpIHtcbiAgICAgIHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICAgIEVmZmVjdE5hbWVMaXBTeW5jXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCB0aW1lT2Zmc2V0U2Vjb25kczogbnVtYmVyID1cbiAgICAgIHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0U3RhcnRUaW1lKCk7XG5cbiAgICBpZiAodGltZU9mZnNldFNlY29uZHMgPCAwLjApIHtcbiAgICAgIHRpbWVPZmZzZXRTZWNvbmRzID0gMC4wOyAvLyDjgqjjg6njg7zlm57pgb9cbiAgICB9XG5cbiAgICBsZXQgbGlwU3luY1ZhbHVlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIGxldCBleWVCbGlua1ZhbHVlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuXG4gICAgLy/jgb7jgbDjgZ/jgY3jgIHjg6rjg4Pjg5fjgrfjg7Pjgq/jga7jgYbjgaHjg6Ljg7zjgrfjg6fjg7Pjga7pgannlKjjgpLmpJzlh7rjgZnjgovjgZ/jgoHjga7jg5Pjg4Pjg4jvvIhtYXhGbGFnQ291bnTlgIvjgb7jgadcbiAgICBjb25zdCBNYXhUYXJnZXRTaXplID0gNjQ7XG4gICAgbGV0IGxpcFN5bmNGbGFncyA9IDA7XG4gICAgbGV0IGV5ZUJsaW5rRmxhZ3MgPSAwO1xuXG4gICAgLy/nnqzjgY3jgIHjg6rjg4Pjg5fjgrfjg7Pjgq/jga7jgr/jg7zjgrLjg4Pjg4jmlbDjgYzkuIrpmZDjgpLotoXjgYjjgabjgYTjgovloLTlkIhcbiAgICBpZiAodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgQ3ViaXNtTG9nRGVidWcoXG4gICAgICAgICd0b28gbWFueSBleWUgYmxpbmsgdGFyZ2V0cyA6IHswfScsXG4gICAgICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgQ3ViaXNtTG9nRGVidWcoXG4gICAgICAgICd0b28gbWFueSBsaXAgc3luYyB0YXJnZXRzIDogezB9JyxcbiAgICAgICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdG1wRmFkZUluOiBudW1iZXIgPVxuICAgICAgdGhpcy5fZmFkZUluU2Vjb25kcyA8PSAwLjBcbiAgICAgICAgPyAxLjBcbiAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAodXNlclRpbWVTZWNvbmRzIC0gbW90aW9uUXVldWVFbnRyeS5nZXRGYWRlSW5TdGFydFRpbWUoKSkgL1xuICAgICAgICAgICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzXG4gICAgICAgICAgKTtcblxuICAgIGNvbnN0IHRtcEZhZGVPdXQ6IG51bWJlciA9XG4gICAgICB0aGlzLl9mYWRlT3V0U2Vjb25kcyA8PSAwLjAgfHwgbW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgPCAwLjBcbiAgICAgICAgPyAxLjBcbiAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAobW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgLSB1c2VyVGltZVNlY29uZHMpIC9cbiAgICAgICAgICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHNcbiAgICAgICAgICApO1xuICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgIGxldCBjOiBudW1iZXIsIHBhcmFtZXRlckluZGV4OiBudW1iZXI7XG5cbiAgICAvLyAnUmVwZWF0JyB0aW1lIGFzIG5lY2Vzc2FyeS5cbiAgICBsZXQgdGltZTogbnVtYmVyID0gdGltZU9mZnNldFNlY29uZHM7XG5cbiAgICBpZiAodGhpcy5faXNMb29wKSB7XG4gICAgICB3aGlsZSAodGltZSA+IHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24pIHtcbiAgICAgICAgdGltZSAtPSB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgLy8gRXZhbHVhdGUgbW9kZWwgY3VydmVzLlxuICAgIGZvciAoXG4gICAgICBjID0gMDtcbiAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgIGN1cnZlcy5hdChjKS50eXBlID09XG4gICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X01vZGVsO1xuICAgICAgKytjXG4gICAgKSB7XG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgY2FsbCBoYW5kbGVyLlxuICAgICAgdmFsdWUgPSBldmFsdWF0ZUN1cnZlKHRoaXMuX21vdGlvbkRhdGEsIGMsIHRpbWUpO1xuXG4gICAgICBpZiAoY3VydmVzLmF0KGMpLmlkID09IHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rKSB7XG4gICAgICAgIGV5ZUJsaW5rVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoY3VydmVzLmF0KGMpLmlkID09IHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMpIHtcbiAgICAgICAgbGlwU3luY1ZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhcmFtZXRlck1vdGlvbkN1cnZlQ291bnQgPSAwO1xuXG4gICAgZm9yIChcbiAgICAgIDtcbiAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgIGN1cnZlcy5hdChjKS50eXBlID09XG4gICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcmFtZXRlcjtcbiAgICAgICsrY1xuICAgICkge1xuICAgICAgcGFyYW1ldGVyTW90aW9uQ3VydmVDb3VudCsrO1xuXG4gICAgICAvLyBGaW5kIHBhcmFtZXRlciBpbmRleC5cbiAgICAgIHBhcmFtZXRlckluZGV4ID0gbW9kZWwuZ2V0UGFyYW1ldGVySW5kZXgoY3VydmVzLmF0KGMpLmlkKTtcblxuICAgICAgLy8gU2tpcCBjdXJ2ZSBldmFsdWF0aW9uIGlmIG5vIHZhbHVlIGluIHNpbmsuXG4gICAgICBpZiAocGFyYW1ldGVySW5kZXggPT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvdXJjZVZhbHVlOiBudW1iZXIgPSBtb2RlbC5nZXRQYXJhbWV0ZXJWYWx1ZUJ5SW5kZXgoXG4gICAgICAgIHBhcmFtZXRlckluZGV4XG4gICAgICApO1xuXG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgYXBwbHkgdmFsdWUuXG4gICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG5cbiAgICAgIGlmIChleWVCbGlua1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmF0KGkpID09IGN1cnZlcy5hdChjKS5pZCkge1xuICAgICAgICAgICAgdmFsdWUgKj0gZXllQmxpbmtWYWx1ZTtcbiAgICAgICAgICAgIGV5ZUJsaW5rRmxhZ3MgfD0gMSA8PCBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsaXBTeW5jVmFsdWUgIT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBpIDwgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKCkgJiYgaSA8IE1heFRhcmdldFNpemU7XG4gICAgICAgICAgKytpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmF0KGkpID09IGN1cnZlcy5hdChjKS5pZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gbGlwU3luY1ZhbHVlO1xuICAgICAgICAgICAgbGlwU3luY0ZsYWdzIHw9IDEgPDwgaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgdjogbnVtYmVyO1xuXG4gICAgICAvLyDjg5Hjg6njg6Hjg7zjgr/jgZTjgajjga7jg5Xjgqfjg7zjg4lcbiAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA8IDAuMCAmJiBjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWUgPCAwLjApIHtcbiAgICAgICAgLy8g44Oi44O844K344On44Oz44Gu44OV44Kn44O844OJ44KS6YGp55SoXG4gICAgICAgIHYgPSBzb3VyY2VWYWx1ZSArICh2YWx1ZSAtIHNvdXJjZVZhbHVlKSAqIGZhZGVXZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZfjgabjg5Xjgqfjg7zjg4njgqTjg7PjgYvjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgYzoqK3lrprjgZfjgabjgYLjgovloLTlkIjjga/jgZ3jgaHjgonjgpLpgannlKhcbiAgICAgICAgbGV0IGZpbjogbnVtYmVyO1xuICAgICAgICBsZXQgZm91dDogbnVtYmVyO1xuXG4gICAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA8IDAuMCkge1xuICAgICAgICAgIGZpbiA9IHRtcEZhZGVJbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaW4gPVxuICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVJblRpbWUgPT0gMC4wXG4gICAgICAgICAgICAgID8gMS4wXG4gICAgICAgICAgICAgIDogQ3ViaXNtTWF0aC5nZXRFYXNpbmdTaW5lKFxuICAgICAgICAgICAgICAgICAgKHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0RmFkZUluU3RhcnRUaW1lKCkpIC9cbiAgICAgICAgICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVJblRpbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnZlcy5hdChjKS5mYWRlT3V0VGltZSA8IDAuMCkge1xuICAgICAgICAgIGZvdXQgPSB0bXBGYWRlT3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvdXQgPVxuICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lID09IDAuMCB8fFxuICAgICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgPCAwLjBcbiAgICAgICAgICAgICAgPyAxLjBcbiAgICAgICAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAgICAgICAobW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgLSB1c2VyVGltZVNlY29uZHMpIC9cbiAgICAgICAgICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtV2VpZ2h0OiBudW1iZXIgPSB0aGlzLl93ZWlnaHQgKiBmaW4gKiBmb3V0O1xuXG4gICAgICAgIC8vIOODkeODqeODoeODvOOCv+OBlOOBqOOBruODleOCp+ODvOODieOCkumBqeeUqFxuICAgICAgICB2ID0gc291cmNlVmFsdWUgKyAodmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBwYXJhbVdlaWdodDtcbiAgICAgIH1cblxuICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUluZGV4KHBhcmFtZXRlckluZGV4LCB2LCAxLjApO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGlmIChleWVCbGlua1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlVmFsdWU6IG51bWJlciA9IG1vZGVsLmdldFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgICAgICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmF0KGkpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBp+OBruS4iuabuOOBjeOBjOOBguOBo+OBn+aZguOBq+OBr+OBvuOBsOOBn+OBjeOBr+mBqeeUqOOBl+OBquOBhFxuICAgICAgICAgIGlmICgoZXllQmxpbmtGbGFncyA+PiBpKSAmIDB4MDEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHY6IG51bWJlciA9XG4gICAgICAgICAgICBzb3VyY2VWYWx1ZSArIChleWVCbGlua1ZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcblxuICAgICAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5hdChpKSwgdik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxpcFN5bmNWYWx1ZSAhPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGkgPCB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlVmFsdWU6IG51bWJlciA9IG1vZGVsLmdldFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgICAgICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuYXQoaSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8g44Oi44O844K344On44Oz44Gn44Gu5LiK5pu444GN44GM44GC44Gj44Gf5pmC44Gr44Gv44Oq44OD44OX44K344Oz44Kv44Gv6YGp55So44GX44Gq44GEXG4gICAgICAgICAgaWYgKChsaXBTeW5jRmxhZ3MgPj4gaSkgJiAweDAxKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB2OiBudW1iZXIgPVxuICAgICAgICAgICAgc291cmNlVmFsdWUgKyAobGlwU3luY1ZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcblxuICAgICAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmF0KGkpLCB2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoXG4gICAgICA7XG4gICAgICBjIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ICYmXG4gICAgICBjdXJ2ZXMuYXQoYykudHlwZSA9PVxuICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJ0T3BhY2l0eTtcbiAgICAgICsrY1xuICAgICkge1xuICAgICAgLy8gRmluZCBwYXJhbWV0ZXIgaW5kZXguXG4gICAgICBwYXJhbWV0ZXJJbmRleCA9IG1vZGVsLmdldFBhcmFtZXRlckluZGV4KGN1cnZlcy5hdChjKS5pZCk7XG5cbiAgICAgIC8vIFNraXAgY3VydmUgZXZhbHVhdGlvbiBpZiBubyB2YWx1ZSBpbiBzaW5rLlxuICAgICAgaWYgKHBhcmFtZXRlckluZGV4ID09IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgYXBwbHkgdmFsdWUuXG4gICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG5cbiAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJbmRleChwYXJhbWV0ZXJJbmRleCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aW1lT2Zmc2V0U2Vjb25kcyA+PSB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uKSB7XG4gICAgICBpZiAodGhpcy5faXNMb29wKSB7XG4gICAgICAgIG1vdGlvblF1ZXVlRW50cnkuc2V0U3RhcnRUaW1lKHVzZXJUaW1lU2Vjb25kcyk7IC8vIOacgOWIneOBrueKtuaFi+OBuFxuICAgICAgICBpZiAodGhpcy5faXNMb29wRmFkZUluKSB7XG4gICAgICAgICAgLy8g44Or44O844OX5YaF44Gn44Or44O844OX55So44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544Gu5pmC44Gv44CB44OV44Kn44O844OJ44Kk44Oz6Kit5a6a44GX55u044GXXG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRGYWRlSW5TdGFydFRpbWUodXNlclRpbWVTZWNvbmRzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX29uRmluaXNoZWRNb3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl9vbkZpbmlzaGVkTW90aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRJc0ZpbmlzaGVkKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9sYXN0V2VpZ2h0ID0gZmFkZVdlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6vjg7zjg5fmg4XloLHjga7oqK3lrppcbiAgICogQHBhcmFtIGxvb3Ag44Or44O844OX5oOF5aCxXG4gICAqL1xuICBwdWJsaWMgc2V0SXNMb29wKGxvb3A6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9pc0xvb3AgPSBsb29wO1xuICB9XG5cbiAgLyoqXG4gICAqIOODq+ODvOODl+aDheWgseOBruWPluW+l1xuICAgKiBAcmV0dXJuIHRydWUg44Or44O844OX44GZ44KLXG4gICAqIEByZXR1cm4gZmFsc2Ug44Or44O844OX44GX44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNMb29wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0xvb3A7XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCx44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBsb29wRmFkZUluICDjg6vjg7zjg5fmmYLjga7jg5Xjgqfjg7zjg4njgqTjg7Pmg4XloLFcbiAgICovXG4gIHB1YmxpYyBzZXRJc0xvb3BGYWRlSW4obG9vcEZhZGVJbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2lzTG9vcEZhZGVJbiA9IGxvb3BGYWRlSW47XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCx44Gu5Y+W5b6XXG4gICAqXG4gICAqIEByZXR1cm4gIHRydWUgICAg44GZ44KLXG4gICAqIEByZXR1cm4gIGZhbHNlICAg44GX44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNMb29wRmFkZUluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0xvb3BGYWRlSW47XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu6ZW344GV44KS5Y+W5b6X44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBrumVt+OBlVvnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faXNMb29wID8gLTEuMCA6IHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44Or44O844OX5pmC44Gu6ZW344GV44KS5Y+W5b6X44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBruODq+ODvOODl+aZguOBrumVt+OBlVvnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9vcER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Kk44Oz44Gu5pmC6ZaT44KS6Kit5a6a44GZ44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICDjg5Xjgqfjg7zjg4njgqTjg7PjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIHNldFBhcmFtZXRlckZhZGVJblRpbWUoXG4gICAgcGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlLFxuICAgIHZhbHVlOiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIGN1cnZlcy5hdChpKS5mYWRlSW5UaW1lID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICDjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIHNldFBhcmFtZXRlckZhZGVPdXRUaW1lKFxuICAgIHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSxcbiAgICB2YWx1ZTogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICBjdXJ2ZXMuYXQoaSkuZmFkZU91dFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZnjgovjg5Xjgqfjg7zjg4njgqTjg7Pjga7mmYLplpPjga7lj5blvpdcbiAgICogQHBhcmFtICAgIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Kk44Oz44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJGYWRlSW5UaW1lKHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSk6IG51bWJlciB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIHJldHVybiBjdXJ2ZXMuYXQoaSkuZmFkZUluVGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44KS5Y+W5b6XXG4gICAqXG4gICAqIEBwYXJhbSAgIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Ki44Km44OI44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJGYWRlT3V0VGltZShwYXJhbWV0ZXJJZDogQ3ViaXNtSWRIYW5kbGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICByZXR1cm4gY3VydmVzLmF0KGkpLmZhZGVPdXRUaW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiDoh6rli5Xjgqjjg5Xjgqfjgq/jg4jjgYzjgYvjgYvjgaPjgabjgYTjgovjg5Hjg6njg6Hjg7zjgr9JROODquOCueODiOOBruioreWumlxuICAgKiBAcGFyYW0gZXllQmxpbmtQYXJhbWV0ZXJJZHMgICAg6Ieq5YuV44G+44Gw44Gf44GN44GM44GL44GL44Gj44Gm44GE44KL44OR44Op44Oh44O844K/SUTjga7jg6rjgrnjg4hcbiAgICogQHBhcmFtIGxpcFN5bmNQYXJhbWV0ZXJJZHMgICAgIOODquODg+ODl+OCt+ODs+OCr+OBjOOBi+OBi+OBo+OBpuOBhOOCi+ODkeODqeODoeODvOOCv0lE44Gu44Oq44K544OIXG4gICAqL1xuICBwdWJsaWMgc2V0RWZmZWN0SWRzKFxuICAgIGV5ZUJsaW5rUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+LFxuICAgIGxpcFN5bmNQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT5cbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMgPSBleWVCbGlua1BhcmFtZXRlcklkcztcbiAgICB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzID0gbGlwU3luY1BhcmFtZXRlcklkcztcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NvdXJjZUZyYW1lUmF0ZSA9IDMwLjA7XG4gICAgdGhpcy5fbG9vcER1cmF0aW9uU2Vjb25kcyA9IC0xLjA7XG4gICAgdGhpcy5faXNMb29wID0gZmFsc2U7IC8vIHRydWXjgYvjgokgZmFsc2Ug44G444OH44OV44Kp44Or44OI44KS5aSJ5pu0XG4gICAgdGhpcy5faXNMb29wRmFkZUluID0gdHJ1ZTsgLy8g44Or44O844OX5pmC44Gr44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544GL44Gp44GG44GL44Gu44OV44Op44KwXG4gICAgdGhpcy5fbGFzdFdlaWdodCA9IDAuMDtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWxDdXJ2ZUlkTGlwU3luYyA9IG51bGw7XG4gICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMgPSBudWxsO1xuICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+OCueODiOODqeOCr+OCv+ebuOW9k+OBruWHpueQhlxuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbW90aW9uRGF0YSA9IHZvaWQgMDtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBtb3Rpb24zLmpzb27jgpLjg5Hjg7zjgrnjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIG1vdGlvbkpzb24gIG1vdGlvbjMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSAgICAgICAg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqL1xuICBwdWJsaWMgcGFyc2UobW90aW9uSnNvbjogQXJyYXlCdWZmZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX21vdGlvbkRhdGEgPSBuZXcgQ3ViaXNtTW90aW9uRGF0YSgpO1xuXG4gICAgbGV0IGpzb246IEN1YmlzbU1vdGlvbkpzb24gPSBuZXcgQ3ViaXNtTW90aW9uSnNvbihtb3Rpb25Kc29uLCBzaXplKTtcblxuICAgIHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24gPSBqc29uLmdldE1vdGlvbkR1cmF0aW9uKCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5sb29wID0ganNvbi5pc01vdGlvbkxvb3AoKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgPSBqc29uLmdldE1vdGlvbkN1cnZlQ291bnQoKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmZwcyA9IGpzb24uZ2V0TW90aW9uRnBzKCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudENvdW50ID0ganNvbi5nZXRFdmVudENvdW50KCk7XG5cbiAgICBjb25zdCBhcmVCZXppZXJzUmVzdHJ1Y3RlZDogYm9vbGVhbiA9IGpzb24uZ2V0RXZhbHVhdGlvbk9wdGlvbkZsYWcoXG4gICAgICBFdmFsdWF0aW9uT3B0aW9uRmxhZy5FdmFsdWF0aW9uT3B0aW9uRmxhZ19BcmVCZXppZXJzUmlzdHJpY3RlZFxuICAgICk7XG5cbiAgICBpZiAoanNvbi5pc0V4aXN0TW90aW9uRmFkZUluVGltZSgpKSB7XG4gICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzID1cbiAgICAgICAganNvbi5nZXRNb3Rpb25GYWRlSW5UaW1lKCkgPCAwLjAgPyAxLjAgOiBqc29uLmdldE1vdGlvbkZhZGVJblRpbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmFkZUluU2Vjb25kcyA9IDEuMDtcbiAgICB9XG5cbiAgICBpZiAoanNvbi5pc0V4aXN0TW90aW9uRmFkZU91dFRpbWUoKSkge1xuICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHMgPVxuICAgICAgICBqc29uLmdldE1vdGlvbkZhZGVPdXRUaW1lKCkgPCAwLjAgPyAxLjAgOiBqc29uLmdldE1vdGlvbkZhZGVPdXRUaW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZhZGVPdXRTZWNvbmRzID0gMS4wO1xuICAgIH1cblxuICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLnVwZGF0ZVNpemUoXG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQsXG4gICAgICBDdWJpc21Nb3Rpb25DdXJ2ZSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMudXBkYXRlU2l6ZShcbiAgICAgIGpzb24uZ2V0TW90aW9uVG90YWxTZWdtZW50Q291bnQoKSxcbiAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnQsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy51cGRhdGVTaXplKFxuICAgICAganNvbi5nZXRNb3Rpb25Ub3RhbFBvaW50Q291bnQoKSxcbiAgICAgIEN1YmlzbU1vdGlvblBvaW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMudXBkYXRlU2l6ZShcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudCxcbiAgICAgIEN1YmlzbU1vdGlvbkV2ZW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBsZXQgdG90YWxQb2ludENvdW50ID0gMDtcbiAgICBsZXQgdG90YWxTZWdtZW50Q291bnQgPSAwO1xuXG4gICAgLy8gQ3VydmVzXG4gICAgZm9yIChcbiAgICAgIGxldCBjdXJ2ZUNvdW50ID0gMDtcbiAgICAgIGN1cnZlQ291bnQgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7XG4gICAgICArK2N1cnZlQ291bnRcbiAgICApIHtcbiAgICAgIGlmIChqc29uLmdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlQ291bnQpID09IFRhcmdldE5hbWVNb2RlbCkge1xuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS50eXBlID1cbiAgICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9Nb2RlbDtcbiAgICAgIH0gZWxzZSBpZiAoanNvbi5nZXRNb3Rpb25DdXJ2ZVRhcmdldChjdXJ2ZUNvdW50KSA9PSBUYXJnZXROYW1lUGFyYW1ldGVyKSB7XG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnR5cGUgPVxuICAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcmFtZXRlcjtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGpzb24uZ2V0TW90aW9uQ3VydmVUYXJnZXQoY3VydmVDb3VudCkgPT0gVGFyZ2V0TmFtZVBhcnRPcGFjaXR5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkudHlwZSA9XG4gICAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfUGFydE9wYWNpdHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBDdWJpc21Mb2dXYXJuaW5nKFxuICAgICAgICAgICdXYXJuaW5nIDogVW5hYmxlIHRvIGdldCBzZWdtZW50IHR5cGUgZnJvbSBDdXJ2ZSEgVGhlIG51bWJlciBvZiBcIkN1cnZlQ291bnRcIiBtYXkgYmUgaW5jb3JyZWN0ISdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkuaWQgPSBqc29uLmdldE1vdGlvbkN1cnZlSWQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApLmJhc2VTZWdtZW50SW5kZXggPSB0b3RhbFNlZ21lbnRDb3VudDtcblxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICkuZmFkZUluVGltZSA9IGpzb24uaXNFeGlzdE1vdGlvbkN1cnZlRmFkZUluVGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA/IGpzb24uZ2V0TW90aW9uQ3VydmVGYWRlSW5UaW1lKGN1cnZlQ291bnQpXG4gICAgICAgIDogLTEuMDtcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApLmZhZGVPdXRUaW1lID0ganNvbi5pc0V4aXN0TW90aW9uQ3VydmVGYWRlT3V0VGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA/IGpzb24uZ2V0TW90aW9uQ3VydmVGYWRlT3V0VGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA6IC0xLjA7XG5cbiAgICAgIC8vIFNlZ21lbnRzXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgc2VnbWVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgc2VnbWVudFBvc2l0aW9uIDwganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnRDb3VudChjdXJ2ZUNvdW50KTtcblxuICAgICAgKSB7XG4gICAgICAgIGlmIChzZWdtZW50UG9zaXRpb24gPT0gMCkge1xuICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICApKVxuICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICkuYmFzZVBvaW50SW5kZXggPSB0b3RhbFBvaW50Q291bnQ7XG5cbiAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KGN1cnZlQ291bnQsIHNlZ21lbnRQb3NpdGlvbik7XG4gICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoY3VydmVDb3VudCwgc2VnbWVudFBvc2l0aW9uICsgMSk7XG5cbiAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMTtcbiAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5iYXNlUG9pbnRJbmRleCA9XG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VnbWVudDogbnVtYmVyID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICBzZWdtZW50UG9zaXRpb25cbiAgICAgICAgKTtcbiAgICAgICAgc3dpdGNoIChzZWdtZW50KSB7XG4gICAgICAgICAgY2FzZSBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9MaW5lYXI6IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5zZWdtZW50VHlwZSA9XG4gICAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfTGluZWFyO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgICkuZXZhbHVhdGUgPSBsaW5lYXJFdmFsdWF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMTtcbiAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAzO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9CZXppZXI6IHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyO1xuXG4gICAgICAgICAgICBpZiAoYXJlQmV6aWVyc1Jlc3RydWN0ZWQgfHwgVXNlT2xkQmV6aWVyc0N1cnZlTW90aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGJlemllckV2YWx1YXRlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgICApLmV2YWx1YXRlID0gYmV6aWVyRXZhbHVhdGVDYXJkYW5vSW50ZXJwcmV0YXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAyXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMVxuICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMVxuICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyA0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMlxuICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMlxuICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyA2XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMztcbiAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSA3O1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX1N0ZXBwZWQ6IHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfU3RlcHBlZDtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICApLmV2YWx1YXRlID0gc3RlcHBlZEV2YWx1YXRlO1xuXG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9JbnZlcnNlU3RlcHBlZDoge1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9JbnZlcnNlU3RlcHBlZDtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICApLmV2YWx1YXRlID0gaW52ZXJzZVN0ZXBwZWRFdmFsdWF0ZTtcblxuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDM7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBDU01fQVNTRVJUKDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgKyt0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS5zZWdtZW50Q291bnQ7XG4gICAgICAgICsrdG90YWxTZWdtZW50Q291bnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChcbiAgICAgIGxldCB1c2VyZGF0YWNvdW50ID0gMDtcbiAgICAgIHVzZXJkYXRhY291bnQgPCBqc29uLmdldEV2ZW50Q291bnQoKTtcbiAgICAgICsrdXNlcmRhdGFjb3VudFxuICAgICkge1xuICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodXNlcmRhdGFjb3VudCkuZmlyZVRpbWUgPSBqc29uLmdldEV2ZW50VGltZShcbiAgICAgICAgdXNlcmRhdGFjb3VudFxuICAgICAgKTtcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHVzZXJkYXRhY291bnQpLnZhbHVlID0ganNvbi5nZXRFdmVudFZhbHVlKFxuICAgICAgICB1c2VyZGF0YWNvdW50XG4gICAgICApO1xuICAgIH1cblxuICAgIGpzb24ucmVsZWFzZSgpO1xuICAgIGpzb24gPSB2b2lkIDA7XG4gICAganNvbiA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44Gu44OR44Op44Oh44O844K/5pu05pawXG4gICAqXG4gICAqIOOCpOODmeODs+ODiOeZuueBq+OBruODgeOCp+ODg+OCr+OAglxuICAgKiDlhaXlipvjgZnjgovmmYLplpPjga/lkbzjgbDjgozjgovjg6Ljg7zjgrfjg6fjg7Pjgr/jgqTjg5/jg7PjgrDjgpLvvJDjgajjgZfjgZ/np5LmlbDjgafooYzjgYbjgIJcbiAgICpcbiAgICogQHBhcmFtIGJlZm9yZUNoZWNrVGltZVNlY29uZHMgICDliY3lm57jga7jgqTjg5njg7Pjg4jjg4Hjgqfjg4Pjgq/mmYLplpNb56eSXVxuICAgKiBAcGFyYW0gbW90aW9uVGltZVNlY29uZHMgICAgICAgIOS7iuWbnuOBruWGjeeUn+aZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0RmlyZWRFdmVudChcbiAgICBiZWZvcmVDaGVja1RpbWVTZWNvbmRzOiBudW1iZXIsXG4gICAgbW90aW9uVGltZVNlY29uZHM6IG51bWJlclxuICApOiBjc21WZWN0b3I8Y3NtU3RyaW5nPiB7XG4gICAgdGhpcy5fZmlyZWRFdmVudFZhbHVlcy51cGRhdGVTaXplKDApO1xuXG4gICAgLy8g44Kk44OZ44Oz44OI44Gu55m654Gr44OB44Kn44OD44KvXG4gICAgZm9yIChsZXQgdSA9IDA7IHUgPCB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50Q291bnQ7ICsrdSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS5maXJlVGltZSA+IGJlZm9yZUNoZWNrVGltZVNlY29uZHMgJiZcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodSkuZmlyZVRpbWUgPD0gbW90aW9uVGltZVNlY29uZHNcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9maXJlZEV2ZW50VmFsdWVzLnB1c2hCYWNrKFxuICAgICAgICAgIG5ldyBjc21TdHJpbmcodGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodSkudmFsdWUucylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZmlyZWRFdmVudFZhbHVlcztcbiAgfVxuXG4gIHB1YmxpYyBfc291cmNlRnJhbWVSYXRlOiBudW1iZXI7IC8vIOODreODvOODieOBl+OBn+ODleOCoeOCpOODq+OBrkZQU+OAguiomOi/sOOBjOeEoeOBkeOCjOOBsOODh+ODleOCqeODq+ODiOWApDE1ZnBz44Go44Gq44KLXG4gIHB1YmxpYyBfbG9vcER1cmF0aW9uU2Vjb25kczogbnVtYmVyOyAvLyBtdG7jg5XjgqHjgqTjg6vjgaflrprnvqnjgZXjgozjgovkuIDpgKPjga7jg6Ljg7zjgrfjg6fjg7Pjga7plbfjgZVcbiAgcHVibGljIF9pc0xvb3A6IGJvb2xlYW47IC8vIOODq+ODvOODl+OBmeOCi+OBiz9cbiAgcHVibGljIF9pc0xvb3BGYWRlSW46IGJvb2xlYW47IC8vIOODq+ODvOODl+aZguOBq+ODleOCp+ODvOODieOCpOODs+OBjOacieWKueOBi+OBqeOBhuOBi+OBruODleODqeOCsOOAguWIneacn+WApOOBp+OBr+acieWKueOAglxuICBwdWJsaWMgX2xhc3RXZWlnaHQ6IG51bWJlcjsgLy8g5pyA5b6M44Gr6Kit5a6a44GV44KM44Gf6YeN44G/XG5cbiAgcHVibGljIF9tb3Rpb25EYXRhOiBDdWJpc21Nb3Rpb25EYXRhOyAvLyDlrp/pmpvjga7jg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/mnKzkvZNcblxuICBwdWJsaWMgX2V5ZUJsaW5rUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDoh6rli5Xjgb7jgbDjgZ/jgY3jgpLpgannlKjjgZnjgovjg5Hjg6njg6Hjg7zjgr9JROODj+ODs+ODieODq+OBruODquOCueODiOOAgiAg44Oi44OH44Or77yI44Oi44OH44Or44K744OD44OG44Kj44Oz44Kw77yJ44Go44OR44Op44Oh44O844K/44KS5a++5b+c5LuY44GR44KL44CCXG4gIHB1YmxpYyBfbGlwU3luY1BhcmFtZXRlcklkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g44Oq44OD44OX44K344Oz44Kv44KS6YGp55So44GZ44KL44OR44Op44Oh44O844K/SUTjg4/jg7Pjg4njg6vjga7jg6rjgrnjg4jjgIIgIOODouODh+ODq++8iOODouODh+ODq+OCu+ODg+ODhuOCo+ODs+OCsO+8ieOBqOODkeODqeODoeODvOOCv+OCkuWvvuW/nOS7mOOBkeOCi+OAglxuXG4gIHB1YmxpYyBfbW9kZWxDdXJ2ZUlkRXllQmxpbms6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg6Ljg4fjg6vjgYzmjIHjgaToh6rli5Xjgb7jgbDjgZ/jgY3nlKjjg5Hjg6njg6Hjg7zjgr9JROOBruODj+ODs+ODieODq+OAgiAg44Oi44OH44Or44Go44Oi44O844K344On44Oz44KS5a++5b+c5LuY44GR44KL44CCXG4gIHB1YmxpYyBfbW9kZWxDdXJ2ZUlkTGlwU3luYzogQ3ViaXNtSWRIYW5kbGU7IC8vIOODouODh+ODq+OBjOaMgeOBpOODquODg+ODl+OCt+ODs+OCr+eUqOODkeODqeODoeODvOOCv0lE44Gu44OP44Oz44OJ44Or44CCICDjg6Ljg4fjg6vjgajjg6Ljg7zjgrfjg6fjg7PjgpLlr77lv5zku5jjgZHjgovjgIJcbn1cblxuLy8gTmFtZXNwYWNlIGRlZmluaXRpb24gZm9yIGNvbXBhdGliaWxpdHkuXG5pbXBvcnQgKiBhcyAkIGZyb20gJy4vY3ViaXNtbW90aW9uJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG5leHBvcnQgbmFtZXNwYWNlIExpdmUyREN1YmlzbUZyYW1ld29yayB7XG4gIGV4cG9ydCBjb25zdCBDdWJpc21Nb3Rpb24gPSAkLkN1YmlzbU1vdGlvbjtcbiAgZXhwb3J0IHR5cGUgQ3ViaXNtTW90aW9uID0gJC5DdWJpc21Nb3Rpb247XG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBDdWJpc21JZEhhbmRsZSB9IGZyb20gJy4uL2lkL2N1YmlzbWlkJztcbmltcG9ydCB7IGNzbVN0cmluZyB9IGZyb20gJy4uL3R5cGUvY3Ntc3RyaW5nJztcbmltcG9ydCB7IGNzbVZlY3RvciB9IGZyb20gJy4uL3R5cGUvY3NtdmVjdG9yJztcblxuLyoqXG4gKiBAYnJpZWYg44Oi44O844K344On44Oz44Kr44O844OW44Gu56iu6aGeXG4gKlxuICog44Oi44O844K344On44Oz44Kr44O844OW44Gu56iu6aGe44CCXG4gKi9cbmV4cG9ydCBlbnVtIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0IHtcbiAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfTW9kZWwsIC8vIOODouODh+ODq+OBq+WvvuOBl+OBplxuICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJhbWV0ZXIsIC8vIOODkeODqeODoeODvOOCv+OBq+WvvuOBl+OBplxuICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJ0T3BhY2l0eSAvLyDjg5Hjg7zjg4Tjga7kuI3pgI/mmI7luqbjgavlr77jgZfjgaZcbn1cblxuLyoqXG4gKiBAYnJpZWYg44Oi44O844K344On44Oz44Kr44O844OW44Gu44K744Kw44Oh44Oz44OI44Gu56iu6aGeXG4gKlxuICog44Oi44O844K344On44Oz44Kr44O844OW44Gu44K744Kw44Oh44Oz44OI44Gu56iu6aGe44CCXG4gKi9cbmV4cG9ydCBlbnVtIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlIHtcbiAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfTGluZWFyID0gMCwgLy8g44Oq44OL44KiXG4gIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0JlemllciA9IDEsIC8vIOODmeOCuOOCp+absue3mlxuICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9TdGVwcGVkID0gMiwgLy8g44K544OG44OD44OXXG4gIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0ludmVyc2VTdGVwcGVkID0gMyAvLyDjgqTjg7Pjg5Djg7zjgrnjgrnjg4bjg4Pjg5dcbn1cblxuLyoqXG4gKiBAYnJpZWYg44Oi44O844K344On44Oz44Kr44O844OW44Gu5Yi25b6h54K5XG4gKlxuICog44Oi44O844K344On44Oz44Kr44O844OW44Gu5Yi25b6h54K544CCXG4gKi9cbmV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb25Qb2ludCB7XG4gIHRpbWUgPSAwLjA7IC8vIOaZgumWk1vnp5JdXG4gIHZhbHVlID0gMC4wOyAvLyDlgKRcbn1cblxuLyoqXG4gKiDjg6Ljg7zjgrfjg6fjg7Pjgqvjg7zjg5bjga7jgrvjgrDjg6Hjg7Pjg4jjga7oqZXkvqHplqLmlbBcbiAqXG4gKiBAcGFyYW0gICBwb2ludHMgICAgICDjg6Ljg7zjgrfjg6fjg7Pjgqvjg7zjg5bjga7liLblvqHngrnjg6rjgrnjg4hcbiAqIEBwYXJhbSAgIHRpbWUgICAgICAgIOipleS+oeOBmeOCi+aZgumWk1vnp5JdXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgY3NtTW90aW9uU2VnbWVudEV2YWx1YXRpb25GdW5jdGlvbiB7XG4gIChwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sIHRpbWU6IG51bWJlcik6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBAYnJpZWYg44Oi44O844K344On44Oz44Kr44O844OW44Gu44K744Kw44Oh44Oz44OIXG4gKlxuICog44Oi44O844K344On44Oz44Kr44O844OW44Gu44K744Kw44Oh44Oz44OI44CCXG4gKi9cbmV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb25TZWdtZW50IHtcbiAgLyoqXG4gICAqIEBicmllZiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICpcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44CCXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmFsdWF0ZSA9IG51bGw7XG4gICAgdGhpcy5iYXNlUG9pbnRJbmRleCA9IDA7XG4gICAgdGhpcy5zZWdtZW50VHlwZSA9IDA7XG4gIH1cblxuICBldmFsdWF0ZTogY3NtTW90aW9uU2VnbWVudEV2YWx1YXRpb25GdW5jdGlvbjsgLy8g5L2/55So44GZ44KL6KmV5L6h6Zai5pWwXG4gIGJhc2VQb2ludEluZGV4OiBudW1iZXI7IC8vIOacgOWIneOBruOCu+OCsOODoeODs+ODiOOBuOOBruOCpOODs+ODh+ODg+OCr+OCuVxuICBzZWdtZW50VHlwZTogbnVtYmVyOyAvLyDjgrvjgrDjg6Hjg7Pjg4jjga7nqK7poZ5cbn1cblxuLyoqXG4gKiBAYnJpZWYg44Oi44O844K344On44Oz44Kr44O844OWXG4gKlxuICog44Oi44O844K344On44Oz44Kr44O844OW44CCXG4gKi9cbmV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb25DdXJ2ZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnR5cGUgPSBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9Nb2RlbDtcbiAgICB0aGlzLnNlZ21lbnRDb3VudCA9IDA7XG4gICAgdGhpcy5iYXNlU2VnbWVudEluZGV4ID0gMDtcbiAgICB0aGlzLmZhZGVJblRpbWUgPSAwLjA7XG4gICAgdGhpcy5mYWRlT3V0VGltZSA9IDAuMDtcbiAgfVxuXG4gIHR5cGU6IEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0OyAvLyDjgqvjg7zjg5bjga7nqK7poZ5cbiAgaWQ6IEN1YmlzbUlkSGFuZGxlOyAvLyDjgqvjg7zjg5bjga5JRFxuICBzZWdtZW50Q291bnQ6IG51bWJlcjsgLy8g44K744Kw44Oh44Oz44OI44Gu5YCL5pWwXG4gIGJhc2VTZWdtZW50SW5kZXg6IG51bWJlcjsgLy8g5pyA5Yid44Gu44K744Kw44Oh44Oz44OI44Gu44Kk44Oz44OH44OD44Kv44K5XG4gIGZhZGVJblRpbWU6IG51bWJlcjsgLy8g44OV44Kn44O844OJ44Kk44Oz44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgZmFkZU91dFRpbWU6IG51bWJlcjsgLy8g44OV44Kn44O844OJ44Ki44Km44OI44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbn1cblxuLyoqXG4gKiDjgqTjg5njg7Pjg4jjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIEN1YmlzbU1vdGlvbkV2ZW50IHtcbiAgZmlyZVRpbWUgPSAwLjA7XG4gIHZhbHVlOiBjc21TdHJpbmc7XG59XG5cbi8qKlxuICogQGJyaWVmIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv1xuICpcbiAqIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OAglxuICovXG5leHBvcnQgY2xhc3MgQ3ViaXNtTW90aW9uRGF0YSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmR1cmF0aW9uID0gMC4wO1xuICAgIHRoaXMubG9vcCA9IGZhbHNlO1xuICAgIHRoaXMuY3VydmVDb3VudCA9IDA7XG4gICAgdGhpcy5ldmVudENvdW50ID0gMDtcbiAgICB0aGlzLmZwcyA9IDAuMDtcblxuICAgIHRoaXMuY3VydmVzID0gbmV3IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25DdXJ2ZT4oKTtcbiAgICB0aGlzLnNlZ21lbnRzID0gbmV3IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25TZWdtZW50PigpO1xuICAgIHRoaXMucG9pbnRzID0gbmV3IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25Qb2ludD4oKTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBjc21WZWN0b3I8Q3ViaXNtTW90aW9uRXZlbnQ+KCk7XG4gIH1cblxuICBkdXJhdGlvbjogbnVtYmVyOyAvLyDjg6Ljg7zjgrfjg6fjg7Pjga7plbfjgZVb56eSXVxuICBsb29wOiBib29sZWFuOyAvLyDjg6vjg7zjg5fjgZnjgovjgYvjganjgYbjgYtcbiAgY3VydmVDb3VudDogbnVtYmVyOyAvLyDjgqvjg7zjg5bjga7lgIvmlbBcbiAgZXZlbnRDb3VudDogbnVtYmVyOyAvLyBVc2VyRGF0YeOBruWAi+aVsFxuICBmcHM6IG51bWJlcjsgLy8g44OV44Os44O844Og44Os44O844OIXG4gIGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPjsgLy8g44Kr44O844OW44Gu44Oq44K544OIXG4gIHNlZ21lbnRzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uU2VnbWVudD47IC8vIOOCu+OCsOODoeODs+ODiOOBruODquOCueODiFxuICBwb2ludHM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25Qb2ludD47IC8vIOODneOCpOODs+ODiOOBruODquOCueODiFxuICBldmVudHM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25FdmVudD47IC8vIOOCpOODmeODs+ODiOOBruODquOCueODiFxufVxuXG4vLyBOYW1lc3BhY2UgZGVmaW5pdGlvbiBmb3IgY29tcGF0aWJpbGl0eS5cbmltcG9ydCAqIGFzICQgZnJvbSAnLi9jdWJpc21tb3Rpb25pbnRlcm5hbCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBMaXZlMkRDdWJpc21GcmFtZXdvcmsge1xuICBleHBvcnQgY29uc3QgQ3ViaXNtTW90aW9uQ3VydmUgPSAkLkN1YmlzbU1vdGlvbkN1cnZlO1xuICBleHBvcnQgdHlwZSBDdWJpc21Nb3Rpb25DdXJ2ZSA9ICQuQ3ViaXNtTW90aW9uQ3VydmU7XG4gIGV4cG9ydCBjb25zdCBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldCA9ICQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQ7XG4gIGV4cG9ydCB0eXBlIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0ID0gJC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldDtcbiAgZXhwb3J0IGNvbnN0IEN1YmlzbU1vdGlvbkRhdGEgPSAkLkN1YmlzbU1vdGlvbkRhdGE7XG4gIGV4cG9ydCB0eXBlIEN1YmlzbU1vdGlvbkRhdGEgPSAkLkN1YmlzbU1vdGlvbkRhdGE7XG4gIGV4cG9ydCBjb25zdCBDdWJpc21Nb3Rpb25FdmVudCA9ICQuQ3ViaXNtTW90aW9uRXZlbnQ7XG4gIGV4cG9ydCB0eXBlIEN1YmlzbU1vdGlvbkV2ZW50ID0gJC5DdWJpc21Nb3Rpb25FdmVudDtcbiAgZXhwb3J0IGNvbnN0IEN1YmlzbU1vdGlvblBvaW50ID0gJC5DdWJpc21Nb3Rpb25Qb2ludDtcbiAgZXhwb3J0IHR5cGUgQ3ViaXNtTW90aW9uUG9pbnQgPSAkLkN1YmlzbU1vdGlvblBvaW50O1xuICBleHBvcnQgY29uc3QgQ3ViaXNtTW90aW9uU2VnbWVudCA9ICQuQ3ViaXNtTW90aW9uU2VnbWVudDtcbiAgZXhwb3J0IHR5cGUgQ3ViaXNtTW90aW9uU2VnbWVudCA9ICQuQ3ViaXNtTW90aW9uU2VnbWVudDtcbiAgZXhwb3J0IGNvbnN0IEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlID0gJC5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZTtcbiAgZXhwb3J0IHR5cGUgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUgPSAkLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlO1xuICBleHBvcnQgdHlwZSBjc21Nb3Rpb25TZWdtZW50RXZhbHVhdGlvbkZ1bmN0aW9uID0gJC5jc21Nb3Rpb25TZWdtZW50RXZhbHVhdGlvbkZ1bmN0aW9uO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgQ3ViaXNtSWRIYW5kbGUgfSBmcm9tICcuLi9pZC9jdWJpc21pZCc7XG5pbXBvcnQgeyBDdWJpc21GcmFtZXdvcmsgfSBmcm9tICcuLi9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuaW1wb3J0IHsgY3NtU3RyaW5nIH0gZnJvbSAnLi4vdHlwZS9jc21zdHJpbmcnO1xuaW1wb3J0IHsgQ3ViaXNtSnNvbiB9IGZyb20gJy4uL3V0aWxzL2N1YmlzbWpzb24nO1xuXG4vLyBKU09OIGtleXNcbmNvbnN0IE1ldGEgPSAnTWV0YSc7XG5jb25zdCBEdXJhdGlvbiA9ICdEdXJhdGlvbic7XG5jb25zdCBMb29wID0gJ0xvb3AnO1xuY29uc3QgQXJlQmV6aWVyc1Jlc3RyaWN0ZWQgPSAnQXJlQmV6aWVyc1Jlc3RyaWN0ZWQnO1xuY29uc3QgQ3VydmVDb3VudCA9ICdDdXJ2ZUNvdW50JztcbmNvbnN0IEZwcyA9ICdGcHMnO1xuY29uc3QgVG90YWxTZWdtZW50Q291bnQgPSAnVG90YWxTZWdtZW50Q291bnQnO1xuY29uc3QgVG90YWxQb2ludENvdW50ID0gJ1RvdGFsUG9pbnRDb3VudCc7XG5jb25zdCBDdXJ2ZXMgPSAnQ3VydmVzJztcbmNvbnN0IFRhcmdldCA9ICdUYXJnZXQnO1xuY29uc3QgSWQgPSAnSWQnO1xuY29uc3QgRmFkZUluVGltZSA9ICdGYWRlSW5UaW1lJztcbmNvbnN0IEZhZGVPdXRUaW1lID0gJ0ZhZGVPdXRUaW1lJztcbmNvbnN0IFNlZ21lbnRzID0gJ1NlZ21lbnRzJztcbmNvbnN0IFVzZXJEYXRhID0gJ1VzZXJEYXRhJztcbmNvbnN0IFVzZXJEYXRhQ291bnQgPSAnVXNlckRhdGFDb3VudCc7XG5jb25zdCBUb3RhbFVzZXJEYXRhU2l6ZSA9ICdUb3RhbFVzZXJEYXRhU2l6ZSc7XG5jb25zdCBUaW1lID0gJ1RpbWUnO1xuY29uc3QgVmFsdWUgPSAnVmFsdWUnO1xuXG4vKipcbiAqIG1vdGlvbjMuanNvbuOBruOCs+ODs+ODhuODiuOAglxuICovXG5leHBvcnQgY2xhc3MgQ3ViaXNtTW90aW9uSnNvbiB7XG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICogQHBhcmFtIGJ1ZmZlciBtb3Rpb24zLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoYnVmZmVyOiBBcnJheUJ1ZmZlciwgc2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fanNvbiA9IEN1YmlzbUpzb24uY3JlYXRlKGJ1ZmZlciwgc2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICog44OH44K544OI44Op44Kv44K/55u45b2T44Gu5Yem55CGXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICBDdWJpc21Kc29uLmRlbGV0ZSh0aGlzLl9qc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7plbfjgZXjgpLlj5blvpfjgZnjgotcbiAgICogQHJldHVybiDjg6Ljg7zjgrfjg6fjg7Pjga7plbfjgZVb56eSXVxuICAgKi9cbiAgcHVibGljIGdldE1vdGlvbkR1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKE1ldGEpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhEdXJhdGlvbilcbiAgICAgIC50b0Zsb2F0KCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44Or44O844OX5oOF5aCx44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4gdHJ1ZSDjg6vjg7zjg5fjgZnjgotcbiAgICogQHJldHVybiBmYWxzZSDjg6vjg7zjg5fjgZfjgarjgYRcbiAgICovXG4gIHB1YmxpYyBpc01vdGlvbkxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKE1ldGEpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhMb29wKVxuICAgICAgLnRvQm9vbGVhbigpO1xuICB9XG5cbiAgcHVibGljIGdldEV2YWx1YXRpb25PcHRpb25GbGFnKGZsYWdUeXBlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICBFdmFsdWF0aW9uT3B0aW9uRmxhZy5FdmFsdWF0aW9uT3B0aW9uRmxhZ19BcmVCZXppZXJzUmlzdHJpY3RlZCA9PSBmbGFnVHlwZVxuICAgICkge1xuICAgICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgICAgLmdldFJvb3QoKVxuICAgICAgICAuZ2V0VmFsdWVCeVN0cmluZyhNZXRhKVxuICAgICAgICAuZ2V0VmFsdWVCeVN0cmluZyhBcmVCZXppZXJzUmVzdHJpY3RlZClcbiAgICAgICAgLnRvQm9vbGVhbigpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjgqvjg7zjg5bjga7lgIvmlbDjga7lj5blvpdcbiAgICogQHJldHVybiDjg6Ljg7zjgrfjg6fjg7Pjgqvjg7zjg5bjga7lgIvmlbBcbiAgICovXG4gIHB1YmxpYyBnZXRNb3Rpb25DdXJ2ZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKE1ldGEpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhDdXJ2ZUNvdW50KVxuICAgICAgLnRvSW50KCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44OV44Os44O844Og44Os44O844OI44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g44OV44Os44O844Og44Os44O844OIW0ZQU11cbiAgICovXG4gIHB1YmxpYyBnZXRNb3Rpb25GcHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fanNvblxuICAgICAgLmdldFJvb3QoKVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoTWV0YSlcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKEZwcylcbiAgICAgIC50b0Zsb2F0KCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44K744Kw44Oh44Oz44OI44Gu57eP5ZCI6KiI44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g44Oi44O844K344On44Oz44Gu44K744Kw44Oh44Oz44OI44Gu5Y+W5b6XXG4gICAqL1xuICBwdWJsaWMgZ2V0TW90aW9uVG90YWxTZWdtZW50Q291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fanNvblxuICAgICAgLmdldFJvb3QoKVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoTWV0YSlcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKFRvdGFsU2VnbWVudENvdW50KVxuICAgICAgLnRvSW50KCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44Kr44O844OW44Gu5Yi25b6h5bqX44Gu57eP5ZCI6KiI44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g44Oi44O844K344On44Oz44Gu44Kr44O844OW44Gu5Yi25b6h54K544Gu57eP5ZCI6KiIXG4gICAqL1xuICBwdWJsaWMgZ2V0TW90aW9uVG90YWxQb2ludENvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKE1ldGEpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhUb3RhbFBvaW50Q291bnQpXG4gICAgICAudG9JbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7jg5Xjgqfjg7zjg4njgqTjg7PmmYLplpPjga7lrZjlnKhcbiAgICogQHJldHVybiB0cnVlIOWtmOWcqOOBmeOCi1xuICAgKiBAcmV0dXJuIGZhbHNlIOWtmOWcqOOBl+OBquOBhFxuICAgKi9cbiAgcHVibGljIGlzRXhpc3RNb3Rpb25GYWRlSW5UaW1lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5fanNvblxuICAgICAgLmdldFJvb3QoKVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoTWV0YSlcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKEZhZGVJblRpbWUpXG4gICAgICAuaXNOdWxsKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44OV44Kn44O844OJ44Ki44Km44OI5pmC6ZaT44Gu5a2Y5ZyoXG4gICAqIEByZXR1cm4gdHJ1ZSDlrZjlnKjjgZnjgotcbiAgICogQHJldHVybiBmYWxzZSDlrZjlnKjjgZfjgarjgYRcbiAgICovXG4gIHB1YmxpYyBpc0V4aXN0TW90aW9uRmFkZU91dFRpbWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLl9qc29uXG4gICAgICAuZ2V0Um9vdCgpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhNZXRhKVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoRmFkZU91dFRpbWUpXG4gICAgICAuaXNOdWxsKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44OV44Kn44O844OJ44Kk44Oz5pmC6ZaT44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g44OV44Kn44O844OJ44Kk44Oz5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRNb3Rpb25GYWRlSW5UaW1lKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKE1ldGEpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhGYWRlSW5UaW1lKVxuICAgICAgLnRvRmxvYXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7jg5Xjgqfjg7zjg4njgqLjgqbjg4jmmYLplpPjga7lj5blvpdcbiAgICogQHJldHVybiDjg5Xjgqfjg7zjg4njgqLjgqbjg4jmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIGdldE1vdGlvbkZhZGVPdXRUaW1lKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKE1ldGEpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhGYWRlT3V0VGltZSlcbiAgICAgIC50b0Zsb2F0KCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44Kr44O844OW44Gu56iu6aGe44Gu5Y+W5b6XXG4gICAqIEBwYXJhbSBjdXJ2ZUluZGV4IOOCq+ODvOODluOBruOCpOODs+ODh+ODg+OCr+OCuVxuICAgKiBAcmV0dXJuIOOCq+ODvOODluOBrueorumhnlxuICAgKi9cbiAgcHVibGljIGdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKEN1cnZlcylcbiAgICAgIC5nZXRWYWx1ZUJ5SW5kZXgoY3VydmVJbmRleClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKFRhcmdldClcbiAgICAgIC5nZXRSYXdTdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7jgqvjg7zjg5bjga5JROOBruWPluW+l1xuICAgKiBAcGFyYW0gY3VydmVJbmRleCDjgqvjg7zjg5bjga7jgqTjg7Pjg4fjg4Pjgq/jgrlcbiAgICogQHJldHVybiDjgqvjg7zjg5bjga5JRFxuICAgKi9cbiAgcHVibGljIGdldE1vdGlvbkN1cnZlSWQoY3VydmVJbmRleDogbnVtYmVyKTogQ3ViaXNtSWRIYW5kbGUge1xuICAgIHJldHVybiBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICB0aGlzLl9qc29uXG4gICAgICAgIC5nZXRSb290KClcbiAgICAgICAgLmdldFZhbHVlQnlTdHJpbmcoQ3VydmVzKVxuICAgICAgICAuZ2V0VmFsdWVCeUluZGV4KGN1cnZlSW5kZXgpXG4gICAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKElkKVxuICAgICAgICAuZ2V0UmF3U3RyaW5nKClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+OBruOCq+ODvOODluOBruODleOCp+ODvOODieOCpOODs+aZgumWk+OBruWtmOWcqFxuICAgKiBAcGFyYW0gY3VydmVJbmRleCDjgqvjg7zjg5bjga7jgqTjg7Pjg4fjg4Pjgq/jgrlcbiAgICogQHJldHVybiB0cnVlIOWtmOWcqOOBmeOCi1xuICAgKiBAcmV0dXJuIGZhbHNlIOWtmOWcqOOBl+OBquOBhFxuICAgKi9cbiAgcHVibGljIGlzRXhpc3RNb3Rpb25DdXJ2ZUZhZGVJblRpbWUoY3VydmVJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLl9qc29uXG4gICAgICAuZ2V0Um9vdCgpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhDdXJ2ZXMpXG4gICAgICAuZ2V0VmFsdWVCeUluZGV4KGN1cnZlSW5kZXgpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhGYWRlSW5UaW1lKVxuICAgICAgLmlzTnVsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+OBruOCq+ODvOODluOBruODleOCp+ODvOODieOCouOCpuODiOaZgumWk+OBruWtmOWcqFxuICAgKiBAcGFyYW0gY3VydmVJbmRleCDjgqvjg7zjg5bjga7jgqTjg7Pjg4fjg4Pjgq/jgrlcbiAgICogQHJldHVybiB0cnVlIOWtmOWcqOOBmeOCi1xuICAgKiBAcmV0dXJuIGZhbHNlIOWtmOWcqOOBl+OBquOBhFxuICAgKi9cbiAgcHVibGljIGlzRXhpc3RNb3Rpb25DdXJ2ZUZhZGVPdXRUaW1lKGN1cnZlSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5fanNvblxuICAgICAgLmdldFJvb3QoKVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoQ3VydmVzKVxuICAgICAgLmdldFZhbHVlQnlJbmRleChjdXJ2ZUluZGV4KVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoRmFkZU91dFRpbWUpXG4gICAgICAuaXNOdWxsKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44Kr44O844OW44Gu44OV44Kn44O844OJ44Kk44Oz5pmC6ZaT44Gu5Y+W5b6XXG4gICAqIEBwYXJhbSBjdXJ2ZUluZGV4IOOCq+ODvOODluOBruOCpOODs+ODh+ODg+OCr+OCuVxuICAgKiBAcmV0dXJuIOODleOCp+ODvOODieOCpOODs+aZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0TW90aW9uQ3VydmVGYWRlSW5UaW1lKGN1cnZlSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKEN1cnZlcylcbiAgICAgIC5nZXRWYWx1ZUJ5SW5kZXgoY3VydmVJbmRleClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKEZhZGVJblRpbWUpXG4gICAgICAudG9GbG9hdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+OBruOCq+ODvOODluOBruODleOCp+ODvOODieOCouOCpuODiOaZgumWk+OBruWPluW+l1xuICAgKiBAcGFyYW0gY3VydmVJbmRleCDjgqvjg7zjg5bjga7jgqTjg7Pjg4fjg4Pjgq/jgrlcbiAgICogQHJldHVybiDjg5Xjgqfjg7zjg4njgqLjgqbjg4jmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIGdldE1vdGlvbkN1cnZlRmFkZU91dFRpbWUoY3VydmVJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fanNvblxuICAgICAgLmdldFJvb3QoKVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoQ3VydmVzKVxuICAgICAgLmdldFZhbHVlQnlJbmRleChjdXJ2ZUluZGV4KVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoRmFkZU91dFRpbWUpXG4gICAgICAudG9GbG9hdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+OBruOCq+ODvOODluOBruOCu+OCsOODoeODs+ODiOOBruWAi+aVsOOCkuWPluW+l+OBmeOCi1xuICAgKiBAcGFyYW0gY3VydmVJbmRleCDjgqvjg7zjg5bjga7jgqTjg7Pjg4fjg4Pjgq/jgrlcbiAgICogQHJldHVybiDjg6Ljg7zjgrfjg6fjg7Pjga7jgqvjg7zjg5bjga7jgrvjgrDjg6Hjg7Pjg4jjga7lgIvmlbBcbiAgICovXG4gIHB1YmxpYyBnZXRNb3Rpb25DdXJ2ZVNlZ21lbnRDb3VudChjdXJ2ZUluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9qc29uXG4gICAgICAuZ2V0Um9vdCgpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhDdXJ2ZXMpXG4gICAgICAuZ2V0VmFsdWVCeUluZGV4KGN1cnZlSW5kZXgpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhTZWdtZW50cylcbiAgICAgIC5nZXRWZWN0b3IoKVxuICAgICAgLmdldFNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7jgqvjg7zjg5bjga7jgrvjgrDjg6Hjg7Pjg4jjga7lgKTjga7lj5blvpdcbiAgICogQHBhcmFtIGN1cnZlSW5kZXgg44Kr44O844OW44Gu44Kk44Oz44OH44OD44Kv44K5XG4gICAqIEBwYXJhbSBzZWdtZW50SW5kZXgg44K744Kw44Oh44Oz44OI44Gu44Kk44Oz44OH44OD44Kv44K5XG4gICAqIEByZXR1cm4g44K744Kw44Oh44Oz44OI44Gu5YCkXG4gICAqL1xuICBwdWJsaWMgZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgIGN1cnZlSW5kZXg6IG51bWJlcixcbiAgICBzZWdtZW50SW5kZXg6IG51bWJlclxuICApOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9qc29uXG4gICAgICAuZ2V0Um9vdCgpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhDdXJ2ZXMpXG4gICAgICAuZ2V0VmFsdWVCeUluZGV4KGN1cnZlSW5kZXgpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhTZWdtZW50cylcbiAgICAgIC5nZXRWYWx1ZUJ5SW5kZXgoc2VnbWVudEluZGV4KVxuICAgICAgLnRvRmxvYXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgqTjg5njg7Pjg4jjga7lgIvmlbDjga7lj5blvpdcbiAgICogQHJldHVybiDjgqTjg5njg7Pjg4jjga7lgIvmlbBcbiAgICovXG4gIHB1YmxpYyBnZXRFdmVudENvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKE1ldGEpXG4gICAgICAuZ2V0VmFsdWVCeVN0cmluZyhVc2VyRGF0YUNvdW50KVxuICAgICAgLnRvSW50KCk7XG4gIH1cblxuICAvKipcbiAgICogIOOCpOODmeODs+ODiOOBrue3j+aWh+Wtl+aVsOOBruWPluW+l1xuICAgKiBAcmV0dXJuIOOCpOODmeODs+ODiOOBrue3j+aWh+Wtl+aVsFxuICAgKi9cbiAgcHVibGljIGdldFRvdGFsRXZlbnRWYWx1ZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fanNvblxuICAgICAgLmdldFJvb3QoKVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoTWV0YSlcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKFRvdGFsVXNlckRhdGFTaXplKVxuICAgICAgLnRvSW50KCk7XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI44Gu5pmC6ZaT44Gu5Y+W5b6XXG4gICAqIEBwYXJhbSB1c2VyRGF0YUluZGV4IOOCpOODmeODs+ODiOOBruOCpOODs+ODh+ODg+OCr+OCuVxuICAgKiBAcmV0dXJuIOOCpOODmeODs+ODiOOBruaZgumWk1vnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0RXZlbnRUaW1lKHVzZXJEYXRhSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25cbiAgICAgIC5nZXRSb290KClcbiAgICAgIC5nZXRWYWx1ZUJ5U3RyaW5nKFVzZXJEYXRhKVxuICAgICAgLmdldFZhbHVlQnlJbmRleCh1c2VyRGF0YUluZGV4KVxuICAgICAgLmdldFZhbHVlQnlTdHJpbmcoVGltZSlcbiAgICAgIC50b0Zsb2F0KCk7XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI44Gu5Y+W5b6XXG4gICAqIEBwYXJhbSB1c2VyRGF0YUluZGV4IOOCpOODmeODs+ODiOOBruOCpOODs+ODh+ODg+OCr+OCuVxuICAgKiBAcmV0dXJuIOOCpOODmeODs+ODiOOBruaWh+Wtl+WIl1xuICAgKi9cbiAgcHVibGljIGdldEV2ZW50VmFsdWUodXNlckRhdGFJbmRleDogbnVtYmVyKTogY3NtU3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IGNzbVN0cmluZyhcbiAgICAgIHRoaXMuX2pzb25cbiAgICAgICAgLmdldFJvb3QoKVxuICAgICAgICAuZ2V0VmFsdWVCeVN0cmluZyhVc2VyRGF0YSlcbiAgICAgICAgLmdldFZhbHVlQnlJbmRleCh1c2VyRGF0YUluZGV4KVxuICAgICAgICAuZ2V0VmFsdWVCeVN0cmluZyhWYWx1ZSlcbiAgICAgICAgLmdldFJhd1N0cmluZygpXG4gICAgKTtcbiAgfVxuXG4gIF9qc29uOiBDdWJpc21Kc29uOyAvLyBtb3Rpb24zLmpzb27jga7jg4fjg7zjgr9cbn1cblxuLyoqXG4gKiBAYnJpZWYg44OZ44K444Kn44Kr44O844OW44Gu6Kej6YeI5pa55rOV44Gu44OV44Op44Kw44K/44Kk44OXXG4gKi9cbmV4cG9ydCBlbnVtIEV2YWx1YXRpb25PcHRpb25GbGFnIHtcbiAgRXZhbHVhdGlvbk9wdGlvbkZsYWdfQXJlQmV6aWVyc1Jpc3RyaWN0ZWQgPSAwIC8vLzwg44OZ44K444Kn44OP44Oz44OJ44Or44Gu6KaP5Yi254q25oWLXG59XG5cbi8vIE5hbWVzcGFjZSBkZWZpbml0aW9uIGZvciBjb21wYXRpYmlsaXR5LlxuaW1wb3J0ICogYXMgJCBmcm9tICcuL2N1YmlzbW1vdGlvbmpzb24nO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIHtcbiAgZXhwb3J0IGNvbnN0IEN1YmlzbU1vdGlvbkpzb24gPSAkLkN1YmlzbU1vdGlvbkpzb247XG4gIGV4cG9ydCB0eXBlIEN1YmlzbU1vdGlvbkpzb24gPSAkLkN1YmlzbU1vdGlvbkpzb247XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiMjI3YjUzNDU5Y2M1MmU3ZGI1YWZcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==