/**
 * Mongoose model real life player belonging to a team.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player name is required.']
  },
  position: {
    type: String,
    required: [true, 'Player position is required.'],
    enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: [true, 'Associated team is required.']
  },
  goalsScored: {
    type: Number,
    default: 0
  },
  cleanSheets: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  recentPoints: {
    type: Number,
    default: 0
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

playerSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Player = mongoose.model('Player', playerSchema)
