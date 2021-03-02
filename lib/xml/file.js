'use strict'

const testCase = require('./testCase')
const path = require('path')

module.exports = function file(testResult) {
  const aFile = [{_attr: {path: path.relative(process.cwd(), testResult.testFilePath)}}]
  const testCases = testResult.testResults.map(testCase)

  return {file: aFile.concat(testCases)}
}
