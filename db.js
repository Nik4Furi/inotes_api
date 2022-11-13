const mongoose = require('mongoose');

//Define the variables from '.env'
const server = process.env.DB_SERVER
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const db_name = process.env.DB_NAME

//Connecting to database
mongoose.connect(`${host}://${server}:${port}/${db_name}`,{useUnifiedTopology:true,useNewUrlParser:true}).
then(()=>console.log('Connection to database successfully')).
catch((e)=>console.log('Connection error occured ',e))