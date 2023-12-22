/**
 * TestResize.jsx
 */

import { useEffect, useState } from 'react'
import { useResize } from './useResize'

export const TestResize = () => {
  const { width, height } = useResize()
  const [ count, setCount ] = useState(0)

  useEffect(() => {
    setCount(count + 1)
  }, [width, height])

  return <>
    <h1>
      Resized {count} times: width {width}, height {height}
    </h1>
  </>
}