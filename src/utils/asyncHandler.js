

const asyncHandler=(requestHandler)=>{
    //returning (req,res,next) this whole block(function) is a high order function
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
} 


export {asyncHandler}

//Second way of writting the code using try catch

// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{    
//         await fn(req,res,next)
//     }catch(error){
//         res.status(error.code||400).json({
//             success:false,
//             message:error.message
//         })
//     }
// }