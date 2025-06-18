const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const token_verify = (req, res, next) => {
    try {
        // get the token from header
        const Token = req.headers.authorization.replace("Bearer ", "");

        let jwtSecretKey = process.env.JWT_ACCESS_TOKEN;

        if (!Token) {
            return res.status(401).json({ success: false, message: "Token was not found" });
        }

        // verify the token
        let decode = jwt.verify(Token, jwtSecretKey);
        
        if( decode ){
            req.decode = decode;
            next();
        }else{
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message, message: "token Error" });
    }
}

module.exports = token_verify;