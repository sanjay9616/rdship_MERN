const cart = require('../models/cart.model')
const { v4: uuidv4 } = require('uuid');

/*
    we have to create a session to store cartItem and after placing order change status to inactive

*/
exports.addToCart =  async (req,res)=>{


    const cartObj = req.body
     let result = await cart.findOne({userId:req.body.userId,active:true})
     console.log("result=",result)
    cartObj.sessionId =  createSessionId();
    cartObj.createdOn = new Date();

    console.log(cartObj)
    cart.create(cartObj).then(res=>{
        console.log("add")
    })
    .catch(err=>{
        console.log(err)
    })
    return res.send("added")

    
}

// to generate
function createSessionId(){
    return uuidv4();
}