const express = require('express')
const amqp = require('./amqp.js')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

const home = (req, res) => {
  res.sendFile('index.html', {root : __dirname})
}

const homePost = (req, res) => {
  let texto = req.body.texto
  amqp.enviar(texto)
  texto = ''
}

app.get('/', home)
app.post('/', homePost)

app.listen(3000, () => {
  console.log('Executou...')
})