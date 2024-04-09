/**
 * Mongoose model league.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
  // Additional fields like start date, end date, etc., can be added as needed.
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

leagueSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const League = mongoose.model('League', leagueSchema)
