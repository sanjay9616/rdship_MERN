const { signUp } = require("../controllers/auth.controller");


exports.loginPayloadValidator = ( req,res)=>{

    const emailPattern = /\S+@\S+\.\S+/;
    const email = req.body.email;
    if(emailPattern.test(email)==false){
       return res.status(400)
    }

   
}


