(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../src/handlers/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../src/handlers/index.js":
/*!***********************************************************!*\
  !*** E:/4th Semester/WE/we-backend/src/handlers/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/babel-loader/lib/index.js):\nSyntaxError: E:\\4th Semester\\WE\\we-backend\\src\\handlers\\index.js: Identifier 'hello' has already been declared (8:15)\n\n\u001b[0m \u001b[90m 6 | \u001b[39m}\u001b[0m\n\u001b[0m \u001b[90m 7 | \u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 8 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mconst\u001b[39m { hello }\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m   | \u001b[39m               \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 9 | \u001b[39m\u001b[0m\n    at Parser._raise (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\error.js:60:45)\n    at Parser.raiseWithData (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\error.js:55:17)\n    at Parser.raise (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\error.js:39:17)\n    at ScopeHandler.checkRedeclarationInScope (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\util\\scope.js:137:12)\n    at ScopeHandler.declareName (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\util\\scope.js:98:12)\n    at Parser.checkLVal (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\lval.js:392:22)\n    at Parser.checkLVal (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\lval.js:410:16)\n    at Parser.parseVarId (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:1027:10)\n    at Parser.parseVar (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:994:12)\n    at Parser.parseVarStatement (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:686:10)\n    at Parser.parseStatementContent (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:209:21)\n    at Parser.parseStatement (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:149:17)\n    at Parser.parseExportDeclaration (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:1829:17)\n    at Parser.maybeParseExportDeclaration (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:1775:31)\n    at Parser.parseExport (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:1693:29)\n    at Parser.parseStatementContent (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:246:25)\n    at Parser.parseStatement (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:149:17)\n    at Parser.parseBlockOrModuleBlockBody (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:861:25)\n    at Parser.parseBlockBody (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:833:10)\n    at Parser.parseTopLevel (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\statement.js:55:10)\n    at Parser.parse (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\parser\\index.js:57:10)\n    at parse (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\parser\\src\\index.js:58:38)\n    at parser (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\core\\lib\\parser\\index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:93:38)\n    at normalizeFile.next (<anonymous>)\n    at run (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\core\\lib\\transformation\\index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\core\\lib\\transform.js:27:41)\n    at transform.next (<anonymous>)\n    at step (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:254:32)\n    at gen.next (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:266:13)\n    at async.call.value (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:216:11)\n    at errback.call (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:184:28)\n    at runGenerator.errback (E:\\4th Semester\\WE\\we-backend\\node_modules\\@babel\\core\\lib\\gensync-utils\\async.js:72:7)\n    at val (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:108:33)\n    at step (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:280:14)\n    at gen.next (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:266:13)\n    at async.call.value (E:\\4th Semester\\WE\\we-backend\\node_modules\\gensync\\index.js:216:11)");

/***/ })

/******/ })));
//# sourceMappingURL=index.js.map