const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {body, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")
const verifyMail = require("../middleware/verifymail")
const JWT_SECRET = process.env.JWT_SECRET;
const randomstring = require("randomstring");
const passwordResetMail = require("../middleware/passwordresetmail");
const bcryptjs = require("bcryptjs")

const saltForResetPassword = bcryptjs.genSaltSync(10)


// Route 1: Sign Up Using localhost:5000/api/auth/createuser (POST) (No Login Required)
router.post("/createuser",[
    body("name", "Please Enter A Valid Name!").isLength({min: 3}),
    body("email", "Please Enter A Valid E-mail!").isEmail(),
    body("password", "Password Must Be Atleast 8 Characters !").isLength({min:8}),
], async (req, res)=>{
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
        const secPassword = await bcryptjs.hashSync(req.body.password,bcryptjs.genSaltSync(10));
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        });
        verifyMail(user.email);
        return res.send({success:true})
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
        const passwordCompare = await bcryptjs.compareSync(req.body.password, user.password);

        if(!passwordCompare){
            return res.status(400).json({error:"Invalid Credentials!"})
        }    
        if(!user.active){
            return res.status(400).json({error:"User Account Not Activated!"})
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


// Route 4: Verify Email Of The User localhost:5000/auth/verify/:id (GET) (No Login)
router.get("/verify/:id", async (req, res)=>{
    let message = "";
    let status = ""
    try{    
        let user = await User.findOne({_id:req.params.id});
        if(!user){
            message = "Invalid Confirmation ID!";
            status = "error";
        }
        if(!user.active){
            user.active = true;
            user.save()
            message = "Account Activated Succesfully"
            status = "success";
        }
        else{
            message = "User Already Activated!";
            status = "error";
        }

        return res.redirect(`${process.env.FRONTEND_URL}/login?status=${status}&message=${message}`);
    }
    catch(error){
        message = "Internal Server Error Occured!";
        status = "error";
        return res.redirect(`${process.env.FRONTEND_URL}/forgot-password?status=${status}&message=${message}`);
    }
})


// Route 5: Trigger Forget Password Mail For The User localhost:5000/auth/forgotpassword (POST) (No Login)
router.post("/forgotpassword",[body("email", "Please Enter A Valid E-mail!").isEmail()], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{    
        let user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({error:"Account With This Email Do Not Exist!"});
        }
        let resetPasswordToken = randomstring.generate();
        passwordResetMail(req.body.email, resetPasswordToken);
        user.resetPasswordToken = bcryptjs.hashSync(resetPasswordToken, saltForResetPassword)
        user.save();
        return res.json({success: true});
    }
    catch(error){
        console.error(error.message)
        return res.status(500).json({error:"Internal Server Error Occured!"})
    }
})


// Route 6: Verify Reset Password Token localhost:5000/verifyresetpasswordtoken/:resetPasswordToken (POST) (No Login)
router.post("/verifyresetpasswordtoken", async (req, res)=>{
    try{    
        const resetPasswordToken = bcryptjs.hashSync(req.body.resetPasswordToken, saltForResetPassword)
        let user = await User.findOne({resetPasswordToken:resetPasswordToken});
        if(!user){
            return res.status(400).json({error: "Reset Password Token Is Invalid!"});
        }
        else{
            return res.send({success: true});
        }
    }
    catch(error){
        console.error(error.message)
        return res.status(400).json({error : "Internal Server Error Occured!"});
    }
})


// Route 7: Get New Password And Trigger Reset Password localhost:5000/resetpassword/ (POST) (No Login)
router.post("/resetpassword", async (req, res)=>{
    try{   
        const resetPasswordToken = bcryptjs.hashSync(req.body.resetPasswordToken, saltForResetPassword)
        let user = await User.findOne({resetPasswordToken:resetPasswordToken});
        if(!user){
            return res.status(400).json({error: "Invalid Request!"})
        }
        const secPassword = await bcryptjs.hashSync(req.body.password,bcryptjs.genSaltSync(10));
        user.password = secPassword;
        user.resetPasswordToken = "";
        user.save()
        return res.status(200).json({success: "Password Succesfully Changed"})
    }
    catch(error){
        console.error(error.message)
        return res.status(500).json({error: "Internal Server Error Occured!"})
    }
})
module.exports = router;    