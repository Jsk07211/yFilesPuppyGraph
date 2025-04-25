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
  // HANDLES STYLE OF LABELS
  const labelConfiguration = await buildLabelConfiguration({
    textBinding: (item) => item.label,
    placement: () => 'center',
    fill: () => 'gray',
  })
  const labelConfiguration2 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration3 = await buildLabelConfiguration({
    textBinding: (item) => item.username,
    placement: () => 'topleft',
  })
    const labelConfiguration4 = await buildLabelConfiguration({
    textBinding: (item) => item.id,
    placement: () => 'bottom',
  })
  const labelConfiguration5 = await buildLabelConfiguration({
    textBinding: (item) => item.name,
    placement: () => 'topleft',
  })
  const edgeCreator = await buildEdgeCreator([labelConfiguration], {
    stroke: () => '1px gray',
    sourceArrow: () => 'none',
    targetArrow: () => 'triangle',
  })
  const nodeCreator = await buildNodeCreator(
    [labelConfiguration3, labelConfiguration2],
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

  // HANDLES DATA QUERIES
  const data = await runQuery({
    query: 'g.E()',
    password: '',
    url: 'ws://localhost:8182/gremlin',
    username: '',
    mimeType: 'application/vnd.gremlin-v3.0+json',
  })
  const data2 = await runQuery({
    query: 'g.V().hasLabel("InternetGateway")',
    url: 'ws://localhost:8182/gremlin',
    username: 'puppygraph',
    password: 'puppygraph123',
    mimeType: 'application/vnd.gremlin-v3.0+json'
  })
  const data3 = await runQuery({
    query: 'g.V().hasLabel("User").has("account_status", "active")',
    url: 'ws://localhost:8182/gremlin',
    username: 'puppygraph',
    password: 'puppygraph123',
    mimeType: 'application/vnd.gremlin-v3.0+json'
  })

  // const data2 = await runQuery({
  //   query: 'g.V().valueMap(true)',
  //   url: 'ws://localhost:8182/gremlin',
  //   username: 'puppygraph',
  //   password: 'puppygraph123',
  //   mimeType: 'application/vnd.gremlin-v3.0+json'
  // })
  // const data3 = await runQuery({
  //   query: 'g.V().valueMap(true)',
  //   url: 'ws://localhost:8182/gremlin',
  //   username: 'puppygraph',
  //   password: 'puppygraph123',
  //   mimeType: 'application/vnd.gremlin-v3.0+json'
  // })


  // Would need to reformat output to expected
  // const data = await runQuery({
  //   query: 'g.V().hasLabel("User").has("account_status", "active").as("user").bothE().as("access").otherV().as("gateway").select("user", "access", "gateway")',
  //   url: 'ws://localhost:8182/gremlin',
  //   username: 'puppygraph',
  //   password: 'puppygraph123',
  //   mimeType: 'application/vnd.gremlin-v3.0+json'
  // })


  const out = await project(data, { binding: (item) => item._items })
  const out2 = await project(data2, { binding: (item) => item._items })
  const out3 = await project(data3, { binding: (item) => item._items })

  // HANDLES DISPLAY OF DATA
  const out4 = await filter(out, {
    expression: new Function(
      'with(arguments[0]) { return (label === "ACCESS") }'
    ),
  })
  const out5 = await filter(out2, {
    expression: new Function(
      'with(arguments[0]) { return (label === "InternetGateway") }'
    ),
  })
  const out6 = await filter(out3, {
    expression: new Function(
      "with(arguments[0]) { return (label === 'User') }"
    ),
  })
  const edgesSource = await buildEdgesSourceData(
    { data: out4, edgeCreator },
    {
      idProvider: (item) => item.id,
      sourceIdProvider: (item) => item.outV.id,
      targetIdProvider: (item) => item.inV.id,
    }
  )
  const nodesSource1 = await buildNodesSourceData(
    { data: out5, nodeCreator: nodeCreator2 },
    { idProvider: (item) => item.id }
  )
  const nodesSource2 = await buildNodesSourceData(
    { data: out6, nodeCreator: nodeCreator },
    { idProvider: (item) => item.id }
  )
  const graph = await buildGraph({
    nodesSources: [
      nodesSource1,
      nodesSource2,
    ],
    edgesSources: [edgesSource],
  })

  // HANDLES SHAPE OF THE GRAPH
  // const out7 = await arrange(graph, {
  //   worker: false,
  //   name: 'HierarchialLayout',
  // })

  // Force directed graph
  const out7 = await arrange(graph, {
    worker: false,
    name: 'OrganicLayout',
    compactnessFactor: 0,
  })

  // const out7 = await arrange(graph, {
  //   worker: false,
  //   name: 'OrthogonalLayout',
  // })

  // const out7 = await arrange(graph, {
  //   worker: false,
  //   name: 'CircularLayout',
  //   // properties: { partitioningPolicy: 'single-cycle' },
  //   properties: { partitioningPolicy: 'bcc-compact' },
  // })

  // const out7 = await arrange(graph, {
  //   worker: false,
  //   name: 'TreeLayout',
  // })

  return out7
}
