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
    resourcesPath: 'https://github.com/Eikanya/Live2d-model/tree/master/%E5%B0%91%E5%A5%B3%E5%89%8D%E7%BA%BF%20girls%20Frontline/live2dnew/88type_5308/',
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
/******/ 	__webpack_require__.h = function() { return "ee976569b206c2116601"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yODdhN2VlOGI0NzJiMzI3MWYzNC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0Esd0ZBQThDO0FBQzlDLGtGQUEwQztBQUVwQyxTQUF1QyxVQUFVLENBQUM7SUFDdEQsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLGFBQWEsRUFBRSxrQkFBa0I7SUFDakMsYUFBYSxFQUFFLHFJQUFxSTtJQUNwSixRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDcEIsY0FBYyxFQUFFLElBQUk7Q0FDckIsQ0FBQyxFQVBNLE1BQU0sY0FBRSxjQUFjLHNCQUFFLFFBQVEsY0FPdEMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBRTNCLFNBQXdCLFVBQVUsQ0FBQyxPQUFPO0lBQ3hDLDJCQUFVLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFJcEIsSUFBTSxNQUFNLEdBQUc7UUFFYixJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUMzRCxPQUFPO1NBQ1I7UUFFRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUtGLElBQU0sY0FBYyxHQUFHLGNBQVksa0NBQVksQ0FBQyxlQUFlLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQztJQUtsRSxJQUFNLFFBQVEsR0FBRztRQUNmLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUMsQ0FBQztJQUVGLE9BQU87UUFDTCxNQUFNO1FBQ04sY0FBYztRQUNkLFFBQVE7S0FDVDtBQUNILENBQUM7QUFqQ0QsZ0NBaUNDOzs7Ozs7Ozs7VUN4REQscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTGl2ZTJkLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vTGl2ZTJkL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgeyBpbml0Q29uZmlnIH0gZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuY29uc3QgeyBvbmxvYWQsIG9uYmVmb3JldW5sb2FkLCBvbnJlc2l6ZSB9ID0gaW5pdExpdmUyZCh7XG4gIGVsOiAnI2hpeW9yaScsXG4gIHNpemU6ICdzY3JlZW4nLFxuICByZXNvdXJjZXNQYXRoOiAnLi4vLi4vUmVzb3VyY2VzLycsXG4gIHJlc291cmNlc1BhdGg6ICdodHRwczovL2dpdGh1Yi5jb20vRWlrYW55YS9MaXZlMmQtbW9kZWwvdHJlZS9tYXN0ZXIvJUU1JUIwJTkxJUU1JUE1JUIzJUU1JTg5JThEJUU3JUJBJUJGJTIwZ2lybHMlMjBGcm9udGxpbmUvbGl2ZTJkbmV3Lzg4dHlwZV81MzA4LycsXG4gIG1vZGVsRGlyOiBbJ25vcm1hbCddLFxuICBiaW5kRnVsbHNjcmVlbjogdHJ1ZVxufSk7XG5cbndpbmRvdy5vbmxvYWQgPSBvbmxvYWQ7XG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSBvbmJlZm9yZXVubG9hZDtcbndpbmRvdy5vbnJlc2l6ZSA9IG9ucmVzaXplO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TGl2ZTJkKG9wdGlvbnMpIHtcbiAgaW5pdENvbmZpZyhvcHRpb25zKTtcbiAgLyoqXG4gICAqIOODluODqeOCpuOCtuODreODvOODieW+jOOBruWHpueQhlxuICAgKi9cbiAgY29uc3Qgb25sb2FkID0gKCk6IHZvaWQgPT4ge1xuICAgIC8vIGNyZWF0ZSB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZShvcHRpb25zKSA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnJ1bigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiDntYLkuobmmYLjga7lh6bnkIZcbiAgICovXG4gIGNvbnN0IG9uYmVmb3JldW5sb2FkID0gKCk6IHZvaWQgPT4gTEFwcERlbGVnYXRlLnJlbGVhc2VJbnN0YW5jZSgpO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHdoZW4gY2hhbmdpbmcgc2NyZWVuIHNpemUuXG4gICAqL1xuICBjb25zdCBvbnJlc2l6ZSA9ICgpID0+IHtcbiAgICBpZiAob3B0aW9ucy5zaXplID09PSAnYXV0bycpIHtcbiAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLm9uUmVzaXplKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb25sb2FkLFxuICAgIG9uYmVmb3JldW5sb2FkLFxuICAgIG9ucmVzaXplXG4gIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJlZTk3NjU2OWIyMDZjMjExNjYwMVwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9