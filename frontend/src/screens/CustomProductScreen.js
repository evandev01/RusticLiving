import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CustomProductButtons from '../components/CustomProductButtons'

const CustomProductScreen = ({ history }) => {
  // const userLogin = useSelector(state => state.userLogin)
  // const { userInfo } = userLogin

  // useEffect(() => {
  //   if (!userInfo && !userInfo.isAdmin) {
  //     history.push('/login')
  //   }
  // }, [userInfo, history])

  return (
    <>
      <CustomProductButtons />
    </>
  )
}

export default CustomProductScreen
