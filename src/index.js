const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index')
const db = require('./models/index')
const { User,Role } = require('./models/index')

const prepareAndStartserver = () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended : true}));
    
    app.use('/api',apiRoutes)

    app.listen(PORT,async() => {
        console.log(`Server started at ${PORT}`);

        if(process.env.DB_SYNC === "true"){
            db.sequelize.sync({alter : true})
        }

        // const user = await User.findByPk(3)
        // const role = await Role.findByPk(3)
        // const ans = await user.getRoles() //addRole(role) yeh fn bhi hota h    
    })
}


prepareAndStartserver()