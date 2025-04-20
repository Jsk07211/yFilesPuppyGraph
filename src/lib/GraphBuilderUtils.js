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

import {
  LabelStyle,
  Fill,
  GroupNodeLabelModel,
  ILabelModelParameter,
  InteriorNodeLabelModel,
  LabelCreator,
  NinePositionsEdgeLabelModel,
  ObjectBindings,
} from '@yfiles/yfiles'

export /**
 * @readonly
 * @enum {number}
 */
const LabelPlacement = {
  TopLeft: 'topleft',
  Top: 'top',
  TopRight: 'topright',
  Left: 'left',
  Center: 'center',
  Right: 'right',
  Bottom: 'bottom',
  BottomLeft: 'bottomleft',
  BottomRight: 'bottomright',
  SourceAbove: 'sourceabove',
  CenteredAbove: 'centeredabove',
  TargetAbove: 'targetabove',
  SourceCentered: 'sourcecentered',
  CenterCentered: 'centercentered',
  TargetCentered: 'targetcentered',
  SourceBelow: 'sourcebelow',
  CenteredBelow: 'centeredbelow',
  TargetBelow: 'targetbelow',
}

/**
 * @param {!string} placement
 */
export function asLayoutParameterForNodes(placement) {
  if (!placement) {
    return InteriorNodeLabelModel.CENTER
  }
  placement.replace('_', '')
  switch (placement.toLowerCase()) {
    case LabelPlacement.TopLeft:
      return InteriorNodeLabelModel.TOP_LEFT
    case LabelPlacement.Top:
      return InteriorNodeLabelModel.TOP
    case LabelPlacement.TopRight:
      return InteriorNodeLabelModel.TOP_RIGHT
    case LabelPlacement.Left:
      return InteriorNodeLabelModel.LEFT
    case LabelPlacement.Center:
      return InteriorNodeLabelModel.CENTER
    case LabelPlacement.Right:
      return InteriorNodeLabelModel.RIGHT
    case LabelPlacement.BottomLeft:
      return InteriorNodeLabelModel.BOTTOM_LEFT
    case LabelPlacement.Bottom:
      return InteriorNodeLabelModel.BOTTOM
    case LabelPlacement.BottomRight:
      return InteriorNodeLabelModel.BOTTOM_RIGHT
    default:
      return InteriorNodeLabelModel.CENTER
  }
}

/**
 * @param {!string} placement
 */
export function asLayoutParameterForGroupNodes(placement) {
  // we just let the label sit in the tab position
  return new GroupNodeLabelModel().createTabParameter()
}

/**
 * @param {!string} placement
 */
export function asLayoutParameterForEdges(placement) {
  if (!placement) {
    return NinePositionsEdgeLabelModel.CENTER_BELOW
  }
  placement.replace('_', '')
  switch (placement.toLowerCase()) {
    case LabelPlacement.TopLeft:
    case LabelPlacement.SourceAbove:
      return NinePositionsEdgeLabelModel.SOURCE_ABOVE
    case LabelPlacement.CenteredAbove:
    case LabelPlacement.Top:
      return NinePositionsEdgeLabelModel.CENTER_ABOVE
    case LabelPlacement.TargetAbove:
    case LabelPlacement.TopRight:
      return NinePositionsEdgeLabelModel.TARGET_ABOVE
    case LabelPlacement.SourceCentered:
    case LabelPlacement.Left:
      return NinePositionsEdgeLabelModel.SOURCE_CENTERED
    case LabelPlacement.CenterCentered:
    case LabelPlacement.Center:
      return NinePositionsEdgeLabelModel.CENTER_CENTERED
    case LabelPlacement.TargetCentered:
    case LabelPlacement.Right:
      return NinePositionsEdgeLabelModel.TARGET_CENTERED
    case LabelPlacement.SourceBelow:
    case LabelPlacement.BottomLeft:
      return NinePositionsEdgeLabelModel.SOURCE_BELOW
    case LabelPlacement.CenteredBelow:
    case LabelPlacement.Bottom:
      return NinePositionsEdgeLabelModel.CENTER_BELOW
    case LabelPlacement.TargetBelow:
    case LabelPlacement.BottomRight:
      return NinePositionsEdgeLabelModel.TARGET_BELOW
    default:
      return NinePositionsEdgeLabelModel.CENTER_BELOW
  }
}

/**
 * @typedef {Object} LabelConfiguration
 * @property {function} [labelsBinding]
 * @property {function} [textBinding]
 * @property {function} [placement]
 * @property {function} [fill]
 */

/**
 * @template T
 * @param {!LabelConfiguration.<T>} labelConfiguration
 * @param {!LabelCreator.<T>} labelCreator
 * @param {!function} layoutParameterProvider
 */
export function configureLabelCreator(
  labelConfiguration,
  labelCreator,
  layoutParameterProvider
) {
  labelCreator.defaults.style = new LabelStyle()
  labelCreator.defaults.shareStyleInstance = false

  const placementBinding = labelConfiguration.placement
  if (placementBinding) {
    labelCreator.layoutParameterProvider = (item) => {
      return layoutParameterProvider(placementBinding(item))
    }
  }
  maybeAddBinding(
    labelCreator.styleBindings,
    'textFill',
    labelConfiguration.fill
  )
}

/**
 * @param {!ObjectBindings.<unknown>} bindings
 * @param {!string} [propertyName=fill]
 * @param {*} provider
 */
export function maybeAddBinding(bindings, propertyName = 'fill', provider) {
  if (provider) {
    bindings.addBinding(propertyName, provider)
  }
}
