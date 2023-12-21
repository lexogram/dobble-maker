/** 
 * fillCard.js
 * 
 * If imageData is a number (3, 4, _5_, 6, 8, ...) then
 * 1. Generates an array with this number of objects, with the
 *    structure...
 *    [ {
 *        cardScale: 1,
 *        layout: <layoutName | ignored if not custom>
 *        images: [
 *          {
 *            source: <string url | File object | undefined>,
 *            selfScale: 1, // applied in the ImageStore
 *            specificScale: 1, // applied in the CardMaker
 *            rotation: <random | ignorged if sunburst>,
 *            offsetX: 0,
 *            offsetY: 0,
 *            zIndex: 0,
 *            crop: 0 // apply cropDefault | true | false
 *          }
 *        ], .. *
 *      }
 *      , ...
 *    ]
 *    ... where:
 *    + layout is chosen at random
 *    + images[n].rotation is a random number 0 < r <= 360
 *    + images[n].source is undefined
 * 
 * If imageData is an array of File objects or string urls, then
 * these are used for image[n].source
 */


import { getSets } from "./filterData.js"


const getRandomItem = (array, random) => {
  return array[Math.floor(random() * array.length)]
}


export const createDisplay = (source) => {
  return {
    source,
    selfScale: 1
  }
}


const fillCard = (imageIndices, layoutName, random) => {
  const images = imageIndices.map( imageIndex => ({
    imageIndex,
    specificScale: 1,
    rotation: random() * 360,
    offsetX: 0,
    offsetY: 0,
    zIndex: 0,
    crop: 0
  }))
  
  return {
    images,
    layoutName,
    cardScale: 1
  }
}

// const images = ["this.png", "that.png", "theOther.png", "" ,"", ""]
// const result = fillCard(7, "Fixed Size", lcg())
// console.log("result:", result);
// const empty = result.images.find( object => !object.source)
// console.log("empty:", empty);

export const createCards = (
  total,
  layoutNames,
  random
) => {
  const { sets } = getSets(total)
  
  const cards = sets.map( imageIndices => {
    const layoutName = getRandomItem(layoutNames, random)
    return fillCard(imageIndices, layoutName, random)
  })

  return cards
}

// const cards = createCards( 7, ["Fixed Size", "Squiggly", "Whoops", "OK"], lcg(234))
// console.log("cards", JSON.stringify(cards, null, '  '));
