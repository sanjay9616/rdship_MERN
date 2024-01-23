const mongoose = require('mongoose')
const {Schema} = mongoose;

const productDocs = new Schema({
    productId:String,
            productName: String,
            brandName: String,
            category: String,
            description:String,
            markedPrice: Number,
            // price information
            quantity: Number,
            price:Number,  // one unit price
            taxPercentage:Number, // total tax percentage
            taxPrice:Number,       // how much tax we are taken
            shippingCharge:Number,
            totalPrice: Number,  //   ( quantity * (price + taxPrice) ) 
            netPayableAmount:Number, //  ( quantity * (price + taxPrice) ) + shippingCharge
            createdOn:Date,
            updatedOn:Date,


})