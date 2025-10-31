const express = require('express')
const app = express()
const { PORT } = require('./config/serverConfig')

const prepareAndStartserver = () => {
    app.listen(PORT,() => {
        console.log(`Server started at ${PORT}`);
    })
}


prepareAndStartserver()