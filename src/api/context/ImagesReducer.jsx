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


const IMAGE_REGEX = /\.(bmp|gif|jpe?g|png|tiff|webp)$/i


const initialState = {
  images: []
}


const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "ADD_IMAGES":
      return addImages(state, payload)

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


export { initialState, reducer }