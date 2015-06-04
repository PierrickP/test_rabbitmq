var amqp = require('amqp');

var connection = amqp.createConnection();

connection.on('ready', function () {
  console.log('ready');

  connection.queue('orders', {durable: true, autoDelete: false});

  connection.queue('microservice', function (q) {
    q.bind('#');

    q.subscribe(function (message) {
      // broadcast messages
      console.log('receive message on #microservice');
      console.log('emit ->', message.data.toString());
    });
  });

  // simulate "new order"
  setInterval(function () {
    var id = Math.round(Math.random() * 100);
    console.log('publish to #orders', id);
    connection.publish('orders', JSON.stringify({id: 'toto' +  id}));
  }, 100);
});
