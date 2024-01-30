import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        trim:true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    repassword:{
        type: String,
        

    }
})


userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password= await bcryptjs.hash(user.password,salt)
        next()
    } catch (error) {
        console.log(error);
        throw new Error('Failed to hash password')
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    
    return await bcryptjs.compare(candidatePassword,this.password)


}

export const User = mongoose.model('User',userSchema)