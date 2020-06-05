webpackHotUpdate("static/development/pages/redact/[id].js",{

/***/ "./components/RedactForm/index.js":
/*!****************************************!*\
  !*** ./components/RedactForm/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\nvar RedactForm = /*#__PURE__*/function (_Component) {\n  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(RedactForm, _Component);\n\n  var _super = _createSuper(RedactForm);\n\n  function RedactForm(props) {\n    var _this;\n\n    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, RedactForm);\n\n    _this = _super.call(this, props);\n\n    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_this), \"handleOnSubmit\", function (event) {\n      event.preventDefault();\n\n      _this.props.onSubmit(_this.state);\n    });\n\n    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_this), \"handleInputChange\", function (event) {\n      var value = event.target.value;\n      var name = event.target.name;\n      console.log('change ', value);\n\n      _this.setState(Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[\"default\"])({}, name, value));\n    });\n\n    _this.state = _objectSpread({}, props.data);\n    return _this;\n  }\n\n  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(RedactForm, [{\n    key: \"componentWillReceiveProps\",\n    value: function componentWillReceiveProps(nextProps) {\n      console.log('CWRP props', nextProps.data);\n      console.log('CWRP state', state);\n      return _objectSpread({}, nextProps.data);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var element = this.state;\n      console.log('element : ', element);\n      return __jsx(\"form\", {\n        onSubmit: this.handleOnSubmit\n      }, __jsx(\"h1\", null, \" ID : \", element && element.id), __jsx(\"input\", {\n        type: \"hidden\",\n        name: \"id\",\n        value: element && element.id\n      }), __jsx(\"input\", {\n        type: \"text\",\n        name: \"codeName\",\n        value: element && element.codeName,\n        onChange: this.handleInputChange\n      }), __jsx(\"input\", {\n        type: \"text\",\n        name: \"description\",\n        value: element && element.description,\n        onChange: this.handleInputChange\n      }), __jsx(\"input\", {\n        type: \"text\",\n        name: \"date\",\n        value: element && element.date,\n        onChange: this.handleInputChange\n      }), __jsx(\"button\", {\n        type: \"submit\"\n      }, \"Save\"));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(props, state) {\n      console.log('DSFP');\n      console.log('incoming props : ', props); // Re-run the filter whenever the list array or filter text change.\n      // Note we need to store prevPropsList and prevFilterText to detect changes.\n\n      if (props.list !== state.prevPropsList || state.prevFilterText !== state.filterText) {\n        return {\n          prevPropsList: props.list,\n          prevFilterText: state.filterText,\n          filteredList: props.list.filter(function (item) {\n            return item.text.includes(state.filterText);\n          })\n        };\n      }\n\n      return null;\n    }\n  }]);\n\n  return RedactForm;\n}(react__WEBPACK_IMPORTED_MODULE_7__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RedactForm);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1JlZGFjdEZvcm0vaW5kZXguanM/YTc2MyJdLCJuYW1lcyI6WyJSZWRhY3RGb3JtIiwicHJvcHMiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwib25TdWJtaXQiLCJzdGF0ZSIsInZhbHVlIiwidGFyZ2V0IiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdGF0ZSIsImRhdGEiLCJuZXh0UHJvcHMiLCJlbGVtZW50IiwiaGFuZGxlT25TdWJtaXQiLCJpZCIsImNvZGVOYW1lIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJkZXNjcmlwdGlvbiIsImRhdGUiLCJsaXN0IiwicHJldlByb3BzTGlzdCIsInByZXZGaWx0ZXJUZXh0IiwiZmlsdGVyVGV4dCIsImZpbHRlcmVkTGlzdCIsImZpbHRlciIsIml0ZW0iLCJ0ZXh0IiwiaW5jbHVkZXMiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFTUEsVTs7Ozs7QUFDRixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNmLDhCQUFNQSxLQUFOOztBQURlLHlOQWdERixVQUFDQyxLQUFELEVBQVc7QUFDeEJBLFdBQUssQ0FBQ0MsY0FBTjs7QUFDQSxZQUFLRixLQUFMLENBQVdHLFFBQVgsQ0FBb0IsTUFBS0MsS0FBekI7QUFDSCxLQW5Ea0I7O0FBQUEsNE5BcURDLFVBQUNILEtBQUQsRUFBVztBQUMzQixVQUFNSSxLQUFLLEdBQUdKLEtBQUssQ0FBQ0ssTUFBTixDQUFhRCxLQUEzQjtBQUNBLFVBQU1FLElBQUksR0FBR04sS0FBSyxDQUFDSyxNQUFOLENBQWFDLElBQTFCO0FBQ0FDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVosRUFBdUJKLEtBQXZCOztBQUNBLFlBQUtLLFFBQUwsK0ZBQ0tILElBREwsRUFDWUYsS0FEWjtBQUdILEtBNURrQjs7QUFFZixVQUFLRCxLQUFMLHFCQUNPSixLQUFLLENBQUNXLElBRGI7QUFGZTtBQUtsQjs7Ozs4Q0FFeUJDLFMsRUFBVztBQUNqQ0osYUFBTyxDQUFDQyxHQUFSLENBQVksWUFBWixFQUEwQkcsU0FBUyxDQUFDRCxJQUFwQztBQUNBSCxhQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCTCxLQUExQjtBQUVBLCtCQUFhUSxTQUFTLENBQUNELElBQXZCO0FBQ0g7Ozs2QkFvQlE7QUFDTCxVQUFNRSxPQUFPLEdBQUcsS0FBS1QsS0FBckI7QUFDQUksYUFBTyxDQUFDQyxHQUFSLENBQVksWUFBWixFQUEwQkksT0FBMUI7QUFDQSxhQUNJO0FBQU0sZ0JBQVEsRUFBRSxLQUFLQztBQUFyQixTQUNJLDRCQUFXRCxPQUFPLElBQUlBLE9BQU8sQ0FBQ0UsRUFBOUIsQ0FESixFQUVJO0FBQU8sWUFBSSxFQUFDLFFBQVo7QUFBcUIsWUFBSSxFQUFDLElBQTFCO0FBQStCLGFBQUssRUFBRUYsT0FBTyxJQUFJQSxPQUFPLENBQUNFO0FBQXpELFFBRkosRUFHSTtBQUFPLFlBQUksRUFBQyxNQUFaO0FBQW1CLFlBQUksRUFBQyxVQUF4QjtBQUFtQyxhQUFLLEVBQUVGLE9BQU8sSUFBSUEsT0FBTyxDQUFDRyxRQUE3RDtBQUF1RSxnQkFBUSxFQUFFLEtBQUtDO0FBQXRGLFFBSEosRUFJSTtBQUFPLFlBQUksRUFBQyxNQUFaO0FBQW1CLFlBQUksRUFBQyxhQUF4QjtBQUFzQyxhQUFLLEVBQUVKLE9BQU8sSUFBSUEsT0FBTyxDQUFDSyxXQUFoRTtBQUE2RSxnQkFBUSxFQUFFLEtBQUtEO0FBQTVGLFFBSkosRUFLSTtBQUFPLFlBQUksRUFBQyxNQUFaO0FBQW1CLFlBQUksRUFBQyxNQUF4QjtBQUErQixhQUFLLEVBQUVKLE9BQU8sSUFBSUEsT0FBTyxDQUFDTSxJQUF6RDtBQUErRCxnQkFBUSxFQUFFLEtBQUtGO0FBQTlFLFFBTEosRUFPSTtBQUFRLFlBQUksRUFBQztBQUFiLGdCQVBKLENBREo7QUFXSDs7OzZDQWhDK0JqQixLLEVBQU9JLEssRUFBTztBQUMxQ0ksYUFBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBRCxhQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFnQ1QsS0FBaEMsRUFGMEMsQ0FHMUM7QUFDQTs7QUFDQSxVQUNFQSxLQUFLLENBQUNvQixJQUFOLEtBQWVoQixLQUFLLENBQUNpQixhQUFyQixJQUNBakIsS0FBSyxDQUFDa0IsY0FBTixLQUF5QmxCLEtBQUssQ0FBQ21CLFVBRmpDLEVBR0U7QUFDQSxlQUFPO0FBQ0xGLHVCQUFhLEVBQUVyQixLQUFLLENBQUNvQixJQURoQjtBQUVMRSx3QkFBYyxFQUFFbEIsS0FBSyxDQUFDbUIsVUFGakI7QUFHTEMsc0JBQVksRUFBRXhCLEtBQUssQ0FBQ29CLElBQU4sQ0FBV0ssTUFBWCxDQUFrQixVQUFBQyxJQUFJO0FBQUEsbUJBQUlBLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxRQUFWLENBQW1CeEIsS0FBSyxDQUFDbUIsVUFBekIsQ0FBSjtBQUFBLFdBQXRCO0FBSFQsU0FBUDtBQUtEOztBQUNELGFBQU8sSUFBUDtBQUNEOzs7O0VBL0JrQk0sK0M7O0FBZ0VWOUIseUVBQWYiLCJmaWxlIjoiLi9jb21wb25lbnRzL1JlZGFjdEZvcm0vaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuY2xhc3MgUmVkYWN0Rm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgLi4ucHJvcHMuZGF0YVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NXUlAgcHJvcHMnLCBuZXh0UHJvcHMuZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDV1JQIHN0YXRlJywgc3RhdGUpO1xuXG4gICAgICAgIHJldHVybiB7IC4uLiBuZXh0UHJvcHMuZGF0YSB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEU0ZQJylcbiAgICAgICAgY29uc29sZS5sb2coJ2luY29taW5nIHByb3BzIDogJyxwcm9wcyk7XG4gICAgICAgIC8vIFJlLXJ1biB0aGUgZmlsdGVyIHdoZW5ldmVyIHRoZSBsaXN0IGFycmF5IG9yIGZpbHRlciB0ZXh0IGNoYW5nZS5cbiAgICAgICAgLy8gTm90ZSB3ZSBuZWVkIHRvIHN0b3JlIHByZXZQcm9wc0xpc3QgYW5kIHByZXZGaWx0ZXJUZXh0IHRvIGRldGVjdCBjaGFuZ2VzLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMubGlzdCAhPT0gc3RhdGUucHJldlByb3BzTGlzdCB8fFxuICAgICAgICAgIHN0YXRlLnByZXZGaWx0ZXJUZXh0ICE9PSBzdGF0ZS5maWx0ZXJUZXh0XG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmV2UHJvcHNMaXN0OiBwcm9wcy5saXN0LFxuICAgICAgICAgICAgcHJldkZpbHRlclRleHQ6IHN0YXRlLmZpbHRlclRleHQsXG4gICAgICAgICAgICBmaWx0ZXJlZExpc3Q6IHByb3BzLmxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS50ZXh0LmluY2x1ZGVzKHN0YXRlLmZpbHRlclRleHQpKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudCA6ICcsIGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlT25TdWJtaXR9PlxuICAgICAgICAgICAgICAgIDxoMT4gSUQgOiB7ZWxlbWVudCAmJiBlbGVtZW50LmlkfTwvaDE+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaWRcIiB2YWx1ZT17ZWxlbWVudCAmJiBlbGVtZW50LmlkfSAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjb2RlTmFtZVwiIHZhbHVlPXtlbGVtZW50ICYmIGVsZW1lbnQuY29kZU5hbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHZhbHVlPXtlbGVtZW50ICYmIGVsZW1lbnQuZGVzY3JpcHRpb259IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJkYXRlXCIgdmFsdWU9e2VsZW1lbnQgJiYgZWxlbWVudC5kYXRlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX0gLz5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGhhbmRsZU9uU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQodGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSAnLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW25hbWVdOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBSZWRhY3RGb3JtOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/RedactForm/index.js\n");

/***/ })

})