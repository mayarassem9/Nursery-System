const express=require("express");
const controller=require("./../Controller/teacherController");
const authenticateController=require("../Controller/authanticationController");
const TeacherValidation=require("../Middleware/Validations/TeacherValidation");
const validator=require("../Middleware/Validations/Validator");
const router=express.Router();


router.post("/teachers",TeacherValidation.bodyValidate,validator,controller.insertTeacher)

router.post("/login",authenticateController.login);

module.exports=router;