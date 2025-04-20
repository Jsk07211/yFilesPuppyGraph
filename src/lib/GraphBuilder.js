import {
  Arrow,
  ArrowType,
  EdgeCreator,
  EdgePathLabelModel,
  Fill,
  GraphBuilder,
  GroupNodeStyle,
  GroupNodeStyleTabPosition,
  IGraph,
  ImageNodeStyle,
  InteriorNodeLabelModel,
  LabelCreator,
  LabelStyle,
  NodeCreator,
  Point,
  PolylineEdgeStyle,
  Rect,
  ShapeNodeShape,
  ShapeNodeStyle,
  Size,
  Stroke,
} from '@yfiles/yfiles'

import {
  asLayoutParameterForEdges,
  asLayoutParameterForGroupNodes,
  asLayoutParameterForNodes,
  configureLabelCreator,
  maybeAddBinding,
} from './GraphBuilderUtils'

// start node-visualization-component-imports
// Please do not delete this comment!
// On app export, node visualization component import are added here.
// end node-visualization-component-imports

/**
 * @typedef {(function|IdProviderConvertible.<T>)} IdProvider
 */

/**
 * @typedef {Object} EdgesSourceData
 * @property {Array.<T>} data
 * @property {IdProvider.<T>} idProvider
 * @property {(function|string)} sourceIdProvider
 * @property {(function|string)} targetIdProvider
 * @property {EdgeCreator} [edgeCreator]
 */

/**
 * @typedef {Object} NodesSourceData
 * @property {Array.<T>} data
 * @property {IdProvider.<T>} idProvider
 * @property {(function|string)} [parentIdProvider]
 * @property {NodeCreator} [nodeCreator]
 */

/**
 * @typedef {Object} NodeCreatorConfiguration
 * @property {string} [template]
 * @property {function} [tagProvider]
 * @property {function} [isGroupProvider]
 * @property {function} [layout]
 * @property {function} [x]
 * @property {function} [y]
 * @property {function} [width]
 * @property {function} [height]
 * @property {NodeStyle} styleProvider
 * @property {function} [fill]
 * @property {function} [shape]
 * @property {function} [stroke]
 * @property {function} [tabFill]
 * @property {function} [tabBackgroundFill]
 * @property {function} [image]
 * @property {string} [templateFileNumber]
 */

/**
 * @typedef {('ShapeNodeStyle'|'ImageNodeStyle'|'VuejsNodeStyle'|'GroupNodeStyle'|'ReactHtmlNodeStyle'|'ReactSvgNodeStyle')} NodeStyle
 */

/**
 * @typedef {Object} EdgesSourceDataConfiguration
 * @property {IdProvider.<T>} [idProvider]
 * @property {(function|string)} [sourceIdProvider]
 * @property {(function|string)} [targetIdProvider]
 */

/**
 * @template T
 * @param {!object} state
 * @param {!EdgesSourceDataConfiguration.<T>} configuration
 * @returns {!EdgesSourceData.<T>}
 */
export function buildEdgesSourceData(state, configuration) {
  return {
    data: state.data,
    idProvider: configuration.idProvider,
    sourceIdProvider: configuration.sourceIdProvider,
    targetIdProvider: configuration.targetIdProvider,
    edgeCreator: state.edgeCreator,
  }
}

/**
 * @typedef {Object} NodesSourceDataConfiguration
 * @property {IdProvider.<T>} [idProvider]
 * @property {(function|string)} [parentIdProvider]
 */

/**
 * @template T
 * @param {!object} state
 * @param {!NodesSourceDataConfiguration.<T>} configuration
 * @returns {!NodesSourceData.<T>}
 */
export function buildNodesSourceData(state, configuration) {
  return {
    data: state.data,
    idProvider: configuration.idProvider,
    parentIdProvider: configuration.parentIdProvider,
    nodeCreator: state.nodeCreator,
  }
}

/**
 * @template T
 * @param {!LabelConfiguration.<T>} labelConfiguration
 * @param {boolean} nodes
 * @returns {!LabelCreator.<T>}
 */
export function createLabelCreator(labelConfiguration, nodes) {
  const creator = new LabelCreator()
  configureLabelCreator(
    labelConfiguration,
    creator,
    nodes ? asLayoutParameterForNodes : asLayoutParameterForEdges
  )
  return creator
}

/**
 * @template T
 * @param {!Array.<LabelConfiguration>} [labelConfigurations]
 * @param {!NodeCreatorConfiguration.<T>} configuration
 * @returns {!NodeCreator.<T>}
 */
export function buildNodeCreator(labelConfigurations, configuration) {
  const nodeCreator = newConfiguredNodeCreator()

  if (configuration.styleProvider === 'ImageNodeStyle') {
    nodeCreator.styleProvider = (item) => {
      return new ImageNodeStyle({
        href: configuration.image(item) ?? undefined,
      })
    }
  } else if (configuration.styleProvider === 'ShapeNodeStyle') {
    maybeAddBinding(
      nodeCreator.styleBindings,
      'fill',
      makeEmptyValueNull(configuration.fill)
    )
    maybeAddBinding(
      nodeCreator.styleBindings,
      'stroke',
      makeEmptyValueNull(configuration.stroke)
    )

    const shapeBinding = configuration.shape
    if (shapeBinding) {
      nodeCreator.styleProvider = (item) => {
        return new ShapeNodeStyle({
          shape: shapeBinding(item),
          stroke: null,
          fill: null,
        })
      }
    }
  } else if (configuration.styleProvider === 'VuejsNodeStyle') {
    const vuejsNodeStyle = null
    nodeCreator.styleProvider = () => vuejsNodeStyle
  } else if (configuration.styleProvider === 'ReactSvgNodeStyle') {
    if (configuration.template) {
      const jsx = createReactRenderFunction(configuration.template || '<g></g>')
      const reactNodeStyle = null
      nodeCreator.styleProvider = () => reactNodeStyle
    } else if (configuration.templateFileNumber) {
      // start node-visualization-component-nodestyle-svg
      // Please do not delete this comment!
      // On app export, the node style is instantiated via the imports at the top.
      nodeCreator.styleProvider = () => null
      // end node-visualization-component-nodestyle-svg
    } else {
      throw new Error(
        'Node creator configuration missing both template _and_ componentFile'
      )
    }
  } else if (configuration.styleProvider === 'ReactHtmlNodeStyle') {
    if (configuration.template) {
      const jsx = createReactRenderFunction(
        configuration.template || '<div></div>'
      )
      const reactNodeStyle = null
      nodeCreator.styleProvider = () => reactNodeStyle
    } else if (configuration.templateFileNumber) {
      // start node-visualization-component-nodestyle-html
      // Please do not delete this comment!
      // On app export, the node style is instantiated via the imports at the top.
      nodeCreator.styleProvider = () => null
      // end node-visualization-component-nodestyle-html
    } else {
      throw new Error(
        'Node creator configuration missing both template _and_ componentFile'
      )
    }
  } else if (configuration.styleProvider === 'GroupNodeStyle') {
    maybeAddBinding(
      nodeCreator.styleBindings,
      'contentAreaFill',
      makeEmptyValueNull(configuration.fill)
    )
    maybeAddBinding(
      nodeCreator.styleBindings,
      'stroke',
      makeEmptyValueNull(configuration.stroke)
    )
    maybeAddBinding(
      nodeCreator.styleBindings,
      'tabFill',
      makeEmptyValueNull(configuration.tabFill)
    )

    nodeCreator.styleProvider = (item) => {
      return new GroupNodeStyle({
        tabPosition: GroupNodeStyleTabPosition.TOP,
        stroke: 'black',
        contentAreaFill: null,
        tabFill: 'black',
        contentAreaPadding: 10,
      })
    }
  }

  if (configuration.layout) {
    nodeCreator.layoutProvider = configuration.layout
  }
  maybeAddBinding(nodeCreator.layoutBindings, 'x', configuration.x)
  maybeAddBinding(nodeCreator.layoutBindings, 'y', configuration.y)
  maybeAddBinding(nodeCreator.layoutBindings, 'width', configuration.width)
  maybeAddBinding(nodeCreator.layoutBindings, 'height', configuration.height)

  if (configuration.tagProvider) {
    nodeCreator.tagProvider = configuration.tagProvider
  }

  if (configuration.isGroupProvider) {
    nodeCreator.isGroupPredicate = configuration.isGroupProvider
  }

  if (labelConfigurations) {
    applyLabelConfiguration(
      labelConfigurations,
      nodeCreator,
      true,
      configuration.styleProvider === 'GroupNodeStyle'
    )
  }

  return nodeCreator
}

/**
 * @template T
 * @param {?function} [binding]
 */
function makeEmptyValueNull(binding) {
  return (dataItem) => {
    if (!binding) {
      return null
    }
    const result = binding(dataItem)
    if (typeof result === 'string' && result.trim().length === 0) {
      return null
    }
    return result
  }
}

/**
 * Wrap the user's JSX in a render function such that the user does not need to explicitly define the arrow function
 * but just the template.
 * @param {!string} userJsx
 * @returns {!string}
 */
function createReactRenderFunction(userJsx) {
  return `({width, height, detail, selected, tag}) => (<>${userJsx}</>)`
}

/**
 * @template T
 * @param {!Array.<LabelConfiguration>} labelConfigurations
 * @param {!(EdgeCreator.<T>|NodeCreator.<T>)} creator
 * @param {boolean} nodes
 * @param {boolean} [groupNodes=false]
 */
function applyLabelConfiguration(
  labelConfigurations,
  creator,
  nodes,
  groupNodes = false
) {
  for (const labelConfiguration of labelConfigurations) {
    let labelCreator
    const labelsBinding = labelConfiguration.labelsBinding
    const textBinding = labelConfiguration.textBinding
    if (textBinding) {
      if (labelsBinding) {
        labelCreator = creator.createLabelsSource({
          data: labelsBinding,
          text: textBinding,
        }).labelCreator
      } else {
        labelCreator = creator.createLabelBinding(textBinding)
      }
      configureLabelCreator(
        labelConfiguration,
        labelCreator,
        nodes
          ? groupNodes
            ? asLayoutParameterForGroupNodes
            : asLayoutParameterForNodes
          : asLayoutParameterForEdges
      )
    }
  }
}

/**
 * @param {?function} [arrowBinding]
 * @param {*} item
 * @returns {!ArrowType}
 */
function getArrow(arrowBinding, item) {
  return arrowBinding ? arrowBinding(item) : ArrowType.NONE
}

/**
 * @param {?function} [binding]
 * @param {*} item
 * @returns {?Stroke}
 */
function getStroke(binding, item) {
  if (binding) {
    const strokeString = binding(item)
    if (strokeString) {
      return Stroke.from(strokeString)
    }
  }
  return null
}

/**
 * @param {?function} [arrowBinding]
 * @param {?function} [strokeBinding]
 * @param {*} item
 * @returns {!Arrow}
 */
function createArrow(arrowBinding, strokeBinding, item) {
  const stroke = getStroke(strokeBinding, item)
  return new Arrow({
    type: getArrow(arrowBinding, item),
    fill: stroke ? stroke.fill : null,
    stroke: stroke
      ? new Stroke({ fill: stroke.fill ?? undefined, lineCap: 'square' })
      : undefined,
    widthScale: stroke ? stroke.thickness : 1,
    lengthScale: stroke ? stroke.thickness : 1,
  })
}

/**
 * @typedef {Object} EdgeCreatorConfiguration
 * @property {function} [tagProvider]
 * @property {function} [stroke]
 * @property {function} [sourceArrow]
 * @property {function} [targetArrow]
 * @property {function} [bendsProvider]
 */

/**
 * @template T
 * @param {!Array.<LabelConfiguration>} [labelConfigurations]
 * @param {!EdgeCreatorConfiguration.<T>} configuration
 * @returns {!EdgeCreator}
 */
export function buildEdgeCreator(labelConfigurations, configuration) {
  const edgeCreator = newConfiguredEdgeCreator()

  const edgeDefaults = edgeCreator.defaults
  edgeDefaults.shareStyleInstance = false

  if (configuration.tagProvider) {
    edgeCreator.tagProvider = configuration.tagProvider
  }

  maybeAddBinding(
    edgeCreator.styleBindings,
    'stroke',
    makeEmptyValueNull(configuration.stroke)
  )
  maybeAddBinding(edgeCreator.styleBindings, 'sourceArrow', (item) =>
    createArrow(
      configuration.sourceArrow,
      makeEmptyValueNull(configuration.stroke),
      item
    )
  )
  maybeAddBinding(edgeCreator.styleBindings, 'targetArrow', (item) =>
    createArrow(
      configuration.targetArrow,
      makeEmptyValueNull(configuration.stroke),
      item
    )
  )

  edgeCreator.styleProvider = () => {
    return new PolylineEdgeStyle({
      stroke: null,
      sourceArrow: new Arrow(ArrowType.NONE),
      targetArrow: new Arrow(ArrowType.NONE),
    })
  }

  if (configuration.bendsProvider) {
    edgeCreator.bendsProvider = configuration.bendsProvider
  }

  if (labelConfigurations) {
    applyLabelConfiguration(labelConfigurations, edgeCreator, false)
  }

  return edgeCreator
}

/**
 * @template T
 * @param {!LabelConfiguration.<T>} configuration
 * @returns {!LabelConfiguration.<T>}
 */
export function buildLabelConfiguration(configuration) {
  return {
    labelsBinding: configuration.labelsBinding,
    textBinding: configuration.textBinding,
    placement: configuration.placement,
    fill: configuration.fill,
  }
}

/**
 * @param {!object} state
 * @returns {!IGraph}
 */
export function buildGraph(state) {
  const builder = new GraphBuilder()

  for (const src of state.nodesSources) {
    if (!src.data) {
      continue
    }

    const nodesSource = builder.createNodesSource({
      data: src.data,
      id: src.idProvider,
      parentId: src.parentIdProvider,
    })
    nodesSource.nodeCreator = src.nodeCreator
      ? src.nodeCreator
      : newConfiguredNodeCreator()
  }

  for (const src of state.edgesSources || []) {
    if (!src.data) {
      continue
    }

    const edgesSource = builder.createEdgesSource(
      src.data,
      src.sourceIdProvider,
      src.targetIdProvider,
      src.idProvider ?? undefined
    )
    edgesSource.edgeCreator = src.edgeCreator
      ? src.edgeCreator
      : newConfiguredEdgeCreator()
  }

  builder.updateGraph()
  return builder.graph
}

/**
 * @template T
 * @returns {!NodeCreator.<T>}
 */
function newConfiguredNodeCreator() {
  const nodeCreator = new NodeCreator()
  const nodeDefaults = nodeCreator.defaults
  nodeDefaults.style = new ShapeNodeStyle({
    shape: 'round-rectangle',
    fill: '#eee',
    stroke: '#323232',
  })

  nodeDefaults.shareStyleInstance = false
  nodeDefaults.size = new Size(60, 30)

  const labelDefaults = nodeDefaults.labels
  labelDefaults.style = new LabelStyle({
    textSize: 14,
    textFill: 'black',
  })
  labelDefaults.shareStyleInstance = true
  labelDefaults.layoutParameter = InteriorNodeLabelModel.BOTTOM
  return nodeCreator
}

/**
 * @template T
 * @returns {!EdgeCreator.<T>}
 */
function newConfiguredEdgeCreator() {
  const edgeCreator = new EdgeCreator()
  const edgeDefaults = edgeCreator.defaults
  edgeDefaults.style = new PolylineEdgeStyle({
    stroke: '#eee',
    smoothingLength: 5,
    targetArrow: '#eee medium triangle',
  })
  edgeDefaults.shareStyleInstance = false

  const labelDefaults = edgeDefaults.labels
  labelDefaults.style = new LabelStyle({
    textSize: 12,
    textFill: '#eee',
  })
  labelDefaults.shareStyleInstance = true
  labelDefaults.layoutParameter = new EdgePathLabelModel({
    autoRotation: false,
  }).createRatioParameter()
  return edgeCreator
}
