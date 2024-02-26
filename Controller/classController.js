const Class=require("../Model/classSchema");

exports.getAllclasses=(req,res,next)=>{
    Class.find({}).populate("supervisor")
    .populate("children")
    .then((classes)=>{
        res.status(200).json(classes);
    }).catch((error)=>{
        next(error);
    })
    
}

exports.getClassById=(req,res,next)=>{
    const id=req.params.id;
    Class.findById({_id:id})
    .populate("supervisor")
    .populate("children")
    .then((classes)=>{
        if (!classes) throw new Error("Id doesn't exist");
        res.status(200).json({classes});
    }).catch((error)=>{next(error);})

    
}

exports.insertClass=(req,res,next)=>{
    const classdata=req.body;
    const classes=new Teacher(classesdata);

    classes.save()
    .then((classes)=>{
        res.status(201).json({message:"added successfully",classes});
    }).catch((error)=>{
        next(error);
    });
}

exports.updateClass=(req,res,next)=>{
    const id=req.params.id;
    Class.findByIdAndUpdate({_id:id},req.body)
    .then((Class)=>{
        if(Class.nMODIFIED===0) throw new Error("id not found");
        res.status(200).json({data:"updated",Class});
         }).catch((error)=>{
            next(error);
         })
}

exports.deleteClass=(req,res,next)=>{
    Class.findByIdAndDelete(req.body.id)
        .then((Class) => {
            res.status(200).json({
                message: "class deleted successfully",Class
            });
        })
        .catch((error) => {
            next(error);
        });

    
}

exports.getChildrenInfo=(req,res,next)=>{
    Class.findById(req.params.id)
    .populate("children")
    .then((Class) => {
        if (!Class) throw new Error("Id does not exist");
        res.status(200).json(Class.children);
    })
    .catch((error) => {
        next(error);
    });
}

exports.getSuperInfo=(req,res,next)=>{
    Class.findById(req.params.id)
    .populate("supervisor")
    .then((Class)=>{
        if(!Class) throw new Error("Id doesn't exist");
        res.status(200).json(Class.supervisor);
    }).catch((error)=>{
        next(error);
    })
}