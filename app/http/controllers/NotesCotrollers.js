//-------------------imports/required the modules,middlewarees,config ------------X
// const NotesLengthFix = require('../../config/FixUserNotesLength');
const NoteModal = require('../../modals/NoteModal'); //to save our notes

//---------------Notes controller to work with notes-------------X
function NotesControllers() {
    return {
        //Fetch all notes of user, using '/api/notes/fetchNotes'
        async fetchNotes(req, res) {
            try {
                let notes = await NoteModal.find({ UserId: req.user.id });

                if (notes.length <= 0) {
                    return res.status(200).json({ success: true, msg: 'No note is exist ,plz add your first note' })
                }

                return res.status(200).json({ success: true, msg: 'All notes fetch from database', notes });

            } catch (error) {
                return res.status(500).json({ success: false, msg: `${error}` });

            }
        },

        //Add a note by user,using '/api/notes/addNote'
        async addNote(req, res) {
            //Get the constraints from req.body
            const { title, description, tag } = req.body

            try {
                //Check the req.body is blank
                if (!title || !description) {
                    return res.status(401).json({ success: false, msg: "All fields are required" })
                }

                //Check users notes length is not greater from 50
                // NotesLengthFix(req.user.id,NoteModal);

                let notes = await NoteModal({
                    UserId: req.user.id,
                    title,
                    description,
                    tag
                })
                await notes.save()

                return res.status(200).json({ success: true, msg: 'Add a new note successfully', notes });

            } catch (error) {
                return res.status(500).json({ success: false, msg: `${error}` })
            }
        },

        //Update a note of given user, using '/api/notes/updateNote/:id
        async updateNote(req,res){
            //Get the constraints from req.body
            const {title,description,tag} = req.body

            try {
                //Check the req.body is blank
                if (!title || !description || !tag) {
                    return res.status(401).json({ success: false, msg: "All fields are required" })
                }

                //Define the array to adding our notes req.body
                let newNote = {};

                //first of all,find the fixe user matching id notes
                let notes = await NoteModal.findOne({UserId : req.user.id});

                if (!notes) {
                    return res.status(401).json({success:false,msg:'Sorry you are not valid user'})
                }

                //After finding the user,start to update the note
                if (title) { newNote.title = title }
                if (description) { newNote.description = description }
                if (tag) { newNote.tag = tag }

                //Find the note who have matching id
                notes = await NoteModal.findByIdAndUpdate({_id:req.params.id},{$set:newNote},{new : true});
                
                //Check if id is notmatching
                if (!notes) {
                    return res.status(401).json({success:false,msg:'given note is not updated'})
                }

                return res.status(200).json({success:true,msg:'Note is successfully updated',notes});
            } catch (error) {
                return res.status(500).json({success:false,msg:`Error occured during update a note ${error}`});                
            }
        },

        //Delete a note at a time,using '/api/notes/updateNote/:id'
        async deleteNote(req,res){
            try {
                //first of all,find the fixe user matching id notes
                let notes = await NoteModal.findOne({UserId : req.user.id});

                if (!notes) {
                    return res.status(401).json({success:false,msg:'Sorry you are not valid user'})
                }

                //Find the note who have matching id
                notes = await NoteModal.findByIdAndDelete({_id:req.params.id});
                
                //Check if id is notmatching
                if (!notes) {
                    return res.status(401).json({success:false,msg:'given note is not deleted'})
                }

                return res.status(200).json({success:true,msg:'Note is successfully deleted',notes});
            } catch (error) {
                return res.status(500).json({success:false,msg:`Error occured during delete note ${error}`});                
            }
        }
    }
}

module.exports = NotesControllers;