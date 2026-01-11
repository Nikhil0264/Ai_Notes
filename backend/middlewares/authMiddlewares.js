import jwt from 'jsonwebtoken'
import { JWTSECRET } from '../env.js';


export const Protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token  = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token,JWTSECRET);
            req.user = {
                id:decode.id,
                role:decode.role
            }
            next();
        }catch(error){
            console.log(error);
            return res.status(500).json({
                message:"Not authorized, token failed",
            })
        }
    }
    if(!token){
       return res.status(401).json({ message: "Not authorized, no token" });
    }
}

export const adminOnly = async(req,res,next)=>{
    if (req.user && req.user.role === "admin") {
        next(); 
    } else {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
}
