import React from 'react'

const MyMarker = ({ text }: { text: string }) => {
  const handleClick = () => {
    console.log(`You clicked on`)
  }

  return (
    <div onClick={handleClick}>
      <span className='circleText'>{text}</span>
    </div>
  )
}

export default MyMarker
