import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Object$entries from "@babel/runtime-corejs3/core-js-stable/object/entries";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import "regenerator-runtime/runtime";
import { getOptions } from 'loader-utils';
import { loadLessWithImports, resolveLessVariables } from '@hon2a/less-vars-to-js';
import fromPairs from 'lodash/fromPairs';
import camelCase from 'lodash/camelCase'; // @note Ignores source and reads it on its own, as `loadAndResolveLessVars` doesn't accept already read file.

export function lessVarsLoader() {
  var _getOptions,
      _this = this,
      _context;

  var _ref, lessOptions, transform, callback, _loadLessWithImports, code, imports, vars, processedVars;

  return _regeneratorRuntime.async(function lessVarsLoader$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ref = (_getOptions = getOptions(this)) !== null && _getOptions !== void 0 ? _getOptions : function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                key = _ref3[0],
                value = _ref3[1];

            return [camelCase(key), /^\d+px$/.test(value) ? _parseInt(value, 10) : value];
          }, lessOptions = _ref.lessOptions, transform = _ref.transform;
          callback = this.async();
          _loadLessWithImports = loadLessWithImports(this.resourcePath), code = _loadLessWithImports.code, imports = _loadLessWithImports.imports;

          _forEachInstanceProperty(imports).call(imports, function (path) {
            return _this.addDependency(path);
          });

          _context2.next = 6;
          return _regeneratorRuntime.awrap(resolveLessVariables(code, lessOptions));

        case 6:
          vars = _context2.sent;
          processedVars = transform ? fromPairs(_mapInstanceProperty(_context = _Object$entries(vars)).call(_context, transform)) : vars;
          callback(null, "export default ".concat(_JSON$stringify(processedVars)));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}