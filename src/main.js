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

import './assets/icons/icons.css'
import './style.css'
import './dialog.css'
import { GraphComponent, GraphViewerInputMode, Command } from '@yfiles/yfiles'
import loadGraph from './lib/loadGraph'
import './lib/yFilesLicense'

async function run() {
  const graphComponent = await initializeGraphComponent()
  initializeToolbar(graphComponent)
}

async function initializeGraphComponent() {
  // create a GraphComponent in its designated container
  const graphComponent = new GraphComponent(
    document.querySelector('.graph-component-container')
  )

  graphComponent.inputMode = new GraphViewerInputMode()

  graphComponent.graph = await loadGraph()

  // center the newly created graph
  graphComponent.fitGraphBounds()

  return graphComponent
}

function initializeToolbar(graphComponent) {
  document.getElementById('btn-increase-zoom').addEventListener('click', () => {
    graphComponent.executeCommand(Command.INCREASE_ZOOM, null)
  })

  document.getElementById('btn-decrease-zoom').addEventListener('click', () => {
    graphComponent.executeCommand(Command.DECREASE_ZOOM, null)
  })

  document.getElementById('btn-fit-graph').addEventListener('click', () => {
    graphComponent.executeCommand(Command.FIT_GRAPH_BOUNDS, null)
  })
}

run()
