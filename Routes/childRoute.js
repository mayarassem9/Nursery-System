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

/**
 * @swagger
 * tags:
 *   name: Children
 *   description: Child management endpoints
 */

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Retrieve all children
 *     description: Retrieve a list of all children.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with children data.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /child:
 *   post:
 *     summary: Create a new child
 *     description: Create a new child.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '201':
 *         description: Child created successfully.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /child:
 *   put:
 *     summary: Update a child
 *     description: Update details of a child.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '200':
 *         description: Child updated successfully.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Child not found.
 */

/**
 * @swagger
 * /child:
 *   delete:
 *     summary: Delete a child
 *     description: Delete a child by ID.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Child deleted successfully.
 *       '401':
 *         description: Unauthorized request.
 */

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Retrieve a child by ID
 *     description: Retrieve details of a child by its ID.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with child data.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Child not found.
 *   delete:
 *     summary: Delete a child by ID
 *     description: Delete a child by its ID.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Child deleted successfully.
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Child not found.
 */