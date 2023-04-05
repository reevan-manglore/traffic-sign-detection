const router = require("express").Router();
const file = require("../middlewares/multer")


router.post("/upload-video",file.single("video"),(req,res)=>{
    const {filename:fileName} = req.file;

    res.json({"fileName":fileName});

});




module.exports =  router;