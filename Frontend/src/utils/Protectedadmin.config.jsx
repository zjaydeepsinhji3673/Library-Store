import React from 'react'
import { Navigate} from 'react-router-dom'

export default function Protectedadmin({children}) {

  if(!localStorage.getItem('User_model')){
    return < Navigate to={'/admin/'} replace />
  }

  const UserData = JSON.parse(localStorage.getItem('User_model')) ? JSON.parse(localStorage.getItem('User_model')) : {};
  const role = UserData[0]?.role ? UserData[0]?.role : "" ;

  if(role !== 'Admin'){
    return < Navigate to={'/admin/'} replace />
  }

  return children;
}
