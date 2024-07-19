import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Job provide job title"],
        minlength:[3,"Job title must contain at least 3 characters!"],
        mixlength:[50,"job title cannot exceed 50 characters!"],

    },
    decription:{
        type:String,
        required:[true,"Please provide job desxription"],
        minlength:[3,"Job description must contain at least 50 characters"],
        maxlenght:[50,"Job description cannot exceed 350 characters!"],
    },
    category:{
        type:String,
        required:[true,"Job Category is required!"],

    },
    country:{
        type:String,
        required:[true,"Job Country is required!"],
    },
    city:{
        type:String,
        required:[true,"Job City is rrequired!"],
    },
    location:{
        type:String,
        reqiures:[true,"Place provide exact location!"],
        minlength:[50,"Job location must contain at least 50 characters!"],
    },
    fixedSalary:{
        type:Number,
        minlength:[4,"Fixed salary must contain at least 4 digits!"],
        maxlength:[9,"Fixed salary cannot exceed 9 digits!"],
    },
    salaryFrom:{
        type:Number,
        minlength:[4,"Salary From must contain at least 4 digits! "],
        maxlength:[9,"Salary From must cannot exceed 9 digits!"],

    },
    salatyTo:{
        type:String,
        minlength:[4,"Salary To must contain at least 4 digits!"],
        maxlength:[9,"Salary To must cannot exceed 9 digits!"],
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,

    },
});
export const Job = mongoose.model("Job",jobSchema);