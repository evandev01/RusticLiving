import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomPriceButtons from '../components/CustomPriceButtons'

const CustomPriceScreen = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [userInfo, history])

  return (
    <>
      <CustomPriceButtons />
    </>
  )
}

export default CustomPriceScreen
