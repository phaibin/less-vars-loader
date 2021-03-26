"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.lessVarsLoader = lessVarsLoader;

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

require("regenerator-runtime/runtime");

var _loaderUtils = require("loader-utils");

var _lessVarsToJs = require("@hon2a/less-vars-to-js");

var _fromPairs = _interopRequireDefault(require("lodash/fromPairs"));

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

// @note Ignores source and reads it on its own, as `loadAndResolveLessVars` doesn't accept already read file.
function lessVarsLoader() {
  var _getOptions,
      _this = this,
      _context;

  var _ref, lessOptions, transform, callback, _loadLessWithImports, code, imports, vars, processedVars;

  return _regenerator["default"].async(function lessVarsLoader$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ref = (_getOptions = (0, _loaderUtils.getOptions)(this)) !== null && _getOptions !== void 0 ? _getOptions : {
            transform: function transform(_ref2) {
              var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return [(0, _camelCase["default"])(key), value];
            }
          }, lessOptions = _ref.lessOptions, transform = _ref.transform;
          callback = this.async();
          _loadLessWithImports = (0, _lessVarsToJs.loadLessWithImports)(this.resourcePath), code = _loadLessWithImports.code, imports = _loadLessWithImports.imports;
          (0, _forEach["default"])(imports).call(imports, function (path) {
            return _this.addDependency(path);
          });
          _context2.next = 6;
          return _regenerator["default"].awrap((0, _lessVarsToJs.resolveLessVariables)(code, lessOptions));

        case 6:
          vars = _context2.sent;
          processedVars = transform ? (0, _fromPairs["default"])((0, _map["default"])(_context = (0, _entries["default"])(vars)).call(_context, transform)) : vars;
          callback(null, "export default ".concat((0, _stringify["default"])(processedVars)));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}