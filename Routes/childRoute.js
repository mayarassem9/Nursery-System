const express=require("express");
const controller=require("../Controller/childController");
const ChildValidation=require("../Middleware/Validations/ChildValidation");
const validator=require("../Middleware/Validations/Validator");
const {isAdmin}=require("../Middleware/authorizationMidWare")
const router=express.Router();

router.route("/child").get(controller.getAllchilderen)
.post(isAdmin,ChildValidation.bodyValidate,validator,controller.insertChild)
.put(isAdmin,ChildValidation.bodyValidate,validator,controller.updateChild)
.delete(isAdmin,controller.deleteChild);


router.get("/child/:id",ChildValidation.paramValidate,validator,controller.getchildById)
.delete("/child/:id",isAdmin,ChildValidation.paramValidate,validator,controller.deleteChild);


module.exports=router;