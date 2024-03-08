const { verifyToken, decodeToken } = require('../utils/jwtUtil')

exports.isAuth = async (req, res, next) => {
    let token = req.params.token;
    // console.log("token", token)
    try {
        if( !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(403).json({message: 'Invalid token, Unauthorized user'})
        }

        token = req.headers.authorization.split(' ')[1]
        console.log("token", token)

        const { expired } = verifyToken(token);
    
        if (expired) {
            return res.status(403).json({message: 'Expired token, Unauthorized user'})
        } 
        // req.user = { _id: decode?._id }
        req.user = decodeToken(token)
        console.log("req.user", req.user)
       
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error
        })    
    }
};