import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: ['writer', 'admin'],
        default: 'writer'
    },
    about: {
        type: String,
    },
    phone: {
        type: String
    },
    token:{
        type: String,
        default: ''
    },
    reset_token: {
        type: String,
        default: null
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    }
}, { timestamps: true });

export default mongoose.models['User'] || mongoose.model('User', UserSchema);
