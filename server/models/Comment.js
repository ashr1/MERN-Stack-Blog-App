import mongoose, { Schema } from 'mongoose';

export const CommentSchema = new Schema({
    content: String,
    user_id: Schema.Types.ObjectId,
    post_id: Schema.Types.ObjectId,
    createdAt: String
});

export const CommentModel = mongoose.model('Comment', CommentSchema);




