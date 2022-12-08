const Router = require('express').Router();

const AuthControllers = require('../app/http/controllers/AuthControllers');
//-----------------imports all the controllers which help to creates routers -------------------X
const NotesControllers = require('../app/http/controllers/NotesCotrollers');
const FetchUser = require('../app/http/middlewares/FetchUserMiddleware');
 
//---------------------Start to creates our routers with the help of controllers---------------X

//Users collections end points------------------X
Router.post('/auth/register',AuthControllers().Register); //Register the user ,using POST '/api/auth/register'
Router.post('/auth/login',AuthControllers().Login); //Login the user ,using POST '/api/auth/login'
Router.get('/auth/getUser',FetchUser,AuthControllers().getUser); //Get the user detials, using GET '/api/auth/getUser'

//Notes collections ent points
Router.get('/notes/fetchNotes',FetchUser,NotesControllers().fetchNotes); //Fetch all notes which have user.id, using GET '/api/notes/fetchNotes'
Router.post('/notes/addNote',FetchUser,NotesControllers().addNote); //Add a new note,using '/api/notes/addNote'
Router.patch('/notes/updateNote/:id',FetchUser,NotesControllers().updateNote); //Update a note which have given id ,using '/api/notes/updateNote/:id'
Router.delete('/notes/deleteNote/:id',FetchUser,NotesControllers().deleteNote); //Delete a note which have given id ,using '/api/notes/deleteNote/:id'

module.exports = Router