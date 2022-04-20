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
    modelDir: ['xco075_01'],
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
/******/ 	__webpack_require__.h = function() { return "948527716c1fb6aba26f"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wMjVkNzU1YTQ1Y2UzMDY0NWQ5Mi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUFpRCxVQUFVLENBQUM7SUFDaEUsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxDQUFDO0lBQ1YsYUFBYSxFQUFFLGtCQUFrQjtJQUNqQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDdkIsY0FBYyxFQUFFLElBQUk7Q0FDckIsQ0FBQyxFQVBNLE1BQU0sY0FBRSxjQUFjLHNCQUFFLFFBQVEsZ0JBQUUsUUFBUSxjQU9oRCxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDdkIsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDdkMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFFM0IsVUFBVSxDQUFDO0FBRVgsQ0FBQyxFQUFFLElBQUksQ0FBQztBQUVSLFNBQXdCLFVBQVUsQ0FBQyxPQUFPO0lBQ3hDLDJCQUFVLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFJcEIsSUFBTSxNQUFNLEdBQUc7UUFFYixJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUMzRCxPQUFPO1NBQ1I7UUFFRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUtGLElBQU0sY0FBYyxHQUFHLGNBQVksa0NBQVksQ0FBQyxlQUFlLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQztJQUtsRSxJQUFNLFFBQVEsR0FBRztRQUNmLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUMsQ0FBQztJQUVGLElBQU0sUUFBUSxHQUFHLFVBQUMsU0FBaUI7UUFDakMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNO1FBQ04sY0FBYztRQUNkLFFBQVE7UUFDUixRQUFRO0tBQ1Q7QUFDSCxDQUFDO0FBdENELGdDQXNDQzs7Ozs7Ozs7O1VDakVELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgaW5pdENvbmZpZyB9IGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmNvbnN0IHsgb25sb2FkLCBvbmJlZm9yZXVubG9hZCwgb25yZXNpemUsIHNldFNjYWxlIH0gPSBpbml0TGl2ZTJkKHtcbiAgZWw6ICcjaGl5b3JpJyxcbiAgc2l6ZTogJ3NjcmVlbicsXG4gIHF1YWxpdHk6IDIsXG4gIHJlc291cmNlc1BhdGg6ICcuLi8uLi9SZXNvdXJjZXMvJyxcbiAgbW9kZWxEaXI6IFsneGNvMDc1XzAxJ10sXG4gIGJpbmRGdWxsc2NyZWVuOiB0cnVlXG59KTtcblxud2luZG93Lm9ubG9hZCA9IG9ubG9hZDtcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IG9uYmVmb3JldW5sb2FkO1xud2luZG93Lm9ucmVzaXplID0gb25yZXNpemU7XG5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICAvLyBzZXRTY2FsZSgzKVxufSwgNjAwMClcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdExpdmUyZChvcHRpb25zKSB7XG4gIGluaXRDb25maWcob3B0aW9ucyk7XG4gIC8qKlxuICAgKiDjg5bjg6njgqbjgrbjg63jg7zjg4nlvozjga7lh6bnkIZcbiAgICovXG4gIGNvbnN0IG9ubG9hZCA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBjcmVhdGUgdGhlIGFwcGxpY2F0aW9uIGluc3RhbmNlXG4gICAgaWYgKExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLmluaXRpYWxpemUob3B0aW9ucykgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5ydW4oKTtcbiAgfTtcblxuICAvKipcbiAgICog57WC5LqG5pmC44Gu5Yem55CGXG4gICAqL1xuICBjb25zdCBvbmJlZm9yZXVubG9hZCA9ICgpOiB2b2lkID0+IExBcHBEZWxlZ2F0ZS5yZWxlYXNlSW5zdGFuY2UoKTtcblxuICAvKipcbiAgICogUHJvY2VzcyB3aGVuIGNoYW5naW5nIHNjcmVlbiBzaXplLlxuICAgKi9cbiAgY29uc3Qgb25yZXNpemUgPSAoKSA9PiB7XG4gICAgaWYgKG9wdGlvbnMuc2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5vblJlc2l6ZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRTY2FsZSA9IChzY2FsZVNpemU6IG51bWJlcikgPT4ge1xuICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnNjYWxlVmlldyhzY2FsZVNpemUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvbmxvYWQsXG4gICAgb25iZWZvcmV1bmxvYWQsXG4gICAgb25yZXNpemUsXG4gICAgc2V0U2NhbGVcbiAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjk0ODUyNzcxNmMxZmI2YWJhMjZmXCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=