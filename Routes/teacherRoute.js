const express=require("express");
const controller=require("./../Controller/teacherController");
const TeacherValidation=require("../Middleware/Validations/TeacherValidation");
const validator=require("../Middleware/Validations/Validator");
const router=express.Router();
const {isAdmin}=require("../Middleware/authorizationMidWare")

router.route("/teachers").all(isAdmin)
.get(controller.getAllteachers)

.put(TeacherValidation.bodyValidate,validator,controller.updateTeacher)
.delete(controller.deleteTeacher);

router.get("/teachers/supervisors",controller.getAllsupervisors);

router.get("/teachers/:id",TeacherValidation.paramValidate,validator,controller.getTeacherById)
.delete("/teachers/:id",TeacherValidation.paramValidate,validator,controller.deleteTeacher);




module.exports=router;