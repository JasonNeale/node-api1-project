// External imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Asset imports
import './assets/css/App.css'

// Local imports
import UserList from './components/UserList'
import AddUser from './components/AddUser'


const App = () => {
  const [ users, setUsers ] = useState([])
  const [ stateChange, setStateChange ] = useState(false)

  

  return (
    <div className="App wrapper">
      <h2>User List</h2>
      {
        useEffect(() => {
          
        }, users)
      }
      <UserList users={users} setUsers={setUsers} />
      <hr />
      <h2>Add User</h2>
      <AddUser users={users} />
      <hr />
    </div>
  )
}

export default App