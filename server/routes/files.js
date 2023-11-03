// importing modules
const express = require('express');

const upload = require('../functions/filesStorage.js');
const uploadFile = require('../controllers/uploadFile.js');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Images:
 *       type: object
 *       required:
 *         - path
 *         - fileName
 *         - typeImage
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the image
 *         path:
 *           type: string
 *           description: The path of your image
 *         fileName:
 *           type: string
 *           description: The image fileName
 *         typeImage:
 *           type: string
 *           description: The image typeImage (profile or post image)
 *         deleted:
 *           type: boolean
 *           description: The status tell us if image are delete or no
 *         uploadAt:
 *           type: string
 *           format: date
 *           description: The image upload at
 */

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: The images managing API
 * /image:
 *   post:
 *     summary: Upload new image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/images'
 *     responses:
 *       200:
 *         description: The created image.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/images'
 *       500:
 *         description: Some server error
 *
 */
router.post('/image', upload.single('file'), uploadFile);

module.exports = router;
