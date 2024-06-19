// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from '../layouts/loader'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
    const{isAuthenticated, loading}=useSelector(state=>state.authState)

    if(!isAuthenticated && !loading){
        return <Navigate to={"/login"}/>
    }
    if(isAuthenticated){
      return children;
    }

    if(loading){
      return <Loader/>
    }

  return (
    <Fragment>
        
    </Fragment>
  )
}

export default ProtectedRoute