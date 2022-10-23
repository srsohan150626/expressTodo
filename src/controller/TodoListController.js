const TodoListModel = require("../models/TodoListModel");
const jwt = require('jsonwebtoken');

exports.getTodoList = (req, res) => {
    let username = req.headers['username'];
    let projection = "username topic description status createdAt updatedAt"
    TodoListModel.find({username: username}, projection, (err, data) => {
        if (err) {
            res.status(400).json({success: "false", data: err});
        } else {
            res.status(200).json({success: true, data: data});
        }
    })
}

exports.createTodo = (req, res) => {
    let postBody = {
        username: req.headers['username'],
        topic: req.body['topic'],
        description: req.body['description'],
        status: "New",
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    TodoListModel.create(postBody, (err, data) => {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            res.status(201).json({success: true, data: data});
        }
    })
}

exports.updateTodo = (req, res) => {
    let _id = req.body['_id'];
    let postBody = {
        topic: req.body['topic'],
        description: req.body['description'],
        updatedAt: Date.now()
    }
    TodoListModel.updateOne({_id: _id}, {$set: postBody}, {upsert: true}, (err, data) => {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            res.status(200).json({success: true, data: data});
        }
    })
}

exports.updateTodoStatus = (req, res) => {
    let _id = req.body['_id'];
    let postBody = {
        status: req.body['status'],
        updatedAt: Date.now()
    }
    TodoListModel.updateOne({_id: _id}, {$set: postBody}, {upsert: true}, (err, data) => {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            res.status(200).json({success: true, data: data});
        }
    })
}

exports.deleteTodo = (req, res) => {
    let _id = req.body['_id'];
    TodoListModel.remove({_id: _id}, (err, data) => {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            res.status(200).json({success: true, data: data});
        }
    })
}

exports.filterByStatus = (req, res) => {
    let username = req.headers['username'];
    let projection = "username topic description status createdAt updatedAt";
    let status = req.body['status'];
    TodoListModel.find({username: username, status: status}, projection, (err, data) => {
        if (err) {
            res.status(400).json({success: "false", data: err});
        } else {
            res.status(200).json({success: true, data: data});
        }
    })
}

exports.filterByDate = (req, res) => {
    let username = req.headers['username'];
    let projection = "username topic description status createdAt updatedAt";
    let form_date = req.body['form_date'];
    let to_date = req.body['to_date'];

    TodoListModel.find({
        username: username,
        createdAt: {
            $gte: new Date(form_date),
            $lte: new Date(to_date)
        }
    }, (err, data) => {
        if (err) {
            res.status(400).json({success: "false", data: err});
        } else {
            res.status(200).json({success: true, data: data});
        }
    })
}