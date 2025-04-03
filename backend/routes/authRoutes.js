const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");


const router = express.Router();

//sign up for new user
router.post("/register", async (req, res)=>{
    const { name, email, password, role} = req.body;

    try{
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists"});

        const newUser = new User({ name, email, password, role});
        await newUser.save();

        res.status(201).json({ message: "User created Successfully!"});

    }catch (error){
        res.status(500).json({ message: "Server Error", error: error.message});
        
    }


});

//login user

router.post("/login", async(req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({message: "User does not Exist"});

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) return res.status(400).jspn({message: "Incorrect Password"});

        const token = jwt.sign({ userId: user._id, role: user.loe}, process.env.JWT_SECRET, {
            expiresIn: "12h",
        } );

        res.json({ token });
    } catch(error) {
        res.status(500).json({ message: "Server error", error: erro.message});

    }
});

//getting authenticated user
router.get("/me", async (req, res) => {
    const userId =req.userId;

    try{
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User not Found"});

        res.json({ name: user.name, email: user.email, role: user.role});

    } catch(error) {
        res.status(505).json({message:"Server error", error: error.message});
    }

});

module.exports = router;
       
    
