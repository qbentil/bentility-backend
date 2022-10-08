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
    categories: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],
        required: [true, 'Categories is required']
    },
    views: {
        type: Number,
        default: 0
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Writer is required']
    },
    status: {
        type: String,
        enum: ["published", "draft"],
        required: [true, 'Post status is required'],
        default: 'published'
    }
    
    
}, { timestamps: true });

export default mongoose.models['Post'] || mongoose.model('Post', PostSchema);