import mongoose, {model,Schema} from "mongoose";
import { MONGO_URL } from "./config.js";

mongoose.connect(MONGO_URL)

const UserSchema= new Schema(
    {
        username:{type:String, unique:true, required:true},
        password:{type:String, required:true},
        share:{type:Boolean, default:false},
    }
)

const ContentSchema=new Schema({
    title:String,
    link:String,
    type:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true}
})

const LinkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true, unique:true}
})

export const UserModel= model("User", UserSchema);
export const ContentModel=model("Content",ContentSchema);
export const LinkModel=model("Link",LinkSchema);
