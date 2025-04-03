const checkRole = (role) => {
    return(req, res, next) => {
        if(!role.includes(req.role)) {
            return res.status(403).json({ message: "Access Denied!"});
        }
        next();
    };
};

module.exports = checkRole;