var jwt = require('jsonwebtoken');
const JWT_secret = 'secret_string';
const fetchuser = (req,res,next)=>{
    //get the user form the token and add id to req oject
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({
            error:"please gat a valid token",
        })
    }
    
    
    try {
        const data = jwt.verify(token,JWT_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a token"});
    }
}

module.exports = fetchuser;