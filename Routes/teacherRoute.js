const express=require("express");
const controller=require("./../Controller/teacherController");
const TeacherValidation=require("../Middleware/Validations/TeacherValidation");
const validator=require("../Middleware/Validations/Validator");
const router=express.Router();
const {isAdminOrTeacher,isAdmin,isTeacher}=require("../Middleware/authorizationMidWare");

router.route("/teachers")
.get(isAdmin,controller.getAllteachers)
.put(isAdminOrTeacher,TeacherValidation.bodyValidate,validator,controller.updateTeacher)
.delete(isAdmin,controller.deleteTeacher);

router.get("/teachers/supervisors",isAdmin,controller.getAllsupervisors);

router.get("/teachers/:id",isAdmin,TeacherValidation.paramValidate,validator,controller.getTeacherById)
.delete("/teachers/:id",isAdmin,TeacherValidation.paramValidate,validator,controller.deleteTeacher);




module.exports=router;