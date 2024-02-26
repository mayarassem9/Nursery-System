
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
/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher management endpoints
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Retrieve all teachers
 *     description: Retrieve a list of all teachers.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with teacher data.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /teachers:
 *   put:
 *     summary: Update a teacher
 *     description: Update details of a teacher.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       '200':
 *         description: Teacher updated successfully.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Teacher not found.
 */

/**
 * @swagger
 * /teachers:
 *   delete:
 *     summary: Delete a teacher
 *     description: Delete a teacher by ID.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Teacher deleted successfully.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Retrieve all supervisors
 *     description: Retrieve a list of all supervisors.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with supervisor data.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Retrieve a teacher by ID
 *     description: Retrieve details of a teacher by their ID.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with teacher data.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Teacher not found.
 *   delete:
 *     summary: Delete a teacher by ID
 *     description: Delete a teacher by their ID.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Teacher deleted successfully.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Teacher not found.
 */