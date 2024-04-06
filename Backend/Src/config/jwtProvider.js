const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = async (userId) => {
    console.log(userId, 'usrid'); // Log the provided userId for debugging

    // Convert ObjectId to string
    const userIdString = userId.toString();
    console.log(userIdString, 'userIdString');

    // Generate token with the string representation of ObjectId
    const token = jwt.sign({ userId: userIdString }, process.env.SECRET_KEYY);

    console.log('Generated token:', token); // Log the generated token for debugging

    return token;
}


const getUserIdFromToken = async (token) => {
    try {
        // console.log('Secret key:', process.env.SECRET_KEYY);
        let splicedToken = token.slice(1, token.length-1)
        console.log(splicedToken, 'splicedToeken');
        console.log('Received token:', token);
        const decodedToken = await jwt.verify(splicedToken, process.env.SECRET_KEYY);
        console.log(decodedToken ,'decodedToekn');
        return decodedToken.userId;
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return null;
    }
}


module.exports = { generateToken, getUserIdFromToken };
