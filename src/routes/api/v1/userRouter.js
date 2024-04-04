/**
 * Defines the user router.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import { UserController } from '../../../controllers/UserController.js'
import { authenticateJWT, checkPermission, verifyUserId } from ''

export const router = express.Router()

const controller = new UserController()

// Provide req.user to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadUserDocument(req, res, next, id))

// GET
router.get('/',
  authenticateJWT,
  checkPermission,
  (req, res, next) => controller.getAllUsers(req, res, next))

router.get('/:id',
  authenticateJWT,
  checkPermission,
  (req, res, next) => controller.getUserById(req, res, next))

// PATCH
router.patch('/:id',
  authenticateJWT,
  verifyUserId,
  (req, res, next) => controller.updateUser(req, res, next))

// DELETE
router.delete('/:id',
  authenticateJWT,
  verifyUserId,
  (req, res, next) => controller.deleteUser(req, res, next))

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and information
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users. Requires JWT authentication and admin permissions.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users. Each user object includes navigational links to user-specific actions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     description: Retrieves detailed information about a specific user. Requires JWT authentication and admin permissions.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     responses:
 *       200:
 *         description: Detailed information about the user, including navigational links for possible next actions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user's details
 *     description: Partially updates a user's details with the provided data. Requires JWT authentication and the user to be the same as the one being updated.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully updated.
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       example: /users/{id}
 *                     delete:
 *                       type: string
 *                       example: /users/{id}
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user is not authorized to update this profile
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a specific user by ID. Requires JWT authentication and the user to be the same as the one being deleted.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       204:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully deleted.
 *                 links:
 *                   type: object
 *                   properties:
 *                     create:
 *                       type: string
 *                       example: /users
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user is not authorized to delete this profile
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
