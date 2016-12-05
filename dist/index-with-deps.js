(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["componentSvgImport"] = factory();
	else
		root["componentSvgImport"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(1);
	
	var _skatejs = __webpack_require__(2);
	
	var _BehaviorSubject = __webpack_require__(5);
	
	var _Observable = __webpack_require__(7);
	
	var _ajax = __webpack_require__(23);
	
	__webpack_require__(26);
	
	__webpack_require__(29);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	__webpack_require__(39);
	
	__webpack_require__(41);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = { createElement: _skatejs.h };
	
	customElements.define('svg-import', function (_Component) {
		_inherits(_class, _Component);
	
		_createClass(_class, null, [{
			key: 'props',
			get: function get() {
				return {
					// By declaring the property an attribute, we can now pass an initial value
					// for the count as part of the HTML.
					src: _skatejs.prop.string({ attribute: true }),
					'inner-style': _skatejs.prop.string({ attribute: true })
				};
			}
		}]);
	
		function _class() {
			_classCallCheck(this, _class);
	
			var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));
	
			_this.src$ = new _BehaviorSubject.BehaviorSubject(_this.src).filter(function (val) {
				return val && typeof val === 'string';
			}).distinct(function (src) {
				return src + _this['inner-style'];
			}).switchMap(function (src) {
				return _this.fetchXml(src);
			}).filter(function (xml) {
				return !!xml;
			});
			return _this;
		}
	
		_createClass(_class, [{
			key: 'fetchXml',
			value: function fetchXml(src) {
	
				return (0, _ajax.ajax)({ url: src, cache: true, crossDomain: true, responseType: 'text' }).map(function (response) {
					return jQuery.parseXML(response.response);
				}).catch(function (err) {
					console.error(err);
					return _Observable.Observable.empty();
				});
			}
		}, {
			key: 'getWraper',
			value: function getWraper() {
				return jQuery(this.shadowRoot).find('.svg-import-wrap').get(0);
			}
		}, {
			key: 'updateXml',
			value: function updateXml(xml) {
				var comp = this;
				if (!xml) {
					return;
				}
				var $ = jQuery;
	
				var $svg = $(xml).find('svg');
				var svg = $svg.get(0);
	
				svg.removeAttribute('xmlns:a');
				if (comp.width && comp.height) {
					// svg.hasAttribute('viewBox') ? svg.setAttribute('viewBox', '0 0 ' + comp.height + ' ' + comp.width) : '';
					svg.setAttribute('width', '100%');
					svg.setAttribute('height', '100%');
				}
	
				var wraper = comp.getWraper();
	
				if (wraper) {
					wraper.innerHTML = '';
					wraper.appendChild(svg);
				}
			}
		}, {
			key: 'connectedCallback',
			value: function connectedCallback() {
				var _this2 = this;
	
				// Ensure we call the parent.
				_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'connectedCallback', this).call(this);
				//this.updateXml();
				if (!jQuery) {
					throw new TypeError('svg-import require jQuery to work!');
				}
	
				this.srcSubscription = this.src$.subscribe(function (src) {
					return _this2.updateXml(src);
				}, function (err) {
					return console.error(err);
				});
			}
		}, {
			key: 'attributeChangedCallback',
			value: function attributeChangedCallback(name, oldValue, newValue) {
				_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'attributeChangedCallback', this).call(this, name, oldValue, newValue);
				if (name === 'src') {
					this.src$.next(newValue);
				}
			}
		}, {
			key: 'disconnectedCallback',
			value: function disconnectedCallback() {
				// Ensure we callback the parent.
				_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'disconnectedCallback', this).call(this);
				if (this.srcSubscription) {
					this.srcSubscription.unsubscribe();
				}
			}
		}, {
			key: 'renderCallback',
			value: function renderCallback() {
				// By separating the strings (and not using template literals or string
				// concatenation) it ensures the strings are diffed indepenedently. If
				// you select "Count" with your mouse, it will not deselect whenr endered.
				var comp = this;
	
				var defBoxStyle = '\n\t\t\t:host{display:inline-block;}\n\t\t\t.svg-import-wrap{\n\t\t\t\toverflow:hidden;\n\t\t\t\tmargin:0;\n\t\t\t\tpadding:0;\n\t\t\t\twidth:100%;\n\t\t\t\theight:100%;\n\t\t\t\tmin-width:5px;\n\t\t\t\tmin-height:5px;\n\t\t\t\tdisplay:block;\n\t\t\t}\n\t\t\tsvg{\n\t\t\t\twidth:100%;\n\t\t\t\theight:100%;\n\t\t\t}\n\t\t';
	
				this.src$.next(comp.src);
	
				return [React.createElement(
					'style',
					null,
					defBoxStyle + comp['inner-style']
				), React.createElement('figure', { role: 'image', className: 'svg-import-wrap' })];
			}
		}]);
	
		return _class;
	}(_skatejs.Component));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["skatejsWebComponents"] = factory();
		else
			root["skatejsWebComponents"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		// We load the Safari fix first because the custom element polyfill overrides
		// attachShadow() to observe the shadow root.
		__webpack_require__(1);
		
		// We have to include this first so that it can patch native.
		__webpack_require__(2);
		
		// These must appear in this order. The ShadyCSS polyfill requires that the
		// ShadyDOM polyfill be loaded first.
		__webpack_require__(3);
		__webpack_require__(4);
		__webpack_require__(5);
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var _window = window,
		    HTMLElement = _window.HTMLElement,
		    MutationObserver = _window.MutationObserver,
		    navigator = _window.navigator;
		var userAgent = navigator.userAgent;
		
		var safari = userAgent.indexOf('Safari/60') !== -1;
		var safariVersion = safari && userAgent.match(/Version\/([^\s]+)/)[1];
		var safariVersions = [0, 1].map(function (v) {
		  return '10.0.' + v;
		}).concat(['10.0']);
		var patch = safari && safariVersions.indexOf(safariVersion) > -1;
		
		// Workaround for https://bugs.webkit.org/show_bug.cgi?id=160331
		function fixSafari() {
		  var oldAttachShadow = HTMLElement.prototype.attachShadow;
		
		  // We observe a shadow root, but only need to know if the target that was mutated is a <style>
		  // element as this is the only scenario where styles aren't recalculated.
		  var moOpts = { childList: true, subtree: true };
		  var mo = new MutationObserver(function (muts) {
		    muts.forEach(function (mut) {
		      var target = mut.target;
		
		      if (target.tagName === 'STYLE') {
		        var nextSibling = target.nextSibling,
		            parentNode = target.parentNode;
		
		        // We actually have to remove and subsequently re-insert rather than doing insertBefore()
		        // as it seems that doesn't trigger a recalc.
		
		        parentNode.removeChild(target);
		        parentNode.insertBefore(target, nextSibling);
		      }
		    });
		  });
		
		  // Our override simply calls the native (or overridden) attachShadow but it ensures that changes
		  // to it are observed so that we can take any <style> elements and re-insert them.
		  function newAttachShadow(opts) {
		    var sr = oldAttachShadow.call(this, opts);
		    mo.observe(sr, moOpts);
		    return sr;
		  }
		
		  // We have to define a property because Safari won't take the override if it is set directly.
		  Object.defineProperty(HTMLElement.prototype, 'attachShadow', {
		    // Ensure polyfills can override it (hoping they call it back).
		    configurable: true,
		    enumerable: true,
		    value: newAttachShadow,
		    writable: true
		  });
		}
		
		// We target a specific version of Safari instead of trying to but detect as it seems to involve
		// contriving a breaking case and detecting computed styles. We can remove this code when Safari
		// fixes the bug.
		if (patch) {
		  fixSafari();
		}
		
		exports.default = patch;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		
		window.customElements && eval("/**\n * @license\n * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This shim allows elements written in, or compiled to, ES5 to work on native\n * implementations of Custom Elements.\n *\n * ES5-style classes don't work with native Custom Elements because the\n * HTMLElement constructor uses the value of `new.target` to look up the custom\n * element definition for the currently called constructor. `new.target` is only\n * set when `new` is called and is only propagated via super() calls. super()\n * is not emulatable in ES5. The pattern of `SuperClass.call(this)`` only works\n * when extending other ES5-style classes, and does not propagate `new.target`.\n *\n * This shim allows the native HTMLElement constructor to work by generating and\n * registering a stand-in class instead of the users custom element class. This\n * stand-in class's constructor has an actual call to super().\n * `customElements.define()` and `customElements.get()` are both overridden to\n * hide this stand-in class from users.\n *\n * In order to create instance of the user-defined class, rather than the stand\n * in, the stand-in's constructor swizzles its instances prototype and invokes\n * the user-defined constructor. When the user-defined constructor is called\n * directly it creates an instance of the stand-in class to get a real extension\n * of HTMLElement and returns that.\n *\n * There are two important constructors: A patched HTMLElement constructor, and\n * the StandInElement constructor. They both will be called to create an element\n * but which is called first depends on whether the browser creates the element\n * or the user-defined constructor is called directly. The variables\n * `browserConstruction` and `userConstruction` control the flow between the\n * two constructors.\n *\n * This shim should be better than forcing the polyfill because:\n *   1. It's smaller\n *   2. All reaction timings are the same as native (mostly synchronous)\n *   3. All reaction triggering DOM operations are automatically supported\n *\n * There are some restrictions and requirements on ES5 constructors:\n *   1. All constructors in a inheritance hierarchy must be ES5-style, so that\n *      they can be called with Function.call(). This effectively means that the\n *      whole application must be compiled to ES5.\n *   2. Constructors must return the value of the emulated super() call. Like\n *      `return SuperClass.call(this)`\n *   3. The `this` reference should not be used before the emulated super() call\n *      just like `this` is illegal to use before super() in ES6.\n *   4. Constructors should not create other custom elements before the emulated\n *      super() call. This is the same restriction as with native custom\n *      elements.\n *\n *  Compiling valid class-based custom elements to ES5 will satisfy these\n *  requirements with the latest version of popular transpilers.\n */\n(() => {\n  'use strict';\n\n  const NativeHTMLElement = window.HTMLElement;\n  const nativeDefine = window.customElements.define;\n  const nativeGet = window.customElements.get;\n\n  /**\n   * Map of user-provided constructors to tag names.\n   *\n   * @type {Map<Function, string>}\n   */\n  const tagnameByConstructor = new Map();\n\n  /**\n   * Map of tag anmes to user-provided constructors.\n   *\n   * @type {Map<string, Function>}\n   */\n  const constructorByTagname = new Map();\n\n\n  /**\n   * Whether the constructors are being called by a browser process, ie parsing\n   * or createElement.\n   */\n  let browserConstruction = false;\n\n  /**\n   * Whether the constructors are being called by a user-space process, ie\n   * calling an element constructor.\n   */\n  let userConstruction = false;\n\n  window.HTMLElement = function() {\n    if (!browserConstruction) {\n      const tagname = tagnameByConstructor.get(this.constructor);\n      const fakeClass = nativeGet.call(window.customElements, tagname);\n\n      // Make sure that the fake constructor doesn't call back to this constructor\n      userConstruction = true;\n      const instance = new (fakeClass)();\n      return instance;\n    }\n    // Else do nothing. This will be reached by ES5-style classes doing\n    // HTMLElement.call() during initialization\n    browserConstruction = false;\n  };\n\n  window.HTMLElement.prototype = Object.create(NativeHTMLElement.prototype);\n  window.HTMLElement.prototype.constructor = window.HTMLElement;\n\n  window.customElements.define = (tagname, elementClass) => {\n    const elementProto = elementClass.prototype;\n    const StandInElement = class extends NativeHTMLElement {\n      constructor() {\n        // Call the native HTMLElement constructor, this gives us the\n        // under-construction instance as `this`:\n        super();\n\n        // The prototype will be wrong up because the browser used our fake\n        // class, so fix it:\n        Object.setPrototypeOf(this, elementProto);\n\n        if (!userConstruction) {\n          // Make sure that user-defined constructor bottom's out to a do-nothing\n          // HTMLElement() call\n          browserConstruction = true;\n          // Call the user-defined constructor on our instance:\n          elementClass.call(this);\n        }\n        userConstruction = false;\n      }\n    };\n    const standInProto = StandInElement.prototype;\n    StandInElement.observedAttributes = elementClass.observedAttributes;\n    standInProto.connectedCallback = elementProto.connectedCallback;\n    standInProto.disconnectedCallback = elementProto.disconnectedCallback;\n    standInProto.attributeChangedCallback = elementProto.attributeChangedCallback;\n    standInProto.adoptedCallback = elementProto.adoptedCallback;\n\n    tagnameByConstructor.set(elementClass, tagname);\n    constructorByTagname.set(tagname, elementClass);\n    nativeDefine.call(window.customElements, tagname, StandInElement);\n  };\n\n  window.customElements.get = (tagname) => constructorByTagname.get(tagname);\n\n})();");
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		/*
		
		 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		 Code distributed by Google as part of the polymer project is also
		 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		'use strict';(function(){function c(){this.a=new Map;this.j=new Map;this.h=new Map;this.o=new Set;this.C=new MutationObserver(this.D.bind(this));this.f=null;this.F=new Set;this.enableFlush=!0;this.s=!1;this.m=null}function g(){return h.customElements}function k(a){if(!/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a)||-1!==q.indexOf(a))return Error("The element name '"+a+"' is not valid.")}function l(a,b,d,e){var c=g();a=d?m.call(a,b,d):m.call(a,b);(b=c.a.get(b.toLowerCase()))&&c.u(a,b,e);c.b(a);return a}
		function n(a,b,d,e){b=b.toLowerCase();var c=a.getAttribute(b);e.call(a,b,d);1==a.__$CE_upgraded&&(e=g().a.get(a.localName),d=e.A,(e=e.i)&&0<=d.indexOf(b)&&(d=a.getAttribute(b),d!==c&&e.call(a,b,c,d,null)))}var f=document,h=window;if(g()&&(g().g=function(){},!g().forcePolyfill))return;var q="annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ");c.prototype.L=function(a,b){function d(a){var b=f[a];if(void 0!==b&&"function"!==typeof b)throw Error(c+
		" '"+a+"' is not a Function");return b}if("function"!==typeof b)throw new TypeError("constructor must be a Constructor");var e=k(a);if(e)throw e;if(this.a.has(a))throw Error("An element with name '"+a+"' is already defined");if(this.j.has(b))throw Error("Definition failed for '"+a+"': The constructor is already used.");var c=a,f=b.prototype;if("object"!==typeof f)throw new TypeError("Definition failed for '"+a+"': constructor.prototype must be an object");var e=d("connectedCallback"),g=d("disconnectedCallback"),
		h=d("attributeChangedCallback");this.a.set(c,{name:a,localName:c,constructor:b,v:e,w:g,i:h,A:h&&b.observedAttributes||[]});this.j.set(b,c);this.K();if(a=this.h.get(c))a.resolve(void 0),this.h.delete(c)};c.prototype.get=function(a){return(a=this.a.get(a))?a.constructor:void 0};c.prototype.M=function(a){var b=k(a);if(b)return Promise.reject(b);if(this.a.has(a))return Promise.resolve();if(b=this.h.get(a))return b.N;var d,e=new Promise(function(a){d=a}),b={N:e,resolve:d};this.h.set(a,b);return e};c.prototype.g=
		function(){this.enableFlush&&(this.l(this.m.takeRecords()),this.D(this.C.takeRecords()),this.o.forEach(function(a){this.l(a.takeRecords())},this))};c.prototype.K=function(){var a=this;if(!this.s){this.s=!0;var b=function(){a.s=!1;a.m||(a.m=a.b(f));a.c(f.childNodes)};window.HTMLImports?window.HTMLImports.whenReady(b):b()}};c.prototype.I=function(a){this.f=a};c.prototype.b=function(a){if(null!=a.__$CE_observer)return a.__$CE_observer;a.__$CE_observer=new MutationObserver(this.l.bind(this));a.__$CE_observer.observe(a,
		{childList:!0,subtree:!0});this.enableFlush&&this.o.add(a.__$CE_observer);return a.__$CE_observer};c.prototype.J=function(a){null!=a.__$CE_observer&&(a.__$CE_observer.disconnect(),this.enableFlush&&this.o.delete(a.__$CE_observer),a.__$CE_observer=null)};c.prototype.l=function(a){for(var b=0;b<a.length;b++){var d=a[b];if("childList"===d.type){var e=d.removedNodes;this.c(d.addedNodes);this.H(e)}}};c.prototype.c=function(a,b){b=b||new Set;for(var d=0;d<a.length;d++){var e=a[d];if(e.nodeType===Node.ELEMENT_NODE){this.J(e);
		e=f.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,null,!1);do this.G(e.currentNode,b);while(e.nextNode())}}};c.prototype.G=function(a,b){if(!b.has(a)){b.add(a);var d=this.a.get(a.localName);if(d){a.__$CE_upgraded||this.u(a,d,!0);var e;if(e=a.__$CE_upgraded&&!a.__$CE_attached)a:{e=a;do{if(e.__$CE_attached||e.nodeType===Node.DOCUMENT_NODE){e=!0;break a}e=e.parentNode||e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host}while(e);e=!1}e&&(a.__$CE_attached=!0,d.v&&d.v.call(a))}a.shadowRoot&&this.c(a.shadowRoot.childNodes,
		b);"LINK"===a.tagName&&a.rel&&-1!==a.rel.toLowerCase().split(" ").indexOf("import")&&this.B(a,b)}};c.prototype.B=function(a,b){var d=a.import;if(d)b.has(d)||(b.add(d),d.__$CE_observer||this.b(d),this.c(d.childNodes,b));else if(b=a.href,!this.F.has(b)){this.F.add(b);var e=this,c=function(){a.removeEventListener("load",c);a.import.__$CE_observer||e.b(a.import);e.c(a.import.childNodes)};a.addEventListener("load",c)}};c.prototype.H=function(a){for(var b=0;b<a.length;b++){var d=a[b];if(d.nodeType===Node.ELEMENT_NODE){this.b(d);
		d=f.createTreeWalker(d,NodeFilter.SHOW_ELEMENT,null,!1);do{var e=d.currentNode;if(e.__$CE_upgraded&&e.__$CE_attached){e.__$CE_attached=!1;var c=this.a.get(e.localName);c&&c.w&&c.w.call(e)}}while(d.nextNode())}}};c.prototype.u=function(a,b,d){a.__proto__=b.constructor.prototype;d&&(this.I(a),new b.constructor,a.__$CE_upgraded=!0,console.assert(!this.f));d=b.A;if((b=b.i)&&0<d.length){this.C.observe(a,{attributes:!0,attributeOldValue:!0,attributeFilter:d});for(var e=0;e<d.length;e++){var c=d[e];if(a.hasAttribute(c)){var f=
		a.getAttribute(c);b.call(a,c,null,f,null)}}}};c.prototype.D=function(a){for(var b=0;b<a.length;b++){var d=a[b];if("attributes"===d.type){var c=d.target,f=this.a.get(c.localName),g=d.attributeName,h=d.oldValue,k=c.getAttribute(g);k!==h&&f.i.call(c,g,h,k,d.attributeNamespace)}}};window.CustomElementRegistry=c;c.prototype.define=c.prototype.L;c.prototype.get=c.prototype.get;c.prototype.whenDefined=c.prototype.M;c.prototype.flush=c.prototype.g;c.prototype.polyfilled=!0;c.prototype._observeRoot=c.prototype.b;
		c.prototype._addImport=c.prototype.B;var r=h.HTMLElement;h.HTMLElement=function(){var a=g();if(a.f){var b=a.f;a.f=null;return b}if(this.constructor)return a=a.j.get(this.constructor),l(f,a,void 0,!1);throw Error("Unknown constructor. Did you call customElements.define()?");};h.HTMLElement.prototype=Object.create(r.prototype,{constructor:{value:h.HTMLElement,configurable:!0,writable:!0}});var m=f.createElement;f.createElement=function(a,b){return l(f,a,b,!0)};var t=f.createElementNS;f.createElementNS=
		function(a,b){return"http://www.w3.org/1999/xhtml"===a?f.createElement(b):t.call(f,a,b)};var p=Element.prototype.attachShadow;p&&Object.defineProperty(Element.prototype,"attachShadow",{value:function(a){a=p.call(this,a);g().b(a);return a}});var u=f.importNode;f.importNode=function(a,b){a=u.call(f,a,b);g().c(a.nodeType===Node.ELEMENT_NODE?[a]:a.childNodes);return a};var v=Element.prototype.setAttribute;Element.prototype.setAttribute=function(a,b){n(this,a,b,v)};var w=Element.prototype.removeAttribute;
		Element.prototype.removeAttribute=function(a){n(this,a,null,w)};Object.defineProperty(window,"customElements",{value:new c,configurable:!0,enumerable:!0});window.CustomElements={takeRecords:function(){g().g&&g().g()}}})();
		
		//# sourceMappingURL=custom-elements.min.js.map
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		(function () {
		'use strict';
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var settings = window.ShadyDOM || {};
		
		settings.hasNativeShadowDOM = Boolean(Element.prototype.attachShadow && Node.prototype.getRootNode);
		
		settings.inUse = settings.force || !settings.hasNativeShadowDOM;
		
		function isShadyRoot(obj) {
		  return Boolean(obj.__localName === 'ShadyRoot');
		}
		
		var p = Element.prototype;
		var matches = p.matches || p.matchesSelector ||
		  p.mozMatchesSelector || p.msMatchesSelector ||
		  p.oMatchesSelector || p.webkitMatchesSelector;
		
		function matchesSelector(element, selector) {
		  return matches.call(element, selector);
		}
		
		function copyOwnProperty(name, source, target) {
		  var pd = Object.getOwnPropertyDescriptor(source, name);
		  if (pd) {
		    Object.defineProperty(target, name, pd);
		  }
		}
		
		function extend(target, source) {
		  if (target && source) {
		    var n$ = Object.getOwnPropertyNames(source);
		    for (var i=0, n; (i<n$.length) && (n=n$[i]); i++) {
		      copyOwnProperty(n, source, target);
		    }
		  }
		  return target || source;
		}
		
		function extendAll(target) {
		  var sources = [], len = arguments.length - 1;
		  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];
		
		  for (var i=0; i < sources.length; i++) {
		    extend(target, sources[i]);
		  }
		  return target;
		}
		
		function mixin(target, source) {
		  for (var i in source) {
		    target[i] = source[i];
		  }
		  return target;
		}
		
		var setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
		  obj.__proto__ = proto;
		  return obj;
		}
		
		function patchPrototype(obj, mixin) {
		  var proto = Object.getPrototypeOf(obj);
		  if (!proto.hasOwnProperty('__patchProto')) {
		    var patchProto = Object.create(proto);
		    patchProto.__sourceProto = proto;
		    extend(patchProto, mixin);
		    proto.__patchProto = patchProto;
		  }
		  setPrototypeOf(obj, proto.__patchProto);
		}
		
		
		
		var common = {};
		
		// TODO(sorvell): actually rely on a real Promise polyfill...
		var promish;
		if (window.Promise) {
		  promish = Promise.resolve();
		} else {
		  promish = {
		    then: function(cb) {
		      var twiddle = document.createTextNode('');
		      var observer = new MutationObserver(function() {
		        observer.disconnect();
		        cb();
		      });
		      observer.observe(twiddle, {characterData: true});
		    }
		  }
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		function newSplice(index, removed, addedCount) {
		  return {
		    index: index,
		    removed: removed,
		    addedCount: addedCount
		  };
		}
		
		var EDIT_LEAVE = 0;
		var EDIT_UPDATE = 1;
		var EDIT_ADD = 2;
		var EDIT_DELETE = 3;
		
		var ArraySplice = {
		
		  // Note: This function is *based* on the computation of the Levenshtein
		  // "edit" distance. The one change is that "updates" are treated as two
		  // edits - not one. With Array splices, an update is really a delete
		  // followed by an add. By retaining this, we optimize for "keeping" the
		  // maximum array items in the original array. For example:
		  //
		  //   'xxxx123' -> '123yyyy'
		  //
		  // With 1-edit updates, the shortest path would be just to update all seven
		  // characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
		  // leaves the substring '123' intact.
		  calcEditDistances: function calcEditDistances(current, currentStart, currentEnd,
		                              old, oldStart, oldEnd) {
		    var this$1 = this;
		
		    // "Deletion" columns
		    var rowCount = oldEnd - oldStart + 1;
		    var columnCount = currentEnd - currentStart + 1;
		    var distances = new Array(rowCount);
		
		    // "Addition" rows. Initialize null column.
		    for (var i = 0; i < rowCount; i++) {
		      distances[i] = new Array(columnCount);
		      distances[i][0] = i;
		    }
		
		    // Initialize null row
		    for (var j = 0; j < columnCount; j++)
		      distances[0][j] = j;
		
		    for (var i$1 = 1; i$1 < rowCount; i$1++) {
		      for (var j$1 = 1; j$1 < columnCount; j$1++) {
		        if (this$1.equals(current[currentStart + j$1 - 1], old[oldStart + i$1 - 1]))
		          distances[i$1][j$1] = distances[i$1 - 1][j$1 - 1];
		        else {
		          var north = distances[i$1 - 1][j$1] + 1;
		          var west = distances[i$1][j$1 - 1] + 1;
		          distances[i$1][j$1] = north < west ? north : west;
		        }
		      }
		    }
		
		    return distances;
		  },
		
		  // This starts at the final weight, and walks "backward" by finding
		  // the minimum previous weight recursively until the origin of the weight
		  // matrix.
		  spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
		    var i = distances.length - 1;
		    var j = distances[0].length - 1;
		    var current = distances[i][j];
		    var edits = [];
		    while (i > 0 || j > 0) {
		      if (i == 0) {
		        edits.push(EDIT_ADD);
		        j--;
		        continue;
		      }
		      if (j == 0) {
		        edits.push(EDIT_DELETE);
		        i--;
		        continue;
		      }
		      var northWest = distances[i - 1][j - 1];
		      var west = distances[i - 1][j];
		      var north = distances[i][j - 1];
		
		      var min;
		      if (west < north)
		        min = west < northWest ? west : northWest;
		      else
		        min = north < northWest ? north : northWest;
		
		      if (min == northWest) {
		        if (northWest == current) {
		          edits.push(EDIT_LEAVE);
		        } else {
		          edits.push(EDIT_UPDATE);
		          current = northWest;
		        }
		        i--;
		        j--;
		      } else if (min == west) {
		        edits.push(EDIT_DELETE);
		        i--;
		        current = west;
		      } else {
		        edits.push(EDIT_ADD);
		        j--;
		        current = north;
		      }
		    }
		
		    edits.reverse();
		    return edits;
		  },
		
		  /**
		   * Splice Projection functions:
		   *
		   * A splice map is a representation of how a previous array of items
		   * was transformed into a new array of items. Conceptually it is a list of
		   * tuples of
		   *
		   *   <index, removed, addedCount>
		   *
		   * which are kept in ascending index order of. The tuple represents that at
		   * the |index|, |removed| sequence of items were removed, and counting forward
		   * from |index|, |addedCount| items were added.
		   */
		
		  /**
		   * Lacking individual splice mutation information, the minimal set of
		   * splices can be synthesized given the previous state and final state of an
		   * array. The basic approach is to calculate the edit distance matrix and
		   * choose the shortest path through it.
		   *
		   * Complexity: O(l * p)
		   *   l: The length of the current array
		   *   p: The length of the old array
		   */
		  calcSplices: function calcSplices(current, currentStart, currentEnd,
		                        old, oldStart, oldEnd) {
		    var prefixCount = 0;
		    var suffixCount = 0;
		    var splice;
		
		    var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
		    if (currentStart == 0 && oldStart == 0)
		      prefixCount = this.sharedPrefix(current, old, minLength);
		
		    if (currentEnd == current.length && oldEnd == old.length)
		      suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
		
		    currentStart += prefixCount;
		    oldStart += prefixCount;
		    currentEnd -= suffixCount;
		    oldEnd -= suffixCount;
		
		    if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
		      return [];
		
		    if (currentStart == currentEnd) {
		      splice = newSplice(currentStart, [], 0);
		      while (oldStart < oldEnd)
		        splice.removed.push(old[oldStart++]);
		
		      return [ splice ];
		    } else if (oldStart == oldEnd)
		      return [ newSplice(currentStart, [], currentEnd - currentStart) ];
		
		    var ops = this.spliceOperationsFromEditDistances(
		        this.calcEditDistances(current, currentStart, currentEnd,
		                               old, oldStart, oldEnd));
		
		    splice = undefined;
		    var splices = [];
		    var index = currentStart;
		    var oldIndex = oldStart;
		    for (var i = 0; i < ops.length; i++) {
		      switch(ops[i]) {
		        case EDIT_LEAVE:
		          if (splice) {
		            splices.push(splice);
		            splice = undefined;
		          }
		
		          index++;
		          oldIndex++;
		          break;
		        case EDIT_UPDATE:
		          if (!splice)
		            splice = newSplice(index, [], 0);
		
		          splice.addedCount++;
		          index++;
		
		          splice.removed.push(old[oldIndex]);
		          oldIndex++;
		          break;
		        case EDIT_ADD:
		          if (!splice)
		            splice = newSplice(index, [], 0);
		
		          splice.addedCount++;
		          index++;
		          break;
		        case EDIT_DELETE:
		          if (!splice)
		            splice = newSplice(index, [], 0);
		
		          splice.removed.push(old[oldIndex]);
		          oldIndex++;
		          break;
		      }
		    }
		
		    if (splice) {
		      splices.push(splice);
		    }
		    return splices;
		  },
		
		  sharedPrefix: function sharedPrefix(current, old, searchLength) {
		    var this$1 = this;
		
		    for (var i = 0; i < searchLength; i++)
		      if (!this$1.equals(current[i], old[i]))
		        return i;
		    return searchLength;
		  },
		
		  sharedSuffix: function sharedSuffix(current, old, searchLength) {
		    var index1 = current.length;
		    var index2 = old.length;
		    var count = 0;
		    while (count < searchLength && this.equals(current[--index1], old[--index2]))
		      count++;
		
		    return count;
		  },
		
		  calculateSplices: function calculateSplices$1(current, previous) {
		    return this.calcSplices(current, 0, current.length, previous, 0,
		                            previous.length);
		  },
		
		  equals: function equals(currentValue, previousValue) {
		    return currentValue === previousValue;
		  }
		
		};
		
		var calculateSplices = function (current, previous) { return ArraySplice.calculateSplices(current, previous); };
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		// TODO(sorvell): circular (patch loads tree and tree loads patch)
		// for now this is stuck on `utils`
		//import {patchNode} from './patch'
		// native add/remove
		var nativeInsertBefore = Element.prototype.insertBefore;
		var nativeAppendChild = Element.prototype.appendChild;
		var nativeRemoveChild = Element.prototype.removeChild;
		
		/**
		 * `tree` is a dom manipulation library used by ShadyDom to
		 * manipulate composed and logical trees.
		 */
		var tree = {
		
		  // sad but faster than slice...
		  arrayCopyChildNodes: function arrayCopyChildNodes(parent) {
		    var copy=[], i=0;
		    for (var n=parent.firstChild; n; n=n.nextSibling) {
		      copy[i++] = n;
		    }
		    return copy;
		  },
		
		  arrayCopyChildren: function arrayCopyChildren(parent) {
		    var copy=[], i=0;
		    for (var n=parent.firstElementChild; n; n=n.nextElementSibling) {
		      copy[i++] = n;
		    }
		    return copy;
		  },
		
		  arrayCopy: function arrayCopy(a$) {
		    var l = a$.length;
		    var copy = new Array(l);
		    for (var i=0; i < l; i++) {
		      copy[i] = a$[i];
		    }
		    return copy;
		  },
		
		  saveChildNodes: function saveChildNodes(node) {
		    tree.Logical.saveChildNodes(node);
		    if (!tree.Composed.hasParentNode(node)) {
		      tree.Composed.saveComposedData(node);
		      //tree.Composed.saveParentNode(node);
		    }
		    tree.Composed.saveChildNodes(node);
		  }
		
		};
		
		tree.Logical = {
		
		  hasParentNode: function hasParentNode(node) {
		    return Boolean(node.__dom && node.__dom.parentNode);
		  },
		
		  hasChildNodes: function hasChildNodes(node) {
		    return Boolean(node.__dom && node.__dom.childNodes !== undefined);
		  },
		
		  getChildNodes: function getChildNodes(node) {
		    // note: we're distinguishing here between undefined and false-y:
		    // hasChildNodes uses undefined check to see if this element has logical
		    // children; the false-y check indicates whether or not we should rebuild
		    // the cached childNodes array.
		    return this.hasChildNodes(node) ? this._getChildNodes(node) :
		      tree.Composed.getChildNodes(node);
		  },
		
		  _getChildNodes: function _getChildNodes(node) {
		    if (!node.__dom.childNodes) {
		      node.__dom.childNodes = [];
		      for (var n=this.getFirstChild(node); n; n=this.getNextSibling(n)) {
		        node.__dom.childNodes.push(n);
		      }
		    }
		    return node.__dom.childNodes;
		  },
		
		  // NOTE: __dom can be created under 2 conditions: (1) an element has a
		  // logical tree, or (2) an element is in a logical tree. In case (1), the
		  // element will store firstChild/lastChild, and in case (2), the element
		  // will store parentNode, nextSibling, previousSibling. This means that
		  // the mere existence of __dom is not enough to know if the requested
		  // logical data is available and instead we do an explicit undefined check.
		  getParentNode: function getParentNode(node) {
		    return node.__dom && node.__dom.parentNode !== undefined ?
		      node.__dom.parentNode : tree.Composed.getParentNode(node);
		  },
		
		  getFirstChild: function getFirstChild(node) {
		    return node.__dom && node.__dom.firstChild !== undefined ?
		      node.__dom.firstChild : tree.Composed.getFirstChild(node);
		  },
		
		  getLastChild: function getLastChild(node) {
		    return node.__dom && node.__dom.lastChild  !== undefined ?
		      node.__dom.lastChild : tree.Composed.getLastChild(node);
		  },
		
		  getNextSibling: function getNextSibling(node) {
		    return node.__dom && node.__dom.nextSibling  !== undefined ?
		      node.__dom.nextSibling : tree.Composed.getNextSibling(node);
		  },
		
		  getPreviousSibling: function getPreviousSibling(node) {
		    return node.__dom && node.__dom.previousSibling  !== undefined ?
		      node.__dom.previousSibling : tree.Composed.getPreviousSibling(node);
		  },
		
		  getFirstElementChild: function getFirstElementChild(node) {
		    return node.__dom && node.__dom.firstChild !== undefined ?
		      this._getFirstElementChild(node) :
		      tree.Composed.getFirstElementChild(node);
		  },
		
		  _getFirstElementChild: function _getFirstElementChild(node) {
		    var n = node.__dom.firstChild;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = n.__dom.nextSibling;
		    }
		    return n;
		  },
		
		  getLastElementChild: function getLastElementChild(node) {
		    return node.__dom && node.__dom.lastChild !== undefined ?
		      this._getLastElementChild(node) :
		      tree.Composed.getLastElementChild(node);
		  },
		
		  _getLastElementChild: function _getLastElementChild(node) {
		    var n = node.__dom.lastChild;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = n.__dom.previousSibling;
		    }
		    return n;
		  },
		
		  getNextElementSibling: function getNextElementSibling(node) {
		    return node.__dom && node.__dom.nextSibling !== undefined ?
		      this._getNextElementSibling(node) :
		      tree.Composed.getNextElementSibling(node);
		  },
		
		  _getNextElementSibling: function _getNextElementSibling(node) {
		    var this$1 = this;
		
		    var n = node.__dom.nextSibling;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = this$1.getNextSibling(n);
		    }
		    return n;
		  },
		
		  getPreviousElementSibling: function getPreviousElementSibling(node) {
		    return node.__dom && node.__dom.previousSibling !== undefined ?
		      this._getPreviousElementSibling(node) :
		      tree.Composed.getPreviousElementSibling(node);
		  },
		
		  _getPreviousElementSibling: function _getPreviousElementSibling(node) {
		    var this$1 = this;
		
		    var n = node.__dom.previousSibling;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = this$1.getPreviousSibling(n);
		    }
		    return n;
		  },
		
		  // Capture the list of light children. It's important to do this before we
		  // start transforming the DOM into "rendered" state.
		  // Children may be added to this list dynamically. It will be treated as the
		  // source of truth for the light children of the element. This element's
		  // actual children will be treated as the rendered state once this function
		  // has been called.
		  saveChildNodes: function saveChildNodes$1(node) {
		    if (!this.hasChildNodes(node)) {
		      node.__dom = node.__dom || {};
		      node.__dom.firstChild = node.firstChild;
		      node.__dom.lastChild = node.lastChild;
		      var c$ = node.__dom.childNodes = tree.arrayCopyChildNodes(node);
		      for (var i=0, n; (i<c$.length) && (n=c$[i]); i++) {
		        n.__dom = n.__dom || {};
		        n.__dom.parentNode = node;
		        n.__dom.nextSibling = c$[i+1] || null;
		        n.__dom.previousSibling = c$[i-1] || null;
		        common.patchNode(n);
		      }
		    }
		  },
		
		  // TODO(sorvell): may need to patch saveChildNodes iff the tree has
		  // already been distributed.
		  // NOTE: ensure `node` is patched...
		  recordInsertBefore: function recordInsertBefore(node, container, ref_node) {
		    var this$1 = this;
		
		    container.__dom.childNodes = null;
		    // handle document fragments
		    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		      var c$ = tree.arrayCopyChildNodes(node);
		      for (var i=0; i < c$.length; i++) {
		        this$1._linkNode(c$[i], container, ref_node);
		      }
		      // cleanup logical dom in doc fragment.
		      node.__dom = node.__dom || {};
		      node.__dom.firstChild = node.__dom.lastChild = null;
		      node.__dom.childNodes = null;
		    } else {
		      this._linkNode(node, container, ref_node);
		    }
		  },
		
		  _linkNode: function _linkNode(node, container, ref_node) {
		    common.patchNode(node);
		    ref_node = ref_node || null;
		    node.__dom = node.__dom || {};
		    container.__dom = container.__dom || {};
		    if (ref_node) {
		      ref_node.__dom = ref_node.__dom || {};
		    }
		    // update ref_node.previousSibling <-> node
		    node.__dom.previousSibling = ref_node ? ref_node.__dom.previousSibling :
		      container.__dom.lastChild;
		    if (node.__dom.previousSibling) {
		      node.__dom.previousSibling.__dom.nextSibling = node;
		    }
		    // update node <-> ref_node
		    node.__dom.nextSibling = ref_node;
		    if (node.__dom.nextSibling) {
		      node.__dom.nextSibling.__dom.previousSibling = node;
		    }
		    // update node <-> container
		    node.__dom.parentNode = container;
		    if (ref_node) {
		      if (ref_node === container.__dom.firstChild) {
		        container.__dom.firstChild = node;
		      }
		    } else {
		      container.__dom.lastChild = node;
		      if (!container.__dom.firstChild) {
		        container.__dom.firstChild = node;
		      }
		    }
		    // remove caching of childNodes
		    container.__dom.childNodes = null;
		  },
		
		  recordRemoveChild: function recordRemoveChild(node, container) {
		    node.__dom = node.__dom || {};
		    container.__dom = container.__dom || {};
		    if (node === container.__dom.firstChild) {
		      container.__dom.firstChild = node.__dom.nextSibling;
		    }
		    if (node === container.__dom.lastChild) {
		      container.__dom.lastChild = node.__dom.previousSibling;
		    }
		    var p = node.__dom.previousSibling;
		    var n = node.__dom.nextSibling;
		    if (p) {
		      p.__dom = p.__dom || {};
		      p.__dom.nextSibling = n;
		    }
		    if (n) {
		      n.__dom = n.__dom || {};
		      n.__dom.previousSibling = p;
		    }
		    // When an element is removed, logical data is no longer tracked.
		    // Explicitly set `undefined` here to indicate this. This is disginguished
		    // from `null` which is set if info is null.
		    node.__dom.parentNode = node.__dom.previousSibling =
		      node.__dom.nextSibling = null;
		    // remove caching of childNodes
		    container.__dom.childNodes = null;
		  }
		
		}
		
		
		// TODO(sorvell): composed tree manipulation is made available
		// (1) to maninpulate the composed tree, and (2) to track changes
		// to the tree for optional patching pluggability.
		tree.Composed = {
		
		  hasParentNode: function hasParentNode$1(node) {
		    return Boolean(node.__dom && node.__dom.$parentNode !== undefined);
		  },
		
		  hasChildNodes: function hasChildNodes$1(node) {
		    return Boolean(node.__dom && node.__dom.$childNodes !== undefined);
		  },
		
		  getChildNodes: function getChildNodes$1(node) {
		    return this.hasChildNodes(node) ? this._getChildNodes(node) :
		      (!node.__patched && tree.arrayCopy(node.childNodes));
		  },
		
		  _getChildNodes: function _getChildNodes$1(node) {
		    if (!node.__dom.$childNodes) {
		      node.__dom.$childNodes = [];
		      for (var n=node.__dom.$firstChild; n; n=n.__dom.$nextSibling) {
		        node.__dom.$childNodes.push(n);
		      }
		    }
		    return node.__dom.$childNodes;
		  },
		
		  getComposedChildNodes: function getComposedChildNodes(node) {
		    return node.__dom.$childNodes;
		  },
		
		  getParentNode: function getParentNode$1(node) {
		    return this.hasParentNode(node) ? node.__dom.$parentNode :
		      (!node.__patched && node.parentNode);
		  },
		
		  getFirstChild: function getFirstChild$1(node) {
		    return node.__patched ? node.__dom.$firstChild : node.firstChild;
		  },
		
		  getLastChild: function getLastChild$1(node) {
		    return node.__patched ? node.__dom.$lastChild : node.lastChild;
		  },
		
		  getNextSibling: function getNextSibling$1(node) {
		    return node.__patched ? node.__dom.$nextSibling : node.nextSibling;
		  },
		
		  getPreviousSibling: function getPreviousSibling$1(node) {
		    return node.__patched ? node.__dom.$previousSibling : node.previousSibling;
		  },
		
		  getFirstElementChild: function getFirstElementChild$1(node) {
		    return node.__patched ? this._getFirstElementChild(node) :
		      node.firstElementChild;
		  },
		
		  _getFirstElementChild: function _getFirstElementChild$1(node) {
		    var n = node.__dom.$firstChild;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = n.__dom.$nextSibling;
		    }
		    return n;
		  },
		
		  getLastElementChild: function getLastElementChild$1(node) {
		    return node.__patched ? this._getLastElementChild(node) :
		      node.lastElementChild;
		  },
		
		  _getLastElementChild: function _getLastElementChild$1(node) {
		    var n = node.__dom.$lastChild;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = n.__dom.$previousSibling;
		    }
		    return n;
		  },
		
		  getNextElementSibling: function getNextElementSibling$1(node) {
		    return node.__patched ? this._getNextElementSibling(node) :
		      node.nextElementSibling;
		  },
		
		  _getNextElementSibling: function _getNextElementSibling$1(node) {
		    var this$1 = this;
		
		    var n = node.__dom.$nextSibling;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = this$1.getNextSibling(n);
		    }
		    return n;
		  },
		
		  getPreviousElementSibling: function getPreviousElementSibling$1(node) {
		    return node.__patched ? this._getPreviousElementSibling(node) :
		      node.previousElementSibling;
		  },
		
		  _getPreviousElementSibling: function _getPreviousElementSibling$1(node) {
		    var this$1 = this;
		
		    var n = node.__dom.$previousSibling;
		    while (n && n.nodeType !== Node.ELEMENT_NODE) {
		      n = this$1.getPreviousSibling(n);
		    }
		    return n;
		  },
		
		  saveChildNodes: function saveChildNodes$2(node) {
		    var this$1 = this;
		
		    if (!this.hasChildNodes(node)) {
		      node.__dom = node.__dom || {};
		      node.__dom.$firstChild = node.firstChild;
		      node.__dom.$lastChild = node.lastChild;
		      var c$ = node.__dom.$childNodes = tree.arrayCopyChildNodes(node);
		      for (var i=0, n; (i<c$.length) && (n=c$[i]); i++) {
		        this$1.saveComposedData(n);
		      }
		    }
		  },
		
		  saveComposedData: function saveComposedData(node) {
		    node.__dom = node.__dom || {};
		    if (node.__dom.$parentNode === undefined) {
		      node.__dom.$parentNode = node.parentNode;
		    }
		    if (node.__dom.$nextSibling === undefined) {
		      node.__dom.$nextSibling = node.nextSibling;
		    }
		    if (node.__dom.$previousSibling === undefined) {
		      node.__dom.$previousSibling = node.previousSibling;
		    }
		  },
		
		  recordInsertBefore: function recordInsertBefore$1(node, container, ref_node) {
		    var this$1 = this;
		
		    container.__dom.$childNodes = null;
		    // handle document fragments
		    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		      // TODO(sorvell): remember this for patching:
		      // the act of setting this info can affect patched nodes
		      // getters; therefore capture childNodes before patching.
		      for (var n=this.getFirstChild(node); n; n=this.getNextSibling(n)) {
		        this$1._linkNode(n, container, ref_node);
		      }
		    } else {
		      this._linkNode(node, container, ref_node);
		    }
		  },
		
		  _linkNode: function _linkNode$1(node, container, ref_node) {
		    node.__dom = node.__dom || {};
		    container.__dom = container.__dom || {};
		    if (ref_node) {
		      ref_node.__dom = ref_node.__dom || {};
		    }
		    // update ref_node.previousSibling <-> node
		    node.__dom.$previousSibling = ref_node ? ref_node.__dom.$previousSibling :
		      container.__dom.$lastChild;
		    if (node.__dom.$previousSibling) {
		      node.__dom.$previousSibling.__dom.$nextSibling = node;
		    }
		    // update node <-> ref_node
		    node.__dom.$nextSibling = ref_node;
		    if (node.__dom.$nextSibling) {
		      node.__dom.$nextSibling.__dom.$previousSibling = node;
		    }
		    // update node <-> container
		    node.__dom.$parentNode = container;
		    if (ref_node) {
		      if (ref_node === container.__dom.$firstChild) {
		        container.__dom.$firstChild = node;
		      }
		    } else {
		      container.__dom.$lastChild = node;
		      if (!container.__dom.$firstChild) {
		        container.__dom.$firstChild = node;
		      }
		    }
		    // remove caching of childNodes
		    container.__dom.$childNodes = null;
		  },
		
		  recordRemoveChild: function recordRemoveChild$1(node, container) {
		    node.__dom = node.__dom || {};
		    container.__dom = container.__dom || {};
		    if (node === container.__dom.$firstChild) {
		      container.__dom.$firstChild = node.__dom.$nextSibling;
		    }
		    if (node === container.__dom.$lastChild) {
		      container.__dom.$lastChild = node.__dom.$previousSibling;
		    }
		    var p = node.__dom.$previousSibling;
		    var n = node.__dom.$nextSibling;
		    if (p) {
		      p.__dom = p.__dom || {};
		      p.__dom.$nextSibling = n;
		    }
		    if (n) {
		      n.__dom = n.__dom || {};
		      n.__dom.$previousSibling = p;
		    }
		    node.__dom.$parentNode = node.__dom.$previousSibling =
		      node.__dom.$nextSibling = null;
		    // remove caching of childNodes
		    container.__dom.$childNodes = null;
		  },
		
		  clearChildNodes: function clearChildNodes(node) {
		    var this$1 = this;
		
		    var c$ = this.getChildNodes(node);
		    for (var i=0, c; i < c$.length; i++) {
		      c = c$[i];
		      this$1.recordRemoveChild(c, node);
		      nativeRemoveChild.call(node, c)
		    }
		  },
		
		  saveParentNode: function saveParentNode(node) {
		    node.__dom = node.__dom || {};
		    node.__dom.$parentNode = node.parentNode;
		  },
		
		  insertBefore: function insertBefore(parentNode, newChild, refChild) {
		    this.saveChildNodes(parentNode);
		    // remove from current location.
		    this._addChild(parentNode, newChild, refChild);
		    return nativeInsertBefore.call(parentNode, newChild, refChild || null);
		  },
		
		  appendChild: function appendChild(parentNode, newChild) {
		    this.saveChildNodes(parentNode);
		    this._addChild(parentNode, newChild);
		    return nativeAppendChild.call(parentNode, newChild);
		  },
		
		  removeChild: function removeChild(parentNode, node) {
		    var currentParent = this.getParentNode(node);
		    this.saveChildNodes(parentNode);
		    this._removeChild(parentNode, node);
		    if (currentParent === parentNode) {
		      return nativeRemoveChild.call(parentNode, node);
		    }
		  },
		
		  _addChild: function _addChild(parentNode, newChild, refChild) {
		    var this$1 = this;
		
		    var isFrag = (newChild.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
		    var oldParent = this.getParentNode(newChild);
		    if (oldParent) {
		      this._removeChild(oldParent, newChild);
		    }
		    if (isFrag) {
		      var c$ = this.getChildNodes(newChild);
		      for (var i=0; i < c$.length; i++) {
		        var c = c$[i];
		        // unlink document fragment children
		        this$1._removeChild(newChild, c);
		        this$1.recordInsertBefore(c, parentNode, refChild);
		      }
		    } else {
		      this.recordInsertBefore(newChild, parentNode, refChild);
		    }
		  },
		
		  _removeChild: function _removeChild(parentNode, node) {
		    this.recordRemoveChild(node, parentNode);
		  }
		
		};
		
		// for testing...
		var descriptors = {};
		function getNativeProperty(element, property) {
		  if (!descriptors[property]) {
		    descriptors[property] = Object.getOwnPropertyDescriptor(
		      HTMLElement.prototype, property) ||
		    Object.getOwnPropertyDescriptor(
		      Element.prototype, property) ||
		    Object.getOwnPropertyDescriptor(
		      Node.prototype, property);
		  }
		  return descriptors[property].get.call(element);
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		// NOTE: normalize event contruction where necessary (IE11)
		var NormalizedEvent = typeof Event === 'function' ? Event :
		  function(inType, params) {
		    params = params || {};
		    var e = document.createEvent('Event');
		    e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
		    return e;
		  };
		
		var Distributor = (function () {
		  function anonymous(root) {
		    this.root = root;
		    this.insertionPointTag = 'slot';
		  }
		
		  anonymous.prototype.getInsertionPoints = function getInsertionPoints () {
		    return this.root.querySelectorAll(this.insertionPointTag);
		  };
		
		  anonymous.prototype.hasInsertionPoint = function hasInsertionPoint () {
		    return Boolean(this.root._insertionPoints &&
		      this.root._insertionPoints.length);
		  };
		
		  anonymous.prototype.isInsertionPoint = function isInsertionPoint (node) {
		    return node.localName && node.localName == this.insertionPointTag;
		  };
		
		  anonymous.prototype.distribute = function distribute () {
		    if (this.hasInsertionPoint()) {
		      return this.distributePool(this.root, this.collectPool());
		    }
		    return [];
		  };
		
		  // Gather the pool of nodes that should be distributed. We will combine
		  // these with the "content root" to arrive at the composed tree.
		  anonymous.prototype.collectPool = function collectPool () {
		    return tree.arrayCopy(
		      tree.Logical.getChildNodes(this.root.host));
		  };
		
		  // perform "logical" distribution; note, no actual dom is moved here,
		  // instead elements are distributed into storage
		  // array where applicable.
		  anonymous.prototype.distributePool = function distributePool (node, pool) {
		    var this$1 = this;
		
		    var dirtyRoots = [];
		    var p$ = this.root._insertionPoints;
		    for (var i=0, l=p$.length, p; (i<l) && (p=p$[i]); i++) {
		      this$1.distributeInsertionPoint(p, pool);
		      // provoke redistribution on insertion point parents
		      // must do this on all candidate hosts since distribution in this
		      // scope invalidates their distribution.
		      // only get logical parent.
		      var parent = tree.Logical.getParentNode(p);
		      if (parent && parent.shadyRoot &&
		          this$1.hasInsertionPoint(parent.shadyRoot)) {
		        dirtyRoots.push(parent.shadyRoot);
		      }
		    }
		    for (var i$1=0; i$1 < pool.length; i$1++) {
		      var p$1 = pool[i$1];
		      if (p$1) {
		        p$1._assignedSlot = undefined;
		        // remove undistributed elements from physical dom.
		        var parent$1 = tree.Composed.getParentNode(p$1);
		        if (parent$1) {
		          tree.Composed.removeChild(parent$1, p$1);
		        }
		      }
		    }
		    return dirtyRoots;
		  };
		
		  anonymous.prototype.distributeInsertionPoint = function distributeInsertionPoint (insertionPoint, pool) {
		    var this$1 = this;
		
		    var prevAssignedNodes = insertionPoint._assignedNodes;
		    if (prevAssignedNodes) {
		      this.clearAssignedSlots(insertionPoint, true);
		    }
		    insertionPoint._assignedNodes = [];
		    var needsSlotChange = false;
		    // distribute nodes from the pool that this selector matches
		    var anyDistributed = false;
		    for (var i=0, l=pool.length, node; i < l; i++) {
		      node=pool[i];
		      // skip nodes that were already used
		      if (!node) {
		        continue;
		      }
		      // distribute this node if it matches
		      if (this$1.matchesInsertionPoint(node, insertionPoint)) {
		        if (node.__prevAssignedSlot != insertionPoint) {
		          needsSlotChange = true;
		        }
		        this$1.distributeNodeInto(node, insertionPoint)
		        // remove this node from the pool
		        pool[i] = undefined;
		        // since at least one node matched, we won't need fallback content
		        anyDistributed = true;
		      }
		    }
		    // Fallback content if nothing was distributed here
		    if (!anyDistributed) {
		      var children = tree.Logical.getChildNodes(insertionPoint);
		      for (var j = 0, node$1; j < children.length; j++) {
		        node$1 = children[j];
		        if (node$1.__prevAssignedSlot != insertionPoint) {
		          needsSlotChange = true;
		        }
		        this$1.distributeNodeInto(node$1, insertionPoint);
		      }
		    }
		    // we're already dirty if a node was newly added to the slot
		    // and we're also dirty if the assigned count decreased.
		    if (prevAssignedNodes) {
		      // TODO(sorvell): the tracking of previously assigned slots
		      // could instead by done with a Set and then we could
		      // avoid needing to iterate here to clear the info.
		      for (var i$1=0; i$1 < prevAssignedNodes.length; i$1++) {
		        prevAssignedNodes[i$1].__prevAssignedSlot = null;
		      }
		      if (insertionPoint._assignedNodes.length < prevAssignedNodes.length) {
		        needsSlotChange = true;
		      }
		    }
		    this.setDistributedNodesOnInsertionPoint(insertionPoint);
		    if (needsSlotChange) {
		      this._fireSlotChange(insertionPoint);
		    }
		  };
		
		  anonymous.prototype.clearAssignedSlots = function clearAssignedSlots (slot, savePrevious) {
		    var n$ = slot._assignedNodes;
		    if (n$) {
		      for (var i=0; i < n$.length; i++) {
		        var n = n$[i];
		        if (savePrevious) {
		          n.__prevAssignedSlot = n._assignedSlot;
		        }
		        // only clear if it was previously set to this slot;
		        // this helps ensure that if the node has otherwise been distributed
		        // ignore it.
		        if (n._assignedSlot === slot) {
		          n._assignedSlot = null;
		        }
		      }
		    }
		  };
		
		  anonymous.prototype.matchesInsertionPoint = function matchesInsertionPoint (node, insertionPoint) {
		    var slotName = insertionPoint.getAttribute('name');
		    slotName = slotName ? slotName.trim() : '';
		    var slot = node.getAttribute && node.getAttribute('slot');
		    slot = slot ? slot.trim() : '';
		    return (slot == slotName);
		  };
		
		  anonymous.prototype.distributeNodeInto = function distributeNodeInto (child, insertionPoint) {
		    insertionPoint._assignedNodes.push(child);
		    child._assignedSlot = insertionPoint;
		  };
		
		  anonymous.prototype.setDistributedNodesOnInsertionPoint = function setDistributedNodesOnInsertionPoint (insertionPoint) {
		    var this$1 = this;
		
		    var n$ = insertionPoint._assignedNodes;
		    insertionPoint._distributedNodes = [];
		    for (var i=0, n; (i<n$.length) && (n=n$[i]) ; i++) {
		      if (this$1.isInsertionPoint(n)) {
		        var d$ = n._distributedNodes;
		        if (d$) {
		          for (var j=0; j < d$.length; j++) {
		            insertionPoint._distributedNodes.push(d$[j]);
		          }
		        }
		      } else {
		        insertionPoint._distributedNodes.push(n$[i]);
		      }
		    }
		  };
		
		  anonymous.prototype._fireSlotChange = function _fireSlotChange (insertionPoint) {
		    // NOTE: cannot bubble correctly here so not setting bubbles: true
		    // Safari tech preview does not bubble but chrome does
		    // Spec says it bubbles (https://dom.spec.whatwg.org/#mutation-observers)
		    insertionPoint.dispatchEvent(new NormalizedEvent('slotchange'));
		    if (insertionPoint._assignedSlot) {
		      this._fireSlotChange(insertionPoint._assignedSlot);
		    }
		  };
		
		  anonymous.prototype.isFinalDestination = function isFinalDestination (insertionPoint) {
		    return !(insertionPoint._assignedSlot);
		  };
		
		  return anonymous;
		}())
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		/**
		  Implements a pared down version of ShadowDOM's scoping, which is easy to
		  polyfill across browsers.
		*/
		var ShadyRoot = function ShadyRoot(host) {
		  if (!host) {
		    throw 'Must provide a host';
		  }
		  // NOTE: this strange construction is necessary because
		  // DocumentFragment cannot be subclassed on older browsers.
		  var frag = document.createDocumentFragment();
		  frag.__proto__ = ShadyFragmentMixin;
		  frag._init(host);
		  return frag;
		};
		
		var ShadyMixin = {
		
		  _init: function _init(host) {
		    // NOTE: set a fake local name so this element can be
		    // distinguished from a DocumentFragment when patching.
		    // FF doesn't allow this to be `localName`
		    this.__localName = 'ShadyRoot';
		    // root <=> host
		    host.shadyRoot = this;
		    this.host = host;
		    // logical dom setup
		    tree.Logical.saveChildNodes(host);
		    tree.Logical.saveChildNodes(this);
		    // state flags
		    this._clean = true;
		    this._hasRendered = false;
		    this._distributor = new Distributor(this);
		    this.update();
		  },
		
		  // async render the "top" distributor (this is all that is needed to
		  // distribute this host).
		  update: function update() {
		    // TODO(sorvell): instead the root should always be enqueued to helps record that it is dirty.
		    // Then, in `render`, the top most (in the distribution tree) "dirty" root should be rendered.
		    var distributionRoot = this._findDistributionRoot(this.host);
		    //console.log('update from', this.host, 'root', distributionRoot.host, distributionRoot._clean);
		    if (distributionRoot._clean) {
		      distributionRoot._clean = false;
		      enqueue(function() {
		        distributionRoot.render();
		      });
		    }
		  },
		
		  // TODO(sorvell): this may not return a shadowRoot (for example if the element is in a docFragment)
		  // this should only return a shadowRoot.
		  // returns the host that's the top of this host's distribution tree
		  _findDistributionRoot: function _findDistributionRoot(element) {
		    var root = element.shadyRoot;
		    while (element && this._elementNeedsDistribution(element)) {
		      root = element.getRootNode();
		      element = root && root.host;
		    }
		    return root;
		  },
		
		  // Return true if a host's children includes
		  // an insertion point that selects selectively
		  _elementNeedsDistribution: function _elementNeedsDistribution(element) {
		    var this$1 = this;
		
		    var c$ = tree.Logical.getChildNodes(element);
		    for (var i=0, c; i < c$.length; i++) {
		      c = c$[i];
		      if (this$1._distributor.isInsertionPoint(c)) {
		        return element.getRootNode();
		      }
		    }
		  },
		
		  render: function render() {
		    if (!this._clean) {
		      this._clean = true;
		      if (!this._skipUpdateInsertionPoints) {
		        this.updateInsertionPoints();
		      } else if (!this._hasRendered) {
		        this._insertionPoints = [];
		      }
		      this._skipUpdateInsertionPoints = false;
		      // TODO(sorvell): previous ShadyDom had a fast path here
		      // that would avoid distribution for initial render if
		      // no insertion points exist. We cannot currently do this because
		      // it relies on elements being in the physical shadowRoot element
		      // so that native methods will be used. The current append code
		      // simply provokes distribution in this case and does not put the
		      // nodes in the shadowRoot. This could be done but we'll need to
		      // consider if the special processing is worth the perf gain.
		      // if (!this._hasRendered && !this._insertionPoints.length) {
		      //   tree.Composed.clearChildNodes(this.host);
		      //   tree.Composed.appendChild(this.host, this);
		      // } else {
		      // logical
		      this.distribute();
		      // physical
		      this.compose();
		      this._hasRendered = true;
		    }
		  },
		
		  forceRender: function forceRender() {
		    this._clean = false;
		    this.render();
		  },
		
		  distribute: function distribute() {
		    var dirtyRoots = this._distributor.distribute();
		    for (var i=0; i<dirtyRoots.length; i++) {
		      dirtyRoots[i].forceRender();
		    }
		  },
		
		  updateInsertionPoints: function updateInsertionPoints() {
		    var this$1 = this;
		
		    var i$ = this.__insertionPoints;
		    // if any insertion points have been removed, clear their distribution info
		    if (i$) {
		      for (var i=0, c; i < i$.length; i++) {
		        c = i$[i];
		        if (c.getRootNode() !== this$1) {
		          this$1._distributor.clearAssignedSlots(c);
		        }
		      }
		    }
		    i$ = this._insertionPoints = this._distributor.getInsertionPoints();
		    // ensure insertionPoints's and their parents have logical dom info.
		    // save logical tree info
		    // a. for shadyRoot
		    // b. for insertion points (fallback)
		    // c. for parents of insertion points
		    for (var i$1=0, c$1; i$1 < i$.length; i$1++) {
		      c$1 = i$[i$1];
		      tree.Logical.saveChildNodes(c$1);
		      tree.Logical.saveChildNodes(tree.Logical.getParentNode(c$1));
		    }
		  },
		
		  get _insertionPoints() {
		    if (!this.__insertionPoints) {
		      this.updateInsertionPoints();
		    }
		    return this.__insertionPoints || (this.__insertionPoints = []);
		  },
		
		  set _insertionPoints(insertionPoints) {
		    this.__insertionPoints = insertionPoints;
		  },
		
		  hasInsertionPoint: function hasInsertionPoint() {
		    return this._distributor.hasInsertionPoint();
		  },
		
		  compose: function compose() {
		    // compose self
		    // note: it's important to mark this clean before distribution
		    // so that attachment that provokes additional distribution (e.g.
		    // adding something to your parentNode) works
		    this._composeTree();
		    // TODO(sorvell): See fast paths here in Polymer v1
		    // (these seem unnecessary)
		  },
		
		  // Reify dom such that it is at its correct rendering position
		  // based on logical distribution.
		  _composeTree: function _composeTree() {
		    var this$1 = this;
		
		    this._updateChildNodes(this.host, this._composeNode(this.host));
		    var p$ = this._insertionPoints || [];
		    for (var i=0, l=p$.length, p, parent; (i<l) && (p=p$[i]); i++) {
		      parent = tree.Logical.getParentNode(p);
		      if ((parent !== this$1.host) && (parent !== this$1)) {
		        this$1._updateChildNodes(parent, this$1._composeNode(parent));
		      }
		    }
		  },
		
		  // Returns the list of nodes which should be rendered inside `node`.
		  _composeNode: function _composeNode(node) {
		    var this$1 = this;
		
		    var children = [];
		    var c$ = tree.Logical.getChildNodes(node.shadyRoot || node);
		    for (var i = 0; i < c$.length; i++) {
		      var child = c$[i];
		      if (this$1._distributor.isInsertionPoint(child)) {
		        var distributedNodes = child._distributedNodes ||
		          (child._distributedNodes = []);
		        for (var j = 0; j < distributedNodes.length; j++) {
		          var distributedNode = distributedNodes[j];
		          if (this$1.isFinalDestination(child, distributedNode)) {
		            children.push(distributedNode);
		          }
		        }
		      } else {
		        children.push(child);
		      }
		    }
		    return children;
		  },
		
		  isFinalDestination: function isFinalDestination(insertionPoint, node) {
		    return this._distributor.isFinalDestination(
		      insertionPoint, node);
		  },
		
		  // Ensures that the rendered node list inside `container` is `children`.
		  _updateChildNodes: function _updateChildNodes(container, children) {
		    var composed = tree.Composed.getChildNodes(container);
		    var splices = calculateSplices(children, composed);
		    // process removals
		    for (var i=0, d=0, s; (i<splices.length) && (s=splices[i]); i++) {
		      for (var j=0, n; (j < s.removed.length) && (n=s.removed[j]); j++) {
		        // check if the node is still where we expect it is before trying
		        // to remove it; this can happen if we move a node and
		        // then schedule its previous host for distribution resulting in
		        // the node being removed here.
		        if (tree.Composed.getParentNode(n) === container) {
		          tree.Composed.removeChild(container, n);
		        }
		        composed.splice(s.index + d, 1);
		      }
		      d -= s.addedCount;
		    }
		    // process adds
		    for (var i$1=0, s$1, next; (i$1<splices.length) && (s$1=splices[i$1]); i$1++) { //eslint-disable-line no-redeclare
		      next = composed[s$1.index];
		      for (var j$1=s$1.index, n$1; j$1 < s$1.index + s$1.addedCount; j$1++) {
		        n$1 = children[j$1];
		        tree.Composed.insertBefore(container, n$1, next);
		        // TODO(sorvell): is this splice strictly needed?
		        composed.splice(j$1, 0, n$1);
		      }
		    }
		  },
		
		  getInsertionPointTag: function getInsertionPointTag() {
		    return this._distributor.insertionPointTag;
		  }
		
		}
		
		var ShadyFragmentMixin = Object.create(DocumentFragment.prototype);
		extend(ShadyFragmentMixin, ShadyMixin);
		
		// let needsUpgrade = window.CustomElements && !CustomElements.useNative;
		
		// function upgradeLogicalChildren(children) {
		//   if (needsUpgrade && children) {
		//     for (let i=0; i < children.length; i++) {
		//       CustomElements.upgrade(children[i]);
		//     }
		//   }
		// }
		
		// render enqueuer/flusher
		var customElements = window.customElements;
		var flushList = [];
		var scheduled;
		var flushCount = 0;
		var flushMax = 100;
		function enqueue(callback) {
		  if (!scheduled) {
		    scheduled = true;
		    promish.then(flush$1);
		  }
		  flushList.push(callback);
		}
		
		function flush$1() {
		  scheduled = false;
		  flushCount++;
		  while (flushList.length) {
		    flushList.shift()();
		  }
		  if (customElements && customElements.flush) {
		    customElements.flush();
		  }
		  // continue flushing after elements are upgraded...
		  var isFlushedMaxed = (flushCount > flushMax);
		  if (flushList.length && !isFlushedMaxed) {
		      flush$1();
		  }
		  flushCount = 0;
		  if (isFlushedMaxed) {
		    throw new Error('Loop detected in ShadyDOM distribution, aborting.')
		  }
		}
		
		flush$1.list = flushList;
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		// Cribbed from ShadowDOM polyfill
		// https://github.com/webcomponents/webcomponentsjs/blob/master/src/ShadowDOM/wrappers/HTMLElement.js#L28
		/////////////////////////////////////////////////////////////////////////////
		// innerHTML and outerHTML
		
		// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
		var escapeAttrRegExp = /[&\u00A0"]/g;
		var escapeDataRegExp = /[&\u00A0<>]/g;
		
		function escapeReplace(c) {
		  switch (c) {
		    case '&':
		      return '&amp;';
		    case '<':
		      return '&lt;';
		    case '>':
		      return '&gt;';
		    case '"':
		      return '&quot;';
		    case '\u00A0':
		      return '&nbsp;';
		  }
		}
		
		function escapeAttr(s) {
		  return s.replace(escapeAttrRegExp, escapeReplace);
		}
		
		function escapeData(s) {
		  return s.replace(escapeDataRegExp, escapeReplace);
		}
		
		function makeSet(arr) {
		  var set = {};
		  for (var i = 0; i < arr.length; i++) {
		    set[arr[i]] = true;
		  }
		  return set;
		}
		
		// http://www.whatwg.org/specs/web-apps/current-work/#void-elements
		var voidElements = makeSet([
		  'area',
		  'base',
		  'br',
		  'col',
		  'command',
		  'embed',
		  'hr',
		  'img',
		  'input',
		  'keygen',
		  'link',
		  'meta',
		  'param',
		  'source',
		  'track',
		  'wbr'
		]);
		
		var plaintextParents = makeSet([
		  'style',
		  'script',
		  'xmp',
		  'iframe',
		  'noembed',
		  'noframes',
		  'plaintext',
		  'noscript'
		]);
		
		function getOuterHTML(node, parentNode, composed) {
		  switch (node.nodeType) {
		    case Node.ELEMENT_NODE: {
		      var tagName = node.localName;
		      var s = '<' + tagName;
		      var attrs = node.attributes;
		      for (var i = 0, attr; (attr = attrs[i]); i++) {
		        s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
		      }
		      s += '>';
		      if (voidElements[tagName]) {
		        return s;
		      }
		      return s + getInnerHTML(node, composed) + '</' + tagName + '>';
		    }
		    case Node.TEXT_NODE: {
		      var data = node.data;
		      if (parentNode && plaintextParents[parentNode.localName]) {
		        return data;
		      }
		      return escapeData(data);
		    }
		    case Node.COMMENT_NODE: {
		      return '<!--' + node.data + '-->';
		    }
		    default: {
		      window.console.error(node);
		      throw new Error('not implemented');
		    }
		  }
		}
		
		function getInnerHTML(node, composed) {
		  if (node.localName === 'template') {
		    node = node.content;
		  }
		  var s = '';
		  var c$ = composed ? composed(node) : node.childNodes;
		  for (var i=0, l=c$.length, child; (i<l) && (child=c$[i]); i++) {
		    s += getOuterHTML(child, node, composed);
		  }
		  return s;
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var mixinImpl = {
		
		  // Try to add node. Record logical info, track insertion points, perform
		  // distribution iff needed. Return true if the add is handled.
		  addNode: function addNode(container, node, ref_node) {
		    var ownerRoot = this.ownerShadyRootForNode(container);
		    if (ownerRoot) {
		      // optimization: special insertion point tracking
		      if (node.__noInsertionPoint && ownerRoot._clean) {
		        ownerRoot._skipUpdateInsertionPoints = true;
		      }
		      // note: we always need to see if an insertion point is added
		      // since this saves logical tree info; however, invalidation state
		      // needs
		      var ipAdded = this._maybeAddInsertionPoint(node, container, ownerRoot);
		      // invalidate insertion points IFF not already invalid!
		      if (ipAdded) {
		        ownerRoot._skipUpdateInsertionPoints = false;
		      }
		    }
		    if (tree.Logical.hasChildNodes(container)) {
		      tree.Logical.recordInsertBefore(node, container, ref_node);
		    }
		    // if not distributing and not adding to host, do a fast path addition
		    var handled = this._maybeDistribute(node, container, ownerRoot) ||
		      container.shadyRoot;
		    return handled;
		  },
		
		  // Try to remove node: update logical info and perform distribution iff
		  // needed. Return true if the removal has been handled.
		  // note that it's possible for both the node's host and its parent
		  // to require distribution... both cases are handled here.
		  removeNode: function removeNode(node) {
		    // important that we want to do this only if the node has a logical parent
		    var logicalParent = tree.Logical.hasParentNode(node) &&
		      tree.Logical.getParentNode(node);
		    var distributed;
		    var ownerRoot = this.ownerShadyRootForNode(node);
		    if (logicalParent) {
		      // distribute node's parent iff needed
		      distributed = this.maybeDistributeParent(node);
		      tree.Logical.recordRemoveChild(node, logicalParent);
		      // remove node from root and distribute it iff needed
		      if (ownerRoot && (this._removeDistributedChildren(ownerRoot, node) ||
		        logicalParent.localName === ownerRoot.getInsertionPointTag())) {
		        ownerRoot._skipUpdateInsertionPoints = false;
		        ownerRoot.update();
		      }
		    }
		    this._removeOwnerShadyRoot(node);
		    return distributed;
		  },
		
		
		  _scheduleObserver: function _scheduleObserver(node, addedNode, removedNode) {
		    var observer = node.__dom && node.__dom.observer;
		    if (observer) {
		      if (addedNode) {
		        observer.addedNodes.push(addedNode);
		      }
		      if (removedNode) {
		        observer.removedNodes.push(removedNode);
		      }
		      observer.schedule();
		    }
		  },
		
		  removeNodeFromParent: function removeNodeFromParent(node, parent) {
		    if (parent) {
		      this._scheduleObserver(parent, null, node);
		      this.removeNode(node);
		    } else {
		      this._removeOwnerShadyRoot(node);
		    }
		  },
		
		  _hasCachedOwnerRoot: function _hasCachedOwnerRoot(node) {
		    return Boolean(node.__ownerShadyRoot !== undefined);
		  },
		
		  getRootNode: function getRootNode$1(node) {
		    if (!node || !node.nodeType) {
		      return;
		    }
		    var root = node.__ownerShadyRoot;
		    if (root === undefined) {
		      if (isShadyRoot(node)) {
		        root = node;
		      } else {
		        var parent = tree.Logical.getParentNode(node);
		        root = parent ? this.getRootNode(parent) : node;
		      }
		      // memo-ize result for performance but only memo-ize
		      // result if node is in the document. This avoids a problem where a root
		      // can be cached while an element is inside a fragment.
		      // If this happens and we cache the result, the value can become stale
		      // because for perf we avoid processing the subtree of added fragments.
		      if (document.documentElement.contains(node)) {
		        node.__ownerShadyRoot = root;
		      }
		    }
		    return root;
		  },
		
		  ownerShadyRootForNode: function ownerShadyRootForNode(node) {
		    var root = this.getRootNode(node);
		    if (isShadyRoot(root)) {
		      return root;
		    }
		  },
		
		  _maybeDistribute: function _maybeDistribute(node, container, ownerRoot) {
		    // TODO(sorvell): technically we should check non-fragment nodes for
		    // <content> children but since this case is assumed to be exceedingly
		    // rare, we avoid the cost and will address with some specific api
		    // when the need arises.  For now, the user must call
		    // distributeContent(true), which updates insertion points manually
		    // and forces distribution.
		    var insertionPointTag = ownerRoot && ownerRoot.getInsertionPointTag() || '';
		    var fragContent = (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) &&
		      !node.__noInsertionPoint &&
		      insertionPointTag && node.querySelector(insertionPointTag);
		    var wrappedContent = fragContent &&
		      (tree.Logical.getParentNode(fragContent).nodeType !==
		      Node.DOCUMENT_FRAGMENT_NODE);
		    var hasContent = fragContent || (node.localName === insertionPointTag);
		    // There are 3 possible cases where a distribution may need to occur:
		    // 1. <content> being inserted (the host of the shady root where
		    //    content is inserted needs distribution)
		    // 2. children being inserted into parent with a shady root (parent
		    //    needs distribution)
		    // 3. container is an insertionPoint
		    if (hasContent || (container.localName === insertionPointTag)) {
		      if (ownerRoot) {
		        // note, insertion point list update is handled after node
		        // mutations are complete
		        ownerRoot.update();
		      }
		    }
		    var needsDist = this._nodeNeedsDistribution(container);
		    if (needsDist) {
		      container.shadyRoot.update();
		    }
		    // Return true when distribution will fully handle the composition
		    // Note that if a content was being inserted that was wrapped by a node,
		    // and the parent does not need distribution, return false to allow
		    // the nodes to be added directly, after which children may be
		    // distributed and composed into the wrapping node(s)
		    return needsDist || (hasContent && !wrappedContent);
		  },
		
		  /* note: parent argument is required since node may have an out
		  of date parent at this point; returns true if a <content> is being added */
		  _maybeAddInsertionPoint: function _maybeAddInsertionPoint(node, parent, root) {
		    var this$1 = this;
		
		    var added;
		    var insertionPointTag = root.getInsertionPointTag();
		    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
		      !node.__noInsertionPoint) {
		      var c$ = node.querySelectorAll(insertionPointTag);
		      for (var i=0, n, np, na; (i<c$.length) && (n=c$[i]); i++) {
		        np = tree.Logical.getParentNode(n);
		        // don't allow node's parent to be fragment itself
		        if (np === node) {
		          np = parent;
		        }
		        na = this$1._maybeAddInsertionPoint(n, np, root);
		        added = added || na;
		      }
		    } else if (node.localName === insertionPointTag) {
		      tree.Logical.saveChildNodes(parent);
		      tree.Logical.saveChildNodes(node);
		      added = true;
		    }
		    return added;
		  },
		
		  _nodeNeedsDistribution: function _nodeNeedsDistribution(node) {
		    return node && node.shadyRoot &&
		      node.shadyRoot.hasInsertionPoint();
		  },
		
		  _removeDistributedChildren: function _removeDistributedChildren(root, container) {
		    var this$1 = this;
		
		    var hostNeedsDist;
		    var ip$ = root._insertionPoints;
		    for (var i=0; i<ip$.length; i++) {
		      var insertionPoint = ip$[i];
		      if (this$1._contains(container, insertionPoint)) {
		        var dc$ = insertionPoint.assignedNodes({flatten: true});
		        for (var j=0; j<dc$.length; j++) {
		          hostNeedsDist = true;
		          var node = dc$[j];
		          var parent = tree.Composed.getParentNode(node);
		          if (parent) {
		            tree.Composed.removeChild(parent, node);
		          }
		        }
		      }
		    }
		    return hostNeedsDist;
		  },
		
		  _contains: function _contains(container, node) {
		    while (node) {
		      if (node == container) {
		        return true;
		      }
		      node = tree.Logical.getParentNode(node);
		    }
		  },
		
		  _removeOwnerShadyRoot: function _removeOwnerShadyRoot(node) {
		    var this$1 = this;
		
		    // optimization: only reset the tree if node is actually in a root
		    if (this._hasCachedOwnerRoot(node)) {
		      var c$ = tree.Logical.getChildNodes(node);
		      for (var i=0, l=c$.length, n; (i<l) && (n=c$[i]); i++) {
		        this$1._removeOwnerShadyRoot(n);
		      }
		    }
		    node.__ownerShadyRoot = undefined;
		  },
		
		  // TODO(sorvell): This will fail if distribution that affects this
		  // question is pending; this is expected to be exceedingly rare, but if
		  // the issue comes up, we can force a flush in this case.
		  firstComposedNode: function firstComposedNode(insertionPoint) {
		    var n$ = insertionPoint.assignedNodes({flatten: true});
		    var root = this.getRootNode(insertionPoint);
		    for (var i=0, l=n$.length, n; (i<l) && (n=n$[i]); i++) {
		      // means that we're composed to this spot.
		      if (root.isFinalDestination(insertionPoint, n)) {
		        return n;
		      }
		    }
		  },
		
		  clearNode: function clearNode(node) {
		    while (node.firstChild) {
		      node.removeChild(node.firstChild);
		    }
		  },
		
		  maybeDistributeParent: function maybeDistributeParent(node) {
		    var parent = tree.Logical.getParentNode(node);
		    if (this._nodeNeedsDistribution(parent)) {
		      parent.shadyRoot.update();
		      return true;
		    }
		  },
		
		  maybeDistributeAttributeChange: function maybeDistributeAttributeChange(node, name) {
		    if (name === 'slot') {
		      this.maybeDistributeParent(node);
		    } else if (node.localName === 'slot' && name === 'name') {
		      var root = this.ownerShadyRootForNode(node);
		      if (root) {
		        root.update();
		      }
		    }
		  },
		
		  // NOTE: `query` is used primarily for ShadyDOM's querySelector impl,
		  // but it's also generally useful to recurse through the element tree
		  // and is used by Polymer's styling system.
		  query: function query(node, matcher, halter) {
		    var list = [];
		    this._queryElements(tree.Logical.getChildNodes(node), matcher,
		      halter, list);
		    return list;
		  },
		
		  _queryElements: function _queryElements(elements, matcher, halter, list) {
		    var this$1 = this;
		
		    for (var i=0, l=elements.length, c; (i<l) && (c=elements[i]); i++) {
		      if (c.nodeType === Node.ELEMENT_NODE &&
		          this$1._queryElement(c, matcher, halter, list)) {
		        return true;
		      }
		    }
		  },
		
		  _queryElement: function _queryElement(node, matcher, halter, list) {
		    var result = matcher(node);
		    if (result) {
		      list.push(node);
		    }
		    if (halter && halter(result)) {
		      return result;
		    }
		    this._queryElements(tree.Logical.getChildNodes(node), matcher,
		      halter, list);
		  },
		
		  activeElementForNode: function activeElementForNode(node) {
		    var this$1 = this;
		
		    var active = document.activeElement;
		    if (!active) {
		      return null;
		    }
		    var isShadyRoot$$1 = !!(isShadyRoot(node));
		    if (node !== document) {
		      // If this node isn't a document or shady root, then it doesn't have
		      // an active element.
		      if (!isShadyRoot$$1) {
		        return null;
		      }
		      // If this shady root's host is the active element or the active
		      // element is not a descendant of the host (in the composed tree),
		      // then it doesn't have an active element.
		      if (node.host === active ||
		          !node.host.contains(active)) {
		        return null;
		      }
		    }
		    // This node is either the document or a shady root of which the active
		    // element is a (composed) descendant of its host; iterate upwards to
		    // find the active element's most shallow host within it.
		    var activeRoot = this.ownerShadyRootForNode(active);
		    while (activeRoot && activeRoot !== node) {
		      active = activeRoot.host;
		      activeRoot = this$1.ownerShadyRootForNode(active);
		    }
		    if (node === document) {
		      // This node is the document, so activeRoot should be null.
		      return activeRoot ? null : active;
		    } else {
		      // This node is a non-document shady root, and it should be
		      // activeRoot.
		      return activeRoot === node ? active : null;
		    }
		  }
		
		};
		
		var nativeCloneNode = Element.prototype.cloneNode;
		var nativeImportNode = Document.prototype.importNode;
		var nativeSetAttribute = Element.prototype.setAttribute;
		var nativeRemoveAttribute = Element.prototype.removeAttribute;
		
		var setAttribute = function(attr, value) {
		  if (window.ShadyCSS && attr === 'class') {
		    window.ShadyCSS.setElementClass(this, value);
		  } else {
		    nativeSetAttribute.call(this, attr, value);
		  }
		}
		
		var NodeMixin = {};
		
		Object.defineProperties(NodeMixin, {
		
		  parentElement: {
		    get: function get() {
		      return tree.Logical.getParentNode(this);
		    },
		    configurable: true
		  },
		
		  parentNode: {
		    get: function get$1() {
		      return tree.Logical.getParentNode(this);
		    },
		    configurable: true
		  },
		
		  nextSibling: {
		    get: function get$2() {
		      return tree.Logical.getNextSibling(this);
		    },
		    configurable: true
		  },
		
		  previousSibling: {
		    get: function get$3() {
		      return tree.Logical.getPreviousSibling(this);
		    },
		    configurable: true
		  },
		
		  nextElementSibling: {
		    get: function get$4() {
		      return tree.Logical.getNextElementSibling(this);
		    },
		    configurable: true
		  },
		
		  previousElementSibling: {
		    get: function get$5() {
		      return tree.Logical.getPreviousElementSibling(this);
		    },
		    configurable: true
		  },
		
		  assignedSlot: {
		    get: function get$6() {
		      return this._assignedSlot;
		    },
		    configurable: true
		  }
		});
		
		var FragmentMixin = {
		
		  appendChild: function appendChild(node) {
		    return this.insertBefore(node);
		  },
		
		  // cases in which we may not be able to just do standard native call
		  // 1. container has a shadyRoot (needsDistribution IFF the shadyRoot
		  // has an insertion point)
		  // 2. container is a shadyRoot (don't distribute, instead set
		  // container to container.host.
		  // 3. node is <content> (host of container needs distribution)
		  insertBefore: function insertBefore(node, ref_node) {
		    if (ref_node && tree.Logical.getParentNode(ref_node) !== this) {
		      throw Error('The ref_node to be inserted before is not a child ' +
		        'of this node');
		    }
		    // remove node from its current position iff it's in a tree.
		    if (node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
		      var parent = tree.Logical.getParentNode(node);
		      mixinImpl.removeNodeFromParent(node, parent);
		    }
		    if (!mixinImpl.addNode(this, node, ref_node)) {
		      if (ref_node) {
		        // if ref_node is an insertion point replace with first distributed node
		        var root = mixinImpl.ownerShadyRootForNode(ref_node);
		        if (root) {
		          ref_node = ref_node.localName === root.getInsertionPointTag() ?
		            mixinImpl.firstComposedNode(ref_node) : ref_node;
		        }
		      }
		      // if adding to a shadyRoot, add to host instead
		      var container = isShadyRoot(this) ?
		        this.host : this;
		      if (ref_node) {
		        tree.Composed.insertBefore(container, node, ref_node);
		      } else {
		        tree.Composed.appendChild(container, node);
		      }
		    }
		    mixinImpl._scheduleObserver(this, node);
		    return node;
		  },
		
		  /**
		    Removes the given `node` from the element's `lightChildren`.
		    This method also performs dom composition.
		  */
		  removeChild: function removeChild(node) {
		    if (tree.Logical.getParentNode(node) !== this) {
		      throw Error('The node to be removed is not a child of this node: ' +
		        node);
		    }
		    if (!mixinImpl.removeNode(node)) {
		      // if removing from a shadyRoot, remove form host instead
		      var container = isShadyRoot(this) ?
		        this.host :
		        this;
		      // not guaranteed to physically be in container; e.g.
		      // undistributed nodes.
		      var parent = tree.Composed.getParentNode(node);
		      if (container === parent) {
		        tree.Composed.removeChild(container, node);
		      }
		    }
		    mixinImpl._scheduleObserver(this, null, node);
		    return node;
		  },
		
		  replaceChild: function replaceChild(node, ref_node) {
		    this.insertBefore(node, ref_node);
		    this.removeChild(ref_node);
		    return node;
		  },
		
		  // TODO(sorvell): consider doing native QSA and filtering results.
		  querySelector: function querySelector(selector) {
		    // match selector and halt on first result.
		    var result = mixinImpl.query(this, function(n) {
		      return matchesSelector(n, selector);
		    }, function(n) {
		      return Boolean(n);
		    })[0];
		    return result || null;
		  },
		
		  querySelectorAll: function querySelectorAll(selector) {
		    return mixinImpl.query(this, function(n) {
		      return matchesSelector(n, selector);
		    });
		  },
		
		  cloneNode: function cloneNode(deep) {
		    if (this.localName == 'template') {
		      return nativeCloneNode.call(this, deep);
		    } else {
		      var n = nativeCloneNode.call(this, false);
		      if (deep) {
		        var c$ = this.childNodes;
		        for (var i=0, nc; i < c$.length; i++) {
		          nc = c$[i].cloneNode(true);
		          n.appendChild(nc);
		        }
		      }
		      return n;
		    }
		  },
		
		  importNode: function importNode(externalNode, deep) {
		    // for convenience use this node's ownerDoc if the node isn't a document
		    var doc = this instanceof Document ? this :
		      this.ownerDocument;
		    var n = nativeImportNode.call(doc, externalNode, false);
		    if (deep) {
		      var c$ = tree.Logical.getChildNodes(externalNode);
		      common.patchNode(n);
		      for (var i=0, nc; i < c$.length; i++) {
		        nc = doc.importNode(c$[i], true);
		        n.appendChild(nc);
		      }
		    }
		    return n;
		  }
		};
		
		Object.defineProperties(FragmentMixin, {
		
		  childNodes: {
		    get: function get$7() {
		      var c$ = tree.Logical.getChildNodes(this);
		      return Array.isArray(c$) ? c$ : tree.arrayCopyChildNodes(this);
		    },
		    configurable: true
		  },
		
		  children: {
		    get: function get$8() {
		      if (tree.Logical.hasChildNodes(this)) {
		        return Array.prototype.filter.call(this.childNodes, function(n) {
		          return (n.nodeType === Node.ELEMENT_NODE);
		        });
		      } else {
		        return tree.arrayCopyChildren(this);
		      }
		    },
		    configurable: true
		  },
		
		  firstChild: {
		    get: function get$9() {
		      return tree.Logical.getFirstChild(this);
		    },
		    configurable: true
		  },
		
		  lastChild: {
		    get: function get$10() {
		      return tree.Logical.getLastChild(this);
		    },
		    configurable: true
		  },
		
		  firstElementChild: {
		    get: function get$11() {
		      return tree.Logical.getFirstElementChild(this);
		    },
		    configurable: true
		  },
		
		  lastElementChild: {
		    get: function get$12() {
		      return tree.Logical.getLastElementChild(this);
		    },
		    configurable: true
		  },
		
		  // TODO(srovell): strictly speaking fragments do not have textContent
		  // or innerHTML but ShadowRoots do and are not easily distinguishable.
		  // textContent / innerHTML
		  textContent: {
		    get: function get$13() {
		      if (this.childNodes) {
		        var tc = [];
		        for (var i = 0, cn = this.childNodes, c; (c = cn[i]); i++) {
		          if (c.nodeType !== Node.COMMENT_NODE) {
		            tc.push(c.textContent);
		          }
		        }
		        return tc.join('');
		      }
		      return '';
		    },
		    set: function set(text) {
		      mixinImpl.clearNode(this);
		      if (text) {
		        this.appendChild(document.createTextNode(text));
		      }
		    },
		    configurable: true
		  },
		
		  innerHTML: {
		    get: function get$14() {
		      return getInnerHTML(this);
		    },
		    set: function set$1(text) {
		      var this$1 = this;
		
		      mixinImpl.clearNode(this);
		      var d = document.createElement('div');
		      d.innerHTML = text;
		      // here, appendChild may move nodes async so we cannot rely
		      // on node position when copying
		      var c$ = tree.arrayCopyChildNodes(d);
		      for (var i=0; i < c$.length; i++) {
		        this$1.appendChild(c$[i]);
		      }
		    },
		    configurable: true
		  }
		
		});
		
		var ElementMixin = {
		
		  // TODO(sorvell): should only exist on <slot>
		  assignedNodes: function assignedNodes(options) {
		    return (options && options.flatten ? this._distributedNodes :
		      this._assignedNodes) || [];
		  },
		
		
		  setAttribute: function setAttribute$1(name, value) {
		    setAttribute.call(this, name, value);
		    mixinImpl.maybeDistributeAttributeChange(this, name);
		  },
		
		  removeAttribute: function removeAttribute(name) {
		    nativeRemoveAttribute.call(this, name);
		    mixinImpl.maybeDistributeAttributeChange(this, name);
		  }
		
		};
		
		Object.defineProperties(ElementMixin, {
		
		  shadowRoot: {
		    get: function get$15() {
		      return this.shadyRoot;
		    }
		  },
		
		  slot: {
		    get: function get$16() {
		      return this.getAttribute('slot');
		    },
		    set: function set$2(value) {
		      this.setAttribute('slot', value);
		    }
		  }
		
		});
		
		var activeElementDescriptor = {
		  get: function get$17() {
		    return mixinImpl.activeElementForNode(this);
		  }
		}
		
		var ActiveElementMixin = {};
		Object.defineProperties(ActiveElementMixin, {
		  activeElement: activeElementDescriptor
		});
		
		var UnderActiveElementMixin = {};
		Object.defineProperties(UnderActiveElementMixin, {
		  _activeElement: activeElementDescriptor
		});
		
		var Mixins = {
		
		  Node: extendAll({__patched: 'Node'}, NodeMixin),
		
		  Fragment: extendAll({__patched: 'Fragment'},
		    NodeMixin, FragmentMixin, ActiveElementMixin),
		
		  Element: extendAll({__patched: 'Element'},
		    NodeMixin, FragmentMixin, ElementMixin, ActiveElementMixin),
		
		  // Note: activeElement cannot be patched on document!
		  Document: extendAll({__patched: 'Document'},
		    NodeMixin, FragmentMixin, ElementMixin, UnderActiveElementMixin)
		
		};
		
		var getRootNode = function(node) {
		  return mixinImpl.getRootNode(node);
		}
		
		function filterMutations(mutations, target) {
		  var targetRootNode = getRootNode(target);
		  return mutations.filter(function(mutation) {
		    var mutationInScope = (targetRootNode === getRootNode(mutation.target));
		    if (mutationInScope && mutation.addedNodes) {
		      var nodes = Array.from(mutation.addedNodes).filter(function(n) {
		        return (targetRootNode === getRootNode(n));
		      });
		      Object.defineProperty(mutation, 'addedNodes', {
		        value: nodes,
		        configurable: true
		      });
		    }
		    return mutationInScope &&
		      (!mutation.addedNodes || mutation.addedNodes.length);
		  });
		}
		
		// const promise = Promise.resolve();
		
		var AsyncObserver = function AsyncObserver() {
		  this._scheduled = false;
		  this.addedNodes = [];
		  this.removedNodes = [];
		  this.callbacks = new Set();
		};
		
		AsyncObserver.prototype.schedule = function schedule () {
		    var this$1 = this;
		
		  if (!this._scheduled) {
		    this._scheduled = true;
		    promish.then(function () {
		      this$1.flush();
		    });
		  }
		};
		
		AsyncObserver.prototype.flush = function flush () {
		  if (this._scheduled) {
		    this._scheduled = false;
		    var mutations = this.takeRecords();
		    if (mutations.length) {
		      this.callbacks.forEach(function(cb) {
		        cb(mutations);
		      });
		    }
		  }
		};
		
		AsyncObserver.prototype.takeRecords = function takeRecords () {
		  if (this.addedNodes.length || this.removedNodes.length) {
		    var mutations = [{
		      addedNodes: this.addedNodes,
		      removedNodes: this.removedNodes
		    }];
		    this.addedNodes = [];
		    this.removedNodes = [];
		    return mutations;
		  }
		  return [];
		};
		
		// TODO(sorvell): consider instead polyfilling MutationObserver
		// directly so that users do not have to fork their code.
		// Supporting the entire api may be challenging: e.g. filtering out
		// removed nodes in the wrong scope and seeing non-distributing
		// subtree child mutations.
		var observeChildren = function(node, callback) {
		  common.patchNode(node);
		  if (!node.__dom.observer) {
		    node.__dom.observer = new AsyncObserver();
		  }
		  node.__dom.observer.callbacks.add(callback);
		  var observer = node.__dom.observer;
		  return {
		    _callback: callback,
		    _observer: observer,
		    _node: node,
		    takeRecords: function takeRecords() {
		      return observer.takeRecords()
		    }
		  };
		}
		
		var unobserveChildren = function(handle) {
		  var observer = handle && handle._observer;
		  if (observer) {
		    observer.callbacks.delete(handle._callback);
		    if (!observer.callbacks.size) {
		      handle._node.__dom.observer = null;
		    }
		  }
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		/**
		 * Patches elements that interacts with ShadyDOM
		 * such that tree traversal and mutation apis act like they would under
		 * ShadowDOM.
		 *
		 * This import enables seemless interaction with ShadyDOM powered
		 * custom elements, enabling better interoperation with 3rd party code,
		 * libraries, and frameworks that use DOM tree manipulation apis.
		 */
		
		var patchedCount = 0;
		
		var log = false;
		
		var patchImpl = {
		
		  canPatchNode: function(node) {
		    switch (node) {
		      case document.head:
		      case document.documentElement:
		        return false;
		      default:
		        return true;
		    }
		  },
		
		  hasPrototypeDescriptors: Boolean(Object.getOwnPropertyDescriptor(
		    window.Node.prototype, 'textContent')),
		
		  patch: function(node) {
		    patchedCount++;
		    log && window.console.warn('patch node', node);
		    if (this.hasPrototypeDescriptors) {
		      patchPrototype(node, this.mixinForObject(node));
		    } else {
		      window.console.warn('Patching instance rather than prototype', node);
		      extend(node, this.mixinForNode(node));
		    }
		  },
		
		  mixinForObject: function(obj) {
		    switch (obj.nodeType) {
		      case Node.ELEMENT_NODE:
		        return Mixins.Element;
		      case Node.DOCUMENT_FRAGMENT_NODE:
		        return Mixins.Fragment;
		      case Node.DOCUMENT_NODE:
		        return Mixins.Document;
		      case Node.TEXT_NODE:
		      case Node.COMMENT_NODE:
		        return Mixins.Node;
		    }
		  },
		
		  unpatch: function(obj) {
		    if (obj.__sourceProto) {
		      obj.__proto__ = obj.__sourceProto;
		
		    }
		    // TODO(sorvell): implement unpatching for non-proto patchable browsers
		  }
		
		};
		
		function patchNode(node) {
		  if (!settings.inUse) {
		    return;
		  }
		  if (!isNodePatched(node) && patchImpl.canPatchNode(node)) {
		    tree.saveChildNodes(node);
		    patchImpl.patch(node);
		  }
		}
		
		function unpatchNode(node) {
		  patchImpl.unpatch(node);
		}
		
		function isNodePatched(node) {
		  return Boolean(node.__patched);
		}
		
		// TODO(sorvell): fake export
		common.patchNode = patchNode;
		common.isNodePatched = isNodePatched;
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var origAddEventListener = Element.prototype.addEventListener;
		var origRemoveEventListener = Element.prototype.removeEventListener;
		
		// https://github.com/w3c/webcomponents/issues/513#issuecomment-224183937
		var alwaysComposed = {
		  blur: true,
		  focus: true,
		  focusin: true,
		  focusout: true,
		  click: true,
		  dblclick: true,
		  mousedown: true,
		  mouseenter: true,
		  mouseleave: true,
		  mousemove: true,
		  mouseout: true,
		  mouseover: true,
		  mouseup: true,
		  wheel: true,
		  beforeinput: true,
		  input: true,
		  keydown: true,
		  keyup: true,
		  compositionstart: true,
		  compositionupdate: true,
		  compositionend: true,
		  touchstart: true,
		  touchend: true,
		  touchmove: true,
		  touchcancel: true,
		  pointerover: true,
		  pointerenter: true,
		  pointerdown: true,
		  pointermove: true,
		  pointerup: true,
		  pointercancel: true,
		  pointerout: true,
		  pointerleave: true,
		  gotpointercapture: true,
		  lostpointercapture: true,
		  dragstart: true,
		  drag: true,
		  dragenter: true,
		  dragleave: true,
		  dragover: true,
		  drop: true,
		  dragend: true,
		  DOMActivate: true,
		  DOMFocusIn: true,
		  DOMFocusOut: true,
		  keypress: true
		};
		
		function pathComposer(startNode, composed) {
		  var composedPath = [];
		  var current = startNode;
		  var startRoot = startNode === window ? window : startNode.getRootNode();
		  while (current) {
		    composedPath.push(current);
		    if (current.assignedSlot) {
		      current = current.assignedSlot;
		    } else if (current.nodeType === Node.DOCUMENT_FRAGMENT_NODE && current.host && (composed || current !== startRoot)) {
		      current = current.host;
		    } else {
		      current = current.parentNode;
		    }
		  }
		  // event composedPath includes window when startNode's ownerRoot is document
		  if (composedPath[composedPath.length - 1] === document) {
		    composedPath.push(window);
		  }
		  return composedPath;
		}
		
		function retarget(refNode, path) {
		  if (!isShadyRoot) {
		    return refNode;
		  }
		  // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
		  // shadow-including inclusive ancestor, return ANCESTOR.
		  var refNodePath = pathComposer(refNode, true);
		  var p$ = path;
		  for (var i=0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
		    ancestor = p$[i];
		    root = ancestor === window ? window : ancestor.getRootNode();
		    if (root !== lastRoot) {
		      rootIdx = refNodePath.indexOf(root);
		      lastRoot = root;
		    }
		    if (!isShadyRoot(root) || rootIdx > -1) {
		      return ancestor;
		    }
		  }
		}
		
		var EventMixin = {
		
		  __patched: 'Event',
		
		  get composed() {
		    if (this.isTrusted && this.__composed === undefined) {
		      this.__composed = alwaysComposed[this.type];
		    }
		    return this.__composed || false;
		  },
		
		  composedPath: function composedPath() {
		    if (!this.__composedPath) {
		      this.__composedPath = pathComposer(this.__target, this.composed);
		    }
		    return this.__composedPath;
		  },
		
		  get target() {
		    return retarget(this.currentTarget, this.composedPath());
		  },
		
		  // http://w3c.github.io/webcomponents/spec/shadow/#event-relatedtarget-retargeting
		  get relatedTarget() {
		    if (!this.__relatedTarget) {
		      return null;
		    }
		    if (!this.__relatedTargetComposedPath) {
		      this.__relatedTargetComposedPath = pathComposer(this.__relatedTarget, true);
		    }
		    // find the deepest node in relatedTarget composed path that is in the same root with the currentTarget
		    return retarget(this.currentTarget, this.__relatedTargetComposedPath);
		  },
		  stopPropagation: function stopPropagation() {
		    Event.prototype.stopPropagation.call(this);
		    this.__propagationStopped = true;
		  },
		  stopImmediatePropagation: function stopImmediatePropagation() {
		    Event.prototype.stopImmediatePropagation.call(this);
		    this.__immediatePropagationStopped = true;
		    this.__propagationStopped = true;
		  }
		
		};
		
		function mixinComposedFlag(Base) {
		  // NOTE: avoiding use of `class` here so that transpiled output does not
		  // try to do `Base.call` with a dom construtor.
		  var klazz = function(type, options) {
		    var event = new Base(type, options);
		    event.__composed = options && Boolean(options.composed);
		    return event;
		  }
		  // put constructor properties on subclass
		  mixin(klazz, Base);
		  klazz.prototype = Base.prototype;
		  return klazz;
		}
		
		var nonBubblingEventsToRetarget = {
		  focus: true,
		  blur: true
		};
		
		function fireHandlers(event, node, phase) {
		  var hs = node.__handlers && node.__handlers[event.type] &&
		    node.__handlers[event.type][phase];
		  if (hs) {
		    for (var i = 0, fn; (fn = hs[i]); i++) {
		      fn.call(node, event);
		      if (event.__immediatePropagationStopped) {
		        return;
		      }
		    }
		  }
		}
		
		function retargetNonBubblingEvent(e) {
		  var path = e.composedPath();
		  var node;
		  // override `currentTarget` to let patched `target` calculate correctly
		  Object.defineProperty(e, 'currentTarget', {
		    get: function() {
		      return node;
		    },
		    configurable: true
		  });
		  for (var i = path.length - 1; i >= 0; i--) {
		    node = path[i];
		    // capture phase fires all capture handlers
		    fireHandlers(e, node, 'capture');
		    if (e.__propagationStopped) {
		      return;
		    }
		  }
		
		  // set the event phase to `AT_TARGET` as in spec
		  Object.defineProperty(e, 'eventPhase', {value: Event.AT_TARGET});
		
		  // the event only needs to be fired when owner roots change when iterating the event path
		  // keep track of the last seen owner root
		  var lastFiredRoot;
		  for (var i$1 = 0; i$1 < path.length; i$1++) {
		    node = path[i$1];
		    if (i$1 === 0 || (node.shadowRoot && node.shadowRoot === lastFiredRoot)) {
		      fireHandlers(e, node, 'bubble');
		      // don't bother with window, it doesn't have `getRootNode` and will be last in the path anyway
		      if (node !== window) {
		        lastFiredRoot = node.getRootNode();
		      }
		      if (e.__propagationStopped) {
		        return;
		      }
		    }
		  }
		}
		
		function addEventListener(type, fn, optionsOrCapture) {
		  var this$1 = this;
		
		  if (!fn) {
		    return;
		  }
		
		  // The callback `fn` might be used for multiple nodes/events. Since we generate
		  // a wrapper function, we need to keep track of it when we remove the listener.
		  // It's more efficient to store the node/type/options information as Array in
		  // `fn` itself rather than the node (we assume that the same callback is used
		  // for few nodes at most, whereas a node will likely have many event listeners).
		  // NOTE(valdrin) invoking external functions is costly, inline has better perf.
		  var capture, once, passive;
		  if (typeof optionsOrCapture === 'object') {
		    capture = Boolean(optionsOrCapture.capture);
		    once = Boolean(optionsOrCapture.once);
		    passive = Boolean(optionsOrCapture.passive);
		  } else {
		    capture = Boolean(optionsOrCapture);
		    once = false;
		    passive = false;
		  }
		  if (fn.__eventWrappers) {
		    // Stop if the wrapper function has already been created.
		    for (var i = 0; i < fn.__eventWrappers.length; i++) {
		      if (fn.__eventWrappers[i].node === this$1 &&
		          fn.__eventWrappers[i].type === type &&
		          fn.__eventWrappers[i].capture === capture &&
		          fn.__eventWrappers[i].once === once &&
		          fn.__eventWrappers[i].passive === passive) {
		        return;
		      }
		    }
		  } else {
		    fn.__eventWrappers = [];
		  }
		
		  var wrapperFn = function(e) {
		    // Support `once` option.
		    if (once) {
		      this.removeEventListener(type, fn, optionsOrCapture);
		    }
		    if (!e.__target) {
		      e.__target = e.target;
		      e.__relatedTarget = e.relatedTarget;
		      patchPrototype(e, EventMixin);
		    }
		    // There are two critera that should stop events from firing on this node
		    // 1. the event is not composed and the current node is not in the same root as the target
		    // 2. when bubbling, if after retargeting, relatedTarget and target point to the same node
		    if (e.composed || e.composedPath().indexOf(this) > -1) {
		      if (e.eventPhase === Event.BUBBLING_PHASE) {
		        if (e.target === e.relatedTarget) {
		          e.stopImmediatePropagation();
		          return;
		        }
		      }
		      return fn(e);
		    }
		  };
		  // Store the wrapper information.
		  fn.__eventWrappers.push({
		    node: this,
		    type: type,
		    capture: capture,
		    once: once,
		    passive: passive,
		    wrapperFn: wrapperFn
		  });
		
		  if (nonBubblingEventsToRetarget[type]) {
		    this.__handlers = this.__handlers || {};
		    this.__handlers[type] = this.__handlers[type] || {capture: [], bubble: []};
		    this.__handlers[type][capture ? 'capture' : 'bubble'].push(wrapperFn);
		  } else {
		    origAddEventListener.call(this, type, wrapperFn, optionsOrCapture);
		  }
		}
		
		function removeEventListener(type, fn, optionsOrCapture) {
		  var this$1 = this;
		
		  if (!fn) {
		    return;
		  }
		
		  // NOTE(valdrin) invoking external functions is costly, inline has better perf.
		  var capture, once, passive;
		  if (typeof optionsOrCapture === 'object') {
		    capture = Boolean(optionsOrCapture.capture);
		    once = Boolean(optionsOrCapture.once);
		    passive = Boolean(optionsOrCapture.passive);
		  } else {
		    capture = Boolean(optionsOrCapture);
		    once = false;
		    passive = false;
		  }
		  // Search the wrapped function.
		  var wrapperFn = undefined;
		  if (fn.__eventWrappers) {
		    for (var i = 0; i < fn.__eventWrappers.length; i++) {
		      if (fn.__eventWrappers[i].node === this$1 &&
		          fn.__eventWrappers[i].type === type &&
		          fn.__eventWrappers[i].capture === capture &&
		          fn.__eventWrappers[i].once === once &&
		          fn.__eventWrappers[i].passive === passive) {
		        wrapperFn = fn.__eventWrappers.splice(i, 1)[0].wrapperFn;
		        // Cleanup.
		        if (!fn.__eventWrappers.length) {
		          fn.__eventWrappers = undefined;
		        }
		        break;
		      }
		    }
		  }
		
		  origRemoveEventListener.call(this, type, wrapperFn || fn, optionsOrCapture);
		  if (wrapperFn && nonBubblingEventsToRetarget[type] &&
		      this.__handlers && this.__handlers[type]) {
		    var arr = this.__handlers[type][capture ? 'capture' : 'bubble'];
		    var idx = arr.indexOf(wrapperFn);
		    if (idx > -1) {
		      arr.splice(idx, 1);
		    }
		  }
		}
		
		function activateFocusEventOverrides() {
		  for (var ev in nonBubblingEventsToRetarget) {
		    window.addEventListener(ev, function(e) {
		      if (!e.__target) {
		        e.__target = e.target;
		        e.__relatedTarget = e.relatedTarget;
		        patchPrototype(e, EventMixin);
		        retargetNonBubblingEvent(e);
		        e.stopImmediatePropagation();
		      }
		    }, true);
		  }
		}
		
		
		var PatchedEvent = mixinComposedFlag(Event);
		var PatchedCustomEvent = mixinComposedFlag(CustomEvent);
		var PatchedMouseEvent = mixinComposedFlag(MouseEvent);
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		/**
		 * Patches elements that interacts with ShadyDOM
		 * such that tree traversal and mutation apis act like they would under
		 * ShadowDOM.
		 *
		 * This import enables seemless interaction with ShadyDOM powered
		 * custom elements, enabling better interoperation with 3rd party code,
		 * libraries, and frameworks that use DOM tree manipulation apis.
		 */
		
		if (settings.inUse) {
		
		  window.ShadyDOM = {
		    tree: tree,
		    getNativeProperty: getNativeProperty,
		    patch: patchNode,
		    isPatched: isNodePatched,
		    unpatch: unpatchNode,
		    isShadyRoot: isShadyRoot,
		    enqueue: enqueue,
		    flush: flush$1,
		    inUse: settings.inUse,
		    filterMutations: filterMutations,
		    observeChildren: observeChildren,
		    unobserveChildren: unobserveChildren
		  };
		
		  var createRootAndEnsurePatched = function(node) {
		    // TODO(sorvell): need to ensure ancestors are patched but this introduces
		    // a timing problem with gathering composed children.
		    // (1) currently the child list is crawled and patched when patching occurs
		    // (this needs to change)
		    // (2) we can only patch when an element has received its parsed children
		    // because we cannot detect them when inserted by parser.
		    // let ancestor = node;
		    // while (ancestor) {
		    //   patchNode(ancestor);
		    //   ancestor = ancestor.parentNode || ancestor.host;
		    // }
		    patchNode(node);
		    var root = new ShadyRoot(node);
		    patchNode(root);
		    return root;
		  }
		
		  Element.prototype.attachShadow = function() {
		    return createRootAndEnsurePatched(this);
		  }
		
		  Node.prototype.addEventListener = addEventListener;
		  Node.prototype.removeEventListener = removeEventListener;
		  Event = PatchedEvent;
		  CustomEvent = PatchedCustomEvent;
		  MouseEvent = PatchedMouseEvent;
		  activateFocusEventOverrides();
		
		  Object.defineProperty(Node.prototype, 'isConnected', {
		    get: function get() {
		      return document.documentElement.contains(this);
		    },
		    configurable: true
		  });
		
		  Node.prototype.getRootNode = function(options) {
		    return getRootNode(this, options);
		  }
		
		  Object.defineProperty(Element.prototype, 'slot', {
		    get: function get$1() {
		      return this.getAttribute('slot');
		    },
		    set: function set(value) {
		      this.setAttribute('slot', value);
		    },
		    configurable: true
		  });
		
		  Object.defineProperty(Node.prototype, 'assignedSlot', {
		    get: function get$2() {
		      return this._assignedSlot || null;
		    },
		    configurable: true
		  });
		
		  Element.prototype.setAttribute = setAttribute;
		
		  Object.defineProperty(Element.prototype, 'className', {
		    get: function get$3() {
		      return this.getAttribute('class');
		    },
		    set: function set$1(value) {
		      this.setAttribute('class', value);
		    },
		    configurable: true
		  });
		
		  // TODO(sorvell): super experimental auto patching of document fragment
		  // via appendChild. This either needs to be expanded or contracted.
		  // DocumentFragment.prototype.appendChild = function(node) {
		  //   patchNode(this);
		  //   return this.appendChild(node);
		  // }
		
		}
		
		}());
		
		//# sourceMappingURL=shadydom.min.js.map
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		(function () {
		'use strict';
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		/*
		Extremely simple css parser. Intended to be not more than what we need
		and definitely not necessarily correct =).
		*/
		
		// given a string of css, return a simple rule tree
		
		function parse(text) {
		  text = clean(text);
		  return parseCss(lex(text), text);
		}
		
		// remove stuff we don't care about that may hinder parsing
		function clean(cssText) {
		  return cssText.replace(RX.comments, '').replace(RX.port, '');
		}
		
		// super simple {...} lexer that returns a node tree
		function lex(text) {
		  var root = {
		    start: 0,
		    end: text.length
		  };
		  var n = root;
		  for (var i = 0, l = text.length; i < l; i++) {
		    if (text[i] === OPEN_BRACE) {
		      if (!n.rules) {
		        n.rules = [];
		      }
		      var p = n;
		      var previous = p.rules[p.rules.length - 1];
		      n = {
		        start: i + 1,
		        parent: p,
		        previous: previous
		      };
		      p.rules.push(n);
		    } else if (text[i] === CLOSE_BRACE) {
		      n.end = i + 1;
		      n = n.parent || root;
		    }
		  }
		  return root;
		}
		
		// add selectors/cssText to node tree
		function parseCss(node, text) {
		  var t = text.substring(node.start, node.end - 1);
		  node.parsedCssText = node.cssText = t.trim();
		  if (node.parent) {
		    var ss = node.previous ? node.previous.end : node.parent.start;
		    t = text.substring(ss, node.start - 1);
		    t = _expandUnicodeEscapes(t);
		    t = t.replace(RX.multipleSpaces, ' ');
		    // TODO(sorvell): ad hoc; make selector include only after last ;
		    // helps with mixin syntax
		    t = t.substring(t.lastIndexOf(';') + 1);
		    var s = node.parsedSelector = node.selector = t.trim();
		    node.atRule = s.indexOf(AT_START) === 0;
		    // note, support a subset of rule types...
		    if (node.atRule) {
		      if (s.indexOf(MEDIA_START) === 0) {
		        node.type = types.MEDIA_RULE;
		      } else if (s.match(RX.keyframesRule)) {
		        node.type = types.KEYFRAMES_RULE;
		        node.keyframesName = node.selector.split(RX.multipleSpaces).pop();
		      }
		    } else {
		      if (s.indexOf(VAR_START) === 0) {
		        node.type = types.MIXIN_RULE;
		      } else {
		        node.type = types.STYLE_RULE;
		      }
		    }
		  }
		  var r$ = node.rules;
		  if (r$) {
		    for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
		      parseCss(r, text);
		    }
		  }
		  return node;
		}
		
		// conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
		// expanded form that doesn't require trailing space `\000033`
		function _expandUnicodeEscapes(s) {
		  return s.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
		    var code = arguments[1],
		        repeat = 6 - code.length;
		    while (repeat--) {
		      code = '0' + code;
		    }
		    return '\\' + code;
		  });
		}
		
		// stringify parsed css.
		function stringify(node, preserveProperties, text) {
		  text = text || '';
		  // calc rule cssText
		  var cssText = '';
		  if (node.cssText || node.rules) {
		    var r$ = node.rules;
		    if (r$ && !_hasMixinRules(r$)) {
		      for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
		        cssText = stringify(r, preserveProperties, cssText);
		      }
		    } else {
		      cssText = preserveProperties ? node.cssText : removeCustomProps(node.cssText);
		      cssText = cssText.trim();
		      if (cssText) {
		        cssText = '  ' + cssText + '\n';
		      }
		    }
		  }
		  // emit rule if there is cssText
		  if (cssText) {
		    if (node.selector) {
		      text += node.selector + ' ' + OPEN_BRACE + '\n';
		    }
		    text += cssText;
		    if (node.selector) {
		      text += CLOSE_BRACE + '\n\n';
		    }
		  }
		  return text;
		}
		
		function _hasMixinRules(rules) {
		  return rules[0].selector.indexOf(VAR_START) === 0;
		}
		
		function removeCustomProps(cssText) {
		  cssText = removeCustomPropAssignment(cssText);
		  return removeCustomPropApply(cssText);
		}
		
		function removeCustomPropAssignment(cssText) {
		  return cssText.replace(RX.customProp, '').replace(RX.mixinProp, '');
		}
		
		function removeCustomPropApply(cssText) {
		  return cssText.replace(RX.mixinApply, '').replace(RX.varApply, '');
		}
		
		var types = {
		  STYLE_RULE: 1,
		  KEYFRAMES_RULE: 7,
		  MEDIA_RULE: 4,
		  MIXIN_RULE: 1000
		};
		
		var OPEN_BRACE = '{';
		var CLOSE_BRACE = '}';
		
		// helper regexp's
		var RX = {
		  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
		  port: /@import[^;]*;/gim,
		  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
		  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
		  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
		  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
		  keyframesRule: /^@[^\s]*keyframes/,
		  multipleSpaces: /\s+/g
		};
		
		var VAR_START = '--';
		var MEDIA_START = '@media';
		var AT_START = '@';
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var nativeShadow = !(window.ShadyDOM && window.ShadyDOM.inUse);
		// chrome 49 has semi-working css vars, check if box-shadow works
		// safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
		var nativeCssVariables = !navigator.userAgent.match('AppleWebKit/601') && window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)');
		
		// experimental support for native @apply
		function detectNativeApply() {
		  var style = document.createElement('style');
		  style.textContent = '.foo { @apply --foo }';
		  document.head.appendChild(style);
		  var nativeCssApply = style.sheet.cssRules[0].cssText.indexOf('apply') >= 0;
		  document.head.removeChild(style);
		  return nativeCssApply;
		}
		
		var nativeCssApply = false && detectNativeApply();
		
		function parseSettings(settings) {
		  if (settings) {
		    nativeCssVariables = nativeCssVariables && !settings.shimcssproperties;
		    nativeShadow = nativeShadow && !settings.shimshadow;
		  }
		}
		
		if (window.ShadyCSS) {
		  parseSettings(window.ShadyCSS);
		} else if (window.WebComponents) {
		  parseSettings(window.WebComponents.flags);
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		function toCssText(rules, callback) {
		  if (typeof rules === 'string') {
		    rules = parse(rules);
		  }
		  if (callback) {
		    forEachRule(rules, callback);
		  }
		  return stringify(rules, nativeCssVariables);
		}
		
		function rulesForStyle(style) {
		  if (!style.__cssRules && style.textContent) {
		    style.__cssRules = parse(style.textContent);
		  }
		  return style.__cssRules;
		}
		
		// Tests if a rule is a keyframes selector, which looks almost exactly
		// like a normal selector but is not (it has nothing to do with scoping
		// for example).
		function isKeyframesSelector(rule) {
		  return rule.parent && rule.parent.type === types.KEYFRAMES_RULE;
		}
		
		function forEachRule(node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
		  if (!node) {
		    return;
		  }
		  var skipRules = false;
		  if (onlyActiveRules) {
		    if (node.type === types.MEDIA_RULE) {
		      var matchMedia = node.selector.match(rx.MEDIA_MATCH);
		      if (matchMedia) {
		        // if rule is a non matching @media rule, skip subrules
		        if (!window.matchMedia(matchMedia[1]).matches) {
		          skipRules = true;
		        }
		      }
		    }
		  }
		  if (node.type === types.STYLE_RULE) {
		    styleRuleCallback(node);
		  } else if (keyframesRuleCallback && node.type === types.KEYFRAMES_RULE) {
		    keyframesRuleCallback(node);
		  } else if (node.type === types.MIXIN_RULE) {
		    skipRules = true;
		  }
		  var r$ = node.rules;
		  if (r$ && !skipRules) {
		    for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
		      forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
		    }
		  }
		}
		
		// add a string of cssText to the document.
		function applyCss(cssText, moniker, target, contextNode) {
		  var style = createScopeStyle(cssText, moniker);
		  return applyStyle$1(style, target, contextNode);
		}
		
		function applyStyle$1(style, target, contextNode) {
		  target = target || document.head;
		  var after = contextNode && contextNode.nextSibling || target.firstChild;
		  lastHeadApplyNode = style;
		  return target.insertBefore(style, after);
		}
		
		function createScopeStyle(cssText, moniker) {
		  var style = document.createElement('style');
		  if (moniker) {
		    style.setAttribute('scope', moniker);
		  }
		  style.textContent = cssText;
		  return style;
		}
		
		var lastHeadApplyNode = null;
		
		// insert a comment node as a styling position placeholder.
		function applyStylePlaceHolder(moniker) {
		  var placeHolder = document.createComment(' Shady DOM styles for ' + moniker + ' ');
		  var after = lastHeadApplyNode ? lastHeadApplyNode.nextSibling : null;
		  var scope = document.head;
		  scope.insertBefore(placeHolder, after || scope.firstChild);
		  lastHeadApplyNode = placeHolder;
		  return placeHolder;
		}
		
		
		
		// cssBuildTypeForModule: function (module) {
		//   let dm = Polymer.DomModule.import(module);
		//   if (dm) {
		//     return getCssBuildType(dm);
		//   }
		// },
		//
		
		
		// Walk from text[start] matching parens
		// returns position of the outer end paren
		function findMatchingParen(text, start) {
		  var level = 0;
		  for (var i = start, l = text.length; i < l; i++) {
		    if (text[i] === '(') {
		      level++;
		    } else if (text[i] === ')') {
		      if (--level === 0) {
		        return i;
		      }
		    }
		  }
		  return -1;
		}
		
		function processVariableAndFallback(str, callback) {
		  // find 'var('
		  var start = str.indexOf('var(');
		  if (start === -1) {
		    // no var?, everything is prefix
		    return callback(str, '', '', '');
		  }
		  //${prefix}var(${inner})${suffix}
		  var end = findMatchingParen(str, start + 3);
		  var inner = str.substring(start + 4, end);
		  var prefix = str.substring(0, start);
		  // suffix may have other variables
		  var suffix = processVariableAndFallback(str.substring(end + 1), callback);
		  var comma = inner.indexOf(',');
		  // value and fallback args should be trimmed to match in property lookup
		  if (comma === -1) {
		    // variable, no fallback
		    return callback(prefix, inner.trim(), '', suffix);
		  }
		  // var(${value},${fallback})
		  var value = inner.substring(0, comma).trim();
		  var fallback = inner.substring(comma + 1).trim();
		  return callback(prefix, value, fallback, suffix);
		}
		
		var rx = {
		  VAR_ASSIGN: /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi,
		  MIXIN_MATCH: /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
		  VAR_CONSUMED: /(--[\w-]+)\s*([:,;)]|$)/gi,
		  ANIMATION_MATCH: /(animation\s*:)|(animation-name\s*:)/,
		  MEDIA_MATCH: /@media[^(]*(\([^)]*\))/,
		  IS_VAR: /^--/,
		  BRACKETED: /\{[^}]*\}/g,
		  HOST_PREFIX: '(?:^|[^.#[:])',
		  HOST_SUFFIX: '($|[.:[\\s>+~])'
		};
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		/* Transforms ShadowDOM styling into ShadyDOM styling
		
		* scoping:
		
		  * elements in scope get scoping selector class="x-foo-scope"
		  * selectors re-written as follows:
		
		    div button -> div.x-foo-scope button.x-foo-scope
		
		* :host -> scopeName
		
		* :host(...) -> scopeName...
		
		* ::slotted(...) -> scopeName > ...
		
		* ...:dir(ltr|rtl) -> [dir="ltr|rtl"] ..., ...[dir="ltr|rtl"]
		
		* :host(:dir[rtl]) -> scopeName:dir(rtl) -> [dir="rtl"] scopeName, scopeName[dir="rtl"]
		
		*/
		var SCOPE_NAME = 'style-scope';
		
		var StyleTransformer = {
		
		  // Given a node and scope name, add a scoping class to each node
		  // in the tree. This facilitates transforming css into scoped rules.
		  dom: function dom(node, scope, shouldRemoveScope) {
		    // one time optimization to skip scoping...
		    if (node.__styleScoped) {
		      node.__styleScoped = null;
		    } else {
		      this._transformDom(node, scope || '', shouldRemoveScope);
		    }
		  },
		
		  _transformDom: function _transformDom(node, selector, shouldRemoveScope) {
		    if (node.classList) {
		      this.element(node, selector, shouldRemoveScope);
		    }
		    var c$ = node.localName === 'template' ? (node.content || node._content).childNodes : node.children || node.childNodes;
		    if (c$) {
		      for (var i = 0; i < c$.length; i++) {
		        this._transformDom(c$[i], selector, shouldRemoveScope);
		      }
		    }
		  },
		
		  element: function element(_element, scope, shouldRemoveScope) {
		    // note: if using classes, we add both the general 'style-scope' class
		    // as well as the specific scope. This enables easy filtering of all
		    // `style-scope` elements
		    if (scope) {
		      // note: svg on IE does not have classList so fallback to class
		      if (_element.classList) {
		        if (shouldRemoveScope) {
		          _element.classList.remove(SCOPE_NAME);
		          _element.classList.remove(scope);
		        } else {
		          _element.classList.add(SCOPE_NAME);
		          _element.classList.add(scope);
		        }
		      } else if (_element.getAttribute) {
		        var c = _element.getAttribute(CLASS);
		        if (shouldRemoveScope) {
		          if (c) {
		            _element.setAttribute(CLASS, c.replace(SCOPE_NAME, '').replace(scope, ''));
		          }
		        } else {
		          _element.setAttribute(CLASS, (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope);
		        }
		      }
		    }
		  },
		
		  elementStyles: function elementStyles(element, styleRules, callback) {
		    var cssBuildType = element.__cssBuild;
		    // no need to shim selectors if settings.useNativeShadow, also
		    // a shady css build will already have transformed selectors
		    // NOTE: This method may be called as part of static or property shimming.
		    // When there is a targeted build it will not be called for static shimming,
		    // but when the property shim is used it is called and should opt out of
		    // static shimming work when a proper build exists.
		    var cssText = nativeShadow || cssBuildType === 'shady' ? toCssText(styleRules, callback) : this.css(styleRules, element.is, element.extends, callback) + '\n\n';
		    return cssText.trim();
		  },
		
		  // Given a string of cssText and a scoping string (scope), returns
		  // a string of scoped css where each selector is transformed to include
		  // a class created from the scope. ShadowDOM selectors are also transformed
		  // (e.g. :host) to use the scoping selector.
		  css: function css(rules, scope, ext, callback) {
		    var hostScope = this._calcHostScope(scope, ext);
		    scope = this._calcElementScope(scope);
		    var self = this;
		    return toCssText(rules, function (rule) {
		      if (!rule.isScoped) {
		        self.rule(rule, scope, hostScope);
		        rule.isScoped = true;
		      }
		      if (callback) {
		        callback(rule, scope, hostScope);
		      }
		    });
		  },
		
		  _calcElementScope: function _calcElementScope(scope) {
		    if (scope) {
		      return CSS_CLASS_PREFIX + scope;
		    } else {
		      return '';
		    }
		  },
		
		  _calcHostScope: function _calcHostScope(scope, ext) {
		    return ext ? '[is=' + scope + ']' : scope;
		  },
		
		  rule: function rule(_rule, scope, hostScope) {
		    this._transformRule(_rule, this._transformComplexSelector, scope, hostScope);
		  },
		
		  // transforms a css rule to a scoped rule.
		  _transformRule: function _transformRule(rule, transformer, scope, hostScope) {
		    // NOTE: save transformedSelector for subsequent matching of elements
		    // against selectors (e.g. when calculating style properties)
		    rule.selector = rule.transformedSelector = this._transformRuleCss(rule, transformer, scope, hostScope);
		  },
		
		  _transformRuleCss: function _transformRuleCss(rule, transformer, scope, hostScope) {
		    var p$ = rule.selector.split(COMPLEX_SELECTOR_SEP);
		    // we want to skip transformation of rules that appear in keyframes,
		    // because they are keyframe selectors, not element selectors.
		    if (!isKeyframesSelector(rule)) {
		      for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
		        p$[i] = transformer.call(this, p, scope, hostScope);
		      }
		    }
		    return p$.join(COMPLEX_SELECTOR_SEP);
		  },
		
		  _transformComplexSelector: function _transformComplexSelector(selector, scope, hostScope) {
		    var _this = this;
		
		    var stop = false;
		    selector = selector.trim();
		    // Remove spaces inside of selectors like `:nth-of-type` because it confuses SIMPLE_SELECTOR_SEP
		    selector = selector.replace(NTH, function (m, type, inner) {
		      return ':' + type + '(' + inner.replace(/\s/g, '') + ')';
		    });
		    selector = selector.replace(SLOTTED_START, HOST + ' $1');
		    selector = selector.replace(SIMPLE_SELECTOR_SEP, function (m, c, s) {
		      if (!stop) {
		        var info = _this._transformCompoundSelector(s, c, scope, hostScope);
		        stop = stop || info.stop;
		        c = info.combinator;
		        s = info.value;
		      }
		      return c + s;
		    });
		    return selector;
		  },
		
		  _transformCompoundSelector: function _transformCompoundSelector(selector, combinator, scope, hostScope) {
		    // replace :host with host scoping class
		    var slottedIndex = selector.indexOf(SLOTTED);
		    if (selector.indexOf(HOST) >= 0) {
		      selector = this._transformHostSelector(selector, hostScope);
		      // replace other selectors with scoping class
		    } else if (slottedIndex !== 0) {
		      selector = scope ? this._transformSimpleSelector(selector, scope) : selector;
		    }
		    // mark ::slotted() scope jump to replace with descendant selector + arg
		    // also ignore left-side combinator
		    var slotted = false;
		    if (slottedIndex >= 0) {
		      combinator = '';
		      slotted = true;
		    }
		    // process scope jumping selectors up to the scope jump and then stop
		    var stop = void 0;
		    if (slotted) {
		      stop = true;
		      if (slotted) {
		        // .zonk ::slotted(.foo) -> .zonk.scope > .foo
		        selector = selector.replace(SLOTTED_PAREN, function (m, paren) {
		          return ' > ' + paren;
		        });
		      }
		    }
		    selector = selector.replace(DIR_PAREN, function (m, before, dir) {
		      return '[dir="' + dir + '"] ' + before + ', ' + before + '[dir="' + dir + '"]';
		    });
		    return { value: selector, combinator: combinator, stop: stop };
		  },
		
		  _transformSimpleSelector: function _transformSimpleSelector(selector, scope) {
		    var p$ = selector.split(PSEUDO_PREFIX);
		    p$[0] += scope;
		    return p$.join(PSEUDO_PREFIX);
		  },
		
		  // :host(...) -> scopeName...
		  _transformHostSelector: function _transformHostSelector(selector, hostScope) {
		    var m = selector.match(HOST_PAREN);
		    var paren = m && m[2].trim() || '';
		    if (paren) {
		      if (!paren[0].match(SIMPLE_SELECTOR_PREFIX)) {
		        // paren starts with a type selector
		        var typeSelector = paren.split(SIMPLE_SELECTOR_PREFIX)[0];
		        // if the type selector is our hostScope then avoid pre-pending it
		        if (typeSelector === hostScope) {
		          return paren;
		          // otherwise, this selector should not match in this scope so
		          // output a bogus selector.
		        } else {
		          return SELECTOR_NO_MATCH;
		        }
		      } else {
		        // make sure to do a replace here to catch selectors like:
		        // `:host(.foo)::before`
		        return selector.replace(HOST_PAREN, function (m, host, paren) {
		          return hostScope + paren;
		        });
		      }
		      // if no paren, do a straight :host replacement.
		      // TODO(sorvell): this should not strictly be necessary but
		      // it's needed to maintain support for `:host[foo]` type selectors
		      // which have been improperly used under Shady DOM. This should be
		      // deprecated.
		    } else {
		      return selector.replace(HOST, hostScope);
		    }
		  },
		
		  documentRule: function documentRule(rule) {
		    // reset selector in case this is redone.
		    rule.selector = rule.parsedSelector;
		    this.normalizeRootSelector(rule);
		    this._transformRule(rule, this._transformDocumentSelector);
		  },
		
		  normalizeRootSelector: function normalizeRootSelector(rule) {
		    if (rule.selector === ROOT) {
		      rule.selector = 'html';
		    }
		  },
		
		  _transformDocumentSelector: function _transformDocumentSelector(selector) {
		    return selector.match(SLOTTED) ? this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR) : this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
		  },
		  SCOPE_NAME: SCOPE_NAME
		};
		
		var NTH = /:(nth[-\w]+)\(([^)]+)\)/;
		var SCOPE_DOC_SELECTOR = ':not(.' + SCOPE_NAME + ')';
		var COMPLEX_SELECTOR_SEP = ',';
		var SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g;
		var SIMPLE_SELECTOR_PREFIX = /[[.:#*]/;
		var HOST = ':host';
		var ROOT = ':root';
		var SLOTTED = '::slotted';
		var SLOTTED_START = new RegExp('^(' + SLOTTED + ')');
		// NOTE: this supports 1 nested () pair for things like
		// :host(:not([selected]), more general support requires
		// parsing which seems like overkill
		var HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
		// similar to HOST_PAREN
		var SLOTTED_PAREN = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
		var DIR_PAREN = /(.*):dir\((?:(ltr|rtl))\)/;
		var CSS_CLASS_PREFIX = '.';
		var PSEUDO_PREFIX = ':';
		var CLASS = 'class';
		var SELECTOR_NO_MATCH = 'should_not_match';
		
		var classCallCheck = function (instance, Constructor) {
		  if (!(instance instanceof Constructor)) {
		    throw new TypeError("Cannot call a class as a function");
		  }
		};
		
		var createClass = function () {
		  function defineProperties(target, props) {
		    for (var i = 0; i < props.length; i++) {
		      var descriptor = props[i];
		      descriptor.enumerable = descriptor.enumerable || false;
		      descriptor.configurable = true;
		      if ("value" in descriptor) descriptor.writable = true;
		      Object.defineProperty(target, descriptor.key, descriptor);
		    }
		  }
		
		  return function (Constructor, protoProps, staticProps) {
		    if (protoProps) defineProperties(Constructor.prototype, protoProps);
		    if (staticProps) defineProperties(Constructor, staticProps);
		    return Constructor;
		  };
		}();
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		var set$1 = function set$1(object, property, value, receiver) {
		  var desc = Object.getOwnPropertyDescriptor(object, property);
		
		  if (desc === undefined) {
		    var parent = Object.getPrototypeOf(object);
		
		    if (parent !== null) {
		      set$1(parent, property, value, receiver);
		    }
		  } else if ("value" in desc && desc.writable) {
		    desc.value = value;
		  } else {
		    var setter = desc.set;
		
		    if (setter !== undefined) {
		      setter.call(receiver, value);
		    }
		  }
		
		  return value;
		};
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		var toConsumableArray = function (arr) {
		  if (Array.isArray(arr)) {
		    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
		
		    return arr2;
		  } else {
		    return Array.from(arr);
		  }
		};
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var StyleInfo = function () {
		  createClass(StyleInfo, null, [{
		    key: 'get',
		    value: function get(node) {
		      return node.__styleInfo;
		    }
		  }, {
		    key: 'set',
		    value: function set(node, styleInfo) {
		      node.__styleInfo = styleInfo;
		      return styleInfo;
		    }
		  }]);
		
		  function StyleInfo(ast, placeholder, ownStylePropertyNames, elementName, typeExtension, cssBuild) {
		    classCallCheck(this, StyleInfo);
		
		    this.styleRules = ast || null;
		    this.placeholder = placeholder || null;
		    this.ownStylePropertyNames = ownStylePropertyNames || [];
		    this.overrideStyleProperties = {};
		    this.elementName = elementName || '';
		    this.cssBuild = cssBuild || '';
		    this.typeExtension = typeExtension || '';
		    this.styleProperties = null;
		    this.scopeSelector = null;
		    this.customStyle = null;
		  }
		
		  return StyleInfo;
		}();
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		// TODO: dedupe with shady
		var p = window.Element.prototype;
		var matchesSelector = p.matches || p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector || p.webkitMatchesSelector;
		
		var IS_IE = navigator.userAgent.match('Trident');
		
		var StyleProperties = {
		
		  // decorates styles with rule info and returns an array of used style
		  // property names
		  decorateStyles: function decorateStyles(rules) {
		    var self = this,
		        props = {},
		        keyframes = [],
		        ruleIndex = 0;
		    forEachRule(rules, function (rule) {
		      self.decorateRule(rule);
		      // mark in-order position of ast rule in styles block, used for cache key
		      rule.index = ruleIndex++;
		      self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
		    }, function onKeyframesRule(rule) {
		      keyframes.push(rule);
		    });
		    // Cache all found keyframes rules for later reference:
		    rules._keyframes = keyframes;
		    // return this list of property names *consumes* in these styles.
		    var names = [];
		    for (var i in props) {
		      names.push(i);
		    }
		    return names;
		  },
		
		  // decorate a single rule with property info
		  decorateRule: function decorateRule(rule) {
		    if (rule.propertyInfo) {
		      return rule.propertyInfo;
		    }
		    var info = {},
		        properties = {};
		    var hasProperties = this.collectProperties(rule, properties);
		    if (hasProperties) {
		      info.properties = properties;
		      // TODO(sorvell): workaround parser seeing mixins as additional rules
		      rule.rules = null;
		    }
		    info.cssText = this.collectCssText(rule);
		    rule.propertyInfo = info;
		    return info;
		  },
		
		  // collects the custom properties from a rule's cssText
		  collectProperties: function collectProperties(rule, properties) {
		    var info = rule.propertyInfo;
		    if (info) {
		      if (info.properties) {
		        Object.assign(properties, info.properties);
		        return true;
		      }
		    } else {
		      var m = void 0,
		          rx$$1 = this.rx.VAR_ASSIGN;
		      var cssText = rule.parsedCssText;
		      var value = void 0;
		      var any = void 0;
		      while (m = rx$$1.exec(cssText)) {
		        // note: group 2 is var, 3 is mixin
		        value = (m[2] || m[3]).trim();
		        // value of 'inherit' or 'unset' is equivalent to not setting the property here
		        if (value !== 'inherit' || value !== 'unset') {
		          properties[m[1].trim()] = value;
		        }
		        any = true;
		      }
		      return any;
		    }
		  },
		
		  // returns cssText of properties that consume variables/mixins
		  collectCssText: function collectCssText(rule) {
		    return this.collectConsumingCssText(rule.parsedCssText);
		  },
		
		  // NOTE: we support consumption inside mixin assignment
		  // but not production, so strip out {...}
		  collectConsumingCssText: function collectConsumingCssText(cssText) {
		    return cssText.replace(this.rx.BRACKETED, '').replace(this.rx.VAR_ASSIGN, '');
		  },
		
		  collectPropertiesInCssText: function collectPropertiesInCssText(cssText, props) {
		    var m = void 0;
		    while (m = this.rx.VAR_CONSUMED.exec(cssText)) {
		      var name = m[1];
		      // This regex catches all variable names, and following non-whitespace char
		      // If next char is not ':', then variable is a consumer
		      if (m[2] !== ':') {
		        props[name] = true;
		      }
		    }
		  },
		
		  // turns custom properties into realized values.
		  reify: function reify(props) {
		    // big perf optimization here: reify only *own* properties
		    // since this object has __proto__ of the element's scope properties
		    var names = Object.getOwnPropertyNames(props);
		    for (var i = 0, n; i < names.length; i++) {
		      n = names[i];
		      props[n] = this.valueForProperty(props[n], props);
		    }
		  },
		
		  // given a property value, returns the reified value
		  // a property value may be:
		  // (1) a literal value like: red or 5px;
		  // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
		  // var(--a, var(--b));
		  // (3) a literal mixin value like { properties }. Each of these properties
		  // can have values that are: (a) literal, (b) variables, (c) @apply mixins.
		  valueForProperty: function valueForProperty(property, props) {
		    var _this = this;
		
		    // case (1) default
		    // case (3) defines a mixin and we have to reify the internals
		    if (property) {
		      if (property.indexOf(';') >= 0) {
		        property = this.valueForProperties(property, props);
		      } else {
		        (function () {
		          // case (2) variable
		          var self = _this;
		          var fn = function fn(prefix, value, fallback, suffix) {
		            if (!value) {
		              return prefix + suffix;
		            }
		            var propertyValue = self.valueForProperty(props[value], props);
		            // if value is "initial", then the variable should be treated as unset
		            if (!propertyValue || propertyValue === 'initial') {
		              // fallback may be --a or var(--a) or literal
		              propertyValue = self.valueForProperty(props[fallback] || fallback, props) || fallback;
		            } else if (propertyValue === 'apply-shim-inherit') {
		              // CSS build will replace `inherit` with `apply-shim-inherit`
		              // for use with native css variables.
		              // Since we have full control, we can use `inherit` directly.
		              propertyValue = 'inherit';
		            }
		            return prefix + (propertyValue || '') + suffix;
		          };
		          property = processVariableAndFallback(property, fn);
		        })();
		      }
		    }
		    return property && property.trim() || '';
		  },
		
		  // note: we do not yet support mixin within mixin
		  valueForProperties: function valueForProperties(property, props) {
		    var parts = property.split(';');
		    for (var i = 0, _p, m; i < parts.length; i++) {
		      if (_p = parts[i]) {
		        this.rx.MIXIN_MATCH.lastIndex = 0;
		        m = this.rx.MIXIN_MATCH.exec(_p);
		        if (m) {
		          _p = this.valueForProperty(props[m[1]], props);
		        } else {
		          var colon = _p.indexOf(':');
		          if (colon !== -1) {
		            var pp = _p.substring(colon);
		            pp = pp.trim();
		            pp = this.valueForProperty(pp, props) || pp;
		            _p = _p.substring(0, colon) + pp;
		          }
		        }
		        parts[i] = _p && _p.lastIndexOf(';') === _p.length - 1 ?
		        // strip trailing ;
		        _p.slice(0, -1) : _p || '';
		      }
		    }
		    return parts.join(';');
		  },
		
		  applyProperties: function applyProperties(rule, props) {
		    var output = '';
		    // dynamically added sheets may not be decorated so ensure they are.
		    if (!rule.propertyInfo) {
		      this.decorateRule(rule);
		    }
		    if (rule.propertyInfo.cssText) {
		      output = this.valueForProperties(rule.propertyInfo.cssText, props);
		    }
		    rule.cssText = output;
		  },
		
		  // Apply keyframe transformations to the cssText of a given rule. The
		  // keyframeTransforms object is a map of keyframe names to transformer
		  // functions which take in cssText and spit out transformed cssText.
		  applyKeyframeTransforms: function applyKeyframeTransforms(rule, keyframeTransforms) {
		    var input = rule.cssText;
		    var output = rule.cssText;
		    if (rule.hasAnimations == null) {
		      // Cache whether or not the rule has any animations to begin with:
		      rule.hasAnimations = this.rx.ANIMATION_MATCH.test(input);
		    }
		    // If there are no animations referenced, we can skip transforms:
		    if (rule.hasAnimations) {
		      var transform = void 0;
		      // If we haven't transformed this rule before, we iterate over all
		      // transforms:
		      if (rule.keyframeNamesToTransform == null) {
		        rule.keyframeNamesToTransform = [];
		        for (var keyframe in keyframeTransforms) {
		          transform = keyframeTransforms[keyframe];
		          output = transform(input);
		          // If the transform actually changed the CSS text, we cache the
		          // transform name for future use:
		          if (input !== output) {
		            input = output;
		            rule.keyframeNamesToTransform.push(keyframe);
		          }
		        }
		      } else {
		        // If we already have a list of keyframe names that apply to this
		        // rule, we apply only those keyframe name transforms:
		        for (var i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
		          transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
		          input = transform(input);
		        }
		        output = input;
		      }
		    }
		    rule.cssText = output;
		  },
		
		  // Test if the rules in these styles matches the given `element` and if so,
		  // collect any custom properties into `props`.
		  propertyDataFromStyles: function propertyDataFromStyles(rules, element) {
		    var props = {},
		        self = this;
		    // generates a unique key for these matches
		    var o = [];
		    // note: active rules excludes non-matching @media rules
		    forEachRule(rules, function (rule) {
		      // TODO(sorvell): we could trim the set of rules at declaration
		      // time to only include ones that have properties
		      if (!rule.propertyInfo) {
		        self.decorateRule(rule);
		      }
		      // match element against transformedSelector: selector may contain
		      // unwanted uniquification and parsedSelector does not directly match
		      // for :host selectors.
		      var selectorToMatch = rule.transformedSelector || rule.parsedSelector;
		      if (element && rule.propertyInfo.properties && selectorToMatch) {
		        if (matchesSelector.call(element, selectorToMatch)) {
		          self.collectProperties(rule, props);
		          // produce numeric key for these matches for lookup
		          addToBitMask(rule.index, o);
		        }
		      }
		    }, null, true);
		    return { properties: props, key: o };
		  },
		
		  whenHostOrRootRule: function whenHostOrRootRule(scope, rule, cssBuild, callback) {
		    if (!rule.propertyInfo) {
		      this.decorateRule(rule);
		    }
		    if (!rule.propertyInfo.properties) {
		      return;
		    }
		    var hostScope = scope.is ? StyleTransformer._calcHostScope(scope.is, scope.extends) : 'html';
		    var parsedSelector = rule.parsedSelector;
		    var isRoot = parsedSelector === ':host > *' || parsedSelector === 'html';
		    var isHost = parsedSelector.indexOf(':host') === 0 && !isRoot;
		    // build info is either in scope (when scope is an element) or in the style
		    // when scope is the default scope; note: this allows default scope to have
		    // mixed mode built and unbuilt styles.
		    if (cssBuild === 'shady') {
		      // :root -> x-foo > *.x-foo for elements and html for custom-style
		      isRoot = parsedSelector === hostScope + ' > *.' + hostScope || parsedSelector.indexOf('html') !== -1;
		      // :host -> x-foo for elements, but sub-rules have .x-foo in them
		      isHost = !isRoot && parsedSelector.indexOf(hostScope) === 0;
		    }
		    if (cssBuild === 'shadow') {
		      isRoot = parsedSelector === ':host > *' || parsedSelector === 'html';
		      isHost = isHost && !isRoot;
		    }
		    if (!isRoot && !isHost) {
		      return;
		    }
		    var selectorToMatch = hostScope;
		    if (isHost) {
		      // need to transform :host under ShadowDOM because `:host` does not work with `matches`
		      if (nativeShadow && !rule.transformedSelector) {
		        // transform :host into a matchable selector
		        rule.transformedSelector = StyleTransformer._transformRuleCss(rule, StyleTransformer._transformComplexSelector, StyleTransformer._calcElementScope(scope.is), hostScope);
		      }
		      selectorToMatch = rule.transformedSelector || hostScope;
		    }
		    callback({
		      selector: selectorToMatch,
		      isHost: isHost,
		      isRoot: isRoot
		    });
		  },
		
		  hostAndRootPropertiesForScope: function hostAndRootPropertiesForScope(scope, rules) {
		    var hostProps = {},
		        rootProps = {},
		        self = this;
		    // note: active rules excludes non-matching @media rules
		    var cssBuild = rules && rules.__cssBuild;
		    forEachRule(rules, function (rule) {
		      // if scope is StyleDefaults, use _element for matchesSelector
		      self.whenHostOrRootRule(scope, rule, cssBuild, function (info) {
		        var element = scope._element || scope;
		        if (matchesSelector.call(element, info.selector)) {
		          if (info.isHost) {
		            self.collectProperties(rule, hostProps);
		          } else {
		            self.collectProperties(rule, rootProps);
		          }
		        }
		      });
		    }, null, true);
		    return { rootProps: rootProps, hostProps: hostProps };
		  },
		
		  transformStyles: function transformStyles(element, properties, scopeSelector) {
		    var self = this;
		    var hostSelector = StyleTransformer._calcHostScope(element.is, element.extends);
		    var rxHostSelector = element.extends ? '\\' + hostSelector.slice(0, -1) + '\\]' : hostSelector;
		    var hostRx = new RegExp(this.rx.HOST_PREFIX + rxHostSelector + this.rx.HOST_SUFFIX);
		    var rules = StyleInfo.get(element).styleRules;
		    var keyframeTransforms = this._elementKeyframeTransforms(element, rules, scopeSelector);
		    return StyleTransformer.elementStyles(element, rules, function (rule) {
		      self.applyProperties(rule, properties);
		      if (!nativeShadow && !isKeyframesSelector(rule) && rule.cssText) {
		        // NOTE: keyframe transforms only scope munge animation names, so it
		        // is not necessary to apply them in ShadowDOM.
		        self.applyKeyframeTransforms(rule, keyframeTransforms);
		        self._scopeSelector(rule, hostRx, hostSelector, scopeSelector);
		      }
		    });
		  },
		
		  _elementKeyframeTransforms: function _elementKeyframeTransforms(element, rules, scopeSelector) {
		    var keyframesRules = rules._keyframes;
		    var keyframeTransforms = {};
		    if (!nativeShadow && keyframesRules) {
		      // For non-ShadowDOM, we transform all known keyframes rules in
		      // advance for the current scope. This allows us to catch keyframes
		      // rules that appear anywhere in the stylesheet:
		      for (var i = 0, keyframesRule = keyframesRules[i]; i < keyframesRules.length; keyframesRule = keyframesRules[++i]) {
		        this._scopeKeyframes(keyframesRule, scopeSelector);
		        keyframeTransforms[keyframesRule.keyframesName] = this._keyframesRuleTransformer(keyframesRule);
		      }
		    }
		    return keyframeTransforms;
		  },
		
		  // Generate a factory for transforming a chunk of CSS text to handle a
		  // particular scoped keyframes rule.
		  _keyframesRuleTransformer: function _keyframesRuleTransformer(keyframesRule) {
		    return function (cssText) {
		      return cssText.replace(keyframesRule.keyframesNameRx, keyframesRule.transformedKeyframesName);
		    };
		  },
		
		  // Transforms `@keyframes` names to be unique for the current host.
		  // Example: @keyframes foo-anim -> @keyframes foo-anim-x-foo-0
		  _scopeKeyframes: function _scopeKeyframes(rule, scopeId) {
		    rule.keyframesNameRx = new RegExp(rule.keyframesName, 'g');
		    rule.transformedKeyframesName = rule.keyframesName + '-' + scopeId;
		    rule.transformedSelector = rule.transformedSelector || rule.selector;
		    rule.selector = rule.transformedSelector.replace(rule.keyframesName, rule.transformedKeyframesName);
		  },
		
		  // Strategy: x scope shim a selector e.g. to scope `.x-foo-42` (via classes):
		  // non-host selector: .a.x-foo -> .x-foo-42 .a.x-foo
		  // host selector: x-foo.wide -> .x-foo-42.wide
		  // note: we use only the scope class (.x-foo-42) and not the hostSelector
		  // (x-foo) to scope :host rules; this helps make property host rules
		  // have low specificity. They are overrideable by class selectors but,
		  // unfortunately, not by type selectors (e.g. overriding via
		  // `.special` is ok, but not by `x-foo`).
		  _scopeSelector: function _scopeSelector(rule, hostRx, hostSelector, scopeId) {
		    rule.transformedSelector = rule.transformedSelector || rule.selector;
		    var selector = rule.transformedSelector;
		    var scope = '.' + scopeId;
		    var parts = selector.split(',');
		    for (var i = 0, l = parts.length, _p2; i < l && (_p2 = parts[i]); i++) {
		      parts[i] = _p2.match(hostRx) ? _p2.replace(hostSelector, scope) : scope + ' ' + _p2;
		    }
		    rule.selector = parts.join(',');
		  },
		
		  applyElementScopeSelector: function applyElementScopeSelector(element, selector, old) {
		    var c = element.getAttribute('class') || '';
		    var v = old ? c.replace(old, selector) : (c ? c + ' ' : '') + this.XSCOPE_NAME + ' ' + selector;
		    if (c !== v) {
		      element.setAttribute('class', v);
		    }
		  },
		
		  applyElementStyle: function applyElementStyle(element, properties, selector, style) {
		    // calculate cssText to apply
		    var cssText = style ? style.textContent || '' : this.transformStyles(element, properties, selector);
		    // if shady and we have a cached style that is not style, decrement
		    var styleInfo = StyleInfo.get(element);
		    var s = styleInfo.customStyle;
		    if (s && !nativeShadow && s !== style) {
		      s._useCount--;
		      if (s._useCount <= 0 && s.parentNode) {
		        s.parentNode.removeChild(s);
		      }
		    }
		    // apply styling always under native or if we generated style
		    // or the cached style is not in document(!)
		    if (nativeShadow) {
		      // update existing style only under native
		      if (styleInfo.customStyle) {
		        styleInfo.customStyle.textContent = cssText;
		        style = styleInfo.customStyle;
		        // otherwise, if we have css to apply, do so
		      } else if (cssText) {
		        // apply css after the scope style of the element to help with
		        // style precedence rules.
		        style = applyCss(cssText, selector, element.shadowRoot, styleInfo.placeholder);
		      }
		    } else {
		      // shady and no cache hit
		      if (!style) {
		        // apply css after the scope style of the element to help with
		        // style precedence rules.
		        if (cssText) {
		          style = applyCss(cssText, selector, null, styleInfo.placeholder);
		        }
		        // shady and cache hit but not in document
		      } else if (!style.parentNode) {
		        applyStyle$1(style, null, styleInfo.placeholder);
		      }
		    }
		    // ensure this style is our custom style and increment its use count.
		    if (style) {
		      style._useCount = style._useCount || 0;
		      // increment use count if we changed styles
		      if (styleInfo.customStyle != style) {
		        style._useCount++;
		      }
		      styleInfo.customStyle = style;
		    }
		    // @media rules may be stale in IE 10 and 11
		    if (IS_IE) {
		      style.textContent = style.textContent;
		    }
		    return style;
		  },
		
		  applyCustomStyle: function applyCustomStyle(style, properties) {
		    var rules = rulesForStyle(style);
		    var self = this;
		    style.textContent = toCssText(rules, function (rule) {
		      var css = rule.cssText = rule.parsedCssText;
		      if (rule.propertyInfo && rule.propertyInfo.cssText) {
		        // remove property assignments
		        // so next function isn't confused
		        // NOTE: we have 3 categories of css:
		        // (1) normal properties,
		        // (2) custom property assignments (--foo: red;),
		        // (3) custom property usage: border: var(--foo); @apply(--foo);
		        // In elements, 1 and 3 are separated for efficiency; here they
		        // are not and this makes this case unique.
		        css = removeCustomPropAssignment(css);
		        // replace with reified properties, scenario is same as mixin
		        rule.cssText = self.valueForProperties(css, properties);
		      }
		    });
		  },
		
		  rx: rx,
		  XSCOPE_NAME: 'x-scope'
		};
		
		function addToBitMask(n, bits) {
		  var o = parseInt(n / 32);
		  var v = 1 << n % 32;
		  bits[o] = (bits[o] || 0) | v;
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var templateMap = {};
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var placeholderMap = {};
		
		var ce = window.customElements;
		if (ce && !nativeShadow) {
		  (function () {
		    var origDefine = ce.define;
		    ce.define = function (name, clazz, options) {
		      placeholderMap[name] = applyStylePlaceHolder(name);
		      return origDefine.call(ce, name, clazz, options);
		    };
		  })();
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		var StyleCache = function () {
		  function StyleCache() {
		    var typeMax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
		    classCallCheck(this, StyleCache);
		
		    // map element name -> [{properties, styleElement, scopeSelector}]
		    this.cache = {};
		    this.typeMax = typeMax;
		  }
		
		  createClass(StyleCache, [{
		    key: '_validate',
		    value: function _validate(cacheEntry, properties, ownPropertyNames) {
		      for (var idx = 0; idx < ownPropertyNames.length; idx++) {
		        var pn = ownPropertyNames[idx];
		        if (cacheEntry.properties[pn] !== properties[pn]) {
		          return false;
		        }
		      }
		      return true;
		    }
		  }, {
		    key: 'store',
		    value: function store(tagname, properties, styleElement, scopeSelector) {
		      var list = this.cache[tagname] || [];
		      list.push({ properties: properties, styleElement: styleElement, scopeSelector: scopeSelector });
		      if (list.length > this.typeMax) {
		        list.shift();
		      }
		      this.cache[tagname] = list;
		    }
		  }, {
		    key: 'fetch',
		    value: function fetch(tagname, properties, ownPropertyNames) {
		      var list = this.cache[tagname];
		      if (!list) {
		        return;
		      }
		      // reverse list for most-recent lookups
		      for (var idx = list.length - 1; idx >= 0; idx--) {
		        var entry = list[idx];
		        if (this._validate(entry, properties, ownPropertyNames)) {
		          return entry;
		        }
		      }
		    }
		  }]);
		  return StyleCache;
		}();
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		/**
		 * The apply shim simulates the behavior of `@apply` proposed at
		 * https://tabatkins.github.io/specs/css-apply-rule/.
		 * The approach is to convert a property like this:
		 *
		 *    --foo: {color: red; background: blue;}
		 *
		 * to this:
		 *
		 *    --foo_-_color: red;
		 *    --foo_-_background: blue;
		 *
		 * Then where `@apply --foo` is used, that is converted to:
		 *
		 *    color: var(--foo_-_color);
		 *    background: var(--foo_-_background);
		 *
		 * This approach generally works but there are some issues and limitations.
		 * Consider, for example, that somewhere *between* where `--foo` is set and used,
		 * another element sets it to:
		 *
		 *    --foo: { border: 2px solid red; }
		 *
		 * We must now ensure that the color and background from the previous setting
		 * do not apply. This is accomplished by changing the property set to this:
		 *
		 *    --foo_-_border: 2px solid red;
		 *    --foo_-_color: initial;
		 *    --foo_-_background: initial;
		 *
		 * This works but introduces one new issue.
		 * Consider this setup at the point where the `@apply` is used:
		 *
		 *    background: orange;
		 *    @apply --foo;
		 *
		 * In this case the background will be unset (initial) rather than the desired
		 * `orange`. We address this by altering the property set to use a fallback
		 * value like this:
		 *
		 *    color: var(--foo_-_color);
		 *    background: var(--foo_-_background, orange);
		 *    border: var(--foo_-_border);
		 *
		 * Note that the default is retained in the property set and the `background` is
		 * the desired `orange`. This leads us to a limitation.
		 *
		 * Limitation 1:
		
		 * Only properties in the rule where the `@apply`
		 * is used are considered as default values.
		 * If another rule matches the element and sets `background` with
		 * less specificity than the rule in which `@apply` appears,
		 * the `background` will not be set.
		 *
		 * Limitation 2:
		 *
		 * When using Polymer's `updateStyles` api, new properties may not be set for
		 * `@apply` properties.
		
		*/
		
		var MIXIN_MATCH = rx.MIXIN_MATCH;
		var VAR_ASSIGN = rx.VAR_ASSIGN;
		
		var APPLY_NAME_CLEAN = /;\s*/m;
		var INITIAL_INHERIT = /^\s*(initial)|(inherit)\s*$/;
		
		// separator used between mixin-name and mixin-property-name when producing properties
		// NOTE: plain '-' may cause collisions in user styles
		var MIXIN_VAR_SEP = '_-_';
		
		// map of mixin to property names
		// --foo: {border: 2px} -> {properties: {(--foo, ['border'])}, dependants: {'element-name': proto}}
		
		var MixinMap = function () {
		  function MixinMap() {
		    classCallCheck(this, MixinMap);
		
		    this._map = {};
		  }
		
		  createClass(MixinMap, [{
		    key: 'set',
		    value: function set(name, props) {
		      name = name.trim();
		      this._map[name] = {
		        properties: props,
		        dependants: {}
		      };
		    }
		  }, {
		    key: 'get',
		    value: function get(name) {
		      name = name.trim();
		      return this._map[name];
		    }
		  }]);
		  return MixinMap;
		}();
		
		var ApplyShim = function () {
		  function ApplyShim() {
		    var _this = this;
		
		    classCallCheck(this, ApplyShim);
		
		    this._currentTemplate = null;
		    this._measureElement = null;
		    this._map = new MixinMap();
		    this._separator = MIXIN_VAR_SEP;
		    this._boundProduceCssProperties = function (matchText, propertyName, valueProperty, valueMixin) {
		      return _this._produceCssProperties(matchText, propertyName, valueProperty, valueMixin);
		    };
		  }
		
		  createClass(ApplyShim, [{
		    key: 'transformStyle',
		    value: function transformStyle(style, elementName) {
		      var ast = rulesForStyle(style);
		      this.transformRules(ast, elementName);
		      return ast;
		    }
		  }, {
		    key: 'transformRules',
		    value: function transformRules(rules, elementName) {
		      var _this2 = this;
		
		      this._currentTemplate = templateMap[elementName];
		      forEachRule(rules, function (r) {
		        _this2.transformRule(r);
		      });
		      if (this._currentTemplate) {
		        this._currentTemplate.__applyShimInvalid = false;
		      }
		      this._currentTemplate = null;
		    }
		  }, {
		    key: 'transformRule',
		    value: function transformRule(rule) {
		      rule.cssText = this.transformCssText(rule.parsedCssText);
		      // :root was only used for variable assignment in property shim,
		      // but generates invalid selectors with real properties.
		      // replace with `:host > *`, which serves the same effect
		      if (rule.selector === ':root') {
		        rule.selector = ':host > *';
		      }
		    }
		  }, {
		    key: 'transformCssText',
		    value: function transformCssText(cssText) {
		      // produce variables
		      cssText = cssText.replace(VAR_ASSIGN, this._boundProduceCssProperties);
		      // consume mixins
		      return this._consumeCssProperties(cssText);
		    }
		  }, {
		    key: '_getInitialValueForProperty',
		    value: function _getInitialValueForProperty(property) {
		      if (!this._measureElement) {
		        this._measureElement = document.createElement('meta');
		        this._measureElement.style.all = 'initial';
		        document.head.appendChild(this._measureElement);
		      }
		      return window.getComputedStyle(this._measureElement).getPropertyValue(property);
		    }
		    // replace mixin consumption with variable consumption
		
		  }, {
		    key: '_consumeCssProperties',
		    value: function _consumeCssProperties(text) {
		      var m = void 0;
		      // loop over text until all mixins with defintions have been applied
		      while (m = MIXIN_MATCH.exec(text)) {
		        var matchText = m[0];
		        var mixinName = m[1];
		        var idx = m.index;
		        // collect properties before apply to be "defaults" if mixin might override them
		        // match includes a "prefix", so find the start and end positions of @apply
		        var applyPos = idx + matchText.indexOf('@apply');
		        var afterApplyPos = idx + matchText.length;
		        // find props defined before this @apply
		        var textBeforeApply = text.slice(0, applyPos);
		        var textAfterApply = text.slice(afterApplyPos);
		        var defaults$$1 = this._cssTextToMap(textBeforeApply);
		        var replacement = this._atApplyToCssProperties(mixinName, defaults$$1);
		        // use regex match position to replace mixin, keep linear processing time
		        text = [textBeforeApply, replacement, textAfterApply].join('');
		        // move regex search to _after_ replacement
		        MIXIN_MATCH.lastIndex = idx + replacement.length;
		      }
		      return text;
		    }
		    // produce variable consumption at the site of mixin consumption
		    // @apply --foo; -> for all props (${propname}: var(--foo_-_${propname}, ${fallback[propname]}}))
		    // Example:
		    // border: var(--foo_-_border); padding: var(--foo_-_padding, 2px)
		
		  }, {
		    key: '_atApplyToCssProperties',
		    value: function _atApplyToCssProperties(mixinName, fallbacks) {
		      mixinName = mixinName.replace(APPLY_NAME_CLEAN, '');
		      var vars = [];
		      var mixinEntry = this._map.get(mixinName);
		      // if we depend on a mixin before it is created
		      // make a sentinel entry in the map to add this element as a dependency for when it is defined.
		      if (!mixinEntry) {
		        this._map.set(mixinName, {});
		        mixinEntry = this._map.get(mixinName);
		      }
		      if (mixinEntry) {
		        if (this._currentTemplate) {
		          mixinEntry.dependants[this._currentTemplate.name] = this._currentTemplate;
		        }
		        var p = void 0,
		            parts = void 0,
		            f = void 0;
		        for (p in mixinEntry.properties) {
		          f = fallbacks && fallbacks[p];
		          parts = [p, ': var(', mixinName, MIXIN_VAR_SEP, p];
		          if (f) {
		            parts.push(',', f);
		          }
		          parts.push(')');
		          vars.push(parts.join(''));
		        }
		      }
		      return vars.join('; ');
		    }
		  }, {
		    key: '_replaceInitialOrInherit',
		    value: function _replaceInitialOrInherit(property, value) {
		      var match = INITIAL_INHERIT.exec(value);
		      if (match) {
		        if (match[1]) {
		          // initial
		          // replace `initial` with the concrete initial value for this property
		          value = ApplyShim._getInitialValueForProperty(property);
		        } else {
		          // inherit
		          // with this purposfully illegal value, the variable will be invalid at
		          // compute time (https://www.w3.org/TR/css-variables/#invalid-at-computed-value-time)
		          // and for inheriting values, will behave similarly
		          // we cannot support the same behavior for non inheriting values like 'border'
		          value = 'apply-shim-inherit';
		        }
		      }
		      return value;
		    }
		
		    // "parse" a mixin definition into a map of properties and values
		    // cssTextToMap('border: 2px solid black') -> ('border', '2px solid black')
		
		  }, {
		    key: '_cssTextToMap',
		    value: function _cssTextToMap(text) {
		      var props = text.split(';');
		      var property = void 0,
		          value = void 0;
		      var out = {};
		      for (var i = 0, p, sp; i < props.length; i++) {
		        p = props[i];
		        if (p) {
		          sp = p.split(':');
		          // ignore lines that aren't definitions like @media
		          if (sp.length > 1) {
		            property = sp[0].trim();
		            // some properties may have ':' in the value, like data urls
		            value = this._replaceInitialOrInherit(property, sp.slice(1).join(':'));
		            out[property] = value;
		          }
		        }
		      }
		      return out;
		    }
		  }, {
		    key: '_invalidateMixinEntry',
		    value: function _invalidateMixinEntry(mixinEntry) {
		      for (var elementName in mixinEntry.dependants) {
		        if (elementName !== this._currentTemplate) {
		          mixinEntry.dependants[elementName].__applyShimInvalid = true;
		        }
		      }
		    }
		  }, {
		    key: '_produceCssProperties',
		    value: function _produceCssProperties(matchText, propertyName, valueProperty, valueMixin) {
		      var _this3 = this;
		
		      // handle case where property value is a mixin
		      if (valueProperty) {
		        // form: --mixin2: var(--mixin1), where --mixin1 is in the map
		        processVariableAndFallback(valueProperty, function (prefix, value) {
		          if (value && _this3._map.get(value)) {
		            valueMixin = '@apply ' + value + ';';
		          }
		        });
		      }
		      if (!valueMixin) {
		        return matchText;
		      }
		      var mixinAsProperties = this._consumeCssProperties(valueMixin);
		      var prefix = matchText.slice(0, matchText.indexOf('--'));
		      var mixinValues = this._cssTextToMap(mixinAsProperties);
		      var combinedProps = mixinValues;
		      var mixinEntry = this._map.get(propertyName);
		      var oldProps = mixinEntry && mixinEntry.properties;
		      if (oldProps) {
		        // NOTE: since we use mixin, the map of properties is updated here
		        // and this is what we want.
		        combinedProps = Object.assign(Object.create(oldProps), mixinValues);
		      } else {
		        this._map.set(propertyName, combinedProps);
		      }
		      var out = [];
		      var p = void 0,
		          v = void 0;
		      // set variables defined by current mixin
		      var needToInvalidate = false;
		      for (p in combinedProps) {
		        v = mixinValues[p];
		        // if property not defined by current mixin, set initial
		        if (v === undefined) {
		          v = 'initial';
		        }
		        if (oldProps && !(p in oldProps)) {
		          needToInvalidate = true;
		        }
		        out.push(propertyName + MIXIN_VAR_SEP + p + ': ' + v);
		      }
		      if (needToInvalidate) {
		        this._invalidateMixinEntry(mixinEntry);
		      }
		      if (mixinEntry) {
		        mixinEntry.properties = combinedProps;
		      }
		      // because the mixinMap is global, the mixin might conflict with
		      // a different scope's simple variable definition:
		      // Example:
		      // some style somewhere:
		      // --mixin1:{ ... }
		      // --mixin2: var(--mixin1);
		      // some other element:
		      // --mixin1: 10px solid red;
		      // --foo: var(--mixin1);
		      // In this case, we leave the original variable definition in place.
		      if (valueProperty) {
		        prefix = matchText + ';' + prefix;
		      }
		      return prefix + out.join('; ') + ';';
		    }
		  }]);
		  return ApplyShim;
		}();
		
		var applyShim = new ApplyShim();
		window['ApplyShim'] = applyShim;
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		var flush = function flush() {};
		
		if (!nativeShadow) {
		  (function () {
		    var handler = function handler(mxns) {
		      for (var x = 0; x < mxns.length; x++) {
		        var mxn = mxns[x];
		        for (var i = 0; i < mxn.addedNodes.length; i++) {
		          var n = mxn.addedNodes[i];
		          if (n.nodeType === Node.ELEMENT_NODE && !n.classList.contains(StyleTransformer.SCOPE_NAME)) {
		            var root = n.getRootNode();
		            if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		              // may no longer be in a shadowroot
		              var host = root.host;
		              if (host) {
		                var scope = host.is || host.localName;
		                StyleTransformer.dom(n, scope);
		              }
		            }
		          }
		        }
		        for (var _i = 0; _i < mxn.removedNodes.length; _i++) {
		          var _n = mxn.removedNodes[_i];
		          if (_n.nodeType === Node.ELEMENT_NODE) {
		            var classIdx = Array.from(_n.classList).indexOf(StyleTransformer.SCOPE_NAME);
		            if (classIdx >= 0) {
		              // NOTE: relies on the scoping class always being adjacent to the
		              // SCOPE_NAME class.
		              var _scope = _n.classList[classIdx + 1];
		              if (_scope) {
		                StyleTransformer.dom(_n, _scope, true);
		              }
		            }
		          }
		        }
		      }
		    };
		
		    var observer = new MutationObserver(handler);
		    var startState = 'interactive';
		
		    var start = function start() {
		      return observer.observe(document.body, { childList: true, subtree: true });
		    };
		    if (window.HTMLImports) {
		      window.HTMLImports.whenReady(start);
		    } else if (document.readyState === startState) {
		      requestAnimationFrame(start);
		    } else {
		      document.addEventListener('readystatechange', function () {
		        if (document.readyState === startState) {
		          start();
		        }
		      });
		    }
		
		    flush = function flush() {
		      handler(observer.takeRecords());
		    };
		  })();
		}
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		// TODO(dfreedm): consider spliting into separate global
		var styleCache = new StyleCache();
		
		var ShadyCSS = {
		  flush: flush,
		  scopeCounter: {},
		  nativeShadow: nativeShadow,
		  nativeCss: nativeCssVariables,
		  nativeCssApply: nativeCssApply,
		  _documentOwner: document.documentElement,
		  _documentOwnerStyleInfo: StyleInfo.set(document.documentElement, new StyleInfo({ rules: [] })),
		  _generateScopeSelector: function _generateScopeSelector(name) {
		    var id = this.scopeCounter[name] = (this.scopeCounter[name] || 0) + 1;
		    return name + '-' + id;
		  },
		  getStyleAst: function getStyleAst(style) {
		    return rulesForStyle(style);
		  },
		  styleAstToString: function styleAstToString(ast) {
		    return toCssText(ast);
		  },
		  _gatherStyles: function _gatherStyles(template) {
		    var styles = template.content.querySelectorAll('style');
		    var cssText = [];
		    for (var i = 0; i < styles.length; i++) {
		      var s = styles[i];
		      cssText.push(s.textContent);
		      s.parentNode.removeChild(s);
		    }
		    return cssText.join('').trim();
		  },
		  _getCssBuild: function _getCssBuild(template) {
		    var style = template.content.querySelector('style');
		    if (!style) {
		      return '';
		    }
		    return style.getAttribute('css-build') || '';
		  },
		  prepareTemplate: function prepareTemplate(template, elementName, typeExtension) {
		    if (template._prepared) {
		      return;
		    }
		    template._prepared = true;
		    template.name = elementName;
		    template.extends = typeExtension;
		    templateMap[elementName] = template;
		    var cssBuild = this._getCssBuild(template);
		    var cssText = this._gatherStyles(template);
		    var info = {
		      is: elementName,
		      extends: typeExtension,
		      __cssBuild: cssBuild
		    };
		    if (!this.nativeShadow) {
		      StyleTransformer.dom(template.content, elementName);
		    }
		    var ast = parse(cssText);
		    if (this.nativeCss && !this.nativeCssApply) {
		      applyShim.transformRules(ast, elementName);
		    }
		    template._styleAst = ast;
		
		    var ownPropertyNames = [];
		    if (!this.nativeCss) {
		      ownPropertyNames = StyleProperties.decorateStyles(template._styleAst, info);
		    }
		    if (!ownPropertyNames.length || this.nativeCss) {
		      var root = this.nativeShadow ? template.content : null;
		      var placeholder = placeholderMap[elementName];
		      var style = this._generateStaticStyle(info, template._styleAst, root, placeholder);
		      template._style = style;
		    }
		    template._ownPropertyNames = ownPropertyNames;
		  },
		  _generateStaticStyle: function _generateStaticStyle(info, rules, shadowroot, placeholder) {
		    var cssText = StyleTransformer.elementStyles(info, rules);
		    if (cssText.length) {
		      return applyCss(cssText, info.is, shadowroot, placeholder);
		    }
		  },
		  _prepareHost: function _prepareHost(host) {
		    var is = host.getAttribute('is') || host.localName;
		    var typeExtension = void 0;
		    if (is !== host.localName) {
		      typeExtension = host.localName;
		    }
		    var placeholder = placeholderMap[is];
		    var template = templateMap[is];
		    var ast = void 0;
		    var ownStylePropertyNames = void 0;
		    var cssBuild = void 0;
		    if (template) {
		      ast = template._styleAst;
		      ownStylePropertyNames = template._ownPropertyNames;
		      cssBuild = template._cssBuild;
		    }
		    return StyleInfo.set(host, new StyleInfo(ast, placeholder, ownStylePropertyNames, is, typeExtension, cssBuild));
		  },
		  applyStyle: function applyStyle(host, overrideProps) {
		    var is = host.getAttribute('is') || host.localName;
		    if (window.CustomStyle) {
		      var CS = window.CustomStyle;
		      if (CS._documentDirty) {
		        CS.findStyles();
		        if (!this.nativeCss) {
		          this._updateProperties(this._documentOwner, this._documentOwnerStyleInfo);
		        } else if (!this.nativeCssApply) {
		          CS._revalidateApplyShim();
		        }
		        CS.applyStyles();
		        CS._documentDirty = false;
		      }
		    }
		    var styleInfo = StyleInfo.get(host);
		    if (!styleInfo) {
		      styleInfo = this._prepareHost(host);
		    }
		    Object.assign(styleInfo.overrideStyleProperties, overrideProps);
		    if (this.nativeCss) {
		      var template = templateMap[is];
		      if (template && template.__applyShimInvalid && template._style) {
		        // update template
		        applyShim.transformRules(template._styleAst, is);
		        template._style.textContent = StyleTransformer.elementStyles(host, styleInfo.styleRules);
		        // update instance if native shadowdom
		        if (this.nativeShadow) {
		          var style = host.shadowRoot.querySelector('style');
		          style.textContent = StyleTransformer.elementStyles(host, styleInfo.styleRules);
		        }
		        styleInfo.styleRules = template._styleAst;
		      }
		      this._updateNativeProperties(host, styleInfo.overrideStyleProperties);
		    } else {
		      this._updateProperties(host, styleInfo);
		      if (styleInfo.ownStylePropertyNames && styleInfo.ownStylePropertyNames.length) {
		        // TODO: use caching
		        this._applyStyleProperties(host, styleInfo);
		      }
		    }
		    var root = this._isRootOwner(host) ? host : host.shadowRoot;
		    // note: some elements may not have a root!
		    if (root) {
		      this._applyToDescendants(root);
		    }
		  },
		  _applyToDescendants: function _applyToDescendants(root) {
		    var c$ = root.children;
		    for (var i = 0, c; i < c$.length; i++) {
		      c = c$[i];
		      if (c.shadowRoot) {
		        this.applyStyle(c);
		      }
		      this._applyToDescendants(c);
		    }
		  },
		  _styleOwnerForNode: function _styleOwnerForNode(node) {
		    var root = node.getRootNode();
		    var host = root.host;
		    if (host) {
		      if (StyleInfo.get(host)) {
		        return host;
		      } else {
		        return this._styleOwnerForNode(host);
		      }
		    }
		    return this._documentOwner;
		  },
		  _isRootOwner: function _isRootOwner(node) {
		    return node === this._documentOwner;
		  },
		  _applyStyleProperties: function _applyStyleProperties(host, styleInfo) {
		    var is = host.getAttribute('is') || host.localName;
		    var cacheEntry = styleCache.fetch(is, styleInfo.styleProperties, styleInfo.ownStylePropertyNames);
		    var cachedScopeSelector = cacheEntry && cacheEntry.scopeSelector;
		    var cachedStyle = cacheEntry ? cacheEntry.styleElement : null;
		    var oldScopeSelector = styleInfo.scopeSelector;
		    // only generate new scope if cached style is not found
		    styleInfo.scopeSelector = cachedScopeSelector || this._generateScopeSelector(is);
		    var style = StyleProperties.applyElementStyle(host, styleInfo.styleProperties, styleInfo.scopeSelector, cachedStyle);
		    if (!this.nativeShadow) {
		      StyleProperties.applyElementScopeSelector(host, styleInfo.scopeSelector, oldScopeSelector);
		    }
		    if (!cacheEntry) {
		      styleCache.store(is, styleInfo.styleProperties, style, styleInfo.scopeSelector);
		    }
		    return style;
		  },
		  _updateProperties: function _updateProperties(host, styleInfo) {
		    var owner = this._styleOwnerForNode(host);
		    var ownerStyleInfo = StyleInfo.get(owner);
		    var ownerProperties = ownerStyleInfo.styleProperties;
		    var props = Object.create(ownerProperties || null);
		    var hostAndRootProps = StyleProperties.hostAndRootPropertiesForScope(host, styleInfo.styleRules);
		    var propertyData = StyleProperties.propertyDataFromStyles(ownerStyleInfo.styleRules, host);
		    var propertiesMatchingHost = propertyData.properties;
		    Object.assign(props, hostAndRootProps.hostProps, propertiesMatchingHost, hostAndRootProps.rootProps);
		    this._mixinOverrideStyles(props, styleInfo.overrideStyleProperties);
		    StyleProperties.reify(props);
		    styleInfo.styleProperties = props;
		  },
		  _mixinOverrideStyles: function _mixinOverrideStyles(props, overrides) {
		    for (var p in overrides) {
		      var v = overrides[p];
		      // skip override props if they are not truthy or 0
		      // in order to fall back to inherited values
		      if (v || v === 0) {
		        props[p] = v;
		      }
		    }
		  },
		  _updateNativeProperties: function _updateNativeProperties(element, properties) {
		    // remove previous properties
		    for (var p in properties) {
		      // NOTE: for bc with shim, don't apply null values.
		      if (p === null) {
		        element.style.removeProperty(p);
		      } else {
		        element.style.setProperty(p, properties[p]);
		      }
		    }
		  },
		  updateStyles: function updateStyles(properties) {
		    if (window.CustomStyle) {
		      window.CustomStyle._documentDirty = true;
		    }
		    this.applyStyle(this._documentOwner, properties);
		  },
		
		  /* Custom Style operations */
		  _transformCustomStyleForDocument: function _transformCustomStyleForDocument(style) {
		    var _this = this;
		
		    var ast = rulesForStyle(style);
		    forEachRule(ast, function (rule) {
		      if (nativeShadow) {
		        StyleTransformer.normalizeRootSelector(rule);
		      } else {
		        StyleTransformer.documentRule(rule);
		      }
		      if (_this.nativeCss && !_this.nativeCssApply) {
		        applyShim.transformRule(rule);
		      }
		    });
		    if (this.nativeCss) {
		      style.textContent = toCssText(ast);
		    } else {
		      this._documentOwnerStyleInfo.styleRules.rules.push(ast);
		    }
		  },
		  _revalidateApplyShim: function _revalidateApplyShim(style) {
		    if (this.nativeCss && !this.nativeCssApply) {
		      var ast = rulesForStyle(style);
		      applyShim.transformRules(ast);
		      style.textContent = toCssText(ast);
		    }
		  },
		  _applyCustomStyleToDocument: function _applyCustomStyleToDocument(style) {
		    if (!this.nativeCss) {
		      StyleProperties.applyCustomStyle(style, this._documentOwnerStyleInfo.styleProperties);
		    }
		  },
		  getComputedStyleValue: function getComputedStyleValue(element, property) {
		    var value = void 0;
		    if (!this.nativeCss) {
		      // element is either a style host, or an ancestor of a style host
		      var styleInfo = StyleInfo.get(element) || StyleInfo.get(this._styleOwnerForNode(element));
		      value = styleInfo.styleProperties[property];
		    }
		    // fall back to the property value from the computed styling
		    value = value || window.getComputedStyle(element).getPropertyValue(property);
		    // trim whitespace that can come after the `:` in css
		    // example: padding: 2px -> " 2px"
		    return value.trim();
		  },
		
		  // given an element and a classString, replaces
		  // the element's class with the provided classString and adds
		  // any necessary ShadyCSS static and property based scoping selectors
		  // NOTE: this method is suitable to be called in an environment in which
		  // setAttribute('class', ...) and className setter have been overridden so
		  // it cannot rely on those methods.
		  setElementClass: function setElementClass(element, classString) {
		    var _element$classList;
		
		    // use classList to clear existing classes
		    while (element.classList.length) {
		      element.classList.remove(element.classList[0]);
		    }
		    // add user classString
		    (_element$classList = element.classList).add.apply(_element$classList, toConsumableArray(classString.split(' ')));
		    // add static scoping: scope by shadyRoot
		    var root = element.getRootNode();
		    if (root.host) {
		      element.classList.add(StyleTransformer.SCOPE_NAME, root.host.localName);
		    }
		    // add property scoping: scope by special selector
		    if (!this.nativeCss) {
		      var styleInfo = StyleInfo.get(element);
		      if (styleInfo && styleInfo.scopeSelector) {
		        element.classList.add(StyleProperties.XSCOPE_NAME, styleInfo.scopeSelector);
		      }
		    }
		  },
		  _styleInfoForNode: function _styleInfoForNode(node) {
		    return StyleInfo.get(node);
		  }
		};
		
		window['ShadyCSS'] = ShadyCSS;
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		
		/*
		Wrapper over <style> elements to co-operate with ShadyCSS
		
		Example:
		<shady-style>
		  <style>
		  ...
		  </style>
		</shady-style>
		*/
		
		var ShadyCSS$1 = window.ShadyCSS;
		
		var enqueued = false;
		
		var customStyles = [];
		
		var hookFn = null;
		
		/*
		If a page only has <custom-style> elements, it will flash unstyled content,
		as all the instances will boot asynchronously after page load.
		
		Calling ShadyCSS.updateStyles() will force the work to happen synchronously
		*/
		function enqueueDocumentValidation() {
		  if (enqueued) {
		    return;
		  }
		  enqueued = true;
		  if (window.HTMLImports) {
		    window.HTMLImports.whenReady(validateDocument);
		  } else if (document.readyState === 'complete') {
		    requestAnimationFrame(validateDocument);
		  } else {
		    document.addEventListener('readystatechange', function () {
		      if (document.readyState === 'complete') {
		        validateDocument();
		      }
		    });
		  }
		}
		
		// NOTE: Make sure to enqueue eagerly. This is an optimization that
		// helps ensure that the first run of validateDocument will actually
		// have access to all the custom-style's created via loading imports.
		// If the first created custom-style calls enqueue and HTMLImports.ready
		// is true at that time (which is the case when HTMLImports are polyfilled),
		// then the enqueue immediately calls validateDocument and work that could be
		// batched is not.
		enqueueDocumentValidation();
		
		function validateDocument() {
		  if (enqueued) {
		    ShadyCSS$1.updateStyles();
		    enqueued = false;
		  }
		}
		
		function CustomStyle() {
		  /*
		  Use Reflect to invoke the HTMLElement constructor, or rely on the
		  CustomElement polyfill replacement that can be `.call`ed
		  */
		  var self = window.Reflect && Reflect.construct ? Reflect.construct(HTMLElement, [], this.constructor || CustomStyle) : HTMLElement.call(this);
		  customStyles.push(self);
		  enqueueDocumentValidation();
		  return self;
		}
		
		Object.defineProperties(CustomStyle, {
		  /*
		  CustomStyle.processHook is provided to customize the <style> element child of
		  a <custom-style> element before the <style> is processed by ShadyCSS
		   The function must take a <style> element as input, and return nothing.
		  */
		  processHook: {
		    get: function get() {
		      return hookFn;
		    },
		    set: function set(fn) {
		      hookFn = fn;
		      return fn;
		    }
		  },
		  _customStyles: {
		    get: function get() {
		      return customStyles;
		    }
		  },
		  _documentDirty: {
		    get: function get() {
		      return enqueued;
		    },
		    set: function set(value) {
		      enqueued = value;
		      return value;
		    }
		  }
		});
		
		CustomStyle.findStyles = function () {
		  for (var i = 0; i < customStyles.length; i++) {
		    customStyles[i]._findStyle();
		  }
		};
		
		CustomStyle._revalidateApplyShim = function () {
		  for (var i = 0; i < customStyles.length; i++) {
		    var s = customStyles[i];
		    if (s._style) {
		      ShadyCSS$1._revalidateApplyShim(s._style);
		    }
		  }
		};
		
		CustomStyle.applyStyles = function () {
		  for (var i = 0; i < customStyles.length; i++) {
		    customStyles[i]._applyStyle();
		  }
		};
		
		CustomStyle.prototype = Object.create(HTMLElement.prototype, {
		  'constructor': {
		    value: CustomStyle,
		    configurable: true,
		    writable: true
		  }
		});
		
		CustomStyle.prototype._findStyle = function () {
		  if (!this._style) {
		    var style = this.querySelector('style');
		    if (!style) {
		      return;
		    }
		    // HTMLImports polyfill may have cloned the style into the main document,
		    // which is referenced with __appliedElement.
		    // Also, we must copy over the attributes.
		    if (style.__appliedElement) {
		      for (var i = 0; i < style.attributes.length; i++) {
		        var attr = style.attributes[i];
		        style.__appliedElement.setAttribute(attr.name, attr.value);
		      }
		    }
		    this._style = style.__appliedElement || style;
		    if (hookFn) {
		      hookFn(this._style);
		    }
		    ShadyCSS$1._transformCustomStyleForDocument(this._style);
		  }
		};
		
		CustomStyle.prototype._applyStyle = function () {
		  if (this._style) {
		    ShadyCSS$1._applyCustomStyleToDocument(this._style);
		  }
		};
		
		window.customElements.define('custom-style', CustomStyle);
		window['CustomStyle'] = CustomStyle;
		
		/**
		@license
		Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
		This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
		The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
		The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
		Code distributed by Google as part of the polymer project is also
		subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
		*/
		/*
		Small module to load ShadyCSS and CustomStyle together
		*/
		
		}());
		
		//# sourceMappingURL=shadycss.min.js.map
	
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=index.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(3), __webpack_require__(4)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'incremental-dom', 'window-or-global'], factory) :
	  (factory((global.skate = global.skate || {}),global.IncrementalDOM,global.windowOrGlobal));
	}(this, (function (exports,incrementalDom,root) {
	
	root = 'default' in root ? root['default'] : root;
	
	function keys() {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var _ref$enumOnly = _ref.enumOnly;
	  var enumOnly = _ref$enumOnly === undefined ? false : _ref$enumOnly;
	
	  var listOfKeys = Object[enumOnly ? 'keys' : 'getOwnPropertyNames'](obj);
	  return typeof Object.getOwnPropertySymbols === 'function' ? listOfKeys.concat(Object.getOwnPropertySymbols(obj)) : listOfKeys;
	}
	
	// We are not using Object.assign if it is defined since it will cause problems when Symbol is polyfilled.
	// Apparently Object.assign (or any polyfill for this method) does not copy non-native Symbols.
	var assign = (function (obj) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  args.forEach(function (arg) {
	    return keys(arg).forEach(function (name) {
	      return obj[name] = arg[name];
	    });
	  }); // eslint-disable-line no-return-assign
	  return obj;
	});
	
	var empty = function (val) {
	  return typeof val === 'undefined' || val === null;
	};
	
	var alwaysUndefinedIfNotANumberOrNumber = function alwaysUndefinedIfNotANumberOrNumber(val) {
	  return isNaN(val) ? undefined : Number(val);
	};
	var alwaysUndefinedIfEmptyOrString = function alwaysUndefinedIfEmptyOrString(val) {
	  return empty(val) ? undefined : String(val);
	};
	
	function create(def) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    args.unshift({}, def);
	    return assign.apply(undefined, args);
	  };
	}
	
	var array = create({
	  coerce: function coerce(val) {
	    return Array.isArray(val) ? val : [val];
	  },
	  default: function _default() {
	    return [];
	  },
	  deserialize: JSON.parse,
	  serialize: JSON.stringify
	});
	
	var boolean = create({
	  coerce: function coerce(value) {
	    return !!value;
	  },
	  default: false,
	  deserialize: function deserialize(value) {
	    return !(value === null);
	  },
	  serialize: function serialize(value) {
	    return value ? '' : undefined;
	  }
	});
	
	var number = create({
	  default: 0,
	  coerce: alwaysUndefinedIfNotANumberOrNumber,
	  deserialize: alwaysUndefinedIfNotANumberOrNumber,
	  serialize: alwaysUndefinedIfNotANumberOrNumber
	});
	
	var string = create({
	  default: '',
	  coerce: alwaysUndefinedIfEmptyOrString,
	  deserialize: alwaysUndefinedIfEmptyOrString,
	  serialize: alwaysUndefinedIfEmptyOrString
	});
	
	var prop = Object.freeze({
		create: create,
		array: array,
		boolean: boolean,
		number: number,
		string: string
	});
	
	var connected = '____skate_connected';
	var created$1 = '____skate_created';
	
	// DEPRECATED
	//
	// This is the only "symbol" that must stay a string. This is because it is
	// relied upon across several versions. We should remove it, but ensure that
	// it's considered a breaking change that whatever version removes it cannot
	// be passed to vdom functions as tag names.
	var name = '____skate_name';
	
	// Used on the Constructor
	var ctorCreateInitProps = '____skate_ctor_createInitProps';
	var ctorObservedAttributes = '____skate_ctor_observedAttributes';
	var ctorProps = '____skate_ctor_props';
	var ctorPropsMap = '____skate_ctor_propsMap';
	
	// Used on the Element
	var props = '____skate_props';
	var ref$1 = '____skate_ref';
	var renderer$1 = '____skate_renderer';
	var rendering = '____skate_rendering';
	var rendererDebounced = '____skate_rendererDebounced';
	var updated$1 = '____skate_updated';
	
	// DEPRECTAED
	//
	// We should not be relying on internals for symbols as this creates version
	// coupling. We will move forward with platform agnostic ways of doing this.
	
	
	var symbols$1 = Object.freeze({
		name: name
	});
	
	function enter(object, props) {
	  var saved = {};
	  Object.keys(props).forEach(function (key) {
	    saved[key] = object[key];
	    object[key] = props[key];
	  });
	  return saved;
	}
	
	function exit(object, saved) {
	  assign(object, saved);
	}
	
	// Decorates a function with a side effect that changes the properties of an
	// object during its execution, and restores them after. There is no error
	// handling here, if the wrapped function throws an error, properties are not
	// restored and all bets are off.
	var propContext = function (object, props) {
	  return function (func) {
	    return function () {
	      var saved = enter(object, props);
	      var result = func.apply(undefined, arguments);
	      exit(object, saved);
	      return result;
	    };
	  };
	};
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};
	
	
	
	
	
	var asyncGenerator = function () {
	  function AwaitValue(value) {
	    this.value = value;
	  }
	
	  function AsyncGenerator(gen) {
	    var front, back;
	
	    function send(key, arg) {
	      return new Promise(function (resolve, reject) {
	        var request = {
	          key: key,
	          arg: arg,
	          resolve: resolve,
	          reject: reject,
	          next: null
	        };
	
	        if (back) {
	          back = back.next = request;
	        } else {
	          front = back = request;
	          resume(key, arg);
	        }
	      });
	    }
	
	    function resume(key, arg) {
	      try {
	        var result = gen[key](arg);
	        var value = result.value;
	
	        if (value instanceof AwaitValue) {
	          Promise.resolve(value.value).then(function (arg) {
	            resume("next", arg);
	          }, function (arg) {
	            resume("throw", arg);
	          });
	        } else {
	          settle(result.done ? "return" : "normal", result.value);
	        }
	      } catch (err) {
	        settle("throw", err);
	      }
	    }
	
	    function settle(type, value) {
	      switch (type) {
	        case "return":
	          front.resolve({
	            value: value,
	            done: true
	          });
	          break;
	
	        case "throw":
	          front.reject(value);
	          break;
	
	        default:
	          front.resolve({
	            value: value,
	            done: false
	          });
	          break;
	      }
	
	      front = front.next;
	
	      if (front) {
	        resume(front.key, front.arg);
	      } else {
	        back = null;
	      }
	    }
	
	    this._invoke = send;
	
	    if (typeof gen.return !== "function") {
	      this.return = undefined;
	    }
	  }
	
	  if (typeof Symbol === "function" && Symbol.asyncIterator) {
	    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	      return this;
	    };
	  }
	
	  AsyncGenerator.prototype.next = function (arg) {
	    return this._invoke("next", arg);
	  };
	
	  AsyncGenerator.prototype.throw = function (arg) {
	    return this._invoke("throw", arg);
	  };
	
	  AsyncGenerator.prototype.return = function (arg) {
	    return this._invoke("return", arg);
	  };
	
	  return {
	    wrap: function (fn) {
	      return function () {
	        return new AsyncGenerator(fn.apply(this, arguments));
	      };
	    },
	    await: function (value) {
	      return new AwaitValue(value);
	    }
	  };
	}();
	
	
	
	
	
	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	
	
	
	
	
	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};
	
	var get$1 = function get$1(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);
	
	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);
	
	    if (parent === null) {
	      return undefined;
	    } else {
	      return get$1(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;
	
	    if (getter === undefined) {
	      return undefined;
	    }
	
	    return getter.call(receiver);
	  }
	};
	
	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};
	
	
	
	
	
	
	
	
	
	
	
	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};
	
	
	
	var set$1 = function set$1(object, property, value, receiver) {
	  var desc = Object.getOwnPropertyDescriptor(object, property);
	
	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);
	
	    if (parent !== null) {
	      set$1(parent, property, value, receiver);
	    }
	  } else if ("value" in desc && desc.writable) {
	    desc.value = value;
	  } else {
	    var setter = desc.set;
	
	    if (setter !== undefined) {
	      setter.call(receiver, value);
	    }
	  }
	
	  return value;
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
	
	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};
	
	/* eslint no-plusplus: 0 */
	
	var customElements = root.customElements;
	var HTMLElement = root.HTMLElement;
	
	var applyDefault = incrementalDom.attributes[incrementalDom.symbols.default];
	
	// A stack of children that corresponds to the current function helper being
	// executed.
	var stackChren = [];
	
	var $skip = '__skip';
	var $currentEventHandlers = '__events';
	var $stackCurrentHelperProps = '__props';
	
	// The current function helper in the stack.
	var stackCurrentHelper = void 0;
	
	// This is used for the Incremental DOM overrides to keep track of what args
	// to pass the main elementOpen() function.
	var overrideArgs = void 0;
	
	// The number of levels deep after skipping a tree.
	var skips = 0;
	
	var noop = function noop() {};
	
	// Adds or removes an event listener for an element.
	function applyEvent(elem, ename, newFunc) {
	  var events = elem[$currentEventHandlers];
	
	  if (!events) {
	    events = elem[$currentEventHandlers] = {};
	  }
	
	  // Undefined indicates that there is no listener yet.
	  if (typeof events[ename] === 'undefined') {
	    // We only add a single listener once. Originally this was a workaround for
	    // the Webcomponents ShadyDOM polyfill not removing listeners, but it's
	    // also a simpler model for binding / unbinding events because you only
	    // have a single handler you need to worry about and a single place where
	    // you only store one event handler
	    elem.addEventListener(ename, function (e) {
	      if (events[ename]) {
	        events[ename].call(this, e);
	      }
	    });
	  }
	
	  // Not undefined indicates that we have set a listener, so default to null.
	  events[ename] = typeof newFunc === 'function' ? newFunc : null;
	}
	
	var attributesContext = propContext(incrementalDom.attributes, defineProperty({
	  // Attributes that shouldn't be applied to the DOM.
	  key: noop,
	  statics: noop,
	
	  // Attributes that *must* be set via a property on all elements.
	  checked: incrementalDom.applyProp,
	  className: incrementalDom.applyProp,
	  disabled: incrementalDom.applyProp,
	  value: incrementalDom.applyProp,
	
	  // Ref handler.
	  ref: function ref(elem, name$$1, value) {
	    elem[ref$1] = value;
	  },
	
	
	  // Skip handler.
	  skip: function skip(elem, name$$1, value) {
	    if (value) {
	      elem[$skip] = true;
	    } else {
	      delete elem[$skip];
	    }
	  }
	}, incrementalDom.symbols.default, function (elem, name$$1, value) {
	  var _ref = customElements.get(elem.localName) || {
	    props: {},
	    prototype: {}
	  };
	
	  var props$$1 = _ref.props;
	  var prototype = _ref.prototype;
	
	  // TODO when refactoring properties to not have to workaround the old
	  // WebKit bug we can remove the "name in props" check below.
	  //
	  // NOTE: That the "name in elem" check won't work for polyfilled custom
	  // elements that set a property that isn't explicitly specified in "props"
	  // or "prototype" unless it is added to the element explicitly as a
	  // property prior to passing the prop to the vdom function. For example, if
	  // it were added in a lifecycle callback because it wouldn't have been
	  // upgraded yet.
	  //
	  // We prefer setting props, so we do this if there's a property matching
	  // name that was passed. However, certain props on SVG elements are
	  // readonly and error when you try to set them.
	
	  if ((name$$1 in props$$1 || name$$1 in elem || name$$1 in prototype) && !('ownerSVGElement' in elem)) {
	    incrementalDom.applyProp(elem, name$$1, value);
	    return;
	  }
	
	  // Explicit false removes the attribute.
	  if (value === false) {
	    applyDefault(elem, name$$1);
	    return;
	  }
	
	  // Handle built-in and custom events.
	  if (name$$1.indexOf('on') === 0) {
	    var firstChar = name$$1[2];
	    var eventName = void 0;
	
	    if (firstChar === '-') {
	      eventName = name$$1.substring(3);
	    } else if (firstChar === firstChar.toUpperCase()) {
	      eventName = firstChar.toLowerCase() + name$$1.substring(3);
	    }
	
	    if (eventName) {
	      applyEvent(elem, eventName, value);
	      return;
	    }
	  }
	
	  applyDefault(elem, name$$1, value);
	}));
	
	function resolveTagName(name$$1) {
	  // We return falsy values as some wrapped IDOM functions allow empty values.
	  if (!name$$1) {
	    return name$$1;
	  }
	
	  // We try and return the cached tag name, if one exists.
	  if (name$$1[name]) {
	    return name$$1[name];
	  }
	
	  // If it's a custom element, we get the tag name by constructing it and
	  // caching it.
	  if (name$$1.prototype instanceof HTMLElement) {
	    // eslint-disable-next-line
	    var elem = new name$$1();
	    return name$$1[name] = elem.localName;
	  }
	
	  // Pass all other values through so IDOM gets what it's expecting.
	  return name$$1;
	}
	
	// Incremental DOM's elementOpen is where the hooks in `attributes` are applied,
	// so it's the only function we need to execute in the context of our attributes.
	var elementOpen$1 = attributesContext(incrementalDom.elementOpen);
	
	function elementOpenStart(tag) {
	  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  var statics = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	  overrideArgs = [tag, key, statics];
	}
	
	function elementOpenEnd() {
	  var node = newElementOpen.apply(undefined, toConsumableArray(overrideArgs)); // eslint-disable-line no-use-before-define
	  overrideArgs = null;
	  return node;
	}
	
	function wrapIdomFunc(func) {
	  var tnameFuncHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	  return function wrap() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    args[0] = resolveTagName(args[0]);
	    stackCurrentHelper = null;
	    if (typeof args[0] === 'function') {
	      // If we've encountered a function, handle it according to the type of
	      // function that is being wrapped.
	      stackCurrentHelper = args[0];
	      return tnameFuncHandler.apply(undefined, args);
	    } else if (stackChren.length) {
	      // We pass the wrap() function in here so that when it's called as
	      // children, it will queue up for the next stack, if there is one.
	      stackChren[stackChren.length - 1].push([wrap, args]);
	    } else {
	      if (func === elementOpen$1) {
	        if (skips) {
	          return ++skips;
	        }
	
	        var elem = func.apply(undefined, args);
	
	        if (elem[$skip]) {
	          ++skips;
	        }
	
	        return elem;
	      }
	
	      if (func === incrementalDom.elementClose) {
	        if (skips === 1) {
	          incrementalDom.skip();
	        }
	
	        // We only want to skip closing if it's not the last closing tag in the
	        // skipped tree because we keep the element that initiated the skpping.
	        if (skips && --skips) {
	          return;
	        }
	
	        var _elem = func.apply(undefined, args);
	        var ref$$1 = _elem[ref$1];
	
	        // We delete so that it isn't called again for the same element. If the
	        // ref changes, or the element changes, this will be defined again.
	        delete _elem[ref$1];
	
	        // Execute the saved ref after esuring we've cleand up after it.
	        if (typeof ref$$1 === 'function') {
	          ref$$1(_elem);
	        }
	
	        return _elem;
	      }
	
	      // We must call elementOpenStart and elementOpenEnd even if we are
	      // skipping because they queue up attributes and then call elementClose.
	      if (!skips || func === elementOpenStart || func === elementOpenEnd) {
	        return func.apply(undefined, args);
	      }
	    }
	  };
	}
	
	function newAttr() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  if (stackCurrentHelper) {
	    stackCurrentHelper[$stackCurrentHelperProps][args[0]] = args[1];
	  } else if (stackChren.length) {
	    stackChren[stackChren.length - 1].push([newAttr, args]);
	  } else {
	    overrideArgs.push(args[0]);
	    overrideArgs.push(args[1]);
	  }
	}
	
	function stackOpen(tname, key, statics) {
	  var props$$1 = { key: key, statics: statics };
	
	  for (var _len3 = arguments.length, attrs = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
	    attrs[_key3 - 3] = arguments[_key3];
	  }
	
	  for (var a = 0; a < attrs.length; a += 2) {
	    props$$1[attrs[a]] = attrs[a + 1];
	  }
	  tname[$stackCurrentHelperProps] = props$$1;
	  stackChren.push([]);
	}
	
	function stackClose(tname) {
	  var chren = stackChren.pop();
	  var props$$1 = tname[$stackCurrentHelperProps];
	  delete tname[$stackCurrentHelperProps];
	  var elemOrFn = tname(props$$1, function () {
	    return chren.forEach(function (args) {
	      return args[0].apply(args, toConsumableArray(args[1]));
	    });
	  });
	  return typeof elemOrFn === 'function' ? elemOrFn() : elemOrFn;
	}
	
	// Incremental DOM overrides
	// -------------------------
	
	// We must override internal functions that call internal Incremental DOM
	// functions because we can't override the internal references. This means
	// we must roughly re-implement their behaviour. Luckily, they're fairly
	// simple.
	var newElementOpenStart = wrapIdomFunc(elementOpenStart, stackOpen);
	var newElementOpenEnd = wrapIdomFunc(elementOpenEnd);
	
	// Standard open / closed overrides don't need to reproduce internal behaviour
	// because they are the ones referenced from *End and *Start.
	var newElementOpen = wrapIdomFunc(elementOpen$1, stackOpen);
	var newElementClose = wrapIdomFunc(incrementalDom.elementClose, stackClose);
	
	// Ensure we call our overridden functions instead of the internal ones.
	function newElementVoid(tag) {
	  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    args[_key4 - 1] = arguments[_key4];
	  }
	
	  newElementOpen.apply(undefined, [tag].concat(args));
	  return newElementClose(tag);
	}
	
	// Text override ensures their calls can queue if using function helpers.
	var newText = wrapIdomFunc(incrementalDom.text);
	
	// Convenience function for declaring an Incremental DOM element using
	// hyperscript-style syntax.
	function element(tname, attrs) {
	  var atype = typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs);
	
	  // If attributes are a function, then they should be treated as children.
	
	  for (var _len5 = arguments.length, chren = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
	    chren[_key5 - 2] = arguments[_key5];
	  }
	
	  if (atype === 'function' || atype === 'string' || atype === 'number') {
	    chren.unshift(attrs);
	  }
	
	  // Ensure the attributes are an object. Null is considered an object so we
	  // have to test for this explicitly.
	  if (attrs === null || atype !== 'object') {
	    attrs = {};
	  }
	
	  // We open the element so we can set attrs after.
	  newElementOpenStart(tname, attrs.key, attrs.statics);
	
	  // Delete so special attrs don't actually get set.
	  delete attrs.key;
	  delete attrs.statics;
	
	  // Set attributes.
	  Object.keys(attrs).forEach(function (name$$1) {
	    return newAttr(name$$1, attrs[name$$1]);
	  });
	
	  // Close before we render the descendant tree.
	  newElementOpenEnd(tname);
	
	  chren.forEach(function (ch) {
	    var ctype = typeof ch === 'undefined' ? 'undefined' : _typeof(ch);
	    if (ctype === 'function') {
	      ch();
	    } else if (ctype === 'string' || ctype === 'number') {
	      newText(ch);
	    } else if (Array.isArray(ch)) {
	      ch.forEach(function (sch) {
	        return sch();
	      });
	    }
	  });
	
	  return newElementClose(tname);
	}
	
	// Even further convenience for building a DSL out of JavaScript functions or hooking into standard
	// transpiles for JSX (React.createElement() / h).
	function builder() {
	  for (var _len6 = arguments.length, tags = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    tags[_key6] = arguments[_key6];
	  }
	
	  if (tags.length === 0) {
	    return function () {
	      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }
	
	      return element.bind.apply(element, [null].concat(args));
	    };
	  }
	  return tags.map(function (tag) {
	    return function () {
	      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	        args[_key8] = arguments[_key8];
	      }
	
	      return element.bind.apply(element, [null, tag].concat(args));
	    };
	  });
	}
	
	
	
	var vdom = Object.freeze({
		element: element,
		builder: builder,
		attr: newAttr,
		elementClose: newElementClose,
		elementOpen: newElementOpen,
		elementOpenEnd: newElementOpenEnd,
		elementOpenStart: newElementOpenStart,
		elementVoid: newElementVoid,
		text: newText
	});
	
	function createSymbol(description) {
	  return typeof Symbol === 'function' ? Symbol(description) : description;
	}
	
	var data = function (element) {
	  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	  var data = element.__SKATE_DATA || (element.__SKATE_DATA = {});
	  return namespace && (data[namespace] || (data[namespace] = {})) || data; // eslint-disable-line no-mixed-operators
	};
	
	var dashCase = function (str) {
	  return str.split(/([A-Z])/).reduce(function (one, two, idx) {
	    var dash = !one || idx % 2 === 0 ? '' : '-';
	    return '' + one + dash + two.toLowerCase();
	  });
	};
	
	var nativeHints = ['native code', '[object MutationObserverConstructor]' // for mobile safari iOS 9.0
	];
	var native = (function (fn) {
	  return nativeHints.map(function (hint) {
	    return (fn || '').toString().indexOf([hint]) > -1;
	  }).reduce(function (a, b) {
	    return a || b;
	  });
	});
	
	var MutationObserver = root.MutationObserver;
	
	
	function microtaskDebounce(cbFunc) {
	  var scheduled = false;
	  var i = 0;
	  var cbArgs = [];
	  var elem = document.createElement('span');
	  var observer = new MutationObserver(function () {
	    cbFunc.apply(undefined, toConsumableArray(cbArgs));
	    scheduled = false;
	    cbArgs = null;
	  });
	
	  observer.observe(elem, { childList: true });
	
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    cbArgs = args;
	    if (!scheduled) {
	      scheduled = true;
	      elem.textContent = '' + i;
	      i += 1;
	    }
	  };
	}
	
	// We have to use setTimeout() for IE9 and 10 because the Mutation Observer
	// polyfill requires that the element be in the document to trigger Mutation
	// Events. Mutation Events are also synchronous and thus wouldn't debounce.
	//
	// The soonest we can set the timeout for in IE is 1 as they have issues when
	// setting to 0.
	function taskDebounce(cbFunc) {
	  var scheduled = false;
	  var cbArgs = [];
	  return function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    cbArgs = args;
	    if (!scheduled) {
	      scheduled = true;
	      setTimeout(function () {
	        scheduled = false;
	        cbFunc.apply(undefined, toConsumableArray(cbArgs));
	      }, 1);
	    }
	  };
	}
	var debounce = native(MutationObserver) ? microtaskDebounce : taskDebounce;
	
	var getOwnPropertyDescriptors = function () {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  return keys(obj).reduce(function (prev, curr) {
	    prev[curr] = Object.getOwnPropertyDescriptor(obj, curr);
	    return prev;
	  }, {});
	};
	
	/**
	 * This is needed to avoid IE11 "stack size errors" when creating
	 * a new property on the constructor of an HTMLElement
	 */
	function setCtorNativeProperty(Ctor, propName, value) {
	  Object.defineProperty(Ctor, propName, { configurable: true, value: value });
	}
	
	/**
	 * Returns a cached map of property options for the given component class.
	 * Keys in the map are the properties name which can a string or a symbol.
	 *
	 * The map is created by caching the result of: static get props
	 */
	function getPropsMap(Ctor) {
	  // Must be defined on constructor and not from a superclass
	  if (!Ctor.hasOwnProperty(ctorPropsMap)) {
	    (function () {
	      var props$$1 = Ctor.props || {};
	
	      var propsMap = keys(props$$1).reduce(function (result, propNameOrSymbol) {
	        result[propNameOrSymbol] = props$$1[propNameOrSymbol];
	        return result;
	      }, {});
	      setCtorNativeProperty(Ctor, ctorPropsMap, propsMap);
	    })();
	  }
	
	  return Ctor[ctorPropsMap];
	}
	
	function get$2(elem) {
	  var props$$1 = {};
	  keys(getPropsMap(elem.constructor)).forEach(function (key) {
	    props$$1[key] = elem[key];
	  });
	
	  return props$$1;
	}
	
	function set$2(elem, newProps) {
	  assign(elem, newProps);
	  if (elem[renderer$1]) {
	    elem[renderer$1]();
	  }
	}
	
	var props$1 = function (elem, newProps) {
	  return typeof newProps === 'undefined' ? get$2(elem) : set$2(elem, newProps);
	};
	
	function getDefaultValue(elem, name, opts) {
	  return typeof opts.default === 'function' ? opts.default(elem, { name: name }) : opts.default;
	}
	
	function getInitialValue(elem, name, opts) {
	  return typeof opts.initial === 'function' ? opts.initial(elem, { name: name }) : opts.initial;
	}
	
	function getPropData(elem, name) {
	  var elemData = data(elem, 'props');
	  return elemData[name] || (elemData[name] = {});
	}
	
	function syncFirstTimeProp(elem, prop, propName, attributeName, propData) {
	  var syncAttrValue = propData.lastAssignedValue;
	  if (empty(syncAttrValue)) {
	    if ('initial' in prop) {
	      syncAttrValue = getInitialValue(elem, propName, prop);
	    } else if ('default' in prop) {
	      syncAttrValue = getDefaultValue(elem, propName, prop);
	    }
	  }
	  if (!empty(syncAttrValue) && prop.serialize) {
	    syncAttrValue = prop.serialize(syncAttrValue);
	  }
	  if (!empty(syncAttrValue)) {
	    propData.syncingAttribute = true;
	    elem.setAttribute(attributeName, syncAttrValue);
	  }
	}
	
	function syncExistingProp(elem, prop, propName, attributeName, propData) {
	  if (attributeName && !propData.settingAttribute) {
	    var internalValue = propData.internalValue;
	
	    var serializedValue = prop.serialize(internalValue);
	    var currentAttrValue = elem.getAttribute(attributeName);
	    var serializedIsEmpty = empty(serializedValue);
	    var attributeChanged = !(serializedIsEmpty && empty(currentAttrValue) || serializedValue === currentAttrValue);
	
	    propData.syncingAttribute = true;
	
	    var shouldRemoveAttribute = empty(propData.lastAssignedValue);
	    if (shouldRemoveAttribute || serializedIsEmpty) {
	      elem.removeAttribute(attributeName);
	    } else {
	      elem.setAttribute(attributeName, serializedValue);
	    }
	
	    if (!attributeChanged && propData.syncingAttribute) {
	      propData.syncingAttribute = false;
	    }
	  }
	
	  // Allow the attribute to be linked again.
	  propData.settingAttribute = false;
	}
	
	function syncPropToAttr(elem, prop, propName, isFirstSync) {
	  var attributeName = data(elem, 'propertyLinks')[propName];
	  var propData = getPropData(elem, propName);
	
	  if (attributeName) {
	    if (isFirstSync) {
	      syncFirstTimeProp(elem, prop, propName, attributeName, propData);
	    } else {
	      syncExistingProp(elem, prop, propName, attributeName, propData);
	    }
	  }
	}
	
	function createNativePropertyDefinition(name$$1, opts) {
	  var prop = {
	    configurable: true,
	    enumerable: true
	  };
	
	  prop.created = function created(elem) {
	    var propData = getPropData(elem, name$$1);
	    var attributeName = opts.attribute === true ? dashCase(name$$1) : opts.attribute;
	    var initialValue = elem[name$$1];
	
	    // Store property to attribute link information.
	    data(elem, 'attributeLinks')[attributeName] = name$$1;
	    data(elem, 'propertyLinks')[name$$1] = attributeName;
	
	    // Set up initial value if it wasn't specified.
	    if (empty(initialValue)) {
	      if (attributeName && elem.hasAttribute(attributeName)) {
	        initialValue = opts.deserialize(elem.getAttribute(attributeName));
	      } else if ('initial' in opts) {
	        initialValue = getInitialValue(elem, name$$1, opts);
	      } else if ('default' in opts) {
	        initialValue = getDefaultValue(elem, name$$1, opts);
	      }
	    }
	
	    propData.internalValue = opts.coerce ? opts.coerce(initialValue) : initialValue;
	  };
	
	  prop.get = function get() {
	    var propData = getPropData(this, name$$1);
	    var internalValue = propData.internalValue;
	
	    return typeof opts.get === 'function' ? opts.get(this, { name: name$$1, internalValue: internalValue }) : internalValue;
	  };
	
	  prop.set = function set(newValue) {
	    var propData = getPropData(this, name$$1);
	    propData.lastAssignedValue = newValue;
	    var oldValue = propData.oldValue;
	
	
	    if (empty(oldValue)) {
	      oldValue = null;
	    }
	
	    if (empty(newValue)) {
	      newValue = getDefaultValue(this, name$$1, opts);
	    }
	
	    if (typeof opts.coerce === 'function') {
	      newValue = opts.coerce(newValue);
	    }
	
	    var changeData = { name: name$$1, newValue: newValue, oldValue: oldValue };
	
	    if (typeof opts.set === 'function') {
	      opts.set(this, changeData);
	    }
	
	    // Queue a re-render.
	    this[rendererDebounced](this);
	
	    // Update prop data so we can use it next time.
	    propData.internalValue = propData.oldValue = newValue;
	
	    // Link up the attribute.
	    if (this[connected]) {
	      syncPropToAttr(this, opts, name$$1, false);
	    }
	  };
	
	  return prop;
	}
	
	var initProps = function (opts) {
	  opts = opts || {};
	
	  if (typeof opts === 'function') {
	    opts = { coerce: opts };
	  }
	
	  return function (name$$1) {
	    return createNativePropertyDefinition(name$$1, assign({
	      default: null,
	      deserialize: function deserialize(value) {
	        return value;
	      },
	      serialize: function serialize(value) {
	        return value;
	      }
	    }, opts));
	  };
	};
	
	var HTMLElement$1 = root.HTMLElement || function () {
	  function _class() {
	    classCallCheck(this, _class);
	  }
	
	  return _class;
	}();
	var _prevName = createSymbol('prevName');
	var _prevOldValue = createSymbol('prevOldValue');
	var _prevNewValue = createSymbol('prevNewValue');
	
	function preventDoubleCalling(elem, name$$1, oldValue, newValue) {
	  return name$$1 === elem[_prevName] && oldValue === elem[_prevOldValue] && newValue === elem[_prevNewValue];
	}
	
	function syncPropsToAttrs(elem) {
	  var props$$1 = getPropsMap(elem.constructor);
	  Object.keys(props$$1).forEach(function (propName) {
	    var prop = props$$1[propName];
	    syncPropToAttr(elem, prop, propName, true);
	  });
	}
	
	// TODO remove when not catering to Safari < 10.
	//
	// Ensures that definitions passed as part of the constructor are functions
	// that return property definitions used on the element.
	function ensurePropertyFunctions(Ctor) {
	  var props$$1 = getPropsMap(Ctor);
	  return keys(props$$1).reduce(function (descriptors, descriptorName) {
	    descriptors[descriptorName] = props$$1[descriptorName];
	    if (typeof descriptors[descriptorName] !== 'function') {
	      descriptors[descriptorName] = initProps(descriptors[descriptorName]);
	    }
	    return descriptors;
	  }, {});
	}
	
	// TODO remove when not catering to Safari < 10.
	//
	// This can probably be simplified into createInitProps().
	function ensurePropertyDefinitions(Ctor) {
	  var props$$1 = ensurePropertyFunctions(Ctor);
	  return keys(props$$1).reduce(function (descriptors, descriptorName) {
	    descriptors[descriptorName] = props$$1[descriptorName](descriptorName);
	    return descriptors;
	  }, {});
	}
	
	// TODO refactor when not catering to Safari < 10.
	//
	// We should be able to simplify this where all we do is Object.defineProperty().
	function createInitProps(Ctor) {
	  var props$$1 = ensurePropertyDefinitions(Ctor);
	
	  return function (elem) {
	    if (!props$$1) {
	      return;
	    }
	
	    keys(props$$1).forEach(function (name$$1) {
	      var prop = props$$1[name$$1];
	      prop.created(elem);
	
	      // We check here before defining to see if the prop was specified prior
	      // to upgrading.
	      var hasPropBeforeUpgrading = name$$1 in elem;
	
	      // This is saved prior to defining so that we can set it after it it was
	      // defined prior to upgrading. We don't want to invoke the getter if we
	      // don't need to, so we only get the value if we need to re-sync.
	      var valueBeforeUpgrading = hasPropBeforeUpgrading && elem[name$$1];
	
	      // https://bugs.webkit.org/show_bug.cgi?id=49739
	      //
	      // When Webkit fixes that bug so that native property accessors can be
	      // retrieved, we can move defining the property to the prototype and away
	      // from having to do if for every instance as all other browsers support
	      // this.
	      Object.defineProperty(elem, name$$1, prop);
	
	      // DEPRECATED
	      //
	      // We'll be removing get / set callbacks on properties. Use the
	      // updatedCallback() instead.
	      //
	      // We re-set the prop if it was specified prior to upgrading because we
	      // need to ensure set() is triggered both in polyfilled environments and
	      // in native where the definition may be registerd after elements it
	      // represents have already been created.
	      if (hasPropBeforeUpgrading) {
	        elem[name$$1] = valueBeforeUpgrading;
	      }
	    });
	  };
	}
	
	var _class2 = function (_HTMLElement) {
	  inherits(_class2, _HTMLElement);
	  createClass(_class2, null, [{
	    key: 'observedAttributes',
	
	
	    /**
	     * Returns unique attribute names configured with props and
	     * those set on the Component constructor if any
	     */
	    get: function get() {
	      var attrsOnCtor = this.hasOwnProperty(ctorObservedAttributes) ? this[ctorObservedAttributes] : [];
	
	      var props$$1 = getPropsMap(this);
	      var attrsFromLinkedProps = Object.keys(props$$1).map(function (key) {
	        var attribute = props$$1[key].attribute;
	
	        return attribute === true ? dashCase(key) : attribute;
	      }).filter(Boolean);
	
	      var all = attrsFromLinkedProps.concat(attrsOnCtor).concat(get$1(_class2.__proto__ || Object.getPrototypeOf(_class2), 'observedAttributes', this));
	
	      return all.filter(function (item, index) {
	        return all.indexOf(item) === index;
	      });
	    },
	    set: function set(value) {
	      value = Array.isArray(value) ? value : [];
	      setCtorNativeProperty(this, 'observedAttributes', value);
	    }
	
	    // Returns superclass props overwritten with this Component props
	
	  }, {
	    key: 'props',
	    get: function get() {
	      return assign({}, get$1(_class2.__proto__ || Object.getPrototypeOf(_class2), 'props', this), this[ctorProps]);
	    },
	    set: function set(value) {
	      setCtorNativeProperty(this, ctorProps, value);
	    }
	  }]);
	
	  function _class2() {
	    classCallCheck(this, _class2);
	
	    var _this = possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this));
	
	    var constructor = _this.constructor;
	
	    // Used for the ready() function so it knows when it can call its callback.
	
	    _this[created$1] = true;
	
	    // TODO refactor to not cater to Safari < 10. This means we can depend on
	    // built-in property descriptors.
	    // Must be defined on constructor and not from a superclass
	    if (!constructor.hasOwnProperty(ctorCreateInitProps)) {
	      setCtorNativeProperty(constructor, ctorCreateInitProps, createInitProps(constructor));
	    }
	
	    // Set up a renderer that is debounced for property sets to call directly.
	    _this[rendererDebounced] = debounce(_this[renderer$1].bind(_this));
	
	    // Set up property lifecycle.
	    var propConfigsCount = keys(getPropsMap(constructor)).length;
	    if (propConfigsCount && constructor[ctorCreateInitProps]) {
	      constructor[ctorCreateInitProps](_this);
	    }
	
	    // DEPRECATED
	    //
	    // static render()
	    if (!_this.renderCallback && constructor.render) {
	      _this.renderCallback = constructor.render.bind(constructor, _this);
	    }
	
	    // DEPRECATED
	    //
	    // static created()
	    //
	    // Props should be set up before calling this.
	    if (typeof constructor.created === 'function') {
	      constructor.created(_this);
	    }
	
	    // DEPRECATED
	    //
	    // Feature has rarely been used.
	    //
	    // Created should be set before invoking the ready listeners.
	    var elemData = data(_this);
	    var readyCallbacks = elemData.readyCallbacks;
	    if (readyCallbacks) {
	      readyCallbacks.forEach(function (cb) {
	        return cb(_this);
	      });
	      delete elemData.readyCallbacks;
	    }
	    return _this;
	  }
	
	  // Custom Elements v1
	
	
	  createClass(_class2, [{
	    key: 'connectedCallback',
	    value: function connectedCallback() {
	      var constructor = this.constructor;
	
	      // DEPRECATED
	      //
	      // No more reflecting back to attributes in favour of one-way reflection.
	
	      syncPropsToAttrs(this);
	
	      // Used to check whether or not the component can render.
	      this[connected] = true;
	
	      // Render!
	      this[rendererDebounced]();
	
	      // DEPRECATED
	      //
	      // static attached()
	      if (typeof constructor.attached === 'function') {
	        constructor.attached(this);
	      }
	
	      // DEPRECATED
	      //
	      // We can remove this once all browsers support :defined.
	      this.setAttribute('defined', '');
	    }
	
	    // Custom Elements v1
	
	  }, {
	    key: 'disconnectedCallback',
	    value: function disconnectedCallback() {
	      var constructor = this.constructor;
	
	      // Ensures the component can't be rendered while disconnected.
	
	      this[connected] = false;
	
	      // DEPRECATED
	      //
	      // static detached()
	      if (typeof constructor.detached === 'function') {
	        constructor.detached(this);
	      }
	    }
	
	    // Custom Elements v1
	
	  }, {
	    key: 'attributeChangedCallback',
	    value: function attributeChangedCallback(name$$1, oldValue, newValue) {
	      // Polyfill calls this twice.
	      if (preventDoubleCalling(this, name$$1, oldValue, newValue)) {
	        return;
	      }
	
	      // Set data so we can prevent double calling if the polyfill.
	      this[_prevName] = name$$1;
	      this[_prevOldValue] = oldValue;
	      this[_prevNewValue] = newValue;
	
	      var attributeChanged = this.constructor.attributeChanged;
	
	      var propertyName = data(this, 'attributeLinks')[name$$1];
	
	      if (propertyName) {
	        var propData = data(this, 'props')[propertyName];
	
	        // This ensures a property set doesn't cause the attribute changed
	        // handler to run again once we set this flag. This only ever has a
	        // chance to run when you set an attribute, it then sets a property and
	        // then that causes the attribute to be set again.
	        if (propData.syncingAttribute) {
	          propData.syncingAttribute = false;
	        } else {
	          // Sync up the property.
	          var propOpts = getPropsMap(this.constructor)[propertyName];
	          propData.settingAttribute = true;
	          var newPropVal = newValue !== null && propOpts.deserialize ? propOpts.deserialize(newValue) : newValue;
	          this[propertyName] = newPropVal;
	        }
	      }
	
	      if (attributeChanged) {
	        attributeChanged(this, { name: name$$1, newValue: newValue, oldValue: oldValue });
	      }
	    }
	
	    // Skate
	    //
	    // Maps to the static updated() callback. That logic should be moved here
	    // when that is finally removed.
	
	  }, {
	    key: 'updatedCallback',
	    value: function updatedCallback(prev) {
	      return this.constructor.updated(this, prev);
	    }
	
	    // Skate
	    //
	    // Maps to the static rendered() callback. That logic should be moved here
	    // when that is finally removed.
	
	  }, {
	    key: 'renderedCallback',
	    value: function renderedCallback() {
	      return this.constructor.rendered(this);
	    }
	
	    // Skate
	    //
	    // Maps to the static renderer() callback. That logic should be moved here
	    // when that is finally removed.
	
	  }, {
	    key: 'rendererCallback',
	    value: function rendererCallback() {
	      return this.constructor.renderer(this);
	    }
	
	    // Skate
	    //
	    // Invokes the complete render lifecycle.
	
	  }, {
	    key: renderer$1,
	    value: function value() {
	      if (this[rendering] || !this[connected]) {
	        return;
	      }
	
	      // Flag as rendering. This prevents anything from trying to render - or
	      // queueing a render - while there is a pending render.
	      this[rendering] = true;
	
	      if (this[updated$1]() && typeof this.renderCallback === 'function') {
	        this.rendererCallback();
	        this.renderedCallback();
	      }
	
	      this[rendering] = false;
	    }
	
	    // Skate
	    //
	    // Calls the user-defined updated() lifecycle callback.
	
	  }, {
	    key: updated$1,
	    value: function value() {
	      var prev = this[props];
	      this[props] = props$1(this);
	      return this.updatedCallback(prev);
	    }
	
	    // Skate
	
	  }], [{
	    key: 'extend',
	    value: function extend() {
	      var definition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var Base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	      // Create class for the user.
	      var Ctor = function (_Base) {
	        inherits(Ctor, _Base);
	
	        function Ctor() {
	          classCallCheck(this, Ctor);
	          return possibleConstructorReturn(this, (Ctor.__proto__ || Object.getPrototypeOf(Ctor)).apply(this, arguments));
	        }
	
	        return Ctor;
	      }(Base);
	
	      // For inheriting from the object literal.
	
	
	      var opts = getOwnPropertyDescriptors(definition);
	      var prot = getOwnPropertyDescriptors(definition.prototype);
	
	      // Prototype is non configurable (but is writable).
	      delete opts.prototype;
	
	      // Pass on static and instance members from the definition.
	      Object.defineProperties(Ctor, opts);
	      Object.defineProperties(Ctor.prototype, prot);
	
	      return Ctor;
	    }
	
	    // Skate
	    //
	    // DEPRECATED
	    //
	    // Move this to rendererCallback() before removing.
	
	  }, {
	    key: 'updated',
	    value: function updated(elem, prev) {
	      if (!prev) {
	        return true;
	      }
	
	      // use get all keys so that we check Symbols as well as regular props
	      // using a for loop so we can break early
	      var allKeys = keys(prev);
	      for (var i = 0; i < allKeys.length; i += 1) {
	        if (prev[allKeys[i]] !== elem[allKeys[i]]) {
	          return true;
	        }
	      }
	
	      return false;
	    }
	
	    // Skate
	    //
	    // DEPRECATED
	    //
	    // Move this to rendererCallback() before removing.
	
	  }, {
	    key: 'rendered',
	    value: function rendered() {}
	
	    // Skate
	    //
	    // DEPRECATED
	    //
	    // Move this to rendererCallback() before removing.
	
	  }, {
	    key: 'renderer',
	    value: function renderer(elem) {
	      if (!elem.shadowRoot) {
	        elem.attachShadow({ mode: 'open' });
	      }
	      incrementalDom.patchInner(elem.shadowRoot, function () {
	        var possibleFn = elem.renderCallback();
	        if (typeof possibleFn === 'function') {
	          possibleFn();
	        } else if (Array.isArray(possibleFn)) {
	          possibleFn.forEach(function (fn) {
	            if (typeof fn === 'function') {
	              fn();
	            }
	          });
	        }
	      });
	    }
	  }]);
	  return _class2;
	}(HTMLElement$1);
	
	function uniqueId(prefix) {
	  // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523
	  var rand = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0;
	    // eslint-disable-next-line no-mixed-operators
	    var v = c === 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	  return (prefix || 'x') + '-' + rand;
	}
	
	var define = function () {
	  var customElements = root.customElements;
	
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var name$$1 = args[0];
	  var Ctor = args[1];
	
	
	  if (!customElements) {
	    throw new Error('Skate requires native custom element support or a polyfill.');
	  }
	
	  // Support passing an anonymous definition.
	  if (args.length === 1) {
	    // We are checking string for now, but once we remove the ability to pass
	    // an object literal, we can change this to check "function" and invert the
	    // blocks of logic.
	    if (typeof name$$1 === 'string') {
	      throw new Error('When passing only one argument to define(), it must be a custom element constructor.');
	    } else {
	      Ctor = name$$1;
	      name$$1 = uniqueId();
	    }
	  }
	
	  // Ensure there's no conflicts.
	  if (customElements.get(name$$1)) {
	    name$$1 = uniqueId(name$$1);
	  }
	
	  // DEPRECATED
	  //
	  // Object literals.
	  if ((typeof Ctor === 'undefined' ? 'undefined' : _typeof(Ctor)) === 'object') {
	    Ctor = _class2.extend(Ctor);
	  }
	
	  // This allows us to check this before instantiating the custom element to
	  // find its name from the constructor in the vdom module, thus improving
	  // performance but still falling back to a robust method.
	  Ctor[name] = name$$1;
	
	  // Sipmle define. Not supporting customised built-ins yet.
	  customElements.define(name$$1, Ctor);
	
	  // The spec doesn't return but this allows for a simpler, more concise API.
	  return Ctor;
	};
	
	var Event = function (TheEvent) {
	  if (TheEvent) {
	    try {
	      new TheEvent('emit-init'); // eslint-disable-line no-new
	    } catch (e) {
	      return undefined;
	    }
	  }
	  return TheEvent;
	}(root.Event);
	
	function createCustomEvent(name) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var detail = opts.detail;
	
	  delete opts.detail;
	
	  var e = void 0;
	  if (Event) {
	    e = new Event(name, opts);
	    Object.defineProperty(e, 'detail', { value: detail });
	  } else {
	    e = document.createEvent('CustomEvent');
	    Object.defineProperty(e, 'composed', { value: opts.composed });
	    e.initCustomEvent(name, opts.bubbles, opts.cancelable, detail);
	  }
	  return e;
	}
	
	var emit = function (elem, name) {
	  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	  if (opts.bubbles === undefined) {
	    opts.bubbles = true;
	  }
	  if (opts.cancelable === undefined) {
	    opts.cancelable = true;
	  }
	  if (opts.composed === undefined) {
	    opts.composed = true;
	  }
	  return elem.dispatchEvent(createCustomEvent(name, opts));
	};
	
	function getValue(elem) {
	  var type = elem.type;
	  if (type === 'checkbox' || type === 'radio') {
	    return elem.checked ? elem.value || true : false;
	  }
	  return elem.value;
	}
	
	var link = function (elem, target) {
	  return function (e) {
	    var value = getValue(e.target);
	    var localTarget = target || e.target.name || 'value';
	
	    if (localTarget.indexOf('.') > -1) {
	      var parts = localTarget.split('.');
	      var firstPart = parts[0];
	      var propName = parts.pop();
	      var obj = parts.reduce(function (prev, curr) {
	        return prev && prev[curr];
	      }, elem);
	
	      obj[propName || e.target.name] = value;
	      props$1(elem, defineProperty({}, firstPart, elem[firstPart]));
	    } else {
	      props$1(elem, defineProperty({}, localTarget, value));
	    }
	  };
	};
	
	var ready = function (elem, done) {
	  var info = data(elem);
	  if (elem[created$1]) {
	    done(elem);
	  } else if (info.readyCallbacks) {
	    info.readyCallbacks.push(done);
	  } else {
	    info.readyCallbacks = [done];
	  }
	};
	
	var h = builder();
	
	exports.Component = _class2;
	exports.define = define;
	exports.emit = emit;
	exports.h = h;
	exports.link = link;
	exports.prop = prop;
	exports.props = props$1;
	exports.ready = ready;
	exports.symbols = symbols$1;
	exports.vdom = vdom;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	//# sourceMappingURL=index.js.map


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @license
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	'use strict';
	
	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	/**
	 * A cached reference to the hasOwnProperty function.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * A cached reference to the create function.
	 */
	var create = Object.create;
	
	/**
	 * Used to prevent property collisions between our "map" and its prototype.
	 * @param {!Object<string, *>} map The map to check.
	 * @param {string} property The property to check.
	 * @return {boolean} Whether map has property.
	 */
	var has = function (map, property) {
	  return hasOwnProperty.call(map, property);
	};
	
	/**
	 * Creates an map object without a prototype.
	 * @return {!Object}
	 */
	var createMap = function () {
	  return create(null);
	};
	
	/**
	 * Keeps track of information needed to perform diffs for a given DOM node.
	 * @param {!string} nodeName
	 * @param {?string=} key
	 * @constructor
	 */
	function NodeData(nodeName, key) {
	  /**
	   * The attributes and their values.
	   * @const {!Object<string, *>}
	   */
	  this.attrs = createMap();
	
	  /**
	   * An array of attribute name/value pairs, used for quickly diffing the
	   * incomming attributes to see if the DOM node's attributes need to be
	   * updated.
	   * @const {Array<*>}
	   */
	  this.attrsArr = [];
	
	  /**
	   * The incoming attributes for this Node, before they are updated.
	   * @const {!Object<string, *>}
	   */
	  this.newAttrs = createMap();
	
	  /**
	   * The key used to identify this node, used to preserve DOM nodes when they
	   * move within their parent.
	   * @const
	   */
	  this.key = key;
	
	  /**
	   * Keeps track of children within this node by their key.
	   * {?Object<string, !Element>}
	   */
	  this.keyMap = null;
	
	  /**
	   * Whether or not the keyMap is currently valid.
	   * {boolean}
	   */
	  this.keyMapValid = true;
	
	  /**
	   * The node name for this node.
	   * @const {string}
	   */
	  this.nodeName = nodeName;
	
	  /**
	   * @type {?string}
	   */
	  this.text = null;
	}
	
	/**
	 * Initializes a NodeData object for a Node.
	 *
	 * @param {Node} node The node to initialize data for.
	 * @param {string} nodeName The node name of node.
	 * @param {?string=} key The key that identifies the node.
	 * @return {!NodeData} The newly initialized data object
	 */
	var initData = function (node, nodeName, key) {
	  var data = new NodeData(nodeName, key);
	  node['__incrementalDOMData'] = data;
	  return data;
	};
	
	/**
	 * Retrieves the NodeData object for a Node, creating it if necessary.
	 *
	 * @param {Node} node The node to retrieve the data for.
	 * @return {!NodeData} The NodeData for this Node.
	 */
	var getData = function (node) {
	  var data = node['__incrementalDOMData'];
	
	  if (!data) {
	    var nodeName = node.nodeName.toLowerCase();
	    var key = null;
	
	    if (node instanceof Element) {
	      key = node.getAttribute('key');
	    }
	
	    data = initData(node, nodeName, key);
	  }
	
	  return data;
	};
	
	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	/** @const */
	var symbols = {
	  default: '__default',
	
	  placeholder: '__placeholder'
	};
	
	/**
	 * @param {string} name
	 * @return {string|undefined} The namespace to use for the attribute.
	 */
	var getNamespace = function (name) {
	  if (name.lastIndexOf('xml:', 0) === 0) {
	    return 'http://www.w3.org/XML/1998/namespace';
	  }
	
	  if (name.lastIndexOf('xlink:', 0) === 0) {
	    return 'http://www.w3.org/1999/xlink';
	  }
	};
	
	/**
	 * Applies an attribute or property to a given Element. If the value is null
	 * or undefined, it is removed from the Element. Otherwise, the value is set
	 * as an attribute.
	 * @param {!Element} el
	 * @param {string} name The attribute's name.
	 * @param {?(boolean|number|string)=} value The attribute's value.
	 */
	var applyAttr = function (el, name, value) {
	  if (value == null) {
	    el.removeAttribute(name);
	  } else {
	    var attrNS = getNamespace(name);
	    if (attrNS) {
	      el.setAttributeNS(attrNS, name, value);
	    } else {
	      el.setAttribute(name, value);
	    }
	  }
	};
	
	/**
	 * Applies a property to a given Element.
	 * @param {!Element} el
	 * @param {string} name The property's name.
	 * @param {*} value The property's value.
	 */
	var applyProp = function (el, name, value) {
	  el[name] = value;
	};
	
	/**
	 * Applies a style to an Element. No vendor prefix expansion is done for
	 * property names/values.
	 * @param {!Element} el
	 * @param {string} name The attribute's name.
	 * @param {*} style The style to set. Either a string of css or an object
	 *     containing property-value pairs.
	 */
	var applyStyle = function (el, name, style) {
	  if (typeof style === 'string') {
	    el.style.cssText = style;
	  } else {
	    el.style.cssText = '';
	    var elStyle = el.style;
	    var obj = /** @type {!Object<string,string>} */style;
	
	    for (var prop in obj) {
	      if (has(obj, prop)) {
	        elStyle[prop] = obj[prop];
	      }
	    }
	  }
	};
	
	/**
	 * Updates a single attribute on an Element.
	 * @param {!Element} el
	 * @param {string} name The attribute's name.
	 * @param {*} value The attribute's value. If the value is an object or
	 *     function it is set on the Element, otherwise, it is set as an HTML
	 *     attribute.
	 */
	var applyAttributeTyped = function (el, name, value) {
	  var type = typeof value;
	
	  if (type === 'object' || type === 'function') {
	    applyProp(el, name, value);
	  } else {
	    applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
	  }
	};
	
	/**
	 * Calls the appropriate attribute mutator for this attribute.
	 * @param {!Element} el
	 * @param {string} name The attribute's name.
	 * @param {*} value The attribute's value.
	 */
	var updateAttribute = function (el, name, value) {
	  var data = getData(el);
	  var attrs = data.attrs;
	
	  if (attrs[name] === value) {
	    return;
	  }
	
	  var mutator = attributes[name] || attributes[symbols.default];
	  mutator(el, name, value);
	
	  attrs[name] = value;
	};
	
	/**
	 * A publicly mutable object to provide custom mutators for attributes.
	 * @const {!Object<string, function(!Element, string, *)>}
	 */
	var attributes = createMap();
	
	// Special generic mutator that's called for any attribute that does not
	// have a specific mutator.
	attributes[symbols.default] = applyAttributeTyped;
	
	attributes[symbols.placeholder] = function () {};
	
	attributes['style'] = applyStyle;
	
	/**
	 * Gets the namespace to create an element (of a given tag) in.
	 * @param {string} tag The tag to get the namespace for.
	 * @param {?Node} parent
	 * @return {?string} The namespace to create the tag in.
	 */
	var getNamespaceForTag = function (tag, parent) {
	  if (tag === 'svg') {
	    return 'http://www.w3.org/2000/svg';
	  }
	
	  if (getData(parent).nodeName === 'foreignObject') {
	    return null;
	  }
	
	  return parent.namespaceURI;
	};
	
	/**
	 * Creates an Element.
	 * @param {Document} doc The document with which to create the Element.
	 * @param {?Node} parent
	 * @param {string} tag The tag for the Element.
	 * @param {?string=} key A key to identify the Element.
	 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element.
	 * @return {!Element}
	 */
	var createElement = function (doc, parent, tag, key, statics) {
	  var namespace = getNamespaceForTag(tag, parent);
	  var el = undefined;
	
	  if (namespace) {
	    el = doc.createElementNS(namespace, tag);
	  } else {
	    el = doc.createElement(tag);
	  }
	
	  initData(el, tag, key);
	
	  if (statics) {
	    for (var i = 0; i < statics.length; i += 2) {
	      updateAttribute(el, /** @type {!string}*/statics[i], statics[i + 1]);
	    }
	  }
	
	  return el;
	};
	
	/**
	 * Creates a Text Node.
	 * @param {Document} doc The document with which to create the Element.
	 * @return {!Text}
	 */
	var createText = function (doc) {
	  var node = doc.createTextNode('');
	  initData(node, '#text', null);
	  return node;
	};
	
	/**
	 * Creates a mapping that can be used to look up children using a key.
	 * @param {?Node} el
	 * @return {!Object<string, !Element>} A mapping of keys to the children of the
	 *     Element.
	 */
	var createKeyMap = function (el) {
	  var map = createMap();
	  var child = el.firstElementChild;
	
	  while (child) {
	    var key = getData(child).key;
	
	    if (key) {
	      map[key] = child;
	    }
	
	    child = child.nextElementSibling;
	  }
	
	  return map;
	};
	
	/**
	 * Retrieves the mapping of key to child node for a given Element, creating it
	 * if necessary.
	 * @param {?Node} el
	 * @return {!Object<string, !Node>} A mapping of keys to child Elements
	 */
	var getKeyMap = function (el) {
	  var data = getData(el);
	
	  if (!data.keyMap) {
	    data.keyMap = createKeyMap(el);
	  }
	
	  return data.keyMap;
	};
	
	/**
	 * Retrieves a child from the parent with the given key.
	 * @param {?Node} parent
	 * @param {?string=} key
	 * @return {?Node} The child corresponding to the key.
	 */
	var getChild = function (parent, key) {
	  return key ? getKeyMap(parent)[key] : null;
	};
	
	/**
	 * Registers an element as being a child. The parent will keep track of the
	 * child using the key. The child can be retrieved using the same key using
	 * getKeyMap. The provided key should be unique within the parent Element.
	 * @param {?Node} parent The parent of child.
	 * @param {string} key A key to identify the child with.
	 * @param {!Node} child The child to register.
	 */
	var registerChild = function (parent, key, child) {
	  getKeyMap(parent)[key] = child;
	};
	
	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	/** @const */
	var notifications = {
	  /**
	   * Called after patch has compleated with any Nodes that have been created
	   * and added to the DOM.
	   * @type {?function(Array<!Node>)}
	   */
	  nodesCreated: null,
	
	  /**
	   * Called after patch has compleated with any Nodes that have been removed
	   * from the DOM.
	   * Note it's an applications responsibility to handle any childNodes.
	   * @type {?function(Array<!Node>)}
	   */
	  nodesDeleted: null
	};
	
	/**
	 * Keeps track of the state of a patch.
	 * @constructor
	 */
	function Context() {
	  /**
	   * @type {(Array<!Node>|undefined)}
	   */
	  this.created = notifications.nodesCreated && [];
	
	  /**
	   * @type {(Array<!Node>|undefined)}
	   */
	  this.deleted = notifications.nodesDeleted && [];
	}
	
	/**
	 * @param {!Node} node
	 */
	Context.prototype.markCreated = function (node) {
	  if (this.created) {
	    this.created.push(node);
	  }
	};
	
	/**
	 * @param {!Node} node
	 */
	Context.prototype.markDeleted = function (node) {
	  if (this.deleted) {
	    this.deleted.push(node);
	  }
	};
	
	/**
	 * Notifies about nodes that were created during the patch opearation.
	 */
	Context.prototype.notifyChanges = function () {
	  if (this.created && this.created.length > 0) {
	    notifications.nodesCreated(this.created);
	  }
	
	  if (this.deleted && this.deleted.length > 0) {
	    notifications.nodesDeleted(this.deleted);
	  }
	};
	
	/**
	* Makes sure that keyed Element matches the tag name provided.
	* @param {!string} nodeName The nodeName of the node that is being matched.
	* @param {string=} tag The tag name of the Element.
	* @param {?string=} key The key of the Element.
	*/
	var assertKeyedTagMatches = function (nodeName, tag, key) {
	  if (nodeName !== tag) {
	    throw new Error('Was expecting node with key "' + key + '" to be a ' + tag + ', not a ' + nodeName + '.');
	  }
	};
	
	/** @type {?Context} */
	var context = null;
	
	/** @type {?Node} */
	var currentNode = null;
	
	/** @type {?Node} */
	var currentParent = null;
	
	/** @type {?Element|?DocumentFragment} */
	var root = null;
	
	/** @type {?Document} */
	var doc = null;
	
	/**
	 * Returns a patcher function that sets up and restores a patch context,
	 * running the run function with the provided data.
	 * @param {function((!Element|!DocumentFragment),!function(T),T=)} run
	 * @return {function((!Element|!DocumentFragment),!function(T),T=)}
	 * @template T
	 */
	var patchFactory = function (run) {
	  /**
	   * TODO(moz): These annotations won't be necessary once we switch to Closure
	   * Compiler's new type inference. Remove these once the switch is done.
	   *
	   * @param {(!Element|!DocumentFragment)} node
	   * @param {!function(T)} fn
	   * @param {T=} data
	   * @template T
	   */
	  var f = function (node, fn, data) {
	    var prevContext = context;
	    var prevRoot = root;
	    var prevDoc = doc;
	    var prevCurrentNode = currentNode;
	    var prevCurrentParent = currentParent;
	    var previousInAttributes = false;
	    var previousInSkip = false;
	
	    context = new Context();
	    root = node;
	    doc = node.ownerDocument;
	    currentParent = node.parentNode;
	
	    if (false) {}
	
	    run(node, fn, data);
	
	    if (false) {}
	
	    context.notifyChanges();
	
	    context = prevContext;
	    root = prevRoot;
	    doc = prevDoc;
	    currentNode = prevCurrentNode;
	    currentParent = prevCurrentParent;
	  };
	  return f;
	};
	
	/**
	 * Patches the document starting at node with the provided function. This
	 * function may be called during an existing patch operation.
	 * @param {!Element|!DocumentFragment} node The Element or Document
	 *     to patch.
	 * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
	 *     calls that describe the DOM.
	 * @param {T=} data An argument passed to fn to represent DOM state.
	 * @template T
	 */
	var patchInner = patchFactory(function (node, fn, data) {
	  currentNode = node;
	
	  enterNode();
	  fn(data);
	  exitNode();
	
	  if (false) {}
	});
	
	/**
	 * Patches an Element with the the provided function. Exactly one top level
	 * element call should be made corresponding to `node`.
	 * @param {!Element} node The Element where the patch should start.
	 * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
	 *     calls that describe the DOM. This should have at most one top level
	 *     element call.
	 * @param {T=} data An argument passed to fn to represent DOM state.
	 * @template T
	 */
	var patchOuter = patchFactory(function (node, fn, data) {
	  currentNode = /** @type {!Element} */{ nextSibling: node };
	
	  fn(data);
	
	  if (false) {}
	});
	
	/**
	 * Checks whether or not the current node matches the specified nodeName and
	 * key.
	 *
	 * @param {?string} nodeName The nodeName for this node.
	 * @param {?string=} key An optional key that identifies a node.
	 * @return {boolean} True if the node matches, false otherwise.
	 */
	var matches = function (nodeName, key) {
	  var data = getData(currentNode);
	
	  // Key check is done using double equals as we want to treat a null key the
	  // same as undefined. This should be okay as the only values allowed are
	  // strings, null and undefined so the == semantics are not too weird.
	  return nodeName === data.nodeName && key == data.key;
	};
	
	/**
	 * Aligns the virtual Element definition with the actual DOM, moving the
	 * corresponding DOM node to the correct location or creating it if necessary.
	 * @param {string} nodeName For an Element, this should be a valid tag string.
	 *     For a Text, this should be #text.
	 * @param {?string=} key The key used to identify this element.
	 * @param {?Array<*>=} statics For an Element, this should be an array of
	 *     name-value pairs.
	 */
	var alignWithDOM = function (nodeName, key, statics) {
	  if (currentNode && matches(nodeName, key)) {
	    return;
	  }
	
	  var node = undefined;
	
	  // Check to see if the node has moved within the parent.
	  if (key) {
	    node = getChild(currentParent, key);
	    if (node && 'production' !== 'production') {
	      assertKeyedTagMatches(getData(node).nodeName, nodeName, key);
	    }
	  }
	
	  // Create the node if it doesn't exist.
	  if (!node) {
	    if (nodeName === '#text') {
	      node = createText(doc);
	    } else {
	      node = createElement(doc, currentParent, nodeName, key, statics);
	    }
	
	    if (key) {
	      registerChild(currentParent, key, node);
	    }
	
	    context.markCreated(node);
	  }
	
	  // If the node has a key, remove it from the DOM to prevent a large number
	  // of re-orders in the case that it moved far or was completely removed.
	  // Since we hold on to a reference through the keyMap, we can always add it
	  // back.
	  if (currentNode && getData(currentNode).key) {
	    currentParent.replaceChild(node, currentNode);
	    getData(currentParent).keyMapValid = false;
	  } else {
	    currentParent.insertBefore(node, currentNode);
	  }
	
	  currentNode = node;
	};
	
	/**
	 * Clears out any unvisited Nodes, as the corresponding virtual element
	 * functions were never called for them.
	 */
	var clearUnvisitedDOM = function () {
	  var node = currentParent;
	  var data = getData(node);
	  var keyMap = data.keyMap;
	  var keyMapValid = data.keyMapValid;
	  var child = node.lastChild;
	  var key = undefined;
	
	  if (child === currentNode && keyMapValid) {
	    return;
	  }
	
	  if (data.attrs[symbols.placeholder] && node !== root) {
	    if (false) {}
	    return;
	  }
	
	  while (child !== currentNode) {
	    node.removeChild(child);
	    context.markDeleted( /** @type {!Node}*/child);
	
	    key = getData(child).key;
	    if (key) {
	      delete keyMap[key];
	    }
	    child = node.lastChild;
	  }
	
	  // Clean the keyMap, removing any unusued keys.
	  if (!keyMapValid) {
	    for (key in keyMap) {
	      child = keyMap[key];
	      if (child.parentNode !== node) {
	        context.markDeleted(child);
	        delete keyMap[key];
	      }
	    }
	
	    data.keyMapValid = true;
	  }
	};
	
	/**
	 * Changes to the first child of the current node.
	 */
	var enterNode = function () {
	  currentParent = currentNode;
	  currentNode = null;
	};
	
	/**
	 * Changes to the next sibling of the current node.
	 */
	var nextNode = function () {
	  if (currentNode) {
	    currentNode = currentNode.nextSibling;
	  } else {
	    currentNode = currentParent.firstChild;
	  }
	};
	
	/**
	 * Changes to the parent of the current node, removing any unvisited children.
	 */
	var exitNode = function () {
	  clearUnvisitedDOM();
	
	  currentNode = currentParent;
	  currentParent = currentParent.parentNode;
	};
	
	/**
	 * Makes sure that the current node is an Element with a matching tagName and
	 * key.
	 *
	 * @param {string} tag The element's tag.
	 * @param {?string=} key The key used to identify this element. This can be an
	 *     empty string, but performance may be better if a unique value is used
	 *     when iterating over an array of items.
	 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 * @return {!Element} The corresponding Element.
	 */
	var coreElementOpen = function (tag, key, statics) {
	  nextNode();
	  alignWithDOM(tag, key, statics);
	  enterNode();
	  return (/** @type {!Element} */currentParent
	  );
	};
	
	/**
	 * Closes the currently open Element, removing any unvisited children if
	 * necessary.
	 *
	 * @return {!Element} The corresponding Element.
	 */
	var coreElementClose = function () {
	  if (false) {}
	
	  exitNode();
	  return (/** @type {!Element} */currentNode
	  );
	};
	
	/**
	 * Makes sure the current node is a Text node and creates a Text node if it is
	 * not.
	 *
	 * @return {!Text} The corresponding Text Node.
	 */
	var coreText = function () {
	  nextNode();
	  alignWithDOM('#text', null, null);
	  return (/** @type {!Text} */currentNode
	  );
	};
	
	/**
	 * Gets the current Element being patched.
	 * @return {!Element}
	 */
	var currentElement = function () {
	  if (false) {}
	  return (/** @type {!Element} */currentParent
	  );
	};
	
	/**
	 * Skips the children in a subtree, allowing an Element to be closed without
	 * clearing out the children.
	 */
	var skip = function () {
	  if (false) {}
	  currentNode = currentParent.lastChild;
	};
	
	/**
	 * The offset in the virtual element declaration where the attributes are
	 * specified.
	 * @const
	 */
	var ATTRIBUTES_OFFSET = 3;
	
	/**
	 * Builds an array of arguments for use with elementOpenStart, attr and
	 * elementOpenEnd.
	 * @const {Array<*>}
	 */
	var argsBuilder = [];
	
	/**
	 * @param {string} tag The element's tag.
	 * @param {?string=} key The key used to identify this element. This can be an
	 *     empty string, but performance may be better if a unique value is used
	 *     when iterating over an array of items.
	 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 * @param {...*} const_args Attribute name/value pairs of the dynamic attributes
	 *     for the Element.
	 * @return {!Element} The corresponding Element.
	 */
	var elementOpen = function (tag, key, statics, const_args) {
	  if (false) {}
	
	  var node = coreElementOpen(tag, key, statics);
	  var data = getData(node);
	
	  /*
	   * Checks to see if one or more attributes have changed for a given Element.
	   * When no attributes have changed, this is much faster than checking each
	   * individual argument. When attributes have changed, the overhead of this is
	   * minimal.
	   */
	  var attrsArr = data.attrsArr;
	  var newAttrs = data.newAttrs;
	  var attrsChanged = false;
	  var i = ATTRIBUTES_OFFSET;
	  var j = 0;
	
	  for (; i < arguments.length; i += 1, j += 1) {
	    if (attrsArr[j] !== arguments[i]) {
	      attrsChanged = true;
	      break;
	    }
	  }
	
	  for (; i < arguments.length; i += 1, j += 1) {
	    attrsArr[j] = arguments[i];
	  }
	
	  if (j < attrsArr.length) {
	    attrsChanged = true;
	    attrsArr.length = j;
	  }
	
	  /*
	   * Actually perform the attribute update.
	   */
	  if (attrsChanged) {
	    for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
	      newAttrs[arguments[i]] = arguments[i + 1];
	    }
	
	    for (var _attr in newAttrs) {
	      updateAttribute(node, _attr, newAttrs[_attr]);
	      newAttrs[_attr] = undefined;
	    }
	  }
	
	  return node;
	};
	
	/**
	 * Declares a virtual Element at the current location in the document. This
	 * corresponds to an opening tag and a elementClose tag is required. This is
	 * like elementOpen, but the attributes are defined using the attr function
	 * rather than being passed as arguments. Must be folllowed by 0 or more calls
	 * to attr, then a call to elementOpenEnd.
	 * @param {string} tag The element's tag.
	 * @param {?string=} key The key used to identify this element. This can be an
	 *     empty string, but performance may be better if a unique value is used
	 *     when iterating over an array of items.
	 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 */
	var elementOpenStart = function (tag, key, statics) {
	  if (false) {}
	
	  argsBuilder[0] = tag;
	  argsBuilder[1] = key;
	  argsBuilder[2] = statics;
	};
	
	/***
	 * Defines a virtual attribute at this point of the DOM. This is only valid
	 * when called between elementOpenStart and elementOpenEnd.
	 *
	 * @param {string} name
	 * @param {*} value
	 */
	var attr = function (name, value) {
	  if (false) {}
	
	  argsBuilder.push(name, value);
	};
	
	/**
	 * Closes an open tag started with elementOpenStart.
	 * @return {!Element} The corresponding Element.
	 */
	var elementOpenEnd = function () {
	  if (false) {}
	
	  var node = elementOpen.apply(null, argsBuilder);
	  argsBuilder.length = 0;
	  return node;
	};
	
	/**
	 * Closes an open virtual Element.
	 *
	 * @param {string} tag The element's tag.
	 * @return {!Element} The corresponding Element.
	 */
	var elementClose = function (tag) {
	  if (false) {}
	
	  var node = coreElementClose();
	
	  if (false) {}
	
	  return node;
	};
	
	/**
	 * Declares a virtual Element at the current location in the document that has
	 * no children.
	 * @param {string} tag The element's tag.
	 * @param {?string=} key The key used to identify this element. This can be an
	 *     empty string, but performance may be better if a unique value is used
	 *     when iterating over an array of items.
	 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 * @param {...*} const_args Attribute name/value pairs of the dynamic attributes
	 *     for the Element.
	 * @return {!Element} The corresponding Element.
	 */
	var elementVoid = function (tag, key, statics, const_args) {
	  elementOpen.apply(null, arguments);
	  return elementClose(tag);
	};
	
	/**
	 * Declares a virtual Element at the current location in the document that is a
	 * placeholder element. Children of this Element can be manually managed and
	 * will not be cleared by the library.
	 *
	 * A key must be specified to make sure that this node is correctly preserved
	 * across all conditionals.
	 *
	 * @param {string} tag The element's tag.
	 * @param {string} key The key used to identify this element.
	 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 * @param {...*} const_args Attribute name/value pairs of the dynamic attributes
	 *     for the Element.
	 * @return {!Element} The corresponding Element.
	 */
	var elementPlaceholder = function (tag, key, statics, const_args) {
	  if (false) {}
	
	  elementOpen.apply(null, arguments);
	  skip();
	  return elementClose(tag);
	};
	
	/**
	 * Declares a virtual Text at this point in the document.
	 *
	 * @param {string|number|boolean} value The value of the Text.
	 * @param {...(function((string|number|boolean)):string)} const_args
	 *     Functions to format the value which are called only when the value has
	 *     changed.
	 * @return {!Text} The corresponding text node.
	 */
	var text = function (value, const_args) {
	  if (false) {}
	
	  var node = coreText();
	  var data = getData(node);
	
	  if (data.text !== value) {
	    data.text = /** @type {string} */value;
	
	    var formatted = value;
	    for (var i = 1; i < arguments.length; i += 1) {
	      /*
	       * Call the formatter function directly to prevent leaking arguments.
	       * https://github.com/google/incremental-dom/pull/204#issuecomment-178223574
	       */
	      var fn = arguments[i];
	      formatted = fn(formatted);
	    }
	
	    node.data = formatted;
	  }
	
	  return node;
	};
	
	exports.patch = patchInner;
	exports.patchInner = patchInner;
	exports.patchOuter = patchOuter;
	exports.currentElement = currentElement;
	exports.skip = skip;
	exports.elementVoid = elementVoid;
	exports.elementOpenStart = elementOpenStart;
	exports.elementOpenEnd = elementOpenEnd;
	exports.elementOpen = elementOpen;
	exports.elementClose = elementClose;
	exports.elementPlaceholder = elementPlaceholder;
	exports.text = text;
	exports.attr = attr;
	exports.symbols = symbols;
	exports.attributes = attributes;
	exports.applyAttr = applyAttr;
	exports.applyProp = applyProp;
	exports.notifications = notifications;
	
	//# sourceMappingURL=incremental-dom-cjs.js.map

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict'
	module.exports = (typeof self === 'object' && self.self === self && self) ||
	  (typeof global === 'object' && global.global === global && global) ||
	  this
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(6);
	var ObjectUnsubscribedError_1 = __webpack_require__(21);
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.closed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasError) {
	            throw this.thrownError;
	        }
	        else if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        else {
	            return this._value;
	        }
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, this._value = value);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(7);
	var Subscriber_1 = __webpack_require__(10);
	var Subscription_1 = __webpack_require__(12);
	var ObjectUnsubscribedError_1 = __webpack_require__(21);
	var SubjectSubscription_1 = __webpack_require__(22);
	var rxSubscriber_1 = __webpack_require__(19);
	/**
	 * @class SubjectSubscriber<T>
	 */
	var SubjectSubscriber = (function (_super) {
	    __extends(SubjectSubscriber, _super);
	    function SubjectSubscriber(destination) {
	        _super.call(this, destination);
	        this.destination = destination;
	    }
	    return SubjectSubscriber;
	}(Subscriber_1.Subscriber));
	exports.SubjectSubscriber = SubjectSubscriber;
	/**
	 * @class Subject<T>
	 */
	var Subject = (function (_super) {
	    __extends(Subject, _super);
	    function Subject() {
	        _super.call(this);
	        this.observers = [];
	        this.closed = false;
	        this.isStopped = false;
	        this.hasError = false;
	        this.thrownError = null;
	    }
	    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return new SubjectSubscriber(this);
	    };
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.next = function (value) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        if (!this.isStopped) {
	            var observers = this.observers;
	            var len = observers.length;
	            var copy = observers.slice();
	            for (var i = 0; i < len; i++) {
	                copy[i].next(value);
	            }
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.hasError = true;
	        this.thrownError = err;
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].error(err);
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.complete = function () {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].complete();
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = true;
	        this.closed = true;
	        this.observers = null;
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        else if (this.hasError) {
	            subscriber.error(this.thrownError);
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else if (this.isStopped) {
	            subscriber.complete();
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else {
	            this.observers.push(subscriber);
	            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable));
	exports.Subject = Subject;
	/**
	 * @class AnonymousSubject<T>
	 */
	var AnonymousSubject = (function (_super) {
	    __extends(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        _super.call(this);
	        this.destination = destination;
	        this.source = source;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var destination = this.destination;
	        if (destination && destination.next) {
	            destination.next(value);
	        }
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var destination = this.destination;
	        if (destination && destination.error) {
	            this.destination.error(err);
	        }
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var destination = this.destination;
	        if (destination && destination.complete) {
	            this.destination.complete();
	        }
	    };
	    AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var source = this.source;
	        if (source) {
	            return this.source.subscribe(subscriber);
	        }
	        else {
	            return Subscription_1.Subscription.EMPTY;
	        }
	    };
	    return AnonymousSubject;
	}(Subject));
	exports.AnonymousSubject = AnonymousSubject;
	//# sourceMappingURL=Subject.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(8);
	var toSubscriber_1 = __webpack_require__(9);
	var observable_1 = __webpack_require__(20);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/**
	 * window: browser in DOM main thread
	 * self: browser in WebWorker
	 * global: Node.js/other
	 */
	exports.root = (typeof window == 'object' && window.window === window && window
	    || typeof self == 'object' && self.self === self && self
	    || typeof global == 'object' && global.global === global && global);
	if (!exports.root) {
	    throw new Error('RxJS could not find any global context (window, self, global)');
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(10);
	var rxSubscriber_1 = __webpack_require__(19);
	var Observer_1 = __webpack_require__(18);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber(Observer_1.empty);
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(11);
	var Subscription_1 = __webpack_require__(12);
	var Observer_1 = __webpack_require__(18);
	var rxSubscriber_1 = __webpack_require__(19);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(13);
	var isObject_1 = __webpack_require__(14);
	var isFunction_1 = __webpack_require__(11);
	var tryCatch_1 = __webpack_require__(15);
	var errorObject_1 = __webpack_require__(16);
	var UnsubscriptionError_1 = __webpack_require__(17);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.closed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.closed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(16);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(8);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(8);
	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.$$observable = getSymbolObservable(root_1.root);
	//# sourceMappingURL=observable.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an action is invalid because the object has been
	 * unsubscribed.
	 *
	 * @see {@link Subject}
	 * @see {@link BehaviorSubject}
	 *
	 * @class ObjectUnsubscribedError
	 */
	var ObjectUnsubscribedError = (function (_super) {
	    __extends(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        var err = _super.call(this, 'object unsubscribed');
	        this.name = err.name = 'ObjectUnsubscribedError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ObjectUnsubscribedError;
	}(Error));
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(12);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectSubscription = (function (_super) {
	    __extends(SubjectSubscription, _super);
	    function SubjectSubscription(subject, subscriber) {
	        _super.call(this);
	        this.subject = subject;
	        this.subscriber = subscriber;
	        this.closed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.subscriber);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1.Subscription));
	exports.SubjectSubscription = SubjectSubscription;
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AjaxObservable_1 = __webpack_require__(24);
	exports.ajax = AjaxObservable_1.AjaxObservable.create;
	//# sourceMappingURL=ajax.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(8);
	var tryCatch_1 = __webpack_require__(15);
	var errorObject_1 = __webpack_require__(16);
	var Observable_1 = __webpack_require__(7);
	var Subscriber_1 = __webpack_require__(10);
	var map_1 = __webpack_require__(25);
	function getCORSRequest() {
	    if (root_1.root.XMLHttpRequest) {
	        var xhr = new root_1.root.XMLHttpRequest();
	        if ('withCredentials' in xhr) {
	            xhr.withCredentials = !!this.withCredentials;
	        }
	        return xhr;
	    }
	    else if (!!root_1.root.XDomainRequest) {
	        return new root_1.root.XDomainRequest();
	    }
	    else {
	        throw new Error('CORS is not supported by your browser');
	    }
	}
	function getXMLHttpRequest() {
	    if (root_1.root.XMLHttpRequest) {
	        return new root_1.root.XMLHttpRequest();
	    }
	    else {
	        var progId = void 0;
	        try {
	            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
	            for (var i = 0; i < 3; i++) {
	                try {
	                    progId = progIds[i];
	                    if (new root_1.root.ActiveXObject(progId)) {
	                        break;
	                    }
	                }
	                catch (e) {
	                }
	            }
	            return new root_1.root.ActiveXObject(progId);
	        }
	        catch (e) {
	            throw new Error('XMLHttpRequest is not supported by your browser');
	        }
	    }
	}
	function ajaxGet(url, headers) {
	    if (headers === void 0) { headers = null; }
	    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
	}
	exports.ajaxGet = ajaxGet;
	;
	function ajaxPost(url, body, headers) {
	    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
	}
	exports.ajaxPost = ajaxPost;
	;
	function ajaxDelete(url, headers) {
	    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
	}
	exports.ajaxDelete = ajaxDelete;
	;
	function ajaxPut(url, body, headers) {
	    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
	}
	exports.ajaxPut = ajaxPut;
	;
	function ajaxGetJSON(url, headers) {
	    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers })
	        .lift(new map_1.MapOperator(function (x, index) { return x.response; }, null));
	}
	exports.ajaxGetJSON = ajaxGetJSON;
	;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var AjaxObservable = (function (_super) {
	    __extends(AjaxObservable, _super);
	    function AjaxObservable(urlOrRequest) {
	        _super.call(this);
	        var request = {
	            async: true,
	            createXHR: function () {
	                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
	            },
	            crossDomain: false,
	            withCredentials: false,
	            headers: {},
	            method: 'GET',
	            responseType: 'json',
	            timeout: 0
	        };
	        if (typeof urlOrRequest === 'string') {
	            request.url = urlOrRequest;
	        }
	        else {
	            for (var prop in urlOrRequest) {
	                if (urlOrRequest.hasOwnProperty(prop)) {
	                    request[prop] = urlOrRequest[prop];
	                }
	            }
	        }
	        this.request = request;
	    }
	    AjaxObservable.prototype._subscribe = function (subscriber) {
	        return new AjaxSubscriber(subscriber, this.request);
	    };
	    /**
	     * Creates an observable for an Ajax request with either a request object with
	     * url, headers, etc or a string for a URL.
	     *
	     * @example
	     * source = Rx.Observable.ajax('/products');
	     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
	     *
	     * @param {string|Object} request Can be one of the following:
	     *   A string of the URL to make the Ajax call.
	     *   An object with the following properties
	     *   - url: URL of the request
	     *   - body: The body of the request
	     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
	     *   - async: Whether the request is async
	     *   - headers: Optional headers
	     *   - crossDomain: true if a cross domain request, else false
	     *   - createXHR: a function to override if you need to use an alternate
	     *   XMLHttpRequest implementation.
	     *   - resultSelector: a function to use to alter the output value type of
	     *   the Observable. Gets {@link AjaxResponse} as an argument.
	     * @return {Observable} An observable sequence containing the XMLHttpRequest.
	     * @static true
	     * @name ajax
	     * @owner Observable
	    */
	    AjaxObservable.create = (function () {
	        var create = function (urlOrRequest) {
	            return new AjaxObservable(urlOrRequest);
	        };
	        create.get = ajaxGet;
	        create.post = ajaxPost;
	        create.delete = ajaxDelete;
	        create.put = ajaxPut;
	        create.getJSON = ajaxGetJSON;
	        return create;
	    })();
	    return AjaxObservable;
	}(Observable_1.Observable));
	exports.AjaxObservable = AjaxObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AjaxSubscriber = (function (_super) {
	    __extends(AjaxSubscriber, _super);
	    function AjaxSubscriber(destination, request) {
	        _super.call(this, destination);
	        this.request = request;
	        this.done = false;
	        var headers = request.headers = request.headers || {};
	        // force CORS if requested
	        if (!request.crossDomain && !headers['X-Requested-With']) {
	            headers['X-Requested-With'] = 'XMLHttpRequest';
	        }
	        // ensure content type is set
	        if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
	            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	        }
	        // properly serialize body
	        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
	        this.send();
	    }
	    AjaxSubscriber.prototype.next = function (e) {
	        this.done = true;
	        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
	        var response = new AjaxResponse(e, xhr, request);
	        destination.next(response);
	    };
	    AjaxSubscriber.prototype.send = function () {
	        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
	        var createXHR = request.createXHR;
	        var xhr = tryCatch_1.tryCatch(createXHR).call(request);
	        if (xhr === errorObject_1.errorObject) {
	            this.error(errorObject_1.errorObject.e);
	        }
	        else {
	            this.xhr = xhr;
	            // open XHR first
	            var result = void 0;
	            if (user) {
	                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
	            }
	            else {
	                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
	            }
	            if (result === errorObject_1.errorObject) {
	                this.error(errorObject_1.errorObject.e);
	                return null;
	            }
	            // timeout and responseType can be set once the XHR is open
	            xhr.timeout = request.timeout;
	            xhr.responseType = request.responseType;
	            // set headers
	            this.setHeaders(xhr, headers);
	            // now set up the events
	            this.setupEvents(xhr, request);
	            // finally send the request
	            if (body) {
	                xhr.send(body);
	            }
	            else {
	                xhr.send();
	            }
	        }
	        return xhr;
	    };
	    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
	        if (!body || typeof body === 'string') {
	            return body;
	        }
	        else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
	            return body;
	        }
	        if (contentType) {
	            var splitIndex = contentType.indexOf(';');
	            if (splitIndex !== -1) {
	                contentType = contentType.substring(0, splitIndex);
	            }
	        }
	        switch (contentType) {
	            case 'application/x-www-form-urlencoded':
	                return Object.keys(body).map(function (key) { return (encodeURI(key) + "=" + encodeURI(body[key])); }).join('&');
	            case 'application/json':
	                return JSON.stringify(body);
	            default:
	                return body;
	        }
	    };
	    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
	        for (var key in headers) {
	            if (headers.hasOwnProperty(key)) {
	                xhr.setRequestHeader(key, headers[key]);
	            }
	        }
	    };
	    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
	        var progressSubscriber = request.progressSubscriber;
	        function xhrTimeout(e) {
	            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
	            if (progressSubscriber) {
	                progressSubscriber.error(e);
	            }
	            subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
	        }
	        ;
	        xhr.ontimeout = xhrTimeout;
	        xhrTimeout.request = request;
	        xhrTimeout.subscriber = this;
	        xhrTimeout.progressSubscriber = progressSubscriber;
	        if (xhr.upload && 'withCredentials' in xhr && root_1.root.XDomainRequest) {
	            if (progressSubscriber) {
	                var xhrProgress_1;
	                xhrProgress_1 = function (e) {
	                    var progressSubscriber = xhrProgress_1.progressSubscriber;
	                    progressSubscriber.next(e);
	                };
	                xhr.onprogress = xhrProgress_1;
	                xhrProgress_1.progressSubscriber = progressSubscriber;
	            }
	            var xhrError_1;
	            xhrError_1 = function (e) {
	                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
	                if (progressSubscriber) {
	                    progressSubscriber.error(e);
	                }
	                subscriber.error(new AjaxError('ajax error', this, request));
	            };
	            xhr.onerror = xhrError_1;
	            xhrError_1.request = request;
	            xhrError_1.subscriber = this;
	            xhrError_1.progressSubscriber = progressSubscriber;
	        }
	        function xhrReadyStateChange(e) {
	            var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
	            if (this.readyState === 4) {
	                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
	                var status_1 = this.status === 1223 ? 204 : this.status;
	                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
	                // fix status code when it is 0 (0 status is undocumented).
	                // Occurs when accessing file resources or on Android 4.1 stock browser
	                // while retrieving files from application cache.
	                if (status_1 === 0) {
	                    status_1 = response ? 200 : 0;
	                }
	                if (200 <= status_1 && status_1 < 300) {
	                    if (progressSubscriber) {
	                        progressSubscriber.complete();
	                    }
	                    subscriber.next(e);
	                    subscriber.complete();
	                }
	                else {
	                    if (progressSubscriber) {
	                        progressSubscriber.error(e);
	                    }
	                    subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
	                }
	            }
	        }
	        ;
	        xhr.onreadystatechange = xhrReadyStateChange;
	        xhrReadyStateChange.subscriber = this;
	        xhrReadyStateChange.progressSubscriber = progressSubscriber;
	        xhrReadyStateChange.request = request;
	    };
	    AjaxSubscriber.prototype.unsubscribe = function () {
	        var _a = this, done = _a.done, xhr = _a.xhr;
	        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
	            xhr.abort();
	        }
	        _super.prototype.unsubscribe.call(this);
	    };
	    return AjaxSubscriber;
	}(Subscriber_1.Subscriber));
	exports.AjaxSubscriber = AjaxSubscriber;
	/**
	 * A normalized AJAX response.
	 *
	 * @see {@link ajax}
	 *
	 * @class AjaxResponse
	 */
	var AjaxResponse = (function () {
	    function AjaxResponse(originalEvent, xhr, request) {
	        this.originalEvent = originalEvent;
	        this.xhr = xhr;
	        this.request = request;
	        this.status = xhr.status;
	        this.responseType = xhr.responseType || request.responseType;
	        switch (this.responseType) {
	            case 'json':
	                if ('response' in xhr) {
	                    //IE does not support json as responseType, parse it internally
	                    this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
	                }
	                else {
	                    this.response = JSON.parse(xhr.responseText || 'null');
	                }
	                break;
	            case 'xml':
	                this.response = xhr.responseXML;
	                break;
	            case 'text':
	            default:
	                this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
	                break;
	        }
	    }
	    return AjaxResponse;
	}());
	exports.AjaxResponse = AjaxResponse;
	/**
	 * A normalized AJAX error.
	 *
	 * @see {@link ajax}
	 *
	 * @class AjaxError
	 */
	var AjaxError = (function (_super) {
	    __extends(AjaxError, _super);
	    function AjaxError(message, xhr, request) {
	        _super.call(this, message);
	        this.message = message;
	        this.xhr = xhr;
	        this.request = request;
	        this.status = xhr.status;
	    }
	    return AjaxError;
	}(Error));
	exports.AjaxError = AjaxError;
	/**
	 * @see {@link ajax}
	 *
	 * @class AjaxTimeoutError
	 */
	var AjaxTimeoutError = (function (_super) {
	    __extends(AjaxTimeoutError, _super);
	    function AjaxTimeoutError(xhr, request) {
	        _super.call(this, 'ajax timeout', xhr, request);
	    }
	    return AjaxTimeoutError;
	}(AjaxError));
	exports.AjaxTimeoutError = AjaxTimeoutError;
	//# sourceMappingURL=AjaxObservable.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(10);
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	exports.MapOperator = MapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=map.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(7);
	var empty_1 = __webpack_require__(27);
	Observable_1.Observable.empty = empty_1.empty;
	//# sourceMappingURL=empty.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var EmptyObservable_1 = __webpack_require__(28);
	exports.empty = EmptyObservable_1.EmptyObservable.create;
	//# sourceMappingURL=empty.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(7);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = (function (_super) {
	    __extends(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
	        subscriber.complete();
	    };
	    EmptyObservable.prototype._subscribe = function (subscriber) {
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        }
	        else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1.Observable));
	exports.EmptyObservable = EmptyObservable;
	//# sourceMappingURL=EmptyObservable.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(7);
	var filter_1 = __webpack_require__(30);
	Observable_1.Observable.prototype.filter = filter_1.filter;
	//# sourceMappingURL=filter.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(10);
	/* tslint:disable:max-line-length */
	/**
	 * Filter items emitted by the source Observable by only emitting those that
	 * satisfy a specified predicate.
	 *
	 * <span class="informal">Like
	 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
	 * it only emits a value from the source if it passes a criterion function.</span>
	 *
	 * <img src="./img/filter.png" width="100%">
	 *
	 * Similar to the well-known `Array.prototype.filter` method, this operator
	 * takes values from the source Observable, passes them through a `predicate`
	 * function and only emits those values that yielded `true`.
	 *
	 * @example <caption>Emit only click events whose target was a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
	 * clicksOnDivs.subscribe(x => console.log(x));
	 *
	 * @see {@link distinct}
	 * @see {@link distinctKey}
	 * @see {@link distinctUntilChanged}
	 * @see {@link distinctUntilKeyChanged}
	 * @see {@link ignoreElements}
	 * @see {@link partition}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates each value emitted by the source Observable. If it returns `true`,
	 * the value is emitted, if `false` the value is not passed to the output
	 * Observable. The `index` parameter is the number `i` for the i-th source
	 * emission that has happened since the subscription, starting from the number
	 * `0`.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable} An Observable of values from the source that were
	 * allowed by the `predicate` function.
	 * @method filter
	 * @owner Observable
	 */
	function filter(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	exports.filter = filter;
	var FilterOperator = (function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = (function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=filter.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(7);
	var map_1 = __webpack_require__(25);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(7);
	var catch_1 = __webpack_require__(33);
	Observable_1.Observable.prototype.catch = catch_1._catch;
	Observable_1.Observable.prototype._catch = catch_1._catch;
	//# sourceMappingURL=catch.js.map

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(34);
	var subscribeToResult_1 = __webpack_require__(35);
	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} an observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 * @method catch
	 * @name catch
	 * @owner Observable
	 */
	function _catch(selector) {
	    var operator = new CatchOperator(selector);
	    var caught = this.lift(operator);
	    return (operator.caught = caught);
	}
	exports._catch = _catch;
	var CatchOperator = (function () {
	    function CatchOperator(selector) {
	        this.selector = selector;
	    }
	    CatchOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
	    };
	    return CatchOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CatchSubscriber = (function (_super) {
	    __extends(CatchSubscriber, _super);
	    function CatchSubscriber(destination, selector, caught) {
	        _super.call(this, destination);
	        this.selector = selector;
	        this.caught = caught;
	    }
	    // NOTE: overriding `error` instead of `_error` because we don't want
	    // to have this flag this subscriber as `isStopped`.
	    CatchSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var result = void 0;
	            try {
	                result = this.selector(err, this.caught);
	            }
	            catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.unsubscribe();
	            this.destination.remove(this);
	            subscribeToResult_1.subscribeToResult(this, result);
	        }
	    };
	    return CatchSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=catch.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(10);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = (function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1.Subscriber));
	exports.OuterSubscriber = OuterSubscriber;
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(8);
	var isArray_1 = __webpack_require__(13);
	var isPromise_1 = __webpack_require__(36);
	var Observable_1 = __webpack_require__(7);
	var iterator_1 = __webpack_require__(37);
	var InnerSubscriber_1 = __webpack_require__(38);
	var observable_1 = __webpack_require__(20);
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.closed) {
	        return null;
	    }
	    if (result instanceof Observable_1.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return null;
	        }
	        else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.closed) {
	            destination.complete();
	        }
	    }
	    else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.closed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) { return destination.error(err); })
	            .then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1.root.setTimeout(function () { throw err; });
	        });
	        return destination;
	    }
	    else if (typeof result[iterator_1.$$iterator] === 'function') {
	        var iterator = result[iterator_1.$$iterator]();
	        do {
	            var item = iterator.next();
	            if (item.done) {
	                destination.complete();
	                break;
	            }
	            destination.next(item.value);
	            if (destination.closed) {
	                break;
	            }
	        } while (true);
	    }
	    else if (typeof result[observable_1.$$observable] === 'function') {
	        var obs = result[observable_1.$$observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error(new Error('invalid observable'));
	        }
	        else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    }
	    else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	    return null;
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(8);
	function symbolIteratorPonyfill(root) {
	    var Symbol = root.Symbol;
	    if (typeof Symbol === 'function') {
	        if (!Symbol.iterator) {
	            Symbol.iterator = Symbol('iterator polyfill');
	        }
	        return Symbol.iterator;
	    }
	    else {
	        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
	        var Set_1 = root.Set;
	        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
	            return '@@iterator';
	        }
	        var Map_1 = root.Map;
	        // required for compatability with es6-shim
	        if (Map_1) {
	            var keys = Object.getOwnPropertyNames(Map_1.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
	                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
	                    return key;
	                }
	            }
	        }
	        return '@@iterator';
	    }
	}
	exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
	exports.$$iterator = symbolIteratorPonyfill(root_1.root);
	//# sourceMappingURL=iterator.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(10);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerSubscriber = (function (_super) {
	    __extends(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1.Subscriber));
	exports.InnerSubscriber = InnerSubscriber;
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(7);
	var switchMap_1 = __webpack_require__(40);
	Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(34);
	var subscribeToResult_1 = __webpack_require__(35);
	/* tslint:disable:max-line-length */
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, emitting values only from the most recently projected Observable.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link switch}.</span>
	 *
	 * <img src="./img/switchMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each time it observes one of these
	 * inner Observables, the output Observable begins emitting the items emitted by
	 * that inner Observable. When a new inner Observable is emitted, `switchMap`
	 * stops emitting items from the earlier-emitted inner Observable and begins
	 * emitting items from the new one. It continues to behave like this for
	 * subsequent inner Observables.
	 *
	 * @example <caption>Rerun an interval Observable on every click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switch}
	 * @see {@link switchMapTo}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking only the values from the most recently
	 * projected inner Observable.
	 * @method switchMap
	 * @owner Observable
	 */
	function switchMap(project, resultSelector) {
	    return this.lift(new SwitchMapOperator(project, resultSelector));
	}
	exports.switchMap = switchMap;
	var SwitchMapOperator = (function () {
	    function SwitchMapOperator(project, resultSelector) {
	        this.project = project;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
	    };
	    return SwitchMapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchMapSubscriber = (function (_super) {
	    __extends(SwitchMapSubscriber, _super);
	    function SwitchMapSubscriber(destination, project, resultSelector) {
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapSubscriber.prototype._next = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        }
	        catch (error) {
	            this.destination.error(error);
	            return;
	        }
	        this._innerSub(result, value, index);
	    };
	    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	        }
	        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
	    };
	    SwitchMapSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.closed) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype._unsubscribe = function () {
	        this.innerSubscription = null;
	    };
	    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.innerSubscription = null;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            this.destination.next(innerValue);
	        }
	    };
	    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return SwitchMapSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(7);
	var distinct_1 = __webpack_require__(42);
	Observable_1.Observable.prototype.distinct = distinct_1.distinct;
	//# sourceMappingURL=distinct.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(34);
	var subscribeToResult_1 = __webpack_require__(35);
	var Set_1 = __webpack_require__(43);
	/**
	 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
	 * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
	 * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
	 * source observable directly with an equality check against previous values.
	 * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
	 * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
	 * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
	 * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
	 * that the internal `Set` can be "flushed", basically clearing it of values.
	 * @param {function} [keySelector] optional function to select which value you want to check as distinct.
	 * @param {Observable} [flushes] optional Observable for flushing the internal HashSet of the operator.
	 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
	 * @method distinct
	 * @owner Observable
	 */
	function distinct(keySelector, flushes) {
	    return this.lift(new DistinctOperator(keySelector, flushes));
	}
	exports.distinct = distinct;
	var DistinctOperator = (function () {
	    function DistinctOperator(keySelector, flushes) {
	        this.keySelector = keySelector;
	        this.flushes = flushes;
	    }
	    DistinctOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
	    };
	    return DistinctOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DistinctSubscriber = (function (_super) {
	    __extends(DistinctSubscriber, _super);
	    function DistinctSubscriber(destination, keySelector, flushes) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.values = new Set_1.Set();
	        if (flushes) {
	            this.add(subscribeToResult_1.subscribeToResult(this, flushes));
	        }
	    }
	    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.values.clear();
	    };
	    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
	        this._error(error);
	    };
	    DistinctSubscriber.prototype._next = function (value) {
	        if (this.keySelector) {
	            this._useKeySelector(value);
	        }
	        else {
	            this._finalizeNext(value, value);
	        }
	    };
	    DistinctSubscriber.prototype._useKeySelector = function (value) {
	        var key;
	        var destination = this.destination;
	        try {
	            key = this.keySelector(value);
	        }
	        catch (err) {
	            destination.error(err);
	            return;
	        }
	        this._finalizeNext(key, value);
	    };
	    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
	        var values = this.values;
	        if (!values.has(key)) {
	            values.add(key);
	            this.destination.next(value);
	        }
	    };
	    return DistinctSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	exports.DistinctSubscriber = DistinctSubscriber;
	//# sourceMappingURL=distinct.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(8);
	function minimalSetImpl() {
	    // THIS IS NOT a full impl of Set, this is just the minimum
	    // bits of functionality we need for this library.
	    return (function () {
	        function MinimalSet() {
	            this._values = [];
	        }
	        MinimalSet.prototype.add = function (value) {
	            if (!this.has(value)) {
	                this._values.push(value);
	            }
	        };
	        MinimalSet.prototype.has = function (value) {
	            return this._values.indexOf(value) !== -1;
	        };
	        Object.defineProperty(MinimalSet.prototype, "size", {
	            get: function () {
	                return this._values.length;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        MinimalSet.prototype.clear = function () {
	            this._values.length = 0;
	        };
	        return MinimalSet;
	    }());
	}
	exports.minimalSetImpl = minimalSetImpl;
	exports.Set = root_1.root.Set || minimalSetImpl();
	//# sourceMappingURL=Set.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index-with-deps.js.map