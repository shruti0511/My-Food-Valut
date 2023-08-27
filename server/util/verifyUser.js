const jwt = require('jsonwebtoken');

const verifyUser = async (token) => {
    const decoded = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
    return decoded.UserInfo
}

module.exports = verifyUser