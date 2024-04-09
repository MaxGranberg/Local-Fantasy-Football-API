/**
 * Mongoose model webhook.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const webhookSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true,
    enum: ['pointsUpdate', 'fantasyTeamScoreUpdate']
  },
  secretToken: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

webhookSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Webhook = mongoose.model('Webhook', webhookSchema)
