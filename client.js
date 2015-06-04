var amqp = require('amqp');

var connection = amqp.createConnection();

connection.on('ready', function () {
  console.log('ready');

  connection.queue('orders', {passive: true}, function (q) {
    q.bind('#');

    q.subscribe({ack: true}, function (message) {
      console.log('\n\nreceive order on #orders');
      console.log(' ->', message.data.toString());

      // simulate something
      console.log('doing something...');
      setTimeout(function () {
        console.log('publish to microservice');
        connection.publish('microservice', 'done');
        q.shift();
      }, 1000);
    });
  });

});
