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
    modelDir: ['normal'],
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
/******/ 	__webpack_require__.h = function() { return "1596aeab64cf5db32968"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iMmQ1N2M0NDZkNGUxZmFiNzhlZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUF1QyxVQUFVLENBQUM7SUFDdEQsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUVkLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNwQixjQUFjLEVBQUUsSUFBSTtDQUNyQixDQUFDLEVBTk0sTUFBTSxjQUFFLGNBQWMsc0JBQUUsUUFBUSxjQU10QyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDdkIsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDdkMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFFM0IsU0FBd0IsVUFBVSxDQUFDLE9BQU87SUFDeEMsMkJBQVUsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUlwQixJQUFNLE1BQU0sR0FBRztRQUViLElBQUksMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFO1lBQzNELE9BQU87U0FDUjtRQUVELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBS0YsSUFBTSxjQUFjLEdBQUcsY0FBWSxrQ0FBWSxDQUFDLGVBQWUsRUFBRSxFQUE5QixDQUE4QixDQUFDO0lBS2xFLElBQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUMzQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsT0FBTztRQUNMLE1BQU07UUFDTixjQUFjO1FBQ2QsUUFBUTtLQUNUO0FBQ0gsQ0FBQztBQWpDRCxnQ0FpQ0M7Ozs7Ozs7OztVQ3ZERCxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MaXZlMmQvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9MaXZlMmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7IExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IGluaXRDb25maWcgfSBmcm9tICcuL2xhcHBkZWZpbmUnO1xuXG5jb25zdCB7IG9ubG9hZCwgb25iZWZvcmV1bmxvYWQsIG9ucmVzaXplIH0gPSBpbml0TGl2ZTJkKHtcbiAgZWw6ICcjaGl5b3JpJyxcbiAgc2l6ZTogJ3NjcmVlbicsXG4gIC8vIHJlc291cmNlc1BhdGg6ICcuLi8uLi9SZXNvdXJjZXMvJyxcbiAgbW9kZWxEaXI6IFsnbm9ybWFsJ10sXG4gIGJpbmRGdWxsc2NyZWVuOiB0cnVlXG59KTtcblxud2luZG93Lm9ubG9hZCA9IG9ubG9hZDtcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IG9uYmVmb3JldW5sb2FkO1xud2luZG93Lm9ucmVzaXplID0gb25yZXNpemU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRMaXZlMmQob3B0aW9ucykge1xuICBpbml0Q29uZmlnKG9wdGlvbnMpO1xuICAvKipcbiAgICog44OW44Op44Km44K244Ot44O844OJ5b6M44Gu5Yem55CGXG4gICAqL1xuICBjb25zdCBvbmxvYWQgPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gY3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZVxuICAgIGlmIChMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5pbml0aWFsaXplKG9wdGlvbnMpID09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkucnVuKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOe1guS6huaZguOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25iZWZvcmV1bmxvYWQgPSAoKTogdm9pZCA9PiBMQXBwRGVsZWdhdGUucmVsZWFzZUluc3RhbmNlKCk7XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgd2hlbiBjaGFuZ2luZyBzY3JlZW4gc2l6ZS5cbiAgICovXG4gIGNvbnN0IG9ucmVzaXplID0gKCkgPT4ge1xuICAgIGlmIChvcHRpb25zLnNpemUgPT09ICdhdXRvJykge1xuICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkub25SZXNpemUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBvbmxvYWQsXG4gICAgb25iZWZvcmV1bmxvYWQsXG4gICAgb25yZXNpemVcbiAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjE1OTZhZWFiNjRjZjVkYjMyOTY4XCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=