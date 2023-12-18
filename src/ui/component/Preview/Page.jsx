/**
 * Page.jsx
 */



import React, { useContext} from "react"
import { Context } from "../../../api/context/Context";
import { Card } from "../Creator/Card";



export const Page = ({ cards, index }) => {
  const {
    VIEW_WIDTH,
    VIEW_HEIGHT,
    STROKE_WIDTH,
    PADDING,
    SPACING,
    RADIUS
  } = useContext(Context)

  cards = cards.map(( card, index ) => {
    // console.log("card:", card);
    
    const cx = PADDING
             + (index % 2) * (VIEW_WIDTH - SPACING * 2)
             + RADIUS
    const cy = PADDING
             + (index % 3) * SPACING * 2
             + RADIUS
    
    return (
      <Card
        key={index}
        index={index}
        hrefs={card}
        cx={cx}
        cy={cy}
        r={RADIUS}
      />
    )
  })  
  

  return (
    <section id={`page-${index+1}`}>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"

        fill="none"
        strokeWidth={`${STROKE_WIDTH}`}
        stroke="black"
      >
        {cards}
      </svg>
    </section>
  )
}