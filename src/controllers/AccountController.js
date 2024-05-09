/**
 * Module for the AccountController.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { User } from '../models/user.js'
import { LeagueService } from '../services/LeagueService.js'
import { League } from '../models/league.js'

/**
 * Encapsulates a controller.
 */
export class AccountController {
  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)

      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }

      // Create the access token with the shorter lifespan.
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(201)
        .json({
          id: user.id,
          access_token: accessToken,
          role: user.role
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
      })

      await user.save()

      // Add user to the default league
      let defaultLeague = await League.findOne({ name: 'Global League' })
      if (!defaultLeague) {
        defaultLeague = new League({ name: 'Global League' })
        await defaultLeague.save()
      }

      const leagueService = new LeagueService()
      await leagueService.addUserToLeague(user, defaultLeague)

      res.status(201).json({
        id: user.id,
        message: 'User successfully created.'
      })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.cause = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.cause = error
      }

      next(err)
    }
  }
}
