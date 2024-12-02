import express, { Router } from 'express'
const dashRouter: Router = express.Router()
const {users} = require('@clerk/clerk-sdk-node')


dashRouter.get('/dashboard')