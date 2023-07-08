const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {body, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = process.env.JWT_SECRET;
// const bcryptjs = require("bcryptjs")


// Route 1: Sign Up Using localhost:5000/api/auth/createuser (POST) (No Login Required)
router.post("/createuser",[
    body("name", "Please Enter A Valid Name!").isLength({min: 3}),
    body("email", "Please Enter A Valid E-mail!").isEmail(),
    body("password", "Password Must Be Atleast 8 Characters !").isLength({min:8}),
],async (req, res)=>{
    // if there are errors, return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        // check if the user with that email already exists
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry, A user with this email already exists!"})
        }
        // let salt = await bcryptjs.genSalt(10);
        // let secPassword = await bcryptjs.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const data = {
            user:{ id: user.id }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
      return res.json({authtoken})
    }
    catch(error){
        console.error(error.message)
      return res.status(500).json({error:"Internal Server Error Occured!"})
    }
})


// Route 2: Login Using localhost:5000/auth/login (POST) (No Login Required)
router.post("/login",[
    body("email", "Please Enter A Valid E-mail!").isEmail(),
    body("password", "Password cannot be blank!").exists(),
],async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{    
        let user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({error:"Invalid Credentials!"});
        }
        // const passwordCompare = await bcryptjs.compare(req.body.password, user.password);
        // if(!passwordCompare){
        // if(req.body.password !== user.password){
        //     return res.status(400).json({error:"Invalid Credentials!"});
        // }
        // else if(){
        //     return res.status(400).json({error:"Invalid Credentials!"});
        // }
        if(req.body.password !== user.password && req.body.email.email !== user.email){
            return res.status(400).json({error:"Invalid Credentials!"})
        }    
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        return res.json({authtoken})
    }
    catch(error){
        console.error(error.message)
        return res.status(500).json({error:"Internal Server Error Occured!"})
    }
})

// Route 3: Get details of a Logged In User Using localhost:5000/auth/getuser (POST) (Login Required)
router.post("/getuser", fetchuser, async (req, res)=>{
    try{
        const user = await User.findById(req.user).select("-password");
      return res.send(user);
    }
    catch(error){
        console.error(error.message)
      return res.status(500).json({error:"Internal Server Error Occured!"})
    }
})


module.exports = router;    