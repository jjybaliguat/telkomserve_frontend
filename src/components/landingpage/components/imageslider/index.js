import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { sildeShowContent } from '../../../../utils/contents/content';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore"
import { db } from '../../../../utils/firebase';

const spanStyle = {
    padding: '20px',
    background: 'transparent',
    color: '#fff'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center",
    backgroundSize: 'cover',
    height: '350px'
  }


// const {images} = sildeShowContent

const Slideshow = (props) => {

  const [images, setImages] = useState([])

  useEffect(()=> {
    getImages()
}, [])

  const getImages = () => {
    const image = collection(db, "adds")

    const Snapshot = onSnapshot(image, (snapshot) => {
      const items = []
      snapshot.forEach((doc)=>{
        items.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setImages(items)
    })

    return () => {
      Snapshot()
    }
  }

  const {height, width, ...others} = props
  
  return (
      <Slide>
      {images.map((item)=> (
          <div key={item.id}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${item.data?.url})` }}>
            </div>
          </div>
        ))} 
      </Slide>
  )
}

export default Slideshow
