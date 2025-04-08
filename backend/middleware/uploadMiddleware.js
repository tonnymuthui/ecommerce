const multer = require("multer");
const path = require("path");

//defining storage below

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    }, 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-{file.originalname}`);
        
    },
});

// file filter to allow images only
const fileFilter = (req, res, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);


    if (extname && mimetype) {
        cb(null, true);

    } else {
        cb("Images only (jpeg/jpg/png");
    }


};


const upload = multer({
    storage,
    fileFilter,
    
});

module.exports = upload;