import {
  $,
  Se2 as Se,
  he2 as he
} from "./chunk-4DZQ2NHH.js";
import {
  Fragment,
  Transition,
  cloneVNode,
  computed,
  createCommentVNode,
  defineComponent,
  getCurrentScope,
  h,
  inject,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  provide,
  ref,
  shallowReadonly,
  shallowRef,
  toRef,
  unref,
  watch,
  watchEffect
} from "./chunk-6OATIWET.js";
import "./chunk-3F74YA3Z.js";

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
var autoPlacement = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map((d) => {
        const alignment2 = getAlignment(d.placement);
        return [d.placement, alignment2 && crossAxis ? (
          // Check along the mainAxis and main crossAxis side.
          d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
        ) : (
          // Check only the mainAxis.
          d.overflows[0]
        ), d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d) => d[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        getAlignment(d[0]) ? 2 : 3
      ).every((v) => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e2) {
  }
  try {
    return element.matches(":modal");
  } catch (_e2) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x = ($2 ? round(rect.width) : rect.width) / width;
  let y = ($2 ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e2) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var autoPlacement2 = autoPlacement;
var shift2 = shift;
var flip2 = flip;
var hide2 = hide;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function isComponentPublicInstance(target) {
  return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement2(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode(element) && getNodeName(element) === "#comment" ? null : element;
  }
  return target;
}
function toValue(source) {
  return typeof source === "function" ? source() : unref(source);
}
function arrow3(options) {
  return {
    name: "arrow",
    options,
    fn(args) {
      const element = unwrapElement2(toValue(options.element));
      if (element == null) {
        return {};
      }
      return arrow2({
        element,
        padding: options.padding
      }).fn(args);
    }
  };
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = computed(() => {
    var _toValue;
    return (_toValue = toValue(options.open)) != null ? _toValue : true;
  });
  const middlewareOption = computed(() => toValue(options.middleware));
  const placementOption = computed(() => {
    var _toValue2;
    return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : "bottom";
  });
  const strategyOption = computed(() => {
    var _toValue3;
    return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : "absolute";
  });
  const transformOption = computed(() => {
    var _toValue4;
    return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
  });
  const referenceElement = computed(() => unwrapElement2(reference.value));
  const floatingElement = computed(() => unwrapElement2(floating.value));
  const x = ref(0);
  const y = ref(0);
  const strategy = ref(strategyOption.value);
  const placement = ref(placementOption.value);
  const middlewareData = shallowRef({});
  const isPositioned = ref(false);
  const floatingStyles = computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: "0",
      top: "0"
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: "translate(" + xVal + "px, " + yVal + "px)",
        ...getDPR(floatingElement.value) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy.value,
      left: xVal + "px",
      top: yVal + "px"
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    const open = openOption.value;
    computePosition2(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then((position) => {
      x.value = position.x;
      y.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      isPositioned.value = open !== false;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === "function") {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = void 0;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === void 0) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  watch([middlewareOption, placementOption, strategyOption, openOption], update, {
    flush: "sync"
  });
  watch([referenceElement, floatingElement], attach, {
    flush: "sync"
  });
  watch(openOption, reset, {
    flush: "sync"
  });
  if (getCurrentScope()) {
    onScopeDispose(cleanup);
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update
  };
}

// node_modules/@headlessui-float/vue/dist/headlessui-float.mjs
var he2 = Object.defineProperty;
var pe = (e, r, o) => r in e ? he2(e, r, { enumerable: true, configurable: true, writable: true, value: o }) : e[r] = o;
var G = (e, r, o) => pe(e, typeof r != "symbol" ? r + "" : r, o);
function B(e) {
  return e == null || e.value == null ? null : e.value instanceof Node ? e.value : "$el" in e.value && e.value.$el ? B(ref(e.value.$el)) : "getBoundingClientRect" in e.value ? e.value : null;
}
function He(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function K(e, r) {
  const o = He(e);
  return Math.round(r * o) / o;
}
function L(e) {
  return e.reduce((r, o) => o.type === Fragment ? r.concat(L(o.children)) : r.concat(o), []);
}
function I(e) {
  return e == null ? false : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
function Q(e) {
  return e = unref(e), e && (e == null ? void 0 : e.nodeType) !== Node.COMMENT_NODE;
}
var Ie = class {
  constructor() {
    G(this, "current", this.detect());
  }
  set(r) {
    this.current !== r && (this.current = r);
  }
  reset() {
    this.set(this.detect());
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
};
var X = new Ie();
function ne(e) {
  if (X.isServer) return null;
  if (e instanceof Node) return e.ownerDocument;
  if (e && Object.prototype.hasOwnProperty.call(e, "value")) {
    const r = B(e);
    if (r) return r.ownerDocument;
  }
  return document;
}
function Y(e, r) {
  !r.vueTransition && (r.transitionName || r.transitionType) && console.warn(`[headlessui-float]: <${e} /> pass "transition-name" or "transition-type" prop, must be set "vue-transition" prop.`);
}
function Ue(e, r, o, a, t) {
  watch([
    () => t.offset,
    () => t.flip,
    () => t.shift,
    () => t.autoPlacement,
    () => t.arrow,
    () => t.hide,
    () => t.middleware
  ], () => {
    const i = [];
    (typeof t.offset == "number" || typeof t.offset == "object" || typeof t.offset == "function") && i.push(offset2(t.offset)), (t.flip === true || typeof t.flip == "number" || typeof t.flip == "object") && i.push(flip2({
      padding: typeof t.flip == "number" ? t.flip : void 0,
      ...typeof t.flip == "object" ? t.flip : {}
    })), (t.shift === true || typeof t.shift == "number" || typeof t.shift == "object") && i.push(shift2({
      padding: typeof t.shift == "number" ? t.shift : void 0,
      ...typeof t.shift == "object" ? t.shift : {}
    })), (t.autoPlacement === true || typeof t.autoPlacement == "object") && i.push(autoPlacement2(
      typeof t.autoPlacement == "object" ? t.autoPlacement : void 0
    )), i.push(...typeof t.middleware == "function" ? t.middleware({
      referenceEl: r,
      floatingEl: o
    }) : t.middleware || []), (t.arrow === true || typeof t.arrow == "number") && i.push(arrow3({
      element: a,
      padding: t.arrow === true ? 0 : t.arrow
    })), (t.hide === true || typeof t.hide == "object" || Array.isArray(t.hide)) && (Array.isArray(t.hide) ? t.hide : [t.hide]).forEach((u) => {
      i.push(hide2(
        typeof u == "object" ? u : void 0
      ));
    }), e.value = i;
  }, { immediate: true });
}
function ze(e, r, o) {
  let a = () => {
  };
  onMounted(() => {
    if (e && X.isClient && typeof ResizeObserver < "u" && r.value && r.value instanceof Element) {
      const t = new ResizeObserver(([i]) => {
        o.value = i.borderBoxSize.reduce((u, { inlineSize: s }) => u + s, 0);
      });
      t.observe(r.value), a = () => {
        t.disconnect(), o.value = null;
      };
    }
  }), onBeforeUnmount(() => {
    a();
  });
}
var st = [
  "origin-bottom",
  "origin-top",
  "origin-right",
  "origin-left",
  "origin-bottom-left",
  "origin-bottom-right",
  "origin-top-left",
  "origin-top-right"
];
var De = (e) => {
  switch (e) {
    case "top":
      return "origin-bottom";
    case "bottom":
      return "origin-top";
    case "left":
      return "origin-right";
    case "right":
      return "origin-left";
    case "top-start":
    case "right-end":
      return "origin-bottom-left";
    case "top-end":
    case "left-end":
      return "origin-bottom-right";
    case "right-start":
    case "bottom-start":
      return "origin-top-left";
    case "left-start":
    case "bottom-end":
      return "origin-top-right";
    default:
      return "origin-center";
  }
};
var ut = [
  "origin-bottom",
  "origin-top",
  "ltr:origin-right rtl:origin-left",
  "ltr:origin-left rtl:origin-right",
  "ltr:origin-bottom-left rtl:origin-bottom-right",
  "ltr:origin-bottom-right rtl:origin-bottom-left",
  "ltr:origin-top-left rtl:origin-top-right",
  "ltr:origin-top-right rtl:origin-top-left"
];
var ft = (e) => {
  switch (e) {
    case "top":
      return "origin-bottom";
    case "bottom":
      return "origin-top";
    case "left":
      return "ltr:origin-right rtl:origin-left";
    case "right":
      return "ltr:origin-left rtl:origin-right";
    case "top-start":
    case "right-end":
      return "ltr:origin-bottom-left rtl:origin-bottom-right";
    case "top-end":
    case "left-end":
      return "ltr:origin-bottom-right rtl:origin-bottom-left";
    case "right-start":
    case "bottom-start":
      return "ltr:origin-top-left rtl:origin-top-right";
    case "left-start":
    case "bottom-end":
      return "ltr:origin-top-right rtl:origin-top-left";
    default:
      return "origin-center";
  }
};
function Me(e, r) {
  const o = computed(() => {
    if (typeof e.originClass == "function")
      return e.originClass(r.value);
    if (typeof e.originClass == "string")
      return e.originClass;
    if (e.tailwindcssOriginClass)
      return De(r.value);
  }), a = computed(
    () => e.enter || o.value ? `${e.enter || ""} ${o.value || ""}` : void 0
  ), t = computed(
    () => e.leave || o.value ? `${e.leave || ""} ${o.value || ""}` : void 0
  );
  return { originClassRef: o, enterActiveClassRef: a, leaveActiveClassRef: t };
}
function re(e, r, ...o) {
  if (e in r) {
    const t = r[e];
    return typeof t == "function" ? t(...o) : t;
  }
  const a = new Error(
    `Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      r
    ).map((t) => `"${t}"`).join(", ")}.`
  );
  throw Error.captureStackTrace && Error.captureStackTrace(a, re), a;
}
var Z = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])"
].map(
  // TODO: Remove this once JSDOM fixes the issue where an element that is
  // "hidden" can be the document.activeElement, because this is not possible
  // in real browsers.
  false ? (e) => `${e}:not([tabindex='-1']):not([style*='display: none'])` : (e) => `${e}:not([tabindex='-1'])`
).join(",");
var oe = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(oe || {});
function $e(e, r = 0) {
  var o;
  return e === ((o = ne(e)) == null ? void 0 : o.body) ? false : re(r, {
    0() {
      return e.matches(Z);
    },
    1() {
      let a = e;
      for (; a !== null; ) {
        if (a.matches(Z)) return true;
        a = a.parentElement;
      }
      return false;
    }
  });
}
function C(e, r, o) {
  X.isServer || watchEffect((a) => {
    document.addEventListener(e, r, o), a(() => document.removeEventListener(e, r, o));
  });
}
function ke(e, r, o = computed(() => true)) {
  function a(i, u) {
    if (!o.value || i.defaultPrevented) return;
    const s = u(i);
    if (s === null || !s.getRootNode().contains(s)) return;
    const d = function f(c) {
      return typeof c == "function" ? f(c()) : Array.isArray(c) || c instanceof Set ? c : [c];
    }(e);
    for (const f of d) {
      if (f === null) continue;
      const c = f instanceof HTMLElement ? f : B(f);
      if (c != null && c.contains(s) || i.composed && i.composedPath().includes(c))
        return;
    }
    return (
      // This check alllows us to know whether or not we clicked on a "focusable" element like a
      // button or an input. This is a backwards compatibility check so that you can open a <Menu
      // /> and click on another <Menu /> which should close Menu A and open Menu B. We might
      // revisit that so that you will require 2 clicks instead.
      !$e(s, oe.Loose) && // This could be improved, but the `Combobox.Button` adds tabIndex={-1} to make it
      // unfocusable via the keyboard so that tabbing to the next item from the input doesn't
      // first go to the button.
      s.tabIndex !== -1 && i.preventDefault(), r(i, s)
    );
  }
  const t = ref(null);
  C("mousedown", (i) => {
    var u, s;
    o.value && (t.value = ((s = (u = i.composedPath) == null ? void 0 : u.call(i)) == null ? void 0 : s[0]) || i.target);
  }, true), C(
    "click",
    (i) => {
      t.value && (a(i, () => t.value), t.value = null);
    },
    // We will use the `capture` phase so that layers in between with `event.stopPropagation()`
    // don't "cancel" this outside click check. E.g.: A `Menu` inside a `DialogPanel` if the `Menu`
    // is open, and you click outside of it in the `DialogPanel` the `Menu` should close. However,
    // the `DialogPanel` has a `onClick(e) { e.stopPropagation() }` which would cancel this.
    true
  ), C("blur", (i) => a(
    i,
    () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null
  ), true);
}
var ae = Symbol("ReferenceContext");
var ie = Symbol("FloatingContext");
var le = Symbol("ArrowContext");
function se(e) {
  const r = inject(ae, null);
  if (r === null) {
    const o = new Error(`<${e} /> must be in the <Float /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, se), o;
  }
  return r;
}
function ue(e) {
  const r = inject(ie, null);
  if (r === null) {
    const o = new Error(`<${e} /> must be in the <Float /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, ue), o;
  }
  return r;
}
function fe(e) {
  const r = inject(le, null);
  if (r === null) {
    const o = new Error(`<${e} /> must be in the <Float /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, fe), o;
  }
  return r;
}
var n = {
  as: {
    type: [String, Function],
    default: "template"
  },
  floatingAs: {
    type: [String, Function],
    default: "div"
  },
  show: {
    type: Boolean,
    default: null
  },
  placement: {
    type: String,
    default: "bottom-start"
  },
  strategy: {
    type: String,
    default: "absolute"
  },
  offset: [Number, Function, Object],
  shift: {
    type: [Boolean, Number, Object],
    default: false
  },
  flip: {
    type: [Boolean, Number, Object],
    default: false
  },
  arrow: {
    type: [Boolean, Number],
    default: false
  },
  autoPlacement: {
    type: [Boolean, Object],
    default: false
  },
  hide: {
    type: [Boolean, Object, Array],
    default: false
  },
  referenceHiddenClass: String,
  escapedClass: String,
  autoUpdate: {
    type: [Boolean, Object],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 9999
  },
  vueTransition: {
    type: Boolean,
    default: false
  },
  transitionName: String,
  transitionType: String,
  enter: String,
  enterFrom: String,
  enterTo: String,
  leave: String,
  leaveFrom: String,
  leaveTo: String,
  originClass: [String, Function],
  tailwindcssOriginClass: {
    type: Boolean,
    default: false
  },
  portal: {
    type: Boolean,
    default: false
  },
  transform: {
    type: Boolean,
    default: false
  },
  adaptiveWidth: {
    type: [Boolean, Object],
    default: false
  },
  composable: {
    type: Boolean,
    default: false
  },
  dialog: {
    type: Boolean,
    default: false
  },
  middleware: {
    type: [Array, Function],
    default: () => []
  }
};
function ce(e, r, o, a) {
  const { referenceRef: t } = a, i = r, u = mergeProps(o, {
    ref: t
  }), s = cloneVNode(
    e,
    i.as === "template" ? u : {}
  );
  return i.as === "template" ? s : typeof i.as == "string" ? h(i.as, u, [s]) : h(i.as, u, () => [s]);
}
function _(e, r, o, a) {
  const { floatingRef: t, props: i, mounted: u, show: s, referenceHidden: d, escaped: f, placement: c, floatingStyles: p, referenceElWidth: y, updateFloating: T } = a, l = mergeProps(
    { ...i, as: i.floatingAs },
    r
  ), { enterActiveClassRef: g, leaveActiveClassRef: m } = Me(l, c), F = {
    show: u.value ? l.show : false,
    enter: g.value,
    enterFrom: l.enterFrom,
    enterTo: l.enterTo,
    leave: m.value,
    leaveFrom: l.leaveFrom,
    leaveTo: l.leaveTo,
    onBeforeEnter() {
      s.value = true;
    },
    onAfterLeave() {
      s.value = false;
    }
  }, x = {
    name: l.transitionName,
    type: l.transitionType,
    appear: true,
    ...l.transitionName ? {} : {
      enterActiveClass: g.value,
      enterFromClass: l.enterFrom,
      enterToClass: l.enterTo,
      leaveActiveClass: m.value,
      leaveFromClass: l.leaveFrom,
      leaveToClass: l.leaveTo
    },
    onBeforeEnter() {
      s.value = true;
    },
    onAfterLeave() {
      s.value = false;
    }
  }, E = {
    class: [
      d.value ? l.referenceHiddenClass : void 0,
      f.value ? l.escapedClass : void 0
    ].filter((v) => !!v).join(" "),
    style: {
      ...p.value,
      zIndex: l.zIndex
    }
  };
  if (l.adaptiveWidth && typeof y.value == "number") {
    const v = {
      attribute: "width",
      ...typeof l.adaptiveWidth == "object" ? l.adaptiveWidth : {}
    };
    E.style[v.attribute] = `${y.value}px`;
  }
  function z(v) {
    return l.portal ? u.value ? h($, () => v) : createCommentVNode() : v;
  }
  function D(v) {
    const A = mergeProps(
      E,
      o,
      l.dialog ? {} : { ref: t }
    );
    return l.as === "template" ? v : typeof l.as == "string" ? h(l.as, A, v) : h(l.as, A, () => v);
  }
  function V() {
    function v() {
      var H;
      const A = l.as === "template" ? mergeProps(
        E,
        o,
        l.dialog ? {} : { ref: t }
      ) : null, j = cloneVNode(e, A);
      return ((H = e.props) == null ? void 0 : H.unmount) === false ? (T(), j) : l.vueTransition && l.show === false ? createCommentVNode() : j;
    }
    return u.value ? l.vueTransition ? h(Transition, {
      ...l.dialog ? { ref: t } : {},
      ...x
    }, v) : h(l.transitionChild ? he : Se, {
      key: `placement-${c.value}`,
      ...l.dialog ? { ref: t } : {},
      as: "template",
      ...F
    }, v) : createCommentVNode();
  }
  return z(
    D(
      V()
    )
  );
}
function de(e, r, o, a, t) {
  const i = ref(false), u = toRef(a, "placement"), s = toRef(a, "strategy"), d = shallowRef({}), f = ref(void 0), c = ref(void 0), p = ref(null), y = ref(void 0), T = ref(void 0), l = computed(() => B(r)), g = computed(() => B(o)), m = computed(
    () => Q(l) && Q(g)
  ), { placement: F, middlewareData: x, isPositioned: E, floatingStyles: z, update: D } = useFloating(l, g, {
    placement: u,
    strategy: s,
    middleware: d,
    // If enable dialog mode, then set `transform` to false.
    transform: a.dialog ? false : a.transform,
    // Fix transition not smooth bug when dialog mode enabled.
    whileElementsMounted: a.dialog ? () => () => {
    } : void 0
  }), V = ref(null);
  onMounted(() => {
    i.value = true;
  }), watch(e, (w, S) => {
    w && !S ? t("show") : !w && S && t("hide");
  }, { immediate: true });
  function v() {
    m.value && (D(), t("update"));
  }
  watch([u, s, d], v, { flush: "sync" }), Ue(
    d,
    l,
    g,
    p,
    a
  ), watch([x, () => a.hide, E], () => {
    var w, S;
    (a.hide === true || typeof a.hide == "object" || Array.isArray(a.hide)) && (f.value = ((w = x.value.hide) == null ? void 0 : w.referenceHidden) || !E.value, c.value = (S = x.value.hide) == null ? void 0 : S.escaped);
  }), watch(x, () => {
    const w = x.value.arrow;
    y.value = w == null ? void 0 : w.x, T.value = w == null ? void 0 : w.y;
  }), ze(!!a.adaptiveWidth, l, V), watch([e, m], async (w, S, ve) => {
    if (await nextTick(), e.value && m.value && a.autoUpdate) {
      const ge = autoUpdate(
        l.value,
        g.value,
        v,
        typeof a.autoUpdate == "object" ? a.autoUpdate : void 0
      );
      ve(ge);
    }
  }, { flush: "post", immediate: true });
  const A = ref(true);
  watch(l, () => {
    !(l.value instanceof Element) && m.value && A.value && (A.value = false, window.requestAnimationFrame(() => {
      A.value = true, v();
    }));
  }, { flush: "sync" });
  const j = {
    referenceRef: r,
    placement: F
  }, H = {
    floatingRef: o,
    props: a,
    mounted: i,
    show: e,
    referenceHidden: f,
    escaped: c,
    placement: F,
    floatingStyles: z,
    referenceElWidth: V,
    updateFloating: v
  }, q = {
    ref: p,
    placement: F,
    x: y,
    y: T
  };
  return provide(le, q), { referenceApi: j, floatingApi: H, arrowApi: q, placement: F, referenceEl: l, floatingEl: g, middlewareData: x, update: v };
}
var We = defineComponent({
  name: "Float",
  inheritAttrs: false,
  props: n,
  emits: ["show", "hide", "update"],
  setup(e, { emit: r, slots: o, attrs: a }) {
    Y("Float", e);
    const t = ref(e.show ?? false), i = ref(null), u = ref(null), {
      referenceApi: s,
      floatingApi: d,
      placement: f
    } = de(t, i, u, e, r);
    function c(y) {
      return e.as === "template" ? y : typeof e.as == "string" ? h(e.as, a, y) : h(e.as, a, () => y);
    }
    const p = {
      placement: f.value
    };
    return e.composable || e.dialog ? (provide(ae, s), provide(ie, d), () => {
      if (o.default)
        return c(o.default(p));
    }) : () => {
      if (!o.default) return;
      const [y, T] = L(o.default(p)).filter(I);
      if (!I(y))
        return;
      const l = ce(
        y,
        { as: "template" },
        {},
        s
      ), g = _(
        T,
        { as: e.floatingAs },
        {},
        d
      );
      return c([
        l,
        g
      ]);
    };
  }
});
var Le = We;
var Xe = {
  as: n.as
};
var Ye = defineComponent({
  name: "FloatReference",
  inheritAttrs: false,
  props: Xe,
  setup(e, { slots: r, attrs: o }) {
    const a = se("FloatReference"), { placement: t } = a;
    return () => {
      if (!r.default) return;
      const i = {
        placement: t.value
      };
      return ce(
        r.default(i)[0],
        e,
        o,
        a
      );
    };
  }
});
var ct = Ye;
var ee = {
  as: n.floatingAs,
  vueTransition: n.vueTransition,
  transitionName: n.transitionName,
  transitionType: n.transitionType,
  enter: n.enter,
  enterFrom: n.enterFrom,
  enterTo: n.enterTo,
  leave: n.leave,
  leaveFrom: n.leaveFrom,
  leaveTo: n.leaveTo,
  originClass: n.originClass,
  tailwindcssOriginClass: n.tailwindcssOriginClass,
  transitionChild: {
    type: Boolean,
    default: false
  }
};
var _e = defineComponent({
  name: "FloatContent",
  inheritAttrs: false,
  props: ee,
  setup(e, { slots: r, attrs: o }) {
    Y("FloatContent", e);
    const a = ue("FloatContent"), { placement: t } = a;
    return () => {
      if (!r.default) return;
      const i = {
        placement: t.value
      }, u = Object.entries(e).reduce((s, [d, f]) => {
        const c = ee;
        return (typeof c[d] == "object" && f === c[d].default || f === void 0) && delete s[d], s;
      }, { ...e });
      return _(
        r.default(i)[0],
        u,
        o,
        a
      );
    };
  }
});
var dt = _e;
var qe = {
  as: {
    ...n.as,
    default: "div"
  },
  offset: {
    type: Number,
    default: 4
  }
};
var Ge = defineComponent({
  name: "FloatArrow",
  props: qe,
  setup(e, { slots: r, attrs: o }) {
    const { ref: a, placement: t, x: i, y: u } = fe("FloatArrow");
    return () => {
      var f;
      const s = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[t.value.split("-")[0]], d = {
        left: a.value && typeof i.value == "number" ? `${K(a.value, i.value)}px` : void 0,
        top: a.value && typeof u.value == "number" ? `${K(a.value, u.value)}px` : void 0,
        right: void 0,
        bottom: void 0,
        [s]: `${e.offset * -1}px`
      };
      if (e.as === "template") {
        const c = {
          placement: t.value
        }, p = (f = r.default) == null ? void 0 : f.call(r, c)[0];
        return !p || !I(p) ? void 0 : cloneVNode(p, { ref: a, style: d });
      }
      return h(e.as, mergeProps(o, { ref: a, style: d }));
    };
  }
});
var mt = Ge;
var Je = {
  as: n.as,
  show: n.show,
  placement: n.placement,
  strategy: n.strategy,
  offset: n.offset,
  shift: n.shift,
  flip: n.flip,
  arrow: n.arrow,
  autoPlacement: n.autoPlacement,
  autoUpdate: n.autoUpdate,
  zIndex: n.zIndex,
  vueTransition: n.vueTransition,
  transitionName: n.transitionName,
  transitionType: n.transitionType,
  enter: n.enter,
  enterFrom: n.enterFrom,
  enterTo: n.enterTo,
  leave: n.leave,
  leaveFrom: n.leaveFrom,
  leaveTo: n.leaveTo,
  originClass: n.originClass,
  tailwindcssOriginClass: n.tailwindcssOriginClass,
  portal: n.portal,
  transform: n.transform,
  middleware: n.middleware
};
var Ke = defineComponent({
  name: "FloatVirtual",
  inheritAttrs: false,
  props: Je,
  emits: ["initial", "show", "hide", "update"],
  setup(e, { emit: r, slots: o, attrs: a }) {
    Y("FloatVirtual", e);
    const t = ref(e.show ?? false), i = ref({
      getBoundingClientRect() {
        return {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: 0,
          height: 0
        };
      }
    }), u = ref(null), {
      floatingApi: s,
      placement: d
    } = de(t, i, u, e, r);
    watch(() => e.show, () => {
      t.value = e.show ?? false;
    });
    function f() {
      t.value = false;
    }
    return r("initial", {
      show: t,
      placement: d,
      reference: i,
      floating: u
    }), () => {
      if (!o.default) return;
      const c = {
        placement: d.value,
        close: f
      }, [p] = L(o.default(c)).filter(I);
      return _(
        p,
        {
          as: e.as,
          show: t.value
        },
        a,
        s
      );
    };
  }
});
var me = Ke;
var Qe = {
  as: n.as,
  placement: n.placement,
  strategy: n.strategy,
  offset: n.offset,
  shift: n.shift,
  flip: {
    ...n.flip,
    default: true
  },
  arrow: n.arrow,
  autoPlacement: n.autoPlacement,
  autoUpdate: n.autoUpdate,
  zIndex: n.zIndex,
  vueTransition: n.vueTransition,
  transitionName: n.transitionName,
  transitionType: n.transitionType,
  enter: n.enter,
  enterFrom: n.enterFrom,
  enterTo: n.enterTo,
  leave: n.leave,
  leaveFrom: n.leaveFrom,
  leaveTo: n.leaveTo,
  originClass: n.originClass,
  tailwindcssOriginClass: n.tailwindcssOriginClass,
  transform: n.transform,
  middleware: n.middleware
};
var Ze = defineComponent({
  name: "FloatContextMenu",
  inheritAttrs: false,
  props: Qe,
  emits: ["show", "hide", "update"],
  setup(e, { emit: r, slots: o, attrs: a }) {
    const t = ref(false);
    function i({ show: u, reference: s, floating: d }) {
      C("contextmenu", (f) => {
        f.preventDefault(), s.value = {
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: f.clientX,
              y: f.clientY,
              top: f.clientY,
              left: f.clientX,
              right: f.clientX,
              bottom: f.clientY
            };
          }
        }, u.value = true;
      }), ke(d, () => {
        u.value = false;
      }, computed(() => u.value));
    }
    return onMounted(() => {
      t.value = true;
    }), () => {
      if (o.default && t.value)
        return h(me, {
          ...e,
          ...a,
          portal: true,
          onInitial: i,
          onShow: () => r("show"),
          onHide: () => r("hide"),
          onUpdate: () => r("update")
        }, o.default);
    };
  }
});
var vt = Ze;
var et = {
  as: n.as,
  placement: n.placement,
  strategy: n.strategy,
  offset: n.offset,
  shift: n.shift,
  flip: n.flip,
  arrow: n.arrow,
  autoPlacement: n.autoPlacement,
  autoUpdate: n.autoUpdate,
  zIndex: n.zIndex,
  vueTransition: n.vueTransition,
  transitionName: n.transitionName,
  transitionType: n.transitionType,
  enter: n.enter,
  enterFrom: n.enterFrom,
  enterTo: n.enterTo,
  leave: n.leave,
  leaveFrom: n.leaveFrom,
  leaveTo: n.leaveTo,
  originClass: n.originClass,
  tailwindcssOriginClass: n.tailwindcssOriginClass,
  transform: n.transform,
  middleware: n.middleware,
  globalHideCursor: {
    type: Boolean,
    default: true
  }
};
var tt = defineComponent({
  name: "FloatCursor",
  inheritAttrs: false,
  props: et,
  emits: ["show", "hide", "update"],
  setup({ globalHideCursor: e, ...r }, { emit: o, slots: a, attrs: t }) {
    const i = ref(false);
    function u({ show: s, reference: d, floating: f }) {
      function c() {
        s.value = true;
      }
      function p() {
        s.value = false;
      }
      function y(m) {
        d.value = {
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: m.clientX,
              y: m.clientY,
              top: m.clientY,
              left: m.clientX,
              right: m.clientX,
              bottom: m.clientY
            };
          }
        };
      }
      function T(m) {
        c(), y(m);
      }
      function l(m) {
        c(), y(m.touches[0]);
      }
      const g = ne(f);
      g && (watchEffect((m) => {
        if (e && !g.getElementById("headlesui-float-cursor-style")) {
          const F = g.createElement("style");
          (g.head || g.getElementsByTagName("head")[0]).appendChild(F), F.id = "headlesui-float-cursor-style", F.appendChild(g.createTextNode([
            "*, *::before, *::after {",
            "  cursor: none !important;",
            "}",
            ".headlesui-float-cursor-root {",
            "  pointer-events: none !important;",
            "}"
          ].join(`
`))), m(() => {
            var E;
            return (E = g.getElementById("headlesui-float-cursor-style")) == null ? void 0 : E.remove();
          });
        }
      }, { flush: "post" }), "ontouchstart" in window || navigator.maxTouchPoints > 0 ? (C("touchstart", l), C("touchend", p), C("touchmove", l)) : (C("mouseenter", T), C("mouseleave", p), C("mousemove", T)));
    }
    return onMounted(() => {
      i.value = true;
    }), () => {
      if (a.default && i.value)
        return h(me, {
          ...r,
          ...t,
          portal: true,
          class: "headlesui-float-cursor-root",
          onInitial: u,
          onShow: () => o("show"),
          onHide: () => o("hide"),
          onUpdate: () => o("update")
        }, a.default);
    };
  }
});
var gt = tt;
function ht(e) {
  return defineComponent({
    name: "HighOrderFloat",
    setup(o, { slots: a }) {
      return () => h(Le, mergeProps(
        e,
        o
      ), a);
    }
  });
}
var nt = [
  "Float",
  "FloatArrow",
  "FloatContent",
  "FloatReference"
];
function pt(e = {}) {
  const { prefix: r = "" } = e;
  return {
    type: "component",
    resolve: (o) => {
      if (o.startsWith(r)) {
        const a = o.substring(r.length);
        if (nt.includes(a))
          return {
            name: a,
            from: "@headlessui-float/vue"
          };
      }
    }
  };
}
export {
  Le as Float,
  mt as FloatArrow,
  qe as FloatArrowPropsValidators,
  dt as FloatContent,
  ee as FloatContentPropsValidators,
  vt as FloatContextMenu,
  Qe as FloatContextMenuPropsValidators,
  gt as FloatCursor,
  et as FloatCursorPropsValidators,
  n as FloatPropsValidators,
  ct as FloatReference,
  Xe as FloatReferencePropsValidators,
  me as FloatVirtual,
  Je as FloatVirtualPropsValidators,
  pt as HeadlessUiFloatResolver,
  ht as createHighOrderFloatComponent,
  _ as renderFloatingElement,
  ce as renderReferenceElement,
  De as tailwindcssOriginClassResolver,
  st as tailwindcssOriginSafelist,
  ft as tailwindcssRtlOriginClassResolver,
  ut as tailwindcssRtlOriginSafelist,
  de as useFloat,
  ke as useOutsideClick
};
//# sourceMappingURL=@headlessui-float_vue.js.map
