const errorHandlerMiddleware = async (err,req,res,next) => {
  console.log(err);
  return  res.status(500).json({msg: 'Something Went Wrong, try again later'})
}

module.exports = errorHandlerMiddleware