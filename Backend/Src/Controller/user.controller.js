const User = require("../Model/user.model")
const { getAllLectures } = require("../Services/lecturer.service")
const { getAllUsers } = require("../Services/user.service")
const { getUserIdFromToken } = require("../config/jwtProvider")


const getAllUserController = async (req, res) =>{
  try {
    const allUserData = await getAllUsers()

    return res.status(200).json({message : 'All users fetched' , success : true , allUserData})
  } catch (error) {
    return res.status(200).json({message : 'error in fetching users' , success : false })
  }
}
const UserProfile = async (req, res) => {
  try {
    const jwt = req.body.jwt;
    console.log(req.body.jwt , 'jwt');

    if (!jwt) {
      return res.status(400).json({ message: "JWT token is missing", success: false });
    }

    const userData = await getUserIdFromToken(jwt);
    const user = await User.findById(userData)

    console.log('user', user);
    return res.status(200).json({ message: "User found", success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: error.message, success: false });
  }
}


const getLectures = async (req, res) => {
  try {
    const id = req.user

    const user = id._id
    
    const lectures = await getAllLectures(user)
    console.log(lectures , 'i found lectures');

    res.status(200).json({message : 'Lectures Fetched', success : true, lectures})
  } catch (error) {
    res.status(200).json({message : 'Lectures not Fetched', success : false})
  }
}


module.exports = {
  getAllUserController,
  UserProfile,
  getLectures
}