/**
 * Defines the TeamController class.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import { Team } from '../models/team.js'
import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class TeamController {
  /**
   * Provide req.team to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadTeamDocument (req, res, next, id) {
    try {
      const team = await Team.findById(id)
      if (!team) {
        throw createError(404, 'Team not found')
      }
      req.team = team
      next()
    } catch (error) {
      next(createError(404, 'Team not found'))
    }
  }

  /**
   * Sends a JSON response containing all teams.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllTeams (req, res, next) {
    try {
      const teams = await Team.find()
      const transformedTeams = teams.map(team => ({
        ...team.toJSON(),
        links: {
          self: `${req.baseUrl}/${team.id}`,
          update: `${req.baseUrl}/${team.id}`,
          delete: `${req.baseUrl}/${team.id}`
        }
      }))
      res.json(transformedTeams)
    } catch (error) {
      next(createError(500, 'Server error retrieving teams'))
    }
  }

  /**
   * Sends a JSON response containing a team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getTeamById (req, res, next) {
    try {
      res.json({
        ...req.team.toJSON(),
        links: {
          update: `${req.baseUrl}/${req.team.id}`,
          delete: `${req.baseUrl}/${req.team.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createTeam (req, res, next) {
    try {
      const team = new Team(req.body)
      await team.save()
      res.status(201).json({
        id: team.id,
        message: 'Team successfully created.',
        links: {
          self: `${req.baseUrl}/${team.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Partially updates an existing team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateTeam (req, res, next) {
    try {
      Object.assign(req.team, req.body)
      await req.team.save()
      res.status(200).json({ message: 'Team successfully updated.' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteTeam (req, res, next) {
    try {
      await req.team.deleteOne()
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Fetches and sends a JSON response containing all players of a specific team.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getTeamPlayers (req, res, next) {
    try {
      const teamWithPlayers = await req.team.populate('players')

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
