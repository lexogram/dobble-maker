/**
 * DobbleReducer.jsx
 * 
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */


import {
  layouts, // won't change
  getSet,
  imageSets, // won't change
  getImageSet
} from '../data/filterData.js'



const initialState = selectImageSet(
  { imageSets }, imageSets[0]
)



const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "SELECT_IMAGE_SET":
      return selectImageSet(state, payload)

      case "SELECT_LAYOUT_NAME":
        return selectLayout(state, payload)
  
    default:
      return {...state}
  }
}



function selectImageSet( state, imageSet ) {
  const images = getImageSet(imageSet)
  const { set, imageCount } = getSet(images.length)
  const layoutsForThisSize = layouts[imageCount]
  const layoutNames = Object.keys(layoutsForThisSize)
  const layoutName = layoutNames[0]
  const layout = layoutsForThisSize[layoutName]

  return { 
    ...state,
    imageSet,
    images,
    set,
    layoutsForThisSize,
    layoutNames,
    layoutName,
    layout
 }
}



function selectLayout( state, layoutName ) {
  const layout = state.layoutsForThisSize[layoutName]

  return { ...state, layoutName, layout }
}



export { initialState, reducer }
