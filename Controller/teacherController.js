const Teacher=require("../Model/teacherSchema");
const Class=require("../Model/classSchema");
const JWT=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const fs=require("fs");

exports.getAllteachers=(req,res,next)=>{
    Teacher.find({}).then((teacher)=>{
        res.status(200).json(teacher);
    }).catch((error)=>{
        next(error);
    })
}

exports.getTeacherById=(req,res,next)=>{
    const id=req.params.id;
    Teacher.findById({_id:id})
    .then((teacher)=>{
        if(!teacher) throw new Error("Invalid Id")
        res.status(200).json({data:{id:req.params.id},teacher});
    }).catch((error)=>{next(error);})
    
}

exports.getAllsupervisors=(req,res,next)=>{
    Class.find({}, { supervisor: 1 })
    .populate("supervisor", "name")
    .then((teachers) => {
        res.status(200).json(teachers);
    })
    .catch((error) => {
        next(error);
    });
}

exports.insertTeacher=(req,res,next)=>{
    const imagePath=req.file.path;
    const {_id, fullname, email, password } = req.body;
    const hashedPass = bcrypt.hashSync(password, 10);
    const teacher = new Teacher({ _id:_id,fullname: fullname, email: email, password: hashedPass,image:imagePath});

    teacher.save()
    .then((teacher)=>{
        const token=JWT.sign(
            {
                id: teacher._id,
                fullname: teacher.fullName,
                role: "teacher",
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        )
        res.status(201).json({message:"Teacher added successfully",
        teacher,
        token});
    }).catch((error)=>{
        next(error);
    });
    
}

exports.updateTeacher=(req,res,next)=>{
    const id=req.params.id;
    Teacher.findByIdAndUpdate({_id:id},req.body)
    .then((teacher)=>{
        if (req.file) {
            const imagePath = teacher.image;
            // delete image from the server
            fs.unlink(imagePath, (error) => {
                if (error) {
                    next(error);
                }
            });
            // update the image path
            teacher.image = req.file.path;

            // save the updated teacher
            teacher.save();
        }

        if(teacher.nMODIFIED===0) throw new Error("id not found");
        res.status(200).json({data:"updated",teacher});
         }).catch((error)=>{
            next(error);
         })
}

exports.deleteTeacher=(req,res,next)=>{
    const id=req.body.id
    Teacher.findByIdAndDelete({_id:id})
    .then((teacher)=>{
        const imagePath = teacher.image;
        // delete image from the server
        fs.unlink(imagePath, (error) => {
            if (error) {
                next(error);
            }
        });
        if(teacher.deleteCount===0) throw new Error("Teacher doesn't exist")
        res.status(200).json({data:"delete"},teacher);
    }).catch((error)=>{
        next(error);
    })
    
}