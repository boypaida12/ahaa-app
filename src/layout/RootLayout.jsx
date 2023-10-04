/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated && <Outlet />}
    </>
  )
}

export default RootLayout
