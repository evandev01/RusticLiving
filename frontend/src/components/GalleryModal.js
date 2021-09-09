import React from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { motion } from 'framer-motion'

const GalleryModal = ({
  // handleNext,
  // handlePrev,
  setShow,
  currentPhoto,
  setCurrentPhoto,
}) => {
  const handleClick = e => {
    if (e.target.classList.contains('backdrop')) {
      setShow(false)
    }
  }

  return (
    <>
      <motion.div
        className='backdrop'
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* <Button id='left-arrow' size='md' onClick={() => handlePrev()}>
          <i class='fa fa-chevron-left'></i>
        </Button>
        <Button id='right-arrow' size='md' onClick={() => handleNext()}>
          <i class='fa fa-chevron-right'></i>
        </Button> */}
        {/* {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>} */}

        <motion.img
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
          src={currentPhoto}
          // onClick={() => handleNext()}
        />
      </motion.div>
    </>
  )
}

export default GalleryModal
