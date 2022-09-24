/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Utils"] = factory();
	else
		root["Utils"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/array/chunk.js":
/*!****************************!*\
  !*** ./src/array/chunk.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"chunk\": () => (/* binding */ chunk)\n/* harmony export */ });\nfunction chunk(arr, size) {\r\n  // 声明两个变量\r\n  let result = [];\r\n  let tmp = [];\r\n  // 遍历\r\n  // 逆向思维 先将空数组压入到result里面，如果数组满了则新加一个数组\r\n  if (arr.length === 0) {\r\n    return [];\r\n  }\r\n  arr.forEach(item => {\r\n    // 判断tmp元素长度是否为0\r\n    if(tmp.length === 0) {\r\n      // 当数组为空将tmp压入到result中\r\n      // 1.默认初始状态[[]]\r\n      result.push(tmp);\r\n    }\r\n    // 将元素压入到临时数组tmp中\r\n    tmp.push(item);\r\n    // 判断\r\n    // 2.当tmp满足了size，则新开一个数组\r\n    if(tmp.length === size) {\r\n      tmp = [];\r\n    }\r\n  });\r\n  return result;\r\n}\n\n//# sourceURL=webpack://Utils/./src/array/chunk.js?");

/***/ }),

/***/ "./src/array/concat.js":
/*!*****************************!*\
  !*** ./src/array/concat.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"concat\": () => (/* binding */ concat)\n/* harmony export */ });\nfunction concat(arr, ...args) {\r\n  // 声明一个空数组\r\n  const result = [...arr];\r\n  // 遍历数组\r\n  args.forEach(item => {\r\n    // 判断item是否为数组\r\n    if(Array.isArray(item)) {\r\n      // 使用扩展运算符将其展开\r\n      result.push(...item);\r\n    } else {\r\n      result.push(item);\r\n    }\r\n  });\r\n  // 返回result\r\n  return result;\r\n}\n\n//# sourceURL=webpack://Utils/./src/array/concat.js?");

/***/ }),

/***/ "./src/array/difference.js":
/*!*********************************!*\
  !*** ./src/array/difference.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"difference\": () => (/* binding */ difference)\n/* harmony export */ });\nfunction difference(arr1, arr2=[]) {\r\n  if (arr1.length === 0) {\r\n    return [];\r\n  }\r\n  if (arr2.length === 0) {\r\n    // 返回一个新数组\r\n    return arr1.slice();\r\n  }\r\n  const result = arr1.filter(item => !arr2.includes(item));\r\n  return result;\r\n}\n\n//# sourceURL=webpack://Utils/./src/array/difference.js?");

/***/ }),

/***/ "./src/array/drop.js":
/*!***************************!*\
  !*** ./src/array/drop.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drop\": () => (/* binding */ drop)\n/* harmony export */ });\nfunction drop(arr, size) {\r\n  // 过滤原数组产生新数组\r\n  return arr.filter((value,index) => index >=size);\r\n}\n\n//# sourceURL=webpack://Utils/./src/array/drop.js?");

/***/ }),

/***/ "./src/array/dropRight.js":
/*!********************************!*\
  !*** ./src/array/dropRight.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dropRight\": () => (/* binding */ dropRight)\n/* harmony export */ });\nfunction dropRight(arr, size) {\r\n  // 过滤原数组产生新数组\r\n  return arr.filter((value,index) => {\r\n    return index < arr.length - size;\r\n  });\r\n}\n\n//# sourceURL=webpack://Utils/./src/array/dropRight.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"chunk\": () => (/* reexport safe */ _array_chunk__WEBPACK_IMPORTED_MODULE_0__.chunk),\n/* harmony export */   \"concat\": () => (/* reexport safe */ _array_concat__WEBPACK_IMPORTED_MODULE_1__.concat),\n/* harmony export */   \"difference\": () => (/* reexport safe */ _array_difference__WEBPACK_IMPORTED_MODULE_3__.difference),\n/* harmony export */   \"drop\": () => (/* reexport safe */ _array_drop__WEBPACK_IMPORTED_MODULE_2__.drop),\n/* harmony export */   \"dropRight\": () => (/* reexport safe */ _array_dropRight__WEBPACK_IMPORTED_MODULE_4__.dropRight),\n/* harmony export */   \"test\": () => (/* binding */ test)\n/* harmony export */ });\n/* harmony import */ var _array_chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array/chunk */ \"./src/array/chunk.js\");\n/* harmony import */ var _array_concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array/concat */ \"./src/array/concat.js\");\n/* harmony import */ var _array_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array/drop */ \"./src/array/drop.js\");\n/* harmony import */ var _array_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array/difference */ \"./src/array/difference.js\");\n/* harmony import */ var _array_dropRight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./array/dropRight */ \"./src/array/dropRight.js\");\nfunction test() {\r\n  document.write('测试自定义包');\r\n  console.log('test()');\r\n}\r\n// 引入其他文件，然后在暴露\r\n// 1.目标文件中暴露数据export数据\r\n// 2.导入\r\n// import {chunk} from './array/chunk';\r\n// // 3.暴露数据\r\n// export {chunk};\r\n\r\n\r\n\r\n\r\n\r\n// 只导入部分\n\n//# sourceURL=webpack://Utils/./src/index.js?");

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
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});