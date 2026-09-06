import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
const app=express();
dotenv.config()

//import all authRoutes
import authRoutes from './routes/authRotes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';





app.use(express.json())

//Registering all router
app.get('/',(req,res)=>{
    res.send("Guys , Do you use express")
})
//Authorization
app.use('/auth',authRoutes)
app.use('/users',userRoutes)
app.use('/admin',adminRoutes)
//All middlewere


app.listen(3000,()=>{
    console.log('My Server is running in port 3000')
})


//Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("✅ Connection to mongoDB seccussed"))
    .catch((err)=>console.log("❌ Failed connection"))