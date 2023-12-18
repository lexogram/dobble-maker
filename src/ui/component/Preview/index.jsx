/**
 * PrintPreview.jsx
 */


import React, { useContext } from "react"
import { ImagesContext } from "../../../api/context/ImagesContext";
import { Page } from "./Page"

export const Preview = () => {
  const { images, sets } = useContext(ImagesContext)

  // Map the images to the cards
  const cards = sets.map(
    card => card.map( number => images[number])
  )

  // Divide the cards up into printable pages
  const pages = cards.reduce(( pages, card ) => {
    let page = pages[0]
    if (page.length === 6) {
      page = []
      pages.unshift(page)
    }

    page.push(card)

    return pages
  }, [[]])

  // The pages have been unshifted in from the left. We should
  // reverse the order
  pages.reverse()


  // console.log("pages:", pages.map( page => page.length));
  // const sections = pages.slice(0,1).map(( page, index )=> (
  const sections = pages.map(( page, index )=> (
    <Page
      key={index}
      index={index}
      cards={page}
    />
  ))


  return (
    <main>
     {sections}
    </main>
  )
}