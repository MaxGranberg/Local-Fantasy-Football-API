/**
 * API version 1 routes.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './accountRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as teamRouter } from './teamRouter.js'
import { router as playerRouter } from './playerRouter.js'
import { router as fantasyTeamRouter } from './fantasyTeamRouter.js'
import { router as leagueRouter } from './leagueRouter.js'
import { router as webhookRouter } from './webhookRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API! Assignment API DESIGN' }))

router.use('/', accountRouter)
router.use('/users', userRouter)
router.use('/teams', teamRouter)
router.use('/players', playerRouter)
router.use('/fantasyTeams', fantasyTeamRouter)
router.use('/leagues', leagueRouter)
router.use('/webhooks', webhookRouter)
