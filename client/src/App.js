// External imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Asset imports
import './assets/css/App.css'

// Local imports
import UserList from './components/UserList'


const App = () => {
  const [ users, setUsers ] = useState([])

  return (
    <div className="App">
      <UserList users={users} setUsers={setUsers} />
    </div>
  )
}

export default App