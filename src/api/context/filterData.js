import input from '../../data/layout.json'
import allSets from '../../data/shuffledSets.json'
import allImages from '../../data/images.json'

/* Incoming:

   { "<Size>" : {
       "<LayoutName>": {
         "sizes": {...}
         "circles": {
           "<key>": {
             cx, cy, r,
             ...
           },
           ...
         }
       }
     }
   }

   Outgoing:

   { "<Size>" : {
       "<LayoutName>": {
         [ { cx, cy, r },
         ...
         ]
       }
     }
   }
*/

const inputs = Object.entries(input)
// [[ "<Size>", <LayoutsMap> ], ... ]

export const layouts = inputs.reduce((output, [size, layoutMap]) => {
  const layouts = Object.entries(layoutMap)
  // [ "<LayoutName>", {..., circles: { <key>: <value>, ...}, ...}]

  output[size] = layouts.reduce(( sizeMap, [ name, {circles}]) => {
    if (typeof circles === "object") {
      const values = Object.values(circles)
      // [ { cx, cy, r, ... }, ... ]

      sizeMap[name] = values.map( data  => ({
          cx: data.cx,
          cy: data.cy,
          r : data.r
        })
      )
    }

    return sizeMap
  }, {})

  return output
}, {})



// SETS / SETLENGTH // SETS / SETLENGTH // SETS / SETLENGTH //

const sets = Object.values(allSets)
  .filter( value => Array.isArray(value))
  .sort(( a, b ) => a.length - b.length)


const setLengths = sets.map( set => set.length )
setLengths.push(9999)


export const getSet = (imageCount) => {
  const setIndex = setLengths.findIndex(
    setLength => setLength > imageCount
  ) - 1

  const set = sets[setIndex]
  imageCount = setLengths[setIndex]

  return {
    set,
    imageCount
  }
}


// IMAGES // IMAGES // IMAGES // IMAGES // IMAGES // IMAGES //

export const imageSets = Object.keys(allImages).sort()

export const getImageSet = setName => {
  return allImages[setName]
    .map( file => `${setName}/${file}`)
}