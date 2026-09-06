import express from 'express'
import { authProtected } from '../middlewere/protected.js'
import { authorized } from '../middlewere/authorize.js'
const adminRoutes=express.Router()



adminRoutes.get('/dashboard',authProtected,authorized('admin'),(req,res)=>{
    res.send(`Welecome to admin dashboard you're ${req.user.role} `)
})



adminRoutes.get('/protected',authProtected,(req,res)=>{
    console.log('req.user',req.user)
    res.send('Welecome to protected routes')
})

export default adminRoutes