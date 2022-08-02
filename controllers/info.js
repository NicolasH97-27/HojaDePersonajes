const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Info = require('../models/info')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const info = await Info
  .find({user:decodedToken.id})
    
  response.json(info)
})

notesRouter.get('/:id', async (request, response) => {
  const info = await Info.findById(request.params.id)

  if (info) {
    response.json(info.toJSON())
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const { name,age,gender } = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const info = new Info({
    name,
    age,
    gender,
    date: new Date(),
    user: user._id
  })

  const savedNote = await info.save()
  
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Info.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
  }

  Info.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter