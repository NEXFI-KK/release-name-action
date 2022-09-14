/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 760:
/***/ ((module) => {

/**
 * Parse rule line inputs into a name replace map.
 * @param {string[]} ruleLines Lines in the format "oldtext=newtext"
 * @return Hash map of old names to new names.
 */
function parseRules(ruleLines) {
  const replaceMap = {}
  for (const rule of ruleLines) {
    const r = rule.split('=')
    replaceMap[r[0]] = r[1]
  }
  return replaceMap
}

/**
 * Process the GitHub ref and generate the nice name for it.
 * @param {string} refName GitHub ref name.
 * @param {boolean} replaceSlashes Whether or not to replace slashes with hyphens.
 * @param {Object} replacements Hash map of old ref names to new release names.
 * @return {string} Processed and replaced ref name.
 */
function processRef(refName, replaceSlashes, replacements) {
  if (replacements[refName]) {
    return replacements[refName]
  }

  return replaceSlashes ? refName.replace('/', '-') : refName
}

module.exports = { parseRules, processRef }


/***/ }),

/***/ 396:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(396)
const { parseRules, processRef } = __nccwpck_require__(760)

async function run() {
  try {
    const opts = {
      replaceRefs: core.getMultilineInput('replace-refs'),
      replaceSlashes: core.getBooleanInput('replace-slashes'),
    }

    const refName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME
    const replacements = parseRules(opts.replaceRefs)
    const releaseName = processRef(refName, opts.replaceSlashes, replacements)
  
    core.setOutput('name', releaseName)
    core.exportVariable('RELEASE_NAME', releaseName)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

})();

module.exports = __webpack_exports__;
/******/ })()
;