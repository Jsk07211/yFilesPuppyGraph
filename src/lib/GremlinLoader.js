/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2025 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { driver } from 'gremlin'
import { WsClient } from './WsJsDriver'

/**
 * @typedef {Object} GremlinConfiguration
 * @property {string} url
 * @property {string} username
 * @property {string} password
 * @property {string} mimeType
 * @property {string} query
 */

/**
 * @param {!GremlinConfiguration} configuration
 * @returns {!Promise}
 */
export async function runQuery(configuration) {
  // nothing configured - return an empty data set instead of erroring out
  if (!configuration.url) {
    return {}
  }

  const authenticator = configuration.username
    ? new driver.auth.PlainTextSaslAuthenticator(
        configuration.username,
        configuration.password
      )
    : undefined
  const http = configuration.url.startsWith('http')
  const client = http
    ? new HttpClient(configuration.url, {
        username: configuration.username,
        password: configuration.password,
        traversalsource: 'g',
        rejectUnauthorized: true,
        mimeType: configuration.mimeType,
      })
    : new WsClient(configuration.url, {
        authenticator,
        traversalsource: 'g',
        rejectUnauthorized: true,
        mimeType: configuration.mimeType,
        connectOnStartup: false,
      })
  await client.open()
  const result = await client.submit(configuration.query, {})
  return demap(result)
}

/**
 * gremlin.js stores the properties in a map with the values in an array.
 * We need an object {key: value}
 * @param {*} obj The object containing the map to flatten
 * @returns {*}
 */
function demap(obj) {
  if (obj instanceof Map) {
    const ret = {}
    for (const [key, value] of obj.entries()) {
      ret[key] = demap(value)
    }
    return ret
  }
  if (Array.isArray(obj)) {
    const ret = []
    for (const value of obj) {
      ret.push(demap(value))
    }
    return ret
  }
  switch (typeof obj) {
    case 'number':
    case 'string':
    case 'boolean':
    case 'undefined':
      return obj
    default: {
      if (obj === null) {
        return null
      }
      const ret = {}
      for (const key in obj) {
        ret[key] = demap(obj[key])
      }
      return ret
    }
  }
}

class HttpClient extends driver.Client {
  /**
   * @param {!string} url
   * @param {*} [options]
   */
  constructor(url, options) {
    options = options || {}
    const isConnectOnStartUp =
      options.connectOnStartup === undefined ? true : options.connectOnStartup
    options.connectOnStartup = false
    super(url, options)

    options.connectOnStartup = isConnectOnStartUp
    if (!options.reader) {
      options.reader = this._connection._getDefaultReader(
        options.mimeType || graphSON3MimeType
      )
    }
    this._connection = new HttpConnection(url, options)
  }
}

const graphSON3MimeType = 'application/vnd.gremlin-v3.0+json'
const graphSON2MimeType = 'application/vnd.gremlin-v2.0+json'

class HttpConnection {
  /**
   * @param {!string} url
   * @param {*} [options]
   */
  constructor(url, options) {
    this.url = url
    this.options = options || {}
    this.username = options.username
    this.password = options.password
    this.mimeType = options.mimeType || graphSON3MimeType
    this._reader = options.reader
  }

  open() {
    return Promise.resolve()
  }

  close() {
    return Promise.resolve()
  }

  /**
   * @override
   * @param {!unknown} processor
   * @param {!unknown} op
   * @param {*} args
   * @param {!unknown} requestId
   */
  submit(processor, op, args, requestId) {
    return new Promise((resolve, reject) => {
      const r = new XMLHttpRequest()
      r.timeout = 5000
      r.open('POST', this.url)
      r.onload = (ev) => {
        if (r.status >= 200 && r.status < 300) {
          const response = this._reader.read(JSON.parse(r.response))

          resolve(response.result)
        } else {
          reject(
            new Error(
              `Error in Gremlin Query: ${
                r.statusText
                  ? r.statusText
                  : 'please check connection and query syntax'
              }.`
            )
          )
        }
      }
      r.onerror = (ev) => {
        reject(
          new Error(
            `Error in Gremlin Query: ${
              r.statusText
                ? r.statusText
                : 'please check connection and query syntax'
            }.`
          )
        )
      }
      r.ontimeout = (ev) => {
        reject(new Error('Connection timed out.'))
      }
      r.setRequestHeader('Content-Type', 'text/plain')
      if (this.username) {
        r.withCredentials = true
        r.setRequestHeader(
          'Authorization',
          `Basic ${btoa(this.username + ':' + this.password)}`
        )
      }
      r.send(JSON.stringify(args))
    })
  }
}
