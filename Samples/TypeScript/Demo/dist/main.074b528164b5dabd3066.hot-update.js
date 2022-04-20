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
    modelDir: ['xch004a_01'],
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
/******/ 	__webpack_require__.h = function() { return "ad68e2f69c3dfa2a3367"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wNzRiNTI4MTY0YjVkYWJkMzA2Ni5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUFpRCxVQUFVLENBQUM7SUFDaEUsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxDQUFDO0lBQ1YsYUFBYSxFQUFFLGtCQUFrQjtJQUNqQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDeEIsY0FBYyxFQUFFLElBQUk7Q0FDckIsQ0FBQyxFQVBNLE1BQU0sY0FBRSxjQUFjLHNCQUFFLFFBQVEsZ0JBQUUsUUFBUSxjQU9oRCxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDdkIsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDdkMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFFM0IsVUFBVSxDQUFDO0FBRVgsQ0FBQyxFQUFFLElBQUksQ0FBQztBQUVSLFNBQXdCLFVBQVUsQ0FBQyxPQUFPO0lBQ3hDLDJCQUFVLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFJcEIsSUFBTSxNQUFNLEdBQUc7UUFFYixJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUMzRCxPQUFPO1NBQ1I7UUFFRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUtGLElBQU0sY0FBYyxHQUFHLGNBQVksa0NBQVksQ0FBQyxlQUFlLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQztJQUtsRSxJQUFNLFFBQVEsR0FBRztRQUNmLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUMsQ0FBQztJQUVGLElBQU0sUUFBUSxHQUFHLFVBQUMsU0FBaUI7UUFDakMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNO1FBQ04sY0FBYztRQUNkLFFBQVE7UUFDUixRQUFRO0tBQ1Q7QUFDSCxDQUFDO0FBdENELGdDQXNDQzs7Ozs7Ozs7O1VDakVELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL0xpdmUyZC8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0xpdmUyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgaW5pdENvbmZpZyB9IGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmNvbnN0IHsgb25sb2FkLCBvbmJlZm9yZXVubG9hZCwgb25yZXNpemUsIHNldFNjYWxlIH0gPSBpbml0TGl2ZTJkKHtcbiAgZWw6ICcjaGl5b3JpJyxcbiAgc2l6ZTogJ3NjcmVlbicsXG4gIHF1YWxpdHk6IDIsXG4gIHJlc291cmNlc1BhdGg6ICcuLi8uLi9SZXNvdXJjZXMvJyxcbiAgbW9kZWxEaXI6IFsneGNoMDA0YV8wMSddLFxuICBiaW5kRnVsbHNjcmVlbjogdHJ1ZVxufSk7XG5cbndpbmRvdy5vbmxvYWQgPSBvbmxvYWQ7XG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSBvbmJlZm9yZXVubG9hZDtcbndpbmRvdy5vbnJlc2l6ZSA9IG9ucmVzaXplO1xuXG5zZXRUaW1lb3V0KCgpID0+IHtcbiAgLy8gc2V0U2NhbGUoMylcbn0sIDYwMDApXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRMaXZlMmQob3B0aW9ucykge1xuICBpbml0Q29uZmlnKG9wdGlvbnMpO1xuICAvKipcbiAgICog44OW44Op44Km44K244Ot44O844OJ5b6M44Gu5Yem55CGXG4gICAqL1xuICBjb25zdCBvbmxvYWQgPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gY3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZVxuICAgIGlmIChMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5pbml0aWFsaXplKG9wdGlvbnMpID09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkucnVuKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOe1guS6huaZguOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25iZWZvcmV1bmxvYWQgPSAoKTogdm9pZCA9PiBMQXBwRGVsZWdhdGUucmVsZWFzZUluc3RhbmNlKCk7XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgd2hlbiBjaGFuZ2luZyBzY3JlZW4gc2l6ZS5cbiAgICovXG4gIGNvbnN0IG9ucmVzaXplID0gKCkgPT4ge1xuICAgIGlmIChvcHRpb25zLnNpemUgPT09ICdhdXRvJykge1xuICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkub25SZXNpemUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0U2NhbGUgPSAoc2NhbGVTaXplOiBudW1iZXIpID0+IHtcbiAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5zY2FsZVZpZXcoc2NhbGVTaXplKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb25sb2FkLFxuICAgIG9uYmVmb3JldW5sb2FkLFxuICAgIG9ucmVzaXplLFxuICAgIHNldFNjYWxlXG4gIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJhZDY4ZTJmNjljM2RmYTJhMzM2N1wiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9