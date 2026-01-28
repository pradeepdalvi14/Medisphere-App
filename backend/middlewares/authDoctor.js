import jwt from "jsonwebtoken"

//user authentication middleware

const authDoctor = async(req,res,next)=>{
    try{
        const {dtoken} = req.headers
        if(!dtoken){
            return res.json({success:false,message:'Not authorized Login again'})
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        // Better practice: use req.user instead of req.body.userId
        req.user = { id: token_decode.id };

        next();
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authDoctor