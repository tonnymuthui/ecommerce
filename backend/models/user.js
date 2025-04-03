const mongoose = require("mongoose");
const bcrypt = require(bcrypt);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        role: {
            type: String,
            default: "customer",  //customer, admin and later i can add vendors.. maybe
        },
    },
    {timestamps: true}

);

// hashing pwd b4 saving user
userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcryp.hash(thispassword, salt);
        next();
    
    } catch (error){
        next(error);
    }
    
});


// compare the above hashed pwd during login

const User = mongoose.model("User, userSchema");

module.exports = User;