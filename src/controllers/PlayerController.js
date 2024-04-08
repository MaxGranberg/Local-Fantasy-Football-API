/**
 * Defines the PlayerController class.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import { Player } from '../models/player.js'
import { Webhook } from '../models/webhook.js'
import { sendWebhookWithSignature } from './WebhookController.js'

/**
 * Encapsulates a controller.
 */
export class PlayerController {
  /**
   * Provide req.player to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadPlayerDocument (req, res, next, id) {
    try {
      const playerDocument = await Player.findById(id)

      if (!playerDocument) {
        const error = new Error('The player you requested does not exist.')
        error.status = 404
        throw error
      }

      req.player = playerDocument

      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a player.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getPlayerById (req, res, next) {
    try {
      res.json({
        ...req.player.toJSON(),
        links: {
          self: `${req.baseUrl}/${req.player.id}`,
          update: `${req.baseUrl}/${req.player.id}`,
          delete: `${req.baseUrl}/${req.player.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all players.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllPlayers (req, res, next) {
    try {
      const players = await Player.find()

      // Transforming players for HATEOAS
      const transformedPlayers = players.map(player => ({
        ...player.toJSON(),
        links: {
          self: `${req.baseUrl}/${player.id}`,
          update: `${req.baseUrl}/${player.id}`,
          delete: `${req.baseUrl}/${player.id}`
        }
      }))

      res.json(transformedPlayers)
    } catch (error) {
      next((error))
    }
  }

  /**
   * Creates a new player.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createPlayer (req, res, next) {
    try {
      const player = new Player(req.body)
      await player.save()
      res.status(201).json({
        id: player.id,
        team: player.team,
        message: 'Player successfully created.',
        links: {
          self: `${req.baseUrl}/${player.id}`,
          update: `${req.baseUrl}/${player.id}`,
          delete: `${req.baseUrl}/${player.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Replace/fully update a player.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async replacePlayer (req, res, next) {
    try {
      await req.player.overwrite(req.body)
      await req.player.save()
      res.status(200).json({ message: 'Player successfully updated.' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Partially updates an existing player.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updatePlayer (req, res, next) {
    try {
      Object.assign(req.player, req.body)
      await req.player.save()
      res.status(200).json({ message: 'Player successfully updated.' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates an existing players total points.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updatePlayerPoints (req, res, next) {
    try {
      const { addedPoints } = req.body // New points to add

      // Update the player's points (simplified first example)
      req.player.totalPoints += addedPoints
      req.player.recentPoints = addedPoints
      await req.player.save()

      // Notify webhooks about the points update
      const webhooks = await Webhook.find({ event: 'pointsUpdate' })
      webhooks.forEach(webhook => {
        const payload = { playerId: req.params.id, addedPoints: req.body.addedPoints, totalPoints: req.player.totalPoints }
        sendWebhookWithSignature(webhook, payload)
      })

      res.json({ message: 'Player points updated' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified player.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deletePlayer (req, res, next) {
    try {
      await req.player.deleteOne()
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
