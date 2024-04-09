/**
 * Defines the FantasyTeamController class.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import { FantasyTeam } from '../models/fantasyTeam.js'
import { Webhook } from '../models/webhook.js'
import { sendWebhookWithSignature } from './WebhookController.js'
import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class FantasyTeamController {
  /**
   * Provide req.fantasyTeam to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadFantasyTeamDocument (req, res, next, id) {
    try {
      const fantasyTeam = await FantasyTeam.findById(id)
      if (!fantasyTeam) {
        throw createError(404, 'Fantasy team not found')
      }
      req.fantasyTeam = fantasyTeam
      next()
    } catch (error) {
      next(createError(404, 'Fantasy team not found'))
    }
  }

  /**
   * Sends a JSON response containing all fantasy teams.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllFantasyTeams (req, res, next) {
    try {
      const fantasyTeams = await FantasyTeam.find()
      const transformedFantasyTeams = fantasyTeams.map(fantasyTeam => ({
        ...fantasyTeam.toJSON(),
        links: {
          self: `${req.baseUrl}/${fantasyTeam.id}`,
          update: `${req.baseUrl}/${fantasyTeam.id}`,
          delete: `${req.baseUrl}/${fantasyTeam.id}`
        }
      }))
      res.json(transformedFantasyTeams)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a fantasy team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getFantasyTeamById (req, res, next) {
    try {
      res.json({
        ...req.fantasyTeam.toJSON(),
        links: {
          update: `${req.baseUrl}/${req.fantasyTeam.id}`,
          delete: `${req.baseUrl}/${req.fantasyTeam.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new fantasy team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createFantasyTeam (req, res, next) {
    try {
      const fantasyTeam = new FantasyTeam(req.body)
      await fantasyTeam.save()
      res.status(201).json({
        id: fantasyTeam.id,
        message: 'Fantasy team successfully created.',
        links: {
          self: `${req.baseUrl}/${fantasyTeam.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Partially updates an existing fantasy team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateFantasyTeam (req, res, next) {
    try {
      Object.assign(req.fantasyTeam, req.body)
      await req.fantasyTeam.save()
      res.status(200).json({ message: 'Fantasy team successfully updated.' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified fantasy team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteFantasyTeam (req, res, next) {
    try {
      await req.fantasyTeam.deleteOne()
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates a Fantasy team's total points based on the recent points earned by its players.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateFantasyTeamScore (req, res, next) {
    try {
      const fantasyTeam = req.fantasyTeam

      // Populate the players to access their recentPoints
      await fantasyTeam.populate('players')

      // Calculate the sum of recent points from all players
      const scoreToAdd = fantasyTeam.players.reduce((acc, player) => acc + player.recentPoints, 0)

      // Update the fantasy team's total score
      fantasyTeam.totalScore += scoreToAdd
      await fantasyTeam.save()

      // Optionally, reset recentPoints for all players
      for (const player of fantasyTeam.players) {
        player.recentPoints = 0 // Reset recent points after adding to the team's score
        await player.save()
      }

      // Notify webhooks about the fantasy team score update
      const webhooks = await Webhook.find({ event: 'fantasyTeamScoreUpdate' })
      webhooks.forEach(webhook => {
        const payload = { fantasyTeamId: req.params.id, newTotalScore: req.fantasyTeam.totalScore }
        sendWebhookWithSignature(webhook, payload)
      })

      res.json({ message: 'Fantasy Team points updated' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Fetches and sends a JSON response containing all players of a specific fantasy team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getFantasyTeamPlayers (req, res, next) {
    try {
      const teamWithPlayers = await req.fantasyTeam.populate('players')

      const response = {
        teamName: teamWithPlayers.name,
        players: teamWithPlayers.players.map(player => ({
          id: player.id,
          name: player.name,
          position: player.position,
          goalsScored: player.goalsScored,
          cleanSheets: player.cleanSheets,
          totalPoints: player.totalPoints,
          recentPoints: player.recentPoints
        }))
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
