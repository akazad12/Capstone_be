import express from 'express';
import User from "../models/userSchema.js";
import bcrypt from "bcrypt.js";


const router = express.Router();

//Create user
router.route('/signup')
.post(async (req,res)=> {
    try{
        const { username, email, password } = req.body;
        // hashPassword
        const hashedPassword = await bcrypt.hash(password,10)
        //create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.json({
        message: "Created User",
        user
        });
    } catch(err){
        res.status(400).json({error: err.message})
    }
})

router.route('/signup')
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
        if (!passwordChecker){
            return res.json({error: "invalid email or password"});
        }
        res.json({
            message: 'Login Succesful',
            user
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