const mongoose = require('mongoose');
const SchemaData = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true,  unique: [true, "This username Already exist"],},
    city: {type: String},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "This email Already exist"],
        validate: {
            validator: function (value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(value)
            },
            message: "Invalid Bangladeshi mobile number"
        },
        unique: [true, "This phone number Already exist"],
    },
    password: {type: String, min: 6}
}, {versionKey: false});

const UserModel = mongoose.model("users", SchemaData);
module.exports = UserModel;