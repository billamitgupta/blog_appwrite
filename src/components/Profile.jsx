import React ,{useContext}from 'react'
import UserContext from '../context/UserContext'


function Profile() {
    const {user}= useContext(UserContext)
    if(!user) return <div>Loading...</div>;
    return  <h1>{`welcome: ${user.username}'s profile`}</h1>
}

export default Profile