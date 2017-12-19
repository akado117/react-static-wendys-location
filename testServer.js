const express = require('express');

const app = express();
app.set('port', 3000);

const statics = express.static('./dist');

app.use(statics);

const server = app.listen(app.get('port'), function() {
    const port = server.address().port;
    console.log('Magic happens on port ' + port);
});