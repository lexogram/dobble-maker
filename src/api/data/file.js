import savedData from './testSave.json' assert { type: "json" }

const subFormats = {
  "layoutsFormat": {
    "type"   : "object",
    "keys"   : "string", // E.g.: ""Triangle 64.60" just accept it
    "values" : "layoutFormat"
  },

  "layoutFormat": {
    "type"   : "array",
    "values" : "placement"
  },

  "placement": {
    "type"   : "object",
    "values" : {
      "cx"    : "number",
      "cy"    : "number",
      "r"     : "number",
      "fill?" : /#(?:(?:[A-F0-9]){3}|(?:[A-F0-9]){4}|(?:[A-F0-9]){6}|(?:[A-F0-9]){8})$/i
    }
  },

  "imagesFormat": {
    "type"   : "array",
    "values" : {
      "source" : "string",
      "crop"   : "boolean|0"
    }
  },

  "cardDataFormat": {
    "type": "array",
    "values": "cardFormat"
  },

  "cardFormat": {
    "layoutName" : "string",
    "images"     : "cardImageFormat",
    "cardScale?" : "number|1"
  },

  "cardImageFormat": {
    "type"   : "array",
    "values" : "imageFormat"
  },
    
  "imageFormat": {
    "imageIndex"    : "integer", // 0 - images.length - 1
    "specificScale" : "number",
    "offsetX"       : "number",
    "offsetY"       : "number",
    "rotation"      : "number"
  }
}

const jsonFormat = {
  "creatorId"      : "string",
  "name"           : "string",
  "total?"         : "integer",
  "imagesPerCard?" : "integer",
  "useSunburst"    : "boolean|false",
  "customLayout"   : "boolean|false",
  "cropByDefault"  : "boolean|false",
  "layouts"        : "layoutsFormat",
  "images"         : "imagesFormat",
  "cardData"       : "cardDataFormat"
}



const getDefaultRegex = /(\w+)\|([a-z0-9]+)/



const checkType = (type, value) => {
  if (typeof value === type) {
    return true
  }

  switch (type) {
    case "integer":
      return isInteger()
    default:
      return false
  }

  function isInteger() {
    if (isNaN(value)) {
      return false
    }

    return parseInt(value) == value
  }
}



const verifySubFormat = (json, subFormatToUse) => {
  if (typeof json !== "object") {
    return false
  }

  const { type, keys, values } = subFormatToUse

  if (!type) {
    return verifyFormat( json, subFormatToUse )
  }

  const formatToUse = subFormats[values]

  if (type === "array") {
    if (!Array.isArray(json)) {
      return false
    }

    if (formatToUse) {
      return json.every( item => (
        verifySubFormat(item, formatToUse)
      ))
    }

    return json.every( item => verifyFormat( item, values ))
  }

  if (keys) {
    // json is an object with keys and values. First check that
    // the keys are valid (perhaps with a regex), then check that
    // the values have the correct format.

    let valid = true // unless the RegExp test fails
    if (keys instanceof RegExp) {
      valid = Object.keys(json).every( key => keys.test(key))
    }

    if (!valid) {
      return false
    }

    return Object.values(json).every( value => { 
      if (formatToUse) {
        return verifySubFormat(value, formatToUse)
      }

      return verifyFormat(value, values)
    })
  }

  return verifyFormat(json, values)
}



const verifyFormat = ( json, format ) => {
  const entries = Object.entries(format)

  const valid = entries.every(([ key, type ]) => {
    // Check if there is a default value, and parse it as a number
    // if appropriate
    let hasDefault = getDefaultRegex.exec(type)
    let defaultValue
    if (hasDefault) {
      type = hasDefault[1]
      defaultValue = hasDefault[2]
      if (!isNaN(defaultValue)) {
        defaultValue = parseFloat(defaultValue)
      }
      hasDefault = true
    }

    // Check if this key is optional
    const isOptional = key.slice(-1) === "?"
    if (isOptional) {
      key = key.slice(0, -1)
    }

    const useRegExp = type instanceof RegExp
    const subFormatToUse = subFormats[type] // undefined?

    const value = json[key]
    let valid = false

    if (isOptional) {
      // Remove any total or imagesPerCard entry that is not valid
      // TODO: replace with defaultValue, if there is one?
      if (useRegExp) {
        if (!(type.test(value))) {
          delete json[key]
        }
      } else if (!checkType(type, value)) {
        if (hasDefault) {
          json[key] = defaultValue
        } else {
          delete json[key]
        }
      }

      return true // this key is optional anyway
    }

    if (subFormatToUse) {
      valid = verifySubFormat(value, subFormatToUse)

    } else if (useRegExp) {
      valid = type.test(value)

    } else {
      valid = checkType(type, value)
    }

    if (!valid && hasDefault) {
      json[key] = defaultValue
      return true
    }

    return valid
  })

  return valid && json
}



export const sanitize = json => {
  const validJSON = verifyFormat(json, jsonFormat)

  if (validJSON) {
    // We still need to check that:
    // 1. There are the right number of images
    // 2. Every layout has the right number of entries for images
    // 3. There are the same number of cards as images
    // 4. There are the right number of image entries on each card

    const { layouts, images, cardData } = validJSON
    // 1. The right number of images
    // const total = (() => {
      let total = images.length
    //   const totals = [ 7, 13, 21, 31, 57, 73, 91, 133, 999 ]
    //   const index = totals.findIndex( total => total > temp )
    //   return totals[index - 1]
    // })()

    const imagesPerCard = (() => {
      let temp = Math.floor(Math.sqrt(total))

      if (temp * temp + 1 > total) {
        return false
      }

      return temp + 1
    })()

    if (imagesPerCard) {
      // 2. All layouts have the right number of placements
      let valid = Object.values(layouts).every( layout => (
        layout.length === imagesPerCard
      ))

      if (valid) {
        // 3. Same number of cards as images
        valid = cardData.length === total
      }

      if (valid) {
        // 4. Right number of image entries on each card
        valid = cardData.every(({ images }) => (
          images.length === imagesPerCard
        ))
      }

      return valid && validJSON
    } else {
      return false
    }
  }

  return false
}


const result = sanitize(savedData)
console.log("typeof result:", typeof result);
if (typeof result === "object") {
  console.log("result", JSON.stringify(result.images, null, '  '));
  
}


// const testFormat = {
//   // "abc": "string",
//   // "UPPERCASE": /ABC/,
//   // "optional?": "string|0",
//   // "optionalButInvalid?": "number",
//   // "images": "imagesFormat",
//   // "layouts": "layoutsFormat",
//   "cardData": "cardDataFormat"
// }

// const testJSON = {
//   // "abc": "abc",
//   // "UPPERCASE": "ABC",
//   // "optional": 1,
//   // "optionalButInvalid": "number",
//   // "unExpected": "still around",
//   // "images": [
//   //   { "source": "string", "crop": true },
//   //   { "source": "string", "crop": false },
//   //   { "source": "string", "crop": "not a boolean" },
//   // ],
//   // "layouts": {
//   //   "Triangle 64.60": [
//   //     {
//   //       "cx": 0,
//   //       "cy": -26.796,
//   //       "r": 23.203,
//   //       "fill": "#800"
//   //     },
//   //     {
//   //       "cx": 23.204,
//   //       "cy": 13.402,
//   //       "r": 23.203,
//   //       "fill": "#0808"
//   //     },
//   //     {
//   //       "cx": -23.204,
//   //       "cy": 13.402,
//   //       "r": 23.203,
//   //       "fill": "#008800"
//   //     },
//   //     {
//   //       "cx": -23.204,
//   //       "cy": 13.402,
//   //       "r": 23.203,
//   //       "fill": "#0088008"
//   //     }
//   //   ]
//   // },
//   "cardData": [
//     {
//       "images": [
//         {
//           "imageIndex": 0,
//           "specificScale": 1,
//           "rotation": 75.71391084,
//           "offsetX": 0,
//           "offsetY": 0,
//           "zIndex": 0,
//           "crop": 0
//         },
//         {
//           "imageIndex": 1,
//           "specificScale": 1,
//           "rotation": 149.45027112,
//           "offsetX": 0,
//           "offsetY": 0,
//           "zIndex": 0,
//           "crop": 0
//         },
//         {
//           "imageIndex": 2,
//           "specificScale": 1,
//           "rotation": 265.22386164000005,
//           "offsetX": 0,
//           "offsetY": 0,
//           "zIndex": 0,
//           "crop": true
//         },
//         {
//           "imageIndex": 3,
//           "specificScale": 1,
//           "rotation": 92.27404943999997,
//           "offsetX": 0,
//           "offsetY": 0,
//           "zIndex": 0,
//           "crop": false
//         }
//       ],
//       "layoutName": "Hexagon 66.37",
//     },
//     {
//       "images": [
//         {
//           "imageIndex": 6,
//           "specificScale": 1,
//           "rotation": 276.11574047999994,
//           "offsetX": 0,
//           "offsetY": 0,
//           "zIndex": 0,
//           "crop": 0
//         },
//         {
//           "imageIndex": 0,
//           "specificScale": 1,
//           "rotation": 217.18869516000004,
//           "offsetX": 0,
//           "offsetY": 0,
//           "zIndex": 0,
//           "crop": 0
//         },
//         {
//           "imageIndex": 7,
//           "specificScale": 1,
//           "rotation": 134.61444936,
//           "offsetX": 0,
//           "offsetY": 0,
//           "zIndex": 0,
//           "crop": 0
//         }
//       ],
//       "layoutName": "Way Out 70.96",
//     }
//   ]
// }

// const result = verifyFormat(testJSON, testFormat)
// console.log("result", JSON.stringify(result, null, '  '));

