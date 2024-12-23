import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser=asyncHandler(async(req,res)=>{
       //get user details from frontend
       //validation- not empty
       //check if user already exists: check from username and email
       //check for images, check for avatar
       //upload them to cloudinary,avatar
       //create user object - create entry in db
       //remove password and refresh token field from response
       //check for user creation 
       //return response 


       //step1: get user details:
       const {fullname,email,username,password}=req.body
       console.log("details: ",email)
       console.log("details: ",fullname)

       if([fullname,email,username,password].some((field)=>
            field?.trim()==="")
       ){
            throw new ApiError(400,"All fields are required")
       }
       if (!email.includes("@")) {
        throw new ApiError(400, "Invalid email format: missing '@'");
    }

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }


    //uploading on cloudinary:

    const avatar=await uploadOnClodinary(avatarLocalPath)
    const coverImage = await uploadOnClodinary(coverImageLocalPath)
    

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password, 
        username:username.toLowerCase()
    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken "
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
        
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )
}
)


export {registerUser} 