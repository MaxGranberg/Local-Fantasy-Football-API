/**
 * Defines the team router.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import { TeamController } from '../../../controllers/TeamController.js'
import { authenticateJWT, hasPermissions } from '../../../middlewares/auth.js'

export const router = express.Router()

const controller = new TeamController()

// Provide req.team to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadTeamDocument(req, res, next, id))

// GET
router.get('/', (req, res, next) => controller.getAllTeams(req, res, next))
router.get('/:id', (req, res, next) => controller.getTeamById(req, res, next))
router.get('/:id/players', authenticateJWT, (req, res, next) => controller.getTeamPlayers(req, res, next))

// POST
router.post('/', authenticateJWT, hasPermissions, (req, res, next) => controller.createTeam(req, res, next))

// PATCH
router.patch('/:id', authenticateJWT, hasPermissions, (req, res, next) => controller.updateTeam(req, res, next))

// DELETE
router.delete('/:id', authenticateJWT, hasPermissions, (req, res, next) => controller.deleteTeam(req, res, next))

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Team (real teams) management and operations
 */

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     description: Retrieves a list of all teams.
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a specific team by ID
 *     description: Retrieves detailed information about a specific team.
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the team
 *     responses:
 *       200:
 *         description: Detailed information about the team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teams/{id}/players:
 *   get:
 *     summary: Get players of a specific team
 *     description: Retrieves a list of players belonging to a specific team, requiring JWT authentication.
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the team to retrieve players for
 *     responses:
 *       200:
 *         description: A list of players in the team
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     description: Allows an authenticated user with appropriate permissions to create a new team.
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: Team successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The newly created team's ID
 *                 message:
 *                   type: string
 *                   example: Team successfully created
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: Link to the created team
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user does not have the necessary permissions to create a team
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teams/{id}:
 *   patch:
 *     summary: Update a team's details
 *     description: Partially updates a team's details with the provided data. Requires JWT authentication and appropriate permissions.
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the team to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               players:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               name: "Updated Team Name"
 *               players: ["507f1f77bcf86cd799439011", "507f191e810c19729de860ea"]
 *     responses:
 *       200:
 *         description: Team successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Team successfully updated.
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user does not have necessary permissions
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     description: Deletes a specific team by ID. Requires JWT authentication and appropriate permissions.
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the team to delete
 *     responses:
 *       204:
 *         description: Team successfully deleted
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user does not have necessary permissions
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
