import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWTSECRET } from "../env.js";

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Provide All Credentials"})
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already Exits"})
        }
        const hassedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,email,password:hassedPassword,role
        });
        return res.status(200).json({message:"Registration Successfull",
            user:newUser
        })
    }catch(error){
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

export const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Provide All Esswntials"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"wrong Password"})
        }
        const token = jwt.sign(
            {
                id: user._id,
                 role: user.role
             },
             JWTSECRET,
             { expiresIn: "2d" }
        )
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
            id: user._id,
            role: user.role,
            }
          });
    }catch(error){
        return res.status(500).json({
            message:"server Error",
            error:error.message
        })
    }
}


export const allNotes = async(req,res)=>{
    try{
        res.json({message:"getting all Notes"})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error while getting Notes"})
    }
}
export const provideNotes = async(req,res)=>{ // admin functionality
    try{
        res.json({message:"providing all nodes"})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error while getting Notes"})
    }
}

