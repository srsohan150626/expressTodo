const UserModel = require("../models/UserModel");

exports.createUser = (req, res) => {
    const reqBody = req.body;
    UserModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            res.status(201).json({success: true, data: data});
        }
    })
}

exports.loginUser = (req, res) => {
    let username = req.body['username'];
    let password = req.body['password'];

}