
const userService = require('../Services/user.service.js')
const jwtProvider = require('../config/jwtProvider.js')
const bcrypt = require('bcrypt')


const register = async (req, res) => {
    console.log('aya kya yaha');
    try {
        const user = await userService.createUser(req.body);

        if (user.error) {
            return res.status(400).send({ error: user.error });
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: 'Registration success', success : true });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const login = async (req, res) => {
    
    try {
        const { password, email } = req.body;

        const user = await userService.findUserbyEmail(email)


        if (!user) {
            return res.status(404).send({ message: 'User not found with email' })
        }
        const ispassWordValid = await bcrypt.compare(password, user.password)
        if (!ispassWordValid) {
            return res.status(401).send({ message: 'Invalid Password' })
        }

        const jwt = await jwtProvider.generateToken(user._id)

        console.log(jwt, 'jwejejejejejejejejeje');

        return res.status(200).json({ jwt, message: 'login success', success: true , user})
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


module.exports = { register, login }