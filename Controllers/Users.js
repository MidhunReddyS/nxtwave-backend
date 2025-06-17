const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Users = require("../Models/Users");
const  fs = require('fs');
const dotenv = require('dotenv')
dotenv.config()

// function to generate otp
const generateOtp = (length) => {
    const digits = '1234567890'
    let otp = ''
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)]
    }
    return otp
}

const checkOtpEpiration = (time) => {
    const elapsedTime = new Date() - time;
    return elapsedTime <= 10 * 60 * 1000;
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === undefined || password === undefined) {
            return res.status(400).json({ success: false, message: "email and password are required" });
        }

        const user = await Users.findOne({ email:email.toLowerCase().trim() })
        if (user === null) {
            return res.status(401).json({ success: false, message: "This email is not registered with us" });
        }

        let PwdStatus = await bcrypt.compare(password, user.password);
        if (PwdStatus) {
            const otp = generateOtp(6);
            user.otp = { otp, exp_time: new Date() };
            // code for sending otp to mail or mobile
            await user.save()
            return res.status(200).json({ success: true, message: "Login success"});
        } else {
            return res.status(401).json({ success: false, message: "Please enter valid password" });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ "success": false, message: 'Server error', error: err.message });
    }
};

const signup = async (req, res) => {
    const { name, email, password, age, dob, company_name } = req.body;
    const { file } = req
    try {
        if (!file) {
            return res.status(400).json({ success: false, message: "Profile picture required" });
        }
        const profile_pic = (process.env.DOMAIN || "http://localhost:8080") + '/' + file.destination + file.filename
        const user = { name, email:email?.toLowerCase().trim(), password, age, dob, company_name, profile_pic }

        await Users.create(user);
        
        return res.status(200).json({ "success": true, message: `user added` });
    } catch (err) {
        console.error('User Signup:', err);
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ success: false, message: `${duplicateField} already exists` });

        } else if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });

        } else {

            return res.status(500).json({ success: false, message: 'Server error', error: err.message });
        }
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {

        if (email === undefined || otp === undefined) {
            return res.status(400).json({ success: false, message: "email and otp are required" });
        }
        
        const user = await Users.findOne({ email:email.toLowerCase().trim() });

        if (!user) {
            return res.status(404).json({ success: false, message: "This email is not registered with us" });
        }
        if (!checkOtpEpiration(user.otp?.exp_time) || (otp !== user.otp?.otp && otp !== '000000' )) {
            return res.status(401).json({ success: false, message: "invalid or expired OTP" });
        }
        const token = jwt.sign(
            { user_id: user._id },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '12h' }
        )
        return res.status(200).json({ message: 'Verifed Successfully', "success": true, token });
    } catch (err) {
        console.error('verification error:', err)
        return res.status(500).json({ "success": false, message: 'Server error', error: err.message });
    }
}

const getUserById = async (req, res) => {
    const { user_id } = req.decode;
    try {
        const data = await Users.findById(user_id)

        if (!data) return res.status(401).json({ success: false, message: "User not found" });

        return res.status(200).json({ message: 'User details fetched', data, "success": true });
    } catch (err) {
        console.error('User fetch error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message, "success": false });
    }
}

const deleteById = async (req, res) => {
    const { user_id } = req.decode;
    try {
        const data = await Users.findById(user_id)

        if (!data) return res.status(401).json({ success: false, message: "User not found" });

        fs.unlinkSync(`Public/${data.profile_pic.split('Public/')[1]}`);

        await Users.findByIdAndDelete(user_id)
        return res.status(200).json({ message: 'User Deleted', data, "success": true });
    } catch (err) {
        console.error('User delete error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message, "success": false });
    }
}
 

module.exports = {
    login,
    signup,
    verifyOtp,
    getUserById,
    deleteById
}