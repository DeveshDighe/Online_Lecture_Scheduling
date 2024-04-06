const User = require("../Model/user.model")


const getAllLectures = async  (id) => {
  try {
    const newId = id.toString()
    console.log(newId, 'newId');
    const userWithLectures = await User.findById(newId)
    .populate({
        path: 'lectures',
        populate: {
            path: 'Course' // Populate the Course field inside the lectures array
        }
    });

    console.log(userWithLectures, 'userWithLectures');
    if (!userWithLectures) {
      throw new Error('no lectures Found')
    }
    return userWithLectures
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getAllLectures
}