import express from 'express';
import User from "../models/userSchema.js"


const router = express.Router();

//Create user
router.route('/')
.post(async (req,res)=> {
    try{
        const user = await User.create(req.body)
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