import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Plrease provide ypur name!"],
        minlength:[3,"Name must contain at least 3 character!"],
        maxlength:[30,"Nmae cannot exceed 30 character!"],
    },
    email:{
        type:String,
        required:[3,"please provide yourname!"],
        minlength:[3,"Name must contain at least 3 characters"],
        maxlength:[30,"Name cannot exceed 30 characters!"],
  },
  coverLetter:{
    type:String,
    validator:[validator.isEmail,"Please provide your valid email!"],
    required:[true,"Please provide your email!"],
    
  },
phone:{
    type:Number,
    required:[true,"Please provide your phone number!"]

},
address:{
    type:String,
    required:[true,"Please provide your address!"],
},
resume:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},
applicationID:{
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    reuired:true
    },
role:{
    type:String,
    enum:["Job seeker"],
    required:true
     }
 },
    
});
export const Application=mongoose.model("Applicatioin",applicationSchema);