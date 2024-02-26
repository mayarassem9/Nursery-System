const {body,param}=require("express-validator");


exports.bodyvalidate=[
    body("_id").isInt().withMessage("Id must be a number"),
    body("name").isString().withMessage("Name must be a number")
    .isLength({ min: 3, max: 50 }).withMessage("Full Name must be between 3 to 50 characters"),
    body("supervisor").isString().withMessage("Supervisor must be a string"),
    body("children").isArray().withMessage("Children must be an array of Numbers"),
]

exports.paramValidate = [
    param("_id").isInt().withMessage("Id must be a number")
]
