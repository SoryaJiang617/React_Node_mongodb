const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User=require('../models/userModel')

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    if(!name|| !email || !password){
        res.status(400)
        throw new Error('please all fields')
    }
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user= await User.create({name,email,password:hashedPassword})
    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
        })
    }

    res.json({message:'register user'})
})
const loginUser = asyncHandler(async(req,res)=>{
    res.json({message:'login user'})
})
const getMe = asyncHandler(async(req,res)=>{
    res.json({message:'user data'})
})

module.exports={registerUser,loginUser,getMe}