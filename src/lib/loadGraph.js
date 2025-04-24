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
    textBinding: (item) => item.label,
    placement: () => 'center',
    fill: () => 'gray',
  })
  const edgeCreator = await buildEdgeCreator([labelConfiguration], {
    stroke: () => '1px gray',
    sourceArrow: () => 'none',
    targetArrow: () => 'triangle',
  })
  const labelConfiguration2 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration3 = await buildLabelConfiguration({
    textBinding: (item) => item.protocol,
    placement: () => 'topleft',
  })
  const nodeCreator = await buildNodeCreator(
    [labelConfiguration3, labelConfiguration2],
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
  const labelConfiguration4 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration5 = await buildLabelConfiguration({
    textBinding: (item) => item.ip_address,
    placement: () => 'topleft',
  })
  const nodeCreator2 = await buildNodeCreator(
    [labelConfiguration5, labelConfiguration4],
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
  const labelConfiguration6 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration7 = await buildLabelConfiguration({
    textBinding: (item) => item.ip_address,
    placement: () => 'topleft',
  })
  const nodeCreator3 = await buildNodeCreator(
    [labelConfiguration7, labelConfiguration6],
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
  const labelConfiguration8 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration9 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator4 = await buildNodeCreator(
    [labelConfiguration9, labelConfiguration8],
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
  const labelConfiguration10 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration11 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator5 = await buildNodeCreator(
    [labelConfiguration11, labelConfiguration10],
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
  const labelConfiguration12 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration13 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator6 = await buildNodeCreator(
    [labelConfiguration13, labelConfiguration12],
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
  const labelConfiguration14 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration15 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator7 = await buildNodeCreator(
    [labelConfiguration15, labelConfiguration14],
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
  const labelConfiguration16 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration17 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator8 = await buildNodeCreator(
    [labelConfiguration17, labelConfiguration16],
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
  const labelConfiguration18 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration19 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator9 = await buildNodeCreator(
    [labelConfiguration19, labelConfiguration18],
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
  const labelConfiguration20 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration21 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator10 = await buildNodeCreator(
    [labelConfiguration21, labelConfiguration20],
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
  const labelConfiguration22 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration23 = await buildLabelConfiguration({
    textBinding: (item) => item.username,
    placement: () => 'topleft',
  })
  const nodeCreator11 = await buildNodeCreator(
    [labelConfiguration23, labelConfiguration22],
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
  const labelConfiguration24 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration25 = await buildLabelConfiguration({
    textBinding: (item) => item.label,
    placement: () => 'center',
    fill: () => 'gray',
  })
  const edgeCreator2 = await buildEdgeCreator([labelConfiguration25], {
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
  const out2 = await filter(out, {
    expression: new Function(
      'with(arguments[0]) { return (label === "ACCESS") }'
    ),
  })
  const edgesSource = await buildEdgesSourceData(
    { data: out2, edgeCreator },
    {
      idProvider: (item) => item.id,
      sourceIdProvider: (item) => item.outV.id,
      targetIdProvider: (item) => item.inV.id,
    }
  )
  const out3 = await filter(out, {
    expression: new Function(
      'with(arguments[0]) { return (label === "ACCESS") }'
    ),
  })
  const edgesSource2 = await buildEdgesSourceData(
    { data: out3, edgeCreator: edgeCreator2 },
    {
      idProvider: (item) => item.id,
      sourceIdProvider: (item) => item.outV.id,
      targetIdProvider: (item) => item.inV.id,
    }
  )
  const labelConfiguration26 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const nodeCreator12 = await buildNodeCreator(
    [labelConfiguration26, labelConfiguration24],
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
    query: 'g.V().hasLabel("User").has("account_status", "active")',
    url: 'ws://localhost:8182/gremlin',
    username: 'puppygraph',
    password: 'puppygraph123',
    mimeType: 'application/vnd.gremlin-v3.0+json'
  })

  const data3 = await runQuery({
    query: 'g.V().hasLabel("User").has("account_status", "active").both()',
    url: 'ws://localhost:8182/gremlin',
    username: 'puppygraph',
    password: 'puppygraph123',
    mimeType: 'application/vnd.gremlin-v3.0+json'
  })

  const out4 = await project(data2, { binding: (item) => item._items })
  const out5 = await project(data3, { binding: (item) => item._items })

  const out15 = await filter(out4, {
    expression: new Function(
      "with(arguments[0]) { return (label === 'User') }"
    ),
  })
  const nodesSource11 = await buildNodesSourceData(
    { data: out15, nodeCreator: nodeCreator11 },
    { idProvider: (item) => item.id }
  )
  const out16 = await filter(out5, {
    expression: new Function(
      'with(arguments[0]) { return (label === "InternetGateway") }'
    ),
  })
  const nodesSource12 = await buildNodesSourceData(
    { data: out16, nodeCreator: nodeCreator12 },
    { idProvider: (item) => item.id }
  )
  const graph = await buildGraph({
    nodesSources: [
      nodesSource12,
      nodesSource11,
    ],
    edgesSources: [edgesSource2, edgesSource],
  })
  const out17 = await arrange(graph, {
    worker: false,
    name: 'CircularLayout',
    properties: { partitioningPolicy: 'bcc-compact' },
  })

  return out17
}
