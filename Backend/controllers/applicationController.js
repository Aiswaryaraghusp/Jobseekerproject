import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Application} from "../models/applicationSchema.js";
import cloudinary from "cloudinary";

export const jobseekerGetAllApplicaions = catchAsyncError(async(res,req,next)=>{
    const {role} = req.user;
    if(role == "Employer"){
         return next(new ErrorHandler("Employer is not allowed to access this resources!",400)
         );
    }
    const {_id} = req.user;
    const application = await Applicaion.find({"applicantID.user": _id})
    res.status(200).json({
        success:true,
        applications
    })
});

export const jobseekerDeleteApplication =catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role == "Employer") {
        return next(
            new ErrorHandler(
                "Employer is not allowed to accesss this resources!",
                400
            )
        );
    }
    const {id} = req.params;
    const application =await  Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Oops application not found!",404));
    }
    await application.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application Deleted Successfully1"
    })
})
export const postApplication = catchAsyncError(async(req,res,next)=>{

    const {role} = req.user;
    if(role == "Employer") {
        return next(
            new ErrorHandler(
                "Employer is not allowed to accesss this resources!",
                400
            )
        );
    }
    if(!req.files || Object.keys(req.files).length === 0)
{
    return next(new ErrorHandler("Resume File Reqiured"));
}
const {resume} = req.files;
const allowedFormats=["image/png","image/jpg","image/webp"];
if(!allowedFormats.includes(resume.mimetype)){
   return next(new ErrorHandler("Invalid file type.Please upload your resume in a PNG,JPG or WEB Format.",400))
}
const cloudinaryResponse = await cloudinary.Uploader.upload(
resume.tempFilePath
);
console.log(cloudinaryResponse)
if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error(
    "Cloudinary Error:",
     cloudinaryResponse.error || "Unknown cloudinary Error"
     );
     return next(new ErrorHandler("Failed to upload resume.",500))
}

const {name,email,coverLetter,phone,address,jobId} = req.body;
     const applicantID = {
     user:req.user._id,
     role:"Job Seeker"
    };
    if(!jobId){
        return next(new ErrorHandler("Job is not found",404));
    }
    const jobDetails = await jobId.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found!",404));
    }
    const employeeID={

        user:jobDetails.postedBy,
        role:"Employer",

    };
    if( !name || !email || !coverLetter || !phone || !address || !applicationID || !employeeID || !resume){
        return next(new ErrorHandler("Please fill all fields"));
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address, 
        applicationID,
        employeeID,
        resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }

    });
    res.status(200).json({
        success:true,
        message:"Application Submited",
        application,
    });
 });
 export const employerGetAllApplications =catchAsyncError(
    async (req, res, next) => {
      const { role } = req.user;
      if (role === "Job Seeker") {
        return next(
          new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
      }
      const { _id } = req.user;
      const applications = await Application.find({ "employerID.user": _id });
      res.status(200).json({
        success: true,
        applications,
      });
    }
  );