/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _DomHelper = __webpack_require__(1);

	var _ToggleClass = __webpack_require__(2);

	var _Parallax = __webpack_require__(3);

	new _Parallax.Parallax("header", "", "video, .bg");
	new _Parallax.Parallax("section", "", ".bg");

	var hashLinks = (0, _DomHelper.$select)("[href*='#']");
	var inverted = (0, _DomHelper.$select)("section.is-inverted");
	var media = (0, _DomHelper.$select)("img, video, [style*='background-image']");
	var body = document.body;
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	body.classList.toggle("is-mobile", isMobile);

	function inView(element) {
	  var nav = document.querySelector(".nav").getBoundingClientRect();
	  var navHalf = nav.top + nav.height / 2;
	  var section = element.getBoundingClientRect();
	  return section.top < navHalf && !(section.bottom < navHalf);
	};

	media.forEach(function (e) {
	  var saved = void 0;

	  if (e.matches("[style*='background-image']")) {
	    saved = e.style.backgroundImage;
	    e.style.backgroundImage = "";
	    setTimeout(function () {
	      e.style.backgroundImage = saved;
	    });
	  } else {
	    saved = e.src;
	    e.src = "";
	    setTimeout(function () {
	      e.src = saved;
	    });
	  }
	});

	hashLinks.forEach(function (e) {
	  return e.addEventListener("click", function (e) {
	    return body.classList.toggle("menu-open");
	  });
	});

	document.addEventListener("scroll", function (e) {
	  var themeInverted = inverted.map(function (x) {
	    return inView(x);
	  }).indexOf(true) > -1;
	  body.classList.toggle("theme-inverted", themeInverted);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var $select = exports.$select = function $select(selector) {
	  return [].concat(_toConsumableArray(document.querySelectorAll(selector)));
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ToggleClass = undefined;

	var _DomHelper = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function toggleClass() {
	    var toggleData = JSON.parse(this.getAttribute('data-toggle-class'));
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        var _loop = function _loop() {
	            var key = _step.value;

	            (0, _DomHelper.$select)(key).forEach(function (el) {
	                return el.classList.toggle(toggleData[key]);
	            });
	        };

	        for (var _iterator = Object.keys(toggleData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            _loop();
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	}

	var ToggleClass = exports.ToggleClass = function ToggleClass() {
	    _classCallCheck(this, ToggleClass);

	    (0, _DomHelper.$select)('[data-toggle-class]').forEach(function (el) {
	        return el.addEventListener('click', toggleClass);
	    });
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Parallax = undefined;

	var _DomHelper = __webpack_require__(1);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Parallax = exports.Parallax = function Parallax(container, text, bg) {
	    _classCallCheck(this, Parallax);

	    function update() {
	        (0, _DomHelper.$select)(container).forEach(function (element, i) {
	            var rect = element.getBoundingClientRect();
	            var newPosition = rect.top / window.innerHeight * 100;
	            var bgPos = newPosition * -1 + 'px';
	            var txtPos = newPosition * -1 + 'px';

	            if (bg) {
	                [].concat(_toConsumableArray(element.querySelectorAll(bg))).forEach(function (e) {
	                    return e.style.transform = 'translate(-50%, calc(-50% + ' + bgPos + '))';
	                });
	            }

	            if (text) {
	                [].concat(_toConsumableArray(element.querySelectorAll(text))).forEach(function (e) {
	                    return e.style.top = '' + txtPos;
	                });
	            }
	        });
	    }

	    update();
	    document.addEventListener('scroll', update);
	};

/***/ })
/******/ ]);