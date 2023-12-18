/**
 * ImagesReducer.jsx
 *
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */

import sets from '../data/shuffledSets.json'
import layouts from '../data/layout.json'
const IMAGE_REGEX = /\.(bmp|gif|jpe?g|png|tiff|webp)$/i


import {
  getSet,
  imageSets, // won't change
  getImageSet
} from '../data/filterData.js'


const getFirstLayoutForSet = totalCards => {
  const layoutsForSet = layouts[totalCards]  
  const firstLayoutName = Object.keys(layoutsForSet)[0]
  const firstCircles = layoutsForSet[firstLayoutName].circles
  
  const values = Object
    .values(firstCircles)
    .filter( object => typeof object === "object")

  return values
}


const initialState = {
  images: [],
  imagesPerCard: 8,
  sets: sets[8],
  total: 57,
  layout: getFirstLayoutForSet(57),
  customLayout: true,
  cards: [],

  imageSet: imageSets[0],
  imageSets
}


const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "ADD_IMAGES":
      return addImages(state, payload)

    case "SET_IMAGES_PER_CARD":
      return setImagesPerCard(state, payload)

    case "SELECT_IMAGE_SET":
      return selectImageSet(state, payload)

    default:
      return {...state}
  }
}


function addImages( state, imageFiles ) {
  let { images } = state
  // console.log("addImages payload:", payload);
  // [ File {
  //     lastModified: <integer timestamp>,
  //     name: "image.ext",
  //     size: <integer>
  //     type: "",
  //     webkitRelativePath: "path/image.ext"
  //   }, ...
  // ]

  imageFiles = Array
    .from(imageFiles)
    // Check if an image with the same name and statistics has
    // already been added. There is a small chance of a false
    // match, if two different images with the same name happen
    // to have exactly the same size and modification time.
    .filter( imageObject => {
      const { lastModified, name, size, type } = imageObject
      const match = images.find( imageObject => (
           imageObject.name         === name
        && imageObject.lastModified === lastModified
        && imageObject.size         === size
        && imageObject.type         === type
      ))

      if (match) {
        return false
      }

      // Ignore files that are not images (like .DS_Store)
      return IMAGE_REGEX.test(name)
    })

  const imagesAdded = imageFiles.length
  if (imagesAdded) {
    images = [ ...images, ...imageFiles ]
    state.status = `${imagesAdded} images added`

  } else {
    state.status = "No images added"
  }

  return { ...state, images }
}



function setImagesPerCard( state, imagesPerCard ) {
  const total = imagesPerCard * imagesPerCard - imagesPerCard + 1
  state.sets = sets[imagesPerCard]
  const layout = getFirstLayoutForSet(total)
  return { ...state, imagesPerCard, total, layout }
}




function selectImageSet( state, imageSet ) {
  const images = getImageSet(imageSet)
  const { set } = getSet(images.length)

  return { 
    ...state,
    imageSet,
    images,
    set
  }
}



export { initialState, reducer }
