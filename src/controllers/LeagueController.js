/**
 * Defines the LeagueController class.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import { League } from '../models/league.js'
import { FantasyTeam } from '../models/fantasyTeam.js'

/**
 * Encapsulates a controller.
 */
export class LeagueController {
  /**
   * Provide req.league to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadLeagueDocument (req, res, next, id) {
    try {
      const league = await League.findById(id)
      if (!league) {
        const error = new Error('The league you requested does not exist.')
        error.status = 404
        throw error
      }
      req.league = league
      next()
    } catch (error) {
      next()
    }
  }

  /**
   * Sends a JSON response containing a league.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getLeagueById (req, res, next) {
    try {
      res.json({
        ...req.league.toJSON(),
        links: {
          self: `${req.baseUrl}/${req.league.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing league standings.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getLeagueStandings (req, res, next) {
    try {
      // Fetch all fantasy teams and populate the owner to get user details
      const teams = await FantasyTeam.find().populate('owner').sort({ totalScore: -1 })

      // Map the teams to a more user-friendly format
      const standings = teams.map(team => ({
        teamName: team.teamName,
        ownerUsername: team.owner.username,
        totalScore: team.totalScore
      }))

      res.json(standings)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new league.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createLeague (req, res, next) {
    try {
      const league = new League(req.body)
      await league.save()
      res.status(201).json({
        id: league.id,
        message: 'League successfully created.',
        links: {
          self: `${req.baseUrl}/${league.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
