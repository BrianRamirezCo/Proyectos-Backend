import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    repassword:{
        type: String,
        required: true

    }
})

export const User = model('user',userSchema)