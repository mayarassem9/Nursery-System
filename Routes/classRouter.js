const express=require("express");
const controller=require("./../Controller/classController");
const ClassValidation=require("../Middleware/Validations/ClassValidation");
const validator=require("../Middleware/Validations/Validator");
const router=express.Router();

router.route("/class").get(controller.getAllclasses)
.post(ClassValidation.bodyvalidate,validator,controller.insertClass)
.put(ClassValidation.bodyvalidate,validator,controller.updateClass)
.delete(controller.deleteClass);


router.get("/class/:id",ClassValidation.paramValidate,validator,controller.getClassById)
.delete("/class/:id",ClassValidation.paramValidate,validator,controller.deleteClass);

router.get("/class/child/:id",ClassValidation.paramValidate,validator,controller.getChildrenInfo);

router.get("/class/teacher/:id",ClassValidation.paramValidate,validator,controller.getSuperInfo);




module.exports=router;