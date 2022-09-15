const { parseRules, processRef } = require('../src/replace')

describe('parseRules tests', () => {
  it('should parse replacements', () => {
    const replacements = parseRules([
      'master=latest',
      'feature/some-feat=feat/some-feature',
    ])
    expect(replacements).toEqual({
      'master': 'latest',
      'feature/some-feat': 'feat/some-feature',
    })
  })
})

describe('processRef tests', () => {
  it('should replace specified refs', () => {
    const name = processRef('master', true, { 'master': 'latest' })
    expect(name).toBe('latest')
  })
  it('should NOT replace unspecified refs', () => {
    const name = processRef('some-feature', true, { 'master': 'latest' })
    expect(name).toBe('some-feature')
  })
  it('should replace slashes if enabled', () => {
    const name = processRef('feature/something', true, {})
    expect(name).toBe('feature-something')
  })
  it('should handle dependabot PR format', () => {
    const name = processRef('dependabot/npm_and_yarn/typescript-4.8.3', true, {})
    expect(name).toBe('dependabot-npm_and_yarn-typescript-4.8.3')
  })
  it('should NOT replace slashes if not enabled', () => {
    const name = processRef('feature/something', false, {})
    expect(name).toBe('feature/something')
  })
})