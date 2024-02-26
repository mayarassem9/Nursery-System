const {body,param}=require("express-validator");


exports.bodyValidate = [
    body("_id").isInt().withMessage("Id must be a number"),body("fullName").isString().withMessage("Full Name must be a string")
        .isLength({ min: 3, max: 50 }).withMessage("Full Name must be between 3 to 50 characters"),
    body("age").isNumeric().withMessage("Age must be a number").custom((value) => {
        if (value < 0) {
            throw new Error("Age must be a positive number");
        }
        return true;
    }),
    body("level").custom((value) => {
        if (value !== "PreKG" && value !== "KG1" && value !== "KG2") {
            throw new Error("Level must be PreKG, KG1 or KG2");
        }
        return true;
    }),
    body("city").isString().withMessage("City must be a string"),
    body("street").isString().withMessage("Street must be a string"),
    body("building").isInt().withMessage("Building must be a number")
]

exports.paramValidate = [
    param("_id").isInt().withMessage("Id must be a number")
]