import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = async(id, res)=>{

  const token =  jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:'15d'});

  if(token){
    res.cookie('jwt',token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite:'strict'

    })

    return token
  }else{
    return false
  }
 
}

export default generateTokenAndSetCookie