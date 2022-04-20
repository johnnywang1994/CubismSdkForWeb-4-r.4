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
    quality: 2,
    resourcesPath: '../../Resources/',
    modelDir: ['https://github.com/Eikanya/Live2d-model/tree/master/BanG%20Dream!/asneeded/live2d/chara/001/001_live_event_01_sr'],
    bindFullscreen: true
}), onload = _a.onload, onbeforeunload = _a.onbeforeunload, onresize = _a.onresize, setScale = _a.setScale;
window.onload = onload;
window.onbeforeunload = onbeforeunload;
window.onresize = onresize;
setTimeout(function () {
}, 6000);
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
    var setScale = function (scaleSize) {
        lappdelegate_1.LAppDelegate.getInstance().scaleView(scaleSize);
    };
    return {
        onload: onload,
        onbeforeunload: onbeforeunload,
        onresize: onresize,
        setScale: setScale
    };
}
exports["default"] = initLive2d;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "2ff739f58ad08ed28d53"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43Njg1ODI5ZGYyNDVjODhhYTZkNC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUFpRCxVQUFVLENBQUM7SUFDaEUsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxDQUFDO0lBQ1YsYUFBYSxFQUFFLGtCQUFrQjtJQUNqQyxRQUFRLEVBQUUsQ0FBQyxrSEFBa0gsQ0FBQztJQUM5SCxjQUFjLEVBQUUsSUFBSTtDQUNyQixDQUFDLEVBUE0sTUFBTSxjQUFFLGNBQWMsc0JBQUUsUUFBUSxnQkFBRSxRQUFRLGNBT2hELENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN2QixNQUFNLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN2QyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixVQUFVLENBQUM7QUFFWCxDQUFDLEVBQUUsSUFBSSxDQUFDO0FBRVIsU0FBd0IsVUFBVSxDQUFDLE9BQU87SUFDeEMsMkJBQVUsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUlwQixJQUFNLE1BQU0sR0FBRztRQUViLElBQUksMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFO1lBQzNELE9BQU87U0FDUjtRQUVELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBS0YsSUFBTSxjQUFjLEdBQUcsY0FBWSxrQ0FBWSxDQUFDLGVBQWUsRUFBRSxFQUE5QixDQUE4QixDQUFDO0lBS2xFLElBQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUMzQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsSUFBTSxRQUFRLEdBQUcsVUFBQyxTQUFpQjtRQUNqQywyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU07UUFDTixjQUFjO1FBQ2QsUUFBUTtRQUNSLFFBQVE7S0FDVDtBQUNILENBQUM7QUF0Q0QsZ0NBc0NDOzs7Ozs7Ozs7VUNqRUQscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTGl2ZTJkLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vTGl2ZTJkL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgeyBpbml0Q29uZmlnIH0gZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuY29uc3QgeyBvbmxvYWQsIG9uYmVmb3JldW5sb2FkLCBvbnJlc2l6ZSwgc2V0U2NhbGUgfSA9IGluaXRMaXZlMmQoe1xuICBlbDogJyNoaXlvcmknLFxuICBzaXplOiAnc2NyZWVuJyxcbiAgcXVhbGl0eTogMixcbiAgcmVzb3VyY2VzUGF0aDogJy4uLy4uL1Jlc291cmNlcy8nLFxuICBtb2RlbERpcjogWydodHRwczovL2dpdGh1Yi5jb20vRWlrYW55YS9MaXZlMmQtbW9kZWwvdHJlZS9tYXN0ZXIvQmFuRyUyMERyZWFtIS9hc25lZWRlZC9saXZlMmQvY2hhcmEvMDAxLzAwMV9saXZlX2V2ZW50XzAxX3NyJ10sXG4gIGJpbmRGdWxsc2NyZWVuOiB0cnVlXG59KTtcblxud2luZG93Lm9ubG9hZCA9IG9ubG9hZDtcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IG9uYmVmb3JldW5sb2FkO1xud2luZG93Lm9ucmVzaXplID0gb25yZXNpemU7XG5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICAvLyBzZXRTY2FsZSgzKVxufSwgNjAwMClcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdExpdmUyZChvcHRpb25zKSB7XG4gIGluaXRDb25maWcob3B0aW9ucyk7XG4gIC8qKlxuICAgKiDjg5bjg6njgqbjgrbjg63jg7zjg4nlvozjga7lh6bnkIZcbiAgICovXG4gIGNvbnN0IG9ubG9hZCA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBjcmVhdGUgdGhlIGFwcGxpY2F0aW9uIGluc3RhbmNlXG4gICAgaWYgKExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLmluaXRpYWxpemUob3B0aW9ucykgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5ydW4oKTtcbiAgfTtcblxuICAvKipcbiAgICog57WC5LqG5pmC44Gu5Yem55CGXG4gICAqL1xuICBjb25zdCBvbmJlZm9yZXVubG9hZCA9ICgpOiB2b2lkID0+IExBcHBEZWxlZ2F0ZS5yZWxlYXNlSW5zdGFuY2UoKTtcblxuICAvKipcbiAgICogUHJvY2VzcyB3aGVuIGNoYW5naW5nIHNjcmVlbiBzaXplLlxuICAgKi9cbiAgY29uc3Qgb25yZXNpemUgPSAoKSA9PiB7XG4gICAgaWYgKG9wdGlvbnMuc2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5vblJlc2l6ZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRTY2FsZSA9IChzY2FsZVNpemU6IG51bWJlcikgPT4ge1xuICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnNjYWxlVmlldyhzY2FsZVNpemUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvbmxvYWQsXG4gICAgb25iZWZvcmV1bmxvYWQsXG4gICAgb25yZXNpemUsXG4gICAgc2V0U2NhbGVcbiAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjJmZjczOWY1OGFkMDhlZDI4ZDUzXCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=