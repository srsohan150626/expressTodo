const mongoose = require('mongoose');
const SchemaData = mongoose.Schema({
    username: {type: String, required: true},
    topic: {type: String, required: true},
    description: {type: String},
    status: {type: String},
    createdAt: {type: Date},
    updatedAt: {type: Date}
}, {versionKey: false});

const TodoListModel = mongoose.model("todolist", SchemaData);
module.exports = TodoListModel;