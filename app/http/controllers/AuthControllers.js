//-----------------------Imports / requireds the contents modals,middlewares-------------X
const UserModal = require('../../modals/UserModal'); //To save our user

const bcrypt = require('bcryptjs'); //Converting password into hash
const jwt = require('jsonwebtoken'); //To confirm unique users

function AuthControllers() {
    return {
        // Register the user ,using POST '/api/auth/register'
        async Register(req, res) {
            //Get the content from req.body
            const { name, email, password, cpassword } = req.body

            try {
                //Check are all blanks
                if (!name || !email || !password || !cpassword) {
                    return res.status(404).json({ success: false, msg: 'All field are required' });
                }

                //Check the password and confirm password are match
                if (!(password === cpassword)) {
                    return res.status(401).json({ success: false, msg: 'Password or confirm password did not match' });
                }

                //Check given user is already exist into database
                let user = await UserModal.findOne({ email: req.body.email });

                if (user) {
                    return res.status(401).json({ success: false, msg: 'Given email or name is already exist' });
                }

                //Converting the password into hash
                const hashPassword = await bcrypt.hash(password, 10);

                //if user not exist then register the user
                user = await UserModal({
                    name,
                    email,
                    password: hashPassword
                })

                let response = await user.save();

                return res.status(200).json({ success: true, msg: 'You are register succuessfully', response });

            } catch (error) {
                return res.status(500).json({ success: false, msg: `Error occured during register user ${error}` });
            }
        },

        //Login the user, using POST '/api/auth/login'
        async Login(req, res) {
            //Get the content from req.body
            const { email, password } = req.body

            try {
                //Check are all blanks
                if (!email || !password) {
                    return res.status(404).json({ success: false, msg: 'All field are required' });
                }

                //Check given user is already exist into database
                let user = await UserModal.findOne({ email: req.body.email });

                if (!user) {
                    return res.status(401).json({ success: false, msg: 'Email or password are did not register' });
                }

                //Compare the password match with database passowrd
                const ComparePassword = await bcrypt.compare(password, user.password)

                if (!ComparePassword) {
                    return res.status(401).json({ success: false, msg: 'Email or Password are not match' });
                }

                //Defining the constriants of jwt token
                const payloads = {
                    users: { id: user.id }
                }

                const token = await jwt.sign(payloads, process.env.JWT_SECRET_KEY);

                return res.status(200).json({ success: true, msg: 'login the user successfully', token });


            } catch (error) {

            }

        },

        //Get the details of user , using auth-token
        async getUser(req, res) {
            //get the details of user from id
            try {
                let user = await UserModal.findById({ _id: req.user.id }).select('-password');

                return res.status(200).json({ success: true, msg: 'Get the user,which we have auth token', user });
               
            } catch (error) {
                return res.status(500).json({ success: false, msg: `Error occured during auth-token user detials ${error}` });
            }
        }
    }
}

module.exports = AuthControllers;