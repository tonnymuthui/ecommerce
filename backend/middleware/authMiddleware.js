const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split("")[1];

    }

    if (!token) return res.status(401).json({ message: "Not authorization, no token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();

    } catch(error){
        res.status(401).json({ message: "Not Authorized.. token failed"});
    }

};

module.exports = protect;