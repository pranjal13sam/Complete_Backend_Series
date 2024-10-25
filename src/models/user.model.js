import mongoose,{Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"



const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloudinary url (will be using cloudnary service)
        required:true,
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'password is required']

    },
    refreshToken:{
        type:String
    }
        
    

},{
    timestamps:true
})


//the use of pre hook is that it runs before saving any anything
//we are not using here arrow function because arrow function does not have its this ka reference and here the reference is very important
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect= async function
(password){
    bcrypt.compare()
}

export const User=mongoose.model("User",userSchema)