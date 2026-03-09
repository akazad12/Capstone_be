import express from 'express';
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = express.Router();

//Create user
router.route('/signup')
.post(async (req,res)=> {

    try{
        const { name, email, password } = req.body;
        //check if email/user exists
        if (!name || !email || !password) {
            return res.json({ error: "All fields are required" });
        }

        const nEmail = email.toLowerCase();

        const userExists = await User.findOne({email: nEmail});
        if (userExists) {
            return res.json({error: "User already exists"})
        }
        // hashPassword
        const hashedPassword = await bcrypt.hash(password,10)
        //create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({
        message: "Created User",
        user, token
        });
    } catch(err){
        res.status(400).json({error: err.message})
    }
})

router.route('/login')
.post(async (req,res)=> {
    try{
        const {  email, password } = req.body;
        
        //find by user email
        const user = await User.findOne({email})
        if (!user){
            return res.json({error: "invalid email or password"})
        }
        //check password
        const passwordChecker = await bcrypt.compare(password,user.password)
        console.log(passwordChecker)
        if (!passwordChecker){
            return res.json({error: "invalid email or password"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            message: 'Login Succesful',
            user,token
        })
    } catch(err){
        res.status(400).json({error: err.message})
    }
})

//get all users
.get(async (req,res)=> {
    const users = await User.find();
    res.json(users)
});

//get single user
router.route('/:id')
.get(async (req,res)=> {
    const user = await User.findById(req.params.id);
    res.json(user)
})

//delete user
.delete (async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Deleted'})
})

export default router