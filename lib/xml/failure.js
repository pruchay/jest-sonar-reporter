'use strict'

const filter = /\x1b\[[0-9;]*m/g // Escape sequence
const shorten = /[\n].*/g

module.exports = function failure(message) {
  const filteredMessage = message.replace(filter, '')
  const shortMessage = filteredMessage.replace(shorten, '')

  return {
    failure: {
      _attr: {
        message: shortMessage
      },
      _cdata: filteredMessage
    }
  }
}
