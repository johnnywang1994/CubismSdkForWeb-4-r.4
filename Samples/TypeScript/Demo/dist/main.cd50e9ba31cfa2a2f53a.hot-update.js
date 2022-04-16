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
    modelDir: ['G11_9'],
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
/******/ 	__webpack_require__.h = function() { return "beb83b3b94658d1244d0"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jZDUwZTliYTMxY2ZhMmEyZjUzYS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUF1QyxVQUFVLENBQUM7SUFDdEQsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLGFBQWEsRUFBRSxrQkFBa0I7SUFDakMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ25CLGNBQWMsRUFBRSxJQUFJO0NBQ3JCLENBQUMsRUFOTSxNQUFNLGNBQUUsY0FBYyxzQkFBRSxRQUFRLGNBTXRDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN2QixNQUFNLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN2QyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixTQUF3QixVQUFVLENBQUMsT0FBTztJQUN4QywyQkFBVSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBSXBCLElBQU0sTUFBTSxHQUFHO1FBRWIsSUFBSSwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDM0QsT0FBTztTQUNSO1FBRUQsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFLRixJQUFNLGNBQWMsR0FBRyxjQUFZLGtDQUFZLENBQUMsZUFBZSxFQUFFLEVBQTlCLENBQThCLENBQUM7SUFLbEUsSUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQzNCLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDLENBQUM7SUFFRixPQUFPO1FBQ0wsTUFBTTtRQUNOLGNBQWM7UUFDZCxRQUFRO0tBQ1Q7QUFDSCxDQUFDO0FBakNELGdDQWlDQzs7Ozs7Ozs7O1VDdkRELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgaW5pdENvbmZpZyB9IGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmNvbnN0IHsgb25sb2FkLCBvbmJlZm9yZXVubG9hZCwgb25yZXNpemUgfSA9IGluaXRMaXZlMmQoe1xuICBlbDogJyNoaXlvcmknLFxuICBzaXplOiAnc2NyZWVuJyxcbiAgcmVzb3VyY2VzUGF0aDogJy4uLy4uL1Jlc291cmNlcy8nLFxuICBtb2RlbERpcjogWydHMTFfOSddLFxuICBiaW5kRnVsbHNjcmVlbjogdHJ1ZVxufSk7XG5cbndpbmRvdy5vbmxvYWQgPSBvbmxvYWQ7XG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSBvbmJlZm9yZXVubG9hZDtcbndpbmRvdy5vbnJlc2l6ZSA9IG9ucmVzaXplO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TGl2ZTJkKG9wdGlvbnMpIHtcbiAgaW5pdENvbmZpZyhvcHRpb25zKTtcbiAgLyoqXG4gICAqIOODluODqeOCpuOCtuODreODvOODieW+jOOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25sb2FkID0gKCk6IHZvaWQgPT4ge1xuICAgIC8vIGNyZWF0ZSB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZShvcHRpb25zKSA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnJ1bigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiDntYLkuobmmYLjga7lh6bnkIZcbiAgICovXG4gIGNvbnN0IG9uYmVmb3JldW5sb2FkID0gKCk6IHZvaWQgPT4gTEFwcERlbGVnYXRlLnJlbGVhc2VJbnN0YW5jZSgpO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHdoZW4gY2hhbmdpbmcgc2NyZWVuIHNpemUuXG4gICAqL1xuICBjb25zdCBvbnJlc2l6ZSA9ICgpID0+IHtcbiAgICBpZiAob3B0aW9ucy5zaXplID09PSAnYXV0bycpIHtcbiAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLm9uUmVzaXplKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb25sb2FkLFxuICAgIG9uYmVmb3JldW5sb2FkLFxuICAgIG9ucmVzaXplXG4gIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJiZWI4M2IzYjk0NjU4ZDEyNDRkMFwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9