/**
 * Mongoose model Team.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required.'],
    unique: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }]
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

teamSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Team = mongoose.model('Team', teamSchema)
