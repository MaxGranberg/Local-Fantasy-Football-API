/**
 * @swagger
 * components:
 *   schemas:
 *     FantasyTeam:
 *       type: object
 *       properties:
 *         teamName:
 *           type: string
 *           example: Dream Team
 *         owner:
 *           type: string
 *           description: The owner's User ID
 *           example: 507f1f77bcf86cd799439011
 *         players:
 *           type: array
 *           items:
 *            type: string
 *           description: Array of player IDs in the team. There must be 11 players in the team.
 *           example: ["507f1f77bcf86cd799439011", "507f191e810c19729de860ea"]
 *         totalScore:
 *           type: number
 *           example: 150
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *               description: URL to the fantasy team's details
 *               example: "/api/v1/fantasyTeams/{id}"
 *             update:
 *               type: string
 *               description: URL to update the fantasy team
 *               example: "/api/v1/fantasyTeams/{id}"
 *             delete:
 *               type: string
 *               description: URL to delete the fantasy team
 *               example: "/api/v1/fantasyTeams/{id}"
 *       required:
 *         - teamName
 *         - owner
 *         - players
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           example: John Doe
 *         position:
 *           type: string
 *           enum: [Goalkeeper, Defender, Midfielder, Forward]
 *           example: Forward
 *         team:
 *           type: string
 *           example: 507f191e810c19729de860ea
 *         goalsScored:
 *           type: number
 *           example: 10
 *         cleanSheets:
 *           type: number
 *           example: 5
 *         totalPoints:
 *           type: number
 *           example: 75
 *         recentPoints:
 *           type: number
 *           example: 7
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *               description: URL to the player's details
 *               example: "/api/v1/players/{id}"
 *       required:
 *         - name
 *         - position
 *         - team
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     League:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Premier Fantasy League
 *         users:
 *           type: array
 *           items:
 *             type: string
 *             description: Array of user IDs participating in the league.
 *             example: ["507f1f77bcf86cd799439011", "507f191e810c19729de860ea"]
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *               description: URL to the league's details
 *               example: "/api/v1/leagues/{id}"
 *             update:
 *               type: string
 *               description: URL to update the league
 *               example: "/api/v1/leagues/{id}"
 *             delete:
 *               type: string
 *               description: URL to delete the league
 *               example: "/api/v1/leagues/{id}"
 *       required:
 *         - name
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Fristad GoIF
 *         players:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of player IDs in the team.
 *           example: ["6602e970e328a63aa1ce0665", "6602e970e328a63aa1ce0667"]
 *         id:
 *           type: string
 *           example: "6602e970e328a63aa1ce0662"
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *               description: URL to the team's details
 *               example: "/api/v1/teams/6602e970e328a63aa1ce0662"
 *             update:
 *               type: string
 *               description: URL to update the team
 *               example: "/api/v1/teams/6602e970e328a63aa1ce0662"
 *             delete:
 *               type: string
 *               description: URL to delete the team
 *               example: "/api/v1/teams/6602e970e328a63aa1ce0662"
 *       required:
 *         - name
 *         - players
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: john_doe
 *         email:
 *           type: string
 *           example: john_doe@example.com
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: user
 *         id:
 *           type: string
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *               description: URL to the user's details.
 *               example: "/api/v1/users/{id}"
 *             update:
 *               type: string
 *               description: URL to update the user.
 *               example: "/api/v1/users/{id}"
 *             delete:
 *               type: string
 *               description: URL to delete the user.
 *               example: "/api/v1/users/{id}"
 *       required:
 *         - username
 *         - email
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         position:
 *           type: string
 *           enum: [Goalkeeper, Defender, Midfielder, Forward]
 *           example: Forward
 *         team:
 *           type: string
 *           example: 507f191e810c19729de860ea
 *         goalsScored:
 *           type: number
 *           example: 10
 *         cleanSheets:
 *           type: number
 *           example: 5
 *         totalPoints:
 *           type: number
 *           example: 75
 *         recentPoints:
 *           type: number
 *           example: 7
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *               description: URL to the player's details.
 *               example: "/api/v1/players/{id}"
 *             update:
 *               type: string
 *               description: URL to update the player.
 *               example: "/api/v1/players/{id}"
 *             delete:
 *               type: string
 *               description: URL to delete the player.
 *               example: "/api/v1/players/{id}"
 *       required:
 *         - name
 *         - position
 *         - team
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Webhook:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: The URL to which the notifications should be sent.
 *           example: https://example.com/webhookReceiver
 *         event:
 *           type: string
 *           description: The event type that will trigger the webhook.
 *           enum: [pointsUpdate, fantasyTeamScoreUpdate]
 *           example: pointsUpdate
 *         secretToken:
 *           type: string
 *           description: The secret token to be used for verifying webhook notifications.
 *           example: abc123xyz456secret
 *         id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *               description: URL to the webhook's details.
 *               example: "/api/v1/webhooks/{id}"
 *             delete:
 *               type: string
 *               description: URL to delete the webhook.
 *               example: "/api/v1/webhooks/{id}"
 *       required:
 *         - url
 *         - event
 *         - secretToken
 */
