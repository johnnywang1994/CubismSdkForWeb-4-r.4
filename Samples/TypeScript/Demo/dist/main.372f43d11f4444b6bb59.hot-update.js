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
    modelDir: ['Fn57_2203'],
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
/******/ 	__webpack_require__.h = function() { return "7f868fb5885374b39215"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zNzJmNDNkMTFmNDQ0NGI2YmI1OS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUF1QyxVQUFVLENBQUM7SUFDdEQsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLGFBQWEsRUFBRSxrQkFBa0I7SUFDakMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQ3ZCLGNBQWMsRUFBRSxJQUFJO0NBQ3JCLENBQUMsRUFOTSxNQUFNLGNBQUUsY0FBYyxzQkFBRSxRQUFRLGNBTXRDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN2QixNQUFNLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN2QyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixTQUF3QixVQUFVLENBQUMsT0FBTztJQUN4QywyQkFBVSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBSXBCLElBQU0sTUFBTSxHQUFHO1FBRWIsSUFBSSwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDM0QsT0FBTztTQUNSO1FBRUQsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFLRixJQUFNLGNBQWMsR0FBRyxjQUFZLGtDQUFZLENBQUMsZUFBZSxFQUFFLEVBQTlCLENBQThCLENBQUM7SUFLbEUsSUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQzNCLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDLENBQUM7SUFFRixPQUFPO1FBQ0wsTUFBTTtRQUNOLGNBQWM7UUFDZCxRQUFRO0tBQ1Q7QUFDSCxDQUFDO0FBakNELGdDQWlDQzs7Ozs7Ozs7O1VDdkRELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgaW5pdENvbmZpZyB9IGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmNvbnN0IHsgb25sb2FkLCBvbmJlZm9yZXVubG9hZCwgb25yZXNpemUgfSA9IGluaXRMaXZlMmQoe1xuICBlbDogJyNoaXlvcmknLFxuICBzaXplOiAnc2NyZWVuJyxcbiAgcmVzb3VyY2VzUGF0aDogJy4uLy4uL1Jlc291cmNlcy8nLFxuICBtb2RlbERpcjogWydGbjU3XzIyMDMnXSxcbiAgYmluZEZ1bGxzY3JlZW46IHRydWVcbn0pO1xuXG53aW5kb3cub25sb2FkID0gb25sb2FkO1xud2luZG93Lm9uYmVmb3JldW5sb2FkID0gb25iZWZvcmV1bmxvYWQ7XG53aW5kb3cub25yZXNpemUgPSBvbnJlc2l6ZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdExpdmUyZChvcHRpb25zKSB7XG4gIGluaXRDb25maWcob3B0aW9ucyk7XG4gIC8qKlxuICAgKiDjg5bjg6njgqbjgrbjg63jg7zjg4nlvozjga7lh6bnkIZcbiAgICovXG4gIGNvbnN0IG9ubG9hZCA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBjcmVhdGUgdGhlIGFwcGxpY2F0aW9uIGluc3RhbmNlXG4gICAgaWYgKExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLmluaXRpYWxpemUob3B0aW9ucykgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5ydW4oKTtcbiAgfTtcblxuICAvKipcbiAgICog57WC5LqG5pmC44Gu5Yem55CGXG4gICAqL1xuICBjb25zdCBvbmJlZm9yZXVubG9hZCA9ICgpOiB2b2lkID0+IExBcHBEZWxlZ2F0ZS5yZWxlYXNlSW5zdGFuY2UoKTtcblxuICAvKipcbiAgICogUHJvY2VzcyB3aGVuIGNoYW5naW5nIHNjcmVlbiBzaXplLlxuICAgKi9cbiAgY29uc3Qgb25yZXNpemUgPSAoKSA9PiB7XG4gICAgaWYgKG9wdGlvbnMuc2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5vblJlc2l6ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG9ubG9hZCxcbiAgICBvbmJlZm9yZXVubG9hZCxcbiAgICBvbnJlc2l6ZVxuICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiN2Y4NjhmYjU4ODUzNzRiMzkyMTVcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==