import mongoose from "mongoose";

import bcrypt from 'bcrypt'
const authSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{
        type:String,
        enam:['user','admin'],
        default:'user'
    }
})

authSchema.pre('save',async function(next){
    //checking previo password if any change
    if(!this.isModified) return next();

    //has password
    const salt=await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)



}
  
)
  //comparing password
    authSchema.methods.comparePassword=async function(inputPassword){
        return bcrypt.compare(inputPassword,this.password)
    }

const Auth=mongoose.model('Auth',authSchema)
export default Auth