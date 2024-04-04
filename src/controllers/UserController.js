/**
 * Defines the UserController class.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Provide req.userDoc to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadUserDocument (req, res, next, id) {
    try {
      const userDocument = await User.findById(id)

      if (!userDocument) {
        const error = new Error('The user you requested does not exist.')
        error.status = 404
        throw error
      }

      req.userDoc = userDocument

      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getUserById (req, res, next) {
    try {
      res.json({
        ...req.userDoc.toJson(),
        links: {
          update: `${req.baseUrl}/${req.userDoc.id}`,
          delete: `${req.baseUrl}/${req.userDoc.id}`
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all users.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllUsers (req, res, next) {
    try {
      const users = await User.find()

      // Transforming users for HATEOAS
      const transformedUsers = users.map(user => ({
        ...user.toJSON(),
        links: {
          self: `${req.baseUrl}/${user.id}`,
          update: `${req.baseUrl}/${user.id}`,
          delete: `${req.baseUrl}/${user.id}`
        }
      }))

      res.json(transformedUsers)
    } catch (error) {
      next((error))
    }
  }

  /**
   * Partially updates an existing user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateUser (req, res, next) {
    try {
      Object.assign(req.userDoc, req.body)
      await req.userDoc.save()
      res.status(200).json({ message: 'User successfully updated.' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteUser (req, res, next) {
    try {
      await req.userDoc.deleteOne()
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
