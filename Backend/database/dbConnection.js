import mongoose from "mongoose";
import validator from "validator";

export const dbConnection= ()=>{
    mongoose.connect("mongodb+srv://aiswaryaraghu2000:3243908@cluster0.zwrt8wz.mongodb.net/?retryWrites=true&w=majority",{

        dbName: "MERN_STACK_JOB_SEEKING"

    }).then(()=>{
        console.log("Connected to database!")
    }).catch((err)=>{

        console.log(`Some error occured while connected to database: ${err}`);
    })
}