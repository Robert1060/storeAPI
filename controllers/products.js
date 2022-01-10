const Product = require('../models/product')


const getAllProducts = async (req,res) => {
   const {company, featured, name, sort, fieldy, numericFilters} = req.query
    const queryObject = {}
    if(company){
        queryObject.company = company
    }
    if(featured){
        queryObject.featured = featured === 'true'? true:false
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '<':'$lt',
            '=':'$eq',
            '>=':'$gte',
            '<=':'$lte',
        }
        const regex = /\b(>|<|=|<=|>=)\b/g
        let filters = numericFilters.replace(
            regex,(match) => `-${operatorMap[match]}-`
        )
            const options = ['price', 'rating']
            filters = filters.split(',').forEach((item)=>{
                const [field,operator,value] = item.split('-')
                if(options.includes(field)){
                    queryObject[field] = {[operator]:Number(value)}
                }
            })
    }
    

     console.log(queryObject);
    let result = Product.find(queryObject)
    // sort
    if (sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }

    if(fieldy){
        const fieldyList = fieldy.split(',').join(' ')
        result = result.select(fieldyList)
    }
   const page = Number(req.query.page) || 1
   const limit = Number(req.query.limit) || 10
   const skip = (page -1) * limit

   result = result.skip(skip).limit(limit)


    const products = await result
    res.status(200).json({products, nbHits:products.length})
}

const getAllProductsStatic = async (req,res) => {

    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')
    
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}


 