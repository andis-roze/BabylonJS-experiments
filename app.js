/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Application = void 0;
var engine_1 = __webpack_require__(/*! @babylonjs/core/Engines/engine */ "./node_modules/@babylonjs/core/Engines/engine.js");
var scene_1 = __webpack_require__(/*! @babylonjs/core/scene */ "./node_modules/@babylonjs/core/scene.js");
var universalCamera_1 = __webpack_require__(/*! @babylonjs/core/Cameras/universalCamera */ "./node_modules/@babylonjs/core/Cameras/universalCamera.js");
var math_1 = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
var planeBuilder_1 = __webpack_require__(/*! @babylonjs/core/Meshes/Builders/planeBuilder */ "./node_modules/@babylonjs/core/Meshes/Builders/planeBuilder.js");
var standardMaterial_1 = __webpack_require__(/*! @babylonjs/core/Materials/standardMaterial */ "./node_modules/@babylonjs/core/Materials/standardMaterial.js");
var texture_1 = __webpack_require__(/*! @babylonjs/core/Materials/Textures/texture */ "./node_modules/@babylonjs/core/Materials/Textures/texture.js");
var advancedDynamicTexture_1 = __webpack_require__(/*! @babylonjs/gui/2D/advancedDynamicTexture */ "./node_modules/@babylonjs/gui/2D/advancedDynamicTexture.js");
var button_1 = __webpack_require__(/*! @babylonjs/gui/2D/controls/button */ "./node_modules/@babylonjs/gui/2D/controls/button.js");
var textBlock_1 = __webpack_require__(/*! @babylonjs/gui/2D/controls/textBlock */ "./node_modules/@babylonjs/gui/2D/controls/textBlock.js");
var Application = /** @class */ (function () {
    function Application(canvas) {
        var _this = this;
        this.renderWidth = 0;
        this.renderHeight = 0;
        this.currentMouseX = 0;
        this.onMouseMove = function (e) {
            _this.currentMouseX = e.clientX;
        };
        this.onMouseOut = function (e) {
            _this.currentMouseX = _this.renderWidth / 2;
        };
        this.onTouchMove = function (e) {
            if (e.touches && e.touches.length) {
                _this.currentMouseX = e.touches[0].clientX;
            }
        };
        this.onTouchEnd = function (e) {
            if (e.touches && e.touches.length) {
                _this.currentMouseX = _this.renderWidth / 2;
            }
        };
        if (!engine_1.Engine.isSupported) {
            throw new Error("Not supported!");
        }
        this.canvas = canvas;
        this.engine = new engine_1.Engine(this.canvas, true);
        this.scene = new scene_1.Scene(this.engine);
        this.renderWidth = this.engine.getRenderWidth();
        this.renderHeight = this.engine.getRenderHeight();
        this.currentMouseX = this.renderWidth / 2;
        this.camera = new universalCamera_1.UniversalCamera("camera", new math_1.Vector3(0, 0, -1), this.scene);
        this.camera.setTarget(math_1.Vector3.Zero());
        this.camera.mode = universalCamera_1.UniversalCamera.ORTHOGRAPHIC_CAMERA;
        this.initFps();
        this.initPlane();
        this.initOnResize();
        this.initCameraControl();
    }
    Application.prototype.initFps = function () {
        var advancedDynamicTexture = advancedDynamicTexture_1.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var button = new button_1.Button();
        this.fpsText = new textBlock_1.TextBlock();
        this.fpsText.text = Math.floor(this.engine.getFps()) + " FPS";
        this.fpsText.color = "black";
        this.fpsText.fontSize = 18;
        button.background = "white";
        button.color = "orange";
        button.widthInPixels = 65;
        button.heightInPixels = 20;
        button.isHitTestVisible = false;
        button.horizontalAlignment = button_1.Button.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = button_1.Button.VERTICAL_ALIGNMENT_TOP;
        button.addControl(this.fpsText);
        advancedDynamicTexture.addControl(button);
    };
    Application.prototype.initPlane = function () {
        var _this = this;
        var texture = new texture_1.Texture("./assets/meadow.jpg", this.scene);
        texture_1.Texture.WhenAllReady([texture], function () {
            var _a = texture.getSize(), textureWidth = _a.width, textureHeight = _a.height;
            var ratio = textureWidth / textureHeight;
            var standardMaterial = new standardMaterial_1.StandardMaterial("planeMaterial", _this.scene);
            _this.planeWidth = _this.renderHeight * ratio;
            _this.plane = planeBuilder_1.PlaneBuilder.CreatePlane("plane", { width: _this.planeWidth, height: _this.renderHeight }, _this.scene);
            standardMaterial.emissiveTexture = texture;
            _this.plane.material = standardMaterial;
        });
    };
    Application.prototype.initOnResize = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            var prevRenderHeight = _this.engine.getRenderHeight();
            _this.engine.resize();
            var currentRenderHeight = _this.engine.getRenderHeight();
            var scale = currentRenderHeight / prevRenderHeight;
            _this.renderWidth = _this.engine.getRenderWidth();
            _this.renderHeight = currentRenderHeight;
            _this.currentMouseX = _this.renderWidth / 2;
            _this.planeWidth *= scale;
            _this.camera.position.x *= scale;
            _this.plane.scaling = _this.plane.scaling.multiplyByFloats(scale, scale, 1);
        });
    };
    Application.prototype.initCameraControl = function () {
        this.canvas.onmousemove = this.onMouseMove;
        this.canvas.onmouseout = this.onMouseOut;
        this.canvas.ontouchmove = this.onTouchMove;
        this.canvas.ontouchend = this.onTouchEnd;
    };
    Application.prototype.moveCamera = function () {
        var relativeMouseX = this.currentMouseX / this.renderWidth;
        var maxSpeed = 10;
        var leftBoundary = 0.45;
        var rightBoundary = 0.55;
        if (relativeMouseX < leftBoundary && this.camera.position.x > -this.planeWidth / 2 + this.renderWidth / 2) {
            this.camera.position.x += maxSpeed * (leftBoundary - relativeMouseX) / -leftBoundary;
        }
        if (relativeMouseX > rightBoundary && this.camera.position.x < this.planeWidth / 2 - this.renderWidth / 2) {
            this.camera.position.x += maxSpeed * (relativeMouseX - rightBoundary) / rightBoundary;
        }
    };
    Application.prototype.render = function () {
        var _this = this;
        this.engine.runRenderLoop(function () {
            _this.fpsText.text = Math.floor(_this.engine.getFps()) + " FPS";
            _this.scene.render();
            _this.moveCamera();
        });
    };
    return Application;
}());
exports.Application = Application;
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        var canvas = document.getElementById("canvas");
        var application = new Application(canvas);
        application.render();
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbabylonjs_experiments"] = self["webpackChunkbabylonjs_experiments"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map