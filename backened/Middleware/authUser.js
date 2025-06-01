
import jwt from 'jsonwebtoken'

//admin authentication middleware

const authUser = async(req,res,next)=>{
try {
    

    const {token} = req.headers
    if(!token){
        return res.json({success:false,message:"No Authorized Login Again"})
    }

    const token_decode=jwt.verify(token,process.env.JWT_SECRET)

     req.user = { id: token_decode.id };  //get user id from the token
    // req.body.userId = token_decode.id
    next()

} catch (error) {

    console.log(error);
    res.status(400).json({success:false,message:error.message})
    
    
}
}

export default authUser