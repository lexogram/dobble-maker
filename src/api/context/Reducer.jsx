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





import {
  allLayouts,
  getSets,
  imageSets, // won't change
  getImageSet
} from '../data/filterData.js'
import {
  createCards,
  createDisplay,
} from '../data/fillCard.js'
import { lcg } from '../lcg.js'

const IMAGE_REGEX = /\.(bmp|gif|jpe?g|png|tiff|webp)$/i





const getFirstLayoutForSet = totalCards => {
  const layoutsForSet = allLayouts[totalCards]
  const firstLayoutName = Object.keys(layoutsForSet)[0]
  const firstCircles = layoutsForSet[firstLayoutName]

  return firstCircles
}




const getTotalFrom = imagesPerCard => (
  imagesPerCard * imagesPerCard - imagesPerCard + 1
)

const imagesPerCard = 8
const total = getTotalFrom(imagesPerCard)
const layouts = allLayouts[total]
const layoutNames = Object.keys(layouts)
const cardData = createCards(
  total,
  layoutNames,
  lcg()
)
// [ { "images": [ {
//         "imageIndex": 0,
//         "specificScale": 1,
//         "rotation": 75.71391084,
//         "offsetX": 0,
//         "offsetY": 0,
//         "zIndex": 0,
//         "crop": 0
//       }, ...
//     ],
//     "layoutName": <string layout name>,
//     "cardScale": 1
//   }, ...
// ]

const initialState = {
  imagesPerCard,
  total,
  images: [],
  cardData,
  layoutNames,
  layouts,

  customLayout: true,
  cropByDefault: true,
  useSunburst: false,

  // <<< Should become obsolete
  sets: getSets(total).sets,
  layout: getFirstLayoutForSet(total),
  imageSets,
  imageSet: imageSets[0]
  // >>>
}


const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "ADD_IMAGES":
      return addImages(state, payload)

    case "SET_IMAGES_PER_CARD":
      return setImagesPerCard(state, payload)

    case "SET_IMAGE_SET":
      return setImageSet(state, payload)

    case "SWAP_IMAGES":
      return swapImages(state, payload)

    case "CLEAR_IMAGES":
      return clearImages(state)

    case "SET_CUSTOM_LAYOUT":
      return setCustomLayout(state, payload)

    case "SET_CROP_BY_DEFAULT":
      return setCropByDefault(state, payload)

    case "SET_SUNBURST":
      return setSunburst(state, payload)
  
    default:
      return {...state}
  }
}



function addImages( state, imageFiles ) {
  let { images } = state
  // console.log("addImages imageFiles:", imageFiles);
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
    .filter( imageFile => {
      const { lastModified, name, size, type } = imageFile
      const match = images.find(({ source }) => (
           source.name         === name
        && source.lastModified === lastModified
        && source.size         === size
        && source.type         === type
      ))

      if (match) {
        return false
      }

      // Ignore files that are not images (like .DS_Store)
      return IMAGE_REGEX.test(name)
    })
    .map( imageFile => createDisplay(imageFile))

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
  const total = getTotalFrom(imagesPerCard)
  const sets = getSets(total).sets
  const layout = getFirstLayoutForSet(total)
  return { ...state, imagesPerCard, total, sets, layout }
}



function setImageSet( state, imageSet ) {
  const images = getImageSet(imageSet)
    .map( image => ({ src: image, scale: 0.8 }))
  const { sets, total } = getSets(images.length)
  const layout = getFirstLayoutForSet(total)
  const imagesPerCard = layout.length

  return {
    ...state,
    imageSet,
    images,
    sets,
    layout,
    total,
    imagesPerCard
  }
}



//!!! NOT IDEMPOTENT !!!  NOT IDEMPOTENT !!!  NOT IDEMPOTENT !!!//
function swapImages(state, {dragIndex, dropIndex}) {
  const { images } = state
  const dragImage = images[dragIndex]
  const dropImage = images.splice(dropIndex, 1, dragImage)[0]
  // We now have two copies of dragImage, so we replace the
  // original with the dropImage that we just spliced out
  images.splice(dragIndex, 1, dropImage)

  return { ...state, images }
}



function clearImages(state) {
  return { ...state, images: [] }
}



function setCustomLayout(state, customLayout) {
  return { ...state, customLayout }
}



function setCropByDefault(state, cropByDefault) {
  return { ...state, cropByDefault }
}



function setSunburst(state, useSunburst) {
  return { ...state, useSunburst }
}



export { initialState, reducer }
