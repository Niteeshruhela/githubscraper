import mongoose from "mongoose";

export const dbconnection = () => {
    mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
        console.log("Server connected to database succesfully !")
    }).catch((err)=>{
        console.log("Not connected to database !");
    })
}