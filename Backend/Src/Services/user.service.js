const User = require("../Model/user.model.js");
const bcrypt = require('bcrypt')
const jwtProvider = require('../config/jwtProvider.js')

const createUser = async (userData) => {
    try {
        let { name, email, password } = userData;

        const isEmailExist = await User.findOne({ email });
        const isNameExist = await User.findOne({ name });

        if (isEmailExist) {
            return { error: 'Email already exists' };
        }
        if (isNameExist) {
            return { error: 'Name already exists' };
        }

        password = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password, })

        return user;
    } catch (error) {
        throw new Error(error)
    }
}


const findUserbyId = async (userId) => {
    try {

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('user not found with id : ', userId)
        }

        return user;

    } catch (error) {
        throw new Error(error)
    }
}

const findUserbyEmail = async (email) => {
    try {

        const user = await User.findOne({ email });

        if (!user) {
            return 
        }

        return user;

    } catch (error) {
        throw new Error(error)
    }
}
const findUserbyName = async (name) => {
    try {

        const user = await User.findOne({ name });

        if (!user) {
            return 
        }

        return user;

    } catch (error) {
        throw new Error(error)
    }
}

const getUserProfileByToken = async (token) => {
    try {

        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await findUserbyId(userId)

        if (!user) {
            throw new Error('user not found with id : ', userId)
        }

        return user;

    } catch (error) {
        throw new Error(error)
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find();

        return users;
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = { createUser, findUserbyId, findUserbyEmail, getUserProfileByToken, getAllUsers,findUserbyName }