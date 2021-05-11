/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Modules/config.js":
/*!*******************************!*\
  !*** ./src/Modules/config.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n  API_KEY: 'afd89dd73b573903df763aa27e7298aa',\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n\n//# sourceURL=webpack://weather-app/./src/Modules/config.js?");

/***/ }),

/***/ "./src/Modules/currentweather.js":
/*!***************************************!*\
  !*** ./src/Modules/currentweather.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst fetchCurrentWeatherData = async function fetchCurrentWeatherData(city, APIKey, units) {\n  try {\n    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${units}`, { mode: 'cors' });\n    const data = await response.json();\n    const currentWeatherData = {\n      coord: data.coord, // returns { lat, long }\n      main: data.main, // returns { feels_like, humidity, pressure, temp, temp_max, temp_min }\n      name: data.name, // returns 'name'\n      sys: data.sys, // returns { country, id, sunrise, sunset, type }\n      weather: data.weather[0], // returns { description, icon, id, main }\n      wind: data.wind, // returns { deg, speed }\n    };\n    return currentWeatherData;\n  } catch (error) {\n    return false;\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchCurrentWeatherData);\n\n\n//# sourceURL=webpack://weather-app/./src/Modules/currentweather.js?");

/***/ }),

/***/ "./src/Modules/dom.js":
/*!****************************!*\
  !*** ./src/Modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/Modules/config.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ \"./src/Modules/helper.js\");\n/* harmony import */ var _currentweather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentweather */ \"./src/Modules/currentweather.js\");\n\n\n\n\nconst searchBar = document.querySelector('.search-input');\nconst unitsToggleBtn = document.querySelector('.unit-toggle');\nconst cityNameDiv = document.querySelector('.city-title');\nconst weatherDegDiv = document.querySelector('.weather-degrees');\nconst weatherDescDiv = document.querySelector('.weather-description');\n\nlet units = 'imperial';\nlet weatherData = {};\n\nconst setCityName = function setCityNameUsingWeatherData(city) {\n  cityNameDiv.textContent = city;\n};\n\nconst setWeatherDescription = function setWeatherDescriptionUsingWeatherData(description) {\n  weatherDescDiv.textContent = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.capitalizeDescription)(description);\n};\n\nconst setWeatherDegrees = function setWeatherDegreesUsingWeatherData(degrees) {\n  weatherDegDiv.textContent = `${Math.floor(degrees)}\\u00B0`;\n};\n\nconst displayWeather = function displayWeatherAfterUserSearches() {\n  searchBar.addEventListener('keydown', async (e) => {\n    if (e.key === 'Enter') {\n      weatherData = await (0,_currentweather__WEBPACK_IMPORTED_MODULE_2__.default)(searchBar.value, _config__WEBPACK_IMPORTED_MODULE_0__.default.API_KEY, units);\n      setCityName(weatherData.name);\n      setWeatherDegrees(weatherData.main.temp);\n      setWeatherDescription(weatherData.weather.description);\n    }\n  });\n};\n\nconst toggleUnits = function toggleImperialOrMetric() {\n  units = unitsToggleBtn.checked ? 'imperial' : 'metric';\n  weatherData.main.temp = (units === 'imperial') ? (0,_helper__WEBPACK_IMPORTED_MODULE_1__.convertToFahrenheit)(weatherData.main.temp) : (0,_helper__WEBPACK_IMPORTED_MODULE_1__.convertToCelsius)(weatherData.main.temp);\n};\n\nunitsToggleBtn.addEventListener('click', () => {\n  toggleUnits();\n  setWeatherDegrees(weatherData.main.temp);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayWeather);\n\n\n//# sourceURL=webpack://weather-app/./src/Modules/dom.js?");

/***/ }),

/***/ "./src/Modules/helper.js":
/*!*******************************!*\
  !*** ./src/Modules/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"capitalizeDescription\": () => (/* binding */ capitalizeDescription),\n/* harmony export */   \"convertToCelsius\": () => (/* binding */ convertToCelsius),\n/* harmony export */   \"convertToFahrenheit\": () => (/* binding */ convertToFahrenheit)\n/* harmony export */ });\nconst capitalizeDescription = function capitalizeFirstCharOfWeatherDescription(lowerDescription) {\n  let descrArr = lowerDescription.split(' ');\n  descrArr = descrArr.map((word) => word[0].toUpperCase() + word.slice(1));\n  const upperDescription = descrArr.join(' ');\n  return upperDescription;\n};\n\nconst convertToCelsius = function convertToCelsiusFromFahrenheit(fahrenheit) {\n  const celsius = (fahrenheit - 32) * (5 / 9);\n  return celsius;\n};\n\nconst convertToFahrenheit = function convertToFahrenheitFromCelsius(Celsius) {\n  const fahrenheit = (Celsius * (9 / 5)) + 32;\n  return fahrenheit;\n};\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/Modules/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/dom */ \"./src/Modules/dom.js\");\n\n\n(0,_Modules_dom__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

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
/******/ })()
;