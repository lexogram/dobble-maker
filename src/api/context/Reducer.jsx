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
  getImageSet,
  createDisplay,
  createCards
} from '../data/filterData.js'

import { lcg } from '../lcg.js'

const IMAGE_REGEX = /\.(bmp|gif|jpe?g|png|tiff|webp)$/i

const getTotalFrom = imagesPerCard => (
  imagesPerCard * imagesPerCard - imagesPerCard + 1
)



const initialState = (() => (
  // Preload animals while developing
  setImageSet({
      customLayout: true,
      cropByDefault: true,
      useSunburst: false,
      imageSets
  }, "57_Animals"

  // // Show an blank set of 57 cards
  // setImagesPerCard({
  //   images: [],
  //   customLayout: true,
  //   cropByDefault: true,
  //   useSunburst: false,
  //   imageSets
  // }, 8
)))()



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

    case "TWEAK_IMAGE":
      return tweakImage(state, payload)

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
  const layouts = allLayouts[total]
  const layoutNames = Object.keys(layouts)
  const cardData = createCards(
    total,
    layoutNames,
    lcg()
  )

  return {
    ...state,
    imagesPerCard,
    total,
    cardData,
    layoutNames,
    layouts
  }
}



function setImageSet( state, imageSet ) {
  const images = getImageSet(imageSet) // [ <url>, ... ]
    .map( source => ({ source, selfScale: 1 }))
  const { sets } = getSets(images.length)
  const imagesPerCard = sets[0].length

  state = setImagesPerCard( state, imagesPerCard )

  return {
    ...state,
    images,
    imageSet
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


function tweakImage(state, payload) {
  switch (payload.type) {
    case "rotation":
      return setRotation(state, payload)
  }
}


function setRotation( state, { value, cardIndex, slotIndex }) {
  const cardData = state.cardData[cardIndex]
  const imageData = cardData.images
  const specificData = imageData[slotIndex]
  specificData.rotation = value

  return { ...state }
}



export { initialState, reducer }