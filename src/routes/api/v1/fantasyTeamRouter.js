/**
 * Defines the fantasyTeam router.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import { FantasyTeamController } from '../../../controllers/FantasyTeamController.js'
import { authenticateJWT, hasPermissions, verifyOwner } from '../../../middlewares/auth.js'

export const router = express.Router()

const controller = new FantasyTeamController()

// Provide req.fantasyTeam to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadFantasyTeamDocument(req, res, next, id))

// GET
router.get('/', authenticateJWT, (req, res, next) => controller.getAllFantasyTeams(req, res, next))
router.get('/:id', authenticateJWT, (req, res, next) => controller.getFantasyTeamById(req, res, next))
router.get('/:id/players', authenticateJWT, (req, res, next) => controller.getFantasyTeamPlayers(req, res, next))

// POST
router.post('/', authenticateJWT, (req, res, next) => controller.createFantasyTeam(req, res, next))

// PATCH
router.patch('/:id', authenticateJWT, verifyOwner, (req, res, next) => controller.updateFantasyTeam(req, res, next))
router.patch('/:id/points', authenticateJWT, hasPermissions, (req, res, next) => controller.updateFantasyTeamScore(req, res, next))

// DELETE
router.delete('/:id', authenticateJWT, verifyOwner, (req, res, next) => controller.deleteFantasyTeam(req, res, next))

/**
 * @swagger
 * tags:
 *   name: FantasyTeam
 *   description: Fantasy Team management
 */

/**
 * @swagger
 * /fantasyTeams:
 *   get:
 *     summary: Retrieve all fantasy teams
 *     description: Fetches a list of all fantasy teams available, requiring JWT authentication. Each team includes links for self-reference, updating, and deletion.
 *     tags: [FantasyTeam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of fantasy teams, each with self, update, and delete links.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FantasyTeam'
 *       401:
 *         description: Unauthorized access - JWT token is missing or invalid.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /fantasyTeams/{id}:
 *   get:
 *     summary: Retrieve a single fantasy team by ID
 *     description: Fetches details of a specific fantasy team by ID, requiring JWT authentication. The response includes links for updating and deleting the fantasy team.
 *     tags: [FantasyTeam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fantasy team to retrieve.
 *     responses:
 *       200:
 *         description: Details of the fantasy team, including update and delete links.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FantasyTeam'
 *       401:
 *         description: Unauthorized access - JWT token is missing or invalid.
 *       404:
 *         description: Fantasy team not found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /fantasyTeams/{id}/players:
 *   get:
 *     summary: Retrieve players of a specific fantasy team
 *     description: Fetches the list of players belonging to a specific fantasy team by ID, requiring JWT authentication.
 *     tags: [FantasyTeam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fantasy team whose players are to be retrieved.
 *     responses:
 *       200:
 *         description: An array of players in the specified fantasy team.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       401:
 *         description: Unauthorized access - JWT token is missing or invalid.
 *       404:
 *         description: Fantasy team not found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /fantasyTeams:
 *   post:
 *     summary: Create a new fantasy team
 *     description: Allows an authenticated user to create a new fantasy team.
 *     tags: [FantasyTeam]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FantasyTeam'
 *     responses:
 *       201:
 *         description: Fantasy team successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The newly created fantasy team's ID.
 *                 message:
 *                   type: string
 *                   example: Fantasy team successfully created.
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: Link to the created fantasy team.
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body.
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /fantasyTeams/{id}:
 *   patch:
 *     summary: Partially update a fantasy team
 *     description: Allows an authenticated owner of the fantasy team to partially update it.
 *     tags: [FantasyTeam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the fantasy team to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName:
 *                 type: string
 *             example:
 *               teamName: Updated Team Name
 *     responses:
 *       200:
 *         description: Fantasy team successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fantasy team successfully updated.
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body.
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       403:
 *         description: Forbidden, user is not the owner of the fantasy team.
 *       404:
 *         description: Fantasy team not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /fantasyTeams/{id}/points:
 *   patch:
 *     summary: Update a fantasy team's total score
 *     description: Allows an authenticated admin to update a fantasy team's total score based on recent player performance. This operation will notify registered webhooks about the score update.
 *     tags: [FantasyTeam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the fantasy team whose score is to be updated.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fantasy Team points updated successfully. Webhooks notified if registered for fantasyTeamScoreUpdate event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fantasy Team points updated.
 *                 fantasyTeam:
 *                   $ref: '#/components/schemas/FantasyTeam'
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       403:
 *         description: Forbidden, user is not an admin.
 *       404:
 *         description: Fantasy team not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /fantasyTeams/{id}:
 *   delete:
 *     summary: Delete a fantasy team
 *     description: Allows an authenticated owner of the fantasy team to delete it.
 *     tags: [FantasyTeam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the fantasy team to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Fantasy team deleted successfully.
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       403:
 *         description: Forbidden, user is not the owner of the fantasy team.
 *       404:
 *         description: Fantasy team not found.
 *       500:
 *         description: Internal server error.
 */
