const express=require("express");
const controller=require("./../Controller/classController");
const ClassValidation=require("../Middleware/Validations/ClassValidation");
const validator=require("../Middleware/Validations/Validator");
const {isAdmin,isTeacher,isAdminOrTeacher}=require("../Middleware/authorizationMidWare");
const router=express.Router();

router.route("/class").get(isAdminOrTeacher,controller.getAllclasses)
.post(isAdminOrTeacher,ClassValidation.bodyvalidate,validator,controller.insertClass)
.put(isAdminOrTeacher,ClassValidation.bodyvalidate,validator,controller.updateClass)
.delete(isAdminOrTeacher,controller.deleteClass);


router.get("/class/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.getClassById)
.delete("/class/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.deleteClass);

router.get("/class/child/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.getChildrenInfo);

router.get("/class/teacher/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.getSuperInfo);




module.exports=router;