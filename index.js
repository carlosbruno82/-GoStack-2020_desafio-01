const express = require('express')

const server = express()

server.use(express.json())

const projects = []

function idExists(req, res, next) {
  const { id } = req.params

  const findId = projects.find(obj => obj.id === id)

  if(!findId) {
    return res.status(400).json({error: 'ID does not exists'})
  }

  return next()
}

server.use((res, req, next) => {
  console.count('Request')

  next()
})


server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body

  projects.push({id, title, tasks})

  return res.json(projects)
})

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.put('/projects/:id', idExists, (req, res) => {
  const { id } = req.params

  const { title } = req.body

  const isID = projects.find(obj => obj.id === id)

  isID.title = title

  return res.json(projects)
})

server.delete('/projects/:id', idExists, (req, res) => {
  const { id } = req.params

  const isID = projects.find(obj => obj.id === id)
  projects.splice(isID, 1)

  return res.send()
})

server.post('/projects/:id/tasks', idExists, (req, res) => {
  const { id } = req.params

  const { title } = req.body

  const isID = projects.find(obj => obj.id === id)

  isID.tasks = title

  return res.json(isID)
})
  

server.listen(3000)