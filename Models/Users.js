const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    age:{
        type:Number,
        required:[true, 'age is required']
    },
    dob:{
        type:Date,
        required:[true, 'Date of birth is required'],
    },
    company_name:{
        type:String,
        required:[true, 'Company name is required'],
    },
    profile_pic:{
        type:String,
        required:[false, "please upload a profile pic"]
    },
    otp:{
        type:{
            otp:String,
            exp_time:Date
        },
        required:false
    },
},
{
    runValidators: true,
    timestamps: true,
})

// encrypt password
UserSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next()
})

module.exports = mongoose.model('User',UserSchema)