import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext/authContext'
// import FilesList from '../Files/FileList'
// import CountFiles from '../Files/CountFiles'
// import FileForm from '../Files/FilesForm'
// import SearchFile from '../Files/searchFile'
// import FilterFile from '../Files/FilterFiles'

export default function Home() {
    const { user, isAuthencated} = useContext(AuthContext)
    console.log(user)
    // useEffect(() => {
    //     loadUser()
    //     // eslint-disable-next-line
    //   }, [])
    return (
        <div  className="app-container">            
         {isAuthencated ? "Welcome Home Dominic":"You must Log in Omera"}  
        </div>
    )
}