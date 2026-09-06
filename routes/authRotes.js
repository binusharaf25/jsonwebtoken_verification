import express from 'express'

import { getAuth, login, register } from '../controllers/authControllers.js'

const authRoutes=express.Router()

authRoutes.get('/',getAuth)
authRoutes.post('/create',register);
authRoutes.post('/login',login)



export default authRoutes