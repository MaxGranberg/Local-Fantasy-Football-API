import 'dotenv/config'
import { connectDB } from './config/mongoose.js'
import { Team } from './models/team.js'
import { Player } from './models/player.js'

await connectDB()

// Define teams and players
const teams = [
  {
    name: 'Fristad GoIF',
    players: [
      { name: 'Joakim Blomqvist', position: 'Goalkeeper' },
      { name: 'Alex Persson', position: 'Defender' },
      { name: 'Linus Johansson', position: 'Defender' },
      { name: 'Eric Toresson', position: 'Defender' },
      { name: 'Olle Granman', position: 'Defender' },
      { name: 'Victor Karlsson', position: 'Midfielder' },
      { name: 'Max Granberg', position: 'Midfielder' },
      { name: 'Adam Johansson', position: 'Midfielder' },
      { name: 'Olle Erneborn', position: 'Midfielder' },
      { name: 'Hannes Viklund', position: 'Forward' },
      { name: 'Alfred Hämäläinen', position: 'Forward' }
    ]
  },
  {
    name: 'Sparsörs AIK',
    players: [
      { name: 'Emil Johansson', position: 'Goalkeeper' },
      { name: 'Emil Nittborn', position: 'Defender' },
      { name: 'Axel Manfred', position: 'Defender' },
      { name: 'Melwin Johansson', position: 'Defender' },
      { name: 'Christopher Anderssom', position: 'Defender' },
      { name: 'Theodor Ivarsson', position: 'Midfielder' },
      { name: 'Jacob Tengskog', position: 'Midfielder' },
      { name: 'Hampus Carlsson', position: 'Midfielder' },
      { name: 'Jonathan Stockedahl', position: 'Midfielder' },
      { name: 'Robin Petersson', position: 'Forward' },
      { name: 'Wilmer Linhard', position: 'Forward' }
    ]
  },
  {
    name: 'Byttorps IF',
    players: [
      { name: 'Max Tellnor Örvik', position: 'Goalkeeper' },
      { name: 'Erik Carlslöv', position: 'Defender' },
      { name: 'Edon Zegrova', position: 'Defender' },
      { name: 'Vanja Veres', position: 'Defender' },
      { name: 'Zake Shafaii', position: 'Defender' },
      { name: 'Philip Hemmarö', position: 'Midfielder' },
      { name: 'Esmer Memic', position: 'Midfielder' },
      { name: 'Uyi Ogie', position: 'Midfielder' },
      { name: 'Hossein Gashimi', position: 'Midfielder' },
      { name: 'Gibson Odiazor', position: 'Forward' },
      { name: 'Ferdaws Faizi', position: 'Forward' }
    ]
  },
  {
    name: 'Sollebrunns AIK',
    players: [
      { name: 'Linus Krantz', position: 'Goalkeeper' },
      { name: 'Kevin Tovle', position: 'Defender' },
      { name: 'Gerry Håkansson', position: 'Defender' },
      { name: 'Anton Sultan', position: 'Defender' },
      { name: 'Hugo Östlind-Sverin', position: 'Defender' },
      { name: 'Oliwer Vukovic', position: 'Midfielder' },
      { name: 'Rasmus Krantz', position: 'Midfielder' },
      { name: 'Hannes Gustavsson', position: 'Midfielder' },
      { name: 'Sebastian Sannestål', position: 'Midfielder' },
      { name: 'Elias Östlind', position: 'Forward' },
      { name: 'Viktor Sjöö', position: 'Forward' }
    ]
  },
  {
    name: 'Töllsjö IF',
    players: [
      { name: 'Niklas Ennevik', position: 'Goalkeeper' },
      { name: 'John Gelotte', position: 'Defender' },
      { name: 'Albin Persson', position: 'Defender' },
      { name: 'Oliwer Johansson', position: 'Defender' },
      { name: 'Felix Lindgren', position: 'Defender' },
      { name: 'Benjamin Andersson', position: 'Midfielder' },
      { name: 'Pontus Johansson', position: 'Midfielder' },
      { name: 'Victor Johansson', position: 'Midfielder' },
      { name: 'Edvard Eriksson', position: 'Midfielder' },
      { name: 'Garth Carlton', position: 'Forward' },
      { name: 'Rasmus Johansson', position: 'Forward' }
    ]
  },
  {
    name: 'Alingsås City FF',
    players: [
      { name: 'Leo Petersson', position: 'Goalkeeper' },
      { name: 'Pontus Sturebäck', position: 'Defender' },
      { name: 'Linus Broberg', position: 'Defender' },
      { name: 'Robert Kovacevic', position: 'Defender' },
      { name: 'Noah Bernhardsson', position: 'Defender' },
      { name: 'Rickard Meius', position: 'Midfielder' },
      { name: 'Arvid Persson', position: 'Midfielder' },
      { name: 'Andreas Roos', position: 'Midfielder' },
      { name: 'Gustav Martins', position: 'Midfielder' },
      { name: 'Oliver Östlind', position: 'Forward' },
      { name: 'Mustafa Mabrouk', position: 'Forward' }
    ]
  },
  {
    name: 'SK Mjörn',
    players: [
      { name: 'Markus Mikkonen', position: 'Goalkeeper' },
      { name: 'Jonas Blomberg', position: 'Defender' },
      { name: 'Mahdi Salihi', position: 'Defender' },
      { name: 'Abraham Katana', position: 'Defender' },
      { name: 'Francis O"Reilly', position: 'Defender' },
      { name: 'Olle Hedlund', position: 'Midfielder' },
      { name: 'Jacob Borg', position: 'Midfielder' },
      { name: 'Arvid Skoglund', position: 'Midfielder' },
      { name: 'Robin Björnell', position: 'Midfielder' },
      { name: 'Ahmad Al-Nis', position: 'Forward' },
      { name: 'Fame Obinell', position: 'Forward' }
    ]
  },
  {
    name: 'Brämhults IK',
    players: [
      { name: 'Jihad Mohamad Jasemalonezi', position: 'Goalkeeper' },
      { name: 'Gustaf Andersson', position: 'Defender' },
      { name: 'Emil Sturesson', position: 'Defender' },
      { name: 'Leo Diez Lagula', position: 'Defender' },
      { name: 'Nicolas Bunnfors', position: 'Defender' },
      { name: 'Lukas Forsberg', position: 'Midfielder' },
      { name: 'Viktor Wahle', position: 'Midfielder' },
      { name: 'Isak Sångberg', position: 'Midfielder' },
      { name: 'Yassine Debbarh', position: 'Midfielder' },
      { name: 'Filip Piperkovic', position: 'Forward' },
      { name: 'Adrian Jogeland', position: 'Forward' }
    ]
  },
  {
    name: 'Falköpings FK',
    players: [
      { name: 'Otto Falk', position: 'Goalkeeper' },
      { name: 'Niklas Andersson', position: 'Defender' },
      { name: 'Shakvar Mustafa', position: 'Defender' },
      { name: 'Pär Westerlund', position: 'Defender' },
      { name: 'Lucas da Rocha', position: 'Defender' },
      { name: 'Villhelm Ekholm', position: 'Midfielder' },
      { name: 'Elias Jonsson', position: 'Midfielder' },
      { name: 'Caper Andersson', position: 'Midfielder' },
      { name: 'Fatah Agid', position: 'Midfielder' },
      { name: 'Isac Karlsson', position: 'Forward' },
      { name: 'Florent Rushiti', position: 'Forward' }
    ]
  },
  {
    name: 'Herrljunga SK',
    players: [
      { name: 'Alfred Hallin', position: 'Goalkeeper' },
      { name: 'Hampus Benjaminsson', position: 'Defender' },
      { name: 'Viktor Karlsson', position: 'Defender' },
      { name: 'Richard Wartmark', position: 'Defender' },
      { name: 'Casper Josefsson', position: 'Defender' },
      { name: 'Emil Johansson', position: 'Midfielder' },
      { name: 'Robert Holmen', position: 'Midfielder' },
      { name: 'Daniel Olafsson', position: 'Midfielder' },
      { name: 'Gustav Andersson', position: 'Midfielder' },
      { name: 'Tobias Bayard', position: 'Forward' },
      { name: 'Jalmar Sandberg', position: 'Forward' }
    ]
  },
  {
    name: 'Annelunds IF',
    players: [
      { name: 'Seth Wendel', position: 'Goalkeeper' },
      { name: 'Joel Hallenbert', position: 'Defender' },
      { name: 'Edwin Holgersson', position: 'Defender' },
      { name: 'Tobias Wiktorsson', position: 'Defender' },
      { name: 'Marcus Martinsson', position: 'Defender' },
      { name: 'Kristoffer Holmen', position: 'Midfielder' },
      { name: 'Julien Spielau', position: 'Midfielder' },
      { name: 'Christian Viitala', position: 'Midfielder' },
      { name: 'Gustav Carlsson', position: 'Midfielder' },
      { name: 'Mattias Martinsson', position: 'Forward' },
      { name: 'Gabriel Holmen', position: 'Forward' }
    ]
  },
  {
    name: 'Hässleholmen BK',
    players: [
      { name: 'Ihab Al Masri', position: 'Goalkeeper' },
      { name: 'Honer Jamal', position: 'Defender' },
      { name: 'Makwan Sawsani', position: 'Defender' },
      { name: 'Mohamud Guyo', position: 'Defender' },
      { name: 'Hanad Mahamud', position: 'Defender' },
      { name: 'Luay Nassan', position: 'Midfielder' },
      { name: 'Joakim Raisi', position: 'Midfielder' },
      { name: 'Mahmoud Amiry', position: 'Midfielder' },
      { name: 'Matin Pajad Mustafa', position: 'Midfielder' },
      { name: 'Mohammad El Machharawi', position: 'Forward' },
      { name: 'Musa Mbenga', position: 'Forward' }
    ]
  }
]

/**
 * Populates the database with teams and their players.
 */
async function populateDB () {
  try {
    for (const teamData of teams) {
      const team = new Team({ name: teamData.name })
      await team.save()

      const playerIds = [] // Array to hold the IDs of the players

      for (const playerData of teamData.players) {
        const player = new Player({ ...playerData, team: team.id })
        await player.save()
        playerIds.push(player.id) // Add the newly created player's ID to the array
      }

      // Now, update the team to include the player IDs in its players array
      team.players = playerIds
      await team.save() // Save the updated team document
    }

    console.log('Database populated successfully!')
  } catch (error) {
    console.error('Failed to populate database:', error)
  }
}

await populateDB()
