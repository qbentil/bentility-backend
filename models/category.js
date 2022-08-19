import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    image: {
        type: String,
    },
    color: {
        type: String,
        default: '#fff'
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    
}, { timestamps: true });

export default mongoose.models['Category'] || mongoose.model('Category', CategorySchema);