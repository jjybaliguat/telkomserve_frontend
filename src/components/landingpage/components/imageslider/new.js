import React from 'react'
import { useState } from 'react';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore"
import { db } from '../../../../utils/firebase';
import { useEffect } from 'react';
import { Slide } from 'react-slideshow-image';

  const sliderStyles = {
    position: "relative",
    height: "100%",
  };
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };
  
  const ImageSlider = () => {
    const [images, setImages] = useState([])

    useEffect(()=> {
      getImages()
  }, [])
  
    const getImages = () => {
      const images = collection(db, "adds")
  
      const Snapshot = onSnapshot(images, (snapshot) => {
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

    const [currentIndex, setCurrentIndex] = useState(-1);
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    const goToNext = () => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
      backgroundImage: `url(${images[currentIndex]?.data?.url})`,
    };
    useEffect(()=> {
        setCurrentIndex(0)
    }, [])

    useEffect(()=> {
        setTimeout(() => {
            const isLastSlide = currentIndex === images.length-1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }, 5000)
    }, [currentIndex])
  
    return (
      <div style={sliderStyles}>
        <div>
          <div onClick={goToPrevious} className='btn-prev'>
            ❰
          </div>
          <div onClick={goToNext} className='btn-next'>
            ❱
          </div>
        </div>
        <div id="slide" style={slideStylesWidthBackground}></div>
        <div style={dotsContainerStyles}>
          {images.map((image, slideIndex) => (
            <div
              style={{...dotStyle, color: `${slideIndex === currentIndex ? "#fff" : "gray"}`}}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ImageSlider;