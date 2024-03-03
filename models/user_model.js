const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        },
    },
    password: {
        type: String,
        required: true,
        min: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error(`Password must not contain "password"`);
            }
        },
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:20
    },
    from:{
        type:String,
        max:20
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
    posts: {
        type: Number,
        default: 0,
    }
},{timestamps:true});

const User = new mongoose.model("User", UserSchema);

module.exports = User;