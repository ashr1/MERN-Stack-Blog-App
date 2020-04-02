import mongoose, { Schema } from 'mongoose';
import { PostModel } from '../models/Post';
import { UserModel } from '../models/User';
import { CommentModel } from '../models/Comment';
import { users, posts, comments } from './data';

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log('Database connection is open!');

    // UserModel.insertMany(users, (error) => {
    //     if(error) {
    //         console.error(error);
    //     }
    // });

    // PostModel.insertMany(posts, (error) => {
    //     if(error) {
    //         console.error(error);
    //     }
    // });

    CommentModel.insertMany(comments, (error) => {
        if(error) {
            console.error(error);
        }
    });
    
});