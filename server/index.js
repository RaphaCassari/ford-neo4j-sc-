const express = require('express'),
    app = express(),
    routes = require('./layers/routes/index'),
    cors = require('cors'),
    port = '3000';

// Para interpretar o require
app.use(express.json())
app.use(routes);
app.use(cors())
app.options('*', cors());
app.listen(port, function() {
    console.log(`http://localhost:${port}`)
})