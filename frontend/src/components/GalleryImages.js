import React, { useState, useEffect } from 'react'
import GalleryScreen from '../screens/GalleryScreen'
import h1 from '../assets/tables/h1.jpg'
import h2 from '../assets/tables/h2.jpg'
import h3 from '../assets/tables/h3.jpg'
import h4 from '../assets/tables/h4.jpg'
import h5 from '../assets/tables/h5.jpg'
import h6 from '../assets/tables/h6.jpg'
import h7 from '../assets/tables/h7.jpg'
import h8 from '../assets/tables/h8.jpg'
import h9 from '../assets/tables/h9.jpg'
import img1 from '../assets/tables/1.jpg'
import img2 from '../assets/tables/2.jpg'
import img3 from '../assets/tables/3.jpg'
import img4 from '../assets/tables/4.jpg'
import img5 from '../assets/tables/5.jpg'
import img6 from '../assets/tables/6.jpg'
import img7 from '../assets/tables/7.jpg'
import img8 from '../assets/tables/8.jpg'
import img9 from '../assets/tables/9.jpg'
import img10 from '../assets/tables/10.jpg'
import img11 from '../assets/tables/11.jpg'
import img12 from '../assets/tables/12.jpg'
import img13 from '../assets/tables/13.jpg'
import img14 from '../assets/tables/14.jpg'
import img15 from '../assets/tables/15.jpg'
import img16 from '../assets/tables/16.jpg'
import img17 from '../assets/tables/17.jpg'
import img18 from '../assets/tables/18.jpg'
import img19 from '../assets/tables/19.jpg'
import img20 from '../assets/tables/20.jpg'
import img21 from '../assets/tables/21.jpg'
import img22 from '../assets/tables/22.jpg'
import img23 from '../assets/tables/23.jpg'
import img24 from '../assets/tables/24.jpg'
import img25 from '../assets/tables/25.jpg'
import img26 from '../assets/tables/26.jpg'
import img27 from '../assets/tables/27.jpg'
import img28 from '../assets/tables/28.jpg'
import img29 from '../assets/tables/29.jpg'
import img30 from '../assets/tables/30.jpg'
import img31 from '../assets/tables/31.jpg'
import img32 from '../assets/tables/32.jpg'
import img33 from '../assets/tables/33.jpg'
import img34 from '../assets/tables/34.jpg'
import img35 from '../assets/tables/35.jpg'
import img36 from '../assets/tables/36.jpg'
import img37 from '../assets/tables/37.jpg'
import img38 from '../assets/tables/38.jpg'
import img39 from '../assets/tables/39.jpg'
import img40 from '../assets/tables/40.jpg'
import img41 from '../assets/tables/41.jpg'
import img42 from '../assets/tables/42.jpg'
import img43 from '../assets/tables/43.jpg'
import img44 from '../assets/tables/44.jpg'
import img45 from '../assets/tables/45.jpg'
import img46 from '../assets/tables/46.jpg'
import img47 from '../assets/tables/47.jpg'
import img48 from '../assets/tables/48.jpg'
import img49 from '../assets/tables/49.jpg'
import img50 from '../assets/tables/50.jpg'
import img51 from '../assets/tables/51.jpg'
import img52 from '../assets/tables/52.jpg'
import img53 from '../assets/tables/53.jpg'
import img54 from '../assets/tables/54.jpg'
import img55 from '../assets/tables/55.jpg'
import img56 from '../assets/tables/56.jpg'
import img57 from '../assets/tables/57.jpg'
import img58 from '../assets/tables/58.jpg'
import img59 from '../assets/tables/59.jpg'
import img69 from '../assets/tables/69.jpg'
import img70 from '../assets/tables/70.jpg'
import img71 from '../assets/tables/71.jpg'
import img72 from '../assets/tables/72.jpg'

const GalleryImages = () => {
  const [galleryImages, setGalleryImages] = useState('')
  const images = [
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
    h8,
    h9,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
    img25,
    img26,
    img27,
    img28,
    img29,
    img30,
    img31,
    img32,
    img33,
    img34,
    img35,
    img36,
    img37,
    img38,
    img39,
    img40,
    img41,
    img42,
    img43,
    img44,
    img45,
    img46,
    img47,
    img48,
    img49,
    img50,
    img50,
    img51,
    img52,
    img53,
    img54,
    img55,
    img56,
    img57,
    img58,
    img59,
    img69,
    img70,
    img71,
    img72,
  ]

  const imageExport = () => {
    if (images) {
      setGalleryImages(images)
    }
  }

  useEffect(() => {
    imageExport()
  }, [])

  return <GalleryScreen images={galleryImages} />
}

export default GalleryImages
