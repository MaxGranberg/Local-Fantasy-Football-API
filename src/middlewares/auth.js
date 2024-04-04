import jwt from 'jsonwebtoken'
import createError from 'http-errors'

/**
 * Authenticates a request based on a JSON Web Token (JWT).
 *
 * This middleware checks the authorization header of the request, verifies the authentication scheme,
 * decodes the JWT using the provided secret, and attaches the decoded user object to the `req.user` property.
 * If the authentication fails, an unauthorized response with a 401 Unauthorized status code is sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authenticateJWT = (req, res, next) => {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
      role: payload.role
    }

    next()
  } catch (err) {
    const error = createError(401)
    error.cause = err
    next(error)
  }
}

/**
 * Checks if user is an admin.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const checkPermission = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' })
  }
}

/**
 * Authorize user. Should only be able to modify its own things.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const verifyUserId = (req, res, next) => {
  // Assuming `req.user.id` is set from the JWT token in a previous authentication middleware
  // and `req.params.id` is the user ID from the URL
  if (req.user.id !== req.params.id) {
    res.status(403).json({ message: 'Unauthorized: You cannot modify another user\'s data.' })
  }
  next()
}

/**
 * Authorize user. Should only be able to modify its own team.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const verifyOwner = async (req, res, next) => {
  try {
    if (!req.fantasyTeam.owner.equals(req.user.id)) {
      res.status(403).json({ message: 'Unauthorized: You cannot modify another user\'s fantasy team.' })
    }
    next()
  } catch (error) {
    next(error)
  }
}
