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
    modelDir: ['xco03xco035_013_01'],
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
/******/ 	__webpack_require__.h = function() { return "2724458cc64db83b7a4b"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iNDM2ZmFkNWM4YjJhYjZhMDUyNi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUFpRCxVQUFVLENBQUM7SUFDaEUsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxDQUFDO0lBQ1YsYUFBYSxFQUFFLGtCQUFrQjtJQUNqQyxRQUFRLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNoQyxjQUFjLEVBQUUsSUFBSTtDQUNyQixDQUFDLEVBUE0sTUFBTSxjQUFFLGNBQWMsc0JBQUUsUUFBUSxnQkFBRSxRQUFRLGNBT2hELENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN2QixNQUFNLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN2QyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixVQUFVLENBQUM7QUFFWCxDQUFDLEVBQUUsSUFBSSxDQUFDO0FBRVIsU0FBd0IsVUFBVSxDQUFDLE9BQU87SUFDeEMsMkJBQVUsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUlwQixJQUFNLE1BQU0sR0FBRztRQUViLElBQUksMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFO1lBQzNELE9BQU87U0FDUjtRQUVELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBS0YsSUFBTSxjQUFjLEdBQUcsY0FBWSxrQ0FBWSxDQUFDLGVBQWUsRUFBRSxFQUE5QixDQUE4QixDQUFDO0lBS2xFLElBQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUMzQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsSUFBTSxRQUFRLEdBQUcsVUFBQyxTQUFpQjtRQUNqQywyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU07UUFDTixjQUFjO1FBQ2QsUUFBUTtRQUNSLFFBQVE7S0FDVDtBQUNILENBQUM7QUF0Q0QsZ0NBc0NDOzs7Ozs7Ozs7VUNqRUQscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTGl2ZTJkLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vTGl2ZTJkL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgeyBpbml0Q29uZmlnIH0gZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuY29uc3QgeyBvbmxvYWQsIG9uYmVmb3JldW5sb2FkLCBvbnJlc2l6ZSwgc2V0U2NhbGUgfSA9IGluaXRMaXZlMmQoe1xuICBlbDogJyNoaXlvcmknLFxuICBzaXplOiAnc2NyZWVuJyxcbiAgcXVhbGl0eTogMixcbiAgcmVzb3VyY2VzUGF0aDogJy4uLy4uL1Jlc291cmNlcy8nLFxuICBtb2RlbERpcjogWyd4Y28wM3hjbzAzNV8wMTNfMDEnXSxcbiAgYmluZEZ1bGxzY3JlZW46IHRydWVcbn0pO1xuXG53aW5kb3cub25sb2FkID0gb25sb2FkO1xud2luZG93Lm9uYmVmb3JldW5sb2FkID0gb25iZWZvcmV1bmxvYWQ7XG53aW5kb3cub25yZXNpemUgPSBvbnJlc2l6ZTtcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vIHNldFNjYWxlKDMpXG59LCA2MDAwKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TGl2ZTJkKG9wdGlvbnMpIHtcbiAgaW5pdENvbmZpZyhvcHRpb25zKTtcbiAgLyoqXG4gICAqIOODluODqeOCpuOCtuODreODvOODieW+jOOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25sb2FkID0gKCk6IHZvaWQgPT4ge1xuICAgIC8vIGNyZWF0ZSB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZShvcHRpb25zKSA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnJ1bigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiDntYLkuobmmYLjga7lh6bnkIZcbiAgICovXG4gIGNvbnN0IG9uYmVmb3JldW5sb2FkID0gKCk6IHZvaWQgPT4gTEFwcERlbGVnYXRlLnJlbGVhc2VJbnN0YW5jZSgpO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHdoZW4gY2hhbmdpbmcgc2NyZWVuIHNpemUuXG4gICAqL1xuICBjb25zdCBvbnJlc2l6ZSA9ICgpID0+IHtcbiAgICBpZiAob3B0aW9ucy5zaXplID09PSAnYXV0bycpIHtcbiAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLm9uUmVzaXplKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldFNjYWxlID0gKHNjYWxlU2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuc2NhbGVWaWV3KHNjYWxlU2l6ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9ubG9hZCxcbiAgICBvbmJlZm9yZXVubG9hZCxcbiAgICBvbnJlc2l6ZSxcbiAgICBzZXRTY2FsZVxuICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiMjcyNDQ1OGNjNjRkYjgzYjdhNGJcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==