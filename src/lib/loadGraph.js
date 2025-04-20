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

import { project } from './Projection'
import { filter } from './Filter'
import {
  buildEdgeCreator,
  buildEdgesSourceData,
  buildGraph,
  buildLabelConfiguration,
  buildNodeCreator,
  buildNodesSourceData,
} from './GraphBuilder'
import { runQuery } from './GremlinLoader'
import { arrange } from './Layout'

/**
 * This is automatically generated source code. It is largely undocumented and not necessarily
 * instructive, nor the best way to solve a given task. If you want to learn more about the
 * yFiles API, as a starting point, please consider the more instructive source code tutorial and
 * more than 200 examples on https://live.yworks.com - you will also find the complete sources to
 * these demos for you to play with as part of the evaluation package and online at
 * https://github.com/yWorks/yfiles-for-html-demos/
 * The API documentation is also available online, here: https://docs.yworks.com/yfileshtml - Enjoy!
 */
export default async function loadGraph() {
  const labelConfiguration = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration2 = await buildLabelConfiguration({
    textBinding: new Function(
      "with(arguments[0]) { return (\nname[0] + '\\n   language: ' + lang[0]) }"
    ),
    placement: () => 'topleft',
  })
  const nodeCreator = await buildNodeCreator(
    [labelConfiguration2, labelConfiguration],
    {
      x: () => 0,
      width: () => 120,
      height: () => 80,
      styleProvider: 'ShapeNodeStyle',
      fill: () => 'lightpink',
      shape: () => 'round-rectangle',
      stroke: () => '2px #cc0055',
    }
  )
  const labelConfiguration3 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration4 = await buildLabelConfiguration({
    textBinding: (item) => item.label,
    placement: () => 'center',
    fill: () => 'gray',
  })
  const edgeCreator = await buildEdgeCreator([labelConfiguration4], {
    stroke: () => '1px gray',
    sourceArrow: () => 'none',
    targetArrow: () => 'triangle',
  })
  const data = await runQuery({
    query: 'g.E()',
    password: '',
    url: 'ws://localhost:8182/gremlin',
    username: '',
    mimeType: 'application/vnd.gremlin-v3.0+json',
  })
  const out = await project(data, { binding: (item) => item._items })
  const edgesSource = await buildEdgesSourceData(
    { data: out, edgeCreator },
    {
      sourceIdProvider: (item) => item.outV.id,
      targetIdProvider: (item) => item.inV.id,
    }
  )
  const labelConfiguration5 = await buildLabelConfiguration({
    textBinding: new Function(
      "with(arguments[0]) { return ('   name: ' + name[0] + '\\n   age: ' + age) }"
    ),
    placement: () => 'topleft',
  })
  const nodeCreator2 = await buildNodeCreator(
    [labelConfiguration5, labelConfiguration3],
    {
      x: () => 0,
      width: () => 120,
      height: () => 80,
      styleProvider: 'ShapeNodeStyle',
      fill: () => 'lightblue',
      shape: () => 'round-rectangle',
      stroke: () => '2px #0055cc',
    }
  )
  const data2 = await runQuery({
    query: 'g.V().valueMap(true)',
    password: 'puppygraph123',
    url: 'ws://localhost:8182/gremlin',
    username: 'puppygraph',
    mimeType: 'application/vnd.gremlin-v3.0+json',
  })
  const out2 = await project(data2, { binding: (item) => item._items })
  const out3 = await filter(out2, {
    expression: new Function(
      "with(arguments[0]) { return (label === 'software') }"
    ),
  })
  const nodesSource = await buildNodesSourceData(
    { data: out3, nodeCreator },
    { idProvider: (item) => item.id }
  )
  const out4 = await filter(out2, {
    expression: new Function(
      "with(arguments[0]) { return (label === 'person') }"
    ),
  })
  const nodesSource2 = await buildNodesSourceData(
    { data: out4, nodeCreator: nodeCreator2 },
    { idProvider: (item) => item.id }
  )
  const graph = await buildGraph({
    nodesSources: [nodesSource2, nodesSource],
    edgesSources: [edgesSource],
  })
  const out5 = await arrange(graph, {
    worker: false,
    name: 'HierarchicalLayout',
    properties: {
      layoutOrientation: 'top-to-bottom',
      edgeLabelPlacement: 'integrated',
      nodeDistance: 10,
      minimumLayerDistance: 20,
      automaticEdgeGrouping: false,
    },
  })

  return out5
}
