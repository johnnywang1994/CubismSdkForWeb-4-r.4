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
        if (pos && pos.time > time) {
            target = i;
            break;
        }
    }
    if (target == -1) {
        var pos = motionData.points.at(pointPosition);
        if (pos)
            return pos.value;
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
/******/ 	__webpack_require__.h = function() { return "7eda2f4266b3c459b890"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45OGVjZGY0YjhmYjZlODRmZGIxMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUMscUlBQTJEO0FBQzNELDhHQUFnRDtBQUVoRCwyR0FBOEM7QUFFOUMsbUhBSThCO0FBQzlCLG1IQUF3RTtBQUN4RSx3SUFRZ0M7QUFDaEMsNEhBQTRFO0FBRzVFLElBQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUNoQyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQUN4QyxJQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztBQUs1QyxJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUV2QyxTQUFTLFVBQVUsQ0FDakIsQ0FBb0IsRUFDcEIsQ0FBb0IsRUFDcEIsQ0FBUztJQUVULElBQU0sTUFBTSxHQUFzQixJQUFJLHdDQUFpQixFQUFFLENBQUM7SUFFMUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBMkIsRUFBRSxJQUFZO0lBQy9ELElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcs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QkFDQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUM3QixJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDckQsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBZUgsbUJBQUM7QUFBRCxDQUFDLENBaDBCaUMsNkJBQWEsR0FnMEI5QztBQWgwQlksb0NBQVk7QUFtMEJ6QixpSEFBb0M7QUFFcEMsSUFBaUIscUJBQXFCLENBR3JDO0FBSEQsV0FBaUIscUJBQXFCO0lBQ3ZCLGtDQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUU3QyxDQUFDLEVBSGdCLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR3JDOzs7Ozs7Ozs7VUN2akNGLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uLi8uLi8uLi9GcmFtZXdvcmsvc3JjL21vdGlvbi9jdWJpc21tb3Rpb24udHMiLCJ3ZWJwYWNrOi8vTGl2ZTJkL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG4gaW1wb3J0IHsgQ3ViaXNtSWRIYW5kbGUgfSBmcm9tICcuLi9pZC9jdWJpc21pZCc7XG4gaW1wb3J0IHsgQ3ViaXNtRnJhbWV3b3JrIH0gZnJvbSAnLi4vbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbiBpbXBvcnQgeyBDdWJpc21NYXRoIH0gZnJvbSAnLi4vbWF0aC9jdWJpc21tYXRoJztcbiBpbXBvcnQgeyBDdWJpc21Nb2RlbCB9IGZyb20gJy4uL21vZGVsL2N1YmlzbW1vZGVsJztcbiBpbXBvcnQgeyBjc21TdHJpbmcgfSBmcm9tICcuLi90eXBlL2NzbXN0cmluZyc7XG4gaW1wb3J0IHsgY3NtVmVjdG9yIH0gZnJvbSAnLi4vdHlwZS9jc212ZWN0b3InO1xuIGltcG9ydCB7XG4gICBDU01fQVNTRVJULFxuICAgQ3ViaXNtTG9nRGVidWcsXG4gICBDdWJpc21Mb2dXYXJuaW5nXG4gfSBmcm9tICcuLi91dGlscy9jdWJpc21kZWJ1Zyc7XG4gaW1wb3J0IHsgQUN1YmlzbU1vdGlvbiwgRmluaXNoZWRNb3Rpb25DYWxsYmFjayB9IGZyb20gJy4vYWN1YmlzbW1vdGlvbic7XG4gaW1wb3J0IHtcbiAgIEN1YmlzbU1vdGlvbkN1cnZlLFxuICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQsXG4gICBDdWJpc21Nb3Rpb25EYXRhLFxuICAgQ3ViaXNtTW90aW9uRXZlbnQsXG4gICBDdWJpc21Nb3Rpb25Qb2ludCxcbiAgIEN1YmlzbU1vdGlvblNlZ21lbnQsXG4gICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZVxuIH0gZnJvbSAnLi9jdWJpc21tb3Rpb25pbnRlcm5hbCc7XG4gaW1wb3J0IHsgQ3ViaXNtTW90aW9uSnNvbiwgRXZhbHVhdGlvbk9wdGlvbkZsYWcgfSBmcm9tICcuL2N1YmlzbW1vdGlvbmpzb24nO1xuIGltcG9ydCB7IEN1YmlzbU1vdGlvblF1ZXVlRW50cnkgfSBmcm9tICcuL2N1YmlzbW1vdGlvbnF1ZXVlZW50cnknO1xuIFxuIGNvbnN0IEVmZmVjdE5hbWVFeWVCbGluayA9ICdFeWVCbGluayc7XG4gY29uc3QgRWZmZWN0TmFtZUxpcFN5bmMgPSAnTGlwU3luYyc7XG4gY29uc3QgVGFyZ2V0TmFtZU1vZGVsID0gJ01vZGVsJztcbiBjb25zdCBUYXJnZXROYW1lUGFyYW1ldGVyID0gJ1BhcmFtZXRlcic7XG4gY29uc3QgVGFyZ2V0TmFtZVBhcnRPcGFjaXR5ID0gJ1BhcnRPcGFjaXR5JztcbiBcbiAvKipcbiAgKiBDdWJpc20gU0RLIFIyIOS7peWJjeOBruODouODvOOCt+ODp+ODs+OCkuWGjeePvuOBleOBm+OCi+OBquOCiSB0cnVlIOOAgeOCouODi+ODoeODvOOCv+OBruODouODvOOCt+ODp+ODs+OCkuato+OBl+OBj+WGjeePvuOBmeOCi+OBquOCiSBmYWxzZSDjgIJcbiAgKi9cbiBjb25zdCBVc2VPbGRCZXppZXJzQ3VydmVNb3Rpb24gPSBmYWxzZTtcbiBcbiBmdW5jdGlvbiBsZXJwUG9pbnRzKFxuICAgYTogQ3ViaXNtTW90aW9uUG9pbnQsXG4gICBiOiBDdWJpc21Nb3Rpb25Qb2ludCxcbiAgIHQ6IG51bWJlclxuICk6IEN1YmlzbU1vdGlvblBvaW50IHtcbiAgIGNvbnN0IHJlc3VsdDogQ3ViaXNtTW90aW9uUG9pbnQgPSBuZXcgQ3ViaXNtTW90aW9uUG9pbnQoKTtcbiBcbiAgIHJlc3VsdC50aW1lID0gYS50aW1lICsgKGIudGltZSAtIGEudGltZSkgKiB0O1xuICAgcmVzdWx0LnZhbHVlID0gYS52YWx1ZSArIChiLnZhbHVlIC0gYS52YWx1ZSkgKiB0O1xuIFxuICAgcmV0dXJuIHJlc3VsdDtcbiB9XG4gXG4gZnVuY3Rpb24gbGluZWFyRXZhbHVhdGUocG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLCB0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgbGV0IHQ6IG51bWJlciA9ICh0aW1lIC0gcG9pbnRzWzBdLnRpbWUpIC8gKHBvaW50c1sxXS50aW1lIC0gcG9pbnRzWzBdLnRpbWUpO1xuIFxuICAgaWYgKHQgPCAwLjApIHtcbiAgICAgdCA9IDAuMDtcbiAgIH1cbiBcbiAgIHJldHVybiBwb2ludHNbMF0udmFsdWUgKyAocG9pbnRzWzFdLnZhbHVlIC0gcG9pbnRzWzBdLnZhbHVlKSAqIHQ7XG4gfVxuIFxuIGZ1bmN0aW9uIGJlemllckV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgIGxldCB0OiBudW1iZXIgPSAodGltZSAtIHBvaW50c1swXS50aW1lKSAvIChwb2ludHNbM10udGltZSAtIHBvaW50c1swXS50aW1lKTtcbiBcbiAgIGlmICh0IDwgMC4wKSB7XG4gICAgIHQgPSAwLjA7XG4gICB9XG4gXG4gICBjb25zdCBwMDE6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMF0sIHBvaW50c1sxXSwgdCk7XG4gICBjb25zdCBwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMV0sIHBvaW50c1syXSwgdCk7XG4gICBjb25zdCBwMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMl0sIHBvaW50c1szXSwgdCk7XG4gXG4gICBjb25zdCBwMDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDAxLCBwMTIsIHQpO1xuICAgY29uc3QgcDEyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAxMiwgcDIzLCB0KTtcbiBcbiAgIHJldHVybiBsZXJwUG9pbnRzKHAwMTIsIHAxMjMsIHQpLnZhbHVlO1xuIH1cbiBcbiBmdW5jdGlvbiBiZXppZXJFdmFsdWF0ZUJpbmFyeVNlYXJjaChcbiAgIHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSxcbiAgIHRpbWU6IG51bWJlclxuICk6IG51bWJlciB7XG4gICBjb25zdCB4X2Vycm9yID0gMC4wMTtcbiBcbiAgIGNvbnN0IHg6IG51bWJlciA9IHRpbWU7XG4gICBsZXQgeDE6IG51bWJlciA9IHBvaW50c1swXS50aW1lO1xuICAgbGV0IHgyOiBudW1iZXIgPSBwb2ludHNbM10udGltZTtcbiAgIGxldCBjeDE6IG51bWJlciA9IHBvaW50c1sxXS50aW1lO1xuICAgbGV0IGN4MjogbnVtYmVyID0gcG9pbnRzWzJdLnRpbWU7XG4gXG4gICBsZXQgdGEgPSAwLjA7XG4gICBsZXQgdGIgPSAxLjA7XG4gICBsZXQgdCA9IDAuMDtcbiAgIGxldCBpID0gMDtcbiBcbiAgIGZvciAobGV0IHZhcjMzID0gdHJ1ZTsgaSA8IDIwOyArK2kpIHtcbiAgICAgaWYgKHggPCB4MSArIHhfZXJyb3IpIHtcbiAgICAgICB0ID0gdGE7XG4gICAgICAgYnJlYWs7XG4gICAgIH1cbiBcbiAgICAgaWYgKHgyIC0geF9lcnJvciA8IHgpIHtcbiAgICAgICB0ID0gdGI7XG4gICAgICAgYnJlYWs7XG4gICAgIH1cbiBcbiAgICAgbGV0IGNlbnRlcng6IG51bWJlciA9IChjeDEgKyBjeDIpICogMC41O1xuICAgICBjeDEgPSAoeDEgKyBjeDEpICogMC41O1xuICAgICBjeDIgPSAoeDIgKyBjeDIpICogMC41O1xuICAgICBjb25zdCBjdHJseDEyOiBudW1iZXIgPSAoY3gxICsgY2VudGVyeCkgKiAwLjU7XG4gICAgIGNvbnN0IGN0cmx4MjE6IG51bWJlciA9IChjeDIgKyBjZW50ZXJ4KSAqIDAuNTtcbiAgICAgY2VudGVyeCA9IChjdHJseDEyICsgY3RybHgyMSkgKiAwLjU7XG4gICAgIGlmICh4IDwgY2VudGVyeCkge1xuICAgICAgIHRiID0gKHRhICsgdGIpICogMC41O1xuICAgICAgIGlmIChjZW50ZXJ4IC0geF9lcnJvciA8IHgpIHtcbiAgICAgICAgIHQgPSB0YjtcbiAgICAgICAgIGJyZWFrO1xuICAgICAgIH1cbiBcbiAgICAgICB4MiA9IGNlbnRlcng7XG4gICAgICAgY3gyID0gY3RybHgxMjtcbiAgICAgfSBlbHNlIHtcbiAgICAgICB0YSA9ICh0YSArIHRiKSAqIDAuNTtcbiAgICAgICBpZiAoeCA8IGNlbnRlcnggKyB4X2Vycm9yKSB7XG4gICAgICAgICB0ID0gdGE7XG4gICAgICAgICBicmVhaztcbiAgICAgICB9XG4gXG4gICAgICAgeDEgPSBjZW50ZXJ4O1xuICAgICAgIGN4MSA9IGN0cmx4MjE7XG4gICAgIH1cbiAgIH1cbiBcbiAgIGlmIChpID09IDIwKSB7XG4gICAgIHQgPSAodGEgKyB0YikgKiAwLjU7XG4gICB9XG4gXG4gICBpZiAodCA8IDAuMCkge1xuICAgICB0ID0gMC4wO1xuICAgfVxuICAgaWYgKHQgPiAxLjApIHtcbiAgICAgdCA9IDEuMDtcbiAgIH1cbiBcbiAgIGNvbnN0IHAwMTogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdLCB0KTtcbiAgIGNvbnN0IHAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1sxXSwgcG9pbnRzWzJdLCB0KTtcbiAgIGNvbnN0IHAyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1syXSwgcG9pbnRzWzNdLCB0KTtcbiBcbiAgIGNvbnN0IHAwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMDEsIHAxMiwgdCk7XG4gICBjb25zdCBwMTIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDEyLCBwMjMsIHQpO1xuIFxuICAgcmV0dXJuIGxlcnBQb2ludHMocDAxMiwgcDEyMywgdCkudmFsdWU7XG4gfVxuIFxuIGZ1bmN0aW9uIGJlemllckV2YWx1YXRlQ2FyZGFub0ludGVycHJldGF0aW9uKFxuICAgcG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLFxuICAgdGltZTogbnVtYmVyXG4gKTogbnVtYmVyIHtcbiAgIGNvbnN0IHg6IG51bWJlciA9IHRpbWU7XG4gICBjb25zdCB4MTogbnVtYmVyID0gcG9pbnRzWzBdLnRpbWU7XG4gICBjb25zdCB4MjogbnVtYmVyID0gcG9pbnRzWzNdLnRpbWU7XG4gICBjb25zdCBjeDE6IG51bWJlciA9IHBvaW50c1sxXS50aW1lO1xuICAgY29uc3QgY3gyOiBudW1iZXIgPSBwb2ludHNbMl0udGltZTtcbiBcbiAgIGNvbnN0IGE6IG51bWJlciA9IHgyIC0gMy4wICogY3gyICsgMy4wICogY3gxIC0geDE7XG4gICBjb25zdCBiOiBudW1iZXIgPSAzLjAgKiBjeDIgLSA2LjAgKiBjeDEgKyAzLjAgKiB4MTtcbiAgIGNvbnN0IGM6IG51bWJlciA9IDMuMCAqIGN4MSAtIDMuMCAqIHgxO1xuICAgY29uc3QgZDogbnVtYmVyID0geDEgLSB4O1xuIFxuICAgY29uc3QgdDogbnVtYmVyID0gQ3ViaXNtTWF0aC5jYXJkYW5vQWxnb3JpdGhtRm9yQmV6aWVyKGEsIGIsIGMsIGQpO1xuIFxuICAgY29uc3QgcDAxOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHQpO1xuICAgY29uc3QgcDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0sIHQpO1xuICAgY29uc3QgcDIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzJdLCBwb2ludHNbM10sIHQpO1xuIFxuICAgY29uc3QgcDAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHAwMSwgcDEyLCB0KTtcbiAgIGNvbnN0IHAxMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMTIsIHAyMywgdCk7XG4gXG4gICByZXR1cm4gbGVycFBvaW50cyhwMDEyLCBwMTIzLCB0KS52YWx1ZTtcbiB9XG4gXG4gZnVuY3Rpb24gc3RlcHBlZEV2YWx1YXRlKHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSwgdGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgIHJldHVybiBwb2ludHNbMF0udmFsdWU7XG4gfVxuIFxuIGZ1bmN0aW9uIGludmVyc2VTdGVwcGVkRXZhbHVhdGUoXG4gICBwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sXG4gICB0aW1lOiBudW1iZXJcbiApOiBudW1iZXIge1xuICAgcmV0dXJuIHBvaW50c1sxXS52YWx1ZTtcbiB9XG4gXG4gZnVuY3Rpb24gZXZhbHVhdGVDdXJ2ZShcbiAgIG1vdGlvbkRhdGE6IEN1YmlzbU1vdGlvbkRhdGEsXG4gICBpbmRleDogbnVtYmVyLFxuICAgdGltZTogbnVtYmVyXG4gKTogbnVtYmVyIHtcbiAgIC8vIEZpbmQgc2VnbWVudCB0byBldmFsdWF0ZS5cbiAgIGNvbnN0IGN1cnZlOiBDdWJpc21Nb3Rpb25DdXJ2ZSA9IG1vdGlvbkRhdGEuY3VydmVzLmF0KGluZGV4KTtcbiBcbiAgIGxldCB0YXJnZXQgPSAtMTtcbiAgIGNvbnN0IHRvdGFsU2VnbWVudENvdW50OiBudW1iZXIgPSBjdXJ2ZS5iYXNlU2VnbWVudEluZGV4ICsgY3VydmUuc2VnbWVudENvdW50O1xuICAgbGV0IHBvaW50UG9zaXRpb24gPSAwO1xuICAgZm9yIChsZXQgaTogbnVtYmVyID0gY3VydmUuYmFzZVNlZ21lbnRJbmRleDsgaSA8IHRvdGFsU2VnbWVudENvdW50OyArK2kpIHtcbiAgICAgLy8gR2V0IGZpcnN0IHBvaW50IG9mIG5leHQgc2VnbWVudC5cbiAgICAgcG9pbnRQb3NpdGlvbiA9XG4gICAgICAgbW90aW9uRGF0YS5zZWdtZW50cy5hdChpKS5iYXNlUG9pbnRJbmRleCArXG4gICAgICAgKG1vdGlvbkRhdGEuc2VnbWVudHMuYXQoaSkuc2VnbWVudFR5cGUgPT1cbiAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9CZXppZXJcbiAgICAgICAgID8gM1xuICAgICAgICAgOiAxKTtcbiBcbiAgICAgLy8gQnJlYWsgaWYgdGltZSBsaWVzIHdpdGhpbiBjdXJyZW50IHNlZ21lbnQuXG4gICAgIGNvbnN0IHBvcyA9IG1vdGlvbkRhdGEucG9pbnRzLmF0KHBvaW50UG9zaXRpb24pO1xuICAgICBpZiAocG9zICYmIHBvcy50aW1lID4gdGltZSkge1xuICAgICAgIHRhcmdldCA9IGk7XG4gICAgICAgYnJlYWs7XG4gICAgIH1cbiAgIH1cbiBcbiAgIGlmICh0YXJnZXQgPT0gLTEpIHtcbiAgICAgY29uc3QgcG9zID0gbW90aW9uRGF0YS5wb2ludHMuYXQocG9pbnRQb3NpdGlvbik7XG4gICAgIGlmIChwb3MpIHJldHVybiBwb3MudmFsdWU7XG4gICB9XG4gXG4gICBjb25zdCBzZWdtZW50OiBDdWJpc21Nb3Rpb25TZWdtZW50ID0gbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0YXJnZXQpO1xuIFxuICAgcmV0dXJuIHNlZ21lbnQgJiYgc2VnbWVudC5ldmFsdWF0ZShtb3Rpb25EYXRhLnBvaW50cy5nZXQoc2VnbWVudC5iYXNlUG9pbnRJbmRleCksIHRpbWUpO1xuIH1cbiBcbiAvKipcbiAgKiDjg6Ljg7zjgrfjg6fjg7Pjgq/jg6njgrlcbiAgKlxuICAqIOODouODvOOCt+ODp+ODs+OBruOCr+ODqeOCueOAglxuICAqL1xuIGV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb24gZXh0ZW5kcyBBQ3ViaXNtTW90aW9uIHtcbiAgIC8qKlxuICAgICog44Kk44Oz44K544K/44Oz44K544KS5L2c5oiQ44GZ44KLXG4gICAgKlxuICAgICogQHBhcmFtIGJ1ZmZlciBtb3Rpb24zLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICAqIEBwYXJhbSBzaXplIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgICogQHBhcmFtIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huaZguOBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICAgICogQHJldHVybiDkvZzmiJDjgZXjgozjgZ/jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICAqL1xuICAgcHVibGljIHN0YXRpYyBjcmVhdGUoXG4gICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gICAgIHNpemU6IG51bWJlcixcbiAgICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICApOiBDdWJpc21Nb3Rpb24ge1xuICAgICBjb25zdCByZXQgPSBuZXcgQ3ViaXNtTW90aW9uKCk7XG4gXG4gICAgIHJldC5wYXJzZShidWZmZXIsIHNpemUpO1xuICAgICByZXQuX3NvdXJjZUZyYW1lUmF0ZSA9IHJldC5fbW90aW9uRGF0YS5mcHM7XG4gICAgIHJldC5fbG9vcER1cmF0aW9uU2Vjb25kcyA9IHJldC5fbW90aW9uRGF0YS5kdXJhdGlvbjtcbiAgICAgcmV0Ll9vbkZpbmlzaGVkTW90aW9uID0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI7XG4gXG4gICAgIC8vIE5PVEU6IEVkaXRvcuOBp+OBr+ODq+ODvOODl+OBguOCiuOBruODouODvOOCt+ODp+ODs+abuOOBjeWHuuOBl+OBr+mdnuWvvuW/nFxuICAgICAvLyByZXQtPl9sb29wID0gKHJldC0+X21vdGlvbkRhdGEtPkxvb3AgPiAwKTtcbiAgICAgcmV0dXJuIHJldDtcbiAgIH1cbiBcbiAgIC8qKlxuICAgICog44Oi44OH44Or44Gu44OR44Op44Oh44O844K/44Gu5pu05paw44Gu5a6f6KGMXG4gICAgKiBAcGFyYW0gbW9kZWwgICAgICAgICAgICAg5a++6LGh44Gu44Oi44OH44OrXG4gICAgKiBAcGFyYW0gdXNlclRpbWVTZWNvbmRzICAg54++5Zyo44Gu5pmC5Yi7W+enkl1cbiAgICAqIEBwYXJhbSBmYWRlV2VpZ2h0ICAgICAgICDjg6Ljg7zjgrfjg6fjg7Pjga7ph43jgb9cbiAgICAqIEBwYXJhbSBtb3Rpb25RdWV1ZUVudHJ5ICBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXLjgafnrqHnkIbjgZXjgozjgabjgYTjgovjg6Ljg7zjgrfjg6fjg7NcbiAgICAqL1xuICAgcHVibGljIGRvVXBkYXRlUGFyYW1ldGVycyhcbiAgICAgbW9kZWw6IEN1YmlzbU1vZGVsLFxuICAgICB1c2VyVGltZVNlY29uZHM6IG51bWJlcixcbiAgICAgZmFkZVdlaWdodDogbnVtYmVyLFxuICAgICBtb3Rpb25RdWV1ZUVudHJ5OiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5XG4gICApOiB2b2lkIHtcbiAgICAgaWYgKHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rID09IG51bGwpIHtcbiAgICAgICB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgICAgIEVmZmVjdE5hbWVFeWVCbGlua1xuICAgICAgICk7XG4gICAgIH1cbiBcbiAgICAgaWYgKHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMgPT0gbnVsbCkge1xuICAgICAgIHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICAgICBFZmZlY3ROYW1lTGlwU3luY1xuICAgICAgICk7XG4gICAgIH1cbiBcbiAgICAgbGV0IHRpbWVPZmZzZXRTZWNvbmRzOiBudW1iZXIgPVxuICAgICAgIHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0U3RhcnRUaW1lKCk7XG4gXG4gICAgIGlmICh0aW1lT2Zmc2V0U2Vjb25kcyA8IDAuMCkge1xuICAgICAgIHRpbWVPZmZzZXRTZWNvbmRzID0gMC4wOyAvLyDjgqjjg6njg7zlm57pgb9cbiAgICAgfVxuIFxuICAgICBsZXQgbGlwU3luY1ZhbHVlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICBsZXQgZXllQmxpbmtWYWx1ZTogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcbiBcbiAgICAgLy/jgb7jgbDjgZ/jgY3jgIHjg6rjg4Pjg5fjgrfjg7Pjgq/jga7jgYbjgaHjg6Ljg7zjgrfjg6fjg7Pjga7pgannlKjjgpLmpJzlh7rjgZnjgovjgZ/jgoHjga7jg5Pjg4Pjg4jvvIhtYXhGbGFnQ291bnTlgIvjgb7jgadcbiAgICAgY29uc3QgTWF4VGFyZ2V0U2l6ZSA9IDY0O1xuICAgICBsZXQgbGlwU3luY0ZsYWdzID0gMDtcbiAgICAgbGV0IGV5ZUJsaW5rRmxhZ3MgPSAwO1xuIFxuICAgICAvL+eerOOBjeOAgeODquODg+ODl+OCt+ODs+OCr+OBruOCv+ODvOOCsuODg+ODiOaVsOOBjOS4iumZkOOCkui2heOBiOOBpuOBhOOCi+WgtOWQiFxuICAgICBpZiAodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgIEN1YmlzbUxvZ0RlYnVnKFxuICAgICAgICAgJ3RvbyBtYW55IGV5ZSBibGluayB0YXJnZXRzIDogezB9JyxcbiAgICAgICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKVxuICAgICAgICk7XG4gICAgIH1cbiAgICAgaWYgKHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgIEN1YmlzbUxvZ0RlYnVnKFxuICAgICAgICAgJ3RvbyBtYW55IGxpcCBzeW5jIHRhcmdldHMgOiB7MH0nLFxuICAgICAgICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKClcbiAgICAgICApO1xuICAgICB9XG4gXG4gICAgIGNvbnN0IHRtcEZhZGVJbjogbnVtYmVyID1cbiAgICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzIDw9IDAuMFxuICAgICAgICAgPyAxLjBcbiAgICAgICAgIDogQ3ViaXNtTWF0aC5nZXRFYXNpbmdTaW5lKFxuICAgICAgICAgICAgICh1c2VyVGltZVNlY29uZHMgLSBtb3Rpb25RdWV1ZUVudHJ5LmdldEZhZGVJblN0YXJ0VGltZSgpKSAvXG4gICAgICAgICAgICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzXG4gICAgICAgICAgICk7XG4gXG4gICAgIGNvbnN0IHRtcEZhZGVPdXQ6IG51bWJlciA9XG4gICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHMgPD0gMC4wIHx8IG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIDwgMC4wXG4gICAgICAgICA/IDEuMFxuICAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAgKG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIC0gdXNlclRpbWVTZWNvbmRzKSAvXG4gICAgICAgICAgICAgICB0aGlzLl9mYWRlT3V0U2Vjb25kc1xuICAgICAgICAgICApO1xuICAgICBsZXQgdmFsdWU6IG51bWJlcjtcbiAgICAgbGV0IGM6IG51bWJlciwgcGFyYW1ldGVySW5kZXg6IG51bWJlcjtcbiBcbiAgICAgLy8gJ1JlcGVhdCcgdGltZSBhcyBuZWNlc3NhcnkuXG4gICAgIGxldCB0aW1lOiBudW1iZXIgPSB0aW1lT2Zmc2V0U2Vjb25kcztcbiBcbiAgICAgaWYgKHRoaXMuX2lzTG9vcCkge1xuICAgICAgIHdoaWxlICh0aW1lID4gdGhpcy5fbW90aW9uRGF0YS5kdXJhdGlvbikge1xuICAgICAgICAgdGltZSAtPSB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uO1xuICAgICAgIH1cbiAgICAgfVxuIFxuICAgICBjb25zdCBjdXJ2ZXM6IGNzbVZlY3RvcjxDdWJpc21Nb3Rpb25DdXJ2ZT4gPSB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcztcbiBcbiAgICAgLy8gRXZhbHVhdGUgbW9kZWwgY3VydmVzLlxuICAgICBmb3IgKFxuICAgICAgIGMgPSAwO1xuICAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgICBjdXJ2ZXMuYXQoYykudHlwZSA9PVxuICAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfTW9kZWw7XG4gICAgICAgKytjXG4gICAgICkge1xuICAgICAgIC8vIEV2YWx1YXRlIGN1cnZlIGFuZCBjYWxsIGhhbmRsZXIuXG4gICAgICAgdmFsdWUgPSBldmFsdWF0ZUN1cnZlKHRoaXMuX21vdGlvbkRhdGEsIGMsIHRpbWUpO1xuIFxuICAgICAgIGlmIChjdXJ2ZXMuYXQoYykuaWQgPT0gdGhpcy5fbW9kZWxDdXJ2ZUlkRXllQmxpbmspIHtcbiAgICAgICAgIGV5ZUJsaW5rVmFsdWUgPSB2YWx1ZTtcbiAgICAgICB9IGVsc2UgaWYgKGN1cnZlcy5hdChjKS5pZCA9PSB0aGlzLl9tb2RlbEN1cnZlSWRMaXBTeW5jKSB7XG4gICAgICAgICBsaXBTeW5jVmFsdWUgPSB2YWx1ZTtcbiAgICAgICB9XG4gICAgIH1cbiBcbiAgICAgbGV0IHBhcmFtZXRlck1vdGlvbkN1cnZlQ291bnQgPSAwO1xuIFxuICAgICBmb3IgKFxuICAgICAgIDtcbiAgICAgICBjIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ICYmXG4gICAgICAgY3VydmVzLmF0KGMpLnR5cGUgPT1cbiAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcmFtZXRlcjtcbiAgICAgICArK2NcbiAgICAgKSB7XG4gICAgICAgcGFyYW1ldGVyTW90aW9uQ3VydmVDb3VudCsrO1xuIFxuICAgICAgIC8vIEZpbmQgcGFyYW1ldGVyIGluZGV4LlxuICAgICAgIHBhcmFtZXRlckluZGV4ID0gbW9kZWwuZ2V0UGFyYW1ldGVySW5kZXgoY3VydmVzLmF0KGMpLmlkKTtcbiBcbiAgICAgICAvLyBTa2lwIGN1cnZlIGV2YWx1YXRpb24gaWYgbm8gdmFsdWUgaW4gc2luay5cbiAgICAgICBpZiAocGFyYW1ldGVySW5kZXggPT0gLTEpIHtcbiAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgIH1cbiBcbiAgICAgICBjb25zdCBzb3VyY2VWYWx1ZTogbnVtYmVyID0gbW9kZWwuZ2V0UGFyYW1ldGVyVmFsdWVCeUluZGV4KFxuICAgICAgICAgcGFyYW1ldGVySW5kZXhcbiAgICAgICApO1xuIFxuICAgICAgIC8vIEV2YWx1YXRlIGN1cnZlIGFuZCBhcHBseSB2YWx1ZS5cbiAgICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG4gXG4gICAgICAgaWYgKGV5ZUJsaW5rVmFsdWUgIT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICAgZm9yIChcbiAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICBpIDwgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpICYmIGkgPCBNYXhUYXJnZXRTaXplO1xuICAgICAgICAgICArK2lcbiAgICAgICAgICkge1xuICAgICAgICAgICBpZiAodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuYXQoaSkgPT0gY3VydmVzLmF0KGMpLmlkKSB7XG4gICAgICAgICAgICAgdmFsdWUgKj0gZXllQmxpbmtWYWx1ZTtcbiAgICAgICAgICAgICBleWVCbGlua0ZsYWdzIHw9IDEgPDwgaTtcbiAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgIH1cbiBcbiAgICAgICBpZiAobGlwU3luY1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgIGZvciAoXG4gICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgaSA8IHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpICYmIGkgPCBNYXhUYXJnZXRTaXplO1xuICAgICAgICAgICArK2lcbiAgICAgICAgICkge1xuICAgICAgICAgICBpZiAodGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5hdChpKSA9PSBjdXJ2ZXMuYXQoYykuaWQpIHtcbiAgICAgICAgICAgICB2YWx1ZSArPSBsaXBTeW5jVmFsdWU7XG4gICAgICAgICAgICAgbGlwU3luY0ZsYWdzIHw9IDEgPDwgaTtcbiAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgIH1cbiBcbiAgICAgICBsZXQgdjogbnVtYmVyO1xuIFxuICAgICAgIC8vIOODkeODqeODoeODvOOCv+OBlOOBqOOBruODleOCp+ODvOODiVxuICAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA8IDAuMCAmJiBjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWUgPCAwLjApIHtcbiAgICAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruODleOCp+ODvOODieOCkumBqeeUqFxuICAgICAgICAgdiA9IHNvdXJjZVZhbHVlICsgKHZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8g44OR44Op44Oh44O844K/44Gr5a++44GX44Gm44OV44Kn44O844OJ44Kk44Oz44GL44OV44Kn44O844OJ44Ki44Km44OI44GM6Kit5a6a44GX44Gm44GC44KL5aC05ZCI44Gv44Gd44Gh44KJ44KS6YGp55SoXG4gICAgICAgICBsZXQgZmluOiBudW1iZXI7XG4gICAgICAgICBsZXQgZm91dDogbnVtYmVyO1xuIFxuICAgICAgICAgaWYgKGN1cnZlcy5hdChjKS5mYWRlSW5UaW1lIDwgMC4wKSB7XG4gICAgICAgICAgIGZpbiA9IHRtcEZhZGVJbjtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIGZpbiA9XG4gICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVJblRpbWUgPT0gMC4wXG4gICAgICAgICAgICAgICA/IDEuMFxuICAgICAgICAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAgICAgICAgKHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0RmFkZUluU3RhcnRUaW1lKCkpIC9cbiAgICAgICAgICAgICAgICAgICAgIGN1cnZlcy5hdChjKS5mYWRlSW5UaW1lXG4gICAgICAgICAgICAgICAgICk7XG4gICAgICAgICB9XG4gXG4gICAgICAgICBpZiAoY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lIDwgMC4wKSB7XG4gICAgICAgICAgIGZvdXQgPSB0bXBGYWRlT3V0O1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgZm91dCA9XG4gICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lID09IDAuMCB8fFxuICAgICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIDwgMC4wXG4gICAgICAgICAgICAgICA/IDEuMFxuICAgICAgICAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAgICAgICAgKG1vdGlvblF1ZXVlRW50cnkuZ2V0RW5kVGltZSgpIC0gdXNlclRpbWVTZWNvbmRzKSAvXG4gICAgICAgICAgICAgICAgICAgICBjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWVcbiAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgIH1cbiBcbiAgICAgICAgIGNvbnN0IHBhcmFtV2VpZ2h0OiBudW1iZXIgPSB0aGlzLl93ZWlnaHQgKiBmaW4gKiBmb3V0O1xuIFxuICAgICAgICAgLy8g44OR44Op44Oh44O844K/44GU44Go44Gu44OV44Kn44O844OJ44KS6YGp55SoXG4gICAgICAgICB2ID0gc291cmNlVmFsdWUgKyAodmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBwYXJhbVdlaWdodDtcbiAgICAgICB9XG4gXG4gICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUluZGV4KHBhcmFtZXRlckluZGV4LCB2LCAxLjApO1xuICAgICB9XG4gXG4gICAgIHtcbiAgICAgICBpZiAoZXllQmxpbmtWYWx1ZSAhPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICBmb3IgKFxuICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgIGkgPCB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5nZXRTaXplKCkgJiYgaSA8IE1heFRhcmdldFNpemU7XG4gICAgICAgICAgICsraVxuICAgICAgICAgKSB7XG4gICAgICAgICAgIGNvbnN0IHNvdXJjZVZhbHVlOiBudW1iZXIgPSBtb2RlbC5nZXRQYXJhbWV0ZXJWYWx1ZUJ5SWQoXG4gICAgICAgICAgICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuYXQoaSlcbiAgICAgICAgICAgKTtcbiBcbiAgICAgICAgICAgLy8g44Oi44O844K344On44Oz44Gn44Gu5LiK5pu444GN44GM44GC44Gj44Gf5pmC44Gr44Gv44G+44Gw44Gf44GN44Gv6YGp55So44GX44Gq44GEXG4gICAgICAgICAgIGlmICgoZXllQmxpbmtGbGFncyA+PiBpKSAmIDB4MDEpIHtcbiAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgfVxuIFxuICAgICAgICAgICBjb25zdCB2OiBudW1iZXIgPVxuICAgICAgICAgICAgIHNvdXJjZVZhbHVlICsgKGV5ZUJsaW5rVmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBmYWRlV2VpZ2h0O1xuIFxuICAgICAgICAgICBtb2RlbC5zZXRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuYXQoaSksIHYpO1xuICAgICAgICAgfVxuICAgICAgIH1cbiBcbiAgICAgICBpZiAobGlwU3luY1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgIGZvciAoXG4gICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgaSA8IHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpICYmIGkgPCBNYXhUYXJnZXRTaXplO1xuICAgICAgICAgICArK2lcbiAgICAgICAgICkge1xuICAgICAgICAgICBjb25zdCBzb3VyY2VWYWx1ZTogbnVtYmVyID0gbW9kZWwuZ2V0UGFyYW1ldGVyVmFsdWVCeUlkKFxuICAgICAgICAgICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuYXQoaSlcbiAgICAgICAgICAgKTtcbiBcbiAgICAgICAgICAgLy8g44Oi44O844K344On44Oz44Gn44Gu5LiK5pu444GN44GM44GC44Gj44Gf5pmC44Gr44Gv44Oq44OD44OX44K344Oz44Kv44Gv6YGp55So44GX44Gq44GEXG4gICAgICAgICAgIGlmICgobGlwU3luY0ZsYWdzID4+IGkpICYgMHgwMSkge1xuICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICB9XG4gXG4gICAgICAgICAgIGNvbnN0IHY6IG51bWJlciA9XG4gICAgICAgICAgICAgc291cmNlVmFsdWUgKyAobGlwU3luY1ZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcbiBcbiAgICAgICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuYXQoaSksIHYpO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuIFxuICAgICBmb3IgKFxuICAgICAgIDtcbiAgICAgICBjIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ICYmXG4gICAgICAgY3VydmVzLmF0KGMpLnR5cGUgPT1cbiAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcnRPcGFjaXR5O1xuICAgICAgICsrY1xuICAgICApIHtcbiAgICAgICAvLyBGaW5kIHBhcmFtZXRlciBpbmRleC5cbiAgICAgICBwYXJhbWV0ZXJJbmRleCA9IG1vZGVsLmdldFBhcmFtZXRlckluZGV4KGN1cnZlcy5hdChjKS5pZCk7XG4gXG4gICAgICAgLy8gU2tpcCBjdXJ2ZSBldmFsdWF0aW9uIGlmIG5vIHZhbHVlIGluIHNpbmsuXG4gICAgICAgaWYgKHBhcmFtZXRlckluZGV4ID09IC0xKSB7XG4gICAgICAgICBjb250aW51ZTtcbiAgICAgICB9XG4gXG4gICAgICAgLy8gRXZhbHVhdGUgY3VydmUgYW5kIGFwcGx5IHZhbHVlLlxuICAgICAgIHZhbHVlID0gZXZhbHVhdGVDdXJ2ZSh0aGlzLl9tb3Rpb25EYXRhLCBjLCB0aW1lKTtcbiBcbiAgICAgICBtb2RlbC5zZXRQYXJhbWV0ZXJWYWx1ZUJ5SW5kZXgocGFyYW1ldGVySW5kZXgsIHZhbHVlKTtcbiAgICAgfVxuIFxuICAgICBpZiAodGltZU9mZnNldFNlY29uZHMgPj0gdGhpcy5fbW90aW9uRGF0YS5kdXJhdGlvbikge1xuICAgICAgIGlmICh0aGlzLl9pc0xvb3ApIHtcbiAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkuc2V0U3RhcnRUaW1lKHVzZXJUaW1lU2Vjb25kcyk7IC8vIOacgOWIneOBrueKtuaFi+OBuFxuICAgICAgICAgaWYgKHRoaXMuX2lzTG9vcEZhZGVJbikge1xuICAgICAgICAgICAvLyDjg6vjg7zjg5flhoXjgafjg6vjg7zjg5fnlKjjg5Xjgqfjg7zjg4njgqTjg7PjgYzmnInlirnjga7mmYLjga/jgIHjg5Xjgqfjg7zjg4njgqTjg7PoqK3lrprjgZfnm7TjgZdcbiAgICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRGYWRlSW5TdGFydFRpbWUodXNlclRpbWVTZWNvbmRzKTtcbiAgICAgICAgIH1cbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgaWYgKHRoaXMuX29uRmluaXNoZWRNb3Rpb24pIHtcbiAgICAgICAgICAgdGhpcy5fb25GaW5pc2hlZE1vdGlvbih0aGlzKTtcbiAgICAgICAgIH1cbiBcbiAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkuc2V0SXNGaW5pc2hlZCh0cnVlKTtcbiAgICAgICB9XG4gICAgIH1cbiAgICAgdGhpcy5fbGFzdFdlaWdodCA9IGZhZGVXZWlnaHQ7XG4gICB9XG4gXG4gICAvKipcbiAgICAqIOODq+ODvOODl+aDheWgseOBruioreWumlxuICAgICogQHBhcmFtIGxvb3Ag44Or44O844OX5oOF5aCxXG4gICAgKi9cbiAgIHB1YmxpYyBzZXRJc0xvb3AobG9vcDogYm9vbGVhbik6IHZvaWQge1xuICAgICB0aGlzLl9pc0xvb3AgPSBsb29wO1xuICAgfVxuIFxuICAgLyoqXG4gICAgKiDjg6vjg7zjg5fmg4XloLHjga7lj5blvpdcbiAgICAqIEByZXR1cm4gdHJ1ZSDjg6vjg7zjg5fjgZnjgotcbiAgICAqIEByZXR1cm4gZmFsc2Ug44Or44O844OX44GX44Gq44GEXG4gICAgKi9cbiAgIHB1YmxpYyBpc0xvb3AoKTogYm9vbGVhbiB7XG4gICAgIHJldHVybiB0aGlzLl9pc0xvb3A7XG4gICB9XG4gXG4gICAvKipcbiAgICAqIOODq+ODvOODl+aZguOBruODleOCp+ODvOODieOCpOODs+aDheWgseOBruioreWumlxuICAgICogQHBhcmFtIGxvb3BGYWRlSW4gIOODq+ODvOODl+aZguOBruODleOCp+ODvOODieOCpOODs+aDheWgsVxuICAgICovXG4gICBwdWJsaWMgc2V0SXNMb29wRmFkZUluKGxvb3BGYWRlSW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgdGhpcy5faXNMb29wRmFkZUluID0gbG9vcEZhZGVJbjtcbiAgIH1cbiBcbiAgIC8qKlxuICAgICog44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCx44Gu5Y+W5b6XXG4gICAgKlxuICAgICogQHJldHVybiAgdHJ1ZSAgICDjgZnjgotcbiAgICAqIEByZXR1cm4gIGZhbHNlICAg44GX44Gq44GEXG4gICAgKi9cbiAgIHB1YmxpYyBpc0xvb3BGYWRlSW4oKTogYm9vbGVhbiB7XG4gICAgIHJldHVybiB0aGlzLl9pc0xvb3BGYWRlSW47XG4gICB9XG4gXG4gICAvKipcbiAgICAqIOODouODvOOCt+ODp+ODs+OBrumVt+OBleOCkuWPluW+l+OBmeOCi+OAglxuICAgICpcbiAgICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBrumVt+OBlVvnp5JdXG4gICAgKi9cbiAgIHB1YmxpYyBnZXREdXJhdGlvbigpOiBudW1iZXIge1xuICAgICByZXR1cm4gdGhpcy5faXNMb29wID8gLTEuMCA6IHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gICB9XG4gXG4gICAvKipcbiAgICAqIOODouODvOOCt+ODp+ODs+OBruODq+ODvOODl+aZguOBrumVt+OBleOCkuWPluW+l+OBmeOCi+OAglxuICAgICpcbiAgICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBruODq+ODvOODl+aZguOBrumVt+OBlVvnp5JdXG4gICAgKi9cbiAgIHB1YmxpYyBnZXRMb29wRHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICAgcmV0dXJuIHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gICB9XG4gXG4gICAvKipcbiAgICAqIOODkeODqeODoeODvOOCv+OBq+WvvuOBmeOCi+ODleOCp+ODvOODieOCpOODs+OBruaZgumWk+OCkuioreWumuOBmeOCi+OAglxuICAgICpcbiAgICAqIEBwYXJhbSBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICAqIEBwYXJhbSB2YWx1ZSAgICAgICAgICAg44OV44Kn44O844OJ44Kk44Oz44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICAqL1xuICAgcHVibGljIHNldFBhcmFtZXRlckZhZGVJblRpbWUoXG4gICAgIHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSxcbiAgICAgdmFsdWU6IG51bWJlclxuICAgKTogdm9pZCB7XG4gICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuIFxuICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICAgY3VydmVzLmF0KGkpLmZhZGVJblRpbWUgPSB2YWx1ZTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgIH1cbiAgIH1cbiBcbiAgIC8qKlxuICAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44Gu6Kit5a6aXG4gICAgKiBAcGFyYW0gcGFyYW1ldGVySWQgICAgIOODkeODqeODoeODvOOCv0lEXG4gICAgKiBAcGFyYW0gdmFsdWUgICAgICAgICAgIOODleOCp+ODvOODieOCouOCpuODiOOBq+OBi+OBi+OCi+aZgumWk1vnp5JdXG4gICAgKi9cbiAgIHB1YmxpYyBzZXRQYXJhbWV0ZXJGYWRlT3V0VGltZShcbiAgICAgcGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlLFxuICAgICB2YWx1ZTogbnVtYmVyXG4gICApOiB2b2lkIHtcbiAgICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG4gXG4gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50OyArK2kpIHtcbiAgICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgICBjdXJ2ZXMuYXQoaSkuZmFkZU91dFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgIH1cbiAgIH1cbiBcbiAgIC8qKlxuICAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Kk44Oz44Gu5pmC6ZaT44Gu5Y+W5b6XXG4gICAgKiBAcGFyYW0gICAgcGFyYW1ldGVySWQgICAgIOODkeODqeODoeODvOOCv0lEXG4gICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Kk44Oz44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICAqL1xuICAgcHVibGljIGdldFBhcmFtZXRlckZhZGVJblRpbWUocGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlKTogbnVtYmVyIHtcbiAgICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG4gXG4gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50OyArK2kpIHtcbiAgICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgICByZXR1cm4gY3VydmVzLmF0KGkpLmZhZGVJblRpbWU7XG4gICAgICAgfVxuICAgICB9XG4gXG4gICAgIHJldHVybiAtMTtcbiAgIH1cbiBcbiAgIC8qKlxuICAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44KS5Y+W5b6XXG4gICAgKlxuICAgICogQHBhcmFtICAgcGFyYW1ldGVySWQgICAgIOODkeODqeODoeODvOOCv0lEXG4gICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Ki44Km44OI44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICAqL1xuICAgcHVibGljIGdldFBhcmFtZXRlckZhZGVPdXRUaW1lKHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSk6IG51bWJlciB7XG4gICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuIFxuICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICAgcmV0dXJuIGN1cnZlcy5hdChpKS5mYWRlT3V0VGltZTtcbiAgICAgICB9XG4gICAgIH1cbiBcbiAgICAgcmV0dXJuIC0xO1xuICAgfVxuIFxuICAgLyoqXG4gICAgKiDoh6rli5Xjgqjjg5Xjgqfjgq/jg4jjgYzjgYvjgYvjgaPjgabjgYTjgovjg5Hjg6njg6Hjg7zjgr9JROODquOCueODiOOBruioreWumlxuICAgICogQHBhcmFtIGV5ZUJsaW5rUGFyYW1ldGVySWRzICAgIOiHquWLleOBvuOBsOOBn+OBjeOBjOOBi+OBi+OBo+OBpuOBhOOCi+ODkeODqeODoeODvOOCv0lE44Gu44Oq44K544OIXG4gICAgKiBAcGFyYW0gbGlwU3luY1BhcmFtZXRlcklkcyAgICAg44Oq44OD44OX44K344Oz44Kv44GM44GL44GL44Gj44Gm44GE44KL44OR44Op44Oh44O844K/SUTjga7jg6rjgrnjg4hcbiAgICAqL1xuICAgcHVibGljIHNldEVmZmVjdElkcyhcbiAgICAgZXllQmxpbmtQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT4sXG4gICAgIGxpcFN5bmNQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT5cbiAgICk6IHZvaWQge1xuICAgICB0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcyA9IGV5ZUJsaW5rUGFyYW1ldGVySWRzO1xuICAgICB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzID0gbGlwU3luY1BhcmFtZXRlcklkcztcbiAgIH1cbiBcbiAgIC8qKlxuICAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAgKi9cbiAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgc3VwZXIoKTtcbiAgICAgdGhpcy5fc291cmNlRnJhbWVSYXRlID0gMzAuMDtcbiAgICAgdGhpcy5fbG9vcER1cmF0aW9uU2Vjb25kcyA9IC0xLjA7XG4gICAgIHRoaXMuX2lzTG9vcCA9IGZhbHNlOyAvLyB0cnVl44GL44KJIGZhbHNlIOOBuOODh+ODleOCqeODq+ODiOOCkuWkieabtFxuICAgICB0aGlzLl9pc0xvb3BGYWRlSW4gPSB0cnVlOyAvLyDjg6vjg7zjg5fmmYLjgavjg5Xjgqfjg7zjg4njgqTjg7PjgYzmnInlirnjgYvjganjgYbjgYvjga7jg5Xjg6njgrBcbiAgICAgdGhpcy5fbGFzdFdlaWdodCA9IDAuMDtcbiAgICAgdGhpcy5fbW90aW9uRGF0YSA9IG51bGw7XG4gICAgIHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rID0gbnVsbDtcbiAgICAgdGhpcy5fbW9kZWxDdXJ2ZUlkTGlwU3luYyA9IG51bGw7XG4gICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzID0gbnVsbDtcbiAgICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcyA9IG51bGw7XG4gICB9XG4gXG4gICAvKipcbiAgICAqIOODh+OCueODiOODqeOCr+OCv+ebuOW9k+OBruWHpueQhlxuICAgICovXG4gICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICAgdGhpcy5fbW90aW9uRGF0YSA9IHZvaWQgMDtcbiAgICAgdGhpcy5fbW90aW9uRGF0YSA9IG51bGw7XG4gICB9XG4gXG4gICAvKipcbiAgICAqIG1vdGlvbjMuanNvbuOCkuODkeODvOOCueOBmeOCi+OAglxuICAgICpcbiAgICAqIEBwYXJhbSBtb3Rpb25Kc29uICBtb3Rpb24zLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICAqIEBwYXJhbSBzaXplICAgICAgICDjg5Djg4Pjg5XjgqHjga7jgrXjgqTjgrpcbiAgICAqL1xuICAgcHVibGljIHBhcnNlKG1vdGlvbkpzb246IEFycmF5QnVmZmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgdGhpcy5fbW90aW9uRGF0YSA9IG5ldyBDdWJpc21Nb3Rpb25EYXRhKCk7XG4gXG4gICAgIGxldCBqc29uOiBDdWJpc21Nb3Rpb25Kc29uID0gbmV3IEN1YmlzbU1vdGlvbkpzb24obW90aW9uSnNvbiwgc2l6ZSk7XG4gXG4gICAgIHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24gPSBqc29uLmdldE1vdGlvbkR1cmF0aW9uKCk7XG4gICAgIHRoaXMuX21vdGlvbkRhdGEubG9vcCA9IGpzb24uaXNNb3Rpb25Mb29wKCk7XG4gICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudCA9IGpzb24uZ2V0TW90aW9uQ3VydmVDb3VudCgpO1xuICAgICB0aGlzLl9tb3Rpb25EYXRhLmZwcyA9IGpzb24uZ2V0TW90aW9uRnBzKCk7XG4gICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudCA9IGpzb24uZ2V0RXZlbnRDb3VudCgpO1xuIFxuICAgICBjb25zdCBhcmVCZXppZXJzUmVzdHJ1Y3RlZDogYm9vbGVhbiA9IGpzb24uZ2V0RXZhbHVhdGlvbk9wdGlvbkZsYWcoXG4gICAgICAgRXZhbHVhdGlvbk9wdGlvbkZsYWcuRXZhbHVhdGlvbk9wdGlvbkZsYWdfQXJlQmV6aWVyc1Jpc3RyaWN0ZWRcbiAgICAgKTtcbiBcbiAgICAgaWYgKGpzb24uaXNFeGlzdE1vdGlvbkZhZGVJblRpbWUoKSkge1xuICAgICAgIHRoaXMuX2ZhZGVJblNlY29uZHMgPVxuICAgICAgICAganNvbi5nZXRNb3Rpb25GYWRlSW5UaW1lKCkgPCAwLjAgPyAxLjAgOiBqc29uLmdldE1vdGlvbkZhZGVJblRpbWUoKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzID0gMS4wO1xuICAgICB9XG4gXG4gICAgIGlmIChqc29uLmlzRXhpc3RNb3Rpb25GYWRlT3V0VGltZSgpKSB7XG4gICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHMgPVxuICAgICAgICAganNvbi5nZXRNb3Rpb25GYWRlT3V0VGltZSgpIDwgMC4wID8gMS4wIDoganNvbi5nZXRNb3Rpb25GYWRlT3V0VGltZSgpO1xuICAgICB9IGVsc2Uge1xuICAgICAgIHRoaXMuX2ZhZGVPdXRTZWNvbmRzID0gMS4wO1xuICAgICB9XG4gXG4gICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLnVwZGF0ZVNpemUoXG4gICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50LFxuICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlLFxuICAgICAgIHRydWVcbiAgICAgKTtcbiAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy51cGRhdGVTaXplKFxuICAgICAgIGpzb24uZ2V0TW90aW9uVG90YWxTZWdtZW50Q291bnQoKSxcbiAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50LFxuICAgICAgIHRydWVcbiAgICAgKTtcbiAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMudXBkYXRlU2l6ZShcbiAgICAgICBqc29uLmdldE1vdGlvblRvdGFsUG9pbnRDb3VudCgpLFxuICAgICAgIEN1YmlzbU1vdGlvblBvaW50LFxuICAgICAgIHRydWVcbiAgICAgKTtcbiAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMudXBkYXRlU2l6ZShcbiAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50Q291bnQsXG4gICAgICAgQ3ViaXNtTW90aW9uRXZlbnQsXG4gICAgICAgdHJ1ZVxuICAgICApO1xuIFxuICAgICBsZXQgdG90YWxQb2ludENvdW50ID0gMDtcbiAgICAgbGV0IHRvdGFsU2VnbWVudENvdW50ID0gMDtcbiBcbiAgICAgLy8gQ3VydmVzXG4gICAgIGZvciAoXG4gICAgICAgbGV0IGN1cnZlQ291bnQgPSAwO1xuICAgICAgIGN1cnZlQ291bnQgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7XG4gICAgICAgKytjdXJ2ZUNvdW50XG4gICAgICkge1xuICAgICAgIGlmIChqc29uLmdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlQ291bnQpID09IFRhcmdldE5hbWVNb2RlbCkge1xuICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkudHlwZSA9XG4gICAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X01vZGVsO1xuICAgICAgIH0gZWxzZSBpZiAoanNvbi5nZXRNb3Rpb25DdXJ2ZVRhcmdldChjdXJ2ZUNvdW50KSA9PSBUYXJnZXROYW1lUGFyYW1ldGVyKSB7XG4gICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS50eXBlID1cbiAgICAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfUGFyYW1ldGVyO1xuICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICBqc29uLmdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlQ291bnQpID09IFRhcmdldE5hbWVQYXJ0T3BhY2l0eVxuICAgICAgICkge1xuICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkudHlwZSA9XG4gICAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcnRPcGFjaXR5O1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICBDdWJpc21Mb2dXYXJuaW5nKFxuICAgICAgICAgICAnV2FybmluZyA6IFVuYWJsZSB0byBnZXQgc2VnbWVudCB0eXBlIGZyb20gQ3VydmUhIFRoZSBudW1iZXIgb2YgXCJDdXJ2ZUNvdW50XCIgbWF5IGJlIGluY29ycmVjdCEnXG4gICAgICAgICApO1xuICAgICAgIH1cbiBcbiAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS5pZCA9IGpzb24uZ2V0TW90aW9uQ3VydmVJZChcbiAgICAgICAgIGN1cnZlQ291bnRcbiAgICAgICApO1xuIFxuICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICAgY3VydmVDb3VudFxuICAgICAgICkuYmFzZVNlZ21lbnRJbmRleCA9IHRvdGFsU2VnbWVudENvdW50O1xuIFxuICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICAgY3VydmVDb3VudFxuICAgICAgICkuZmFkZUluVGltZSA9IGpzb24uaXNFeGlzdE1vdGlvbkN1cnZlRmFkZUluVGltZShjdXJ2ZUNvdW50KVxuICAgICAgICAgPyBqc29uLmdldE1vdGlvbkN1cnZlRmFkZUluVGltZShjdXJ2ZUNvdW50KVxuICAgICAgICAgOiAtMS4wO1xuICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICAgY3VydmVDb3VudFxuICAgICAgICkuZmFkZU91dFRpbWUgPSBqc29uLmlzRXhpc3RNb3Rpb25DdXJ2ZUZhZGVPdXRUaW1lKGN1cnZlQ291bnQpXG4gICAgICAgICA/IGpzb24uZ2V0TW90aW9uQ3VydmVGYWRlT3V0VGltZShjdXJ2ZUNvdW50KVxuICAgICAgICAgOiAtMS4wO1xuIFxuICAgICAgIC8vIFNlZ21lbnRzXG4gICAgICAgZm9yIChcbiAgICAgICAgIGxldCBzZWdtZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgc2VnbWVudFBvc2l0aW9uIDwganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnRDb3VudChjdXJ2ZUNvdW50KTtcbiBcbiAgICAgICApIHtcbiAgICAgICAgIGlmIChzZWdtZW50UG9zaXRpb24gPT0gMCkge1xuICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkpIHtcbiAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICApLmJhc2VQb2ludEluZGV4ID0gdG90YWxQb2ludENvdW50O1xuICAgICAgICAgICB9XG4gXG4gICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChjdXJ2ZUNvdW50LCBzZWdtZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KGN1cnZlQ291bnQsIHNlZ21lbnRQb3NpdGlvbiArIDEpO1xuICAgICAgICAgICB9XG4gXG4gICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMjtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLmJhc2VQb2ludEluZGV4ID1cbiAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgLSAxO1xuICAgICAgICAgfVxuIFxuICAgICAgICAgY29uc3Qgc2VnbWVudDogbnVtYmVyID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgIHNlZ21lbnRQb3NpdGlvblxuICAgICAgICAgKTtcbiAgICAgICAgIHN3aXRjaCAoc2VnbWVudCkge1xuICAgICAgICAgICBjYXNlIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0xpbmVhcjoge1xuICAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KSkge1xuICAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9MaW5lYXI7XG4gICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGxpbmVhckV2YWx1YXRlO1xuICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAzO1xuIFxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyOiB7XG4gICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyO1xuIFxuICAgICAgICAgICAgIGlmIChhcmVCZXppZXJzUmVzdHJ1Y3RlZCB8fCBVc2VPbGRCZXppZXJzQ3VydmVNb3Rpb24pIHtcbiAgICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgICApLmV2YWx1YXRlID0gYmV6aWVyRXZhbHVhdGU7XG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgICApLmV2YWx1YXRlID0gYmV6aWVyRXZhbHVhdGVDYXJkYW5vSW50ZXJwcmV0YXRpb247XG4gICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMVxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgMlxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCArIDEpKSB7XG4gICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMVxuICAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDNcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICsgMVxuICAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyA0XG4gICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50ICsgMikpIHtcbiAgICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAyXG4gICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgNVxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAyXG4gICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDZcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAzO1xuICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSA3O1xuIFxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICB9XG4gXG4gICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfU3RlcHBlZDoge1xuICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX1N0ZXBwZWQ7XG4gICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IHN0ZXBwZWRFdmFsdWF0ZTtcbiBcbiAgICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAzO1xuIFxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICB9XG4gXG4gICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfSW52ZXJzZVN0ZXBwZWQ6IHtcbiAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5zZWdtZW50VHlwZSA9XG4gICAgICAgICAgICAgICBDdWJpc21Nb3Rpb25TZWdtZW50VHlwZS5DdWJpc21Nb3Rpb25TZWdtZW50VHlwZV9JbnZlcnNlU3RlcHBlZDtcbiAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICApLmV2YWx1YXRlID0gaW52ZXJzZVN0ZXBwZWRFdmFsdWF0ZTtcbiBcbiAgICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSAzO1xuIFxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICBDU01fQVNTRVJUKDApO1xuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICB9XG4gICAgICAgICB9XG4gXG4gICAgICAgICArK3RoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnNlZ21lbnRDb3VudDtcbiAgICAgICAgICsrdG90YWxTZWdtZW50Q291bnQ7XG4gICAgICAgfVxuICAgICB9XG4gXG4gICAgIGZvciAoXG4gICAgICAgbGV0IHVzZXJkYXRhY291bnQgPSAwO1xuICAgICAgIHVzZXJkYXRhY291bnQgPCBqc29uLmdldEV2ZW50Q291bnQoKTtcbiAgICAgICArK3VzZXJkYXRhY291bnRcbiAgICAgKSB7XG4gICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodXNlcmRhdGFjb3VudCkuZmlyZVRpbWUgPSBqc29uLmdldEV2ZW50VGltZShcbiAgICAgICAgIHVzZXJkYXRhY291bnRcbiAgICAgICApO1xuICAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHVzZXJkYXRhY291bnQpLnZhbHVlID0ganNvbi5nZXRFdmVudFZhbHVlKFxuICAgICAgICAgdXNlcmRhdGFjb3VudFxuICAgICAgICk7XG4gICAgIH1cbiBcbiAgICAganNvbi5yZWxlYXNlKCk7XG4gICAgIGpzb24gPSB2b2lkIDA7XG4gICAgIGpzb24gPSBudWxsO1xuICAgfVxuIFxuICAgLyoqXG4gICAgKiDjg6Ljg4fjg6vjga7jg5Hjg6njg6Hjg7zjgr/mm7TmlrBcbiAgICAqXG4gICAgKiDjgqTjg5njg7Pjg4jnmbrngavjga7jg4Hjgqfjg4Pjgq/jgIJcbiAgICAqIOWFpeWKm+OBmeOCi+aZgumWk+OBr+WRvOOBsOOCjOOCi+ODouODvOOCt+ODp+ODs+OCv+OCpOODn+ODs+OCsOOCku+8kOOBqOOBl+OBn+enkuaVsOOBp+ihjOOBhuOAglxuICAgICpcbiAgICAqIEBwYXJhbSBiZWZvcmVDaGVja1RpbWVTZWNvbmRzICAg5YmN5Zue44Gu44Kk44OZ44Oz44OI44OB44Kn44OD44Kv5pmC6ZaTW+enkl1cbiAgICAqIEBwYXJhbSBtb3Rpb25UaW1lU2Vjb25kcyAgICAgICAg5LuK5Zue44Gu5YaN55Sf5pmC6ZaTW+enkl1cbiAgICAqL1xuICAgcHVibGljIGdldEZpcmVkRXZlbnQoXG4gICAgIGJlZm9yZUNoZWNrVGltZVNlY29uZHM6IG51bWJlcixcbiAgICAgbW90aW9uVGltZVNlY29uZHM6IG51bWJlclxuICAgKTogY3NtVmVjdG9yPGNzbVN0cmluZz4ge1xuICAgICB0aGlzLl9maXJlZEV2ZW50VmFsdWVzLnVwZGF0ZVNpemUoMCk7XG4gXG4gICAgIC8vIOOCpOODmeODs+ODiOOBrueZuueBq+ODgeOCp+ODg+OCr1xuICAgICBmb3IgKGxldCB1ID0gMDsgdSA8IHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudDsgKyt1KSB7XG4gICAgICAgaWYgKFxuICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodSkuZmlyZVRpbWUgPiBiZWZvcmVDaGVja1RpbWVTZWNvbmRzICYmXG4gICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS5maXJlVGltZSA8PSBtb3Rpb25UaW1lU2Vjb25kc1xuICAgICAgICkge1xuICAgICAgICAgdGhpcy5fZmlyZWRFdmVudFZhbHVlcy5wdXNoQmFjayhcbiAgICAgICAgICAgbmV3IGNzbVN0cmluZyh0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS52YWx1ZS5zKVxuICAgICAgICAgKTtcbiAgICAgICB9XG4gICAgIH1cbiBcbiAgICAgcmV0dXJuIHRoaXMuX2ZpcmVkRXZlbnRWYWx1ZXM7XG4gICB9XG4gXG4gICBwdWJsaWMgX3NvdXJjZUZyYW1lUmF0ZTogbnVtYmVyOyAvLyDjg63jg7zjg4njgZfjgZ/jg5XjgqHjgqTjg6vjga5GUFPjgILoqJjov7DjgYznhKHjgZHjgozjgbDjg4fjg5Xjgqnjg6vjg4jlgKQxNWZwc+OBqOOBquOCi1xuICAgcHVibGljIF9sb29wRHVyYXRpb25TZWNvbmRzOiBudW1iZXI7IC8vIG10buODleOCoeOCpOODq+OBp+Wumue+qeOBleOCjOOCi+S4gOmAo+OBruODouODvOOCt+ODp+ODs+OBrumVt+OBlVxuICAgcHVibGljIF9pc0xvb3A6IGJvb2xlYW47IC8vIOODq+ODvOODl+OBmeOCi+OBiz9cbiAgIHB1YmxpYyBfaXNMb29wRmFkZUluOiBib29sZWFuOyAvLyDjg6vjg7zjg5fmmYLjgavjg5Xjgqfjg7zjg4njgqTjg7PjgYzmnInlirnjgYvjganjgYbjgYvjga7jg5Xjg6njgrDjgILliJ3mnJ/lgKTjgafjga/mnInlirnjgIJcbiAgIHB1YmxpYyBfbGFzdFdlaWdodDogbnVtYmVyOyAvLyDmnIDlvozjgavoqK3lrprjgZXjgozjgZ/ph43jgb9cbiBcbiAgIHB1YmxpYyBfbW90aW9uRGF0YTogQ3ViaXNtTW90aW9uRGF0YTsgLy8g5a6f6Zqb44Gu44Oi44O844K344On44Oz44OH44O844K/5pys5L2TXG4gXG4gICBwdWJsaWMgX2V5ZUJsaW5rUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDoh6rli5Xjgb7jgbDjgZ/jgY3jgpLpgannlKjjgZnjgovjg5Hjg6njg6Hjg7zjgr9JROODj+ODs+ODieODq+OBruODquOCueODiOOAgiAg44Oi44OH44Or77yI44Oi44OH44Or44K744OD44OG44Kj44Oz44Kw77yJ44Go44OR44Op44Oh44O844K/44KS5a++5b+c5LuY44GR44KL44CCXG4gICBwdWJsaWMgX2xpcFN5bmNQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOODquODg+ODl+OCt+ODs+OCr+OCkumBqeeUqOOBmeOCi+ODkeODqeODoeODvOOCv0lE44OP44Oz44OJ44Or44Gu44Oq44K544OI44CCICDjg6Ljg4fjg6vvvIjjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDvvInjgajjg5Hjg6njg6Hjg7zjgr/jgpLlr77lv5zku5jjgZHjgovjgIJcbiBcbiAgIHB1YmxpYyBfbW9kZWxDdXJ2ZUlkRXllQmxpbms6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg6Ljg4fjg6vjgYzmjIHjgaToh6rli5Xjgb7jgbDjgZ/jgY3nlKjjg5Hjg6njg6Hjg7zjgr9JROOBruODj+ODs+ODieODq+OAgiAg44Oi44OH44Or44Go44Oi44O844K344On44Oz44KS5a++5b+c5LuY44GR44KL44CCXG4gICBwdWJsaWMgX21vZGVsQ3VydmVJZExpcFN5bmM6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg6Ljg4fjg6vjgYzmjIHjgaTjg6rjg4Pjg5fjgrfjg7Pjgq/nlKjjg5Hjg6njg6Hjg7zjgr9JROOBruODj+ODs+ODieODq+OAgiAg44Oi44OH44Or44Go44Oi44O844K344On44Oz44KS5a++5b+c5LuY44GR44KL44CCXG4gfVxuIFxuIC8vIE5hbWVzcGFjZSBkZWZpbml0aW9uIGZvciBjb21wYXRpYmlsaXR5LlxuIGltcG9ydCAqIGFzICQgZnJvbSAnLi9jdWJpc21tb3Rpb24nO1xuIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG4gZXhwb3J0IG5hbWVzcGFjZSBMaXZlMkRDdWJpc21GcmFtZXdvcmsge1xuICAgZXhwb3J0IGNvbnN0IEN1YmlzbU1vdGlvbiA9ICQuQ3ViaXNtTW90aW9uO1xuICAgZXhwb3J0IHR5cGUgQ3ViaXNtTW90aW9uID0gJC5DdWJpc21Nb3Rpb247XG4gfVxuICIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCI3ZWRhMmY0MjY2YjNjNDU5Yjg5MFwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9