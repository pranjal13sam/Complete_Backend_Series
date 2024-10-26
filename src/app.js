import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()
//remember whenever we use app.use it is for middleware or for configuration
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:'16kb'
}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import 

import userRouter from './routes/user.routes.js'

//routes declration
app.use("/api/v1/users",userRouter)


export {app}