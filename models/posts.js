import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true
        
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [true, 'Category is required']
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    
}, { timestamps: true });

export default mongoose.models['Post'] || mongoose.model('Post', PostSchema);