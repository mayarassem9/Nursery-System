const express=require("express");
const controller=require("../Controller/childController");
const ChildValidation=require("../Middleware/Validations/ChildValidation");
const validator=require("../Middleware/Validations/Validator");
const {isAdminOrTeacher}=require("../Middleware/authorizationMidWare");
const router=express.Router();

router.route("/child")
.all(isAdminOrTeacher)
.get(controller.getAllchilderen)
.post(ChildValidation.bodyValidate,validator,controller.insertChild)
.put(ChildValidation.bodyValidate,validator,controller.updateChild)
.delete(controller.deleteChild);


router.get("/child/:id",isAdminOrTeacher,ChildValidation.paramValidate,validator,controller.getchildById)
.delete("/child/:id",isAdminOrTeacher,ChildValidation.paramValidate,validator,controller.deleteChild);


module.exports=router;