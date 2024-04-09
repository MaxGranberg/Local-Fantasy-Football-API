/**
 * Mongoose model users fanatasy team.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const fantasyTeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Fantasy team name is required.']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An owner is required for the fantasy team.']
  },
  players: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }],
    validate: [playersArrayCheck, '11 players are required for the fantasy team.'],
    required: [true, '11 players are required for the fantasy team.']
  },
  totalScore: {
    type: Number,
    default: 0
  }
  // Additional fields like league joined, weekly scores, etc., can be added as needed.
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

fantasyTeamSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

/**
 * Custom validation function for the 'players' array.
 *
 * @param {arr} arr - The array of players to check
 * @returns {boolean} - True or false
 */
function playersArrayCheck (arr) {
  return arr.length === 11
}

export const FantasyTeam = mongoose.model('FantasyTeam', fantasyTeamSchema)
