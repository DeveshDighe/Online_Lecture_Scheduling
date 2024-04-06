const jwtProvider = require('../config/jwtProvider.js')
const userService = require('../Services/user.service.js')

const authenticate = async (req, res, next) => {
    try {
        const token = await req.headers.authorization?.split(' ')[1];
            console.log('middelware', token);
        if (!token) {
            return res.status(404).send({error: 'token not found...'})
        }
        console.log('2');
        const userId = await jwtProvider.getUserIdFromToken(token)
        const user = await userService.findUserbyId(userId)
        console.log('middelware3'. user);
        
        req.user = user;


        next()

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
    
}

module.exports = authenticate