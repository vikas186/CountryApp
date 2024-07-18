const express = require('express')
const router = express.Router();
const DoctorController = require('../controllers/doctor.controller');
const uploadImage = require('../middleware/fileupload');
const jwtVerify = require('../middleware/jwt');


// create doctor route


/**
 * @swagger
 * /api/doctor/create:
 *   post:
 *     tags:
 *       - doctor
 *     summary: Create doctor
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data   # Make sure to include this for form-data uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary  # This indicates a file upload
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               totalRating:
 *                 type: string
 *               totalPatients:
 *                 type: string
 *               content:
 *                 type: string
 *               longitude:
 *                 type: string
 *               latitude:
 *                 type: string
 *             required:
 *               - image
 *               - name
 *               - title
 *               - totalRating
 *               - totalPatients
 *               - content
 *               - longitude
 *               - latitude
 *     responses:
 *       '201':
 *         description: Doctor data created successfully
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.post('/doctor/create', uploadImage.single("image"), jwtVerify, DoctorController.createDoctor );


// get doctor route


/**
 * @swagger
 * /api/doctor/{id}:
 *   get:
 *     tags:
 *       -  doctor
 *     summary: Find a doctor by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the doctor
 *         required: true
 *         schema:
 *           type: string
 *         example: ytfuigiohilkhilh
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/doctor/:id', jwtVerify, DoctorController.getDoctor);



// getall doctor route


/**
 * @swagger
 * /api/doctor:
 *   get:
 *     tags:
 *       -  doctor
 *     summary: 'Get all doctors'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */

router.get('/doctor', jwtVerify, DoctorController.getAllDoctors);



// update doctor route

/**
 * @swagger
 * /api/doctor/update:
 *   put:
 *     tags:
 *       - doctor
 *     summary: Update doctor
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data   # Make sure to include this for form-data uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary  # This indicates a file upload
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               totalRating:
 *                 type: string
 *               totalPatients:
 *                 type: string
 *               content:
 *                 type: string
 *               longitude:
 *                 type: string
 *               latitude:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Doctor data updated successfully
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.put('/doctor/update', uploadImage.single("image"), jwtVerify, DoctorController.updateDoctor);



// delete doctor route


/**
 * @swagger
 * /api/doctor/delete:
 *   delete:
 *     tags:
 *       -  doctor
 *     summary: delete doctor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "642d0bb29daf22457f18685f"
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/doctor/delete', jwtVerify, DoctorController.destroydoctor);

module.exports = router