const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.loginUser = (req, res) => {
    let username = req.body['username'];
    let password = req.body['password'];
    UserModel.find({username: username, password: password}, (err, data) => {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            if (data.length > 0) {
                let payload = {
                    exp: Math.floor(Date.now() / 1000) + (48 * 60 * 60),
                    data: data[0]
                }
                let token = jwt.sign(payload, "SecretKey12345678");
                res.status(400).json({success: true, token: token, data: data});
            } else {
                res.status(401).json({success: false, msg: "unauthorised"});
            }
        }
    })

}