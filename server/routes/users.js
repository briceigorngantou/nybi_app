const express = require('express');

const {
  signUp,
  login,
  verifyEmail,
  getUserById
} = require('../controllers/users.js');
const { verifyToken } = require('../middlewares/auth.js');
const userAuth = require('../middlewares/userAuth.js');

const router = express.Router();

// passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signUp);

// login route
router.post('/login', login);

// email verification route
router.get('/verify-email/:id/:token', verifyEmail);

// Find one user
router.get('/findOne/:id', verifyToken, getUserById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - userName
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - password
 *         - location
 *         - occupation
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         userName:
 *           type: string
 *           description: The userName of your user
 *         firstName:
 *           type: string
 *           description: The user firstName
 *         lastName:
 *           type: string
 *           description: The user lastName
 *         phone:
 *           type: string
 *           description: The user phone
 *         password:
 *           type: string
 *           description: The user password
 *         location:
 *           type: string
 *           description: The user location
 *         occupation:
 *           type: string
 *           description: The user occupation
 *         deleted:
 *           type: boolean
 *           description: The status tell us if user are delete or no
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The user created at
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/users'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/users'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: userName
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/users'
 *       404:
 *         description: The user was not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: userName
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: './models/users'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: './models/users'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: userName
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

module.exports = router;
