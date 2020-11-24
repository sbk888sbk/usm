const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator');

userSchema = new  mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Please tell us your name!']
    },
    gender : {
        type : String,
        enum :['male', 'female', 'other'],

    },
    mobileNumber : {
        type : Number,
        minlength: 10,
        maxlength:10,

    },
    emailId :{
        type: String,

        validate : [validator.isEmail, 'Please provide a valid email']
    },
    designation : {
        type: String,
        enum : ['admin', 'manager', 'staff'],
        required: [true, 'Please provide designation']
    },
    password:{
        type : String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false
    }
})

userSchema.pre('save', async function(next) {
    if(!this.emailId && !this.mobileNumber){
        console.log("here1")
        return next(new Error('Please provide either an email or a mobile number'))
    }
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
    ) {
        return await bcrypt.compare(candidatePassword, userPassword);
    };
    



userModel = mongoose.model('User', userSchema)
module.exports = userModel;