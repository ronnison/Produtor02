const amqp = require('amqplib/callback_api')
const url = process.env['url_rabbit']

function enviar(msg){
amqp.connect(url, function(error0, connection) {
    if(error0) {
      console.log(error0)
      return
    }

    connection.createChannel(function(error1, channel){
      if(error1) {
        console.log(error1)
        return
      }

      var fila = 'hello'
      // var msg = 'Hello World!'

      channel.assertQueue(fila, {durable : false})

      console.log('Enviando mensagem para fila ' + fila + '...')
      channel.sendToQueue(fila, Buffer.from(msg))

      setTimeout(function (){
        connection.close()
        // process.exit(0)
      }, 500)
    })
  })
}

module.exports = { enviar }