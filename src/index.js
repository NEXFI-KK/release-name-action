const core = require('@actions/core')
const { parseRules, processRef } = require('./replace')

async function run() {
  try {
    const opts = {
      replaceRefs: core.getMultilineInput('replace-refs'),
      replaceSlashes: core.getBooleanInput('replace-slashes'),
    }

    const replacements = parseRules(opts.replaceRefs)
    const releaseName = processRef(process.env.GITHUB_REF_NAME, opts.replaceSlashes, replacements)
  
    core.setOutput('name', releaseName)
    core.exportVariable('RELEASE_NAME', releaseName)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
