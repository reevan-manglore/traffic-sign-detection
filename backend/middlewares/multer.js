const multer  = require('multer');
const path = require("path");


const storageEngine = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,"./public/video/");
        },
        filename:(req,file,cb)=>{
            const fName = Date.now() + path.extname(file.originalname);
            console.log(`file of orginal name ${file.originalname} renamed to ${fName}`);
            cb(null,fName);
        }
    }
);
module.exports =  multer({storage:storageEngine});;