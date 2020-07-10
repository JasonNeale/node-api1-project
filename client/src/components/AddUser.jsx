import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form } from 'semantic-ui-react'


const AddUser = ( { users } ) => {
    const [ user, setUser ] = useState({
        name: '',
        bio: ''
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/api/users', user)
        .then(res => {
            console.log('[AXIOS RESPONSE: ', res.data)
        })
        .catch(err => {
            console.log('[AXIOS ERROR: ', err)
        })

        document.getElementById('add-user').reset()
    }

    return (
        <Form 
        id="add-user" 
        onSubmit={handleSubmit} 
        success>

            <Form.Input 
            label='User Name:' 
            id="username" 
            name="name" 
            onChange={handleChange} 
            />

            <Form.Input 
            label='Bio:' 
            id="bio" 
            name="bio" 
            onChange={handleChange} 
            />

            <Button>Add User</Button>
        </Form>
      )
  }

export default AddUser