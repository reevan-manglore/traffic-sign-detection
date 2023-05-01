const router = require("express").Router();
const file = require("../middlewares/multer")
const authenticate = require("../middlewares/authenticate")


/*
    @TYPE POST
    @ROUTE /api/video/getuser
    @DOCX allows user to upload video
    @ACCESS private
*/
router.post("/upload-image",authenticate,file.single("image"),(req,res)=>{
    const {filename:fileName} = req.file;

    res.json({"fileName":fileName});

});




module.exports =  router;