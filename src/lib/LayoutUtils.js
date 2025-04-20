import {
  CircularLayout,
  HierarchicalLayout,
  HierarchicalLayoutData,
  ILayoutAlgorithm,
  INode,
  LayoutData,
  LayoutGridData,
  MinimumNodeSizeStage,
  OrganicLayout,
  OrganicLayoutData,
  OrthogonalLayout,
  RadialNodeLabelPlacement,
  SingleLayerSubtreePlacer,
  TreeLayout,
} from '@yfiles/yfiles'

/**
 * @typedef {*} ExtendedTreeLayoutConfig
 */
/**
 * @typedef {Object} GridDescriptor
 * @property {function} [gridColumns]
 * @property {function} [gridRows]
 */
/**
 * @typedef {*} ExtendedHierarchicalLayoutConfig
 */
/**
 * @typedef {*} ExtendedOrganicLayoutConfig
 */
/**
 * @typedef {*} LayoutConfiguration
 */

/**
 * @param {!LayoutDescriptor} layoutDescriptor
 * @returns {!ILayoutAlgorithm}
 */
export function getAlgorithm(layoutDescriptor) {
  let layout
  switch (layoutDescriptor.name) {
    case 'OrganicLayout':
      layout = getOrganicLayout(layoutDescriptor.properties)
      break
    case 'OrthogonalLayout':
      layout = getOrthogonalLayout(layoutDescriptor.properties)
      break
    case 'CircularLayout':
      layout = getCircularLayout(layoutDescriptor.properties)
      break
    case 'TreeLayout':
      layout = getTreeLayout(layoutDescriptor.properties)
      break
    case 'HierarchicalLayout':
    default:
      layout = getHierarchicalLayout(layoutDescriptor.properties)
      break
  }
  return new MinimumNodeSizeStage(layout)
}

/**
 * @param {?function} [bindingFunction]
 * @returns {?function}
 */
function createNodeTagIndexFunction(bindingFunction) {
  if (bindingFunction) {
    return (node) => {
      const value = bindingFunction(node.tag)
      if (typeof value === 'undefined' || value === null) {
        return 0
      } else {
        return Number(value) | 0
      }
    }
  } else {
    return null
  }
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {?LayoutGridData}
 */
function createLayoutGridData(configuration) {
  const properties = configuration.properties
  if (properties) {
    const columnFunction = createNodeTagIndexFunction(properties.gridColumns)
    const rowFunction = createNodeTagIndexFunction(properties.gridRows)
    if (columnFunction || rowFunction) {
      const gridData = new LayoutGridData()
      if (rowFunction) {
        gridData.rowIndices.mapperFunction = rowFunction
      }
      if (columnFunction) {
        gridData.columnIndices.mapperFunction = columnFunction
      }
      return gridData
    }
  }
  return null
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!LayoutData}
 */
export function getLayoutData(configuration) {
  switch (configuration.name) {
    case 'OrganicLayout': {
      const layoutGridData = createLayoutGridData(configuration)
      if (layoutGridData !== null) {
        return new OrganicLayoutData({ layoutGridData })
      }
      break
    }
    case 'HierarchicalLayout': {
      const layoutGridData = createLayoutGridData(configuration)
      if (layoutGridData !== null) {
        return new HierarchicalLayoutData({ layoutGridData })
      }
      break
    }
  }
}

/**
 * @param {!ExtendedHierarchicalLayoutConfig} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getHierarchicalLayout(configuration = {}) {
  const args = {
    ...configuration,
  }

  delete args.gridColumns
  delete args.gridRows
  const layout = new HierarchicalLayout(args)
  layout.edgeLabelPlacement = configuration.edgeLabelPlacement ?? 'ignore'
  return layout
}

/**
 * @param {!ExtendedOrganicLayoutConfig} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getOrganicLayout(configuration = {}) {
  const args = { ...configuration }
  delete args.gridColumns
  delete args.gridRows
  const layout = new OrganicLayout(args)
  layout.edgeLabelPlacement = configuration.edgeLabelPlacement ?? 'ignore'
  return layout
}

/**
 * @param {!OrthogonalLayoutConfig} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getOrthogonalLayout(configuration = {}) {
  return new OrthogonalLayout({ ...configuration })
}

/**
 * @param {!CircularLayoutConfig} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getCircularLayout(configuration = {}) {
  const layout = new CircularLayout({ ...configuration })
  layout.nodeLabelPlacement = RadialNodeLabelPlacement.RAY_LIKE
  layout.edgeLabelPlacement = configuration.edgeLabelPlacement ?? 'ignore'
  return layout
}

/**
 * @param {!ExtendedTreeLayoutConfig} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getTreeLayout(configuration = {}) {
  const args = { ...configuration }
  delete args.nodeDistance
  const layout = new TreeLayout(args)

  const nodePlacer = layout.defaultSubtreePlacer
  const nodeDistance = configuration.nodeDistance
  if (nodeDistance !== undefined) {
    nodePlacer.horizontalDistance = nodeDistance
    nodePlacer.verticalDistance = nodeDistance
  }

  layout.edgeLabelPlacement = configuration.edgeLabelPlacement ?? 'ignore'

  return layout
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!LayoutDescriptor}
 */
export function getLayoutDescriptor(configuration) {
  const descriptor = {
    ...configuration,
    properties: { ...configuration.properties },
  }
  if (
    configuration.name === 'OrganicLayout' ||
    configuration.name === 'HierarchicalLayout'
  ) {
    const properties = descriptor.properties
    delete properties.gridColumns
    delete properties.gridRows
  }
  return descriptor
}
