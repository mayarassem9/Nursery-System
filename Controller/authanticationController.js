const JWT=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const admin=require("../Model/adminSchema");
const Teacher=require("../Model/teacherSchema");

require("dotenv").config();

exports.login=(req,res,next)=>{
    const {email,password}=req.body;
    Teacher.findOne({email})
    .then((teacher)=>{
        if(teacher){
            let user=teacher;
            return bcrypt.compare(password,teacher.password);
        }
        return admin.findOne({email})
        .then((admin)=>{
            if (!admin) {
                let error = new Error("Invalid email or password");
                error.statusCode = 401;
                throw error;
            }
            user=admin;
            return bcrypt.compare(password,admin.password);
        }).then((isMatch)=>{
            if (!isMatch) {
                let error = new Error("Invalid email or password");
                error.statusCode = 401;
                throw error;
            }
            const token = JWT.sign(
                {
                    id: user._id,
                    fullname: user.fullName,
                    role: user instanceof Teacher ? "teacher" : "admin",
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({message:"Logged in succeffully",token});
        })
    }).catch((error)=>{
        next(error);
    })
}