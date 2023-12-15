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


const page = window.location.pathname.replace(/^\//, "")
// console.log("page:", page);



const initialState = selectImageSet(
  { page, imageSets, showDialog: false }, imageSets[0]
)



const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "SET_PAGE":
      return setPage(state, payload)

    case "SELECT_IMAGE_SET":
      return selectImageSet(state, payload)
  
    case "SELECT_LAYOUT_NAME":
      return selectLayout(state, payload)

    case "TOGGLE_DIALOG":
      return toggleDialog(state, payload)

    default:
      return {...state}
  }
}


function setPage(state, page) {
  return { ...state, page }
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



function toggleDialog( state, showDialog ) {
  return { ...state, showDialog }
}



export { initialState, reducer }
