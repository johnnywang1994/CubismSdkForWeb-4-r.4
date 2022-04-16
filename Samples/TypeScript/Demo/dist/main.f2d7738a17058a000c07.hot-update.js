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
    modelDir: ['Ar15'],
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
/******/ 	__webpack_require__.h = function() { return "372f43d11f4444b6bb59"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5mMmQ3NzM4YTE3MDU4YTAwMGMwNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUF1QyxVQUFVLENBQUM7SUFDdEQsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLGFBQWEsRUFBRSxrQkFBa0I7SUFDakMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2xCLGNBQWMsRUFBRSxJQUFJO0NBQ3JCLENBQUMsRUFOTSxNQUFNLGNBQUUsY0FBYyxzQkFBRSxRQUFRLGNBTXRDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN2QixNQUFNLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN2QyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixTQUF3QixVQUFVLENBQUMsT0FBTztJQUN4QywyQkFBVSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBSXBCLElBQU0sTUFBTSxHQUFHO1FBRWIsSUFBSSwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDM0QsT0FBTztTQUNSO1FBRUQsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFLRixJQUFNLGNBQWMsR0FBRyxjQUFZLGtDQUFZLENBQUMsZUFBZSxFQUFFLEVBQTlCLENBQThCLENBQUM7SUFLbEUsSUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQzNCLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDLENBQUM7SUFFRixPQUFPO1FBQ0wsTUFBTTtRQUNOLGNBQWM7UUFDZCxRQUFRO0tBQ1Q7QUFDSCxDQUFDO0FBakNELGdDQWlDQzs7Ozs7Ozs7O1VDdkRELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgaW5pdENvbmZpZyB9IGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmNvbnN0IHsgb25sb2FkLCBvbmJlZm9yZXVubG9hZCwgb25yZXNpemUgfSA9IGluaXRMaXZlMmQoe1xuICBlbDogJyNoaXlvcmknLFxuICBzaXplOiAnc2NyZWVuJyxcbiAgcmVzb3VyY2VzUGF0aDogJy4uLy4uL1Jlc291cmNlcy8nLFxuICBtb2RlbERpcjogWydBcjE1J10sXG4gIGJpbmRGdWxsc2NyZWVuOiB0cnVlXG59KTtcblxud2luZG93Lm9ubG9hZCA9IG9ubG9hZDtcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IG9uYmVmb3JldW5sb2FkO1xud2luZG93Lm9ucmVzaXplID0gb25yZXNpemU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRMaXZlMmQob3B0aW9ucykge1xuICBpbml0Q29uZmlnKG9wdGlvbnMpO1xuICAvKipcbiAgICog44OW44Op44Km44K244Ot44O844OJ5b6M44Gu5Yem55CGXG4gICAqL1xuICBjb25zdCBvbmxvYWQgPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gY3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZVxuICAgIGlmIChMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5pbml0aWFsaXplKG9wdGlvbnMpID09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkucnVuKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOe1guS6huaZguOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25iZWZvcmV1bmxvYWQgPSAoKTogdm9pZCA9PiBMQXBwRGVsZWdhdGUucmVsZWFzZUluc3RhbmNlKCk7XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgd2hlbiBjaGFuZ2luZyBzY3JlZW4gc2l6ZS5cbiAgICovXG4gIGNvbnN0IG9ucmVzaXplID0gKCkgPT4ge1xuICAgIGlmIChvcHRpb25zLnNpemUgPT09ICdhdXRvJykge1xuICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkub25SZXNpemUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBvbmxvYWQsXG4gICAgb25iZWZvcmV1bmxvYWQsXG4gICAgb25yZXNpemVcbiAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjM3MmY0M2QxMWY0NDQ0YjZiYjU5XCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=