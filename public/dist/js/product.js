webpackJsonp([8],{63:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('Object.defineProperty(__webpack_exports__, "__esModule", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_pages_product_sass__ = __webpack_require__(64);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_pages_product_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sass_pages_product_sass__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_bling__ = __webpack_require__(1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_tabs__ = __webpack_require__(65);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_popup__ = __webpack_require__(2);\n\r\n\r\n\r\n\r\n\r\nObject(__WEBPACK_IMPORTED_MODULE_3__modules_popup__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1__modules_bling__["a" /* $ */])(\'.header__book\'), Object(__WEBPACK_IMPORTED_MODULE_1__modules_bling__["a" /* $ */])(\'.book-popup\'))\r\n\r\nObject(__WEBPACK_IMPORTED_MODULE_2__modules_tabs__["a" /* default */])(\'tabs\')\r\nObject(__WEBPACK_IMPORTED_MODULE_3__modules_popup__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1__modules_bling__["a" /* $ */])(\'.btn-show-reviews-popup\'), Object(__WEBPACK_IMPORTED_MODULE_1__modules_bling__["a" /* $ */])(\'.reviews-popup\'))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNjMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvYXNzZXRzL2pzL3Byb2R1Y3QuanM/OWM4NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3Nhc3MvcGFnZXMvcHJvZHVjdC5zYXNzJ1xyXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi9tb2R1bGVzL2JsaW5nJ1xyXG5pbXBvcnQgdGFicyBmcm9tICcuL21vZHVsZXMvdGFicydcclxuaW1wb3J0IHBvcHVwIGZyb20gJy4vbW9kdWxlcy9wb3B1cCdcclxuXHJcbnBvcHVwKCQoJy5oZWFkZXJfX2Jvb2snKSwgJCgnLmJvb2stcG9wdXAnKSlcclxuXHJcbnRhYnMoJ3RhYnMnKVxyXG5wb3B1cCgkKCcuYnRuLXNob3ctcmV2aWV3cy1wb3B1cCcpLCAkKCcucmV2aWV3cy1wb3B1cCcpKVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2Fzc2V0cy9qcy9wcm9kdWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///63\n')},64:function(module,exports){eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNjQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvYXNzZXRzL3Nhc3MvcGFnZXMvcHJvZHVjdC5zYXNzPzVkNDQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9hc3NldHMvc2Fzcy9wYWdlcy9wcm9kdWN0LnNhc3Ncbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gOCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///64\n")},65:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_bling__ = __webpack_require__(1);\n\r\n\r\nfunction tabs(tabsParentClass = 'tabs') {\r\n\r\n\tconst tabsHolder = Object(__WEBPACK_IMPORTED_MODULE_0__modules_bling__[\"a\" /* $ */])(`.${tabsParentClass}`)\r\n\tlet nav = tabsHolder.querySelectorAll(`.${tabsParentClass}-nav__item`)\r\n\tlet tabs = tabsHolder.querySelectorAll(`.${tabsParentClass}__item`)\r\n\r\n\tnav.on('click', function() {\r\n\t\tconst index = nav.indexOf(this)\r\n\t\ttabsHolder.querySelector(`.${tabsParentClass}-nav__item_active`).classList.remove(`${tabsParentClass}-nav__item_active`)\r\n\t\ttabsHolder.querySelector(`.${tabsParentClass}__item_active`).classList.remove(`${tabsParentClass}__item_active`)\r\n\t\tthis.classList.add(`${tabsParentClass}-nav__item_active`)\r\n\t\ttabs[index].classList.add(`${tabsParentClass}__item_active`)\r\n\t})\r\n\t\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"a\"] = (tabs);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNjUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvYXNzZXRzL2pzL21vZHVsZXMvdGFicy5qcz85MGNlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ICQgfSBmcm9tICcuLi9tb2R1bGVzL2JsaW5nJ1xyXG5cclxuZnVuY3Rpb24gdGFicyh0YWJzUGFyZW50Q2xhc3MgPSAndGFicycpIHtcclxuXHJcblx0Y29uc3QgdGFic0hvbGRlciA9ICQoYC4ke3RhYnNQYXJlbnRDbGFzc31gKVxyXG5cdGxldCBuYXYgPSB0YWJzSG9sZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RhYnNQYXJlbnRDbGFzc30tbmF2X19pdGVtYClcclxuXHRsZXQgdGFicyA9IHRhYnNIb2xkZXIucXVlcnlTZWxlY3RvckFsbChgLiR7dGFic1BhcmVudENsYXNzfV9faXRlbWApXHJcblxyXG5cdG5hdi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IGluZGV4ID0gbmF2LmluZGV4T2YodGhpcylcclxuXHRcdHRhYnNIb2xkZXIucXVlcnlTZWxlY3RvcihgLiR7dGFic1BhcmVudENsYXNzfS1uYXZfX2l0ZW1fYWN0aXZlYCkuY2xhc3NMaXN0LnJlbW92ZShgJHt0YWJzUGFyZW50Q2xhc3N9LW5hdl9faXRlbV9hY3RpdmVgKVxyXG5cdFx0dGFic0hvbGRlci5xdWVyeVNlbGVjdG9yKGAuJHt0YWJzUGFyZW50Q2xhc3N9X19pdGVtX2FjdGl2ZWApLmNsYXNzTGlzdC5yZW1vdmUoYCR7dGFic1BhcmVudENsYXNzfV9faXRlbV9hY3RpdmVgKVxyXG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKGAke3RhYnNQYXJlbnRDbGFzc30tbmF2X19pdGVtX2FjdGl2ZWApXHJcblx0XHR0YWJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKGAke3RhYnNQYXJlbnRDbGFzc31fX2l0ZW1fYWN0aXZlYClcclxuXHR9KVxyXG5cdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJzXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvYXNzZXRzL2pzL21vZHVsZXMvdGFicy5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSA4Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///65\n")}},[63]);