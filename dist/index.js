(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('skatejs-web-components'), require('skatejs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'skatejs-web-components', 'skatejs'], factory) :
  (factory((global.componentSvgImport = global.componentSvgImport || {}),global.skatejsWebComponents,global.skatejs));
}(this, (function (exports,skatejsWebComponents,skatejs) {

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



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
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

customElements.define('svg-import', function (_Component) {
	inherits(_class, _Component);

	function _class() {
		classCallCheck(this, _class);
		return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	createClass(_class, [{
		key: 'updateXml',
		value: function updateXml() {
			if (!jQuery) {
				throw new TypeError('svg-import require jQuery to work!');
			}
			var comp = this;

			var $ = jQuery;

			$.get({ url: this.src, cache: true, async: true }).then(function (xml) {

				var $svg = $(xml).find('svg');
				var svg = $svg.get(0);
				svg.removeAttribute('xmlns:a');
				if (comp.width && comp.height) {
					// svg.hasAttribute('viewBox') ? svg.setAttribute('viewBox', '0 0 ' + comp.height + ' ' + comp.width) : '';
					svg.setAttribute('width', '100%');
					svg.setAttribute('height', '100%');
				}

				// comp.xmlData = $svg.clone().wrap('<div/>').parent().html();
				var wraper = $(comp.shadowRoot).find('.svg-import-wrap').get(0);

				wraper.innerHTML = '';
				wraper.appendChild(svg);
			});
		}
	}, {
		key: 'connectedCallback',
		value: function connectedCallback() {
			// Ensure we call the parent.
			get$1(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'connectedCallback', this).call(this);
			//this.updateXml();
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(name, oldValue, newValue) {
			get$1(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'attributeChangedCallback', this).call(this, name, oldValue, newValue);
			if (name == 'src') {
				this.updateXml();
			}
		}
	}, {
		key: 'disconnectedCallback',
		value: function disconnectedCallback() {
			// Ensure we callback the parent.
			get$1(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'disconnectedCallback', this).call(this);

			// If we didn't clean up after ourselves, we'd continue to render
		}
	}, {
		key: 'renderCallback',
		value: function renderCallback() {
			// By separating the strings (and not using template literals or string
			// concatenation) it ensures the strings are diffed indepenedently. If
			// you select "Count" with your mouse, it will not deselect whenr endered.
			var comp = this;

			var defBoxStyle = '\n\t\t\t:host{display:inline-block;}\n\t\t\t.svg-import-wrap{\n\t\t\t\toverflow:hidden;\n\t\t\t\tmargin:0;\n\t\t\t\tpadding:0;\n\t\t\t\twidth:100%;\n\t\t\t\theight:100%;\n\t\t\t\tmin-width:5px;\n\t\t\t\tmin-height:5px;\n\t\t\t\tdisplay:block;\n\t\t\t}\n\t\t\tsvg{\n\t\t\t\twidth:100%;\n\t\t\t\theight:100%;\n\t\t\t}\n\t\t';

			return [skatejs.h('style', defBoxStyle + comp['inner-style']), skatejs.h('figure', { role: 'image', className: 'svg-import-wrap' })];
		}
	}], [{
		key: 'props',
		get: function get() {
			return {
				// By declaring the property an attribute, we can now pass an initial value
				// for the count as part of the HTML.
				src: skatejs.prop.string({ attribute: true }),
				'inner-style': skatejs.prop.string({ attribute: true })
			};
		}
	}]);
	return _class;
}(skatejs.Component));

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
