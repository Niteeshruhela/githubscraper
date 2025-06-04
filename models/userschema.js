import mongoose from "mongoose";

const userschema = mongoose.Schema({
    Githubname : String,
    displayname: String,
    bio: String,
    location: String,
    profileUrl: String,
    summary: String,
    skills: [String],
    techStack: [String],
    notableContributions: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


export const User = mongoose.model('user', userschema);