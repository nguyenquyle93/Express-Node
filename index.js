// const express = require('express')
import express from 'express';
const app = express()
const port = 3000
import {router} from './Account/accountApi.js';
import bodyParser from 'body-parser';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json('Hello World aa!')
})

app.get('/home', (req, res, next) => {
  // res.json('Hello World home1!')
  req.akabum = 'conciu'
  next()
},(req, res) => {
  res.json('Hello World home2!'+req.akabum)
},(req, res) => {
  res.json('Hello World home3!')
})

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

app.use('/account', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})