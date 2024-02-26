const express=require("express");
const controller=require("./../Controller/classController");
const ClassValidation=require("../Middleware/Validations/ClassValidation");
const validator=require("../Middleware/Validations/Validator");
const {isAdmin,isTeacher,isAdminOrTeacher}=require("../Middleware/authorizationMidWare");
const router=express.Router();

router.route("/class").get(isAdminOrTeacher,controller.getAllclasses)
.post(isAdminOrTeacher,ClassValidation.bodyvalidate,validator,controller.insertClass)
.put(isAdminOrTeacher,ClassValidation.bodyvalidate,validator,controller.updateClass)
.delete(isAdminOrTeacher,controller.deleteClass);


router.get("/class/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.getClassById)
.delete("/class/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.deleteClass);

router.get("/class/child/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.getChildrenInfo);

router.get("/class/teacher/:id",isAdminOrTeacher,ClassValidation.paramValidate,validator,controller.getSuperInfo);




module.exports=router;


/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class management endpoints
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Retrieve all classes
 *     description: Retrieve a list of all classes.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with class data.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
 *     description: Create a new class.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '201':
 *         description: Class created successfully.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /class:
 *   put:
 *     summary: Update a class
 *     description: Update details of a class.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200':
 *         description: Class updated successfully.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Class not found.
 */

/**
 * @swagger
 * /class:
 *   delete:
 *     summary: Delete a class
 *     description: Delete a class by ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Class deleted successfully.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Retrieve a class by ID
 *     description: Retrieve details of a class by its ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with class data.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Class not found.
 *   delete:
 *     summary: Delete a class by ID
 *     description: Delete a class by its ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Class deleted successfully.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Class not found.
 */

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Retrieve children info of a class
 *     description: Retrieve information about children in a class by class ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with children info.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Class not found.
 */

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Retrieve supervisor info of a class
 *     description: Retrieve information about the supervisor of a class by class ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with supervisor info.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Class not found.
 */