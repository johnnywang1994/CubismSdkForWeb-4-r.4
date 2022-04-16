"use strict";
self["webpackHotUpdateLive2d"]("main",{

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lappdefine_1 = __webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts");
var _a = initLive2d({
    el: '#hiyori',
    size: 'screen',
    resourcesPath: '../../Resources/',
    modelDir: ['LiveroiD_A-Y01'],
    bindFullscreen: true
}), onload = _a.onload, onbeforeunload = _a.onbeforeunload, onresize = _a.onresize;
window.onload = onload;
window.onbeforeunload = onbeforeunload;
window.onresize = onresize;
function initLive2d(options) {
    (0, lappdefine_1.initConfig)(options);
    var onload = function () {
        if (lappdelegate_1.LAppDelegate.getInstance().initialize(options) == false) {
            return;
        }
        lappdelegate_1.LAppDelegate.getInstance().run();
    };
    var onbeforeunload = function () { return lappdelegate_1.LAppDelegate.releaseInstance(); };
    var onresize = function () {
        if (options.size === 'auto') {
            lappdelegate_1.LAppDelegate.getInstance().onResize();
        }
    };
    return {
        onload: onload,
        onbeforeunload: onbeforeunload,
        onresize: onresize
    };
}
exports["default"] = initLive2d;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "0159e3a37a5901e02982"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yYzcyMDE4MjI1NmJiN2RhNzQ1MC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUF1QyxVQUFVLENBQUM7SUFDdEQsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLGFBQWEsRUFBRSxrQkFBa0I7SUFDakMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDNUIsY0FBYyxFQUFFLElBQUk7Q0FDckIsQ0FBQyxFQU5NLE1BQU0sY0FBRSxjQUFjLHNCQUFFLFFBQVEsY0FNdEMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBRTNCLFNBQXdCLFVBQVUsQ0FBQyxPQUFPO0lBQ3hDLDJCQUFVLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFJcEIsSUFBTSxNQUFNLEdBQUc7UUFFYixJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUMzRCxPQUFPO1NBQ1I7UUFFRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUtGLElBQU0sY0FBYyxHQUFHLGNBQVksa0NBQVksQ0FBQyxlQUFlLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQztJQUtsRSxJQUFNLFFBQVEsR0FBRztRQUNmLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUMsQ0FBQztJQUVGLE9BQU87UUFDTCxNQUFNO1FBQ04sY0FBYztRQUNkLFFBQVE7S0FDVDtBQUNILENBQUM7QUFqQ0QsZ0NBaUNDOzs7Ozs7Ozs7VUN2REQscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTGl2ZTJkLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vTGl2ZTJkL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgeyBpbml0Q29uZmlnIH0gZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuY29uc3QgeyBvbmxvYWQsIG9uYmVmb3JldW5sb2FkLCBvbnJlc2l6ZSB9ID0gaW5pdExpdmUyZCh7XG4gIGVsOiAnI2hpeW9yaScsXG4gIHNpemU6ICdzY3JlZW4nLFxuICByZXNvdXJjZXNQYXRoOiAnLi4vLi4vUmVzb3VyY2VzLycsXG4gIG1vZGVsRGlyOiBbJ0xpdmVyb2lEX0EtWTAxJ10sXG4gIGJpbmRGdWxsc2NyZWVuOiB0cnVlXG59KTtcblxud2luZG93Lm9ubG9hZCA9IG9ubG9hZDtcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IG9uYmVmb3JldW5sb2FkO1xud2luZG93Lm9ucmVzaXplID0gb25yZXNpemU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRMaXZlMmQob3B0aW9ucykge1xuICBpbml0Q29uZmlnKG9wdGlvbnMpO1xuICAvKipcbiAgICog44OW44Op44Km44K244Ot44O844OJ5b6M44Gu5Yem55CGXG4gICAqL1xuICBjb25zdCBvbmxvYWQgPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gY3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZVxuICAgIGlmIChMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5pbml0aWFsaXplKG9wdGlvbnMpID09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkucnVuKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOe1guS6huaZguOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25iZWZvcmV1bmxvYWQgPSAoKTogdm9pZCA9PiBMQXBwRGVsZWdhdGUucmVsZWFzZUluc3RhbmNlKCk7XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgd2hlbiBjaGFuZ2luZyBzY3JlZW4gc2l6ZS5cbiAgICovXG4gIGNvbnN0IG9ucmVzaXplID0gKCkgPT4ge1xuICAgIGlmIChvcHRpb25zLnNpemUgPT09ICdhdXRvJykge1xuICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkub25SZXNpemUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBvbmxvYWQsXG4gICAgb25iZWZvcmV1bmxvYWQsXG4gICAgb25yZXNpemVcbiAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjAxNTllM2EzN2E1OTAxZTAyOTgyXCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=