const router = require("express").Router();
const file = require("../middlewares/multer")
const authenticate = require("../middlewares/authenticate")


/*
    @TYPE POST
    @ROUTE /api/video/getuser
    @DOCX allows user to upload video
    @ACCESS private
*/
router.post("/upload-video",authenticate,file.single("video"),(req,res)=>{
    const {filename:fileName} = req.file;

    res.json({"fileName":fileName});

});




module.exports =  router;