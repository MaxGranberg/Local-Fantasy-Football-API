/**
 * Defines the account router.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../../../controllers/AccountController.js'

export const router = express.Router()

const controller = new AccountController()

// Map HTTP verbs and route paths to controller actions.
router.post('/login', (req, res, next) => controller.login(req, res, next))
router.post('/register', (req, res, next) => controller.register(req, res, next))

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates a user and returns an access token.
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 description: The user's username.
 *               password:
 *                 type: string
 *                 example: Password!234
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: Login successful, access token is provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: JWT access token to be used for authenticated requests.
 *       401:
 *         description: Authentication failed, incorrect username or password.
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user.
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 description: Must start with a letter, can include numbers and underscores, and must be 3 to 256 characters long.
 *               password:
 *                 type: string
 *                 example: Password!234
 *                 description: Must be at least 10 characters long and can be up to 256 characters.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *                 description: User's valid email address.
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 default: "user"
 *                 description: The role assigned to the user, defaults to 'user'.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created succesfully.
 *                 id:
 *                   type: string
 *                   example: 660544e307b71f03b2595668
 *                   description: Unique identifier for the created user.
 *       400:
 *         description: Validation error with the request body.
 *       409:
 *         description: Username or email already exists.
 */
