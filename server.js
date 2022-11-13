//----------------imports / defines the variables from 'package.json'--------------X
require('dotenv').config();
require('./db'); //Connect to database
const express = require('express');
const app = express();

//----Check the app is work with urls
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//------------------Routes API defines from 'routers/API'----------------X
const API  = require('./routers/API'); //To creates the API's

//----Define the path of API routes
app.use('/api',API);

//---------------Define server variables from '.env'---------------------X
const PORT = process.env.PORT 
const DOMAIN = process.env.DOMAIN

//-----------------Listen to the server--------------------X
app.listen(PORT,()=>console.log(`Application listen at ${DOMAIN}:${PORT}`));