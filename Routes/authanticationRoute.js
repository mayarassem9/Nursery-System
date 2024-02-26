const express=require("express");
const controller=require("./../Controller/teacherController");
const authenticateController=require("../Controller/authanticationController");
const TeacherValidation=require("../Middleware/Validations/TeacherValidation");
const validator=require("../Middleware/Validations/Validator");
const router=express.Router();


router.post("/teachers",TeacherValidation.bodyValidate,validator,controller.insertTeacher)

router.post("/login",authenticateController.login);

module.exports=router;
/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher management endpoints
 */

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a new teacher
 *     description: Create a new teacher.
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       '201':
 *         description: Teacher created successfully.
 *       '400':
 *         description: Bad request.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Login as a teacher.
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       '200':
 *         description: Login successful.
 *       '400':
 *         description: Bad request.
 *       '401':
 *         description: Unauthorized request.
 */