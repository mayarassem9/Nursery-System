const {body,param}=require("express-validator");


exports.bodyValidate = [
    body("_id").isInt().withMessage("Id must be a number"),body("fullname").isString().withMessage("Full Name must be a string")
        .isLength({ min: 3, max: 50 }).withMessage("Full Name must be between 3 to 50 characters"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password").isStrongPassword().withMessage("Password must be a strong password")
]

exports.paramValidate=[
    param("_id").isInt().withMessage("Id must be a number")
]