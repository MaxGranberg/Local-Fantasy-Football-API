/**
 * Defines the league router.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import { LeagueController } from '../../../controllers/LeagueContgroller.js'
import { authenticateJWT, hasPermissions } from '../../../middlewares/auth.js'

export const router = express.Router()

const controller = new LeagueController()

// Provide req.league to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadLeagueDocument(req, res, next, id))

// GET
router.get('/standings', authenticateJWT, (req, res, next) => controller.getLeagueStandings(req, res, next))
router.get('/:id', authenticateJWT, (req, res, next) => controller.getLeagueById(req, res, next))

// POST
router.post('/', authenticateJWT, hasPermissions, (req, res, next) => controller.createLeague(req, res, next))

/**
 * @swagger
 * tags:
 *   name: League
 *   description: League management and information
 */

/**
 * @swagger
 * /leagues/{id}:
 *   get:
 *     summary: Get a specific league by ID
 *     description: Retrieves detailed information about a league, requiring JWT authentication.
 *     tags: [League]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the league
 *     responses:
 *       200:
 *         description: Detailed information about the league
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/League'
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       404:
 *         description: League not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /leagues/standings:
 *   get:
 *     summary: Get league standings
 *     description: Retrieves the standings of leagues, ordered by total score, requiring JWT authentication.
 *     tags: [League]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of league standings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   teamName:
 *                     type: string
 *                   ownerUsername:
 *                     type: string
 *                   totalScore:
 *                     type: number
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /leagues:
 *   post:
 *     summary: Create a new league
 *     description: Allows an authenticated user with admin permissions to create a new league.
 *     tags: [League]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/League'
 *     responses:
 *       201:
 *         description: League successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The newly created league's ID.
 *                 message:
 *                   type: string
 *                   example: League successfully created.
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: Link to the created league.
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body.
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       403:
 *         description: Forbidden, user does not have the necessary permissions to create a league.
 *       500:
 *         description: Internal server error.
 */
