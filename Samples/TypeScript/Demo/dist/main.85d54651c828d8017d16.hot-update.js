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
    modelDir: ['z46_4'],
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
/******/ 	__webpack_require__.h = function() { return "39330af94c58d796f87a"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44NWQ1NDY1MWM4MjhkODAxN2QxNi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUFpRCxVQUFVLENBQUM7SUFDaEUsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxDQUFDO0lBQ1YsYUFBYSxFQUFFLGtCQUFrQjtJQUNqQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDbkIsY0FBYyxFQUFFLElBQUk7Q0FDckIsQ0FBQyxFQVBNLE1BQU0sY0FBRSxjQUFjLHNCQUFFLFFBQVEsZ0JBQUUsUUFBUSxjQU9oRCxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDdkIsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDdkMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFFM0IsVUFBVSxDQUFDO0FBRVgsQ0FBQyxFQUFFLElBQUksQ0FBQztBQUVSLFNBQXdCLFVBQVUsQ0FBQyxPQUFPO0lBQ3hDLDJCQUFVLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFJcEIsSUFBTSxNQUFNLEdBQUc7UUFFYixJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUMzRCxPQUFPO1NBQ1I7UUFFRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUtGLElBQU0sY0FBYyxHQUFHLGNBQVksa0NBQVksQ0FBQyxlQUFlLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQztJQUtsRSxJQUFNLFFBQVEsR0FBRztRQUNmLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUMsQ0FBQztJQUVGLElBQU0sUUFBUSxHQUFHLFVBQUMsU0FBaUI7UUFDakMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNO1FBQ04sY0FBYztRQUNkLFFBQVE7UUFDUixRQUFRO0tBQ1Q7QUFDSCxDQUFDO0FBdENELGdDQXNDQzs7Ozs7Ozs7O1VDakVELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgaW5pdENvbmZpZyB9IGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmNvbnN0IHsgb25sb2FkLCBvbmJlZm9yZXVubG9hZCwgb25yZXNpemUsIHNldFNjYWxlIH0gPSBpbml0TGl2ZTJkKHtcbiAgZWw6ICcjaGl5b3JpJyxcbiAgc2l6ZTogJ3NjcmVlbicsXG4gIHF1YWxpdHk6IDIsXG4gIHJlc291cmNlc1BhdGg6ICcuLi8uLi9SZXNvdXJjZXMvJyxcbiAgbW9kZWxEaXI6IFsnejQ2XzQnXSxcbiAgYmluZEZ1bGxzY3JlZW46IHRydWVcbn0pO1xuXG53aW5kb3cub25sb2FkID0gb25sb2FkO1xud2luZG93Lm9uYmVmb3JldW5sb2FkID0gb25iZWZvcmV1bmxvYWQ7XG53aW5kb3cub25yZXNpemUgPSBvbnJlc2l6ZTtcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vIHNldFNjYWxlKDMpXG59LCA2MDAwKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TGl2ZTJkKG9wdGlvbnMpIHtcbiAgaW5pdENvbmZpZyhvcHRpb25zKTtcbiAgLyoqXG4gICAqIOODluODqeOCpuOCtuODreODvOODieW+jOOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25sb2FkID0gKCk6IHZvaWQgPT4ge1xuICAgIC8vIGNyZWF0ZSB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZShvcHRpb25zKSA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnJ1bigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiDntYLkuobmmYLjga7lh6bnkIZcbiAgICovXG4gIGNvbnN0IG9uYmVmb3JldW5sb2FkID0gKCk6IHZvaWQgPT4gTEFwcERlbGVnYXRlLnJlbGVhc2VJbnN0YW5jZSgpO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHdoZW4gY2hhbmdpbmcgc2NyZWVuIHNpemUuXG4gICAqL1xuICBjb25zdCBvbnJlc2l6ZSA9ICgpID0+IHtcbiAgICBpZiAob3B0aW9ucy5zaXplID09PSAnYXV0bycpIHtcbiAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLm9uUmVzaXplKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldFNjYWxlID0gKHNjYWxlU2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuc2NhbGVWaWV3KHNjYWxlU2l6ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9ubG9hZCxcbiAgICBvbmJlZm9yZXVubG9hZCxcbiAgICBvbnJlc2l6ZSxcbiAgICBzZXRTY2FsZVxuICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiMzkzMzBhZjk0YzU4ZDc5NmY4N2FcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==