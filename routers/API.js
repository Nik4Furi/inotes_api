const Router = require('express').Router();

const AuthControllers = require('../app/http/controllers/AuthControllers');
//-----------------imports all the controllers which help to creates routers -------------------X
const HomeControllers = require('../app/http/controllers/HomeControllers');
const FetchUser = require('../app/http/middlewares/FetchUserMiddleware');

//---------------------Start to creates our routers with the help of controllers---------------X
Router.get('/',HomeControllers().Index); //Get your home page ,using GET '/'
//Users collections end points------------------X
Router.post('/auth/register',AuthControllers().Register); //Register the user ,using POST '/api/auth/register'
Router.post('/auth/login',AuthControllers().Login); //Login the user ,using POST '/api/auth/login'
Router.get('/auth/getUser',FetchUser,AuthControllers().getUser); //Get the user detials, using GET '/api/auth/getUser'

module.exports = Router