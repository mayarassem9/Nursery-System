const express=require("express");
const controller=require("../Controller/childController");
const ChildValidation=require("../Middleware/Validations/ChildValidation");
const validator=require("../Middleware/Validations/Validator");
const {isTeacher}=require("../Middleware/authorizationMidWare")
const router=express.Router();

router.route("/child").get(controller.getAllchilderen)
.post(isTeacher,ChildValidation.bodyValidate,validator,controller.insertChild)
.put(isTeacher,ChildValidation.bodyValidate,validator,controller.updateChild)
.delete(isTeacher,controller.deleteChild);


router.get("/child/:id",ChildValidation.paramValidate,validator,controller.getchildById)
.delete("/child/:id",isTeacher,ChildValidation.paramValidate,validator,controller.deleteChild);


module.exports=router;