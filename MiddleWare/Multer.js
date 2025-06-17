const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'Public/images/')
    },
    filename: (req, file, cb) => {
        // Use the original filename
        cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

module.exports = upload