import React from 'react'
import { useState } from 'react'

const Dashboard = () => {
    const [user,setUser] = useState({
        name: 'anelka',
        email: 'iganzeanelka12@gmail.com',
    })
  return (
    <div>
        <h2>{user.name }</h2>
        <h2>{user.email }</h2>
    </div>
  )
}

export default Dashboard