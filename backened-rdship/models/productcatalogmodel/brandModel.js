const mongoose = require('mongoose')
const {Schema} = mongoose;

const BrandSchema = new Schema({
    brandName:String,
    active:Boolean,
    description:String,
    images:Array,
});

module.exports = mongoose.model("brands",BrandSchema );
