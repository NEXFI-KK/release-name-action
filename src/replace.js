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

  return replaceSlashes ? refName.replace(/\//g, '-') : refName
}

module.exports = { parseRules, processRef }
