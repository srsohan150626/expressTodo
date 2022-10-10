const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token-key'];
    jwt.verify(token, "SecretKey12345678", function (err, decoded) {
        if (err) {
            res.status(401).json({success: false, msg: "unauthorised"});
        } else {
            req.headers.username = decoded['data']['username'];
            next();
        }
    });

}