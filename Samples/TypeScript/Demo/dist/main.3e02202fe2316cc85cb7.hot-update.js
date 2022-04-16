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
        if (pos)
            return pos.value;
    }
    var segment = motionData.segments.at(target);
    CONST;
    return segment
        ? segment.evaluate(motionData.points.get(segment.basePointIndex), time)
        : 0;
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
/******/ 	__webpack_require__.h = function() { return "78b0ae88fbe0a2dbfd05"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zZTAyMjAyZmUyMzE2Y2M4NWNiNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEscUlBQTJEO0FBQzNELDhHQUFnRDtBQUVoRCwyR0FBOEM7QUFFOUMsbUhBSThCO0FBQzlCLG1IQUF3RTtBQUN4RSx3SUFRZ0M7QUFDaEMsNEhBQTRFO0FBRzVFLElBQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUNoQyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQUN4QyxJQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztBQUs1QyxJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUV2QyxTQUFTLFVBQVUsQ0FDakIsQ0FBb0IsRUFDcEIsQ0FBb0IsRUFDcEIsQ0FBUztJQUVULElBQU0sTUFBTSxHQUFzQixJQUFJLHdDQUFpQixFQUFFLENBQUM7SUFFMUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBMkIsRUFBRSxJQUFZO0lBQy9ELElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcs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LENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUMzRDtnQkFDQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUM3QixJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDckQsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBZUgsbUJBQUM7QUFBRCxDQUFDLENBaDBCaUMsNkJBQWEsR0FnMEI5QztBQWgwQlksb0NBQVk7QUFtMEJ6QixpSEFBb0M7QUFFcEMsSUFBaUIscUJBQXFCLENBR3JDO0FBSEQsV0FBaUIscUJBQXFCO0lBQ3ZCLGtDQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUU3QyxDQUFDLEVBSGdCLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR3JDOzs7Ozs7Ozs7VUMxakNELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uLi8uLi8uLi9GcmFtZXdvcmsvc3JjL21vdGlvbi9jdWJpc21tb3Rpb24udHMiLCJ3ZWJwYWNrOi8vTGl2ZTJkL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBDdWJpc21JZEhhbmRsZSB9IGZyb20gJy4uL2lkL2N1YmlzbWlkJztcbmltcG9ydCB7IEN1YmlzbUZyYW1ld29yayB9IGZyb20gJy4uL2xpdmUyZGN1YmlzbWZyYW1ld29yayc7XG5pbXBvcnQgeyBDdWJpc21NYXRoIH0gZnJvbSAnLi4vbWF0aC9jdWJpc21tYXRoJztcbmltcG9ydCB7IEN1YmlzbU1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvY3ViaXNtbW9kZWwnO1xuaW1wb3J0IHsgY3NtU3RyaW5nIH0gZnJvbSAnLi4vdHlwZS9jc21zdHJpbmcnO1xuaW1wb3J0IHsgY3NtVmVjdG9yIH0gZnJvbSAnLi4vdHlwZS9jc212ZWN0b3InO1xuaW1wb3J0IHtcbiAgQ1NNX0FTU0VSVCxcbiAgQ3ViaXNtTG9nRGVidWcsXG4gIEN1YmlzbUxvZ1dhcm5pbmdcbn0gZnJvbSAnLi4vdXRpbHMvY3ViaXNtZGVidWcnO1xuaW1wb3J0IHsgQUN1YmlzbU1vdGlvbiwgRmluaXNoZWRNb3Rpb25DYWxsYmFjayB9IGZyb20gJy4vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQge1xuICBDdWJpc21Nb3Rpb25DdXJ2ZSxcbiAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQsXG4gIEN1YmlzbU1vdGlvbkRhdGEsXG4gIEN1YmlzbU1vdGlvbkV2ZW50LFxuICBDdWJpc21Nb3Rpb25Qb2ludCxcbiAgQ3ViaXNtTW90aW9uU2VnbWVudCxcbiAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVcbn0gZnJvbSAnLi9jdWJpc21tb3Rpb25pbnRlcm5hbCc7XG5pbXBvcnQgeyBDdWJpc21Nb3Rpb25Kc29uLCBFdmFsdWF0aW9uT3B0aW9uRmxhZyB9IGZyb20gJy4vY3ViaXNtbW90aW9uanNvbic7XG5pbXBvcnQgeyBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5IH0gZnJvbSAnLi9jdWJpc21tb3Rpb25xdWV1ZWVudHJ5JztcblxuY29uc3QgRWZmZWN0TmFtZUV5ZUJsaW5rID0gJ0V5ZUJsaW5rJztcbmNvbnN0IEVmZmVjdE5hbWVMaXBTeW5jID0gJ0xpcFN5bmMnO1xuY29uc3QgVGFyZ2V0TmFtZU1vZGVsID0gJ01vZGVsJztcbmNvbnN0IFRhcmdldE5hbWVQYXJhbWV0ZXIgPSAnUGFyYW1ldGVyJztcbmNvbnN0IFRhcmdldE5hbWVQYXJ0T3BhY2l0eSA9ICdQYXJ0T3BhY2l0eSc7XG5cbi8qKlxuICogQ3ViaXNtIFNESyBSMiDku6XliY3jga7jg6Ljg7zjgrfjg6fjg7PjgpLlho3nj77jgZXjgZvjgovjgarjgokgdHJ1ZSDjgIHjgqLjg4vjg6Hjg7zjgr/jga7jg6Ljg7zjgrfjg6fjg7PjgpLmraPjgZfjgY/lho3nj77jgZnjgovjgarjgokgZmFsc2Ug44CCXG4gKi9cbmNvbnN0IFVzZU9sZEJlemllcnNDdXJ2ZU1vdGlvbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBsZXJwUG9pbnRzKFxuICBhOiBDdWJpc21Nb3Rpb25Qb2ludCxcbiAgYjogQ3ViaXNtTW90aW9uUG9pbnQsXG4gIHQ6IG51bWJlclxuKTogQ3ViaXNtTW90aW9uUG9pbnQge1xuICBjb25zdCByZXN1bHQ6IEN1YmlzbU1vdGlvblBvaW50ID0gbmV3IEN1YmlzbU1vdGlvblBvaW50KCk7XG5cbiAgcmVzdWx0LnRpbWUgPSBhLnRpbWUgKyAoYi50aW1lIC0gYS50aW1lKSAqIHQ7XG4gIHJlc3VsdC52YWx1ZSA9IGEudmFsdWUgKyAoYi52YWx1ZSAtIGEudmFsdWUpICogdDtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBsaW5lYXJFdmFsdWF0ZShwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sIHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gIGxldCB0OiBudW1iZXIgPSAodGltZSAtIHBvaW50c1swXS50aW1lKSAvIChwb2ludHNbMV0udGltZSAtIHBvaW50c1swXS50aW1lKTtcblxuICBpZiAodCA8IDAuMCkge1xuICAgIHQgPSAwLjA7XG4gIH1cblxuICByZXR1cm4gcG9pbnRzWzBdLnZhbHVlICsgKHBvaW50c1sxXS52YWx1ZSAtIHBvaW50c1swXS52YWx1ZSkgKiB0O1xufVxuXG5mdW5jdGlvbiBiZXppZXJFdmFsdWF0ZShwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sIHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gIGxldCB0OiBudW1iZXIgPSAodGltZSAtIHBvaW50c1swXS50aW1lKSAvIChwb2ludHNbM10udGltZSAtIHBvaW50c1swXS50aW1lKTtcblxuICBpZiAodCA8IDAuMCkge1xuICAgIHQgPSAwLjA7XG4gIH1cblxuICBjb25zdCBwMDE6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMF0sIHBvaW50c1sxXSwgdCk7XG4gIGNvbnN0IHAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1sxXSwgcG9pbnRzWzJdLCB0KTtcbiAgY29uc3QgcDIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzJdLCBwb2ludHNbM10sIHQpO1xuXG4gIGNvbnN0IHAwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMDEsIHAxMiwgdCk7XG4gIGNvbnN0IHAxMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMTIsIHAyMywgdCk7XG5cbiAgcmV0dXJuIGxlcnBQb2ludHMocDAxMiwgcDEyMywgdCkudmFsdWU7XG59XG5cbmZ1bmN0aW9uIGJlemllckV2YWx1YXRlQmluYXJ5U2VhcmNoKFxuICBwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sXG4gIHRpbWU6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgY29uc3QgeF9lcnJvciA9IDAuMDE7XG5cbiAgY29uc3QgeDogbnVtYmVyID0gdGltZTtcbiAgbGV0IHgxOiBudW1iZXIgPSBwb2ludHNbMF0udGltZTtcbiAgbGV0IHgyOiBudW1iZXIgPSBwb2ludHNbM10udGltZTtcbiAgbGV0IGN4MTogbnVtYmVyID0gcG9pbnRzWzFdLnRpbWU7XG4gIGxldCBjeDI6IG51bWJlciA9IHBvaW50c1syXS50aW1lO1xuXG4gIGxldCB0YSA9IDAuMDtcbiAgbGV0IHRiID0gMS4wO1xuICBsZXQgdCA9IDAuMDtcbiAgbGV0IGkgPSAwO1xuXG4gIGZvciAobGV0IHZhcjMzID0gdHJ1ZTsgaSA8IDIwOyArK2kpIHtcbiAgICBpZiAoeCA8IHgxICsgeF9lcnJvcikge1xuICAgICAgdCA9IHRhO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHgyIC0geF9lcnJvciA8IHgpIHtcbiAgICAgIHQgPSB0YjtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGxldCBjZW50ZXJ4OiBudW1iZXIgPSAoY3gxICsgY3gyKSAqIDAuNTtcbiAgICBjeDEgPSAoeDEgKyBjeDEpICogMC41O1xuICAgIGN4MiA9ICh4MiArIGN4MikgKiAwLjU7XG4gICAgY29uc3QgY3RybHgxMjogbnVtYmVyID0gKGN4MSArIGNlbnRlcngpICogMC41O1xuICAgIGNvbnN0IGN0cmx4MjE6IG51bWJlciA9IChjeDIgKyBjZW50ZXJ4KSAqIDAuNTtcbiAgICBjZW50ZXJ4ID0gKGN0cmx4MTIgKyBjdHJseDIxKSAqIDAuNTtcbiAgICBpZiAoeCA8IGNlbnRlcngpIHtcbiAgICAgIHRiID0gKHRhICsgdGIpICogMC41O1xuICAgICAgaWYgKGNlbnRlcnggLSB4X2Vycm9yIDwgeCkge1xuICAgICAgICB0ID0gdGI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB4MiA9IGNlbnRlcng7XG4gICAgICBjeDIgPSBjdHJseDEyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YSA9ICh0YSArIHRiKSAqIDAuNTtcbiAgICAgIGlmICh4IDwgY2VudGVyeCArIHhfZXJyb3IpIHtcbiAgICAgICAgdCA9IHRhO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgeDEgPSBjZW50ZXJ4O1xuICAgICAgY3gxID0gY3RybHgyMTtcbiAgICB9XG4gIH1cblxuICBpZiAoaSA9PSAyMCkge1xuICAgIHQgPSAodGEgKyB0YikgKiAwLjU7XG4gIH1cblxuICBpZiAodCA8IDAuMCkge1xuICAgIHQgPSAwLjA7XG4gIH1cbiAgaWYgKHQgPiAxLjApIHtcbiAgICB0ID0gMS4wO1xuICB9XG5cbiAgY29uc3QgcDAxOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHQpO1xuICBjb25zdCBwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMV0sIHBvaW50c1syXSwgdCk7XG4gIGNvbnN0IHAyMzogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1syXSwgcG9pbnRzWzNdLCB0KTtcblxuICBjb25zdCBwMDEyOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDAxLCBwMTIsIHQpO1xuICBjb25zdCBwMTIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocDEyLCBwMjMsIHQpO1xuXG4gIHJldHVybiBsZXJwUG9pbnRzKHAwMTIsIHAxMjMsIHQpLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBiZXppZXJFdmFsdWF0ZUNhcmRhbm9JbnRlcnByZXRhdGlvbihcbiAgcG9pbnRzOiBDdWJpc21Nb3Rpb25Qb2ludFtdLFxuICB0aW1lOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGNvbnN0IHg6IG51bWJlciA9IHRpbWU7XG4gIGNvbnN0IHgxOiBudW1iZXIgPSBwb2ludHNbMF0udGltZTtcbiAgY29uc3QgeDI6IG51bWJlciA9IHBvaW50c1szXS50aW1lO1xuICBjb25zdCBjeDE6IG51bWJlciA9IHBvaW50c1sxXS50aW1lO1xuICBjb25zdCBjeDI6IG51bWJlciA9IHBvaW50c1syXS50aW1lO1xuXG4gIGNvbnN0IGE6IG51bWJlciA9IHgyIC0gMy4wICogY3gyICsgMy4wICogY3gxIC0geDE7XG4gIGNvbnN0IGI6IG51bWJlciA9IDMuMCAqIGN4MiAtIDYuMCAqIGN4MSArIDMuMCAqIHgxO1xuICBjb25zdCBjOiBudW1iZXIgPSAzLjAgKiBjeDEgLSAzLjAgKiB4MTtcbiAgY29uc3QgZDogbnVtYmVyID0geDEgLSB4O1xuXG4gIGNvbnN0IHQ6IG51bWJlciA9IEN1YmlzbU1hdGguY2FyZGFub0FsZ29yaXRobUZvckJlemllcihhLCBiLCBjLCBkKTtcblxuICBjb25zdCBwMDE6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwb2ludHNbMF0sIHBvaW50c1sxXSwgdCk7XG4gIGNvbnN0IHAxMjogQ3ViaXNtTW90aW9uUG9pbnQgPSBsZXJwUG9pbnRzKHBvaW50c1sxXSwgcG9pbnRzWzJdLCB0KTtcbiAgY29uc3QgcDIzOiBDdWJpc21Nb3Rpb25Qb2ludCA9IGxlcnBQb2ludHMocG9pbnRzWzJdLCBwb2ludHNbM10sIHQpO1xuXG4gIGNvbnN0IHAwMTI6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMDEsIHAxMiwgdCk7XG4gIGNvbnN0IHAxMjM6IEN1YmlzbU1vdGlvblBvaW50ID0gbGVycFBvaW50cyhwMTIsIHAyMywgdCk7XG5cbiAgcmV0dXJuIGxlcnBQb2ludHMocDAxMiwgcDEyMywgdCkudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHN0ZXBwZWRFdmFsdWF0ZShwb2ludHM6IEN1YmlzbU1vdGlvblBvaW50W10sIHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBwb2ludHNbMF0udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGludmVyc2VTdGVwcGVkRXZhbHVhdGUoXG4gIHBvaW50czogQ3ViaXNtTW90aW9uUG9pbnRbXSxcbiAgdGltZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICByZXR1cm4gcG9pbnRzWzFdLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBldmFsdWF0ZUN1cnZlKFxuICBtb3Rpb25EYXRhOiBDdWJpc21Nb3Rpb25EYXRhLFxuICBpbmRleDogbnVtYmVyLFxuICB0aW1lOiBudW1iZXJcbik6IG51bWJlciB7XG4gIC8vIEZpbmQgc2VnbWVudCB0byBldmFsdWF0ZS5cbiAgY29uc3QgY3VydmU6IEN1YmlzbU1vdGlvbkN1cnZlID0gbW90aW9uRGF0YS5jdXJ2ZXMuYXQoaW5kZXgpO1xuXG4gIGxldCB0YXJnZXQgPSAtMTtcbiAgY29uc3QgdG90YWxTZWdtZW50Q291bnQ6IG51bWJlciA9IGN1cnZlLmJhc2VTZWdtZW50SW5kZXggKyBjdXJ2ZS5zZWdtZW50Q291bnQ7XG4gIGxldCBwb2ludFBvc2l0aW9uID0gMDtcbiAgZm9yIChsZXQgaTogbnVtYmVyID0gY3VydmUuYmFzZVNlZ21lbnRJbmRleDsgaSA8IHRvdGFsU2VnbWVudENvdW50OyArK2kpIHtcbiAgICAvLyBHZXQgZmlyc3QgcG9pbnQgb2YgbmV4dCBzZWdtZW50LlxuICAgIHBvaW50UG9zaXRpb24gPVxuICAgICAgbW90aW9uRGF0YS5zZWdtZW50cy5hdChpKS5iYXNlUG9pbnRJbmRleCArXG4gICAgICAobW90aW9uRGF0YS5zZWdtZW50cy5hdChpKS5zZWdtZW50VHlwZSA9PVxuICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyXG4gICAgICAgID8gM1xuICAgICAgICA6IDEpO1xuXG4gICAgLy8gQnJlYWsgaWYgdGltZSBsaWVzIHdpdGhpbiBjdXJyZW50IHNlZ21lbnQuXG4gICAgY29uc3QgcG9zID0gbW90aW9uRGF0YS5wb2ludHMuYXQocG9pbnRQb3NpdGlvbik7XG4gICAgaWYgKCFwb3MgfHwgcG9zLnRpbWUgPiB0aW1lKSB7XG4gICAgICB0YXJnZXQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRhcmdldCA9PSAtMSkge1xuICAgIGNvbnN0IHBvcyA9IG1vdGlvbkRhdGEucG9pbnRzLmF0KHBvaW50UG9zaXRpb24pO1xuICAgIGlmIChwb3MpIHJldHVybiBwb3MudmFsdWU7XG4gIH1cblxuICBjb25zdCBzZWdtZW50OiBDdWJpc21Nb3Rpb25TZWdtZW50ID0gbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0YXJnZXQpO1xuICBDT05TVCBcblxuICByZXR1cm4gc2VnbWVudFxuICAgID8gc2VnbWVudC5ldmFsdWF0ZShtb3Rpb25EYXRhLnBvaW50cy5nZXQoc2VnbWVudC5iYXNlUG9pbnRJbmRleCksIHRpbWUpXG4gICAgOiAwO1xufVxuXG4vKipcbiAqIOODouODvOOCt+ODp+ODs+OCr+ODqeOCuVxuICpcbiAqIOODouODvOOCt+ODp+ODs+OBruOCr+ODqeOCueOAglxuICovXG5leHBvcnQgY2xhc3MgQ3ViaXNtTW90aW9uIGV4dGVuZHMgQUN1YmlzbU1vdGlvbiB7XG4gIC8qKlxuICAgKiDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzmiJDjgZnjgotcbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciBtb3Rpb24zLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDkvZzmiJDjgZXjgozjgZ/jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gICAgc2l6ZTogbnVtYmVyLFxuICAgIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyPzogRmluaXNoZWRNb3Rpb25DYWxsYmFja1xuICApOiBDdWJpc21Nb3Rpb24ge1xuICAgIGNvbnN0IHJldCA9IG5ldyBDdWJpc21Nb3Rpb24oKTtcblxuICAgIHJldC5wYXJzZShidWZmZXIsIHNpemUpO1xuICAgIHJldC5fc291cmNlRnJhbWVSYXRlID0gcmV0Ll9tb3Rpb25EYXRhLmZwcztcbiAgICByZXQuX2xvb3BEdXJhdGlvblNlY29uZHMgPSByZXQuX21vdGlvbkRhdGEuZHVyYXRpb247XG4gICAgcmV0Ll9vbkZpbmlzaGVkTW90aW9uID0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI7XG5cbiAgICAvLyBOT1RFOiBFZGl0b3Ljgafjga/jg6vjg7zjg5fjgYLjgorjga7jg6Ljg7zjgrfjg6fjg7Pmm7jjgY3lh7rjgZfjga/pnZ7lr77lv5xcbiAgICAvLyByZXQtPl9sb29wID0gKHJldC0+X21vdGlvbkRhdGEtPkxvb3AgPiAwKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OBruODkeODqeODoeODvOOCv+OBruabtOaWsOOBruWun+ihjFxuICAgKiBAcGFyYW0gbW9kZWwgICAgICAgICAgICAg5a++6LGh44Gu44Oi44OH44OrXG4gICAqIEBwYXJhbSB1c2VyVGltZVNlY29uZHMgICDnj77lnKjjga7mmYLliLtb56eSXVxuICAgKiBAcGFyYW0gZmFkZVdlaWdodCAgICAgICAg44Oi44O844K344On44Oz44Gu6YeN44G/XG4gICAqIEBwYXJhbSBtb3Rpb25RdWV1ZUVudHJ5ICBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXLjgafnrqHnkIbjgZXjgozjgabjgYTjgovjg6Ljg7zjgrfjg6fjg7NcbiAgICovXG4gIHB1YmxpYyBkb1VwZGF0ZVBhcmFtZXRlcnMoXG4gICAgbW9kZWw6IEN1YmlzbU1vZGVsLFxuICAgIHVzZXJUaW1lU2Vjb25kczogbnVtYmVyLFxuICAgIGZhZGVXZWlnaHQ6IG51bWJlcixcbiAgICBtb3Rpb25RdWV1ZUVudHJ5OiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5XG4gICk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgICAgRWZmZWN0TmFtZUV5ZUJsaW5rXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2RlbEN1cnZlSWRMaXBTeW5jID09IG51bGwpIHtcbiAgICAgIHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICAgIEVmZmVjdE5hbWVMaXBTeW5jXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCB0aW1lT2Zmc2V0U2Vjb25kczogbnVtYmVyID1cbiAgICAgIHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0U3RhcnRUaW1lKCk7XG5cbiAgICBpZiAodGltZU9mZnNldFNlY29uZHMgPCAwLjApIHtcbiAgICAgIHRpbWVPZmZzZXRTZWNvbmRzID0gMC4wOyAvLyDjgqjjg6njg7zlm57pgb9cbiAgICB9XG5cbiAgICBsZXQgbGlwU3luY1ZhbHVlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIGxldCBleWVCbGlua1ZhbHVlOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuXG4gICAgLy/jgb7jgbDjgZ/jgY3jgIHjg6rjg4Pjg5fjgrfjg7Pjgq/jga7jgYbjgaHjg6Ljg7zjgrfjg6fjg7Pjga7pgannlKjjgpLmpJzlh7rjgZnjgovjgZ/jgoHjga7jg5Pjg4Pjg4jvvIhtYXhGbGFnQ291bnTlgIvjgb7jgadcbiAgICBjb25zdCBNYXhUYXJnZXRTaXplID0gNjQ7XG4gICAgbGV0IGxpcFN5bmNGbGFncyA9IDA7XG4gICAgbGV0IGV5ZUJsaW5rRmxhZ3MgPSAwO1xuXG4gICAgLy/nnqzjgY3jgIHjg6rjg4Pjg5fjgrfjg7Pjgq/jga7jgr/jg7zjgrLjg4Pjg4jmlbDjgYzkuIrpmZDjgpLotoXjgYjjgabjgYTjgovloLTlkIhcbiAgICBpZiAodGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgQ3ViaXNtTG9nRGVidWcoXG4gICAgICAgICd0b28gbWFueSBleWUgYmxpbmsgdGFyZ2V0cyA6IHswfScsXG4gICAgICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuZ2V0U2l6ZSgpID4gTWF4VGFyZ2V0U2l6ZSkge1xuICAgICAgQ3ViaXNtTG9nRGVidWcoXG4gICAgICAgICd0b28gbWFueSBsaXAgc3luYyB0YXJnZXRzIDogezB9JyxcbiAgICAgICAgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdG1wRmFkZUluOiBudW1iZXIgPVxuICAgICAgdGhpcy5fZmFkZUluU2Vjb25kcyA8PSAwLjBcbiAgICAgICAgPyAxLjBcbiAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAodXNlclRpbWVTZWNvbmRzIC0gbW90aW9uUXVldWVFbnRyeS5nZXRGYWRlSW5TdGFydFRpbWUoKSkgL1xuICAgICAgICAgICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzXG4gICAgICAgICAgKTtcblxuICAgIGNvbnN0IHRtcEZhZGVPdXQ6IG51bWJlciA9XG4gICAgICB0aGlzLl9mYWRlT3V0U2Vjb25kcyA8PSAwLjAgfHwgbW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgPCAwLjBcbiAgICAgICAgPyAxLjBcbiAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAobW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgLSB1c2VyVGltZVNlY29uZHMpIC9cbiAgICAgICAgICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHNcbiAgICAgICAgICApO1xuICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgIGxldCBjOiBudW1iZXIsIHBhcmFtZXRlckluZGV4OiBudW1iZXI7XG5cbiAgICAvLyAnUmVwZWF0JyB0aW1lIGFzIG5lY2Vzc2FyeS5cbiAgICBsZXQgdGltZTogbnVtYmVyID0gdGltZU9mZnNldFNlY29uZHM7XG5cbiAgICBpZiAodGhpcy5faXNMb29wKSB7XG4gICAgICB3aGlsZSAodGltZSA+IHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24pIHtcbiAgICAgICAgdGltZSAtPSB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgLy8gRXZhbHVhdGUgbW9kZWwgY3VydmVzLlxuICAgIGZvciAoXG4gICAgICBjID0gMDtcbiAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgIGN1cnZlcy5hdChjKS50eXBlID09XG4gICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X01vZGVsO1xuICAgICAgKytjXG4gICAgKSB7XG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgY2FsbCBoYW5kbGVyLlxuICAgICAgdmFsdWUgPSBldmFsdWF0ZUN1cnZlKHRoaXMuX21vdGlvbkRhdGEsIGMsIHRpbWUpO1xuXG4gICAgICBpZiAoY3VydmVzLmF0KGMpLmlkID09IHRoaXMuX21vZGVsQ3VydmVJZEV5ZUJsaW5rKSB7XG4gICAgICAgIGV5ZUJsaW5rVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoY3VydmVzLmF0KGMpLmlkID09IHRoaXMuX21vZGVsQ3VydmVJZExpcFN5bmMpIHtcbiAgICAgICAgbGlwU3luY1ZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhcmFtZXRlck1vdGlvbkN1cnZlQ291bnQgPSAwO1xuXG4gICAgZm9yIChcbiAgICAgIDtcbiAgICAgIGMgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgJiZcbiAgICAgIGN1cnZlcy5hdChjKS50eXBlID09XG4gICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcmFtZXRlcjtcbiAgICAgICsrY1xuICAgICkge1xuICAgICAgcGFyYW1ldGVyTW90aW9uQ3VydmVDb3VudCsrO1xuXG4gICAgICAvLyBGaW5kIHBhcmFtZXRlciBpbmRleC5cbiAgICAgIHBhcmFtZXRlckluZGV4ID0gbW9kZWwuZ2V0UGFyYW1ldGVySW5kZXgoY3VydmVzLmF0KGMpLmlkKTtcblxuICAgICAgLy8gU2tpcCBjdXJ2ZSBldmFsdWF0aW9uIGlmIG5vIHZhbHVlIGluIHNpbmsuXG4gICAgICBpZiAocGFyYW1ldGVySW5kZXggPT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvdXJjZVZhbHVlOiBudW1iZXIgPSBtb2RlbC5nZXRQYXJhbWV0ZXJWYWx1ZUJ5SW5kZXgoXG4gICAgICAgIHBhcmFtZXRlckluZGV4XG4gICAgICApO1xuXG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgYXBwbHkgdmFsdWUuXG4gICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG5cbiAgICAgIGlmIChleWVCbGlua1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmF0KGkpID09IGN1cnZlcy5hdChjKS5pZCkge1xuICAgICAgICAgICAgdmFsdWUgKj0gZXllQmxpbmtWYWx1ZTtcbiAgICAgICAgICAgIGV5ZUJsaW5rRmxhZ3MgfD0gMSA8PCBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsaXBTeW5jVmFsdWUgIT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBpIDwgdGhpcy5fbGlwU3luY1BhcmFtZXRlcklkcy5nZXRTaXplKCkgJiYgaSA8IE1heFRhcmdldFNpemU7XG4gICAgICAgICAgKytpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmF0KGkpID09IGN1cnZlcy5hdChjKS5pZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gbGlwU3luY1ZhbHVlO1xuICAgICAgICAgICAgbGlwU3luY0ZsYWdzIHw9IDEgPDwgaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgdjogbnVtYmVyO1xuXG4gICAgICAvLyDjg5Hjg6njg6Hjg7zjgr/jgZTjgajjga7jg5Xjgqfjg7zjg4lcbiAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA8IDAuMCAmJiBjdXJ2ZXMuYXQoYykuZmFkZU91dFRpbWUgPCAwLjApIHtcbiAgICAgICAgLy8g44Oi44O844K344On44Oz44Gu44OV44Kn44O844OJ44KS6YGp55SoXG4gICAgICAgIHYgPSBzb3VyY2VWYWx1ZSArICh2YWx1ZSAtIHNvdXJjZVZhbHVlKSAqIGZhZGVXZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZfjgabjg5Xjgqfjg7zjg4njgqTjg7PjgYvjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgYzoqK3lrprjgZfjgabjgYLjgovloLTlkIjjga/jgZ3jgaHjgonjgpLpgannlKhcbiAgICAgICAgbGV0IGZpbjogbnVtYmVyO1xuICAgICAgICBsZXQgZm91dDogbnVtYmVyO1xuXG4gICAgICAgIGlmIChjdXJ2ZXMuYXQoYykuZmFkZUluVGltZSA8IDAuMCkge1xuICAgICAgICAgIGZpbiA9IHRtcEZhZGVJbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaW4gPVxuICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVJblRpbWUgPT0gMC4wXG4gICAgICAgICAgICAgID8gMS4wXG4gICAgICAgICAgICAgIDogQ3ViaXNtTWF0aC5nZXRFYXNpbmdTaW5lKFxuICAgICAgICAgICAgICAgICAgKHVzZXJUaW1lU2Vjb25kcyAtIG1vdGlvblF1ZXVlRW50cnkuZ2V0RmFkZUluU3RhcnRUaW1lKCkpIC9cbiAgICAgICAgICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVJblRpbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnZlcy5hdChjKS5mYWRlT3V0VGltZSA8IDAuMCkge1xuICAgICAgICAgIGZvdXQgPSB0bXBGYWRlT3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvdXQgPVxuICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lID09IDAuMCB8fFxuICAgICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgPCAwLjBcbiAgICAgICAgICAgICAgPyAxLjBcbiAgICAgICAgICAgICAgOiBDdWJpc21NYXRoLmdldEVhc2luZ1NpbmUoXG4gICAgICAgICAgICAgICAgICAobW90aW9uUXVldWVFbnRyeS5nZXRFbmRUaW1lKCkgLSB1c2VyVGltZVNlY29uZHMpIC9cbiAgICAgICAgICAgICAgICAgICAgY3VydmVzLmF0KGMpLmZhZGVPdXRUaW1lXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtV2VpZ2h0OiBudW1iZXIgPSB0aGlzLl93ZWlnaHQgKiBmaW4gKiBmb3V0O1xuXG4gICAgICAgIC8vIOODkeODqeODoeODvOOCv+OBlOOBqOOBruODleOCp+ODvOODieOCkumBqeeUqFxuICAgICAgICB2ID0gc291cmNlVmFsdWUgKyAodmFsdWUgLSBzb3VyY2VWYWx1ZSkgKiBwYXJhbVdlaWdodDtcbiAgICAgIH1cblxuICAgICAgbW9kZWwuc2V0UGFyYW1ldGVyVmFsdWVCeUluZGV4KHBhcmFtZXRlckluZGV4LCB2LCAxLjApO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGlmIChleWVCbGlua1ZhbHVlICE9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlVmFsdWU6IG51bWJlciA9IG1vZGVsLmdldFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgICAgICAgIHRoaXMuX2V5ZUJsaW5rUGFyYW1ldGVySWRzLmF0KGkpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBp+OBruS4iuabuOOBjeOBjOOBguOBo+OBn+aZguOBq+OBr+OBvuOBsOOBn+OBjeOBr+mBqeeUqOOBl+OBquOBhFxuICAgICAgICAgIGlmICgoZXllQmxpbmtGbGFncyA+PiBpKSAmIDB4MDEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHY6IG51bWJlciA9XG4gICAgICAgICAgICBzb3VyY2VWYWx1ZSArIChleWVCbGlua1ZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcblxuICAgICAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9leWVCbGlua1BhcmFtZXRlcklkcy5hdChpKSwgdik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxpcFN5bmNWYWx1ZSAhPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGkgPCB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmdldFNpemUoKSAmJiBpIDwgTWF4VGFyZ2V0U2l6ZTtcbiAgICAgICAgICArK2lcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlVmFsdWU6IG51bWJlciA9IG1vZGVsLmdldFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgICAgICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMuYXQoaSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8g44Oi44O844K344On44Oz44Gn44Gu5LiK5pu444GN44GM44GC44Gj44Gf5pmC44Gr44Gv44Oq44OD44OX44K344Oz44Kv44Gv6YGp55So44GX44Gq44GEXG4gICAgICAgICAgaWYgKChsaXBTeW5jRmxhZ3MgPj4gaSkgJiAweDAxKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB2OiBudW1iZXIgPVxuICAgICAgICAgICAgc291cmNlVmFsdWUgKyAobGlwU3luY1ZhbHVlIC0gc291cmNlVmFsdWUpICogZmFkZVdlaWdodDtcblxuICAgICAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzLmF0KGkpLCB2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoXG4gICAgICA7XG4gICAgICBjIDwgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZUNvdW50ICYmXG4gICAgICBjdXJ2ZXMuYXQoYykudHlwZSA9PVxuICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9QYXJ0T3BhY2l0eTtcbiAgICAgICsrY1xuICAgICkge1xuICAgICAgLy8gRmluZCBwYXJhbWV0ZXIgaW5kZXguXG4gICAgICBwYXJhbWV0ZXJJbmRleCA9IG1vZGVsLmdldFBhcmFtZXRlckluZGV4KGN1cnZlcy5hdChjKS5pZCk7XG5cbiAgICAgIC8vIFNraXAgY3VydmUgZXZhbHVhdGlvbiBpZiBubyB2YWx1ZSBpbiBzaW5rLlxuICAgICAgaWYgKHBhcmFtZXRlckluZGV4ID09IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmFsdWF0ZSBjdXJ2ZSBhbmQgYXBwbHkgdmFsdWUuXG4gICAgICB2YWx1ZSA9IGV2YWx1YXRlQ3VydmUodGhpcy5fbW90aW9uRGF0YSwgYywgdGltZSk7XG5cbiAgICAgIG1vZGVsLnNldFBhcmFtZXRlclZhbHVlQnlJbmRleChwYXJhbWV0ZXJJbmRleCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aW1lT2Zmc2V0U2Vjb25kcyA+PSB0aGlzLl9tb3Rpb25EYXRhLmR1cmF0aW9uKSB7XG4gICAgICBpZiAodGhpcy5faXNMb29wKSB7XG4gICAgICAgIG1vdGlvblF1ZXVlRW50cnkuc2V0U3RhcnRUaW1lKHVzZXJUaW1lU2Vjb25kcyk7IC8vIOacgOWIneOBrueKtuaFi+OBuFxuICAgICAgICBpZiAodGhpcy5faXNMb29wRmFkZUluKSB7XG4gICAgICAgICAgLy8g44Or44O844OX5YaF44Gn44Or44O844OX55So44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544Gu5pmC44Gv44CB44OV44Kn44O844OJ44Kk44Oz6Kit5a6a44GX55u044GXXG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRGYWRlSW5TdGFydFRpbWUodXNlclRpbWVTZWNvbmRzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX29uRmluaXNoZWRNb3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl9vbkZpbmlzaGVkTW90aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbW90aW9uUXVldWVFbnRyeS5zZXRJc0ZpbmlzaGVkKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9sYXN0V2VpZ2h0ID0gZmFkZVdlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6vjg7zjg5fmg4XloLHjga7oqK3lrppcbiAgICogQHBhcmFtIGxvb3Ag44Or44O844OX5oOF5aCxXG4gICAqL1xuICBwdWJsaWMgc2V0SXNMb29wKGxvb3A6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9pc0xvb3AgPSBsb29wO1xuICB9XG5cbiAgLyoqXG4gICAqIOODq+ODvOODl+aDheWgseOBruWPluW+l1xuICAgKiBAcmV0dXJuIHRydWUg44Or44O844OX44GZ44KLXG4gICAqIEByZXR1cm4gZmFsc2Ug44Or44O844OX44GX44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNMb29wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0xvb3A7XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCx44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBsb29wRmFkZUluICDjg6vjg7zjg5fmmYLjga7jg5Xjgqfjg7zjg4njgqTjg7Pmg4XloLFcbiAgICovXG4gIHB1YmxpYyBzZXRJc0xvb3BGYWRlSW4obG9vcEZhZGVJbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2lzTG9vcEZhZGVJbiA9IGxvb3BGYWRlSW47XG4gIH1cblxuICAvKipcbiAgICog44Or44O844OX5pmC44Gu44OV44Kn44O844OJ44Kk44Oz5oOF5aCx44Gu5Y+W5b6XXG4gICAqXG4gICAqIEByZXR1cm4gIHRydWUgICAg44GZ44KLXG4gICAqIEByZXR1cm4gIGZhbHNlICAg44GX44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNMb29wRmFkZUluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0xvb3BGYWRlSW47XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu6ZW344GV44KS5Y+W5b6X44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBrumVt+OBlVvnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faXNMb29wID8gLTEuMCA6IHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu44Or44O844OX5pmC44Gu6ZW344GV44KS5Y+W5b6X44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4gIOODouODvOOCt+ODp+ODs+OBruODq+ODvOODl+aZguOBrumVt+OBlVvnp5JdXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9vcER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb3BEdXJhdGlvblNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Kk44Oz44Gu5pmC6ZaT44KS6Kit5a6a44GZ44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICDjg5Xjgqfjg7zjg4njgqTjg7PjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIHNldFBhcmFtZXRlckZhZGVJblRpbWUoXG4gICAgcGFyYW1ldGVySWQ6IEN1YmlzbUlkSGFuZGxlLFxuICAgIHZhbHVlOiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIGN1cnZlcy5hdChpKS5mYWRlSW5UaW1lID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJJZCAgICAg44OR44Op44Oh44O844K/SURcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICDjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgKi9cbiAgcHVibGljIHNldFBhcmFtZXRlckZhZGVPdXRUaW1lKFxuICAgIHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSxcbiAgICB2YWx1ZTogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICBjdXJ2ZXMuYXQoaSkuZmFkZU91dFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Hjg6njg6Hjg7zjgr/jgavlr77jgZnjgovjg5Xjgqfjg7zjg4njgqTjg7Pjga7mmYLplpPjga7lj5blvpdcbiAgICogQHBhcmFtICAgIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Kk44Oz44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJGYWRlSW5UaW1lKHBhcmFtZXRlcklkOiBDdWJpc21JZEhhbmRsZSk6IG51bWJlciB7XG4gICAgY29uc3QgY3VydmVzOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uQ3VydmU+ID0gdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbkRhdGEuY3VydmVDb3VudDsgKytpKSB7XG4gICAgICBpZiAocGFyYW1ldGVySWQgPT0gY3VydmVzLmF0KGkpLmlkKSB7XG4gICAgICAgIHJldHVybiBjdXJ2ZXMuYXQoaSkuZmFkZUluVGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICog44OR44Op44Oh44O844K/44Gr5a++44GZ44KL44OV44Kn44O844OJ44Ki44Km44OI44Gu5pmC6ZaT44KS5Y+W5b6XXG4gICAqXG4gICAqIEBwYXJhbSAgIHBhcmFtZXRlcklkICAgICDjg5Hjg6njg6Hjg7zjgr9JRFxuICAgKiBAcmV0dXJuICAg44OV44Kn44O844OJ44Ki44Km44OI44Gr44GL44GL44KL5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJGYWRlT3V0VGltZShwYXJhbWV0ZXJJZDogQ3ViaXNtSWRIYW5kbGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnZlczogY3NtVmVjdG9yPEN1YmlzbU1vdGlvbkN1cnZlPiA9IHRoaXMuX21vdGlvbkRhdGEuY3VydmVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7ICsraSkge1xuICAgICAgaWYgKHBhcmFtZXRlcklkID09IGN1cnZlcy5hdChpKS5pZCkge1xuICAgICAgICByZXR1cm4gY3VydmVzLmF0KGkpLmZhZGVPdXRUaW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiDoh6rli5Xjgqjjg5Xjgqfjgq/jg4jjgYzjgYvjgYvjgaPjgabjgYTjgovjg5Hjg6njg6Hjg7zjgr9JROODquOCueODiOOBruioreWumlxuICAgKiBAcGFyYW0gZXllQmxpbmtQYXJhbWV0ZXJJZHMgICAg6Ieq5YuV44G+44Gw44Gf44GN44GM44GL44GL44Gj44Gm44GE44KL44OR44Op44Oh44O844K/SUTjga7jg6rjgrnjg4hcbiAgICogQHBhcmFtIGxpcFN5bmNQYXJhbWV0ZXJJZHMgICAgIOODquODg+ODl+OCt+ODs+OCr+OBjOOBi+OBi+OBo+OBpuOBhOOCi+ODkeODqeODoeODvOOCv0lE44Gu44Oq44K544OIXG4gICAqL1xuICBwdWJsaWMgc2V0RWZmZWN0SWRzKFxuICAgIGV5ZUJsaW5rUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+LFxuICAgIGxpcFN5bmNQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT5cbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMgPSBleWVCbGlua1BhcmFtZXRlcklkcztcbiAgICB0aGlzLl9saXBTeW5jUGFyYW1ldGVySWRzID0gbGlwU3luY1BhcmFtZXRlcklkcztcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NvdXJjZUZyYW1lUmF0ZSA9IDMwLjA7XG4gICAgdGhpcy5fbG9vcER1cmF0aW9uU2Vjb25kcyA9IC0xLjA7XG4gICAgdGhpcy5faXNMb29wID0gZmFsc2U7IC8vIHRydWXjgYvjgokgZmFsc2Ug44G444OH44OV44Kp44Or44OI44KS5aSJ5pu0XG4gICAgdGhpcy5faXNMb29wRmFkZUluID0gdHJ1ZTsgLy8g44Or44O844OX5pmC44Gr44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544GL44Gp44GG44GL44Gu44OV44Op44KwXG4gICAgdGhpcy5fbGFzdFdlaWdodCA9IDAuMDtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbEN1cnZlSWRFeWVCbGluayA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWxDdXJ2ZUlkTGlwU3luYyA9IG51bGw7XG4gICAgdGhpcy5fZXllQmxpbmtQYXJhbWV0ZXJJZHMgPSBudWxsO1xuICAgIHRoaXMuX2xpcFN5bmNQYXJhbWV0ZXJJZHMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+OCueODiOODqeOCr+OCv+ebuOW9k+OBruWHpueQhlxuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbW90aW9uRGF0YSA9IHZvaWQgMDtcbiAgICB0aGlzLl9tb3Rpb25EYXRhID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBtb3Rpb24zLmpzb27jgpLjg5Hjg7zjgrnjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIG1vdGlvbkpzb24gIG1vdGlvbjMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSAgICAgICAg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqL1xuICBwdWJsaWMgcGFyc2UobW90aW9uSnNvbjogQXJyYXlCdWZmZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX21vdGlvbkRhdGEgPSBuZXcgQ3ViaXNtTW90aW9uRGF0YSgpO1xuXG4gICAgbGV0IGpzb246IEN1YmlzbU1vdGlvbkpzb24gPSBuZXcgQ3ViaXNtTW90aW9uSnNvbihtb3Rpb25Kc29uLCBzaXplKTtcblxuICAgIHRoaXMuX21vdGlvbkRhdGEuZHVyYXRpb24gPSBqc29uLmdldE1vdGlvbkR1cmF0aW9uKCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5sb29wID0ganNvbi5pc01vdGlvbkxvb3AoKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQgPSBqc29uLmdldE1vdGlvbkN1cnZlQ291bnQoKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLmZwcyA9IGpzb24uZ2V0TW90aW9uRnBzKCk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudENvdW50ID0ganNvbi5nZXRFdmVudENvdW50KCk7XG5cbiAgICBjb25zdCBhcmVCZXppZXJzUmVzdHJ1Y3RlZDogYm9vbGVhbiA9IGpzb24uZ2V0RXZhbHVhdGlvbk9wdGlvbkZsYWcoXG4gICAgICBFdmFsdWF0aW9uT3B0aW9uRmxhZy5FdmFsdWF0aW9uT3B0aW9uRmxhZ19BcmVCZXppZXJzUmlzdHJpY3RlZFxuICAgICk7XG5cbiAgICBpZiAoanNvbi5pc0V4aXN0TW90aW9uRmFkZUluVGltZSgpKSB7XG4gICAgICB0aGlzLl9mYWRlSW5TZWNvbmRzID1cbiAgICAgICAganNvbi5nZXRNb3Rpb25GYWRlSW5UaW1lKCkgPCAwLjAgPyAxLjAgOiBqc29uLmdldE1vdGlvbkZhZGVJblRpbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmFkZUluU2Vjb25kcyA9IDEuMDtcbiAgICB9XG5cbiAgICBpZiAoanNvbi5pc0V4aXN0TW90aW9uRmFkZU91dFRpbWUoKSkge1xuICAgICAgdGhpcy5fZmFkZU91dFNlY29uZHMgPVxuICAgICAgICBqc29uLmdldE1vdGlvbkZhZGVPdXRUaW1lKCkgPCAwLjAgPyAxLjAgOiBqc29uLmdldE1vdGlvbkZhZGVPdXRUaW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZhZGVPdXRTZWNvbmRzID0gMS4wO1xuICAgIH1cblxuICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLnVwZGF0ZVNpemUoXG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQsXG4gICAgICBDdWJpc21Nb3Rpb25DdXJ2ZSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMudXBkYXRlU2l6ZShcbiAgICAgIGpzb24uZ2V0TW90aW9uVG90YWxTZWdtZW50Q291bnQoKSxcbiAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnQsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy51cGRhdGVTaXplKFxuICAgICAganNvbi5nZXRNb3Rpb25Ub3RhbFBvaW50Q291bnQoKSxcbiAgICAgIEN1YmlzbU1vdGlvblBvaW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMudXBkYXRlU2l6ZShcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudCxcbiAgICAgIEN1YmlzbU1vdGlvbkV2ZW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBsZXQgdG90YWxQb2ludENvdW50ID0gMDtcbiAgICBsZXQgdG90YWxTZWdtZW50Q291bnQgPSAwO1xuXG4gICAgLy8gQ3VydmVzXG4gICAgZm9yIChcbiAgICAgIGxldCBjdXJ2ZUNvdW50ID0gMDtcbiAgICAgIGN1cnZlQ291bnQgPCB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlQ291bnQ7XG4gICAgICArK2N1cnZlQ291bnRcbiAgICApIHtcbiAgICAgIGlmIChqc29uLmdldE1vdGlvbkN1cnZlVGFyZ2V0KGN1cnZlQ291bnQpID09IFRhcmdldE5hbWVNb2RlbCkge1xuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmN1cnZlcy5hdChjdXJ2ZUNvdW50KS50eXBlID1cbiAgICAgICAgICBDdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldC5DdWJpc21Nb3Rpb25DdXJ2ZVRhcmdldF9Nb2RlbDtcbiAgICAgIH0gZWxzZSBpZiAoanNvbi5nZXRNb3Rpb25DdXJ2ZVRhcmdldChjdXJ2ZUNvdW50KSA9PSBUYXJnZXROYW1lUGFyYW1ldGVyKSB7XG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnR5cGUgPVxuICAgICAgICAgIEN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0LkN1YmlzbU1vdGlvbkN1cnZlVGFyZ2V0X1BhcmFtZXRlcjtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGpzb24uZ2V0TW90aW9uQ3VydmVUYXJnZXQoY3VydmVDb3VudCkgPT0gVGFyZ2V0TmFtZVBhcnRPcGFjaXR5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkudHlwZSA9XG4gICAgICAgICAgQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXQuQ3ViaXNtTW90aW9uQ3VydmVUYXJnZXRfUGFydE9wYWNpdHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBDdWJpc21Mb2dXYXJuaW5nKFxuICAgICAgICAgICdXYXJuaW5nIDogVW5hYmxlIHRvIGdldCBzZWdtZW50IHR5cGUgZnJvbSBDdXJ2ZSEgVGhlIG51bWJlciBvZiBcIkN1cnZlQ291bnRcIiBtYXkgYmUgaW5jb3JyZWN0ISdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoY3VydmVDb3VudCkuaWQgPSBqc29uLmdldE1vdGlvbkN1cnZlSWQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApLmJhc2VTZWdtZW50SW5kZXggPSB0b3RhbFNlZ21lbnRDb3VudDtcblxuICAgICAgdGhpcy5fbW90aW9uRGF0YS5jdXJ2ZXMuYXQoXG4gICAgICAgIGN1cnZlQ291bnRcbiAgICAgICkuZmFkZUluVGltZSA9IGpzb24uaXNFeGlzdE1vdGlvbkN1cnZlRmFkZUluVGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA/IGpzb24uZ2V0TW90aW9uQ3VydmVGYWRlSW5UaW1lKGN1cnZlQ291bnQpXG4gICAgICAgIDogLTEuMDtcbiAgICAgIHRoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KFxuICAgICAgICBjdXJ2ZUNvdW50XG4gICAgICApLmZhZGVPdXRUaW1lID0ganNvbi5pc0V4aXN0TW90aW9uQ3VydmVGYWRlT3V0VGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA/IGpzb24uZ2V0TW90aW9uQ3VydmVGYWRlT3V0VGltZShjdXJ2ZUNvdW50KVxuICAgICAgICA6IC0xLjA7XG5cbiAgICAgIC8vIFNlZ21lbnRzXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgc2VnbWVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgc2VnbWVudFBvc2l0aW9uIDwganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnRDb3VudChjdXJ2ZUNvdW50KTtcblxuICAgICAgKSB7XG4gICAgICAgIGlmIChzZWdtZW50UG9zaXRpb24gPT0gMCkge1xuICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KSkge1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICkuYmFzZVBvaW50SW5kZXggPSB0b3RhbFBvaW50Q291bnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCkpIHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KGN1cnZlQ291bnQsIHNlZ21lbnRQb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoY3VydmVDb3VudCwgc2VnbWVudFBvc2l0aW9uICsgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuYmFzZVBvaW50SW5kZXggPVxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlZ21lbnQ6IG51bWJlciA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgc2VnbWVudFBvc2l0aW9uXG4gICAgICAgICk7XG4gICAgICAgIHN3aXRjaCAoc2VnbWVudCkge1xuICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfTGluZWFyOiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdCh0b3RhbFNlZ21lbnRDb3VudCkuc2VnbWVudFR5cGUgPVxuICAgICAgICAgICAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0xpbmVhcjtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5zZWdtZW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgICApLmV2YWx1YXRlID0gbGluZWFyRXZhbHVhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfQmV6aWVyOiB7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KHRvdGFsU2VnbWVudENvdW50KS5zZWdtZW50VHlwZSA9XG4gICAgICAgICAgICAgIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX0JlemllcjtcblxuICAgICAgICAgICAgaWYgKGFyZUJlemllcnNSZXN0cnVjdGVkIHx8IFVzZU9sZEJlemllcnNDdXJ2ZU1vdGlvbikge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICAgICkuZXZhbHVhdGUgPSBiZXppZXJFdmFsdWF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxTZWdtZW50Q291bnRcbiAgICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGJlemllckV2YWx1YXRlQ2FyZGFub0ludGVycHJldGF0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAyXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQgKyAxKSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAxXG4gICAgICAgICAgICAgICkudGltZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgM1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKyAxXG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KHRvdGFsUG9pbnRDb3VudCArIDIpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArIDJcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyA1XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArIDJcbiAgICAgICAgICAgICAgKS52YWx1ZSA9IGpzb24uZ2V0TW90aW9uQ3VydmVTZWdtZW50KFxuICAgICAgICAgICAgICAgIGN1cnZlQ291bnQsXG4gICAgICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICsgNlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFBvaW50Q291bnQgKz0gMztcbiAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArPSA3O1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIEN1YmlzbU1vdGlvblNlZ21lbnRUeXBlLkN1YmlzbU1vdGlvblNlZ21lbnRUeXBlX1N0ZXBwZWQ6IHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfU3RlcHBlZDtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQoXG4gICAgICAgICAgICAgIHRvdGFsU2VnbWVudENvdW50XG4gICAgICAgICAgICApLmV2YWx1YXRlID0gc3RlcHBlZEV2YWx1YXRlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQodG90YWxQb2ludENvdW50KSkge1xuICAgICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdChcbiAgICAgICAgICAgICAgICB0b3RhbFBvaW50Q291bnRcbiAgICAgICAgICAgICAgKS50aW1lID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnZhbHVlID0ganNvbi5nZXRNb3Rpb25DdXJ2ZVNlZ21lbnQoXG4gICAgICAgICAgICAgICAgY3VydmVDb3VudCxcbiAgICAgICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKyAyXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudCArPSAxO1xuICAgICAgICAgICAgc2VnbWVudFBvc2l0aW9uICs9IDM7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfSW52ZXJzZVN0ZXBwZWQ6IHtcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEuc2VnbWVudHMuYXQodG90YWxTZWdtZW50Q291bnQpLnNlZ21lbnRUeXBlID1cbiAgICAgICAgICAgICAgQ3ViaXNtTW90aW9uU2VnbWVudFR5cGUuQ3ViaXNtTW90aW9uU2VnbWVudFR5cGVfSW52ZXJzZVN0ZXBwZWQ7XG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLnNlZ21lbnRzLmF0KFxuICAgICAgICAgICAgICB0b3RhbFNlZ21lbnRDb3VudFxuICAgICAgICAgICAgKS5ldmFsdWF0ZSA9IGludmVyc2VTdGVwcGVkRXZhbHVhdGU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25EYXRhLnBvaW50cy5hdCh0b3RhbFBvaW50Q291bnQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21vdGlvbkRhdGEucG9pbnRzLmF0KFxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRDb3VudFxuICAgICAgICAgICAgICApLnRpbWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5fbW90aW9uRGF0YS5wb2ludHMuYXQoXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludENvdW50XG4gICAgICAgICAgICAgICkudmFsdWUgPSBqc29uLmdldE1vdGlvbkN1cnZlU2VnbWVudChcbiAgICAgICAgICAgICAgICBjdXJ2ZUNvdW50LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRQb3NpdGlvbiArIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxQb2ludENvdW50ICs9IDE7XG4gICAgICAgICAgICBzZWdtZW50UG9zaXRpb24gKz0gMztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIENTTV9BU1NFUlQoMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICArK3RoaXMuX21vdGlvbkRhdGEuY3VydmVzLmF0KGN1cnZlQ291bnQpLnNlZ21lbnRDb3VudDtcbiAgICAgICAgKyt0b3RhbFNlZ21lbnRDb3VudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgbGV0IHVzZXJkYXRhY291bnQgPSAwO1xuICAgICAgdXNlcmRhdGFjb3VudCA8IGpzb24uZ2V0RXZlbnRDb3VudCgpO1xuICAgICAgKyt1c2VyZGF0YWNvdW50XG4gICAgKSB7XG4gICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1c2VyZGF0YWNvdW50KS5maXJlVGltZSA9IGpzb24uZ2V0RXZlbnRUaW1lKFxuICAgICAgICB1c2VyZGF0YWNvdW50XG4gICAgICApO1xuICAgICAgdGhpcy5fbW90aW9uRGF0YS5ldmVudHMuYXQodXNlcmRhdGFjb3VudCkudmFsdWUgPSBqc29uLmdldEV2ZW50VmFsdWUoXG4gICAgICAgIHVzZXJkYXRhY291bnRcbiAgICAgICk7XG4gICAgfVxuXG4gICAganNvbi5yZWxlYXNlKCk7XG4gICAganNvbiA9IHZvaWQgMDtcbiAgICBqc29uID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjga7jg5Hjg6njg6Hjg7zjgr/mm7TmlrBcbiAgICpcbiAgICog44Kk44OZ44Oz44OI55m654Gr44Gu44OB44Kn44OD44Kv44CCXG4gICAqIOWFpeWKm+OBmeOCi+aZgumWk+OBr+WRvOOBsOOCjOOCi+ODouODvOOCt+ODp+ODs+OCv+OCpOODn+ODs+OCsOOCku+8kOOBqOOBl+OBn+enkuaVsOOBp+ihjOOBhuOAglxuICAgKlxuICAgKiBAcGFyYW0gYmVmb3JlQ2hlY2tUaW1lU2Vjb25kcyAgIOWJjeWbnuOBruOCpOODmeODs+ODiOODgeOCp+ODg+OCr+aZgumWk1vnp5JdXG4gICAqIEBwYXJhbSBtb3Rpb25UaW1lU2Vjb25kcyAgICAgICAg5LuK5Zue44Gu5YaN55Sf5pmC6ZaTW+enkl1cbiAgICovXG4gIHB1YmxpYyBnZXRGaXJlZEV2ZW50KFxuICAgIGJlZm9yZUNoZWNrVGltZVNlY29uZHM6IG51bWJlcixcbiAgICBtb3Rpb25UaW1lU2Vjb25kczogbnVtYmVyXG4gICk6IGNzbVZlY3Rvcjxjc21TdHJpbmc+IHtcbiAgICB0aGlzLl9maXJlZEV2ZW50VmFsdWVzLnVwZGF0ZVNpemUoMCk7XG5cbiAgICAvLyDjgqTjg5njg7Pjg4jjga7nmbrngavjg4Hjgqfjg4Pjgq9cbiAgICBmb3IgKGxldCB1ID0gMDsgdSA8IHRoaXMuX21vdGlvbkRhdGEuZXZlbnRDb3VudDsgKyt1KSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX21vdGlvbkRhdGEuZXZlbnRzLmF0KHUpLmZpcmVUaW1lID4gYmVmb3JlQ2hlY2tUaW1lU2Vjb25kcyAmJlxuICAgICAgICB0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS5maXJlVGltZSA8PSBtb3Rpb25UaW1lU2Vjb25kc1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2ZpcmVkRXZlbnRWYWx1ZXMucHVzaEJhY2soXG4gICAgICAgICAgbmV3IGNzbVN0cmluZyh0aGlzLl9tb3Rpb25EYXRhLmV2ZW50cy5hdCh1KS52YWx1ZS5zKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9maXJlZEV2ZW50VmFsdWVzO1xuICB9XG5cbiAgcHVibGljIF9zb3VyY2VGcmFtZVJhdGU6IG51bWJlcjsgLy8g44Ot44O844OJ44GX44Gf44OV44Kh44Kk44Or44GuRlBT44CC6KiY6L+w44GM54Sh44GR44KM44Gw44OH44OV44Kp44Or44OI5YCkMTVmcHPjgajjgarjgotcbiAgcHVibGljIF9sb29wRHVyYXRpb25TZWNvbmRzOiBudW1iZXI7IC8vIG10buODleOCoeOCpOODq+OBp+Wumue+qeOBleOCjOOCi+S4gOmAo+OBruODouODvOOCt+ODp+ODs+OBrumVt+OBlVxuICBwdWJsaWMgX2lzTG9vcDogYm9vbGVhbjsgLy8g44Or44O844OX44GZ44KL44GLP1xuICBwdWJsaWMgX2lzTG9vcEZhZGVJbjogYm9vbGVhbjsgLy8g44Or44O844OX5pmC44Gr44OV44Kn44O844OJ44Kk44Oz44GM5pyJ5Yq544GL44Gp44GG44GL44Gu44OV44Op44Kw44CC5Yid5pyf5YCk44Gn44Gv5pyJ5Yq544CCXG4gIHB1YmxpYyBfbGFzdFdlaWdodDogbnVtYmVyOyAvLyDmnIDlvozjgavoqK3lrprjgZXjgozjgZ/ph43jgb9cblxuICBwdWJsaWMgX21vdGlvbkRhdGE6IEN1YmlzbU1vdGlvbkRhdGE7IC8vIOWun+mam+OBruODouODvOOCt+ODp+ODs+ODh+ODvOOCv+acrOS9k1xuXG4gIHB1YmxpYyBfZXllQmxpbmtQYXJhbWV0ZXJJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOiHquWLleOBvuOBsOOBn+OBjeOCkumBqeeUqOOBmeOCi+ODkeODqeODoeODvOOCv0lE44OP44Oz44OJ44Or44Gu44Oq44K544OI44CCICDjg6Ljg4fjg6vvvIjjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDvvInjgajjg5Hjg6njg6Hjg7zjgr/jgpLlr77lv5zku5jjgZHjgovjgIJcbiAgcHVibGljIF9saXBTeW5jUGFyYW1ldGVySWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDjg6rjg4Pjg5fjgrfjg7Pjgq/jgpLpgannlKjjgZnjgovjg5Hjg6njg6Hjg7zjgr9JROODj+ODs+ODieODq+OBruODquOCueODiOOAgiAg44Oi44OH44Or77yI44Oi44OH44Or44K744OD44OG44Kj44Oz44Kw77yJ44Go44OR44Op44Oh44O844K/44KS5a++5b+c5LuY44GR44KL44CCXG5cbiAgcHVibGljIF9tb2RlbEN1cnZlSWRFeWVCbGluazogQ3ViaXNtSWRIYW5kbGU7IC8vIOODouODh+ODq+OBjOaMgeOBpOiHquWLleOBvuOBsOOBn+OBjeeUqOODkeODqeODoeODvOOCv0lE44Gu44OP44Oz44OJ44Or44CCICDjg6Ljg4fjg6vjgajjg6Ljg7zjgrfjg6fjg7PjgpLlr77lv5zku5jjgZHjgovjgIJcbiAgcHVibGljIF9tb2RlbEN1cnZlSWRMaXBTeW5jOiBDdWJpc21JZEhhbmRsZTsgLy8g44Oi44OH44Or44GM5oyB44Gk44Oq44OD44OX44K344Oz44Kv55So44OR44Op44Oh44O844K/SUTjga7jg4/jg7Pjg4njg6vjgIIgIOODouODh+ODq+OBqOODouODvOOCt+ODp+ODs+OCkuWvvuW/nOS7mOOBkeOCi+OAglxufVxuXG4vLyBOYW1lc3BhY2UgZGVmaW5pdGlvbiBmb3IgY29tcGF0aWJpbGl0eS5cbmltcG9ydCAqIGFzICQgZnJvbSAnLi9jdWJpc21tb3Rpb24nO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIHtcbiAgZXhwb3J0IGNvbnN0IEN1YmlzbU1vdGlvbiA9ICQuQ3ViaXNtTW90aW9uO1xuICBleHBvcnQgdHlwZSBDdWJpc21Nb3Rpb24gPSAkLkN1YmlzbU1vdGlvbjtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCI3OGIwYWU4OGZiZTBhMmRiZmQwNVwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9