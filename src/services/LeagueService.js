import { League } from '../models/league.js'
import { User } from '../models/user.js'

/**
 * Encapsulates a League service
 */
export class LeagueService {
  /**
   * Adds a user to a league if they are not already a member.
   *
   * @param {User} user - The user to add to the league.
   * @param {League} league - The league to add the user to.
   */
  async addUserToLeague (user, league) {
    // Check if the user is already in the league
    const isMember = league.users.some((member) => member.equals(user.id))

    if (!isMember) {
      // Add the user to the league's users array
      league.users.push(user.id)
      // Save the updated league document
      await league.save()
    }
  }
}
