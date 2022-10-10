const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');

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

exports.userInfo = (req, res) => {
    let username = req.headers['username'];
    let projection = "firstname lastname username city email phone";
    UserModel.find({username: username}, projection, (err, data) => {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            res.status(200).json({success: true, data: data});
        }
    })

}