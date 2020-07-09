// External imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'semantic-ui-react'


const UserList = ( { users, setUsers } ) => {
    useEffect(() => {
      axios.get('http://localhost:5000/api/users')
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => { console.log('[AXIOS ERROR: ', err) })
    }, users)

    return (
        <Table celled inverted selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Bio</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {users.map((item, index) =>(
                <Table.Row key={index}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.bio}</Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
    )
}

export default UserList