import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Job} from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    const jobs = await Job.find({expired:false});
    res.status(200).json({
        success:true,
        jobs,
    });
});
export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role == "Job Seeker"){
         return next(new ErrorHandler("Job seeker is not allowed to access this resources!",400)
         );
    }
  
const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
} = req.body;

if(!title || !description || !category || !city || !location){
    return next(new ErrorHandler("Please rpovide full job details",400));
}
if((!salaryFrom || !salaryTo) && !fixedSalary){
    return next(
        new ErrorHandler("Please either provide fixed salary or ranged salary!")

    );
}

if(salaryFrom && salaryTo &&  fixedSalary){
return next(
    new ErrorHandler("Cannot enter fixed salary and ranged salary together!")

);
}

const postedBy = req.user._id;
const job =  await job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo, 
})
res.status(200).json({
    success:true,
    message:"Job posted successfully!",
    job

})

});

export const getmyJobs = catchAsyncError(async(req,res,next)=>{
    const {} =req.user;
    if(role == "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resources!",400)
        );
   }
  const myjobs =await job.find({postedBy:req.user._id});
  res.status(200).json({
    success:true,
    myjobs,
  });

});

export const updateJob = catchAsyncError(async(req,res,next)=>{
    const {} =req.user;
    if(role == "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resources!",400
         )
        );
   }
  
   const {id} =req.params;
   let job = await job.findById(id);
   if(!job){
    return next(
        new ErrorHandler(
            "Oops , Job not found!",
            404
        )
    );
   }
   job - await job.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidator:true,
    useFindAndModify:false
   })
   res.status(200).json({
    success:true,
    job,
    message:"Job Updated Successfully!",

   });
});

export const deleteJob = catchAsyncError(async(req,res,next)=>{
    const {} =req.user;
    if(role == "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resources!",400
         )
        );
   }
  
   const {id} =req.params;
   let job = await Job.findById(id);
      if(!job){
    return next(
        new ErrorHandler(
            "Oops , Job not found!",
            404
        )
    );
   }
await job.deleteOne();
res.status(200).json({
    success : true,
    message:"Job deleted Successfully",
});

});