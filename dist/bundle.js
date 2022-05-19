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

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ts-pokedex/./src/styles.scss?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isNonNullable = void 0;\n// スタイルシート（Sass）を読み込む\n__webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n// Pokedexクラスをインポートする\nconst pokemon_1 = __importDefault(__webpack_require__(/*! ./pokemon */ \"./src/pokemon.ts\"));\n// 組み込みユーティリティとジェネリクスを使ってnull判定を行う\nconst isNonNullable = (value) => {\n    return !(value === null || value === void 0);\n};\nexports.isNonNullable = isNonNullable;\n// HTML要素を取得する\nconst container = document.getElementById('app');\nconst pokemons = 9;\nif ((0, exports.isNonNullable)(container)) {\n    const pokedex = new pokemon_1.default(pokemons, container);\n    void pokedex.fetchData();\n}\nelse {\n    console.error('There is some error in getting the HTMLElement.');\n}\n\n\n//# sourceURL=webpack://ts-pokedex/./src/index.ts?");

/***/ }),

/***/ "./src/pokemon.ts":
/*!************************!*\
  !*** ./src/pokemon.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/index.ts\");\n// PokeAPIのベースURL\nconst baseUrl = 'https://pokeapi.co/api/v2/pokemon/';\nclass Pokedex {\n    // constructorで初期化する\n    constructor(pokemons, container) {\n        // 指定した回数ポケモン情報取得のメソッドを実行する\n        // 先行して先のIDの処理が走ってしまわないように非同期処理にする\n        this.fetchData = async () => {\n            for (let i = 1; i <= this.pokemons; i++) {\n                await this.getPokemon(i);\n            }\n        };\n        // 表示させるためのポケモン情報を取得する\n        // Promise型を定義したので、async/awaitを使ってAPI処理を記述\n        this.getPokemon = async (id) => {\n            const response = await fetch(`${baseUrl}${id}`)\n                .then((res) => res)\n                .catch((error) => {\n                console.error(error);\n                return null;\n            });\n            if (!response) {\n                return null;\n            }\n            // レスポンスをJSONオブジェクトとしてパースする\n            const json = await response\n                .json()\n                .then((json) => {\n                return json;\n            })\n                .catch((error) => {\n                console.error(error);\n                return null;\n            });\n            if (!json) {\n                return null;\n            }\n            // JSONオブジェクトを整形する\n            const responsePokemon = {\n                id: json.id,\n                name: json.name,\n                image: json.sprites.other['official-artwork'].front_default,\n                species: json.species.url,\n                types: json.types,\n            };\n            // ポケモンの日本語名を取得する\n            const japaneseName = await this.getJapaneseName(responsePokemon.species, true);\n            let name = String();\n            if ((0, index_1.isNonNullable)(japaneseName)) {\n                name = japaneseName;\n            }\n            // ポケモンの分類を取得する\n            const japaneseGenus = await this.getJapaneseName(responsePokemon.species, false);\n            let genus = String();\n            if ((0, index_1.isNonNullable)(japaneseGenus)) {\n                genus = japaneseGenus;\n            }\n            // タイプの英語名を格納する配列\n            const typeNameList = [];\n            // タイプのURLを格納する配列\n            const typeUrlList = [];\n            // レスポンスからタイプの情報を抜き出す\n            responsePokemon.types.forEach((types) => {\n                Object.keys(types).forEach((category) => {\n                    if (category === 'type') {\n                        typeNameList.push(types[category]['name']);\n                        typeUrlList.push(types[category]['url']);\n                    }\n                });\n            });\n            // タイプの日本語名を取得する\n            const typeList = [];\n            for (const url of typeUrlList) {\n                const typeName = await this.getJapaneseName(url, true);\n                typeList.push(typeName);\n            }\n            // タイプの配列の値を表示用にnull判定する\n            const types = [];\n            typeList.forEach((type) => {\n                if ((0, index_1.isNonNullable)(type)) {\n                    types.push(type);\n                }\n            });\n            // 表示用のデータを整形する\n            const formattedPokemon = {\n                id: responsePokemon.id,\n                name: name,\n                image: responsePokemon.image,\n                genus: genus,\n                typeList: types,\n                first_type: typeNameList[0],\n            };\n            console.log(formattedPokemon);\n            this.createPokemonCard(formattedPokemon);\n        };\n        // 日本語情報を取得する\n        this.getJapaneseName = async (url, isName) => {\n            // 引数で渡されたURLをfetchして日本語名を取得する\n            const response = await fetch(url)\n                .then((res) => res)\n                .catch((error) => {\n                console.log(error);\n                return null;\n            });\n            if (!response) {\n                return null;\n            }\n            const json = await response\n                .json()\n                .then((json) => {\n                return json;\n            })\n                .catch((error) => {\n                console.log(error);\n                return null;\n            });\n            if (!json) {\n                return null;\n            }\n            if (isName) {\n                return json.names[0].name;\n            }\n            else {\n                return json.genera[0].genus;\n            }\n        };\n        // ポケモンを表示させるカードパーツを作成する\n        this.createPokemonCard = (pokemon) => {\n            let typesElement = String();\n            pokemon.typeList.forEach((type) => {\n                typesElement += `<span>${type}</span>`;\n            });\n            const card = `\n      <div class=\"card card-side w-full mx-auto bg-neutral text-white shadow-xl bg-${pokemon.first_type}\">\n        <div class=\"card-body p-5\">\n          <span>#${pokemon.id}</span>\n          <h2 class=\"card-title\">${pokemon.name}</h2>\n          <h3 class=\"card-genus\">${pokemon.genus}</h3>\n          <div class=\"card-types flex flex-column\">${typesElement}</div>\n        </div>\n        <figure><img src=${pokemon.image} alt=${pokemon.name} class=\"w-32\" /></figure>\n      </div>\n    `;\n            this.container.innerHTML += card;\n        };\n        this.pokemons = pokemons;\n        this.container = container;\n    }\n}\nexports[\"default\"] = Pokedex;\n\n\n//# sourceURL=webpack://ts-pokedex/./src/pokemon.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;