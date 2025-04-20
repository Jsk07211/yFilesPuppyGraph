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

'use strict'

import { driver } from 'gremlin'
import Connection from 'gremlin-js-driver/lib/connection'

export class WsClient extends driver.Client {
  constructor(url, options) {
    options = options || {}
    const isConnectOnStartUp = options.connectOnStartup || true
    options.connectOnStartup = false
    super(url, options)

    options.connectOnStartup = isConnectOnStartUp
    this._connection = new WsConnection(url, options)
  }
}

class WsConnection extends Connection {
  _cleanupWebsocket() {
    // workaround: original calls non-existing removeAllListeners on the WebSocket
    this._openPromise = null
    this._closePromise = null
    this.isOpen = false
  }

  open() {
    // workaround: original doesn't reject the promise on error, keeping open() stuck forever
    if (this.isOpen) {
      return Promise.resolve()
    }
    if (this._openPromise) {
      return this._openPromise
    }

    this.emit('log', `ws open`)

    this._ws = new WebSocket(this.url, this._ws_protocols, {})

    this._ws.onmessage = (data) => this._handleMessage(data)
    this._ws.onerror = (err) => this._handleError(err)
    this._ws.onclose = (code, message) => this._handleClose(code, message)

    return (this._openPromise = new Promise((resolve, reject) => {
      this._ws.onopen = () => {
        this.isOpen = true
        resolve()
      }
      this._ws.onerror = (err) =>
        reject(new Error(`Connection failed: ${this.url}`))
    }))
  }
}
