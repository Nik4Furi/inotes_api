
//------------------Creationg of the 'HomeControllers' functions --------------X
function HomeControllers() {
    return {
        Index(req,res){
            res.send('inotes--take your note');
        }
    }
}

module.exports = HomeControllers;