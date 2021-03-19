const Redirect = require('./package') 
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

const redirect = new Redirect('/', 3000)
redirect.listen('none', app)
