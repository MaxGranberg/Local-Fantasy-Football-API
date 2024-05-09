/**
 * Defines the real life player router.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import { PlayerController } from '../../../controllers/PlayerController.js'
import { authenticateJWT, hasPermissions } from '../../../middlewares/auth.js'

export const router = express.Router()

const controller = new PlayerController()

// Provide req.player to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadPlayerDocument(req, res, next, id))

// GET
router.get('/', (req, res, next) => controller.getAllPlayers(req, res, next))
router.get('/:id', (req, res, next) => controller.getPlayerById(req, res, next))

// POST
router.post('/', authenticateJWT, hasPermissions, (req, res, next) => controller.createPlayer(req, res, next))

// PUT
router.put('/:id', authenticateJWT, hasPermissions, (req, res, next) => controller.replacePlayer(req, res, next))

// PATCH
router.patch('/:id', authenticateJWT, hasPermissions, (req, res, next) => controller.updatePlayer(req, res, next))
router.patch('/points/:id', authenticateJWT, hasPermissions, (req, res, next) => controller.updatePlayerPoints(req, res, next))

// DELETE
router.delete('/:id', authenticateJWT, hasPermissions, (req, res, next) => controller.deletePlayer(req, res, next))

/**
 * @swagger
 * tags:
 *   name: Player
 *   description: Player management
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     description: Retrieves a list of all players.
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: A list of players. Each player object includes navigational links to player-specific actions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     description: Allows creation of a new player. Requires JWT authentication and admin permissions.
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player successfully created, including a link to the newly created player's details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 team:
 *                   type: string
 *                   description: The players associated team's ID
 *                 message:
 *                   type: string
 *                   example: Player successfully created.
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: URL to the newly created player's details.
 *                       example: "/api/v1/players/{id}"
 *                     update:
 *                       type: string
 *                       example: /api/v1/players/{id}
 *                     delete:
 *                       type: string
 *                       example: /api/v1/players/{id}
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body.
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       403:
 *         description: Forbidden, user does not have necessary permissions.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a specific player by ID
 *     description: Retrieves detailed information about a specific player.
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the player
 *     responses:
 *       200:
 *         description: Detailed information about the player, including navigational links for possible next actions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found.
 *       500:
 *         description: Internal server error.
 *   put:
 *     summary: Replace a player's details
 *     description: Fully replaces a player's details with the provided data. Requires JWT authentication and admin permissions.
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player to replace
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player successfully deleted.
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body.
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       403:
 *         description: Forbidden, user does not have necessary permissions.
 *       404:
 *         description: Player not found.
 *       500:
 *         description: Internal server error.
 *   patch:
 *     summary: Partially update a player
 *     description: Allows an authenticated user with admin permissions to partially update a player's information.
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               goalsScored:
 *                 type: number
 *               cleanSheets:
 *                 type: number
 *               totalPoints:
 *                 type: number
 *               recentPoints:
 *                 type: number
 *     responses:
 *       200:
 *         description: Player successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player successfully updated.
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user does not have necessary permissions
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a player
 *     description: Allows an authenticated user with admin permissions to delete a player.
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player to delete
 *     responses:
 *       204:
 *         description: Player successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player successfully deleted.
 *                 links:
 *                   type: object
 *                   properties:
 *                     create:
 *                       type: string
 *                       example: /api/v1/players
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user does not have necessary permissions
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /players/points/{id}:
 *   patch:
 *     summary: Update a player's points
 *     description: Allows an authenticated user with admin permissions to update a player's total and recent points. This operation will notify registered webhooks about the update.
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player whose points are being updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addedPoints:
 *                 type: number
 *                 example: 5
 *                 description: The number of points to add to the player's total
 *     responses:
 *       200:
 *         description: Player points successfully updated. Webhooks notified if registered for pointsUpdate event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player points updated
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body
 *       401:
 *         description: Unauthorized, JWT token missing or invalid
 *       403:
 *         description: Forbidden, user does not have necessary permissions
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
