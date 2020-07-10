const express = require('express')
const shortid = require('shortid')
const server = express()
const cors = require('cors')
const PORT = 5000


server.use(express.json())
server.use(cors())

let users = []

server.get('/', (req, res) => {
    console.log('[SERVER LOG]: server.get -> (/)')
    res.json({message: "The API server is running!"})
})

// C: Create
server.post('/api/users', (req, res) => {
    console.log('[SERVER LOG]: server.post -> (/api/users) -> req.body: ', req.body)
    const userInfo = req.body

    if(userInfo.name == null || userInfo.bio == null) {
        res.status(400).json({error: "Please provide a name and bio for the user."})
    }

    console.log('[SERVER LOG]: server.post -> (/api/users) -> userInfo: ', userInfo)
    userInfo.id = shortid.generate()
    console.log('[SERVER LOG]: shortid.generate()', shortid.generate())
    console.log('[SERVER LOG]: server.post -> (/api/users) -> (userInfo.id = shortid.generate()): ', userInfo.id)

    try {
        users.push(userInfo)
        res.status(201).json(userInfo)
    } catch (error) {
        res.status(500).json({ error: "There was an internal server error." })
    }
})

// R: Read
server.get('/api/users', (req, res) => {
    try {
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "There was an internal server error." })
    }
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    
    const found = users.find(user => user.id == id)

    if (found) {
        users = users.filter(user => user.id == id)
        res.status(200).json(found)
    } else {
        res.status(404).json({message: `The user with the specified ID: ${id} does not exist.`})
    }
})

// U: Update
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    let index = users.findIndex(user => user.id == id)

    if (index !== -1) {
        try {
            changes.id = id
            users[index] = changes
            res.status(200).json(users[index])
        } catch (error) {
            res.status(500).json({ error: "There was an internal server error." })
        }
    } else {
        res.status(404).json({message: `The user with the specified ID: ${id} does not exist.`})
    }
})

// D: Delete
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    console.log('[SERVER LOG]: server.delete -> (/api/users/:id) -> {id}: ', id)

    const found = users.find(user => user.id == id)

    if (found) {
        try {
            users = users.filter(user => user.id !== id)
            res.status(200).json(found)
        } catch (error) {
            res.status(500).json({ error: "The user could not be removed." })
        }
    } else {
        res.status(404).json({message: `The user with the specified ID: ${id} does not exist.`})
    }
})


server.listen(PORT, () => {
    console.log(`[SERVER LOG]: listening on http://localhost:${PORT}`);
})