import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image, Row, Col, Modal } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import CarouselModal from './CarouselModal'
import { listTopProducts } from '../actions/productActions'
import Img1 from '../assets/carousel/IMG_1.jpg'
import Img2 from '../assets/carousel/IMG_2.jpeg'
import Img3 from '../assets/carousel/IMG_3.jpeg'
import Img4 from '../assets/carousel/IMG_4.jpg'
import Img5 from '../assets/carousel/IMG_5.jpeg'
import Img6 from '../assets/carousel/IMG_6.jpeg'
import Img7 from '../assets/carousel/IMG_7.jpg'
import Img8 from '../assets/carousel/IMG_8.jpeg'

const GalleryCarouselModal = ({ show, image, onHide }) => {
  return (
    <>
      <>
        <Modal
          className='carousel-modal'
          show={show}
          onHide={onHide}
          size='xl'
          centered
          fullscreen
        >
          <Modal.Header closeButton />
          <Image src={image} alt='featured product' />
        </Modal>
      </>
    </>
  )
}

export default GalleryCarouselModal
