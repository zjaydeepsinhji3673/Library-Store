import React from 'react'
import { Navigate} from 'react-router-dom'

export default function Protected({children}) {

  if(!localStorage.getItem('User_model')){
    return < Navigate to={'/login'} replace />
  }

  return children;
}
