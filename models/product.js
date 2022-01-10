const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Product name must be provided']
    },
    price:{
        type:Number,
        required:[true, 'Product price must be provided']  
    },
    company:{
        type:String,
        enum:{
            values:['biedronka', 'lidl', 'ikea', 'poloMarket'],
            messsage:'{VALUE} is not supported'
        }
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Product',productSchema)