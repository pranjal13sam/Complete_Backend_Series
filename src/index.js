//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path:'./env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`Server is running at port: ${
            process.env.PORT
        }`)
    }
    )
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED!!!",err);
    
})












/*
//First Approach to connect with database:

import express from 'express'

const app =express()

//ifie function 
//those function which are executed immediately

;(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.error("error",(error)=>{
        console.log("ERR: ",error)
        throw error
    
    })

    app.listen(process.env.PORT,()=>{
        console.lgo(`App is listening on port ${process.env.PORT}`)
    })
}
    catch(error){
        console.log("ERROR: ",error)
    }
})
    */