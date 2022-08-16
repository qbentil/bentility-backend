import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    isPublished: {
        type: Boolean,
        default: false
    },
    imageURI: {
        type: String,
        required: [true, 'Image URI is required']
    }
    
}, { timestamps: true });

export default mongoose.models['Category'] || mongoose.model('Category', CategorySchema);