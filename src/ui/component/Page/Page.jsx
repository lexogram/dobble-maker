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
    padding,
    spacing,
    radius
  } = useContext(Context)
  // console.log("props:", props);

  cards = cards.map(( card, index ) => {
    const cx = padding
             + (index % 2) * (VIEW_WIDTH - spacing * 2)
             + radius
    const cy = padding
             + (index % 3) * spacing * 2
             + radius
    
    return (
      <Card
        key={index}
        index={index}
        hrefs={card}
        cx={cx}
        cy={cy}
        r={radius}
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