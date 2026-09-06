import express from 'express'
import { createUser, deleteUser, getAll, updateuser } from '../controllers/userControllers.js';
const userRoutes=express.Router();


userRoutes.get('/',getAll);
userRoutes.post('/createUser',createUser)
userRoutes.put('/updateUser/:id',updateuser)
userRoutes.delete('/delUser/:id',deleteUser)

export default userRoutes