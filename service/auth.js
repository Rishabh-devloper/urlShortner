const JWT =  require('jsonwebtoken')
const secret = '12345'
function setUser(user){
   
    return JWT.sign({
        _id: user._id,
        email: user.email
    } , secret )
}
function getUser(token ){
    return JWT.verify(token , secret)
};

module.exports = {
    setUser,
    getUser
}