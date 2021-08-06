const express = require('express');
require('dotenv').config(); // It appends .env file to process.env; used in local environment setup - put all sensitive data here
// console.log(process.env); Contains all environment variables
// We can create application using Express
const app = express();
// And we can make our app listen on a port number (kind of like API) and define a callback
// Use port from process.env if port available otherwise use 8080 as fallback port
const port = process.env.PORT || 8080;
const messageService = require('./services/message');
const bodyParser = require('body-parser');
const routesController = require('./routes/v1')(); //This will call index.js inside routes/v1
app.get('/',(req,res) => {
    res.status(200).json({
        success: true,
        message: messageService.getUserMessage('GET')
    })
});

app.post('/',(req,res) => {
    res.status(200).json({
        success: true,
        message: messageService.getUserMessage('POST')
    })
});

app.listen(port, () => {
    console.log("Server has started and it is listening on Port:", port);
});

app.use(bodyParser.json({extended: true}));
app.use('/api/v1',routesController);

