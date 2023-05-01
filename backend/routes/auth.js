const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");

const authenticate = require("../middlewares/authenticate");


/*
    @TYPE POST
    @ROUTE /api/auth/signup
    @DOCX to signup new user
    @ACCESS PUBLIC
*/
router.post("/signup",(req,_,next)=>{
    console.log(req.body);
    next();
}, [
    body("name", "Enter a valid name").isLength({min:3}),
    body("email").isEmail(),
    body("password").isLength({min:4}),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    if (await UserModel.findOne({ email: req.body.email })) {
        return res.status(400).json({ error: "user email aleredy exist" });
    }
    const saltRounds = 10;
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
    });

    try {
        const dbRes = await user.save();
        const token = jwt.sign(dbRes.id, process.env.SECRET_KEY);
        res.status(200).json({data:{"name":dbRes.name,token,}});
       
    }
    catch(e) {
        console.log(e);
        res.status(500).json({ error: "some error ocuured while creating user" });
     
    }

});


/*
    @TYPE POST
    @ROUTE /api/auth/login
    @DOCX to login existing user
    @ACCESS PUBLIC
*/
router.post("/login",[

    body("email", "please enter valid credentials").exists().isEmail(),
    body("password", "please enter valid credentials").exists(),
], async (req, res) => {
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).json({ data: "please enter valid credentials" });
        }
        const token = jwt.sign(user.id, process.env.SECRET_KEY);
        res.json({data:{"name":user.name,token,}});
    }
    catch {
        res.status(500).json({ error: "some error ocuured in the server" });
    }
});

/*
    @TYPE get
    @ROUTE /api/auth/getuser
    @DOCX get deatails of logged in user
    @ACCESS private
*/

router.get("/getuser",authenticate, async (req, res) => {
   try {
        const userId = req.user.id;
        const userDetails = await UserModel.findById(userId).select("-password");
        const formatedUserDetails = {
            "id":userDetails.id,
            "name":userDetails.name,
            "email":userDetails.email
        };

        res.json(formatedUserDetails);
   } catch  {
    res.status(500).json({ error: "some error ocuured in the server" });
   }
});



module.exports = router;