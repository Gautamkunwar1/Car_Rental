import User from "../models/User.js";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";


// Generate JWT Token
const generateToken = (userId) =>{
    const payload = userId;
    return jwt.sign(payload,process.env.JWT_SECRET)
}
export const registerUser = async(req , res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password ||password.length<8){
            return res.status(400).json({success:false,message:"Fill all the fields"})
        }
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({success:false,message:'User already exists'})

        const hashedPassword = await bcrypt.hash(password,10)
        const user= await User.create({name,email,password:hashedPassword})
        const token = generateToken(user._id.toString());

        return res.status(201).json({success:true,token})

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}

export const loginUser= async(req,res)=>{
    try {
        const{email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({success:false,message:"User not found"});
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched) return res.status(400).json({success:false,message:"Invalid credentials"});
        const token = generateToken(user._id.toString())
        return res.status(201).json({success:true,token})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}

// Get user data using Token(JWT)
export const getUserData = async(req,res)=>{
    try {
        const{user} = req;
        return res.status(200).json({success:true,user});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}