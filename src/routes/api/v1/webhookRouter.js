/**
 * Defines the webhook router.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import crypto from 'crypto'
import { Webhook } from '../../../models/webhook.js'

export const router = express.Router()

// Map HTTP verbs and route paths to controller actions.
router.post('/', async (req, res, next) => {
  try {
    const { url, event } = req.body

    // Generate a secret token for this webhook
    const secretToken = crypto.randomBytes(32).toString('hex')

    // Save the webhook along with its secret token
    const webhook = new Webhook({ url, event, secretToken })
    await webhook.save()

    // Return the secret token with the response for the registrant to use
    res.status(201).json({
      message: 'Webhook registered successfully.',
      secretToken,
      id: webhook.id
    })
  } catch (error) {
    next(error)
  }
})

// DELETE endpoint to remove a registered webhook
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const webhook = await Webhook.findById(id)

    if (!webhook) {
      return res.status(404).json({ message: 'Webhook not found.' })
    }

    await webhook.deleteOne()
    res.status(204).json({ message: 'Webhook successfully deleted.' })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Webhook registration and management
 */

/**
 * @swagger
 * /webhooks:
 *   post:
 *     summary: Register a new webhook
 *     description: Allows external services to register a webhook to be notified of specific events. A secret token will be provided in the response, which should be used to verify the authenticity of subsequent webhook calls.
 *     tags: [Webhook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to which the notifications should be sent.
 *                 example: https://example.com/webhook
 *               event:
 *                 type: string
 *                 description: The event type that will trigger the webhook.
 *                 enum:
 *                   - pointsUpdate
 *                   - fantasyTeamScoreUpdate
 *                 example: pointsUpdate
 *     responses:
 *       201:
 *         description: Webhook registered successfully. The response includes a secret token that must be used to verify the authenticity of webhook notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Webhook registered successfully.
 *                 secretToken:
 *                   type: string
 *                   description: The secret token to be used for verifying webhook notifications.
 *                   example: abc123xyz456secret
 *       400:
 *         description: Bad request, possibly due to missing or invalid data in request body.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /webhooks/{id}:
 *   delete:
 *     summary: Delete a registered webhook
 *     description: Deletes a specific webhook by its ID.
 *     tags: [Webhook]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the webhook to delete
 *     responses:
 *       204:
 *         description: Webhook successfully deleted.
 *       400:
 *         description: Bad request, possibly due to invalid format of the webhook ID.
 *       404:
 *         description: Webhook not found.
 *       500:
 *         description: Internal server error.
 */
