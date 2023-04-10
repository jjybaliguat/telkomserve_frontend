import { Box } from '@mui/material';
import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { sildeShowContent } from '../../../../utils/contents/content';

const spanStyle = {
    padding: '20px',
    background: 'transparent',
    color: '#fff'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }

const {images} = sildeShowContent

const Slideshow = (props) => {

  const {height, width, ...others} = props
  
  return (
    <Box sx={{height: height, width: width}} >
        <Slide>
        {images.map((item, index)=> (
            <div key={index}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${item.url})`, height: height }}>
                <span style={spanStyle}>{item.caption}</span>
            </div>
            </div>
        ))} 
        </Slide>
    </Box>
  )
}

export default Slideshow
